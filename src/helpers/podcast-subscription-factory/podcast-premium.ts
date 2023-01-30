import {PodcastSubscriptionPlan} from './podcast';
import  moment from 'moment';

export default class SubscriptionPlanPremium extends PodcastSubscriptionPlan {
    
    constructor(renewalDate: moment.Moment, renewalAmount: number) {
        super();
        this.renewalDate = renewalDate;
        this.renewalAmount = renewalAmount;
    }  

    getRenewalInfo(): { renewalMessage: string; renewalAmount: number; } {
        
        const podcast_renewalDate = this.renewalDate.add(3, 'months').subtract(10, 'days');
        this.renewalMessage = 'RENEWAL_REMINDER PODCAST '+ podcast_renewalDate.format('DD') +'-'+ podcast_renewalDate.format('MM') + '-' + podcast_renewalDate.format('YYYY');
        this.renewalAmount+=300;
            
        return {renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount};
    }
}