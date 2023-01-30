"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enumerations_1 = require("../../enumerations");
const music_free_1 = __importDefault(require("./music-free"));
const music_personal_1 = __importDefault(require("./music-personal"));
const music_premium_1 = __importDefault(require("./music-premium"));
class MusicSubscriptionPlanSelector {
    static selectSubscriptionPlan(subscriptionPlan, renewalDate, renewalAmount) {
        switch (subscriptionPlan) {
            case enumerations_1.SubscriptionPlan.FREE:
                return new music_free_1.default(renewalDate, renewalAmount);
            case enumerations_1.SubscriptionPlan.PERSONAL:
                return new music_personal_1.default(renewalDate, renewalAmount);
            case enumerations_1.SubscriptionPlan.PREMIUM:
                return new music_premium_1.default(renewalDate, renewalAmount);
        }
    }
}
exports.default = MusicSubscriptionPlanSelector;
