import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Page from "./components/mainPage/page";
import IsLoginRouter from "./components/protectedRouter/isLoginRouter";
import NewApp from "./components/newapp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <Router>
      <Switch>
        <IsLoginRouter component={Login} path="/login" exact />
        <Route component={Page} path="/" exact />
        <Route component={NewApp} path="/home" />
      </Switch>
    </Router>
  );
}

export default App;
