export const getPaletteColor = (
  senderId: string,
  userId: string,
  modId: string | null
) => {
  if (senderId === modId && senderId === userId) {
    return "secondary";
  } else if (senderId === userId) {
    return "userColor";
  } else if (senderId === modId) {
    return "modColor";
  } else {
    return "membersColor";
  }
};
