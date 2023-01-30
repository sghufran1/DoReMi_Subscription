"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const podcast_1 = require("./podcast");
class SubscriptionPlanFree extends podcast_1.PodcastSubscriptionPlan {
    constructor(renewalDate, renewalAmount) {
        super();
        this.renewalDate = renewalDate;
        this.renewalAmount = renewalAmount;
    }
    getRenewalInfo() {
        const podcast_renewalDate = this.renewalDate.add(1, 'months').subtract(10, 'days');
        this.renewalMessage = 'RENEWAL_REMINDER PODCAST ' + podcast_renewalDate.format('DD') + '-' + podcast_renewalDate.format('MM') + '-' + podcast_renewalDate.format('YYYY');
        return { renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount };
    }
}
exports.default = SubscriptionPlanFree;
