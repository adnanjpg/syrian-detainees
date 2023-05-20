import type { Post } from "@prisma/client";
import { api } from "~/utils/api";

import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingPage, LoadingSpinnerSpacy } from "~/components/loader";

export const PostsView = () => {
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
