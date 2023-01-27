import React, { useState, useContext } from "react";

const JwtContext = React.createContext();

const useJwt = () => useContext(JwtContext)

const JwtProvider = ({ children }) => {
    const [jwt, setJwt] = useState("");

    return (
        <JwtContext.Provider value={{ jwt, setJwt }}>
            {children}
        </JwtContext.Provider>
    );
}

export { useJwt, JwtProvider };