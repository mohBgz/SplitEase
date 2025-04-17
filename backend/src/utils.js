import crypto from 'crypto';

export const hashFile = (buffer) => {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}
  