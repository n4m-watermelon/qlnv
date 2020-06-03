const initState = JSON.parse(localStorage.getItem("statusLogin")) || false;

const loginReducer = (state = initState, { type }) => {
  switch (type) {
    case "LOGIN":
      const statusLogin = !state;
      return statusLogin;
    case "LOGOUT":
      localStorage.clear()  
      const isLogout = !state;
      return isLogout;
    default:
      return state;
  }
};

export default loginReducer;
