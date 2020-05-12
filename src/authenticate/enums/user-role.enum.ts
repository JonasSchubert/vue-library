/* eslint-disable */

export enum UserRole {
  Null = 0,
  User = 1 << 0,
  Administrator = 1 << 1
}

export namespace UserRole {
  export const toArray = (userRole: UserRole): UserRole[] => {
    const array: UserRole[] = [];

    let index = 0;
    let compare: number;

    while (UserRole[compare = 1 << index++]) {
      if (userRole & compare) {
        array.push(compare);
      }
    }

    return array;
  }

  export const toValue = (userRoles: UserRole[]): UserRole => {
    let userRole: UserRole = UserRole.Null;

    userRoles.forEach((value: UserRole) => userRole = userRole + value);

    return userRole;
  }
}
