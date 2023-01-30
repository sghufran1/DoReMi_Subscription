"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriptions = void 0;
const storage_1 = require("../storage/storage");
function Subscriptions(name, type, plan, startDate) {
    this.name = name;
    this.Subscription_Type = type;
    this.Subscription_Plan = plan;
    this.Start_Date = startDate;
}
exports.Subscriptions = Subscriptions;
Subscriptions.prototype.getClass = function () {
    return Subscriptions;
};
Subscriptions.prototype.save = function () {
    storage_1.Subscribed_services.saveSubscription(this);
};
