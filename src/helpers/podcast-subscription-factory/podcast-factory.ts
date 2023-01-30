import { SubscriptionType, SubscriptionPlan, TopUpPlan } from '../../enumerations';
import {IPodcastSubscriptionPlan} from './podcast';
import SubscriptionPlanFree from './podcast-free';
import SubscriptionPlanPersonal from './podcast-personal';
import SubscriptionPlanPremium from './podcast-premium';
import  moment from 'moment';

export default class PodcastSubscriptionPlanSelector {
    static selectSubscriptionPlan(subscriptionPlan: string, renewalDate: moment.Moment, renewalAmount: number): IPodcastSubscriptionPlan {
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