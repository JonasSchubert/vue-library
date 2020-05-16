import { AuthenticateState } from "./authenticate-state";
import { LoginResponse } from "./login-response";

export interface BaseAuthenticateState {
  authenticate: AuthenticateState<LoginResponse>;
  requests: number;
}
