import axios from "axios";
import { userTypes } from "../Actiontypes";

export const registerUserAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.REGISTER_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // console.log(user);
    const res = await axios.post("/api/auth/register", user, config);
    dispatch({
      type: userTypes.REGISTER_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: userTypes.REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const loaduserAction = () => async (dispatch) => {
  try {
    dispatch({ type: userTypes.LOAD_USER_REQUEST });
    const res = await axios.get("/api/me");
    dispatch({
      type: userTypes.LOAD_USER_SUCCESS,
      payload: res.data.user,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: userTypes.LOAD_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};
// update profile
export const upadateuserAction = (user) => async (dispatch) => {
  console.log(user);
  try {
    dispatch({ type: userTypes.UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/me/update", user, config);

    dispatch({
      type: userTypes.UPDATE_PROFILE_SUCCESS,
      payload: res.data.success,
    });
  } catch (err) {
    dispatch({
      type: userTypes.UPDATE_PROFILE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const forgotPasswordAction = (email) => async (dispatch) => {
  console.log(email);
  try {
    dispatch({ type: userTypes.FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/password/forgot", email, config);

    dispatch({
      type: userTypes.FORGOT_PASSWORD_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: userTypes.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetPasswordAction = (tkn, password) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/password/reset/${tkn}`, password, config);

    dispatch({
      type: userTypes.RESET_PASSWORD_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: userTypes.RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrorsAction = () => async (dispatch) => {
  dispatch({
    type: userTypes.CLEAR_ERRORS,
  });
};
