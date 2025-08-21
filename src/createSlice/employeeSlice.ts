import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchEmployee,
  fetchEmployeeCreate,
  fetchEmployeeEdit,
  fetchEmployeeDelete,
  fetchEmployeeShow,
  fetchEmployeeSearch,
} from '../createAsyncThunk/employeeThunk';

interface AppState {
  error: any;

  AddEmployeeData: any;
  AddEmployeeLoading: boolean;

  EditEmployeeData: any;
  EditEmployeeLoading: boolean;

  EmployeeListData: any;
  EmployeeListLoading: boolean;

  DeleteEmployeeData: any;
  DeleteEmployeeLoading: boolean;

  ShowEmployeeData: any;
  ShowEmployeeLoading: boolean;

  EmployeeSearchData: any;
  EmployeeSearchLoading: boolean;
}

const initialState: AppState = {
  error: null,

  AddEmployeeData: null,
  AddEmployeeLoading: false,

  EditEmployeeData: null,
  EditEmployeeLoading: false,

  EmployeeListData: null,
  EmployeeListLoading: false,

  DeleteEmployeeData: null,
  DeleteEmployeeLoading: false,

  ShowEmployeeData: null,
  ShowEmployeeLoading: false,

  EmployeeSearchData: null,
  EmployeeSearchLoading: false,
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

const EmployeeSlice = createSlice({
  name: 'Employee',
  initialState,
  reducers: {
    setAddEmployeeData(state, action: PayloadAction<any>) {
      state.AddEmployeeData = action.payload;
    },
    setEditEmployeeData(state, action: PayloadAction<any>) {
      state.EditEmployeeData = action.payload;
    },
    setEmployeeListData(state, action: PayloadAction<any>) {
      state.EmployeeListData = action.payload;
    },
    setDeleteEmployeeData(state, action: PayloadAction<any>) {
      state.DeleteEmployeeData = action.payload;
    },
    setShowEmployeeData(state, action: PayloadAction<any>) {
      state.ShowEmployeeData = action.payload;
    },
    setEmployeeSearchData(state, action: PayloadAction<any>) {
      state.EmployeeSearchData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Add
      .addCase(fetchEmployeeCreate.pending, handlePending('AddEmployeeLoading'))
      .addCase(
        fetchEmployeeCreate.fulfilled,
        handleFulfilled('AddEmployeeData', 'AddEmployeeLoading'),
      )
      .addCase(fetchEmployeeCreate.rejected, handleRejected('AddEmployeeLoading'))

      // Edit
      .addCase(fetchEmployeeEdit.pending, handlePending('EditEmployeeLoading'))
      .addCase(
        fetchEmployeeEdit.fulfilled,
        handleFulfilled('EditEmployeeData', 'EditEmployeeLoading'),
      )
      .addCase(fetchEmployeeEdit.rejected, handleRejected('EditEmployeeLoading'))

      // List
      .addCase(fetchEmployee.pending, handlePending('EmployeeListLoading'))
      .addCase(
        fetchEmployee.fulfilled,
        handleFulfilled('EmployeeListData', 'EmployeeListLoading'),
      )
      .addCase(fetchEmployee.rejected, handleRejected('EmployeeListLoading'))

      // Delete
      .addCase(fetchEmployeeDelete.pending, handlePending('DeleteEmployeeLoading'))
      .addCase(
        fetchEmployeeDelete.fulfilled,
        handleFulfilled('DeleteEmployeeData', 'DeleteEmployeeLoading'),
      )
      .addCase(fetchEmployeeDelete.rejected, handleRejected('DeleteEmployeeLoading'))

      // Show
      .addCase(fetchEmployeeShow.pending, handlePending('ShowEmployeeLoading'))
      .addCase(
        fetchEmployeeShow.fulfilled,
        handleFulfilled('ShowEmployeeData', 'ShowEmployeeLoading'),
      )
      .addCase(fetchEmployeeShow.rejected, handleRejected('ShowEmployeeLoading'))

      // Search
      .addCase(fetchEmployeeSearch.pending, handlePending('EmployeeSearchLoading'))
      .addCase(
        fetchEmployeeSearch.fulfilled,
        handleFulfilled('EmployeeSearchData', 'EmployeeSearchLoading'),
      )
      .addCase(fetchEmployeeSearch.rejected, handleRejected('EmployeeSearchLoading'));
  },
});

export const {
  setAddEmployeeData,
  setEditEmployeeData,
  setEmployeeListData,
  setDeleteEmployeeData,
  setShowEmployeeData,
  setEmployeeSearchData,
} = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
