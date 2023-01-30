"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastSubscriptionPlan = void 0;
class PodcastSubscriptionPlan {
    constructor() {
        this.renewalAmount = 0;
        this.renewalMessage = "";
    }
    getRenewalInfo() {
        return { renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount };
    }
}
exports.PodcastSubscriptionPlan = PodcastSubscriptionPlan;
