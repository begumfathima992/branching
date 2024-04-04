import { Pagination, SimpleGrid, Stack } from "@mantine/core";
import { useState } from "react";
import { CardLoadingSkeleton } from "../../../componentsV2/skeletons/CardLoadingSkeleton";
import { LearnerCard } from "../../../componentsV2/Learner/LearnerCard";
import { NotFound } from "../../../componentsV2/NotFound";
import { useTrackLearnerQuery } from "../../../store/slices/instructorApiSlice";

export const TrackLearners = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useTrackLearnerQuery({
    page,
    per_page: 20,
  });
  return (
    <Stack p={20}>
      <SimpleGrid
        cols={
          isLoading || isFetching
            ? 3
            : !data || data?.tracked_learners.length === 0
            ? 1
            : 3
        }
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        {isLoading || isFetching ? (
          Array(3)
            .fill(0)
            .map((_, i) => <CardLoadingSkeleton key={i} />)
        ) : !data || data?.tracked_learners.length === 0 ? (
          <NotFound
            title="Looks like you don't have learner to track yet. "
            caption=""
            h={"70vh"}
          />
        ) : (
          data?.tracked_learners.map((d) => (
            <LearnerCard data={d} key={d.track_id} />
          ))
        )}
      </SimpleGrid>

      {data && data?.pagination?.total_pages > 1 && (
        <Pagination
          position="center"
          total={data?.pagination?.total_pages as number}
          onNextPage={() => setPage((prev) => prev + 1)}
          onPreviousPage={() => setPage((prev) => prev - 1)}
          value={Number(data?.pagination?.current_page)}
          onChange={(p) => setPage(p)}
        />
      )}
    </Stack>
  );
};
