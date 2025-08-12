import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchCustomerCreate,
  fetchCustomerDelete,
  fetchCustomerDetail,
  fetchCustomerList,
  fetchCustomerSearch,
  fetchCustomerUpdate,
} from '../createAsyncThunk/customersThunk';

interface AppState {
  error: any;

  addCustomerData: any;
  addCustomerLoading: boolean;

  updateCustomerData: any;
  updateCustomerLoading: boolean;

  CustomerListData: any;
  CustomerListLoading: boolean;

  customerDeleteData: any;
  customerDeleteLoading: boolean;

  customerDetailData: any;
  customerDetailLoading: boolean;

  customerSearchData: any;
  customerSearchLoading: boolean;
}

//  Initial app state
const initialState: AppState = {
  error: null,

  addCustomerData: null,
  addCustomerLoading: false,

  updateCustomerData: null,
  updateCustomerLoading: false,

  CustomerListData: null,
  CustomerListLoading: false,

  customerDeleteData: null,
  customerDeleteLoading: false,

  customerDetailData: null,
  customerDetailLoading: false,

  customerSearchData: null,
  customerSearchLoading: false,
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
const customersSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setAddCustomerData(state, action: PayloadAction<any>) {
      state.addCustomerData = action.payload;
    },
    setUpdateCustomerData(state, action: PayloadAction<any>) {
      state.updateCustomerData = action.payload;
    },
    setCustomerListData(state, action: PayloadAction<any>) {
      state.CustomerListData = action.payload;
    },
    setCustomerDeleteData(state, action: PayloadAction<any>) {
      state.customerDeleteData = action.payload;
    },
    setCustomerDetailData(state, action: PayloadAction<any>) {
      state.customerDetailData = action.payload;
    },
    setCustomerSearchData(state, action: PayloadAction<any>) {
      state.customerSearchData = action.payload;
    },
    setCustomerLoaderData(state, action: PayloadAction<any>) {
      state.addCustomerLoading = false;
      state.CustomerListLoading = false;
      state.customerDeleteLoading = false;
      state.customerDetailLoading = false;
      state.customerSearchLoading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    //Using helper functions for fetchCustomerCreate
    builder
      .addCase(fetchCustomerCreate.pending, handlePending('addCustomerLoading'))
      .addCase(
        fetchCustomerCreate.fulfilled,
        handleFulfilled('addCustomerData', 'addCustomerLoading'),
      )
      .addCase(
        fetchCustomerCreate.rejected,
        handleRejected('addCustomerLoading'),
      );

    //Using helper functions for fetchCustomerUpdate
    builder
      .addCase(
        fetchCustomerUpdate.pending,
        handlePending('updateCustomerLoading'),
      )
      .addCase(
        fetchCustomerUpdate.fulfilled,
        handleFulfilled('updateCustomerData', 'updateCustomerLoading'),
      )
      .addCase(
        fetchCustomerUpdate.rejected,
        handleRejected('updateCustomerLoading'),
      );

    //Using helper functions for fetchCustomerList
    builder
      .addCase(fetchCustomerList.pending, handlePending('CustomerListLoading'))
      .addCase(
        fetchCustomerList.fulfilled,
        handleFulfilled('CustomerListData', 'CustomerListLoading'),
      )
      .addCase(
        fetchCustomerList.rejected,
        handleRejected('CustomerListLoading'),
      );

    //Using helper functions for fetchCustomerDelete
    builder
      .addCase(
        fetchCustomerDelete.pending,
        handlePending('customerDeleteLoading'),
      )
      .addCase(
        fetchCustomerDelete.fulfilled,
        handleFulfilled('customerDeleteData', 'customerDeleteLoading'),
      )
      .addCase(
        fetchCustomerDelete.rejected,
        handleRejected('customerDeleteLoading'),
      );

    //Using helper functions for fetchCustomerDetail
    builder
      .addCase(
        fetchCustomerDetail.pending,
        handlePending('customerDetailLoading'),
      )
      .addCase(
        fetchCustomerDetail.fulfilled,
        handleFulfilled('customerDetailData', 'customerDetailLoading'),
      )
      .addCase(
        fetchCustomerDetail.rejected,
        handleRejected('customerDetailLoading'),
      );

    //Using helper functions for fetchCustomerSearch
    builder
      .addCase(
        fetchCustomerSearch.pending,
        handlePending('customerSearchLoading'),
      )
      .addCase(
        fetchCustomerSearch.fulfilled,
        handleFulfilled('customerSearchData', 'customerSearchLoading'),
      )
      .addCase(
        fetchCustomerSearch.rejected,
        handleRejected('customerSearchLoading'),
      );
  },
});

export const {
  setAddCustomerData,
  setUpdateCustomerData,
  setCustomerListData,
  setCustomerDeleteData,
  setCustomerDetailData,
  setCustomerSearchData,
  setCustomerLoaderData,
} = customersSlice.actions;

export default customersSlice.reducer;
