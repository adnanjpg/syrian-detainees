import { supabase } from "~/helpers/supabaseClient";
import { useEffect } from "react";

export const useRealtimePostUpdates = (refetch: () => void) => {
  return useEffect(() => {
    const client = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Post",
        },
        (_) => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      void client.unsubscribe();
    };
  }, [refetch]);
};
