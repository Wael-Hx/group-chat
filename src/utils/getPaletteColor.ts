export const getPaletteColor = (
  senderId: string,
  userId: string,
  modId: string | null
) => {
  if (senderId === userId) {
    return "userColor";
  } else if (senderId === modId) {
    return "modColor";
  } else if (userId === modId) {
    return "secondary";
  } else {
    return "membersColor";
  }
};
