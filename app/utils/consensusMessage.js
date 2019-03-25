const consensusMessage = (win_float) => {
  
  if (win_float >= 80.0) {

    return "Nearly all people voting agree with you.";

  } else if (80.0 > win_float && win_float >= 55.0) {

    return "Most people voting agree with you.";

  } else if (55.0 > win_float && win_float >= 45.0) {

    return "About half the people voting agree with you.";

  } else if (45.0 > win_float && win_float >= 25.0) {

    return "You're in the minority, here.  Most people disagree with your vote!";

  } else if (25.0 > win_float && win_float >= 0.0) {

    return "Next to nobody agrees with you... bwah...";

  } else {

    return "Thanks for playing!";

  }
}

export default consensusMessage