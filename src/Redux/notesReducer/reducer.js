import {
  NOTES_DELETE_ERROR,
  NOTES_DELETE_SUCCESS,
  NOTES_ERROR,
  NOTES_FETCHING,
  NOTES_LOADING,
  NOTES_PATCH_ERROR,
  NOTES_PATCH_SUCCESS,
  NOTES_POST_ERROR,
  NOTES_POST_SUCCESS,
} from "../actionTypes";

const initState = {
  loading: false,
  notes: [],
  error: false
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case NOTES_LOADING:
      return { ...state, loading: true, error: false, notes: [] };

    case NOTES_FETCHING:
      return { ...state, loading: false, error: false, notes: payload};

    case NOTES_ERROR:
      return { ...state, loading: false, error: true, notes: [] };

    case NOTES_POST_SUCCESS:
      return { ...state, error: false };

    case NOTES_POST_ERROR:
      return { ...state, error: true };

    case NOTES_PATCH_SUCCESS:
      return { ...state, error: false };

    case NOTES_PATCH_ERROR:
      return { ...state, error: true };

    case NOTES_DELETE_SUCCESS:
      return { ...state, error: true };

    case NOTES_DELETE_ERROR:
      return { ...state, error: false };

    default:
      return state;
  }
};
