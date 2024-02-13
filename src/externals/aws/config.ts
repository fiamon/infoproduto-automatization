import * as AWS from 'aws-sdk';
import { env } from '../../env';

export function createS3Instance() {
    const s3 = new AWS.S3();
    s3.config.update({
        region: env.AWS_BUCKET_REGION,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: env.AWS_ACCESS_KEY,
        signatureVersion: 'v4',
    });

    return s3;
}
