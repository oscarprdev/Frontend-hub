import { REDIS_URL } from '../constants';
import { Redis } from 'ioredis';

export const redis = new Redis(REDIS_URL);
