import { AuthenticateState } from "./authenticate-state";

export interface BaseAuthenticateState {
  authenticate: AuthenticateState;
  requests: number;
}
