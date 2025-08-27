import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiV1 } from "../libs/api";
import Cookies from "js-cookie";

interface FollowState {
  following: any[];
  followers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowState = {
  following: [],
  followers: [],
  loading: false,
  error: null,
};

export const followUser = createAsyncThunk(
  "follows/followUser",
  async (followedId: number, { rejectWithValue }) => {
    console.log("Follow user ID: ", followedId);
    try {
      const response = await apiV1.post(
        "/follow",
        { followedId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return { userId: followedId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to follow user"
      );
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "follows/unfollowUser",
  async (followedId: number, { rejectWithValue }) => {
    try {
      const response = await apiV1.post(
        "/unfollow",
        { followedId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      return { userId: followedId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to unfollow user"
      );
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  "follows/fetchFollowing",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiV1.get("/following", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch following"
      );
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  "follows/fetchFollowers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiV1.get("/followers", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch followers"
      );
    }
  }
);

const followSlice = createSlice({
  name: "follows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle follow user actions
    builder
      .addCase(followUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        const followedUser = action.payload.userId;

        if (!state.following.some((f) => f.followedId === followedUser)) {
          state.following.push({ followedId: followedUser, isFollowing: true });
        }
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle unfollow user actions
    builder
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        const unfollowedUser = action.payload.userId;

        // Update followers list to set isFollowing to false
        state.followers = state.followers.map((follower) => {
          if (follower.follower.id === unfollowedUser) {
            return { ...follower, isFollowing: false };
          }
          return follower;
        });

        // Remove user from following list
        state.following = state.following.filter(
          (user) => user.followedId !== unfollowedUser
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle fetching following users
    builder.addCase(fetchFollowing.fulfilled, (state, action) => {
      state.following = action.payload; // Assuming API returns list of users followed
    });

    // Handle fetching followers
    builder.addCase(fetchFollowers.fulfilled, (state, action) => {
      state.followers = action.payload; // Assuming API returns list of followers
    });
  },
});

// Export the reducer
export default followSlice.reducer;
