import * as CommentsAPI from '../../api/CommentsAPI';

// Actions
const LOAD_COMMENTS = 'LOAD_COMMENTS'
const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'

const DELETE_COMMENT = 'DELETE_COMMENT'
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'

const initialState = {
  loaded: false
};

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type)
  {
    case LOAD_COMMENTS:
      return {
        ...state,
        loading: true
      }
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        comments: action.result,
        error: null
      }
    case LOAD_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        comments: null,
        error: action.error
      }

    case DELETE_COMMENT:

      var comments = state.comments.filter((comment) =>{
        return comment.id != action.id;
      });

      return {
        ...state,
        comments,
        loading: true
      }

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        comments: action.result,
        error: null
      }
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        comments: null,
        error: action.error
      }
    default:
      return state
  }
};

export function fetchComments(id) {
  return {
    types: [LOAD_COMMENTS, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE],
    promise: CommentsAPI.fetchComments(id)
  }
}

export function deleteComment(id) {
  return {
    types: [DELETE_COMMENT, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE],
    promise: CommentsAPI.deleteComment(id)
  }
}
