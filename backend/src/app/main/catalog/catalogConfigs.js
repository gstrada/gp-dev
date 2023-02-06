import {CategoriesConfig} from "./categories/CategoriesConfig";
import {PacksConfig} from "./packs/PacksConfig";
import {ProductsConfig} from "./products/ProductsConfig";
import {PackProductsConfig} from "./pack_products/PackProductsConfig";
import {ProductAddressesConfig} from "./product_addresses/ProductAddressesConfig";
import {ProductPicturesConfig} from "./product_pictures/ProductPicturesConfig";
import {DiscountsConfig} from "./discounts/DiscountsConfig";

export const catalogConfigs = [
    CategoriesConfig,
    DiscountsConfig,
    PacksConfig,
    ProductsConfig,
    ProductAddressesConfig,
    PackProductsConfig,
    ProductPicturesConfig,
];
