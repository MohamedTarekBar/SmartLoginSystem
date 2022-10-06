'use strict';

import {constant} from './GlobalObjects.js';

export default class Utilities {
  getCommonEvents () {
    return {
      onClick: 'click',
      onChange: 'change',
      mouseOn: 'mouseover',
      mouseOut: 'mouseout',
      keyDown: 'keydown',
      keyUp: 'keyUp',
      onload: 'onload',
    };
  }

  outlet (id) {
    let linkType = id[0];
    let elName = id.substring (1);

    switch (linkType) {
      case '#':
        return document.getElementById (elName);
        break;
      case '.':
        return document.getElementsByClassName (elName);
        break;
      default:
        return document.getElementsByTagName (id);
        break;
    }
  }

  validateEmailAddress (email) {
    return constant.emailRegex.test (email);
  }

  validatePassword (password) {
    return constant.passwordRegex.test (password);
  }

  clearAllInputs () {
    document.querySelectorAll ('input').forEach (element => {
      element.value = '';
    });
  }

  addErrAnimation (el) {
    el.classList.add ('error');
    el.focus ();
    setTimeout (() => {
      el.classList.remove ('error');
      clearTimeout ();
    }, 100);
  }

  maxmumCharInText () {
    let maxChar_50 = document.querySelectorAll ('.max-char-50');
    let maxChar_100 = document.querySelectorAll ('.max-char-100');
    let maxChar_150 = document.querySelectorAll ('.max-char-150');
    let maxChar_200 = document.querySelectorAll ('.max-char-200');
    let maxChar_250 = document.querySelectorAll ('.max-char-250');

    if (maxChar_50 != null || maxChar_50 != undefined) {
      maxChar_50.forEach (function (i) {
        console.log (i.childNodes[0].nodeValue);
        i.childNodes[0].nodeValue = textCut (50, i.childNodes[0].nodeValue);
      });
    }
    if (maxChar_100 != null || maxChar_100 != undefined) {
      maxChar_100.forEach (function (i) {
        i.childNodes[0].nodeValue = textCut (100, i.childNodes[0].nodeValue);
      });
    }
    if (maxChar_150 != null || maxChar_150 != undefined) {
      maxChar_150.forEach (function (i) {
        i.childNodes[0].nodeValue = textCut (150, i.childNodes[0].nodeValue);
      });
    }
    if (maxChar_200 != null || maxChar_200 != undefined) {
      maxChar_200.forEach (function (i) {
        i.childNodes[0].nodeValue = textCut (200, i.childNodes[0].nodeValue);
      });
    }
    if (maxChar_250 != null || maxChar_250 != undefined) {
      maxChar_250.forEach (function (i) {
        i.childNodes[0].nodeValue = textCut (250, i.childNodes[0].nodeValue);
      });
    }
  }

  textCut (limit, text) {
    let newText = '';
    for (let i = 0; i < limit; i++) {
      newText += text[i];
    }
    newText += '...';
    return newText;
  }

  getErrVisual (input, errorMessage) {
    let error = document.querySelectorAll ('#errorLabel');
    if (error.length != 0) {
      for (let i = 0; i < error.length; i++) {
        error[i].remove ();
      }
    }
    if (input != undefined) {
      if (!input.parentElement.classList.contains ('d-none')) {
        let err_div = document.createElement ('div');
        err_div.id = 'errorLabel';
        err_div.classList.add ('error-label');

        let err_span_container = document.createElement ('span');
        err_span_container.classList.add (
          'd-flex',
          'gap-2',
          'align-items-center',
          'mt-2'
        );

        let err_span_icon = document.createElement ('span');
        err_span_icon.classList.add ('align-self-start');

        let err_icon = document.createElement ('i');
        err_icon.classList.add (
          'bi',
          'bi-exclamation-triangle',
          'text-bg-warning',
          'text-dark',
          'p-2',
          'd-flex',
          'rounded-1'
        );

        let err_message = document.createElement ('p');
        err_message.classList.add ('max-char-50', 'p-0', 'm-0');
        err_message.innerText = errorMessage;

        input.parentElement.appendChild (err_div);
        err_div.appendChild (err_span_container);
        err_span_container.appendChild (err_span_icon);
        err_span_icon.appendChild (err_icon);
        err_span_container.appendChild (err_message);
      }
    }
  }
  appearIndicator (body) {
    let indicator = document.createElement ('div');
    indicator.id = 'indicator';
    indicator.classList.add (
      'indicator',
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'position-absolute',
      'top-0',
      'bottom-0',
      'start-0',
      'end-0'
    );
    let spinner = document.createElement ('div');
    spinner.classList.add ('spinner-border', 'text-light');
    spinner.setAttribute ('role', 'status');

    body.appendChild (indicator);
    indicator.appendChild (spinner);
  }

  hideIndicator () {
    var indicator = this.outlet ('#indicator');
    if (indicator != null) {
      indicator.remove ();
    }
  }
}
