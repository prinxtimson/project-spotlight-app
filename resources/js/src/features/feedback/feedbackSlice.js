import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser } from "../auth/authSlice";
import feedbackService from "./feedbackService";

const initialState = {
    feedbacks: null,
    feedback: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// get feedbacks
export const getFeedbacks = createAsyncThunk(
    "feedback/get",
    async (thunkAPI) => {
        try {
            return await feedbackService.getFeedbacks();
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("user");
                thunkAPI.dispatch(clearUser());
            }
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const getFeedbacksByPage = createAsyncThunk(
    "feedback/get-by-page",
    async (page, thunkAPI) => {
        try {
            return await feedbackService.getFeedbacksByPage(page);
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("user");
                thunkAPI.dispatch(clearUser());
            }
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const getFeedback = createAsyncThunk(
    "feedback/get-single",
    async (id, thunkAPI) => {
        try {
            return await feedbackService.getFeedback(id);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const sendFeedback = createAsyncThunk(
    "feedback/send",
    async (data, thunkAPI) => {
        try {
            await feedbackService.sendFeedback(data);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const updateFeedback = createAsyncThunk(
    "feedback/update",
    async (data, thunkAPI) => {
        try {
            return await feedbackService.updateFeedback(data);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const deleteFeedback = createAsyncThunk(
    "feedback/delete",
    async (id, thunkAPI) => {
        try {
            const res = await feedbackService.deleteFeedback(id);

            return res;
        } catch (err) {
            if (err.response.status === 401) {
                localStorage.removeItem("user");
                thunkAPI.dispatch(clearUser());
            }
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
        clear: (state) => {
            state.feedbacks = null;
            state.feedback = null;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedbacks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeedbacks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbacks = action.payload.data;
            })
            .addCase(getFeedbacks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFeedbacksByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeedbacksByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedbacks = action.payload.data;
            })
            .addCase(getFeedbacksByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.feedback = action.payload.data;
            })
            .addCase(getFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.feedback = action.payload.data;
                state.message = action.payload.msg;
            })
            .addCase(sendFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.feedback = action.payload.data;
                state.message = action.payload.msg;
            })
            .addCase(updateFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteFeedback.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.msg;
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = feedbackSlice.actions;
export default feedbackSlice.reducer;
