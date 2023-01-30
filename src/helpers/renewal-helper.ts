import { SubscriptionType, SubscriptionPlan, TopUpPlan } from '../enumerations';
import { Subscription, TopUp } from '../models';
import MusicSubscriptionPlanSelector from './music-subscription-factory/music-factory';
import VideoSubscriptionPlanSelector from './video-subscription-factory/video-factory';
import PodcastSubscriptionPlanSelector from './podcast-subscription-factory/podcast-factory';


export const renewalHelper = {


 subscriptions_renewal_Handler: (services: Subscription): {renewalMessage: string, renewalAmount: number} => {
    
    const renewalDate = services.Start_Date.clone();
    let renewalAmount = 0;


    if(services.Subscription_Type===SubscriptionType.MUSIC){

        switch(services.Subscription_Plan){
            case SubscriptionPlan.FREE: {
                const MusicPlanSelector = MusicSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.FREE, renewalDate, renewalAmount);
                return MusicPlanSelector.getRenewalInfo();
            }

            case SubscriptionPlan.PERSONAL: {
                const MusicPlanSelector = MusicSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.PERSONAL, renewalDate, renewalAmount);
                return MusicPlanSelector.getRenewalInfo();
            }

            case SubscriptionPlan.PREMIUM: {
                const MusicPlanSelector = MusicSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.PREMIUM, renewalDate, renewalAmount);
                return MusicPlanSelector.getRenewalInfo();
            }
                
        }

    }
    else if(services.Subscription_Type===SubscriptionType.VIDEO){

        switch(services.Subscription_Plan){
            case SubscriptionPlan.FREE: {
                const VideoPlanSelector = VideoSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.FREE, renewalDate, renewalAmount);
                return VideoPlanSelector.getRenewalInfo();
            }

            case SubscriptionPlan.PERSONAL: {
                const VideoPlanSelector = VideoSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.PERSONAL, renewalDate, renewalAmount);
                return VideoPlanSelector.getRenewalInfo();
            }

            case SubscriptionPlan.PREMIUM: {
                const VideoPlanSelector = VideoSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.PREMIUM, renewalDate, renewalAmount);
                return VideoPlanSelector.getRenewalInfo();
            }
                
        }

    }
    else if(services.Subscription_Type===SubscriptionType.PODCAST){

        switch(services.Subscription_Plan){
            case SubscriptionPlan.FREE: {
                const PodcastPlanSelector = PodcastSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.FREE, renewalDate, renewalAmount);
                return PodcastPlanSelector.getRenewalInfo();
            }

            case SubscriptionPlan.PERSONAL: {
                const PodcastPlanSelector = PodcastSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.PERSONAL, renewalDate, renewalAmount);
                return PodcastPlanSelector.getRenewalInfo();
            }

            case SubscriptionPlan.PREMIUM: {
                const PodcastPlanSelector = PodcastSubscriptionPlanSelector.selectSubscriptionPlan(SubscriptionPlan.PREMIUM, renewalDate, renewalAmount);
                return PodcastPlanSelector.getRenewalInfo();
            }
                
        }

    }


},

 topUps_renewal_Handler: (services: TopUp): {renewalMessage: string, renewalAmount: number} => {

    const renewalMessage = "";
    let renewalAmount = 0;

    if(services.TopUp_Plan===TopUpPlan.FOUR_DEVICE){

        renewalAmount = Number(services.Required_number_of_months)*50;
        
        return {renewalMessage: renewalMessage, renewalAmount: renewalAmount};
    }
    else if(services.TopUp_Plan===TopUpPlan.TEN_DEVICE){

        renewalAmount = Number(services.Required_number_of_months)*100;
        
        return {renewalMessage: renewalMessage, renewalAmount: renewalAmount};
    }

}

}