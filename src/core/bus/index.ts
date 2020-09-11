import { CommunicationBus } from "./type";

export const createCommunicationBus = (): CommunicationBus => {
  const subscribers: { [key: string]: Function[] } = {};

  const unsubscribe = (event: string): void => { subscribers[event].splice(subscribers[event].length - 1, 1); }

  const subscribe = (event: string, callback: Function): Function => {
    if (!Array.isArray(subscribers[event])) {
      subscribers[event] = [];
    }

    subscribers[event].push(callback);

    return (): void => unsubscribe(event)
  };

  const publish = (event: string, data: any): void => {
    if (Array.isArray(subscribers[event])) {
      subscribers[event].forEach((callback: Function) => callback(data));
    }
  };

  return {
    publish,
    subscribe,
    unsubscribe
  }
};
