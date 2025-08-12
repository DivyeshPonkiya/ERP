import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchWork,
  fetchWorkCreate,
  fetchWorkEdit,
  fetchWorkDelete,
  fetchWorkShow,
  fetchWorkSearch,
} from '../createAsyncThunk/worksThunk';

interface AppState {
  error: any;

  AddWorkData: any;
  AddWorkLoading: boolean;

  EditWorkData: any;
  EditWorkLoading: boolean;

  WorkListData: any;
  WorkListLoading: boolean;

  DeleteWorkData: any;
  DeleteWorkLoading: boolean;

  ShowWorkData: any;
  ShowWorkLoading: boolean;

  WorkSearchData: any;
  WorkSearchLoading: boolean;
}

const initialState: AppState = {
  error: null,

  AddWorkData: null,
  AddWorkLoading: false,

  EditWorkData: null,
  EditWorkLoading: false,

  WorkListData: null,
  WorkListLoading: false,

  DeleteWorkData: null,
  DeleteWorkLoading: false,

  ShowWorkData: null,
  ShowWorkLoading: false,

  WorkSearchData: null,
  WorkSearchLoading: false,
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

const WorkSlice = createSlice({
  name: 'Work',
  initialState,
  reducers: {
    setAddWorkData(state, action: PayloadAction<any>) {
      state.AddWorkData = action.payload;
    },
    setEditWorkData(state, action: PayloadAction<any>) {
      state.EditWorkData = action.payload;
    },
    setWorkListData(state, action: PayloadAction<any>) {
      state.WorkListData = action.payload;
    },
    setDeleteWorkData(state, action: PayloadAction<any>) {
      state.DeleteWorkData = action.payload;
    },
    setShowWorkData(state, action: PayloadAction<any>) {
      state.ShowWorkData = action.payload;
    },
    setWorkSearchData(state, action: PayloadAction<any>) {
      state.WorkSearchData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Add
      .addCase(fetchWorkCreate.pending, handlePending('AddWorkLoading'))
      .addCase(
        fetchWorkCreate.fulfilled,
        handleFulfilled('AddWorkData', 'AddWorkLoading'),
      )
      .addCase(fetchWorkCreate.rejected, handleRejected('AddWorkLoading'))

      // Edit
      .addCase(fetchWorkEdit.pending, handlePending('EditWorkLoading'))
      .addCase(
        fetchWorkEdit.fulfilled,
        handleFulfilled('EditWorkData', 'EditWorkLoading'),
      )
      .addCase(fetchWorkEdit.rejected, handleRejected('EditWorkLoading'))

      // List
      .addCase(fetchWork.pending, handlePending('WorkListLoading'))
      .addCase(
        fetchWork.fulfilled,
        handleFulfilled('WorkListData', 'WorkListLoading'),
      )
      .addCase(fetchWork.rejected, handleRejected('WorkListLoading'))

      // Delete
      .addCase(fetchWorkDelete.pending, handlePending('DeleteWorkLoading'))
      .addCase(
        fetchWorkDelete.fulfilled,
        handleFulfilled('DeleteWorkData', 'DeleteWorkLoading'),
      )
      .addCase(fetchWorkDelete.rejected, handleRejected('DeleteWorkLoading'))

      // Show
      .addCase(fetchWorkShow.pending, handlePending('ShowWorkLoading'))
      .addCase(
        fetchWorkShow.fulfilled,
        handleFulfilled('ShowWorkData', 'ShowWorkLoading'),
      )
      .addCase(fetchWorkShow.rejected, handleRejected('ShowWorkLoading'))

      // Search
      .addCase(fetchWorkSearch.pending, handlePending('WorkSearchLoading'))
      .addCase(
        fetchWorkSearch.fulfilled,
        handleFulfilled('WorkSearchData', 'WorkSearchLoading'),
      )
      .addCase(fetchWorkSearch.rejected, handleRejected('WorkSearchLoading'));
  },
});

export const {
  setAddWorkData,
  setEditWorkData,
  setWorkListData,
  setDeleteWorkData,
  setShowWorkData,
  setWorkSearchData,
} = WorkSlice.actions;

export default WorkSlice.reducer;
