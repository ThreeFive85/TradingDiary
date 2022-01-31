import { combineReducers } from 'redux';

import posts from './posts';
import current from './current';
import complete from './complete';
import points from './points';

export default combineReducers({ posts, current, complete, points });