function _getUrl(url, params) {
    url = url + "?timestamp=" + new Date().getTime();
    for(let p in params) {
        if(params[p] != null) {
            url = url + "&" + encodeURIComponent(p) + "=" + encodeURIComponent(params[p]);
        }
    }
    return url;
}

function getCompanyExportUrl(params) {
    let url = "/api/companies/export";
    return _getUrl(url, params);
}

function getCompanyContractExportUrl(params) {
    let url = "/api/companies/contracts/export";
    return _getUrl(url, params);
}

function getCompanyAdditionExportUrl(params) {
    let url = "/api/companies/additions/export";
    return _getUrl(url, params);
}

function getServiceOrderExportUrl(params) {
    let url = "/api/orders/service/export";
    return _getUrl(url, params);
}

function getMallOrderExportUrl(params) {
    let url = "/api/orders/mall/export";
    return _getUrl(url, params);
}

export default function (name) {
    switch(name) {
        // enums
        case "enums.api.role":
            return "/api/enums/roles";
        case "enums.api.taxiType":
            return "/api/enums/taxi_types";
        case "enums.api.orderStatus":
            return "/api/enums/order_status";
        case "enums.api.refundReason":
            return "/api/enums/refund_reason";
        case "enums.api.suppliersAndChannels":
            return "/api/enums/suppliersAndChannels";
        case "enums.api.permissionGroup":
            return "/api/enums/permissionGroups";
        case "enums.api.airLineCode":
            return "/api/enums/air/airLineCodes";
        case "enums.api.hotelCity":
            return "/api/enums/hotels/cities";
        case "enums.api.hotelBrand":
            return "/api/enums/hotels/brands/" + arguments[1];
        case "enums.api.hotelVendor":
            return "/api/enums/hotels/vendors";
        case "enums.api.accountManager":
            return "/api/enums/companies/accountManagers";
        case "enums.api.purchaseType":
            return "/api/enums/pricerule/purchase/type";
        case "enums.api.couponState":
            return "/api/enums/companies/coupons/state";
        case "enums.api.businessType":
            return "/api/enums/coupon/businessType";
        case "enums.api.specificationType":
            return "/api/enums/coupon/specificationType";
        //company
        case "company.add":
            return "/companies/add";
        case "company.list":
            return "/companies";
        case "company.update":
            return "/companies/" + arguments[1] + "/update";
        case "company.modifyAccount":
            return "/companies/" + arguments[1] + "/accounts/update";
        case "company.repay":
            return "/companies/" + arguments[1] + "/repay";
        case "company.api.add":
            return "/api/companies";
        case "company.api.update":
            return "/api/companies/" + arguments[1];
        case "company.api.detail":
            return "/api/companies/" + arguments[1];
        case "company.api.remove":
            return "/api/companies/" + arguments[1];
        case "company.api.list":
            return "/api/companies";
        case "company.api.repay":
            return "/api/companies/" + arguments[1] + "/repay";
        case "company.api.detailMore":
            return "/api/companies/" + arguments[1] + "/detailMore";
        case "company.api.modifyAccount":
            return "/api/companies/accounts";
        case "company.api.export":
            return getCompanyExportUrl(arguments[1]);
        // companyContract
        case "companyContract.list":
            return "/companies/contracts";
        case "companyContract.add":
            return "/companies/contracts/add";
        case "companyContract.update":
            return "/companies/contracts/" + arguments[1];
        case "companyContract.api.list":
            return "/api/companies/contracts";
        case "companyContract.api.listByCompany":
            return "/api/companies/" + arguments[1] + "/contracts";
        case "companyContract.api.add":
            return "/api/companies/contracts";
        case "companyContract.api.detail":
            return "/api/companies/contracts/" + arguments[1];
        case "companyContract.api.update":
            return "/api/companies/contracts/" + arguments[1];
        case "companyContract.api.export":
            return getCompanyContractExportUrl(arguments[1]);
        // companyContact
        case "companyContact.list":
            return "/companies/contacts";
        case "companyContact.add":
            return "/companies/contacts/add";
        case "companyContact.update":
            return "/companies/contacts/" + arguments[1];
        case "companyContact.api.list":
            return "/api/companies/contacts";
        case "companyContact.api.detail":
            return "/api/companies/contacts/" + arguments[1];
        case "companyContact.api.update":
            return "/api/companies/contacts/" + arguments[1];
        case "companyContact.api.add":
            return "/api/companies/contacts";
        case "companyContact.api.remove":
            return "/api/companies/contacts/" + arguments[1];
        // companyAddition
        case "companyAddition.list":
            return "/companies/additions";
        case "companyAddition.add":
            return "/companies/additions/add";
        case "companyAddition.update":
            return "/companies/additions/" + arguments[1];
        case "companyAddition.api.list":
            return "/api/companies/additions";
        case "companyAddition.api.detail":
            return "/api/companies/additions/" + arguments[1];
        case "companyAddition.api.update":
            return "/api/companies/additions/" + arguments[1];
        case "companyAddition.api.add":
            return "/api/companies/additions";
        case "companyAddition.api.remove":
            return "/api/companies/additions/" + arguments[1];
        case "companyAddition.api.export":
            return getCompanyAdditionExportUrl(arguments[1]);
        //employee
        case "employee.list":
            return "/employees";
        case "employee.add":
            return "/employees/add";
        case "employee.update":
            return "/employees/" + arguments[1] + "/update";
        case "employee.setRule":
            return "/companies/" + arguments[1] + "/employees/rules/" + encodeURIComponent(arguments[2].join(","));
        case "employee.api.downloadTemplate":
            return "/api/employees/template";
        case "employee.api.uploadByCompany":
            return "/api/companies/" + arguments[1] + "/employees/file";
        case "employee.api.add":
            return "/api/employees";
        case "employee.api.update":
            return "/api/employees/" + arguments[1];
        case "employee.api.detail":
            return "/api/employees/" + arguments[1];
        case "employee.api.remove":
            return "/api/employees/" + arguments[1];
        case "employee.api.listByCompany":
            return "/api/companies/" + arguments[1] + "/employees";
        case "employee.api.list":
            return "/api/employees";
        case "employee.api.setRule":
            return "/api/employees/rules";
        case "employee.api.getRule":
            return "/api/employees/" + arguments[1] + "/rules";
        case "employee.api.resetPassword":
            return "/api/employees/" + arguments[1] + "/resetPassword";
        // department
        case "department.list":
            return "/departments";
        case "department.add":
            return "/departments/add";
        case "department.update":
            return "/departments/" + arguments[1] + "/update";
        case "department.updateByCompany":
            return "/companies/" + arguments[1] + "/departments/" + arguments[2] + "/update";
        case "department.api.add":
            return "/api/departments";
        case "department.api.addByCompany":
            return "/api/companies/" + arguments[1] + "/departments";
        case "department.api.update":
            return "/api/departments/" + arguments[1];
        case "department.api.updateByCompany":
            return "/api/companies/" + arguments[1] + "/departments/" + arguments[2];
        case "department.api.detail":
            return "/api/departments/" + arguments[1];
        case "department.api.detailByCompany":
            return "/api/companies/" + arguments[1] + "/departments/" + arguments[2];
        case "department.api.remove":
            return "/api/departments/" + arguments[1];
        case "department.api.removeByCompany":
            return "/api/companies/" + arguments[1] + "/departments/" + arguments[2];
        case "department.api.list":
            return "/api/departments";
        case "department.api.listByCompany":
            return "/api/companies/" + arguments[1] + "/departments";
        // taxiRule
        case "taxiRule.list":
            return "/taxi/rules";
        case "taxiRule.add":
            return "/taxi/rules/add";
        case "taxiRule.update":
            return "/taxi/rules/" + arguments[1] + "/update";
        case "taxiRule.api.add":
            return "/api/taxi/rules";
        case "taxiRule.api.update":
            return "/api/taxi/rules/" + arguments[1];
        case "taxiRule.api.detail":
            return "/api/taxi/rules/" + arguments[1];
        case "taxiRule.api.remove":
            return "/api/taxi/rules/" + arguments[1];
        case "taxiRule.api.list":
            return "/api/taxi/rules";
        case "taxiRule.api.listByCompany":
            return "/api/taxi/companies/" + arguments[1] + "/rules";
        case "taxiRule.api.listByDepartment":
            return "/api/taxi/departments/" + arguments[1] + "/rules";
        // taxiLocation
        case "taxiLocation.add":
            return "/taxi/locations/add";
        case "taxiLocation.list":
            return "/taxi/locations";
        case "taxiLocation.update":
            return "/taxi/locations/" + arguments[1] + "/update";
        case "taxiLocation.api.add":
            return "/api/taxi/locations";
        case "taxiLocation.api.list":
            return "/api/taxi/locations";
        case "taxiLocation.api.update":
            return "/api/taxi/locations/" + arguments[1];
        case "taxiLocation.api.detail":
            return "/api/taxi/locations/" + arguments[1];
        case "taxiLocation.api.remove":
            return "/api/taxi/locations/" + arguments[1];
        // travelRule
        case "travelRule.list":
            return "/travel/rules";
        case "travelRule.add":
            return "/travel/rules/add";
        case "travelRule.update":
            return "/travel/rules/" + arguments[1] + "/update";
        case "travelRule.api.add":
            return "/api/travel/rules";
        case "travelRule.api.detail":
            return "/api/travel/rules/" + arguments[1];
        case "travelRule.api.update":
            return "/api/travel/rules/" + arguments[1];
        case "travelRule.api.remove":
            return "/api/travel/rules/" + arguments[1];
        case "travelRule.api.list":
            return "/api/travel/rules";
        case "travelRule.api.listRelatedUser":
            return "/api/travel/rules/employees/" + arguments[1];
        // user
        case "user.list":
            return "/users";
        case "user.add":
            return "/users/add";
        case "user.update":
            return "/users/" + arguments[1] + "/update";
        case "user.setRole":
            return "/users/" + arguments[1] + "/role";
        case "user.api.list":
            return "/api/users/query";
        case "user.api.add":
            return "/api/users";
        case "user.api.update":
            return "/api/users/" + arguments[1];
        case "user.api.remove":
            return "/api/users/" + arguments[1];
        case "user.api.getRole":
            return "/api/users/role/" + arguments[1];
        case "user.api.setRole":
            return "/api/users/role/" + arguments[1];
        case "user.api.reset":
            return "/api/users/reset/" + arguments[1];
        // Role
        case "role.list":
            return "/roles";
        case "role.add":
            return "/roles/add";
        case "role.update":
            return "/roles/" + arguments[1] + "/update";
        case "role.api.add":
            return "/api/role/add";
        case "role.api.list":
            return "/api/role/list";
        case "role.api.detail":
            return "/api/role/" + arguments[1];
        case "role.api.update":
            return "/api/role/update/" + arguments[1];
        case "role.api.remove":
            return "/api/role/" + arguments[1];
        // companyBD
        case "companyBD.list":
            return "/bds";
        case "companyBD.add":
            return "/bds/add";
        case "companyBD.update":
            return "/bds/" + arguments[1];
        case "companyBD.api.list":
            return "/api/companies/bds";
        case "companyBD.api.detail":
            return "/api/companies/bds/" + arguments[1];
        case "companyBD.api.update":
            return "/api/companies/bds/" + arguments[1];
        case "companyBD.api.add":
            return "/api/companies/bds";
        case "companyBD.api.remove":
            return "/api/companies/bds/" + arguments[1];
        // bill
        case "settledBill.list":
            return "/settledBill";
        case "settledBill.detail":
            return "/settledBill/detail/" + arguments[1] + "/" + arguments[2];
        case "settledBill.repay":
            return "/settledBill/repay/" + arguments[1];
        case "unsettledBill.list":
            return "/unsettledBill";
        case "unsettledBill.detail":
            return "/unsettledBill/detail/" + arguments[1] + "/" + arguments[2];
        case "unsettledBill.repay":
            return "/unsettledBill/repay/" + arguments[1];
        case "bill.api.list":
            return "/api/bill";
        case "bill.api.getRepayInfo":
            return "/api/bill/repayment/" + arguments[1];
        case "bill.api.setRepayInfo":
            return "/api/bill/repayment";
        case "bill.api.flightList":
            return "/api/bill/flight";
        case "bill.api.hotelList":
            return "/api/bill/hotel";
        case "bill.api.taxiList":
            return "/api/bill/taxi";
        case "bill.api.trainList":
            return "/api/bill/train";
        // flightPrice
        case "flightPrice.list":
            return "/commodity/flights";
        case "flightPrice.add":
            return "/commodity/flights/add";
        case "flightPrice.update":
            return "/commodity/flights/" + arguments[1];
        case "flightPrice.api.list":
            return "/api/commodity/flights";
        case "flightPrice.api.add":
            return "/api/commodity/flights";
        case "flightPrice.api.update":
            return "/api/commodity/flights/" + arguments[1];
        case "flightPrice.api.detail":
            return "/api/commodity/flights/" + arguments[1];
        case "flightPrice.api.setState":
            return "/api/commodity/flights/setState";
        // hotelPrice
        case "hotelPrice.list":
            return "/commodity/hotels";
        case "hotelPrice.add":
            return "/commodity/hotels/add";
        case "hotelPrice.api.list":
            return "/api/commodity/hotels";
        case "hotelPrice.api.setState":
            return "/api/commodity/hotels/setState";
        case "hotelPriceBrand.update":
            return "/commodity/hotels/brand/" + arguments[1];
        case "hotelPriceBrand.api.add":
            return "/api/commodity/hotels/brand";
        case "hotelPriceBrand.api.remove":
            return "/api/commodity/hotels/brand/" + arguments[1];
        case "hotelPriceBrand.api.update":
            return "/api/commodity/hotels/brand/" + arguments[1];
        case "hotelPriceBrand.api.detail":
            return "/api/commodity/hotels/brand/" + arguments[1];
        case "hotelPriceCity.update":
            return "/commodity/hotels/city/" + arguments[1];
        case "hotelPriceCity.api.add":
            return "/api/commodity/hotels/city";
        case "hotelPriceCity.api.remove":
            return "/api/commodity/hotels/city/" + arguments[1];
        case "hotelPriceCity.api.update":
            return "/api/commodity/hotels/city/" + arguments[1];
        case "hotelPriceCity.api.detail":
            return "/api/commodity/hotels/city/" + arguments[1];
        case "hotelPriceVendor.update":
            return "/commodity/hotels/vendor/" + arguments[1];
        case "hotelPriceVendor.api.add":
            return "/api/commodity/hotels/vendor";
        case "hotelPriceVendor.api.remove":
            return "/api/commodity/hotels/vendor/" + arguments[1];
        case "hotelPriceVendor.api.update":
            return "/api/commodity/hotels/vendor/" + arguments[1];
        case "hotelPriceVendor.api.detail":
            return "/api/commodity/hotels/vendor/" + arguments[1];
        //mallPrice
        case "mallPrice.list":
            return "/commodity/malls";
        case "mallPrice.add":
            return "/commodity/malls/add";
        case "mallPrice.update":
            return "/commodity/malls/" + arguments[1];
        case "mallPrice.api.detail":
            return "/api/commodity/malls/" + arguments[1];
        case "mallPrice.api.add":
            return "/api/commodity/malls";
        case "mallPrice.api.remove":
            return "/api/commodity/malls/" + arguments[1];
        case "mallPrice.api.update":
            return "/api/commodity/malls/" + arguments[1];
        case "mallPrice.api.list":
            return "/api/commodity/malls";
        case "mallPrice.api.setState":
            return "/api/commodity/malls/state";
        case "mallPrice.api.sku":
            return "/api/pricerule/purchase/sku/" + arguments[1];
        case "mallPrice.api.describe":
            return "/api/pricerule/purchase/category/" + arguments[1];
        //mallOrder
        case "mallOrder.list":
            return "/orders/mall";
        case "mallOrder.detail":
            return "/orders/mall/" + arguments[1];
        case "mallOrder.api.list":
            return "/api/orders/mall";
        case "mallOrder.api.detail":
            return "/api/orders/mall/" + arguments[1];
        case "mallOrder.api.export":
            return getMallOrderExportUrl(arguments[1]);
        //trainOrder
        case "trainOrder.list":
            return "/orders/trains";
        case "trainOrder.add":
            return "/orders/trains/add";
        case "trainOrder.detail":
            return "/orders/trains/tickets/" + arguments[1];
        case "trainOrder.api.list":
            return "/api/orders/trains";
        case "trainOrder.api.detail":
            return "/api/orders/trains/tickets/" + arguments[1];
        case "trainOrder.api.add":
            return "/api/orders/trains/add";
        case "trainOrder.api.regRefund":
            return "/api/orders/trains/regRefund";
        case "trainOrder.api.refundSuccess":
            return "/api/orders/trains/refundSuccess";
        case "trainOrder.api.refundFail":
            return "/api/orders/trains/refundFail";
        case "trainOrder.api.change":
            return "/api/orders/trains/endorse";
        case "trainOrder.api.changeSuccess":
            return "/api/orders/trains/endorseSuccess";
        case "trainOrder.api.changeFail":
            return "/api/orders/trains/endorseFail";
        //taxiOrder
        case "taxiOrder.list":
            return "/orders/taxies";
        case "taxiOrder.api.list":
            return "/api/orders/taxies";
        //hotelOrder
        case "hotelOrder.list":
            return "/orders/hotels";
        case "hotelOrder.detail":
            return "/orders/hotels/" + arguments[1];
        case "hotelOrder.add":
            return "/orders/hotels/add";
        case "hotelOrder.api.list":
            return "/api/orders/hotels";
        case "hotelOrder.api.detail":
            return "/api/orders/hotels/" + arguments[1];
        case "hotelOrder.api.refundResult":
            return "/api/orders/hotels/refundResult";
        case "hotelOrder.api.regRefund":
            return "/api/orders/hotels/regRefund";
        case "hotelOrder.api.add":
            return "/api/orders/hotels/add";
        // flightOrder
        case "flightOrder.list":
            return "/orders/flights";
        case "flightOrder.add":
            return "/orders/flights/add";
        case "flightOrder.detail":
            return "/orders/flights/tickets/" + arguments[1];
        case "flightOrder.api.list":
            return "/api/orders/flights";
        case "flightOrder.api.detail":
            return "/api/orders/flights/tickets/" + arguments[1];
        case "flightOrder.api.add":
            return "/api/orders/flights/add";
        case "flightOrder.api.airportList":
            return "/api/orders/flights/cityList";
        case "flightOrder.api.listContactsByEmployee":
            return "/api/orders/flights/employees/" + arguments[1] + "/contacts";
        case "flightOrder.api.listEmployeeByCompany":
            return "/api/companies/" + arguments[1] + "/employees";
        case "flightOrder.api.regRefund":
            return "/api/orders/flights/regRefund";
        case "flightOrder.api.changeFail":
            return "/api/orders/flights/changeFail";
        case "flightOrder.api.change":
            return "/api/orders/flights/change";
        case "flightOrder.api.changeSuccess":
            return "/api/orders/flights/changeSuccess";
        case "flightOrder.api.refundSuccess":
            return "/api/orders/flights/refundSuccess";
        case "flightOrder.api.addContactByEmployee":
            return "/api/orders/flights/employees/" + arguments[1] + "/contacts";
        //企业优惠券
        case "companyCoupon.detail":
            return "/companies/coupons/detail/" + arguments[1] + "/" + arguments[2];
        case "companyCoupon.api.list":
            return "/api/companies/coupons";
        case "companyCoupon.api.detail":
            return "/api/companies/coupons/" + arguments[1] + "/" + arguments[2];
        case "companyCoupon.api.disable":
            return "/api/companies/coupons/disable/" + arguments[1] + "/" + arguments[2];
        case "companyCoupon.api.enable":
            return "/api/companies/coupons/enable/" + arguments[1] + "/" + arguments[2];
        //优惠券管理
        case "coupon.distribution":
            return "/coupon/distribution/" + arguments[1];
        case "coupon.add":
            return "/coupon/add";
        case "coupon.list":
            return "/coupon";
        case "coupon.update":
            return "/coupon/" + arguments[1] + "/update";
        case "coupon.api.list":
            return "/api/coupon";
        case "coupon.api.add":
            return "/api/coupons";
        case "coupon.api.detail":
            return "/api/coupons/" + arguments[1];
        case "coupon.api.update":
            return "/api/coupons/" + arguments[1];
        case "coupon.api.usespecificationdescs":
            return "/api/coupons/data/usespecificationdescs";
        case "coupon.api.disable":
            return "/api/coupon/disable/" + arguments[1];
        case "coupon.api.enable":
            return "/api/coupon/enable/" + arguments[1];
        case "coupon.api.distribute":
            return "/api/coupon/distribute/" + arguments[1];
        case "coupon.api.distributeList":
            return "/api/coupon/distribute/" + arguments[1];
        //采购售后服务单
        case "serviceOrder.list":
            return "/orders/service";
        case "serviceOrder.detail":
            return "/orders/service/" + arguments[1];
        case "serviceOrder.api.list":
            return "/api/orders/service";
        case "serviceOrder.api.detail":
            return "/api/orders/service/" + arguments[1];
        case "serviceOrder.api.export":
            return getServiceOrderExportUrl(arguments[1]);
        default:
            return null;
    }
}