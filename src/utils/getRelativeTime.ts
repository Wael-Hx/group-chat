export const getRelativeTime = (unixTime: number): string => {
  let currentTime = Math.round(Date.now() / 1000);
  let relativeTime = currentTime - Math.round(unixTime / 1000);
  let min = 60,
    hour = 3600,
    day = 86400,
    month = 2592000,
    rTime = 0;

  if (relativeTime < min) {
    rTime = Math.round(relativeTime / 1);
    return `${rTime} second${rTime > 1 ? "s" : ""} ago`;
  } else if (relativeTime < hour) {
    rTime = Math.round(relativeTime / min);
    return `${rTime} min${rTime > 1 ? "s" : ""} ago`;
  } else if (relativeTime < day) {
    rTime = Math.round(relativeTime / hour);
    return `${rTime} hour${rTime > 1 ? "s" : ""} ago `;
  } else if (relativeTime > day && relativeTime < month) {
    rTime = Math.round(relativeTime / day);
    return `${rTime} day${rTime > 1 ? "s" : ""} ago `;
  } else if (relativeTime > month) {
    rTime = Math.round(relativeTime / month);
    return `${rTime} month${rTime > 1 ? "s" : ""} ago `;
  } else {
    return "...";
  }
};
