"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoSubscriptionPlan = void 0;
class VideoSubscriptionPlan {
    constructor() {
        this.renewalAmount = 0;
        this.renewalMessage = "";
    }
    getRenewalInfo() {
        return { renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount };
    }
}
exports.VideoSubscriptionPlan = VideoSubscriptionPlan;
