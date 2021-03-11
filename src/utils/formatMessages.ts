import { Message } from "../types/messages.type";

export const formatMessages = (
  msgArray: Message[]
): Record<string, Message[]> => {
  const res: Record<string, Message[]> = {};
  if (msgArray.length === 0) {
    return {};
  }
  for (const msg of msgArray) {
    if (msg.sub in res) {
      res[msg.sub].push(msg);
    } else {
      res[msg.sub] = [msg];
    }
  }
  return res;
};
