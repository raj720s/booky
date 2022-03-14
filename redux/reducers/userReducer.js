import { userTypes } from "../Actiontypes";

const initState = {
  user: null,
  loading: false,
  success: false,
  error: null,
  auth: false,
  updated: false,
  deleted: false,
  message: null,
  users: [],
};
//authreducer
export const userAuthReducer = (state = initState, action) => {
  switch (action.type) {
    case userTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case userTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
//loaded user reducer
export const loadUserReducer = (state = initState, action) => {
  switch (action.type) {
    case userTypes.LOAD_USER_REQUEST:
      return {
        ...state,
        auth: false,
        loading: true,
      };
    case userTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        auth: true,
        user: action.payload,
      };
    case userTypes.LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        auth: false,
      };
    case userTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
// userReducer
export const currentuserProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case userTypes.UPDATE_PROFILE_REQUEST:
    case userTypes.UPDATE_USER_REQUEST:
    case userTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.UPDATE_PROFILE_SUCCESS:
    case userTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: false,
        updated: action.payload,
      };
    case userTypes.DELETE_USER_RESET:
      return {
        ...state,
        loading: false,
        deleted: false,
      };
    case userTypes.UPDATE_PROFILE_FAIL:
    case userTypes.UPDATE_USER_FAIL:
    case userTypes.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
export const userDetailsReducer = (state = initState, action) => {
  switch (action.type) {
    case userTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case userTypes.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case userTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
export const allUsersReducer = (state = initState, action) => {
  switch (action.type) {
    case userTypes.ADMIN_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.ADMIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case userTypes.ADMIN_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
export const forgotpasswordReducer = (state = initState, action) => {
  switch (action.type) {
    case userTypes.FORGOT_PASSWORD_REQUEST:
    case userTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case userTypes.RESET_PASSWORD_FAIL:
    case userTypes.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
