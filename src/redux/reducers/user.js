const initialState = {
  data: [],
  dashboard: [],
  isLoading: false,
  errorMessageSignup: null,
  errorMessageSignin: null,
  role: "",
  token: "",
  refreshToken: "",
  history: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN_PENDING":
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case "SIGNIN_FULFILLED":
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        token: action.payload.data.data.token,
        id: action.payload.data.data.id,
        pin: action.payload.data.data.pin,
      };
    case "SIGNIN_REJECTED":
      return {
        ...state,
        errorMessage: action.payload.response.data.msg,
        isLoading: false,
      };
    case "LOGOUT_PENDING":
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case "LOGOUT_FULFILLED":
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        role: "",
        token: "",
        refreshToken: "",
        userInfo: [],
      };
    case "LOGOUT_REJECTED":
      return {
        ...state,
        errorMessage: action.payload.response.data.message,
        isLoading: false,
      };
    case "GET_USER_PENDING":
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case "GET_USER_FULFILLED":
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        data: action.payload.data.data,
      };
    case "GET_USER_REJECTED":
      return {
        ...state,
        errorMessage: action.payload.response.data.msg,
        isLoading: false,
      };
    case "DASHBOARD_PENDING":
      return {
        ...state,
        errorMessage: null,
        isLoading: true,
      };
    case "DASHBOARD_FULFILLED":
      return {
        ...state,
        errorMessage: null,
        isLoading: false,
        dashboard: action.payload.data.data,
      };
    case "DASHBOARD_REJECTED":
      return {
        ...state,
        errorMessage: action.payload.response.data.msg,
        isLoading: false,
      };
    case "GET_HISTORY_PENDING":
      return {
        ...state,
        errorMessage: null,
      };
    case "GET_HISTORY_FULFILLED":
      return {
        ...state,
        errorMessage: null,
        history: action.payload.data.data,
      };
    case "GET_HISTORY_REJECTED":
      return {
        ...state,
        errorMessage: action.payload.data.message,
      };
    default: {
      return state;
    }
  }
};

export default userReducer;
