"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const music_1 = require("./music");
class SubscriptionPlanPersonal extends music_1.MusicSubscriptionPlan {
    constructor(renewalDate, renewalAmount) {
        super();
        this.renewalDate = renewalDate;
        this.renewalAmount = renewalAmount;
    }
    getRenewalInfo() {
        const music_renewalDate = this.renewalDate.add(1, 'months').subtract(10, 'days');
        this.renewalMessage = 'RENEWAL_REMINDER MUSIC ' + music_renewalDate.format('DD') + '-' + music_renewalDate.format('MM') + '-' + music_renewalDate.format('YYYY');
        this.renewalAmount += 100;
        return { renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount };
    }
}
exports.default = SubscriptionPlanPersonal;
