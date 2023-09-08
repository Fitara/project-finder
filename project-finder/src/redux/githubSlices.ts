import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import { fetchUserFromAPI } from '../utils/api';

interface GitHubState {
  user: string;
  projects: [];
  loading: boolean;
  error: string | null;
}


const initialState: GitHubState = {
  user: '',
  projects: [],
  loading: false,
  error: null,
};

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    getUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<string>) { // Unexpected any. Specify a different type.eslint@typescript-eslint/no-explicit-any
      state.loading = false;
      state.user = action.payload;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser(state) {
      state.user = '';
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  clearUser,
  clearError,
} = githubSlice.actions;

export const fetchGitHubUser = (username: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const user = await fetchUserFromAPI(username);
    dispatch(getUserSuccess(user));
  } catch (error: unknown) {
    if (typeof error === 'string') {
      dispatch(getUserFailure(error));
    } else {
      dispatch(getUserFailure('An error occurred.'));
    }
  }
};

export default githubSlice.reducer;
