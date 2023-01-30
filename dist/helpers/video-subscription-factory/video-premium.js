"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const video_1 = require("./video");
class SubscriptionPlanPremium extends video_1.VideoSubscriptionPlan {
    constructor(renewalDate, renewalAmount) {
        super();
        this.renewalDate = renewalDate;
        this.renewalAmount = renewalAmount;
    }
    getRenewalInfo() {
        const video_renewalDate = this.renewalDate.add(3, 'months').subtract(10, 'days');
        this.renewalMessage = 'RENEWAL_REMINDER VIDEO ' + video_renewalDate.format('DD') + '-' + video_renewalDate.format('MM') + '-' + video_renewalDate.format('YYYY');
        this.renewalAmount += 500;
        return { renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount };
    }
}
exports.default = SubscriptionPlanPremium;
