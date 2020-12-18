import { initialiseSubscriber } from './services/queue/subscriber';

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const wait = async () => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await sleep(2000);
  }
};

initialiseSubscriber();
wait();
