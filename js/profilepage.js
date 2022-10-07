'use strict';
import {
  utility,
  FB,
  constant,
  userLocalStorage,
} from './Managers/GlobalObjects.js';

let logoutBtn = utility.outlet ('#logoutBtn');
let profileSetting = utility.outlet ('#profileSetting');
let usernameTextField = utility.outlet ('#usernameTextField');
let emailTextField = utility.outlet ('#emailTextField');
let updateUserBtn = utility.outlet ('#updateUserBtn');
let greetingUser = utility.outlet ('#greetingUser');
let clientFeedback = utility.outlet ('#clientFeedback');
let clientFeedbackBtn = utility.outlet ('#clientFeedbackBtn');

(async function () {
  logoutBtn.addEventListener (utility.getCommonEvents ().onClick, function () {
    userLocalStorage.userLoggedOut ();
  });
  updateUserBtn.addEventListener (
    utility.getCommonEvents ().onClick,
    function () {
      var user = userLocalStorage.getUserData ();
      FB.writeUserData (
        user.uid,
        usernameTextField.value,
        user.email,
        function () {
          setUpView ();
        }
      );
    }
  );
  clientFeedbackBtn.addEventListener (
    utility.getCommonEvents ().onClick,
    function () {
      var user = userLocalStorage.getUserData ();
      FB.leaveFeedback (user.uid, clientFeedback.value, function () {
        clientFeedback.value = '';
      });
      addFeedbacks()
    }
  );
  setUpView ();
}) ();

function setUpView () {
  FB.getUserData (function (email, username) {
    profileSetting.innerHTML = username;
    usernameTextField.value = username;
    emailTextField.value = email;
    greetingUser.innerHTML = `Hello ${username} &#128512;`;
  });
  addFeedbacks()
}

function addFeedbacks() {

  FB.allFeedbacks(function(data) {
  let cartona = ``
  for (let i = 0; i < data.length; i++) {
    if (data[i].feedback != undefined) {
      console.log(data[i].feedback)
      cartona += `<div class="OtherFeedbacks w-50 mt-3 bg-light p-3 rounded-4">
      <div class="username">${data[i].username}</div>
      <div class="email text-muted ">${data[i].email}</div>
      <div class="feedback text-primary">${data[i].feedback}</div>
      </div>`
    }
  }
  utility.outlet('#feedbacks').innerHTML = cartona
})
}
