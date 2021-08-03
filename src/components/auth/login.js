import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { onSignInSubmit, getUser, getAccount } from "../reducer/action";
import "../auth/style.css";

const Login = ({
  onSignInSubmit,
  errorLoginMessage,
  displayErrorLogin,
  loadingLogin,
  listUser,
  getUser,
  getAccount,
  myAccount,
}) => {
  if (!localStorage.getItem("chatLogin")) {
    localStorage.setItem("chatLogin", "false");
  }
  const [telp, setTelp] = useState(null);
  const registerNum = (val) => {
    onSignInSubmit(val);
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
  useEffect(() => {
    getAccount();
  }, [getAccount]);
  console.log(myAccount);
  return (
    <div className="row d-flex justify-content-center">
      <nav class="navbar navbar-dark bg-success">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Login</span>
        </div>
      </nav>
      <div id="recaptcha-container"></div>
      {localStorage.getItem("chatLogin") === "false" && (
        <div className="loginContent col-7 row justify-content-center">
          <div class="form-floating col-10">
            <input
              value={telp}
              onChange={(e) => setTelp(e.target.value)}
              type="phone"
              class="form-control"
              id="floatingInput"
              placeholder="No telephone"
            />

            <label for="floatingInput">Phone number</label>
          </div>
          {telp === null && (
            <button className="btn btn-light col-4">Submit</button>
          )}
          {loadingLogin === false && telp !== null && (
            <button
              className="btn btn-success col-4"
              onClick={() =>
                registerNum({
                  telp: telp,
                  users: listUser,
                })
              }
            >
              Submit
            </button>
          )}
          {loadingLogin === true && telp !== null && (
            <button className="btn btn-success col-4">
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          )}

          {displayErrorLogin === true && (
            <div class="alert alert-danger col-9" role="alert">
              {errorLoginMessage} <a href="/login">Try again</a>
            </div>
          )}
        </div>
      )}
      {localStorage.getItem("chatLogin") === "true" && (
        <a
          href="/"
          className="loginBtn btn btn-success col-2 position-absolute top-50 start-50 translate-middle"
        >
          Login
        </a>
      )}
    </div>
  );
};

const stateReducer = (state) => {
  return {
    dialNumber: state.dialNumber,
    errorLoginMessage: state.errorLoginMessage,
    displayErrorLogin: state.displayErrorLogin,
    loadingLogin: state.loadingLogin,
    listUser: state.listUser,
    myAccount: state.myAccount,
  };
};

const dispatchReducer = (dispatch) => ({
  onSignInSubmit: (data) => dispatch(onSignInSubmit(data)),
  getUser: () => dispatch(getUser()),
  getAccount: () => dispatch(getAccount()),
});

export default connect(stateReducer, dispatchReducer)(Login);
