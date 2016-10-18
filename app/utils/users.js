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

