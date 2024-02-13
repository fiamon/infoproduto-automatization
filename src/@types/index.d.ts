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
    date_created: Date;
    date_closed: Date;
    last_updated: Date;
    manufacturing_ending_date: null;
    comment: null;
    pack_id: number;
    pickup_id: null;
    order_request: OrderRequest;
    fulfilled: null;
    mediations: any[];
    total_amount: number;
    paid_amount: number;
    coupon: Coupon;
    expiration_date: Date;
    order_items: OrderItem[];
}

export interface Coupon {
    id: null;
    amount: number;
}

export interface OrderItem {
    item: Item;
    quantity: number;
    requested_quantity: RequestedQuantity;
    picked_quantity: null;
    unit_price: number;
    full_unit_price: number;
    currency_id: string;
    manufacturing_days: null;
    sale_fee: number;
    listing_type_id: string;
}

export interface Item {
    id: string;
    title: string;
    category_id: string;
    variation_id: number;
    seller_custom_field: null;
    variation_attributes: VariationAttribute[];
    warranty: string;
    condition: string;
    seller_sku: null;
    global_price: null;
    net_weight: null;
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

export interface OrderRequest {
    return: null;
    change: null;
}

export interface RefreshToken {
    access_token: string;
    token_type: 'Bearer';
    expires_in: 21600;
    scope: 'offline_access read write';
    user_id: number;
    refresh_token: string;
}
