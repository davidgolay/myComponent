export const grainMatches = (grain) => {
  let matches = false;
  switch (grain.toString()) {
    case "minutes":
      matches = true;
      break;
    case "days":
      matches = true;
      break;
    case "weeks":
      matches = true;
      break;
    case "months":
      matches = true;
      break;
    case "years":
      matches = true;
      break;
    default:
      matches = false;
      break;
  }
  return true;
};

export const hoursMins = (n) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);

  let formatted = "";
  formatted = rhours + " hour(s) and " + rminutes + " minute(s)";
  if (rminutes == 0) {
    formatted = rhours + " hour(s)";
  }
  return formatted;
};

export const matchingTooltipTypes = (type) => {
  let matches = false;
  switch (type) {
    case "composed":
      matches = true;
      break;
    case "default":
      matches = true;
      break;
    case "default-clocks":
      matches = true;
      break;
  }
  return matches;
};
