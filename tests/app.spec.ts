import { describe, expect, it } from 'vitest';
import request from 'supertest';

import app from '../src/app';
import { env } from '../src/env';

describe('Integration tests', () => {
    it('should return status 200 for the /health route', async () => {
        const req = await request(app).get('/health');
        expect(req.status).toEqual(200);
    });

    it('should return status 400, because actions is empty', async () => {
        const req = await request(app).post('/notification').set('Authorization', env.SECRET).send({
            _id: '1203000kad---asd2k1kk2',
            resource: '/orders/120300022',
            user_id: 12399922292,
            topic: 'orders_v2',
            application_id: 222030232,
            attempts: 3,
            sent: '203020s:0a020sll',
            received: 'asdkkoaosdk',
            actions: [],
        });

        expect(req.status).toEqual(400);
    });

    it('should return status 401, because dont have the authorization header', async () => {
        const req = await request(app)
            .post('/notification/handle')
            .send({
                _id: 'Iaisdjiasjdia--asdjaijs22-asdsji',
                resource: '/orders/2002000030',
                user_id: 123222321,
                topic: 'orders_v2',
                application_id: 129312929,
                attempts: 3,
                sent: '12asosakdk2o2o3',
                received: 'aosko20023d',
                actions: ['status'],
            });

        expect(req.status).toEqual(401);
    });

    it('should return status 400, because the body is wrong', async () => {
        const req = await request(app).post('/notification/handle').send({
            _id: 'Iaisdjiasjdia--asdjaijs22-asdsji',
            resource: '/orders/2002000030',
            user_id: 123222321,
            topic: 'orders_v2',
            application_id: 129312929,
            attempts: 3,
            sent: '12asosakdk2o2o3',
            received: 'aosko20023d',
            actions: [],
        });

        expect(req.status).toEqual(400);
    });
});
