import { combineReducers } from 'redux';

import user from './usersReducer';

const rootReducer = combineReducers({
  user
});

export default rootReducer;