import * as IORedis from 'ioredis';

const redis = new IORedis({
  keyPrefix: 'ts-web-diary',
});

export default redis;