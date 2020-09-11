import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import Vuex, { Store } from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Login from '@/authenticate/views/Login.vue';

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuetify);
localVue.use(Vuex);

const i18n = new VueI18n({});
const store: Store<any> = new Store({});
const vuetify = new Vuetify({ theme: { dark: true } });

// Mount the component
const wrapper = shallowMount(Login, {
  i18n,
  localVue,
  store,
  vuetify
});

describe('Login', () => {
  test('sets the correct default data when mounted', () => {
    // Assert
    const defaultData = wrapper.vm.$data;
    expect(defaultData.password).toBe('');
    expect(defaultData.saveLoginDataTemporary).toBeTruthy();
    expect(defaultData.userName).toBe('');
    expect(defaultData.valid).toBeFalsy();
  });

  describe('computed', () => {
    describe('rules', () => {
      describe('password', () => {
        test('should return true if value exists', () => {
          // Arrange
          const value = 'I exist!';
          const passwordRules: ((password: string) => string | boolean | VueI18n.LocaleMessages)[] = (wrapper.vm as any).rules.password;

          // Act
          let actual;
          for (let index = 0; index < passwordRules.length; index += 1) {
            actual = passwordRules[index](value);
            if (typeof actual === 'string') {
              break;
            }
          }

          // Assert
          expect(actual).toBeTruthy();
        });

        test('should return string "Required" if value does not exist', () => {
          // Arrange
          const value = '';
          const passwordRules: ((password: string) => string | boolean | VueI18n.LocaleMessages)[] = (wrapper.vm as any).rules.password;

          // Act
          let actual;
          for (let index = 0; index < passwordRules.length; index += 1) {
            actual = passwordRules[index](value);
            if (typeof actual === 'string') {
              break;
            }
          }

          // Assert
          expect(actual).toBe('message.required');
        });
      });

      describe('userName', () => {
        test('should return true if value exists', () => {
          // Arrange
          const value = 'I exist!';
          const userNameRules: ((userName: string) => string | boolean | VueI18n.LocaleMessages)[] = (wrapper.vm as any).rules.userName;

          // Act
          let actual;
          for (let index = 0; index < userNameRules.length; index += 1) {
            actual = userNameRules[index](value);
            if (typeof actual === 'string') {
              break;
            }
          }

          // Assert
          expect(actual).toBeTruthy();
        });

        test('should return string "Required" if value does not exist', () => {
          // Arrange
          const value = '';
          const userNameRules: ((userName: string) => string | boolean | VueI18n.LocaleMessages)[] = (wrapper.vm as any).rules.userName;

          // Act
          let actual;
          for (let index = 0; index < userNameRules.length; index += 1) {
            actual = userNameRules[index](value);
            if (typeof actual === 'string') {
              break;
            }
          }

          // Assert
          expect(actual).toBe('message.required');
        });
      });
    });
  });

  describe('methods', () => {
    describe('login', () => {
      test('should call $store.dispatch if valid is true', () => {
        // Arrange
        wrapper.vm.$data.password = 'password';
        wrapper.vm.$data.saveLoginDataTemporary = true;
        wrapper.vm.$data.userName = 'userName';
        wrapper.vm.$data.valid = true;
        store.dispatch = jest.fn();

        // Act
        (wrapper.vm as any).login();

        // Assert
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith('authenticate/login', {
          password: 'password',
          saveLoginDataTemporary: true,
          userName: 'userName'
        });
      });

      test('should not call $store.dispatch if valid is false', () => {
        // Arrange
        wrapper.vm.$data.password = 'password';
        wrapper.vm.$data.saveLoginDataTemporary = true;
        wrapper.vm.$data.userName = 'userName';
        wrapper.vm.$data.valid = false;
        store.dispatch = jest.fn();

        // Act
        (wrapper.vm as any).login();

        // Assert
        expect(store.dispatch).toHaveBeenCalledTimes(0);
      });
    });

    describe('onKeydown', () => {
      test('should call $store.dispatch if keyEvent.code is Enter and valid is true', () => {
        // Arrange
        wrapper.vm.$data.password = 'password';
        wrapper.vm.$data.saveLoginDataTemporary = true;
        wrapper.vm.$data.userName = 'userName';
        wrapper.vm.$data.valid = true;
        store.dispatch = jest.fn();

        // Act
        (wrapper.vm as any).onKeydown({ code: 'Enter' });

        // Assert
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith('authenticate/login', {
          password: 'password',
          saveLoginDataTemporary: true,
          userName: 'userName'
        });
      });

      test('should not call $store.dispatch if keyEvent.code is Escape but valid is true', () => {
        // Arrange
        wrapper.vm.$data.password = 'password';
        wrapper.vm.$data.saveLoginDataTemporary = true;
        wrapper.vm.$data.userName = 'userName';
        wrapper.vm.$data.valid = true;
        store.dispatch = jest.fn();

        // Act
        (wrapper.vm as any).onKeydown({ code: 'Escape' });

        // Assert
        expect(store.dispatch).toHaveBeenCalledTimes(0);
      });
    });
  });
});
