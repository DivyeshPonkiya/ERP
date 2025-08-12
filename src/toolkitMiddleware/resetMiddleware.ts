// middleware/resetMiddleware.js

import {resetState} from '../createAsyncThunk/resetStateAsyncThunk';
import storage from '../storage';

const resetMiddleware = (store: any) => (next: any) => async (action: any) => {
  if (action.payload == 401) {
    store.dispatch(resetState());
    // storage.clearStore();
  }
  return next(action);
};

export default resetMiddleware;
