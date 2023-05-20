import { api } from "~/utils/api";

import { type SubmitHandler, useForm } from "react-hook-form";
import { LoadingSpinner } from "~/components/loader";

type FormValues = {
  content: string;
};

export const CreatePost = () => {
  const { register, reset: resetForm, handleSubmit } = useForm<FormValues>();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      resetForm({
        content: "",
      });
      void ctx.posts.getAll.invalidate();
    },
  });

  const createPost: SubmitHandler<FormValues> = (vals) => {
    const cont = vals.content;
    mutate({ content: cont });
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(createPost)(event);
      }}
    >
      <div className="my-2 flex w-full flex-row border-b-4 p-2">
        <textarea
          className=" w-full resize-none rounded-xl py-2 outline-none"
          maxLength={140}
          placeholder="What's happening?"
          {...register("content", { required: true })}
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
