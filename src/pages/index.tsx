import type { Post } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

import { type SubmitHandler, useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  LoadingPage,
  LoadingSpinner,
  LoadingSpinnerSpacy,
} from "~/components/loader";

const Home = () => {
  return (
    <div className="flex h-screen w-screen justify-center ">
      <div className="h-max w-full max-w-3xl items-center border-x-2">
        <CreatePost />
        <PostsView />
      </div>
    </div>
  );
};

type FormValues = {
  content: string;
};

const CreatePost = () => {
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

const PostsView = () => {
  const { data, fetchNextPage, isLoading, isError, error, hasNextPage } =
    api.posts.getAll.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  if (isLoading) return <LoadingPage />;

  if (isError || !data) return <div>Error: {error?.message}</div>;

  const posts = data.pages.flatMap((page) => page.items);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={hasNextPage == true}
        loader={<LoadingSpinnerSpacy />}
      >
        {...posts.map((post) => <PostItem key={post.id} post={post} />)}
      </InfiniteScroll>
    </>
  );
};

const PostItem = (props: { post: Post }) => {
  const post = props.post;

  return <div className="w-full border-b p-4">{post.content}</div>;
};

const App: NextPage = () => {
  return (
    <>
      <Head>
        <title>baykus 🦉</title>
        <meta name="description" content="the media nest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default App;
