import controlsPlugin from '@/core/plugins/controls.plugin';

describe('plugins/controls', () => {
  const VueMock = { component: jest.fn() };

  test('should register all controls as expected', () => {
    // Arrange & Act
    controlsPlugin.install(VueMock);

    // Assert
    expect(VueMock.component).toHaveBeenCalledTimes(8);
    expect(VueMock.component).toHaveBeenCalledWith('app-bar', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-bar-btn', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-bar-menu', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-content', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-footer', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-locale-chooser', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-snackbar', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('confirm-dialog', expect.any(Function));
  });
});
