import { initializeConfig } from '../../';
import { generateQueueConfig } from '../generate-queue-config';

jest.mock('../../');

describe('generateQueueConfig', () => {
  const hosts = [
    {
      host: 'mq-1',
      port: '61613',
      ssl: false,
      username: 'guest',
      password: 'guest',
      vhost: '/'
    },
    {
      host: 'mq-2',
      port: '61613',
      ssl: false,
      username: 'guest',
      password: 'guest',
      vhost: '/'
    }
  ];
  const mockQueueUrls = ['tcp://mq-1:61613', 'tcp://mq-2:61613'];
  initializeConfig.mockReturnValue({
    queueUrls: mockQueueUrls,
    queueUsername: 'guest',
    queuePassword: 'guest',
    queueVirtualHost: '/'
  });

  afterEach(() => {
    if (process.env.NHS_ENVIRONMENT) {
      delete process.env.NHS_ENVIRONMENT;
    }
  });

  it(`should create the queue config from host URL ${mockQueueUrls[0]}`, () => {
    expect(generateQueueConfig(mockQueueUrls[0])).toEqual(hosts[0]);
  });

  it(`should set port to config value when NHS_ENVIRONMENT is not set`, () => {
    expect(generateQueueConfig(mockQueueUrls[0])).toEqual(
      expect.objectContaining({
        port: hosts[0].port
      })
    );
  });

  it(`should create the queue config from URL ${mockQueueUrls[1]}`, () => {
    expect(generateQueueConfig(mockQueueUrls[1])).toEqual(hosts[1]);
  });

  it('should throw an Error if the url is not of the format protocol://host:port', () => {
    expect(() => generateQueueConfig('protocol://host')).toThrowError(
      'Queue url protocol://host should have the format protocol://host:port'
    );
  });
});
