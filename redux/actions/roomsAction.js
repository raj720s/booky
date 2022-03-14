import axios from "axios";
import { roomTypes } from "../Actiontypes";
import absoluteUrl from "next-absolute-url";

export const getRoomsAction =
  (req, currentPage = 1, location = "", guests, category) =>
  async (dispatch) => {
    try {
      const host = absoluteUrl(req);
      let url = `${host.origin}/api/rooms?page=${currentPage}&location=${location}`;
      if (guests) {
        url = url.concat(`$guestCapacity=${guests}`);
      }
      if (category) {
        url = url.concat(`$category=${category}`);
      }

      const res = await axios.get(url); // we need the full url for server side rendering

      await dispatch({
        type: roomTypes.ALL_ROOMS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: roomTypes.ALL_ROOMS_FAIL,
        payload: err.response.data.message || "all rooms action failed",
      });
    }
  };
//

export const getRoomDetailsAction = (req, id) => async (dispatch) => {
  try {
    const host = absoluteUrl(req);
    let url;
    if (req) {
      url = `${host.origin}/api/rooms/${id}`; // we need the full url for server side rendering
    } else {
      url = `/api/rooms/${id}`;
    }
    const res = await axios.get(url);
    // console.log(res.data);

    await dispatch({
      type: roomTypes.ROOM_DETAILS_SUCCESS,
      payload: res.data.room,
    });
  } catch (err) {
    dispatch({
      type: roomTypes.ROOM_DETAILS_FAIL,
      payload: err.response.data.message || "rooms details action failed",
    });
  }
};

export const clearErrorsAction = () => async (dispatch) => {
  dispatch({ type: roomTypes.CLEAR_ERRORS });
};

export const getAllADminRooms_action = () => async (dispatch) => {
  try {
    dispatch({ type: roomTypes.ADMIN_ROOMS_REQUEST });
    const res = await axios.get("/api/admin/rooms");
    dispatch({
      type: roomTypes.ADMIN_ROOMS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: roomTypes.ADMIN_ROOMS_FAIL,
      payload: err.response.data.message || err.message,
    });
  }
};
export const createNewRoomAction = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: roomTypes.NEW_ROOM_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/rooms/", roomData, config);
    dispatch({
      type: roomTypes.NEW_ROOM_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: roomTypes.NEW_ROOM_FAIL,
      payload: err.response.data.message || err.message,
    });
  }
};
export const updateRoomAction = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: roomTypes.UPDATE_ROOM_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/rooms/" + id, updateData, config);
    dispatch({
      type: roomTypes.UPDATE_ROOM_SUCCESS,
      payload: res.data.success,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: roomTypes.UPDATE_ROOM_FAIL,
      payload: err.response.data.message || err.message,
    });
  }
};
export const deleteRoomAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: roomTypes.DELETE_ROOM_REQUEST });

    const res = await axios.delete("/api/rooms/" + id);
    dispatch({
      type: roomTypes.DELETE_ROOM_REQUEST,
      payload: res.data.success,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: roomTypes.DELETE_ROOM_FAIL,
      payload: err.response.data.message || err.message,
    });
  }
};

// --------- reviews
export const newReviewAction = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: roomTypes.NEW_REVIEW_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/reviews`, reviewData, config);

    dispatch({
      type: roomTypes.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: roomTypes.NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const checkReviewavaliabiltyAction =
  (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: roomTypes.REVIEW_AVAILABILITY_REQUEST });

      const { data } = await axios.get(
        `/api/reviews/check_review_availability?roomId=${roomId}`
      );

      dispatch({
        type: roomTypes.REVIEW_AVAILABILITY_SUCCESS,
        payload: data.isReviewAvailable,
      });
    } catch (error) {
      dispatch({
        type: roomTypes.REVIEW_AVAILABILITY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getRoomReviewsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: roomTypes.GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/reviews/?id=${id}`);

    dispatch({
      type: roomTypes.GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: roomTypes.GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReviewAction = (id, roomId) => async (dispatch) => {
  try {
    dispatch({ type: roomTypes.DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/reviews/?id=${id}&roomId=${roomId}`
    );

    dispatch({
      type: roomTypes.DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: roomTypes.DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
