import { AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS, LOGOUT } from "../actionTypes";

const initState = {
  isAuth: false,
  loading: false,
  error: false,
  token: "",
  username:""

};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        isAuth: false,
        error: false,
        token: "",
      };

    case AUTH_SUCCESS:
      // console.log(payload)
      return {
        ...state,
        loading: false,
        isAuth: true,
        error: false,
        token: payload[0],
        username:payload[1]
      };

    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: true,
        token: "",
      };

      case LOGOUT:
        return {
            ...state,
            loading: false,
            isAuth: false,
            error: true,
            token: "",
          };
    default:
      return state
  }
};
