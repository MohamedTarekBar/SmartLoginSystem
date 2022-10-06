'use strict';
import { utility,FB,constant, userLocalStorage } from './Managers/GlobalObjects.js';

let logoutBtn = utility.outlet ('#logoutBtn');
let profileSetting = utility.outlet ('#profileSetting');
let usernameTextField = utility.outlet ('#usernameTextField');
let emailTextField = utility.outlet ('#emailTextField');
let updateUserBtn = utility.outlet('#updateUserBtn');
let greetingUser = utility.outlet('#greetingUser');

(async function () {
  logoutBtn.addEventListener (utility.getCommonEvents ().onClick, function () {
    userLocalStorage.userLoggedOut ();
  });
  updateUserBtn.addEventListener (utility.getCommonEvents ().onClick, function () {
      var user = userLocalStorage.getUserData();
      FB.writeUserData(user.uid,usernameTextField.value,user.email,function() {
        setUpView();
      }); 
  });
  setUpView()
}) ();

function setUpView() {
  FB.getUserData(function(email,username) {
    profileSetting.innerHTML = username;
    usernameTextField.value = username;
    emailTextField.value = email;
    greetingUser.innerHTML = `Hello ${username} &#128512;`;
  }); 
}

