"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enumerations_1 = require("../../enumerations");
const podcast_free_1 = __importDefault(require("./podcast-free"));
const podcast_personal_1 = __importDefault(require("./podcast-personal"));
const podcast_premium_1 = __importDefault(require("./podcast-premium"));
class PodcastSubscriptionPlanSelector {
    static selectSubscriptionPlan(subscriptionPlan, renewalDate, renewalAmount) {
        switch (subscriptionPlan) {
            case enumerations_1.SubscriptionPlan.FREE:
                return new podcast_free_1.default(renewalDate, renewalAmount);
            case enumerations_1.SubscriptionPlan.PERSONAL:
                return new podcast_personal_1.default(renewalDate, renewalAmount);
            case enumerations_1.SubscriptionPlan.PREMIUM:
                return new podcast_premium_1.default(renewalDate, renewalAmount);
        }
    }
}
exports.default = PodcastSubscriptionPlanSelector;
