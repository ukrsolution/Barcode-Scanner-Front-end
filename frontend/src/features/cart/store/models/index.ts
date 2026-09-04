export interface CartDetailsProps {
    cart_total: string;
    cart_total_c: string;
    cart_subtotal: string;
    cart_subtotal_c: string;
    total_tax: string;
    total_tax_c: string;
    shipping: string;
    shipping_c: string;
    shipping_tax: string;
    timestamp?: number;
}

export interface CartItemProps {
    ID: number;
    post_parent: number;
    post_type: string;
    product_type: string;
    variation_id: number;
    quantity: number;
    previousQuantity: number;
    attributes: any;
    updatedAction: string;
    cartKey: string;
}