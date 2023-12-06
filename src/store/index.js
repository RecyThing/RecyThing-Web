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
  },
});
