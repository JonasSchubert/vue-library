// Import `shallowMount` from Vue Test Utils and the component being tested
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { shallowMount } from '@vue/test-utils';
import { ConfirmDialogConfig } from '@/core/dialogs/confirm-dialog';
import ConfirmDialog from '@/core/dialogs/confirm-dialog/confirm-dialog.vue';
import vuetify from '../../../../mocks/vuetify.plugin';

Vue.use(VueI18n);
const i18n: VueI18n = new VueI18n({});

// Mount the component
const wrapper = shallowMount(ConfirmDialog, {
  i18n,
  vuetify
});

describe('ConfirmDialog', () => {
  test('sets the correct default data when mounted', () => {
    // Assert
    const defaultData = wrapper.vm.$data;
    expect(defaultData.buttons).toMatchSnapshot({
      confirm: {
        icon: undefined,
        iconColor: undefined,
        text: 'message.confirm',
        textColor: 'success'
      }
    });
    expect(defaultData.maxWidth).toBe(360);
    expect(defaultData.message).toBe('');
    expect(defaultData.messageParams).toMatchSnapshot([]);
    expect(defaultData.showDialog).toBeFalsy();
    expect(defaultData.title).toBe('');
    expect(defaultData.translate).toBeTruthy();
  });

  describe('methods', () => {
    describe('cancel', () => {
      test('should set showDialog to false', () => {
        // Arrange
        wrapper.vm.$data.showDialog = true;
        wrapper.vm.$emit = jest.fn();

        // Act
        (wrapper.vm as any).cancel();

        // Assert
        expect(wrapper.vm.$data.showDialog).toBeFalsy();
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$emit).toHaveBeenCalledWith('cancel', undefined);
      });
    });

    describe('confirm', () => {
      test('should set showDialog to false', () => {
        // Arrange
        wrapper.vm.$data.showDialog = true;
        wrapper.vm.$emit = jest.fn();

        // Act
        (wrapper.vm as any).confirm();

        // Assert
        expect(wrapper.vm.$data.showDialog).toBeFalsy();
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$emit).toHaveBeenCalledWith('confirm', undefined);
      });
    });

    describe('open', () => {
      test('should set showDialog to true and set config 1', () => {
        // Arrange
        const confirmDialogConfig: ConfirmDialogConfig<any> = {
          buttons: {
            cancel: {
              icon: 'mdi-exit',
              iconColor: 'accent',
              text: 'message.cancel',
              textColor: 'accent'
            },
            confirm: {
              icon: undefined,
              iconColor: undefined,
              text: 'message.ok',
              textColor: 'success'
            }
          },
          maxWidth: 340,
          message: 'message.ok',
          title: 'message.success'
        };
        wrapper.vm.$data.showDialog = false;

        // Act
        (wrapper.vm as any).open(confirmDialogConfig);

        // Assert
        const defaultData = wrapper.vm.$data;
        expect(defaultData.buttons).toMatchSnapshot({
          cancel: {
            icon: 'mdi-exit',
            iconColor: 'accent',
            text: 'message.cancel',
            textColor: 'accent'
          },
          confirm: {
            icon: undefined,
            iconColor: undefined,
            text: 'message.ok',
            textColor: 'success'
          }
        });
        expect(defaultData.maxWidth).toBe(340);
        expect(defaultData.message).toBe('message.ok');
        expect(defaultData.messageParams).toMatchSnapshot([]);
        expect(defaultData.showDialog).toBeTruthy();
        expect(defaultData.title).toBe('message.success');
        expect(defaultData.translate).toBeTruthy();
      });

      test('should set showDialog to true and set config 2', () => {
        // Arrange
        const confirmDialogConfig: ConfirmDialogConfig<any> = {
          buttons: {
            cancel: {
              icon: 'mdi-exit',
              iconColor: 'accent',
              text: 'message.cancel',
              textColor: 'accent'
            },
            confirm: {
              icon: undefined,
              iconColor: undefined,
              text: 'message.ok',
              textColor: 'success'
            }
          },
          message: 'message.ok',
          title: 'message.success',
          translate: false
        };
        wrapper.vm.$data.showDialog = false;

        // Act
        (wrapper.vm as any).open(confirmDialogConfig);

        // Assert
        const defaultData = wrapper.vm.$data;
        expect(defaultData.buttons).toMatchSnapshot({
          cancel: {
            icon: 'mdi-exit',
            iconColor: 'accent',
            text: 'message.cancel',
            textColor: 'accent'
          },
          confirm: {
            icon: undefined,
            iconColor: undefined,
            text: 'message.ok',
            textColor: 'success'
          }
        });
        expect(defaultData.maxWidth).toBe(360);
        expect(defaultData.message).toBe('message.ok');
        expect(defaultData.messageParams).toMatchSnapshot([]);
        expect(defaultData.showDialog).toBeTruthy();
        expect(defaultData.title).toBe('message.success');
        expect(defaultData.translate).toBeFalsy();
      });
    });
  });
});
