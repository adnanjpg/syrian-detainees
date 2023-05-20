import { type NextPage } from "next";
import Head from "next/head";

import { CreatePost } from "~/components/CreatePost";
import { PostsView } from "~/components/PostsView";

const Home = () => {
  return (
    <div className="flex h-screen w-screen justify-center ">
      <div className="h-max min-h-screen w-full max-w-3xl items-center border-x-2">
        <CreatePost />
        <PostsView />
      </div>
    </div>
  );
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
