import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./auth";
import { deleteUserReducer, fetchUserReducer, fetchUsersReducer } from "./user";
import {
  createVoucherReducer,
  deleteVoucherReducer,
  fetchVoucherReducer,
  fetchVouchersReducer,
  updateVoucherReducer,
} from "./voucher";
import {
  fetchDataReportReducer,
  fetchDataReportsReducer,
  patchDataReportReducer,
} from "./report";
import {
  createTrashesReducer,
  deleteTrashesReducer,
  fetchTrashReducer,
  fetchTrashesReducer,
  updateTrashesReducer,
} from "./trash-category";
import {
  fetchAchievementsReducer,
  patchAchievementsReducer,
} from "@/store/achievements";
import {
  createPromptReducer,
  deletePromptReducer,
  fetchPromptReducer,
  fetchPromptsReducer,
  updatePromptReducer,
} from "./prompt";
import {
  createCommunityReducer,
  deleteCommunityReducer,
  fetchCommunitiesReducer,
  fetchCommunityReducer,
  updateCommunityReducer,
} from "./community";

import {
  createEventReducer,
  deleteEventReducer,
  fetchEventsReducer,
  fetchEventReducer,
  updateEventReducer,
} from "./event-community";
export const store = configureStore({
  reducer: {
    auth: loginReducer,

    deleteUser: deleteUserReducer,
    fetchUser: fetchUserReducer,
    fetchUsers: fetchUsersReducer,

    createVoucher: createVoucherReducer,
    deleteVoucher: deleteVoucherReducer,
    fetchVoucher: fetchVoucherReducer,
    fetchVouchers: fetchVouchersReducer,
    updateVoucher: updateVoucherReducer,

    fetchDataReport: fetchDataReportReducer,
    fetchDataReports: fetchDataReportsReducer,
    patchDataReport: patchDataReportReducer,

    createTrashes: createTrashesReducer,
    deleteTrashes: deleteTrashesReducer,
    fetchTrash: fetchTrashReducer,
    fetchTrashes: fetchTrashesReducer,
    updateTrashes: updateTrashesReducer,

    fetchAchievements: fetchAchievementsReducer,
    patchAchievements: patchAchievementsReducer,

    createPrompt: createPromptReducer,
    deletePrompt: deletePromptReducer,
    fetchPrompt: fetchPromptReducer,
    fetchPrompts: fetchPromptsReducer,
    updatePrompt: updatePromptReducer,

    createCommunity: createCommunityReducer,
    deleteCommunity: deleteCommunityReducer,
    fetchCommunities: fetchCommunitiesReducer,
    fetchCommunity: fetchCommunityReducer,
    updateCommunity: updateCommunityReducer,

    createEvent: createEventReducer,
    deleteEvent: deleteEventReducer,
    fetchEvents: fetchEventsReducer,
    fetchEvent: fetchEventReducer,
    updateEvent: updateEventReducer,
  },
});
