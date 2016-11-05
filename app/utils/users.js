// For now, a user has no name or username.
// Finally some non-react code.  I'm sure
// there are a few other functions I can extract.
// Probably some reducer logic...

export const userGreeting = (user) => {
  if (user.name) {
    return `Heyyy, ${user.name}`
  } else if (user.username) {
    return `Heyyy, ${user.name}`
  } else {
    const email = user.email;
    const at = email.indexOf('@');
    const prefix = email.substring(0, at);
    return `Hi ${prefix}!`
  }
}

// from: http://stackoverflow.com/a/16861050/791026
export const PopupCenter = (url, title, w, h) => {
  const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

  //  whoo the double ternary, ha
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const left = ((width / 2) - (w / 2)) + dualScreenLeft;
  const top = ((height / 2) - (h / 2)) + dualScreenTop;
  const newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  // Puts focus on the newWindow
  if (window.focus) {
      newWindow.focus();
  }
}
