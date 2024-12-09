import { api } from "~/utils/api";
import { provinces } from "~/utils/provinces";

import { type SubmitHandler, useForm } from "react-hook-form";
import { LoadingSpinner } from "~/components/loader";

type FormValues = {
  fullName: string;
  province: string;
  district: string;
  birthDate: Date;
  imageUrl: string;
  whatsappFullNumber: string;
};

const NewDetainee = () => {
  return (
    <div className="flex h-screen w-screen justify-center ">
      <div className="h-max min-h-screen w-full max-w-3xl items-center border-x-2">
        <CreatePost />
      </div>
    </div>
  );
};

const CreatePost = () => {
  const {
    register,
    reset: resetForm,
    handleSubmit,
    watch,
  } = useForm<FormValues>();

  const selectedProvince = watch("province");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      resetForm({});
      void ctx.posts.getAll.invalidate();
    },
  });

  const createPost: SubmitHandler<FormValues> = (vals) => {
    // as the district is listed directly after the province is selcted,
    // the user's district might be the first option and they wont change
    // it.
    const provinceName = vals.province;
    let district = vals.district;
    const province = provinces.find((p) => p.province === provinceName);
    if (!province) {
      throw new Error("Province not found");
    }
    if (!province.districts.find((d) => d.name === district)) {
      district = province.districts[0]!.name;
    }
    mutate({ ...vals, imageUrl: "", birthDate: new Date(vals.birthDate) });
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(createPost)(event);
      }}
    >
      <div className="my-2 flex w-full flex-col border-b-4 p-2">
        <label className="w-1/2">الاسم الكامل</label>
        <input
          className=" w-full resize-none rounded-xl py-2 outline-none"
          maxLength={140}
          placeholder="الاسم الكامل"
          {...register("fullName", { required: true })}
        />

        <label className="w-1/2">المحافظة</label>
        {/* dropdown from provinces  */}
        <select
          className="w-full resize-none rounded-xl py-2 outline-none"
          {...register("province", { required: true })}
        >
          {provinces.map((province) => (
            <option key={province.province} value={province.province}>
              {province.province}
            </option>
          ))}
        </select>

        {/* if province is selected, dropdown includning its children */}
        <label className="w-1/2">المنطقة</label>
        <select
          className="w-full resize-none rounded-xl py-2 outline-none"
          {...register("district", { required: true })}
        >
          {selectedProvince &&
            provinces
              .find((p) => p.province === selectedProvince)
              ?.districts.map((district) => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
        </select>

        <label className="w-1/2">تاريخ الميلاد</label>
        <input
          className="w-full resize-none rounded-xl py-2 outline-none"
          type="date"
          {...register("birthDate", { required: true })}
        />

        <label className="w-1/2">رقم الواتساب للتواصل</label>
        <span className="w-full resize-none rounded-xl py-2 outline-none">
          يرجى كتابة الرقم كامل مع الرمز الدولي. مثال 905553334422
        </span>
        <input
          className="w-full resize-none rounded-xl py-2 outline-none"
          type="number"
          {...register("whatsappFullNumber", { required: true })}
        />

        {isPosting && <LoadingSpinner />}
        {!isPosting && (
          <button
            className="h-14 rounded-xl bg-teal-400 px-8 text-white"
            type="submit"
          >
            Post
          </button>
        )}
      </div>
    </form>
  );
};

export default NewDetainee;
