"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicSubscriptionPlan = void 0;
class MusicSubscriptionPlan {
    constructor() {
        this.renewalAmount = 0;
        this.renewalMessage = "";
    }
    getRenewalInfo() {
        return { renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount };
    }
}
exports.MusicSubscriptionPlan = MusicSubscriptionPlan;
