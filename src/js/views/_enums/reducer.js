import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";

export default function(state = initialState, action = {}) {
    switch (action.type) {
        case "ENUMS_CHANGE_ROLE":
            return state.set("roleList", _p(action.data));
        case "ENUMS_CHANGE_TAXI_TYPE":
            return state.set("taxiTypeList", _p(action.data));
        case "ENUMS_CHANGE_ORDER_STATUS":
            return state.set("orderStatusList", _p(action.data));
        case "ENUMS_CHANGE_FLIGHT_ORDER_AIRPORT_LIST":
            return state.set("airportList", _p(action.data));
        case "ENUMS_CHANGE_REFUND_REASON":
            return state.set("refundReasonList", _p(action.data));
        case "ENUMS_CHANGE_SUPPLIERS_AND_CHANNELS":
            return state.set("suppliersAndChannels", _p(action.data));
        case "ENUMS_CHANGE_PERMISSION_GROUP":
            return state.set("permissionGroupList", _p(action.data));
        case "ENUMS_CHANGE_ID_TYPE":
            return state.set("idTypeList", _p(action.data));
        case "ENUMS_CHANGE_AIR_LINE_CODE":
            return state.set("airLineCodeList", _p(action.data));
        case "ENUMS_CHANGE_HOTEL_CITY":
            return state.set("hotelCities", _p(action.data));
        case "ENUMS_CHANGE_HOTEL_BRAND":
            return state.set("hotelBrands", _p(action.data));
        case "ENUMS_CHANGE_HOTEL_VENDOR":
            return state.set("hotelVendors", _p(action.data));
        case "ENUMS_CHANGE_ACCOUNT_MANAGER":
            return state.set("accountManagers", _p(action.data));
        case "ENUMS_CHANGE_PURCHASE_TYPE":
            return state.set("purchaseType", _p(action.data));
        case "ENUMS_CHANGE_COUPON_STATE":
            return state.set("couponState", _p(action.data));
        case "ENUMS_CHANGE_SPECIFICATION_TYPE":
            return state.set("specificationType", _p(action.data));
        case "ENUMS_CHANGE_BUSINESS_TYPE":
            return state.set("businessType", _p(action.data));
        default:
            return state;
    }
}