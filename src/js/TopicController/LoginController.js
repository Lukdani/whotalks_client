import getRequest from "../utils/getRequest";
import isTokenExpired from "../utils/isTokenExpired";
import postRequest from "../utils/postRequest";

class LoginController {
  constructor(loginModel, loginView) {
    // SAVING MODEL AND VIEW;
    this.loginModel = loginModel;
    this.loginView = loginView;

    // SETTING LOGIN FORM VIEW IF NOT LOGGED IN;
    if (!this.loginModel.state.user) {
      this.loginView.setLoginForm();
    }

    // BINDING THIS;
    this.handleLogin = this.handleLogin.bind(this);

    // BINDING SUBMIT BUTTON;
    this.loginView.bindLoginSubmit(this.handleLogin);

    this.checkIfLoggedIn();
  }

  async checkIfLoggedIn() {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && !isTokenExpired(accessToken)) {
      const user = await getRequest(
        "http://localhost:3000/api/v1/users/details",
        true
      );
      if (user) {
        this.setUser(user.data, null);
      }
    }
  }

  async handleLogin(email, password) {
    let user;
    if (email && password) {
      user = await postRequest(
        "http://localhost:3000/api/v1/users/login",
        false,
        {
          email,
          password,
        }
      );
    }
    if (user && user.user) {
      this.setUser(user.user, user.token);
    }
  }

  async setUser(user, accessToken) {
    if (accessToken) localStorage.setItem("access_token", accessToken);
    this.loginModel.setUser(user);
    this.loginView.setUsername(user);
  }
}

export default LoginController;
