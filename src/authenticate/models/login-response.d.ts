import { UserRole } from "../enums";

export interface LoginResponse {
  role: UserRole;
  success: boolean;
  token: string;
}
