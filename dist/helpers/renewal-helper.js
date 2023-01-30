"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewalHelper = void 0;
const enumerations_1 = require("../enumerations");
const music_factory_1 = __importDefault(require("./music-subscription-factory/music-factory"));
const video_factory_1 = __importDefault(require("./video-subscription-factory/video-factory"));
const podcast_factory_1 = __importDefault(require("./podcast-subscription-factory/podcast-factory"));
exports.renewalHelper = {
    subscriptions_renewal_Handler: (services) => {
        const renewalDate = services.Start_Date.clone();
        let renewalAmount = 0;
        if (services.Subscription_Type === enumerations_1.SubscriptionType.MUSIC) {
            switch (services.Subscription_Plan) {
                case enumerations_1.SubscriptionPlan.FREE: {
                    const MusicPlanSelector = music_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.FREE, renewalDate, renewalAmount);
                    return MusicPlanSelector.getRenewalInfo();
                }
                case enumerations_1.SubscriptionPlan.PERSONAL: {
                    const MusicPlanSelector = music_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.PERSONAL, renewalDate, renewalAmount);
                    return MusicPlanSelector.getRenewalInfo();
                }
                case enumerations_1.SubscriptionPlan.PREMIUM: {
                    const MusicPlanSelector = music_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.PREMIUM, renewalDate, renewalAmount);
                    return MusicPlanSelector.getRenewalInfo();
                }
            }
        }
        else if (services.Subscription_Type === enumerations_1.SubscriptionType.VIDEO) {
            switch (services.Subscription_Plan) {
                case enumerations_1.SubscriptionPlan.FREE: {
                    const VideoPlanSelector = video_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.FREE, renewalDate, renewalAmount);
                    return VideoPlanSelector.getRenewalInfo();
                }
                case enumerations_1.SubscriptionPlan.PERSONAL: {
                    const VideoPlanSelector = video_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.PERSONAL, renewalDate, renewalAmount);
                    return VideoPlanSelector.getRenewalInfo();
                }
                case enumerations_1.SubscriptionPlan.PREMIUM: {
                    const VideoPlanSelector = video_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.PREMIUM, renewalDate, renewalAmount);
                    return VideoPlanSelector.getRenewalInfo();
                }
            }
        }
        else if (services.Subscription_Type === enumerations_1.SubscriptionType.PODCAST) {
            switch (services.Subscription_Plan) {
                case enumerations_1.SubscriptionPlan.FREE: {
                    const PodcastPlanSelector = podcast_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.FREE, renewalDate, renewalAmount);
                    return PodcastPlanSelector.getRenewalInfo();
                }
                case enumerations_1.SubscriptionPlan.PERSONAL: {
                    const PodcastPlanSelector = podcast_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.PERSONAL, renewalDate, renewalAmount);
                    return PodcastPlanSelector.getRenewalInfo();
                }
                case enumerations_1.SubscriptionPlan.PREMIUM: {
                    const PodcastPlanSelector = podcast_factory_1.default.selectSubscriptionPlan(enumerations_1.SubscriptionPlan.PREMIUM, renewalDate, renewalAmount);
                    return PodcastPlanSelector.getRenewalInfo();
                }
            }
        }
    },
    topUps_renewal_Handler: (services) => {
        const renewalMessage = "";
        let renewalAmount = 0;
        if (services.TopUp_Plan === enumerations_1.TopUpPlan.FOUR_DEVICE) {
            renewalAmount = Number(services.Required_number_of_months) * 50;
            return { renewalMessage: renewalMessage, renewalAmount: renewalAmount };
        }
        else if (services.TopUp_Plan === enumerations_1.TopUpPlan.TEN_DEVICE) {
            renewalAmount = Number(services.Required_number_of_months) * 100;
            return { renewalMessage: renewalMessage, renewalAmount: renewalAmount };
        }
    }
};
