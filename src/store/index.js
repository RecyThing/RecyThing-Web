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
  createAdminReducer,
  deleteAdminReducer,
  fetchAdminReducer,
  fetchAdminsReducer,
  updateAdminReducer,
} from "./admin";
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
  fetchDataReportReducer,
  fetchDataReportsReducer,
  patchDataReportReducer,
} from "./report";
import { createTrashesReducer, deleteTrashesReducer, fetchTrashReducer, fetchTrashesReducer, updateTrashesReducer } from "./trash-category";

export const store = configureStore({
  reducer: {
    auth: loginReducer,

    fetchUsers: fetchUsersReducer,
    fetchUser: fetchUserReducer,
    deleteUser: deleteUserReducer,

    fetchAdmins: fetchAdminsReducer,
    fetchAdmin: fetchAdminReducer,
    deleteAdmin: deleteAdminReducer,
    createAdmin: createAdminReducer,
    updateAdmin: updateAdminReducer,

    fetchVouchers: fetchVouchersReducer,
    fetchVoucher: fetchVoucherReducer,
    updateVoucher: updateVoucherReducer,
    deleteVoucher: deleteVoucherReducer,
    createVoucher: createVoucherReducer,

    fetchTrash: fetchTrashReducer,
    fetchTrashes: fetchTrashesReducer,
    updateTrashes: updateTrashesReducer,
    deleteTrashes: deleteTrashesReducer,
    createTrashes: createTrashesReducer,

    fetchDataReports: fetchDataReportsReducer,
    fetchDataReport: fetchDataReportReducer,
    patchDataReport: patchDataReportReducer,

    fetchAchievements: fetchAchievementsReducer,
    patchAchievements: patchAchievementsReducer,

    fetchPrompts: fetchPromptsReducer,
    fetchPrompt: fetchPromptReducer,
    updatePrompt: updatePromptReducer,
    deletePrompt: deletePromptReducer,
    createPrompt: createPromptReducer,
  },
});
