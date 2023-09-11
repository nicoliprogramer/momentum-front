import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../../redux/hooks";

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({children}: Props) => {
  const [jwt, setJwt] = useLocalState("", "token")
  return jwt ? children : <Navigate to="login"/>
};



