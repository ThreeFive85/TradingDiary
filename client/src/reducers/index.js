import { combineReducers } from 'redux';

import posts from './posts';
import current from './current';
import complete from './complete';

export default combineReducers({ posts, current, complete });