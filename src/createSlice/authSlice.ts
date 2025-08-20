import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchHolidays,
  fetchLogin,
  fetchProfile,
  fetchRevoke,
  fetchToken,
} from '../createAsyncThunk/authAsyncThunk';

interface AppState {
  error: any;

  loginData: any;
  loginLoading: boolean;

  tokenData: any;
  tokenLoading: boolean;

  revokeData: any;
  revokeLoading: boolean;

  profileData: any;
  profileLoading: boolean;

  holidaysData: any;
  holidaysLoading: boolean;
}

//  Initial app state
const initialState: AppState = {
  error: null,

  loginData: null,
  loginLoading: false,

  tokenData: null,
  tokenLoading: false,

  revokeData: null,
  revokeLoading: false,

  profileData: null,
  profileLoading: false,

  holidaysData: null,
  holidaysLoading: false,
};

// to reduce repetitive code
// These functions help avoid repeating logic for pending/fulfilled/rejected
const handlePending = (loadingKey: keyof AppState) => (state: AppState) => {
  state[loadingKey] = true;
  state.error = null;
};

const handleFulfilled =
  (dataKey: keyof AppState, loadingKey: keyof AppState) =>
  (state: AppState, action: PayloadAction<any>) => {
    state[loadingKey] = false;
    state[dataKey] = action.payload;
  };

const handleRejected =
  (loadingKey: keyof AppState) =>
  (state: AppState, action: PayloadAction<any>) => {
    state[loadingKey] = false;
    state.error = action.payload;
  };

// ✅ Updated slice using helper functions above
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginData(state, action: PayloadAction<any>) {
      state.loginData = action.payload;
    },
    setTokenData(state, action: PayloadAction<any>) {
      state.tokenData = action.payload;
    },
    setRevokeData(state, action: PayloadAction<any>) {
      state.revokeData = action.payload;
    },
    setProfileData(state, action: PayloadAction<any>) {
      state.profileData = action.payload;
    },
    setHolidaysData(state, action: PayloadAction<any>) {
      state.holidaysData = action.payload;
    },

    setErrorData(state, action: PayloadAction<any>) {
      state.error = null;
      state.loginLoading = false;
      state.tokenLoading = false;
      state.revokeLoading = false;
      state.profileLoading = false;
      state.holidaysLoading = false;
    },
  },
  extraReducers: builder => {
    //Using helper functions for fetchLogin
    builder
      .addCase(fetchLogin.pending, handlePending('profileLoading')) // For Loading start in login screen
      .addCase(
        fetchLogin.fulfilled,
        handleFulfilled('loginData', 'loginLoading'),
      )
      .addCase(fetchLogin.rejected, handleRejected('loginLoading'));

    //  Using helper functions for fetchToken
    builder
      .addCase(fetchToken.pending, handlePending('tokenLoading'))
      .addCase(
        fetchToken.fulfilled,
        handleFulfilled('tokenData', 'tokenLoading'),
      )
      .addCase(fetchToken.rejected, handleRejected('tokenLoading'));

    // Using helper functions for fetchRevoke
    builder
      .addCase(fetchRevoke.pending, handlePending('revokeLoading'))
      .addCase(
        fetchRevoke.fulfilled,
        handleFulfilled('revokeData', 'revokeLoading'),
      )
      .addCase(fetchRevoke.rejected, handleRejected('revokeLoading'));

    //  Using helper functions for fetchProfile
    builder
      .addCase(fetchProfile.pending, handlePending('profileLoading'))
      .addCase(
        fetchProfile.fulfilled,
        handleFulfilled('profileData', 'profileLoading'),
      )
      .addCase(fetchProfile.rejected, handleRejected('profileLoading'));

    //  Using helper functions for fetchHolidays
    builder
      .addCase(fetchHolidays.pending, handlePending('holidaysLoading'))
      .addCase(
        fetchHolidays.fulfilled,
        handleFulfilled('holidaysData', 'holidaysLoading'),
      )
      .addCase(fetchHolidays.rejected, handleRejected('holidaysLoading'));
  },
});

export const {
  setLoginData,
  setTokenData,
  setRevokeData,
  setProfileData,
  setHolidaysData,

  setErrorData,
} = authSlice.actions;

export default authSlice.reducer;
