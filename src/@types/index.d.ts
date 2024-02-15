export interface GetAuthorizationCodeResponse {
    access_token: string;
    token_type: string;
    expires_in: 21600;
    scope: 'offline_access read write';
    user_id: string;
    refresh_token: string;
}

export interface MercadoLivreNotification {
    body: {
        _id: string;
        resource: string;
        user_id: number;
        topic: string;
        application_id: number;
        attempts: number;
        sent: string;
        received: string;
    };
}

export interface Order {
    id: number;
    date_created: string;
    date_closed: string;
    last_updated: string;
    manufacturing_ending_date: any;
    comment: any;
    pack_id: number;
    pickup_id: any;
    order_request: OrderRequest;
    fulfilled: any;
    mediations: any[];
    total_amount: number;
    paid_amount: number;
    coupon: Coupon;
    expiration_date: string;
    order_items: OrderItem[];
    currency_id: string;
    payments: Payment[];
    shipping: Shipping;
    status: string;
    status_detail: any;
    tags: string[];
    feedback: Feedback;
    context: Context;
    buyer: Buyer;
    seller: Seller;
    taxes: Taxes;
}

export interface OrderRequest {
    return: any;
    change: any;
}

export interface Coupon {
    id: any;
    amount: number;
}

export interface OrderItem {
    item: Item;
    quantity: number;
    requested_quantity: RequestedQuantity;
    picked_quantity: any;
    unit_price: number;
    full_unit_price: number;
    currency_id: string;
    manufacturing_days: any;
    sale_fee: number;
    listing_type_id: string;
}

export interface Item {
    id: string;
    title: string;
    category_id: string;
    variation_id: number;
    seller_custom_field: any;
    variation_attributes: VariationAttribute[];
    warranty: string;
    condition: string;
    seller_sku: any;
    global_price: any;
    net_weight: any;
}

export interface VariationAttribute {
    id: string;
    name: string;
    value_id: string;
    value_name: string;
}

export interface RequestedQuantity {
    value: number;
    measure: string;
}

export interface Payment {
    id: number;
    order_id: number;
    payer_id: number;
    collector: Collector;
    card_id: any;
    site_id: string;
    reason: string;
    payment_method_id: string;
    currency_id: string;
    installments: number;
    issuer_id: any;
    atm_transfer_reference: AtmTransferReference;
    coupon_id: any;
    activation_uri: any;
    operation_type: string;
    payment_type: string;
    available_actions: string[];
    status: string;
    status_code: any;
    status_detail: string;
    transaction_amount: number;
    transaction_amount_refunded: number;
    taxes_amount: number;
    shipping_cost: number;
    coupon_amount: number;
    overpaid_amount: number;
    total_paid_amount: number;
    installment_amount: any;
    deferred_period: any;
    date_approved: string;
    authorization_code: any;
    transaction_order_id: any;
    date_created: string;
    date_last_modified: string;
}

export interface Collector {
    id: number;
}

export interface AtmTransferReference {
    company_id: any;
    transaction_id: any;
}

export interface Shipping {
    id: number;
}

export interface Feedback {
    buyer: any;
    seller: any;
}

export interface Context {
    channel: string;
    site: string;
    flows: any[];
}

export interface Buyer {
    id: number;
    nickname: string;
    first_name: string;
    last_name: string;
}

export interface Seller {
    id: number;
}

export interface Taxes {
    amount: any;
    currency_id: any;
    id: any;
}

export interface RefreshToken {
    access_token: string;
    token_type: 'Bearer';
    expires_in: 21600;
    scope: 'offline_access read write';
    user_id: number;
    refresh_token: string;
}
