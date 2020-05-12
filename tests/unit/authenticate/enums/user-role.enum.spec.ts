import { UserRole } from '@/authenticate/enums/user-role.enum';

describe('UserRole', () => {
  describe('toArray', () => {
    test.each([
      [[UserRole.User, UserRole.Administrator], UserRole.Administrator + UserRole.User],
      [[UserRole.Administrator], UserRole.Administrator],
      [[UserRole.User], UserRole.User],
      [[], UserRole.Null]
    ])('should return %s for %s', (expected, userRole) => {
      // Arrange & Act
      const actual: UserRole[] = UserRole.toArray(userRole);

      // Assert
      expect(actual).toMatchObject(expected);
    });
  });

  describe('toValue', () => {
    test.each([
      [UserRole.Administrator + UserRole.User, [UserRole.Administrator, UserRole.User]],
      [UserRole.Administrator, [UserRole.Administrator]],
      [UserRole.User, [UserRole.User]],
      [UserRole.Null, []]
    ])('should return %s for %s', (expected, userRoles) => {
      // Arrange & Act
      const actual: UserRole = UserRole.toValue(userRoles);

      // Assert
      expect(actual).toBe(expected);
    });
  });
});
