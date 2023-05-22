import { Navigate } from "react-router-dom";
const Protected = ({  children }) => {
  const isAuthenticated = !! localStorage.getItem('token');
  if (!isAuthenticated ) {
  return (<Navigate to="/" replace />  );
  }
  return children;
};
export default Protected;