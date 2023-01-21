import { createContext, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.util';
import { createAction } from '../utils/reducer/reducer.utils';

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser:()=>null
});
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
  };
  
  const INITIAL_STATE = {
    currentUser: null,
    setCurrentUser: () => null,
  };
  
  const userReducer = (state, action) => {
    console.log('dispatched',action);
    const { type, payload } = action;
  
    switch (type) {
      case USER_ACTION_TYPES.SET_CURRENT_USER:
        return { ...state, currentUser: payload };
      default:
        throw new Error(`Unhandled type ${type} in userReducer`);
    }
  };
  
export const UserProvider = ({children})=>{
    // const [currentUser,setCurrentUser] = useState(null)
    // const value = {currentUser, setCurrentUser}
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log("currentUser",currentUser);
    const setCurrentUser = (user) =>
        // dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, currentUser: user });
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
    // signOutUser();
    useEffect(()=>{
       const unsubcribe =  onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user)
        }
        setCurrentUser(user)
        console.log("userX",user);

       })
        return unsubcribe;
    },[]);
    const value = {
        currentUser,
      };
    
    return  <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
}

// <UserProvider>
//     <app/>
// </UserProvider>