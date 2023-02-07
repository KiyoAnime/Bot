import { randomInt } from 'node:crypto';

export const genId = () => {
    return randomInt(1111111111, 9999999999);
};
