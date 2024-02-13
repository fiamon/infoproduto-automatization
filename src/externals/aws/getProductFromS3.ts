import { createS3Instance } from './config';
import { env } from '../../env';

export async function getProductFromS3(key: string) {
    const s3 = createS3Instance();

    const expiresInThreeHours = 10800;
    const params = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: key,
        Expires: expiresInThreeHours,
    };

    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
}

getProductFromS3('foto_gato.png');
