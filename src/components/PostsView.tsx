import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

import type { Post } from "@prisma/client";
import { api } from "~/utils/api";

import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingPage, LoadingSpinnerSpacy } from "~/components/loader";
import { useRealtimePostUpdates } from "~/hooks/useRealtimePostUpdates";

export const PostsView = () => {
  const {
    data,
    fetchNextPage,
    isLoading,
    isError,
    error,
    hasNextPage,
    refetch,
  } = api.posts.getAll.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  useRealtimePostUpdates(() => void refetch());

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

  const timeAgo = new TimeAgo("en-US");

  const time = timeAgo.format(post.createDate);

  return (
    <div className="flex w-full flex-row border-b p-4">
      <div className="flex-grow">{post.content}</div>
      <div className="min-w-fit">{time}</div>
    </div>
  );
};
