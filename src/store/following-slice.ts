import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api";
import { FollowEntity } from "../entities/follow";
import Cookies from "js-cookie";


interface FollowersState {
  following: FollowEntity[]; 
  loading: boolean;
  error: string | null;
}

const initialState: FollowersState = {
  following: [], 
  loading: false,
  error: null,
};

export const fetchFolloweds = createAsyncThunk(
  "followeds/fetchFolloweds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiV1.get(`/following`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          },
        }
      );
      return response.data.map((followed: any) => ({
        ...followed,
        followeds: followed.following,
      }));
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch following");
    }
  }
);

export const followedUser = createAsyncThunk(
  'following/followedUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      await apiV1.post(`/follow`, { followingId: userId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return userId; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to follow user");
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "followers/unfollowUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      await apiV1.post(`/unfollow`, { followingId: userId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Failed to unfollow user");
    }
  }
);

const followedsSlice = createSlice({
  name: "followed",
  initialState,
  reducers: {
    clearFollowers(state) {
      state.following = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolloweds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFolloweds.fulfilled, (state, action: PayloadAction<FollowEntity[]>) => {
        state.following = action.payload; 
        state.loading = false;
      })
      .addCase(fetchFolloweds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(followedUser.fulfilled, (state, action) => {
        const user = state.following.find(f => f.followed.id === action.payload); 
        if (user) {
          user.isFollowing = true; 
        } else {
          state.error = `User with id ${action.payload} not found`;
        }
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const user = state.following.find(f => f.followed.id === action.payload); 
        if (user) {
          user.isFollowing = false;
        } else {
          state.error = `User with id ${action.payload} not found`;
        }
      })
      .addCase(followedUser.rejected, (state, action) => {
        state.error = action.payload as string; 
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.error = action.payload as string; 
      });
  },
});

export const { clearFollowers } = followedsSlice.actions;

export default followedsSlice.reducer;
