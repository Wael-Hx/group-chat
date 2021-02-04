export const isToken = (token: string): boolean => {
  try {
    let payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.email) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
