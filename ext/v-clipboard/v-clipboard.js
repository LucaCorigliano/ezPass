/**
 * Copyright (c) 2017 - 2018 - Yev Vlasenko
 */
var cssText = "position:fixed;pointer-events:none;z-index:-9999;opacity:0;";
var copyErrorMessage = "Failed to copy value to clipboard. Unknown type.";

copyToClipboard = function(input) {
  var textarea = document.createElement("textarea");
  var value;

  if (typeof input !== "string") {
    try {
      value = JSON.stringify(input);
    } catch (e) {
      throw copyErrorMessage;
    }
  } else {
    value = input
  }

  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText = cssText;

  document.body.appendChild(textarea);

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = textarea.contentEditable;
    var readOnly = textarea.readOnly;

    textarea.contentEditable = true;
    textarea.readOnly = true;

    var range = document.createRange();

    range.selectNodeContents(textarea);

    var selection = window.getSelection();

    selection.removeAllRanges();
    selection.addRange(range);
    textarea.setSelectionRange(0, 999999);

    textarea.contentEditable = editable;
    textarea.readOnly = readOnly;
  } else {
    textarea.select();
  }

  var success = false;

  try {
    success = document.execCommand("copy");
  } catch (err) {
    console.warn(err);
  }

  document.body.removeChild(textarea);

  return success;
};

