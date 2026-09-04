export interface FilterProductsProps {
    ID: string;
    post_title: string;
    _sku: string;
    customStatus: string;
    custom: string;
    _variation_description: string;
    _alg_ean?: string;
    _wpm_gtin_code?: string;
    hwp_product_gtin?: string;
    _wepos_barcode?: string;
    _ts_gtin?: string;
    _ts_mpn?: string;
    usbs_barcode_field?: string;
}

export interface FilterOrdersProps {
    ID: string;
    customStatus: string;
    custom: string;
    wt_seq_ordnum?: string;
}

export interface FilterWpmlProps {
    [lang: string]: string;
}

export interface FilterProps {
    products: FilterProductsProps;
    orders: FilterOrdersProps;
    wpml: FilterWpmlProps;
}

export interface ResultMessage {
    message: string;
    type: string;
    query?: string;
    params?: {
        checkAgain?: boolean;
    }
}