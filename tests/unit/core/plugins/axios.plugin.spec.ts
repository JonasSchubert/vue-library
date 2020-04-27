import { AxiosStatic } from 'axios';
import { Store } from 'vuex';
import { BaseState } from '@/core/models';
import { createAxiosPlugin } from '@/core/plugins/axios.plugin';

describe('plugins/axios', () => {
  const axiosMock = {
    defaults: {
      baseURL: undefined
    },
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  };
  const storeMock = { commit: jest.fn() };
  const VueMock = { $http: undefined };

  beforeEach(() => {
    axiosMock.interceptors.request.use.mockReset();
    axiosMock.interceptors.response.use.mockReset();
    storeMock.commit.mockReset();
  });

  test('should set Vue.$http, baseUrl', () => {
    // Arrange
    const baseUrl = "http://localhost:15151/vue-library/api/v1/";

    // Act
    createAxiosPlugin(baseUrl).install(VueMock, {
      axios: (axiosMock as unknown as AxiosStatic),
      store: (storeMock as unknown as Store<BaseState>)
    });

    // Assert
    expect(axiosMock.defaults.baseURL).toBe('http://localhost:15151/vue-library/api/v1/');
    expect(VueMock.$http).toMatchSnapshot();
  });

  test.todo('interceptors should have an unit test');
});
