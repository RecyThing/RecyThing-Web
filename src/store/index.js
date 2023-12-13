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
	fetchDataTransactionReducer,
	fetchDatasTransactionReducer,
	patchDataTransactionReducer,
} from "./transaction-list";
import {
  createCommunityReducer,
  deleteCommunityReducer,
  fetchCommunitiesReducer,
  fetchCommunityReducer,
  updateCommunityReducer,
} from "./community";
import {
	fetchApprovalReducer,
	fetchApprovalsReducer,
	updateApprovalReducer,
} from "./approval-mission";
import {
  createMissionReducer,
  deleteMissionReducer,
  fetchMissionReducer,
  fetchMissionsReducer,
  updateMissionReducer,
} from "./mission";

import {
	createRecyclesReducer,
	deleteRecyclesReducer,
	fetchRecycleReducer,
	fetchRecyclesReducer,
  fetchCategoriesReducer,
} from "./waste-exchange";

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

		createRecycles: createRecyclesReducer,
		deleteRecycles: deleteRecyclesReducer,
		fetchRecycle: fetchRecycleReducer,
		fetchRecycles: fetchRecyclesReducer,
		fetchTrashCategories: fetchCategoriesReducer,

		createPrompt: createPromptReducer,
		deletePrompt: deletePromptReducer,
		fetchPrompt: fetchPromptReducer,
		fetchPrompts: fetchPromptsReducer,
		updatePrompt: updatePromptReducer,

		fetchDatasTransaction: fetchDatasTransactionReducer,
		fetchDataTransaction: fetchDataTransactionReducer,
		patchDataTransaction: patchDataTransactionReducer,

		createCommunity: createCommunityReducer,
		deleteCommunity: deleteCommunityReducer,
		fetchCommunities: fetchCommunitiesReducer,
		fetchCommunity: fetchCommunityReducer,
		updateCommunity: updateCommunityReducer,

		fetchApproval: fetchApprovalReducer,
		fetchApprovals: fetchApprovalsReducer,
		updateApproval: updateApprovalReducer,

    fetchMissions: fetchMissionsReducer,
    fetchMission: fetchMissionReducer,
    updateMission: updateMissionReducer,
    deleteMission: deleteMissionReducer,
    createMission: createMissionReducer,
  },

});
