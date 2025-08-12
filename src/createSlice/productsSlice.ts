import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchProduct,
  fetchProductCreate,
  fetchProductDelete,
  fetchProductDetail,
  fetchProductsImageDelete,
  fetchProductsSearch,
  fetchProductUpdate,
} from '../createAsyncThunk/productsThunk';

interface AppState {
  error: any;

  addProductData: any;
  addProductLoading: boolean;

  productListData: any;
  productListLoading: boolean;

  productDetailData: any;
  productDetailLoading: boolean;

  productUpdateData: any;
  productUpdateLoading: boolean;

  productDeleteData: any;
  productDeleteLoading: boolean;

  productSearchData: any;
  productSearchLoading: boolean;

  productImageDeleteData: any;
  productImageDeleteLoading: boolean;
}

//  Initial app state
const initialState: AppState = {
  error: null,

  addProductData: null,
  addProductLoading: false,

  productListData: null,
  productListLoading: false,

  productDetailData: null,
  productDetailLoading: false,

  productUpdateData: null,
  productUpdateLoading: false,

  productDeleteData: null,
  productDeleteLoading: false,

  productSearchData: null,
  productSearchLoading: false,

  productImageDeleteData: null,
  productImageDeleteLoading: false,
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
const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAddProductData(state, action: PayloadAction<any>) {
      state.addProductData = action.payload;
    },
    setProductListData(state, action: PayloadAction<any>) {
      state.productListData = action.payload;
    },
    setProductDetailData(state, action: PayloadAction<any>) {
      state.productDetailData = action.payload;
    },
    setProductUpdateData(state, action: PayloadAction<any>) {
      state.productUpdateData = action.payload;
    },
    setProductDeleteData(state, action: PayloadAction<any>) {
      state.productDeleteData = action.payload;
    },
    setProductSearchData(state, action: PayloadAction<any>) {
      state.productSearchData = action.payload;
    },
    setProductImageDeleteData(state, action: PayloadAction<any>) {
      state.productImageDeleteData = action.payload;
    },
    setProductLoaderData(state, action: PayloadAction<any>) {
      state.addProductLoading = false;
      state.productListLoading = false;
      state.productDetailLoading = false;
      state.productUpdateLoading = false;
      state.productDeleteLoading = false;
      state.productSearchLoading = false;
      state.productImageDeleteLoading = false;
      state.error = null;
    },
  },

  extraReducers: builder => {
    //Using helper functions for fetchProductCreate
    builder
      .addCase(fetchProductCreate.pending, handlePending('addProductLoading'))
      .addCase(
        fetchProductCreate.fulfilled,
        handleFulfilled('addProductData', 'addProductLoading'),
      )
      .addCase(
        fetchProductCreate.rejected,
        handleRejected('addProductLoading'),
      );

    //Using helper functions for fetchProduct
    builder
      .addCase(fetchProduct.pending, handlePending('productListLoading'))
      .addCase(
        fetchProduct.fulfilled,
        handleFulfilled('productListData', 'productListLoading'),
      )
      .addCase(fetchProduct.rejected, handleRejected('productListLoading'));

    //Using helper functions for fetchProductDetail
    builder
      .addCase(
        fetchProductDetail.pending,
        handlePending('productDetailLoading'),
      )
      .addCase(
        fetchProductDetail.fulfilled,
        handleFulfilled('productDetailData', 'productDetailLoading'),
      )
      .addCase(
        fetchProductDetail.rejected,
        handleRejected('productDetailLoading'),
      );

    //Using helper functions for fetchProductUpdate
    builder
      .addCase(
        fetchProductUpdate.pending,
        handlePending('productUpdateLoading'),
      )
      .addCase(
        fetchProductUpdate.fulfilled,
        handleFulfilled('productUpdateData', 'productUpdateLoading'),
      )
      .addCase(
        fetchProductUpdate.rejected,
        handleRejected('productUpdateLoading'),
      );

    //Using helper functions for fetchProductDelete
    builder
      .addCase(
        fetchProductDelete.pending,
        handlePending('productDeleteLoading'),
      )
      .addCase(
        fetchProductDelete.fulfilled,
        handleFulfilled('productDeleteData', 'productDeleteLoading'),
      )
      .addCase(
        fetchProductDelete.rejected,
        handleRejected('productDeleteLoading'),
      );

    //Using helper functions for fetchProductsSearch
    builder
      .addCase(
        fetchProductsSearch.pending,
        handlePending('productSearchLoading'),
      )
      .addCase(
        fetchProductsSearch.fulfilled,
        handleFulfilled('productSearchData', 'productSearchLoading'),
      )
      .addCase(
        fetchProductsSearch.rejected,
        handleRejected('productSearchLoading'),
      );

    //Using helper functions for fetchProductsImageDelete
    builder
      .addCase(
        fetchProductsImageDelete.pending,
        handlePending('productImageDeleteLoading'),
      )
      .addCase(
        fetchProductsImageDelete.fulfilled,
        handleFulfilled('productImageDeleteData', 'productImageDeleteLoading'),
      )
      .addCase(
        fetchProductsImageDelete.rejected,
        handleRejected('productImageDeleteLoading'),
      );
  },
});

export const {
  setAddProductData,
  setProductListData,
  setProductDetailData,
  setProductUpdateData,
  setProductDeleteData,
  setProductSearchData,
  setProductImageDeleteData,
  setProductLoaderData,
} = productsSlice.actions;

export default productsSlice.reducer;
