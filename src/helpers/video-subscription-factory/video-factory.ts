import { SubscriptionType, SubscriptionPlan, TopUpPlan } from '../../enumerations';
import {IVideoSubscriptionPlan} from './video';
import SubscriptionPlanFree from './video-free';
import SubscriptionPlanPersonal from './video-personal';
import SubscriptionPlanPremium from './video-premium';
import  moment from 'moment';

export default class VideoSubscriptionPlanSelector {
    static selectSubscriptionPlan(subscriptionPlan: string, renewalDate: moment.Moment, renewalAmount: number): IVideoSubscriptionPlan {
       switch(subscriptionPlan) {
        case SubscriptionPlan.FREE:
            return new SubscriptionPlanFree(renewalDate, renewalAmount);
        
        case SubscriptionPlan.PERSONAL:
            return new SubscriptionPlanPersonal(renewalDate, renewalAmount);

        case SubscriptionPlan.PREMIUM:
            return new SubscriptionPlanPremium(renewalDate, renewalAmount);
       }
    }
}