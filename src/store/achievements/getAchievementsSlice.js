import { APIAchievements } from "@/apis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	message: "",
	data: [],
    shouldFetchLatestAchievements: false,
};

export const fetchAchievements = createAsyncThunk(
	"GET /admins/manage/achievements",
	APIAchievements.getAchievements
);

export const fetchAchievementsSlice = createSlice({
        name : "fetchAchievements",
        initialState,
        reducers: {
            clearFetchAchievementsState: (state) => {
                state.status = "idle";
                state.message = "";
                state.data = [];
            },
            toggleShouldFetchLatestAchievements: (state) => {
                state.shouldFetchLatestAchievements = !state.shouldFetchLatestAchievements;
              },
        },
        extraReducers: (builder) => {
        builder.addCase(fetchAchievements.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fetchAchievements.fulfilled, (state, action) => {
            state.status = "success";
            state.message = action.payload.message;
            state.data = action.payload.data;
        });
		builder.addCase(fetchAchievements.rejected, (state, action) => {
			state.status = "failed";
			state.message = action.error.message;
		});
    }
})

export const fetchAchievementsSelector = (state) => state.fetchAchievements;
export const { toggleShouldFetchLatestAchievements, clearFetchAchievementsState } = fetchAchievementsSlice.actions;
export const fetchAchievementsReducer = fetchAchievementsSlice.reducer;