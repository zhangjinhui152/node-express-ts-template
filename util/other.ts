import crypto from 'crypto';
export function computeHash(data:string) :string {
    const hash = crypto.createHash('md5');
    hash.update(data);
    return hash.digest('hex');
}