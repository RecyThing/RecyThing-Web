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
  createTrashesReducer,
  deleteTrashesReducer,
  fetchTrashReducer,
  fetchTrashesReducer,
  updateTrashesReducer,
} from "./trash-category";
import {
  createMissionReducer,
  deleteMissionReducer,
  fetchMissionReducer,
  fetchMissionsReducer,
  updateMissionReducer,
} from "./mission";

export const store = configureStore({
  reducer: {
    auth: loginReducer,

    fetchUsers: fetchUsersReducer,
    fetchUser: fetchUserReducer,
    deleteUser: deleteUserReducer,

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

    fetchMissions: fetchMissionsReducer,
    fetchMission: fetchMissionReducer,
    updateMission: updateMissionReducer,
    deleteMission: deleteMissionReducer,
    createMission: createMissionReducer,
  },
});
