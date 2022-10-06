'use strict';
import {utility, FB, constant, userLocalStorage} from './Managers/GlobalObjects.js';

let toggleAuthModeBtn = utility.outlet ('#toggleAuthMode');
let formHeaderIcon = utility.outlet ('#formHeaderIcon');
let formHeaderText = utility.outlet ('#formHeaderText');
let askingUserisExisit = utility.outlet ('#askingUserisExisit');
let submitBtn = utility.outlet ('#submitFormBtn');
let isExisit = true;

function getInputs () {
  return {
    username: utility.outlet ('#userNameTF'),
    email: utility.outlet ('#emailTF'),
    password: utility.outlet ('#passwordTF'),
  };
}


function toggleAuthMode () {
  if (isExisit) {
    handleSignInDesign ();
  } else {
    handleRegisterDesign ();
  }
  isExisit = !isExisit;
}

(function () {
  if (userLocalStorage.isLoggedIn()) {
    
  } else {
    constant;
    document.body.classList.remove ('d-none');
    toggleAuthMode ();
    toggleAuthModeBtn.addEventListener (
      utility.getCommonEvents ().onClick,
      toggleAuthMode
    );
    document.addEventListener (utility.getCommonEvents ().keyDown, function (
      event
    ) {
      if (event.code == 'Enter') {
        if (isExisit) {
          let user = {
            name: getInputs ().username.value,
            email: getInputs ().email.value,
            password: getInputs ().password.value,
          };
          validate (user);
        } else {
          let user = {
            email: getInputs ().email.value,
            password: getInputs ().password.value,
          };
          validate (user);
        }
      }
    });
  }
}) ();

function handleSignInDesign () {
  toggleAuthModeBtn.innerText = 'Sign Up';
  askingUserisExisit.innerText = 'Don’t have an account?';
  getInputs ().username.parentElement.classList.add ('d-none');
  formHeaderText.innerText = 'Login';
  formHeaderIcon.classList.add ('bi-box-arrow-in-right');
  formHeaderIcon.classList.replace (
    'bi-person-circle',
    'bi-box-arrow-in-right'
  );
  submitBtn.innerText = 'Log in';
  submitBtn.removeEventListener (
    utility.getCommonEvents ().onClick,
    createUser
  );
  submitBtn.addEventListener (utility.getCommonEvents ().onClick, logUser);
  utility.clearAllInputs ();
  utility.getErrVisual ();
}

function handleRegisterDesign () {
  toggleAuthModeBtn.innerText = 'Sign In';
  askingUserisExisit.innerText = 'You have an account?';
  getInputs ().username.parentElement.classList.remove ('d-none');
  formHeaderText.innerText = 'Create account!';
  formHeaderIcon.classList.add ('bi-person-circle');
  formHeaderIcon.classList.replace (
    'bi-box-arrow-in-right',
    'bi-person-circle'
  );
  submitBtn.innerText = 'Create';
  submitBtn.removeEventListener (utility.getCommonEvents ().onClick, logUser);
  submitBtn.addEventListener (utility.getCommonEvents ().onClick, createUser);
  utility.clearAllInputs ();
  utility.getErrVisual ();
}

function createUser () {
  let user = {
    name: getInputs ().username.value,
    email: getInputs ().email.value,
    password: getInputs ().password.value,
  };
  validate (user);
}

function logUser () {
  let user = {
    email: getInputs ().email.value,
    password: getInputs ().password.value,
  };
  validate (user);
}

function validate (user) {
  if (user.name == undefined) {
    // log
    if (utility.validateEmailAddress (user.email)) {
      if (utility.validatePassword (user.password)) {
        // login Function fb func
        utility.getErrVisual ();
        FB.loginUserFB (user, getInputs ());

        return true;
      } else {
        utility.addErrAnimation (getInputs ().password);
        utility.getErrVisual (
          getInputs ().password,
          constant.passwordRegexErrExplain
        );
        return false;
      }
    } else {
      utility.addErrAnimation (getInputs ().email);
      utility.getErrVisual (getInputs ().email, constant.emailRegexErrExplain);
      return false;
    }
  } else {
    // sign up
    if (user.name.length >= 3) {
      if (utility.validateEmailAddress (user.email)) {
        if (utility.validatePassword (user.password)) {
          // sign up fb func
          utility.getErrVisual ();
          FB.createUserFB (user, getInputs ());
          return true;
        } else {
          utility.addErrAnimation (getInputs ().password);
          utility.getErrVisual (
            getInputs ().password,
            constant.passwordRegexErrExplain
          );
          return false;
        }
      } else {
        utility.addErrAnimation (getInputs ().email);
        utility.getErrVisual (
          getInputs ().email,
          constant.emailRegexErrExplain
        );
        return false;
      }
    } else {
      utility.addErrAnimation (getInputs ().username);
      utility.getErrVisual (getInputs ().username, constant.userNameErrExplain);
      return false;
    }
  }
}
