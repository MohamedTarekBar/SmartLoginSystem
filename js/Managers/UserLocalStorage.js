'use strict';

import {constant} from './GlobalObjects.js';

export default class UserLocalStorage {
  constructor () {
    this.isLoggedIn ();
  }

  isLoggedIn () {
    if (localStorage.getItem (constant.isLoggedIn) == null) {
      if (!window.location.pathname.includes ('index.html')) {
        window.location = '/../../index.html';
      }
      return false;
    } else {
      if (localStorage.getItem (constant.isLoggedIn) == 'true') {
        if (!window.location.pathname.includes ('profilepage.html')) {
          window.location = '/pages/profilepage.html';
        } else {
        }
      } else {
        if (!window.location.pathname.includes ('index.html')) {
          window.location = '/../index.html';
        }
      }
    }
  }

  setUserData (user) {
    let stringify = JSON.stringify (user);
    localStorage.setItem (constant.user, stringify);
  }

  getUserData () {
    if (localStorage.getItem (constant.user) != null) {
      let parse = JSON.parse (localStorage.getItem (constant.user));
      return parse;
    } else {
        this.attackingGuard()
    }
  }

  deleteUserData() {
    localStorage.setItem(constant.user,null)
  }

  userLoggedIn () {
    localStorage.setItem (constant.isLoggedIn, true);
    this.isLoggedIn ();
  }

  userLoggedOut () {
    localStorage.setItem (constant.isLoggedIn, false);
    this.deleteUserData()
    this.isLoggedIn ();
  }

  attackingGuard () {
    localStorage.clear ();
    if (!window.location.pathname.includes ('index.html')) {
      window.location = '/../index.html';
    }
  }
}
