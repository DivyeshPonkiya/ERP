import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchDashboard,
  fetchForgetPassword,
  fetchLogin,
  fetchProfile,
  fetchProfileUpdate,
  fetchRegister,
  fetchResetPassword,
  fetchRevoke,
  fetchToken,
  fetchUpdatePassword,
} from '../createAsyncThunk/authAsyncThunk';

interface AppState {
  error: any;

  loginData: any;
  loginLoading: boolean;

  tokenData: any;
  tokenLoading: boolean;

  registerData: any;
  registerLoading: boolean;

  forgetPassData: any;
  forgetPassLoading: boolean;

  resetPasswordData: any;
  resetPasswordLoading: boolean;

  revokeData: any;
  revokeLoading: boolean;

  profileData: any;
  profileLoading: boolean;

  profileUpdateData: any;
  profileUpdateLoading: boolean;

  updatePasswordData: any;
  updatePasswordLoading: boolean;

  dashboardData: any;
  dashboardLoading: boolean;
}

//  Initial app state
const initialState: AppState = {
  error: null,

  loginData: null,
  loginLoading: false,

  tokenData: null,
  tokenLoading: false,

  registerData: null,
  registerLoading: false,

  forgetPassData: null,
  forgetPassLoading: false,

  resetPasswordData: null,
  resetPasswordLoading: false,

  revokeData: null,
  revokeLoading: false,

  profileData: null,
  profileLoading: false,

  profileUpdateData: null,
  profileUpdateLoading: false,

  updatePasswordData: null,
  updatePasswordLoading: false,

  dashboardData: null,
  dashboardLoading: false,
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
    setRegisterData(state, action: PayloadAction<any>) {
      state.registerData = action.payload;
    },
    setForgetPassData(state, action: PayloadAction<any>) {
      state.forgetPassData = action.payload;
    },
    setResetPasswordData(state, action: PayloadAction<any>) {
      state.resetPasswordData = action.payload;
    },
    setRevokeData(state, action: PayloadAction<any>) {
      state.revokeData = action.payload;
    },
    setProfileData(state, action: PayloadAction<any>) {
      state.profileData = action.payload;
    },
    setProfileUpdateData(state, action: PayloadAction<any>) {
      state.profileUpdateData = action.payload;
    },
    setUpdatePasswordData(state, action: PayloadAction<any>) {
      state.updatePasswordData = action.payload;
    },
    setDashboardData(state, action: PayloadAction<any>) {
      state.dashboardData = action.payload;
    },
    setErrorData(state, action: PayloadAction<any>) {
      state.error = null;
      state.loginLoading = false;
      state.tokenLoading = false;
      state.registerLoading = false;
      state.forgetPassLoading = false;
      state.resetPasswordLoading = false;
      state.revokeLoading = false;
      state.profileLoading = false;
      state.profileUpdateLoading = false;
      state.updatePasswordLoading = false;
      state.dashboardLoading = false;
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

    //Using helper functions for fetchRegister
    builder
      .addCase(fetchRegister.pending, handlePending('profileLoading'))
      .addCase(
        fetchRegister.fulfilled,
        handleFulfilled('registerData', 'registerLoading'),
      )
      .addCase(fetchRegister.rejected, handleRejected('registerLoading'));

    //Using helper functions for fetchForgetPassword
    builder
      .addCase(fetchForgetPassword.pending, handlePending('forgetPassLoading'))
      .addCase(
        fetchForgetPassword.fulfilled,
        handleFulfilled('forgetPassData', 'forgetPassLoading'),
      )
      .addCase(
        fetchForgetPassword.rejected,
        handleRejected('forgetPassLoading'),
      );

    //Using helper functions for fetchResetPassword
    builder
      .addCase(
        fetchResetPassword.pending,
        handlePending('resetPasswordLoading'),
      )
      .addCase(
        fetchResetPassword.fulfilled,
        handleFulfilled('resetPasswordData', 'resetPasswordLoading'),
      )
      .addCase(
        fetchResetPassword.rejected,
        handleRejected('resetPasswordLoading'),
      );

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

    //  Using helper functions for fetchProfileUpdate
    builder
      .addCase(
        fetchProfileUpdate.pending,
        handlePending('profileUpdateLoading'),
      )
      .addCase(
        fetchProfileUpdate.fulfilled,
        handleFulfilled('profileUpdateData', 'profileUpdateLoading'),
      )
      .addCase(
        fetchProfileUpdate.rejected,
        handleRejected('profileUpdateLoading'),
      );

    //  Using helper functions for fetchUpdatePassword
    builder
      .addCase(
        fetchUpdatePassword.pending,
        handlePending('updatePasswordLoading'),
      )
      .addCase(
        fetchUpdatePassword.fulfilled,
        handleFulfilled('updatePasswordData', 'updatePasswordLoading'),
      )
      .addCase(
        fetchUpdatePassword.rejected,
        handleRejected('updatePasswordLoading'),
      );

    //  Using helper functions for fetchDashboard
    builder
      .addCase(fetchDashboard.pending, handlePending('dashboardLoading'))
      .addCase(
        fetchDashboard.fulfilled,
        handleFulfilled('dashboardData', 'dashboardLoading'),
      )
      .addCase(fetchDashboard.rejected, handleRejected('dashboardLoading'));
  },
});

export const {
  setLoginData,
  setTokenData,
  setRegisterData,
  setForgetPassData,
  setResetPasswordData,
  setRevokeData,
  setProfileData,
  setProfileUpdateData,
  setUpdatePasswordData,
  setDashboardData,
  setErrorData,
} = authSlice.actions;

export default authSlice.reducer;
