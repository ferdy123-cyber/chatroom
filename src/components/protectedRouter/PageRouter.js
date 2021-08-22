import { Route, Redirect } from "react-router-dom";

const PageRouter = (props) => {
  if (localStorage.getItem("chatLogin") === "false") {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
};

export default PageRouter;
