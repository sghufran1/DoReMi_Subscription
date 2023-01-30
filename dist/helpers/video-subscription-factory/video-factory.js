"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enumerations_1 = require("../../enumerations");
const video_free_1 = __importDefault(require("./video-free"));
const video_personal_1 = __importDefault(require("./video-personal"));
const video_premium_1 = __importDefault(require("./video-premium"));
class VideoSubscriptionPlanSelector {
    static selectSubscriptionPlan(subscriptionPlan, renewalDate, renewalAmount) {
        switch (subscriptionPlan) {
            case enumerations_1.SubscriptionPlan.FREE:
                return new video_free_1.default(renewalDate, renewalAmount);
            case enumerations_1.SubscriptionPlan.PERSONAL:
                return new video_personal_1.default(renewalDate, renewalAmount);
            case enumerations_1.SubscriptionPlan.PREMIUM:
                return new video_premium_1.default(renewalDate, renewalAmount);
        }
    }
}
exports.default = VideoSubscriptionPlanSelector;
