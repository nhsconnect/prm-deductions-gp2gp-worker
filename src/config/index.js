export const initializeConfig = () => ({
  queueName: process.env.GP2GP_WORKER_MHS_QUEUE_NAME,
  unhandledMessagesQueueName: 'unhandled-raw-inbound',
  queueUrls: [process.env.GP2GP_WORKER_MHS_QUEUE_URL_1, process.env.GP2GP_WORKER_MHS_QUEUE_URL_2],
  queueVirtualHost: process.env.GP2GP_WORKER_MHS_QUEUE_VIRTUAL_HOST,
  queueUsername: process.env.GP2GP_WORKER_MHS_QUEUE_USERNAME,
  queuePassword: process.env.GP2GP_WORKER_MHS_QUEUE_PASSWORD,
  ehrRepoUrl: process.env.GP2GP_WORKER_EHR_REPO_URL,
  ehrRepoAuthKeys: process.env.GP2GP_WORKER_AUTHORIZATION_KEYS_FOR_EHR_REPO,
  gpToRepoUrl: process.env.GP2GP_WORKER_GP_TO_REPO_URL,
  gpToRepoAuthKeys: process.env.GP2GP_WORKER_AUTHORIZATION_KEYS_FOR_GP_TO_REPO,
  repoToGpUrl: process.env.GP2GP_WORKER_REPO_TO_GP_URL,
  repoToGpAuthKeys: process.env.GP2GP_WORKER_AUTHORIZATION_KEYS_FOR_REPO_TO_GP,
  nodeEnv: process.env.NODE_ENV || 'local',
  nhsEnvironment: process.env.NHS_ENVIRONMENT || 'local',
  useNewEhrRepoApi: process.env.USE_NEW_EHR_REPO_API === 'true'
});
