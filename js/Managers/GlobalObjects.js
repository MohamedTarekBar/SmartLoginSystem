'use strict';

import Utilities from './Utilities.js'
import {constants} from './Constants.js';
import FireBase from './Firebase.js';
import UserLocalStorage from './UserLocalStorage.js';

export const utility = new Utilities();
export const FB = new FireBase();
export const constant = constants;
export const userLocalStorage = new UserLocalStorage();
