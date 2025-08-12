import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMessageHandler} from '../constants/constants';
import endPointApi from '../api/endPoint';

interface ThunkParams {
  params?: any;
  endPoint?: any;
}

// ✅ Generic handler for POST thunks
const createPostThunk = (typePrefix: string) => {
  return createAsyncThunk(
    typePrefix,
    async (
      {params, endPoint}: ThunkParams,
      {rejectWithValue, fulfillWithValue},
    ) => {
      try {
        const api = new endPointApi(endPoint);
        const response = await api.post(params);
        if (response.statusCode == 200 || response.statusCode == 201) {
          return fulfillWithValue(response);
        } else {
          errorMessageHandler(response);
          return rejectWithValue(response);
        }
      } catch (error: any) {
        return rejectWithValue(error);
      }
    },
  );
};

// ✅ Generic handler for GET thunks
const createGetThunk = (typePrefix: string) => {
  return createAsyncThunk(
    typePrefix,
    async (
      {params, endPoint}: ThunkParams,
      {rejectWithValue, fulfillWithValue},
    ) => {
      try {
        const api = new endPointApi(endPoint);
        const response = await api.get(params);
        if (response.statusCode == 200 || response.statusCode == 201) {
          return fulfillWithValue(response);
        } else {
          errorMessageHandler(response);
          return rejectWithValue(response);
        }
      } catch (error: any) {
        return rejectWithValue(error);
      }
    },
  );
};

// ✅ Generic handler for POST thunks
const createPatchThunk = (typePrefix: string) => {
  return createAsyncThunk(
    typePrefix,
    async (
      {params, endPoint}: ThunkParams,
      {rejectWithValue, fulfillWithValue},
    ) => {
      try {
        const api = new endPointApi(endPoint);
        const response = await api.patch(params);
        if (response.statusCode == 200 || response.statusCode == 201) {
          return fulfillWithValue(response);
        } else {
          errorMessageHandler(response);
          return rejectWithValue(response);
        }
      } catch (error: any) {
        return rejectWithValue(error);
      }
    },
  );
};

// ✅ Generic handler for POST thunks
const createDeleteThunk = (typePrefix: string) => {
  return createAsyncThunk(
    typePrefix,
    async (
      {params, endPoint}: ThunkParams,
      {rejectWithValue, fulfillWithValue},
    ) => {
      try {
        const api = new endPointApi(endPoint);
        const response = await api.delete();
        if (response.statusCode == 200 || response.statusCode == 201) {
          return fulfillWithValue(response);
        } else {
          errorMessageHandler(response);
          return rejectWithValue(response);
        }
      } catch (error: any) {
        return rejectWithValue(error);
      }
    },
  );
};

// ✅ Generic handler for POST thunks
const createShowThunk = (typePrefix: string) => {
  return createAsyncThunk(
    typePrefix,
    async (
      {params, endPoint}: ThunkParams,
      {rejectWithValue, fulfillWithValue},
    ) => {
      try {
        const api = new endPointApi(endPoint);
        const response = await api.get(params);
        if (response.statusCode == 200 || response.statusCode == 201) {
          return fulfillWithValue(response);
        } else {
          errorMessageHandler(response);
          return rejectWithValue(response);
        }
      } catch (error: any) {
        return rejectWithValue(error);
      }
    },
  );
};

// ✅ Reusable async thunks
export const fetchReportCreate = createPostThunk('Report');
export const fetchReport = createGetThunk('ReportList');
export const fetchReportEdit = createPatchThunk('ReportEdit');
export const fetchReportDelete = createDeleteThunk('ReportDelete');
export const fetchReportShow = createShowThunk('ReportShow');
