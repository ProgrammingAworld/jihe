import Immutable from "immutable";

export default Immutable.fromJS({
    idTypeList: [],
    roleList: [],
    taxiTypeList: [],
    orderStatusList: {
        taxi: [],
        air: [],
        hotel: [],
        train: []
    },
    refundReasonList: [],
    suppliersAndChannels: {
        airSuppliers: [],
        hotelSuppliers: [],
        contactChannels: [],
        payChannels: []
    },
    permissionGroupList: [],
    airLineCodeList: [],
    hotelCities: [],
    hotelBrands: {

    },
    hotelVendors: [],
    accountManagers: [],
    purchaseType: [],
    couponState: [],
    specificationType: [],
    businessType: []
})