import { initializeConfig } from '../';

const originalEnv = process.env;

describe('config', () => {
  describe('NODE_ENV', () => {
    afterEach(() => {
      process.env.NODE_ENV = originalEnv.NODE_ENV;
    });

    it('should get NODE_ENV = local when environment variable not defined', () => {
      if (process.env.NODE_ENV) delete process.env.NODE_ENV;
      expect(initializeConfig().nodeEnv).toEqual('local');
    });
  });

  describe('wholesome config test', () => {
    afterEach(() => {
      process.env = originalEnv;
    });

    describe('wholesome config test', () => {
      afterEach(() => {
        process.env = originalEnv;
      });

      it('should map config with process.env values if set', () => {
        process.env.GP2GP_WORKER_MHS_QUEUE_NAME = 'queueName';
        process.env.GP2GP_WORKER_MHS_QUEUE_URL_1 = 'queueUrl1';
        process.env.GP2GP_WORKER_MHS_QUEUE_URL_2 = 'queueUrl2';
        process.env.GP2GP_WORKER_MHS_QUEUE_VIRTUAL_HOST = 'queueVirtualHost';
        process.env.GP2GP_WORKER_MHS_QUEUE_USERNAME = 'queueUsername';
        process.env.GP2GP_WORKER_MHS_QUEUE_PASSWORD = 'queuePassword';
        process.env.GP2GP_WORKER_EHR_REPO_URL = 'ehrRepoUrl';
        process.env.NODE_ENV = 'nodeEnv';
        process.env.SERVICE_URL = 'url';

        expect(initializeConfig()).toEqual(
          expect.objectContaining({
            queueName: 'queueName',
            queueUrls: ['queueUrl1', 'queueUrl2'],
            queueVirtualHost: 'queueVirtualHost',
            queueUsername: 'queueUsername',
            queuePassword: 'queuePassword',
            ehrRepoUrl: 'ehrRepoUrl',
            nodeEnv: 'nodeEnv'
          })
        );
      });
    });
  });
});
