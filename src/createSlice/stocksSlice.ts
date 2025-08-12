import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchStock,
  fetchStockCreate,
  fetchStockEdit,
  fetchStockDelete,
  fetchStockShow,
} from '../createAsyncThunk/stocksThunk';

interface AppState {
  error: any;

  AddStockData: any;
  AddStockLoading: boolean;

  EditStockData: any;
  EditStockLoading: boolean;

  StockListData: any;
  StockListLoading: boolean;

  DeleteStockData: any;
  DeleteStockLoading: boolean;

  ShowStockData: any;
  ShowStockLoading: boolean;
}

const initialState: AppState = {
  error: null,

  AddStockData: null,
  AddStockLoading: false,

  EditStockData: null,
  EditStockLoading: false,

  StockListData: null,
  StockListLoading: false,

  DeleteStockData: null,
  DeleteStockLoading: false,

  ShowStockData: null,
  ShowStockLoading: false,
};

// Reusable helper functions
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

const StockSlice = createSlice({
  name: 'Stock',
  initialState,
  reducers: {
    setAddStockData(state, action: PayloadAction<any>) {
      state.AddStockData = action.payload;
    },
    setEditStockData(state, action: PayloadAction<any>) {
      state.EditStockData = action.payload;
    },
    setStockListData(state, action: PayloadAction<any>) {
      state.StockListData = action.payload;
    },
    setDeleteStockData(state, action: PayloadAction<any>) {
      state.DeleteStockData = action.payload;
    },
    setShowStockData(state, action: PayloadAction<any>) {
      state.ShowStockData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Add
      .addCase(fetchStockCreate.pending, handlePending('AddStockLoading'))
      .addCase(
        fetchStockCreate.fulfilled,
        handleFulfilled('AddStockData', 'AddStockLoading'),
      )
      .addCase(fetchStockCreate.rejected, handleRejected('AddStockLoading'))

      // Edit
      .addCase(fetchStockEdit.pending, handlePending('EditStockLoading'))
      .addCase(
        fetchStockEdit.fulfilled,
        handleFulfilled('EditStockData', 'EditStockLoading'),
      )
      .addCase(fetchStockEdit.rejected, handleRejected('EditStockLoading'))

      // List
      .addCase(fetchStock.pending, handlePending('StockListLoading'))
      .addCase(
        fetchStock.fulfilled,
        handleFulfilled('StockListData', 'StockListLoading'),
      )
      .addCase(fetchStock.rejected, handleRejected('StockListLoading'))

      // Delete
      .addCase(fetchStockDelete.pending, handlePending('DeleteStockLoading'))
      .addCase(
        fetchStockDelete.fulfilled,
        handleFulfilled('DeleteStockData', 'DeleteStockLoading'),
      )
      .addCase(fetchStockDelete.rejected, handleRejected('DeleteStockLoading'))

      // Show
      .addCase(fetchStockShow.pending, handlePending('ShowStockLoading'))
      .addCase(
        fetchStockShow.fulfilled,
        handleFulfilled('ShowStockData', 'ShowStockLoading'),
      )
      .addCase(fetchStockShow.rejected, handleRejected('ShowStockLoading'));
  },
});

export const {
  setAddStockData,
  setEditStockData,
  setStockListData,
  setDeleteStockData,
  setShowStockData,
} = StockSlice.actions;

export default StockSlice.reducer;
