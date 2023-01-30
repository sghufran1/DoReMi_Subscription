import { SubscriptionType, SubscriptionPlan, TopUpPlan } from '../../enumerations';
import {IMusicSubscriptionPlan} from './music';
import SubscriptionPlanFree from './music-free';
import SubscriptionPlanPersonal from './music-personal';
import SubscriptionPlanPremium from './music-premium';
import  moment from 'moment';

export default class MusicSubscriptionPlanSelector {
    static selectSubscriptionPlan(subscriptionPlan: string, renewalDate: moment.Moment, renewalAmount: number): IMusicSubscriptionPlan {
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