"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const video_1 = require("./video");
class SubscriptionPlanFree extends video_1.VideoSubscriptionPlan {
    constructor(renewalDate, renewalAmount) {
        super();
        this.renewalDate = renewalDate;
        this.renewalAmount = renewalAmount;
    }
    getRenewalInfo() {
        const video_renewalDate = this.renewalDate.add(1, 'months').subtract(10, 'days');
        this.renewalMessage = 'RENEWAL_REMINDER VIDEO ' + video_renewalDate.format('DD') + '-' + video_renewalDate.format('MM') + '-' + video_renewalDate.format('YYYY');
        return { renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount };
    }
}
exports.default = SubscriptionPlanFree;
