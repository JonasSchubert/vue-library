export interface CommunicationBus {
  publish: Function;
  subscribe: Function;
  unsubscribe: Function;
}
