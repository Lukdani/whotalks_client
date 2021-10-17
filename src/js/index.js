import TopicModel from "./models/TopicModel.js";
import TopicController from "./TopicController/TopicController.js";
import TopicView from "./views/TopicView.js";

import "../css/topics.css";
import "../css/index.css";
import "../css/navbar.css";

import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";

import LoginModel from "./models/LoginModel.js";
import LoginController from "./TopicController/LoginController.js";
import LoginView from "./views/LoginView.js";

// LOGIN
const loginRoot = document.getElementById("navbar-login");
const loginModel = new LoginModel();
const loginView = new LoginView(loginRoot);
new LoginController(loginModel, loginView);

// TOPICS;
const topicRoot = document.getElementById("topics");
const topicModel = new TopicModel();
const topicView = new TopicView(topicRoot);
new TopicController(topicModel, topicView);
