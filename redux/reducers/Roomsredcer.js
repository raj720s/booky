import { roomTypes } from "../Actiontypes";
import { HYDRATE } from "next-redux-wrapper";
const initState = {
  rooms: [],
  loading: false,
  roomsCount: null,
  elpp: null,
  filteredRoomsCount: null,
  error: null,
  room: {},
  isUpdated: null,
  isDeleted: null,
  success: false,
  reviewAvaliable: null,
};

export const allRoomsReducer = (state = initState, action) => {
  switch (action.type) {
    case roomTypes.ALL_ROOMS_REQUEST:
    case roomTypes.ADMIN_ROOMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roomTypes.ALL_ROOMS_SUCCESS:
      //   console.log(action.payload);
      return {
        ...state,
        loading: false,
        roomsCount: action.payload.count,
        elpp: action.payload.elpp,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      };
    case roomTypes.ADMIN_ROOMS_SUCCESS:
      //   console.log(action.payload);
      return {
        ...state,
        loading: false,

        rooms: action.payload,
      };
    case roomTypes.ALL_ROOMS_FAIL:
    case roomTypes.ADMIN_ROOMS_FAIL:
      //   console.log(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case roomTypes.CLEAR_ERRORS:
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

export const roomDetailsReducer = (state = initState, action) => {
  switch (action.type) {
    case roomTypes.ROOM_DETAILS_SUCCESS:
      return {
        ...state,
        room: action.payload,
      };
    case roomTypes.ROOM_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case roomTypes.CLEAR_ERRORS:
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
export const newRoomReducer = (state = initState, action) => {
  switch (action.type) {
    case roomTypes.NEW_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roomTypes.NEW_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        room: action.payload.room,
      };
    case roomTypes.NEW_ROOM_FAIL:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        room: action.payload.room,
      };
    case roomTypes.CLEAR_ERRORS:
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
export const activeRoomReducer = (state = initState, action) => {
  switch (action.type) {
    case roomTypes.UPDATE_ROOM_REQUEST:
    case roomTypes.DELETE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case roomTypes.UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case roomTypes.DELETE_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case roomTypes.UPDATE_ROOM_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };
    case roomTypes.UPDATE_ROOM_FAIL:
    case roomTypes.DELETE_ROOM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case roomTypes.CLEAR_ERRORS:
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
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case roomTypes.NEW_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case roomTypes.NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case roomTypes.NEW_REVIEW_RESET:
      return {
        success: false,
        loading: false,
      };

    case roomTypes.NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case roomTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const checkReviewReducer = (
  state = { reviewAvailable: null },
  action
) => {
  switch (action.type) {
    case roomTypes.REVIEW_AVAILABILITY_REQUEST:
      return {
        loading: true,
      };

    case roomTypes.REVIEW_AVAILABILITY_SUCCESS:
      return {
        loading: false,
        reviewAvailable: action.payload,
      };

    case roomTypes.REVIEW_AVAILABILITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case roomTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const roomReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case roomTypes.GET_REVIEWS_REQUEST:
      return {
        loading: true,
      };

    case roomTypes.GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case roomTypes.GET_REVIEWS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case roomTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case roomTypes.DELETE_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case roomTypes.DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case roomTypes.DELETE_REVIEW_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case roomTypes.DELETE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case roomTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
