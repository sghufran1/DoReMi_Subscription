"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionHelper = void 0;
const enumerations_1 = require("../enumerations");
const Subscriptions_1 = require("../classes/Subscriptions");
const TopUps_1 = require("../classes/TopUps");
const storage_1 = require("../storage/storage");
const lodash_1 = require("lodash");
const renewal_helper_1 = require("./renewal-helper");
let video_tracker = 0;
let music_tracker = 0;
let podcast_tracker = 0;
let topUp_tracker = 0;
exports.subscriptionHelper = {
    add_Subscription: (subscriptionType, subscriptionPlan, start_date) => {
        // condition to check if a requested Subscription Type already exists
        if ((subscriptionType === enumerations_1.SubscriptionType.VIDEO && video_tracker > 0) || (subscriptionType === enumerations_1.SubscriptionType.MUSIC && music_tracker > 0) || (subscriptionType === enumerations_1.SubscriptionType.PODCAST && podcast_tracker > 0)) {
            console.log("ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY");
        }
        else {
            if (subscriptionType === enumerations_1.SubscriptionType.VIDEO) {
                video_tracker++;
            }
            else if (subscriptionType === enumerations_1.SubscriptionType.MUSIC) {
                music_tracker++;
            }
            else if (subscriptionType === enumerations_1.SubscriptionType.PODCAST) {
                podcast_tracker++;
            }
            try {
                // Call subscription class constructor method to create new Subscription object and save in storage
                const newSubscription = new Subscriptions_1.Subscriptions('Subscriptions', subscriptionType, subscriptionPlan, start_date);
                newSubscription.save();
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    add_TopUp: (topUpPlan, numberOfMonths, start_date) => {
        // condition to check if a Subscription already exists and that no TopUps exist
        if (((video_tracker > 0) || (music_tracker > 0) || (podcast_tracker > 0)) && topUp_tracker === 0) {
            topUp_tracker++;
            try {
                // Call TopUp class constructor method to create new TopUp object and save in storage
                const newTopUp = new TopUps_1.TopUps('TopUps', topUpPlan, numberOfMonths, start_date);
                newTopUp.save();
            }
            catch (err) {
                console.log(err);
            }
        }
        else if (topUp_tracker > 0) {
            console.log("ADD_TOPUP_FAILED DUPLICATE_TOPUP");
        }
        else {
            console.log("ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND");
        }
    },
    print_renewal_details: () => {
        if ((video_tracker > 0) || (music_tracker > 0) || (podcast_tracker > 0)) {
            let subscriptions_renewal_Message = "", topUps_renewal_Amount = 0, subscriptions_renewal_Amount = 0, total_renewal_Amount = 0;
            // Get all subscriptions from storage
            const subscribed_services = storage_1.Subscribed_services.getData('Subscriptions');
            if ((0, lodash_1.isEmpty)(subscribed_services)) {
                console.log("SUBSCRIPTIONS_NOT_FOUND");
            }
            else {
                // Iterate through all Subscription objects in storage
                const response = storage_1.Subscribed_services.iterate('Subscriptions', renewal_helper_1.renewalHelper.subscriptions_renewal_Handler);
                subscriptions_renewal_Message = response.final_renewalMessage;
                subscriptions_renewal_Amount = response.final_renewalAmount;
                // Get all topUps from storage
                const subscribed_topUps = storage_1.Subscribed_services.getData('TopUps');
                if (!(0, lodash_1.isEmpty)(subscribed_topUps)) {
                    // Iterate through all TopUp objects in storage
                    const response = storage_1.Subscribed_services.iterate('TopUps', renewal_helper_1.renewalHelper.topUps_renewal_Handler);
                    topUps_renewal_Amount = response.final_renewalAmount;
                }
                else {
                    console.log("TOPUPS_NOT_FOUND");
                }
                total_renewal_Amount = subscriptions_renewal_Amount + topUps_renewal_Amount;
                // Log final renewal message and renewal amount
                console.log(subscriptions_renewal_Message + '\n' + 'RENEWAL_AMOUNT ' + total_renewal_Amount);
            }
        }
        else {
            console.log("SUBSCRIPTIONS_NOT_FOUND");
        }
    }
};
