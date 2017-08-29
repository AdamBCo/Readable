import { combineReducers } from 'redux'

import categories from './modules/categories'
import posts from './modules/posts'

export default combineReducers({
  categories,
  posts
});
