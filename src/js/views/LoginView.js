import createElement from "../utils/createElement";

class LoginView {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  setLoginForm() {
    this.rootElement.innerHTML = "";
    console.log(this.rootElement);
    const loginForm = createElement("form", ["login-form"], "loginForm");
    loginForm.setAttribute("method", "post");
    this.rootElement.appendChild(loginForm);

    // EMAIL INPUT;
    const emailInput = createElement("input", null, "emailInput");
    emailInput.placeholder = "E-mail";
    emailInput.name = "email";
    loginForm.appendChild(emailInput);

    // EMAIL INPUT;
    const passwordInput = createElement("input", null, "passwordInput");
    passwordInput.placeholder = "Password";
    passwordInput.name = "password";
    loginForm.appendChild(passwordInput);

    // LOGIN BUTTON;
    const loginButton = createElement("button", ["btn"], "loginButton");
    loginButton.textContent = "Login";
    loginButton.type = "submit";

    loginForm.appendChild(loginButton);
  }

  setUsername(user) {
    this.rootElement.innerHTML = "";

    //USERNAME
    const username = createElement("p", null, "username");
    username.textContent = user.email;
    console.log(user, user.email);
    this.rootElement.appendChild(username);
  }

  bindLoginSubmit(callback) {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const loginData = { email: "", password: "" };
      var loginFormData = new FormData(document.querySelector("form"));
      for (var [key, value] of loginFormData.entries()) {
        loginData[key] = value;
      }
      if (loginData.email && loginData.password && callback)
        callback(loginData.email, loginData.password);
    });
  }
}

export default LoginView;
