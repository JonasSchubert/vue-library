import { GetterTree } from "vuex";
import { AuthenticateState } from "./authenticate-state.d";
import { LoginResponse } from "./login-response.d";

export interface AuthenticateModuleSetup<TRootState, T extends LoginResponse> {
  cookieKeyAuthenticationToken: string;
  customGetters?: GetterTree<AuthenticateState<T>, TRootState>;
  daysTilExpiredAuthenticationCookie: number;
}
