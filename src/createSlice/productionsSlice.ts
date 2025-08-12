import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchProductionCreate,
  fetchProductionDelete,
  fetchProductionDetail,
  fetchProductionList,
  fetchProductionUpdate,
  fetchProductionWorkCreate,
  fetchProductionWorkDelete,
  fetchProductionWorkStatusUpdate,
  fetchProductionWorkUpdate,
} from '../createAsyncThunk/productionsThunk';

interface AppState {
  error: any;

  addProductionData: any;
  addProductionLoading: boolean;

  updateProductionData: any;
  updateProductionLoading: boolean;

  ProductionListData: any;
  ProductionListLoading: boolean;

  productionDetailData: any;
  productionDetailLoading: boolean;

  productionDeleteData: any;
  productionDeleteLoading: boolean;

  addProductionWorkData: any;
  addProductionWorkLoading: boolean;

  updateProductionWorkData: any;
  updateProductionWorkLoading: boolean;

  productionWorkDeleteData: any;
  productionWorkDeleteLoading: boolean;

  productionWorkStatusUpdateData: any;
  productionWorkStatusUpdateLoading: boolean;
}

//  Initial app state
const initialState: AppState = {
  error: null,

  addProductionData: null,
  addProductionLoading: false,

  updateProductionData: null,
  updateProductionLoading: false,

  ProductionListData: null,
  ProductionListLoading: false,

  productionDetailData: null,
  productionDetailLoading: false,

  productionDeleteData: null,
  productionDeleteLoading: false,

  addProductionWorkData: null,
  addProductionWorkLoading: false,

  updateProductionWorkData: null,
  updateProductionWorkLoading: false,

  productionWorkDeleteData: null,
  productionWorkDeleteLoading: false,

  productionWorkStatusUpdateData: null,
  productionWorkStatusUpdateLoading: false,
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
const productionsSlice = createSlice({
  name: 'productions',
  initialState,
  reducers: {
    setAddProductionData(state, action: PayloadAction<any>) {
      state.addProductionData = action.payload;
    },
    setUpdateProductionData(state, action: PayloadAction<any>) {
      state.updateProductionData = action.payload;
    },
    setProductionListData(state, action: PayloadAction<any>) {
      state.ProductionListData = action.payload;
    },
    setProductionDetailData(state, action: PayloadAction<any>) {
      state.productionDetailData = action.payload;
    },
    setProductionDeleteData(state, action: PayloadAction<any>) {
      state.productionDeleteData = action.payload;
    },
    setAddProductionWorkData(state, action: PayloadAction<any>) {
      state.addProductionWorkData = action.payload;
    },
    setUpdateProductionWorkData(state, action: PayloadAction<any>) {
      state.updateProductionWorkData = action.payload;
    },
    setUpdateProductionWorkDelete(state, action: PayloadAction<any>) {
      state.productionWorkDeleteData = action.payload;
    },
    setProductionWorkStatusUpdateData(state, action: PayloadAction<any>) {
      state.productionWorkStatusUpdateData = action.payload;
    },
    setProductionLoaderData(state, action: PayloadAction<any>) {
      state.addProductionLoading = false;
      state.updateProductionLoading = false;
      state.ProductionListLoading = false;
      state.productionDetailLoading = false;
      state.productionDeleteLoading = false;
      state.addProductionWorkLoading = false;
      state.updateProductionWorkLoading = false;
      state.productionWorkDeleteLoading = false;
      state.productionWorkStatusUpdateLoading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    //Using helper functions for fetchProductionCreate
    builder
      .addCase(
        fetchProductionCreate.pending,
        handlePending('addProductionLoading'),
      )
      .addCase(
        fetchProductionCreate.fulfilled,
        handleFulfilled('addProductionData', 'addProductionLoading'),
      )
      .addCase(
        fetchProductionCreate.rejected,
        handleRejected('addProductionLoading'),
      );

    //Using helper functions for fetchProductionUpdate
    builder
      .addCase(
        fetchProductionUpdate.pending,
        handlePending('updateProductionLoading'),
      )
      .addCase(
        fetchProductionUpdate.fulfilled,
        handleFulfilled('updateProductionData', 'updateProductionLoading'),
      )
      .addCase(
        fetchProductionUpdate.rejected,
        handleRejected('updateProductionLoading'),
      );

    //Using helper functions for fetchProductionList
    builder
      .addCase(
        fetchProductionList.pending,
        handlePending('ProductionListLoading'),
      )
      .addCase(
        fetchProductionList.fulfilled,
        handleFulfilled('ProductionListData', 'ProductionListLoading'),
      )
      .addCase(
        fetchProductionList.rejected,
        handleRejected('ProductionListLoading'),
      );

    //Using helper functions for fetchProductionDetail
    builder
      .addCase(
        fetchProductionDetail.pending,
        handlePending('productionDetailLoading'),
      )
      .addCase(
        fetchProductionDetail.fulfilled,
        handleFulfilled('productionDetailData', 'productionDetailLoading'),
      )
      .addCase(
        fetchProductionDetail.rejected,
        handleRejected('productionDetailLoading'),
      );

    //Using helper functions for fetchProductionDelete
    builder
      .addCase(
        fetchProductionDelete.pending,
        handlePending('productionDeleteLoading'),
      )
      .addCase(
        fetchProductionDelete.fulfilled,
        handleFulfilled('productionDeleteData', 'productionDeleteLoading'),
      )
      .addCase(
        fetchProductionDelete.rejected,
        handleRejected('productionDeleteLoading'),
      );

    //Using helper functions for fetchProductionWorkCreate
    builder
      .addCase(
        fetchProductionWorkCreate.pending,
        handlePending('addProductionWorkLoading'),
      )
      .addCase(
        fetchProductionWorkCreate.fulfilled,
        handleFulfilled('addProductionWorkData', 'addProductionWorkLoading'),
      )
      .addCase(
        fetchProductionWorkCreate.rejected,
        handleRejected('addProductionWorkLoading'),
      );

    //Using helper functions for fetchProductionWorkUpdate
    builder
      .addCase(
        fetchProductionWorkUpdate.pending,
        handlePending('updateProductionWorkLoading'),
      )
      .addCase(
        fetchProductionWorkUpdate.fulfilled,
        handleFulfilled(
          'updateProductionWorkData',
          'updateProductionWorkLoading',
        ),
      )
      .addCase(
        fetchProductionWorkUpdate.rejected,
        handleRejected('updateProductionWorkLoading'),
      );

    //Using helper functions for fetchProductionWorkDelete
    builder
      .addCase(
        fetchProductionWorkDelete.pending,
        handlePending('productionWorkDeleteLoading'),
      )
      .addCase(
        fetchProductionWorkDelete.fulfilled,
        handleFulfilled(
          'productionWorkDeleteData',
          'productionWorkDeleteLoading',
        ),
      )
      .addCase(
        fetchProductionWorkDelete.rejected,
        handleRejected('productionWorkDeleteLoading'),
      );

    //Using helper functions for fetchProductionWorkStatusUpdate
    builder
      .addCase(
        fetchProductionWorkStatusUpdate.pending,
        handlePending('productionWorkStatusUpdateLoading'),
      )
      .addCase(
        fetchProductionWorkStatusUpdate.fulfilled,
        handleFulfilled(
          'productionWorkStatusUpdateData',
          'productionWorkStatusUpdateLoading',
        ),
      )
      .addCase(
        fetchProductionWorkStatusUpdate.rejected,
        handleRejected('productionWorkStatusUpdateLoading'),
      );
  },
});

export const {
  setAddProductionData,
  setUpdateProductionData,
  setProductionListData,
  setProductionDetailData,
  setProductionDeleteData,
  setAddProductionWorkData,
  setUpdateProductionWorkData,
  setUpdateProductionWorkDelete,
  setProductionWorkStatusUpdateData,
  setProductionLoaderData,
} = productionsSlice.actions;

export default productionsSlice.reducer;
