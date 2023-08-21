import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../../hooks/storeHooks';


interface Props {
  children: any;
}

export const PrivateRouteAdmin: FC<Props> = ({ children }) => {
  const { isAdmin, isLoading } = useAppSelector((state) => state.AuthSlice);

  if (isLoading) return null; // <-- or loading spinner, etc...

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRouteAdmin;
