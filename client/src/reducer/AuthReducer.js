const AuthReducer = (state ,action)=>{
    console.log(state , action);
    switch (action.type) {

        // getting user details using token
        case "SET_USER":
            return{
                ...state,
                userDetails : action.payload
            };
            
        // setting token 
        case "SET_TOKEN": 
            return {
                ...state,
                token : action.payload
            };
        default:
            return state;
    }
  
}
export default AuthReducer;