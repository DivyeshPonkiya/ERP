import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchLeaves,
  fetchLeavesCreate,
  fetchLeavesEdit,
  fetchLeavesDelete,
  fetchLeavesShow,
  fetchLeavesSearch,
} from '../createAsyncThunk/leavesThunk';

interface AppState {
  error: any;

  AddLeavesData: any;
  AddLeavesLoading: boolean;

  EditLeavesData: any;
  EditLeavesLoading: boolean;

  LeavesListData: any;
  LeavesListLoading: boolean;

  DeleteLeavesData: any;
  DeleteLeavesLoading: boolean;

  ShowLeavesData: any;
  ShowLeavesLoading: boolean;

  LeavesSearchData: any;
  LeavesSearchLoading: boolean;

  LeavesEndPoint: any
}

const initialState: AppState = {
  error: null,

  AddLeavesData: null,
  AddLeavesLoading: false,

  EditLeavesData: null,
  EditLeavesLoading: false,

  LeavesListData: null,
  LeavesListLoading: false,

  DeleteLeavesData: null,
  DeleteLeavesLoading: false,

  ShowLeavesData: null,
  ShowLeavesLoading: false,

  LeavesSearchData: null,
  LeavesSearchLoading: false,

  LeavesEndPoint: null



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

const LeavesSlice = createSlice({
  name: 'Leaves',
  initialState,
  reducers: {
    setAddLeavesData(state, action: PayloadAction<any>) {
      state.AddLeavesData = action.payload;
    },
    setEditLeavesData(state, action: PayloadAction<any>) {
      state.EditLeavesData = action.payload;
    },
    setLeavesListData(state, action: PayloadAction<any>) {
      state.LeavesListData = action.payload;
    },
    setDeleteLeavesData(state, action: PayloadAction<any>) {
      state.DeleteLeavesData = action.payload;
    },
    setShowLeavesData(state, action: PayloadAction<any>) {
      state.ShowLeavesData = action.payload;
    },
    setLeavesSearchData(state, action: PayloadAction<any>) {
      state.LeavesSearchData = action.payload;
    },
    setLeavesEndPoint(state, action: PayloadAction<any>) {
      state.LeavesEndPoint = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Add
      .addCase(fetchLeavesCreate.pending, handlePending('AddLeavesLoading'))
      .addCase(
        fetchLeavesCreate.fulfilled,
        handleFulfilled('AddLeavesData', 'AddLeavesLoading'),
      )
      .addCase(fetchLeavesCreate.rejected, handleRejected('AddLeavesLoading'))

      // Edit
      .addCase(fetchLeavesEdit.pending, handlePending('EditLeavesLoading'))
      .addCase(
        fetchLeavesEdit.fulfilled,
        handleFulfilled('EditLeavesData', 'EditLeavesLoading'),
      )
      .addCase(fetchLeavesEdit.rejected, handleRejected('EditLeavesLoading'))

      // List
      .addCase(fetchLeaves.pending, handlePending('LeavesListLoading'))
      .addCase(
        fetchLeaves.fulfilled,
        handleFulfilled('LeavesListData', 'LeavesListLoading'),
      )
      .addCase(fetchLeaves.rejected, handleRejected('LeavesListLoading'))

      // Delete
      .addCase(fetchLeavesDelete.pending, handlePending('DeleteLeavesLoading'))
      .addCase(
        fetchLeavesDelete.fulfilled,
        handleFulfilled('DeleteLeavesData', 'DeleteLeavesLoading'),
      )
      .addCase(fetchLeavesDelete.rejected, handleRejected('DeleteLeavesLoading'))

      // Show
      .addCase(fetchLeavesShow.pending, handlePending('ShowLeavesLoading'))
      .addCase(
        fetchLeavesShow.fulfilled,
        handleFulfilled('ShowLeavesData', 'ShowLeavesLoading'),
      )
      .addCase(fetchLeavesShow.rejected, handleRejected('ShowLeavesLoading'))

      // Search
      .addCase(fetchLeavesSearch.pending, handlePending('LeavesSearchLoading'))
      .addCase(
        fetchLeavesSearch.fulfilled,
        handleFulfilled('LeavesSearchData', 'LeavesSearchLoading'),
      )
      .addCase(fetchLeavesSearch.rejected, handleRejected('LeavesSearchLoading'));
  },
});

export const {
  setAddLeavesData,
  setEditLeavesData,
  setLeavesListData,
  setDeleteLeavesData,
  setShowLeavesData,
  setLeavesSearchData,
  setLeavesEndPoint
} = LeavesSlice.actions;

export default LeavesSlice.reducer;
