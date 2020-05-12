import { UserRole } from "../enums";

export interface AuthenticateState {
  error?: Error;
  isLoading: boolean;
  token?: string;
  userRoles: UserRole[];
}
