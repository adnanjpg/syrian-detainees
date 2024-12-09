import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { PostsView } from "~/components/PostsView";

const Home = () => {
  return (
    <div className="flex h-screen w-screen justify-center ">
      <div className="h-max min-h-screen w-full max-w-3xl items-center border-x-2">
        <Link
          className="h-14 rounded-xl bg-teal-400 px-8 text-white"
          href={"/new-post"}
        >
          اضافة معتقل
        </Link>
        <PostsView />
      </div>
    </div>
  );
};

const App: NextPage = () => {
  return (
    <>
      <Head>
        <title>المعتقلون السوريون</title>
        <meta name="description" content="قاعدة بيانات للمعتقلين السوريين" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  );
};

export default App;
