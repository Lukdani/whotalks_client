class LoginModel {
  constructor() {
    this.state = {
      user: null,
      accessToken: null,
    };
  }

  setUser(user) {
    this.state.user = user;
  }

  setAccessToken(accessToken) {
    this.state.accessToken = accessToken;
  }
}

export default LoginModel;
