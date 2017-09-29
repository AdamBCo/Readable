import * as PostAPI from '../../api/PostAPI';

// Actions
const LOAD_POSTS = 'LOAD_POSTS'
const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

const CREATE_POST = 'CREATE_POST'
const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE'

const UPDATE_POST = 'UPDATE_POST'
const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'
const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE'

const UP_VOTE_POST = 'UP_VOTE_POST'
const UP_VOTE_POST_SUCCESS = 'UP_VOTE_POST_SUCCESS'
const UP_VOTE_POST_FAILURE = 'UP_VOTE_POST_FAILURE'

const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
const DOWN_VOTE_POST_SUCCESS = 'DOWN_VOTE_POST_SUCCESS'
const DOWN_VOTE_POST_FAILURE = 'DOWN_VOTE_POST_FAILURE'

const DELETE_POST = 'DELETE_POST'
const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'

const initialState = {
  loaded: false
};

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    case LOAD_POSTS: {
      return {
        ...state,
        loading: true
      }
    }

    case LOAD_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        posts: action.result,
        error: null
      }
    }

    case LOAD_POSTS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        posts: null,
        error: action.error
      }
    }

    case CREATE_POST: {
      return {
        ...state,
        loading: true
      }
    }

    case CREATE_POST_SUCCESS: {

      var posts = state.posts.slice();
      posts.push(action.result);

      return {
        ...state,
        loading: false,
        loaded: true,
        posts,
        error: null
      }
    }

    case CREATE_POST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        posts: null,
        error: action.error
      }
    }

    case UP_VOTE_POST: {
      return {
        ...state,
        loading: true
      }
    }

    case UP_VOTE_POST_SUCCESS: {

      let posts = state.posts.map((post) => {
        if (post.id === action.result.id) {
          post.voteScore = post.voteScore + 1;
          return post;
        } else {
          return post;
        }
      });
      return {
      ...state,
      loading: false,
      posts
      }

    }

    case UP_VOTE_POST_FAILURE: {
      return {
        ...state
      }
    }

    case DOWN_VOTE_POST: {
      return {
      ...state
      }
    }

    case DOWN_VOTE_POST_SUCCESS: {

      let posts = state.posts.map((post) => {
        if (post.id === action.result.id) {
          post.voteScore = post.voteScore - 1;
          return post;
        } else {
          return post;
        }
      });

      return {
      ...state,
      loading: false,
      posts
      }

    }

    case DOWN_VOTE_POST_FAILURE: {
      return {
        ...state
      }
    }


    case DELETE_POST: {

      var posts = state.posts.filter((post) =>{
        return post.id != action.id;
      });

      return {
        ...state,
        posts,
        loading: true
      }
    }

    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }

    case DELETE_POST_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        posts: null,
        error: action.error
      }
    }


    case UPDATE_POST: {

      let posts = state.posts.map((post) => {
        if (post.id === action.id) {
          post.title = action.title;
          post.body = action.body;
          return post;
        } else {
          return post;
        }
      });

      return {
        ...state,
        posts,
        loading: true
      }
    }

    case UPDATE_POST_SUCCESS: {

      return {
      ...state
      }

    }

    case UPDATE_POST_FAILURE: {
      return {
        ...state
      }
    }

    default:
      return state
  }
};

export function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

export function fetchPosts() {

  const types = [LOAD_POSTS, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE]
  const promise = PostAPI.fetchPosts()

  return {
    types,
    promise
  }
}

export function createPost(post) {

  const types = [CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE]
  const promise = PostAPI.createPost(post)

  return {
    types,
    promise
  }
}

export function upVote(id) {

  const types = [UP_VOTE_POST, UP_VOTE_POST_SUCCESS, UP_VOTE_POST_FAILURE]
  const promise = PostAPI.upVote(id)

  return {
    types,
    promise
  }
}

export function downVote(id) {

  const types = [DOWN_VOTE_POST, DOWN_VOTE_POST_SUCCESS, DOWN_VOTE_POST_FAILURE]
  const promise = PostAPI.downVote(id)

  return {
    types,
    promise
  }
}

export function deletePost(id) {

  const types = [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE]
  const promise = PostAPI.deletePost(id)

  return {
    types,
    id,
    promise
  }
}

export function updatePost(id, title, body) {

  const types = [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE]
  const promise = PostAPI.updatePost(id, title, body)

  return {
    types,
    id,
    title,
    body,
    promise
  }
}
