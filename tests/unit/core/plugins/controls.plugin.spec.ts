import controlsPlugin from '@/core/plugins/controls.plugin';

describe('plugins/controls', () => {
  const VueMock = { component: jest.fn() };

  test('should register all controls as expected', () => {
    // Arrange & Act
    controlsPlugin.install(VueMock);

    // Assert
    expect(VueMock.component).toHaveBeenCalledTimes(19);
    expect(VueMock.component).toHaveBeenCalledWith('app-bar', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-bar-btn', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-bar-menu', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-content', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-footer', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-locale-chooser', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('app-snackbar', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('confirm-dialog', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('dinosaur-game', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('audio-player', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('bar-chart', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('bubble-chart', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('doughnut-chart', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('horizontal-bar-chart', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('line-chart', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('pie-chart', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('polar-chart', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('radar-chart', expect.any(Function));
    expect(VueMock.component).toHaveBeenCalledWith('scatter-chart', expect.any(Function));
  });
});
