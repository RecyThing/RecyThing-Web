import { APIAchievements } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
};

export const patchAchievements = createAsyncThunk(
	"PATCH /admins/manage/achievements/id",
    APIAchievements.patchAchievements
);

export const patchAchievementSlice = createSlice({
        name : "patchAchievements",
        initialState,
        reducers: {
            clearPatchAchievementsState: (state) => {
                state.status = "idle";
                state.message = "";
            },
        },
        extraReducers: (builder) => {
        builder.addCase(patchAchievements.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(patchAchievements.fulfilled, (state, action) => {
            state.status = "success";
            state.message = action.payload.message;
        });
		builder.addCase(patchAchievements.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
    }
})

export const patchAchievementsSelector = (state) => state.patchAchievements;
export const { clearPatchAchievementsState } = patchAchievementSlice.actions;
export const patchAchievementsReducer = patchAchievementSlice.reducer;