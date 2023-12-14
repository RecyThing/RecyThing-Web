import { configureStore } from "@reduxjs/toolkit";
import { createCommunityReducer, deleteCommunityReducer, fetchCommunitiesReducer, fetchCommunityReducer, updateCommunityReducer } from "./community";
import { createEventReducer, deleteEventReducer, fetchEventsReducer, fetchEventReducer, updateEventReducer } from "./event-community";
import { createMissionReducer, deleteMissionReducer, fetchMissionReducer, fetchMissionsReducer, updateMissionReducer } from "./mission";
import { createPromptReducer, deletePromptReducer, fetchPromptReducer, fetchPromptsReducer, updatePromptReducer } from "./prompt";
import { createRecyclesReducer, deleteRecyclesReducer, fetchCategoriesReducer, fetchRecycleReducer, fetchRecyclesReducer } from "./waste-exchange";
import { createTrashesReducer, deleteTrashesReducer, fetchTrashReducer, fetchTrashesReducer, updateTrashesReducer } from "./trash-category";
import { createVoucherReducer, deleteVoucherReducer, fetchVoucherReducer, fetchVouchersReducer, updateVoucherReducer } from "./voucher";
import { deleteUserReducer, fetchUserReducer, fetchUsersReducer } from "./user";
import { fetchAchievementsReducer, patchAchievementsReducer } from "@/store/achievements";
import { fetchApprovalReducer, fetchApprovalsReducer, updateApprovalReducer } from "./approval-mission";
import { fetchDataReportReducer, fetchDataReportsReducer, patchDataReportReducer } from "./report";
import { fetchDataTransactionReducer, fetchDatasTransactionReducer, patchDataTransactionReducer } from "./transaction-list";
import { createAdminReducer, deleteAdminReducer, fetchAdminReducer, fetchAdminsReducer, updateAdminReducer } from "./admin";
import { loginReducer } from "./auth";

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

		createMission: createMissionReducer,
		deleteMission: deleteMissionReducer,
		fetchMission: fetchMissionReducer,
		fetchMissions: fetchMissionsReducer,
		updateMission: updateMissionReducer,

    fetchAdmins: fetchAdminsReducer,
    fetchAdmin: fetchAdminReducer,
    updateAdmin: updateAdminReducer,
    deleteAdmin: deleteAdminReducer,
    createAdmin: createAdminReducer,

		createEvent: createEventReducer,
		deleteEvent: deleteEventReducer,
		fetchEvent: fetchEventReducer,
		fetchEvents: fetchEventsReducer,
		updateEvent: updateEventReducer,
	},
});
