import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchReport,
  fetchReportCreate,
  fetchReportEdit,
  fetchReportDelete,
  fetchReportShow,
} from '../createAsyncThunk/reportThunk';

interface AppState {
  error: any;

  AddReportData: any;
  AddReportLoading: boolean;

  EditReportData: any;
  EditReportLoading: boolean;

  ReportListData: any;
  ReportListLoading: boolean;

  DeleteReportData: any;
  DeleteReportLoading: boolean;

  ShowReportData: any;
  ShowReportLoading: boolean;

  ReportData: string | null;
}

const initialState: AppState = {
  error: null,

  AddReportData: null,
  AddReportLoading: false,

  EditReportData: null,
  EditReportLoading: false,

  ReportListData: null,
  ReportListLoading: false,

  DeleteReportData: null,
  DeleteReportLoading: false,

  ShowReportData: null,
  ShowReportLoading: false,

  ReportData: null,
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

const ReportSlice = createSlice({
  name: 'Report',
  initialState,
  reducers: {
    setAddReportData(state, action: PayloadAction<any>) {
      state.AddReportData = action.payload;
    },
    setEditReportData(state, action: PayloadAction<any>) {
      state.EditReportData = action.payload;
    },
    setReportListData(state, action: PayloadAction<any>) {
      state.ReportListData = action.payload;
    },
    setDeleteReportData(state, action: PayloadAction<any>) {
      state.DeleteReportData = action.payload;
    },
    setShowReportData(state, action: PayloadAction<any>) {
      state.ShowReportData = action.payload;
    },
    setEndUrl(state, action: PayloadAction<any>) {
      state.ReportData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Add
      .addCase(fetchReportCreate.pending, handlePending('AddReportLoading'))
      .addCase(
        fetchReportCreate.fulfilled,
        handleFulfilled('AddReportData', 'AddReportLoading'),
      )
      .addCase(fetchReportCreate.rejected, handleRejected('AddReportLoading'))

      // Edit
      .addCase(fetchReportEdit.pending, handlePending('EditReportLoading'))
      .addCase(
        fetchReportEdit.fulfilled,
        handleFulfilled('EditReportData', 'EditReportLoading'),
      )
      .addCase(fetchReportEdit.rejected, handleRejected('EditReportLoading'))

      // List
      .addCase(fetchReport.pending, handlePending('ReportListLoading'))
      .addCase(
        fetchReport.fulfilled,
        handleFulfilled('ReportListData', 'ReportListLoading'),
      )
      .addCase(fetchReport.rejected, handleRejected('ReportListLoading'))

      // Delete
      .addCase(fetchReportDelete.pending, handlePending('DeleteReportLoading'))
      .addCase(
        fetchReportDelete.fulfilled,
        handleFulfilled('DeleteReportData', 'DeleteReportLoading'),
      )
      .addCase(
        fetchReportDelete.rejected,
        handleRejected('DeleteReportLoading'),
      )

      // Show
      .addCase(fetchReportShow.pending, handlePending('ShowReportLoading'))
      .addCase(
        fetchReportShow.fulfilled,
        handleFulfilled('ShowReportData', 'ShowReportLoading'),
      )
      .addCase(fetchReportShow.rejected, handleRejected('ShowReportLoading'));
  },
});

export const {
  setAddReportData,
  setEditReportData,
  setReportListData,
  setDeleteReportData,
  setShowReportData,
  setEndUrl,
} = ReportSlice.actions;

export default ReportSlice.reducer;
