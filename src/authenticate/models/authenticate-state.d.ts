import { LoginResponse } from "./login-response";

export interface AuthenticateState<T extends LoginResponse> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}
