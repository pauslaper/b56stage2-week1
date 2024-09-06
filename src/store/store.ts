import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import searchReducer from "./search-slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

