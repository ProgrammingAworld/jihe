export default {
    Role: {
        FB_ADMIN: 1,
        COMPANY_ADMIN: 2,
        COMMON_USER: 3,
        GUEST_USER: 4,
        COMPANY_SUPER_ADMIN: 6,
        list: function () {
            return [{
                value: 1,
                label: "分贝管理员"
            }, {
                value: 6,
                label: "企业超级管理员"
            }, {
                value: 2,
                label: "企业管理员"
            }, {
                value: 3,
                label: "普通员工"
            }]
        }
    },
    EmployeeStatus: {
        ENABLE: 1,
        DISABLE: 2,
        SUSPEND: 3,
        list: function () {
            return [{
                value: 1,
                label: "启用"
            }, {
                value: 3,
                label: "暂停"
            }]
        }
    },
    UserStatus: {
        ENABLE: 0,
        DISABLE: 1,
        list: function () {
            return [{
                value: 0,
                label: "启用"
            }, {
                value: 1,
                label: "禁用"
            }]
        }
    },
    UserRoleManagement: {
        UserManagement: 100001,
        RoleManagement: 100002,
        UserAuthManagement: 100003,
        TabAuthManagement: 100004,
        list: function () {
            return [{
                value: 100001,
                label: '用户管理'
            }, {
                value: 100002,
                label: '角色管理'
            }, {
                value: 100003,
                label: '用户权限管理'
            }]
        }
    },
    OrderManagement: {
        list: function () {
            return [{
                value: 200001,
                label: '订单管理'
            }]
        }
    },
    CompanyManagement: {
        list: function () {
            return [{
                value: 100005,
                label: '企业管理'
            }, {
                value: 100006,
                label: '架构管理'
            }, {
                value: 100007,
                label: '用车管理'
            }]
        }
    },
    UserDepartmentList: {
        list: function () {
            return [{
                value: 1,
                label: '客服部'
            }, {
                value: 2,
                label: '财务部'
            }, {
                value: 3,
                label: '研发部'
            }, {
                value: 4,
                label: '风控部'
            }, {
                value: 5,
                label: '资金部'
            }, {
                value: 6,
                label: '人力资源部'
            }, {
                value: 7,
                label: '行政部'
            }, {
                value: 8,
                label: '销售部'
            }, {
                value: 9,
                label: '资本市场部'
            }, {
                value: 10,
                label: '产品运营部'
            }, {
                value: 11,
                label: '综合部'
            }]
        }
    },
    CompanyStatus: {
        ENABLE: 1,
        DISABLE: 2,
        DELAY: 3,
        PAUSE: 4,
        list: function () {
            return [{
                value: 1,
                label: "启用"
            }, {
                value: 2,
                label: "禁用"
            }, {
                value: 3,
                label: "逾期"
            }, {
                value: 4,
                label: "暂停"
            }]
        }
    },
    IdType: {
        ID: 1,
        PASSPORT: 2,
        list: function () {
            return [{
                value: 1,
                label: "身份证"
            }, {
                value: 2,
                label: "护照"
            }]
        }
    },
    AirRule: {
        DEFAULT_NAME: "不允许订机票",
        ORDER_FOR_NONE: 1,
        ORDER_FOR_SELF: 2,
        ORDER_FOR_EMPLOYEES: 3,
        ORDER_FOR_ANYONE: 4,
        list: function () {
            return [{
                value: 1,
                label: "不允许订机票"
            }, {
                value: 4,
                label: "允许订机票"
            }]
        },
        getDesc: function (value) {
            switch (value) {
                case 1:
                    return "选择该项，员工不可订票";
                case 4:
                    return "选择该项，员工拥有为自己和他人订票的权限";
                default:
                    return "";
            }
        }
    },
    HotelRule: {
        DEFAULT_NAME: "不允许订酒店",
        NOT_ALLOWED: 1,
        ALLOWED: 2,
        list: function () {
            return [{
                value: 1,
                label: "不允许订酒店"
            }, {
                value: 2,
                label: "允许订酒店"
            }]
        },
        getDesc: function (value) {
            switch (value) {
                case 1:
                    return "选择此项，员工将无法自主预订酒店";
                case 2:
                    return "选择此项，员工可自主预订酒店";
                default:
                    return "";
            }
        }
    },
    TrainRule: {
        DEFAULT_NAME: "不允许订火车票",
        ORDER_FOR_NONE: 1,
        ORDER_FOR_SELF: 2,
        ORDER_FOR_EMPLOYEES: 3,
        ORDER_FOR_ANYONE: 4,
        list: function () {
            return [{
                value: 1,
                label: "不允许订火车票"
            }, {
                value: 4,
                label: "允许订火车票"
            }]
        },
        getDesc: function (value) {
            switch (value) {
                case 1:
                    return "选择该项，员工不可订火车票";
                case 4:
                    return "选择该项，员工拥有为自己和他人订票的权限";
                default:
                    return "";
            }
        }
    },
    TaxiRuleEnum: {
        DEFAULT_NAME: "不允许用车",
        NOT_ALLOWED: 1,
        ALLOWED_BY_RULE: 3,
        list: function () {
            return [{
                label: "不允许用车",
                value: 1
            }, {
                label: "允许用车",
                value: 3
            }]
        },
        getDesc: function (value) {
            if (value == 3) {
                return "选择该项, 员工可以按照下方选定的用车规则用车"
            } else {
                return "选择该项, 员工不允许用车"
            }
        },
        listRule: function () {
            return [{
                label: "不限",
                value: false
            }, {
                label: "限制用车规则",
                value: true
            }]
        },
        getListRuleDesc: function (value) {
            if (value) {
                return "请选择具体用车规则, 如无合适的规则可点击新建规则"
            } else {
                return "选择该项, 员工不限制用车规则"
            }
        }
    },
    MallRule: {
        DEFAULT_NAME: "不允许采购",
        NOT_ALLOWED: 1,
        ALLOWED: 2,
        list: function () {
            return [{
                label: "不允许采购",
                value: 1
            }, {
                label: "允许采购",
                value: 2
            }]
        },
        getDesc: function (value) {
            switch (value) {
                case 1:
                    return "选择该项, 员工不可进行采购业务";
                case 2:
                    return "选择该项, 员工可以进行采购业务";
            }
        }
    },
    MallOrderStatus: {
        list: function () {
            return [{
                label: "待支付",
                value: 4102
            }, {
                label: "待收货",
                value: 4201
            }, {
                label: "已完成",
                value: 4202
            }, {
                label: "已拒收",
                value: 4203
            }, {
                label: "已关闭",
                value: 4700
            }, {
                label: "已取消",
                value: 4701
            }]
        }
    },
    TravelRule: {
        list: function () {
            return [{
                label: "不限",
                value: false
            }, {
                label: "限制差旅规则",
                value: true
            }]
        },
        getDesc: function (value) {
            if (value) {
                return "请选择具体差旅规则, 如无合适的规则可点击新建规则"
            } else {
                return "选择该项, 员工不限差旅规则"
            }
        }
    },
    ExpressRule: {
        DEFAULT_NAME: "不允许使用快递业务",
        NOT_ALLOWED: 1,
        ALLOWED: 2,
        list: function () {
            return [{
                label: "不允许使用快递业务",
                value: 1
            }, {
                label: "允许使用快递业务",
                value: 2
            }]
        },
        getDesc: function (value) {
            switch (value) {
                case 1:
                    return "选择该项, 员工不可进行快递业务";
                case 2:
                    return "选择该项, 员工可以进行快递业务";
            }
        }
    },
    HotelOrderStatus: {
        list: function () {
            return [
                {
                    value: 2100,
                    label: "订单创建中"
                }, {
                    value: 2101,
                    label: "订单创建失败"
                }, {
                    value: 2200,
                    label: "待支付"
                }, {
                    value: 2210,
                    label: "支付中"
                }, {
                    value: 2300,
                    label: "订单取消中"
                }, {
                    value: 2301,
                    label: "已取消"
                }, {
                    value: 2401,
                    label: "已支付"
                }, {
                    value: 2500,
                    label: "订房中"
                }, {
                    value: 2501,
                    label: "订房成功"
                }, {
                    value: 2502,
                    label: "订房失败"
                }, {
                    value: 2800,
                    label: "退订成功"
                }, {
                    value: 2801,
                    label: "退订中"
                }, {
                    value: 2802,
                    label: "退订失败"
                }

            ]
        }
    },
    Airline: {
        listNames: function () {
            return [
                "中国国航",
                "东方航空",
                "上海航空",
                "南方航空",
                "山东航空",
                "深圳航空",
                "四川航空",
                "厦门航空",
                "海航集团",
                "成都航空",
                "吉祥航空",
                "华夏航空",
                "奥凯航空",
                "河北航空",
                "中联航空",
                "首都航空",
                "幸福航空",
                "昆明航空",
                "西部航空",
                "西藏航空",
                "祥鹏航空",
                "天津航空",
                "长龙航空",
                "东海航空",
                "英安航空",
                "青岛航空",
                "瑞丽航空",
                "乌鲁木齐",
                "北部湾航空",
                "扬子江快运航空",
                "多彩贵州航空",
                "江西航空",
                "长安航空",
                "红土航空",
                "桂林航空",
                "春秋航空",
                "大新华航空",
                "鲲鹏航空",
                "重庆航空"]
        }
    },
    LatestArrivalTime: {
        list: function () {
            return [
                {
                    key: 1,
                    value: "12:00"
                },
                {
                    key: 2,
                    value: "13:00"
                },
                {
                    key: 3,
                    value: "14:00"
                },
                {
                    key: 4,
                    value: "15:00"
                },
                {
                    key: 5,
                    value: "16:00"
                },
                {
                    key: 6,
                    value: "17:00"
                },
                {
                    key: 7,
                    value: "18:00"
                },
                {
                    key: 8,
                    value: "19:00"
                },
                {
                    key: 9,
                    value: "20:00"
                },
                {
                    key: 10,
                    value: "21:00"
                },
                {
                    key: 11,
                    value: "22:00"
                },
                {
                    key: 12,
                    value: "23:00"
                }
            ]
        }
    },
    HotelLevel: {
        list: function () {
            return [
                {
                    label: "五星",
                    value: 5
                },
                {
                    label: "四星",
                    value: 4
                },
                {
                    label: "三星",
                    value: 3
                },
                {
                    label: "二星",
                    value: 2
                },
                {
                    label: "其他",
                    value: 1
                }
            ]
        }
    },
    FlightRefundReason: {
        list: function () {
            return [
                "［自愿退票］：自愿退票，按客规收取手续费",
                "［非自愿退票］：航班延误、取消及特殊退票"
            ]
        }
    },
    FlightChangeReason: {
        list: function () {
            return [
                "行程变动",
                "航班变动"
            ]
        }
    },
    HotelPayChannel: {
        PAY_BY_PRE_PAID: 1,
        PAY_BY_EN_ALI: 2,
        PAY_BY_PRESENT_CARD: 3,
        PAY_BY_NET_BANK: 4,
        list: function () {
            return [{
                key: 1,
                value: "系统预冲"
            }, {
                key: 2,
                value: "企业支付宝"
            }, {
                key: 3,
                value: "供应商礼品卡"
            }, {
                key: 4,
                value: "企业网银对公支付"
            }]
        }
    },
    TrainTicketStatus: {
        list: function () {
            return [{
                key: 3100,
                value: "待支付"
            }, {
                key: 3101,
                value: "已取消"
            }, {
                key: 3102,
                value: "已关闭"
            }, {
                key: 3201,
                value: "出票中"
            }, {
                key: 3202,
                value: "出票成功"
            }, {
                key: 3203,
                value: "出票失败"
            }, {
                key: 3700,
                value: "占座中"
            }, {
                key: 3701,
                value: "占座成功"
            }, {
                key: 3702,
                value: "占座失败"
            }, {
                key: 3703,
                value: "改签成功"
            }, {
                key: 3704,
                value: "改签失败"
            }, {
                key: 3705,
                value: "改签取消"
            }, {
                key: 3800,
                value: "退票中"
            }, {
                key: 3801,
                value: "退票成功"
            }, {
                key: 3802,
                value: "退票失败"
            }]
        }
    },
    TrainSeatType: {
        list: function () {
            return [
                {
                    label: "商务座",
                    value: "9"
                },
                {
                    label: "特等座",
                    value: "P"
                },
                {
                    label: "一等座",
                    value: "M"
                },
                {
                    label: "二等座",
                    value: "0"
                },
                {
                    label: "高级软卧",
                    value: "6"
                },
                {
                    label: "软卧",
                    value: "4"
                },
                {
                    label: "硬卧",
                    value: "3"
                },
                {
                    label: "软座",
                    value: "2"
                },
                {
                    label: "硬座",
                    value: "1"
                },
                {
                    label: "无座",
                    value: "-1"
                },
                {
                    label: "一等软座",
                    value: "7"
                },
                {
                    label: "二等软座",
                    value: "8"
                },
                {
                    label: "动卧",
                    value: "F"
                },
                {
                    label: "高级动卧",
                    value: "A"
                }
            ]
        }
    },
    TrainOrderStatus: {
        list: function () {
            return [
                {
                    label: "待支付",
                    value: 3100
                },
                {
                    label: "已取消",
                    value: 3101
                },
                {
                    label: "已关闭",
                    value: 3102
                },
                {
                    label: "出票中",
                    value: 3201
                },
                {
                    label: "出票成功",
                    value: 3202
                },
                {
                    label: "出票失败",
                    value: 3203
                },
                {
                    label: "有退改记录",
                    value: 3400
                },
                {
                    label: "退改进行中",
                    value: 3600
                },
                {
                    label: "改签成功",
                    value: 3703
                },
                {
                    label: "退票成功",
                    value: 3801
                }
            ]
        }
    },
    TrainVendorId: {
        list: function () {
            return [
                {
                    value: "觅优",
                    key: 104
                }, {
                    value: "空铁无忧",
                    key: 501
                }, {
                    value: "12306官网",
                    key: 502
                }
            ]
        }
    },
    TrainType: {
        list: function () {
            return [
                {value: "商务座", key: 1},
                {value: "特等座", key: 2},
                {value: "一等座", key: 3},
                {value: "二等座", key: 4},
                {value: "软卧", key: 5},
                {value: "高级软卧", key: 7},
                {value: "高级软卧", key: 11},
                {value: "软卧", key: 12},
                {value: "硬卧", key: 13},
                {value: "软座", key: 14},
                {value: "硬座", key: 15}
            ]
        }
    },
    FlightType: {
        list: function () {
            return [{
                value: "经济舱",
                key: 3
            }, {
                value: "商务/头等舱",
                key: 1
            }]
        }
    },
    Dimensions: {
        list: function () {
            return [
                {
                    label: "供应商维度",
                    value: 0
                },
                {
                    label: "城市维度",
                    value: 1
                },
                {
                    label: "品牌维度",
                    value: 2
                }
            ]
        }
    },
    HotelVendor: {
        list: function () {
            return [
                {
                    label: "51book",
                    value: 101
                },
                {
                    label: "天下房舱",
                    value: 123
                },
                {
                    label: "千淘",
                    value: 233
                }
            ]
        }
    },
    CompanyContractStatus: {
        list: function () {
            return [
                {
                    label: "未生效",
                    value: 0
                },
                {
                    label: "执行中",
                    value: 1
                },
                {
                    label: "已结束",
                    value: 2
                }
            ]
        }
    },
    CompanyContractPayDemands: {
        list: function () {
            return [
                {
                    label: "见账单付款",
                    value: 1
                },
                {
                    label: "见正本付款",
                    value: 2
                }
            ]
        }
    },
    CompanyContractInvoiceDemands: {
        list: function () {
            return [
                {
                    label: "大发票",
                    value: 1
                },
                {
                    label: "行程单+发票",
                    value: 2
                }
            ]
        }
    },
    BDType: {
        list: function () {
            return [
                {
                    label: "面销",
                    value: 1
                }, {
                    label: "电销",
                    value: 2
                }
            ]
        }
    },
    BDChannel: {
        list: function () {
            return [
                {
                    label: "兼职",
                    value: 1
                }, {
                    label: "内推",
                    value: 2
                }, {
                    label: "中心点",
                    value: 3
                }, {
                    label: "直销",
                    value: 4
                }
            ]
        }
    },
    CompanyType: {
        list: function () {
            return [
                {
                    label: "国企企事业",
                    value: 1
                },
                {
                    label: "上市公司",
                    value: 2
                },
                {
                    label: "外资企业",
                    value: 3
                },
                {
                    label: "合资企业",
                    value: 4
                },
                {
                    label: "股份制企业",
                    value: 5
                },
                {
                    label: "自然人法人独资",
                    value: 6
                },
                {
                    label: "个体户或无照经营",
                    value: 7
                },
                {
                    label: "其它",
                    value: 8
                }
            ]
        }
    },
    Bill: {
        BillPaybackStatus: {
            list: function() {
                return [{
                    label: "已还清",
                    value: 2
                }, {
                    label: "未还清",
                    value: 1
                }]
            }
        },
        BusinessType: {
            list: function() {
                return [{
                    label: "机票",
                    value: 1
                }, {
                    label: "酒店",
                    value: 2
                }, {
                    label: "用车",
                    value: 3
                }, {
                    label: "火车",
                    value: 4
                }]
            }
        },
        FlightStatus: {
            list: function() {
                return [{
                    label: "出票成功",
                    value: 1800
                }, {
                    label: "改签成功",
                    value: 1823
                }, {
                    label: "退票成功",
                    value: 1811
                }]
            }
        },
        HotelStatus: {
            list: function() {
                return [{
                    label: "订房成功",
                    value: 2501
                }, {
                    label: "退房成功",
                    value: 2800
                }]
            }
        },
        TaxiStatus: {
            list: function() {
                return [{
                    label: "已支付",
                    value: 700
                }, {
                    label: "已取消",
                    value: 211
                }]
            }
        },
        TrainStatus: {
            list: function() {
                return [{
                    label: "出票成功",
                    value: 3202
                }, {
                    label: "改签成功",
                    value: 3703
                }, {
                    label: "退票成功",
                    value: 3801
                }]
            }
        }
    },
    Coupon: {
        CouponDistributionStatus: {
            list: function() {
                return [{
                    label: "正常",
                    value: 1
                }, {
                    label: "禁用",
                    value: 2
                }, {
                    label: "逾期",
                    value: 3
                }]
            }
        }
    }
}