import {combineReducers} from 'redux';
import authSlice from './authSlice';
import productsSlice from './productsSlice';
import customersSlice from './customersSlice';
import productionsSlice from './productionsSlice';
import worksSlice from './employeeSlice';
import reportSlice from './reportSlice';
import stocksSlice from './stocksSlice';
import salesSlice from './salesSlice';

import {RESET_STATE} from '../createAsyncThunk/resetStateAsyncThunk';

const appReducer = combineReducers({
  authSlice: authSlice,
  productsSlice: productsSlice,
  customersSlice: customersSlice,
  productionsSlice: productionsSlice,
  worksSlice: worksSlice,
  reportSlice: reportSlice,
  stocksSlice: stocksSlice,
  salesSlice: salesSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
