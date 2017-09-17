import * as PostAPI from '../../api/PostAPI';

// Actions
const LOAD_POSTS = 'LOAD_POSTS'
const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

const CREATE_POST = 'CREATE_POST'
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'

const initialState = {
  loaded: false
};

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type)
  {
    case LOAD_POSTS:
      return {
        ...state,
        loading: true
      }
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        posts: action.result,
        error: null
      }
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        posts: null,
        error: action.error
      }

    case CREATE_POST:
      return {
        ...state,
        loading: true
      }
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        posts: action.result,
        error: null
      }
    case CREATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        posts: null,
        error: action.error
      }
    default:
      return state
  }
};

export function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

export function loadPostsWithID(id) {

  if (id) {
    return {
      types: [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE],
      promise: PostAPI.fetchPosts()
    }
  } else {
    return {
      types: [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE],
      promise: PostAPI.fetchPostsWithID(id)
    }
  }
}

export function createPost(post) {
  return {
    types: [CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE],
    promise: PostAPI.createPost(post)
  }
}
