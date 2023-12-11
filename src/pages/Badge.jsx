import { TableBadgeList } from "@/components/tables/badge/TableBadgeList";
import { LayoutDashboardContent } from "@/layout";
import {
  fetchAchievements,
  fetchAchievementsSelector,
  toggleShouldFetchLatestAchievements,
} from "@/store/achievements/getAchievementsSlice";
import { Heading, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/spinner";
import { useCustomToast } from "@/hooks";
import {
  clearPatchAchievementsState,
  patchAchievementsSelector,
} from "@/store/achievements";

function Badge() {
  const {
    data: dataFetch,
    status: statusFetch,
    message: messageFetch,
    shouldFetchLatestAchievements,
  } = useSelector(fetchAchievementsSelector);

  const { status: statusPatch, message: messagePatch } = useSelector(
    patchAchievementsSelector
  );
  useCustomToast(statusPatch, messagePatch);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAchievements());
    if (shouldFetchLatestAchievements) {
      dispatch(toggleShouldFetchLatestAchievements());
      dispatch(fetchAchievements());
    }
    return () => {
      dispatch(clearPatchAchievementsState());
    };
  }, [dispatch, shouldFetchLatestAchievements]);

  return (
    <LayoutDashboardContent>
      <Heading
        as="h1"
        color={"#201A18"}
        fontSize={"2xl"}
        fontWeight="bold"
        mb={"1.5rem"}
      >
        Kelola Lencana
      </Heading>
      <Flex
        bg={"white"}
        h={"100vh"}
        borderRadius={"xl"}
        boxShadow={"md"}
        direction={"column"}
        gap={"1.5rem"}
        p={"1.5rem"}
      >
        {statusFetch === "loading" && <Spinner />}
        {statusFetch === "failed" && <p>{messageFetch}</p>}
        {statusFetch === "success" && <TableBadgeList data={dataFetch} />}
      </Flex>
    </LayoutDashboardContent>
  );
}

export default Badge;
