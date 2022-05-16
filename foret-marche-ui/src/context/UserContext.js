import { React, createContext, useState } from "react";

const UserContext = createContext([{}, () => ({})]);

const UserContextProvider = (props) => {
    const [state, setState] = useState({
        token: localStorage.getItem('token')
    });
    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };