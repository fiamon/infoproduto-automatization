export interface GetAuthorizationCodeResponse {
    access_token: string;
    token_type: string;
    expires_in: 21600;
    scope: 'offline_access read write';
    user_id: string;
    refresh_token: string;
}

export interface MercadoLivreNotification {
    _id: string;
    resource: string;
    user_id: number;
    topic: string;
    application_id: number;
    attempts: number;
    sent: string;
    received: string;
}

export interface Order {
    id: number;
    date_created: string;
    date_closed: string;
    last_updated: string;
    manufacturing_ending_date: null | string;
    comment: null | string;
    pack_id: number;
    pickup_id: null | number;
    order_request: {
        return: null | object;
        change: null | object;
    };
    fulfilled: null | boolean;
    mediations: unknown[];
    total_amount: number;
    paid_amount: number;
    coupon: {
        id: null | number;
        amount: number;
    };
    expiration_date: string;
    order_items: OrderItem[];
    currency_id: string;
    payments: Payment[];
    shipping: {
        id: number;
    };
    status: string;
    status_detail: null | string;
    tags: string[];
    feedback: {
        buyer: null | object;
        seller: null | object;
    };
    context: {
        channel: string;
        site: string;
        flows: unknown[];
    };
    buyer: {
        id: number;
        nickname: string;
        first_name: string;
        last_name: string;
    };
    seller: {
        id: number;
    };
    taxes: {
        amount: null | number;
        currency_id: null | string;
        id: null | number;
    };
}
