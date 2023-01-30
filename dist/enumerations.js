"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopUpPlan = exports.SubscriptionPlan = exports.SubscriptionType = exports.CommandType = exports.ClassName = void 0;
var ClassName;
(function (ClassName) {
    ClassName["Subscriptions"] = "Subscriptions";
    ClassName["TopUps"] = "TopUps";
})(ClassName = exports.ClassName || (exports.ClassName = {}));
var CommandType;
(function (CommandType) {
    CommandType["START_SUBSCRIPTION"] = "START_SUBSCRIPTION";
    CommandType["ADD_SUBSCRIPTION"] = "ADD_SUBSCRIPTION";
    CommandType["ADD_TOPUP"] = "ADD_TOPUP";
    CommandType["PRINT_RENEWAL_DETAILS"] = "PRINT_RENEWAL_DETAILS";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
var SubscriptionType;
(function (SubscriptionType) {
    SubscriptionType["MUSIC"] = "MUSIC";
    SubscriptionType["VIDEO"] = "VIDEO";
    SubscriptionType["PODCAST"] = "PODCAST";
})(SubscriptionType = exports.SubscriptionType || (exports.SubscriptionType = {}));
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "FREE";
    SubscriptionPlan["PERSONAL"] = "PERSONAL";
    SubscriptionPlan["PREMIUM"] = "PREMIUM";
})(SubscriptionPlan = exports.SubscriptionPlan || (exports.SubscriptionPlan = {}));
var TopUpPlan;
(function (TopUpPlan) {
    TopUpPlan["FOUR_DEVICE"] = "FOUR_DEVICE";
    TopUpPlan["TEN_DEVICE"] = "TEN_DEVICE";
})(TopUpPlan = exports.TopUpPlan || (exports.TopUpPlan = {}));
