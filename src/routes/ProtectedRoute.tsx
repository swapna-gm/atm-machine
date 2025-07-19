import { Navigate } from 'react-router-dom';
import { useATMApp } from '../context/ATMAppContext';
import type { JSX } from 'react';

type Props = {
  children: JSX.Element;
};
// handle protected route: block unaunthenticated user from access pin authenticated pages
const ProtectedRoute = ({ children }: Props) => {
  const { state } = useATMApp()!;

  if (!state.isAuthenticated) {
    return <Navigate to="/enter-pin" replace />;
  }
  return children;
};

export default ProtectedRoute;
