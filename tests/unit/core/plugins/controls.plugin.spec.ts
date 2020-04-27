import controlsPlugin from '@/core/plugins/controls.plugin';

describe('plugins/controls', () => {
  const VueMock = { component: jest.fn() };

  test('should register all controls as expected', () => {
    // Arrange & Act
    controlsPlugin.install(VueMock);

    // Assert
    expect(VueMock.component).toHaveBeenCalledTimes(3);
    expect(VueMock.component).toHaveBeenCalledWith('app-bar-btn', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-snackbar', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('confirm-dialog', expect.any(Function));
  });
});
