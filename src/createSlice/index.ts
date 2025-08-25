import { combineReducers } from 'redux';
import authSlice from './authSlice';
import employeeSlice from './employeeSlice';
import leavesSlice from './leavesSlice';


import { RESET_STATE } from '../createAsyncThunk/resetStateAsyncThunk';

const appReducer = combineReducers({
  authSlice: authSlice,
  employeeSlice: employeeSlice,
  leavesSlice: leavesSlice,

});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
