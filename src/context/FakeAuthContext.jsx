import { createContext, useContext, useReducer } from "react";
const FakeAuthContext = createContext();

export default function FakeAuthProvider({children}){
    const FAKE_USER = {
        name: "Jack",
        email: "jack@example.com",
        password: "qwerty",
        avatar: "https://randomuser.me/api/portraits/med/men/1.jpg",
    };
    const initialState = {user: null, isAuthenticated: false};
    function reducer(state, action){
        switch(action.type){
            case "login":
                return {...state, user: action.payload, isAuthenticated: true};
            case "logout":
                return {...state, user: null, isAuthenticated: false};
            default: throw new Error("Unknown action type");
        }
    }
    const [{user,isAuthenticated}, dispatch] = useReducer(reducer, initialState);
    function login(email, password){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type: "login", payload: FAKE_USER});
        }
        else throw new Error("Invalid credentials");
    }
    function logout() {
        dispatch({ type: "logout" });
    }
    return <FakeAuthContext.Provider value={{isAuthenticated, login, logout, user}}>{children}</FakeAuthContext.Provider>
}
function useFakeAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined) 
    throw new Error("useFakeAuth must be used within a FakeAuthProvider");
  return context;
}
export {FakeAuthProvider, useFakeAuth};
