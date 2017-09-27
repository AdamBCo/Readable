import { combineReducers } from 'redux'

import categories from './modules/categories'
import posts from './modules/posts'
import comments from './modules/comments'

export default combineReducers({
  categories,
  posts,
  comments
});
