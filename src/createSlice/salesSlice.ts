import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchSalesCreate,
  fetchSalesDelete,
  fetchSalesDetail,
  fetchSalesList,
  fetchSalesUpdate,
} from '../createAsyncThunk/salesThunk';

interface AppState {
  error: any;

  addSalesData: any;
  addSalesLoading: boolean;

  updateSalesData: any;
  updateSalesLoading: boolean;

  salesListData: any;
  salesListLoading: boolean;

  salesDetailData: any;
  salesDetailLoading: boolean;

  salesDeleteData: any;
  salesDeleteLoading: boolean;
}

//  Initial app state
const initialState: AppState = {
  error: null,

  addSalesData: null,
  addSalesLoading: false,

  updateSalesData: null,
  updateSalesLoading: false,

  salesListData: null,
  salesListLoading: false,

  salesDetailData: null,
  salesDetailLoading: false,

  salesDeleteData: null,
  salesDeleteLoading: false,
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
const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setAddSalesData(state, action: PayloadAction<any>) {
      state.addSalesData = action.payload;
    },
    setUpdateSalesData(state, action: PayloadAction<any>) {
      state.updateSalesData = action.payload;
    },
    setSalesListData(state, action: PayloadAction<any>) {
      state.salesListData = action.payload;
    },
    setSalesDetailData(state, action: PayloadAction<any>) {
      state.salesDetailData = action.payload;
    },
    setSalesDeleteData(state, action: PayloadAction<any>) {
      state.salesDeleteData = action.payload;
    },
    setSalesLoaderData(state, action: PayloadAction<any>) {
      state.addSalesLoading = false;
      state.updateSalesLoading = false;
      state.salesListLoading = false;
      state.salesDetailLoading = false;
      state.salesDeleteLoading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    //Using helper functions for fetchSalesCreate
    builder
      .addCase(fetchSalesCreate.pending, handlePending('addSalesLoading'))
      .addCase(
        fetchSalesCreate.fulfilled,
        handleFulfilled('addSalesData', 'addSalesLoading'),
      )
      .addCase(fetchSalesCreate.rejected, handleRejected('addSalesLoading'));

    //Using helper functions for fetchSalesUpdate
    builder
      .addCase(fetchSalesUpdate.pending, handlePending('updateSalesLoading'))
      .addCase(
        fetchSalesUpdate.fulfilled,
        handleFulfilled('updateSalesData', 'updateSalesLoading'),
      )
      .addCase(fetchSalesUpdate.rejected, handleRejected('updateSalesLoading'));

    //Using helper functions for fetchSalesList
    builder
      .addCase(fetchSalesList.pending, handlePending('salesListLoading'))
      .addCase(
        fetchSalesList.fulfilled,
        handleFulfilled('salesListData', 'salesListLoading'),
      )
      .addCase(fetchSalesList.rejected, handleRejected('salesListLoading'));

    //Using helper functions for fetchSalesDetail
    builder
      .addCase(fetchSalesDetail.pending, handlePending('salesDetailLoading'))
      .addCase(
        fetchSalesDetail.fulfilled,
        handleFulfilled('salesDetailData', 'salesDetailLoading'),
      )
      .addCase(fetchSalesDetail.rejected, handleRejected('salesDetailLoading'));

    //Using helper functions for fetchSalesDelete
    builder
      .addCase(fetchSalesDelete.pending, handlePending('salesDeleteLoading'))
      .addCase(
        fetchSalesDelete.fulfilled,
        handleFulfilled('salesDeleteData', 'salesDeleteLoading'),
      )
      .addCase(fetchSalesDelete.rejected, handleRejected('salesDeleteLoading'));
  },
});

export const {
  setAddSalesData,
  setUpdateSalesData,
  setSalesListData,
  setSalesDetailData,
  setSalesDeleteData,
  setSalesLoaderData,
} = salesSlice.actions;

export default salesSlice.reducer;
