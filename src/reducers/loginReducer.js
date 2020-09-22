const initState = JSON.parse(localStorage.getItem("statusLogin")) || false;


const initStateLogin = {

  user_info:{},
  isLogin:false

}

const loginReducer = (state = initStateLogin, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      
      return {
        ...state,
        isLogin:true,
        user_info: payload
      };
    case "LOGOUT":
    
      return {
        ...state,
        isLogin:false,
        user_info:{}
        
      };
    default:
      return state;
  }
};

export default loginReducer;
