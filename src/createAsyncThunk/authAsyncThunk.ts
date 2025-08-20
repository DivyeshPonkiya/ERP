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

// ✅ Generic handler for PATCH thunks
const createPatchThunk = (typePrefix: string) => {
  return createAsyncThunk(
    typePrefix,
    async (
      {params, endPoint}: ThunkParams,
      {rejectWithValue, fulfillWithValue},
    ) => {
      try {
        const api = new endPointApi(endPoint);
        const response = await api.patchWithOutParams(params);
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
export const fetchLogin = createPostThunk('oauth/authorize');
export const fetchToken = createPostThunk('oauth/token');
export const fetchRevoke = createPostThunk('oauth/revoke');
export const fetchProfile = createGetThunk('profile');
export const fetchHolidays = createGetThunk('holidays');
