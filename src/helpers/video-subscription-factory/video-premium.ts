import {VideoSubscriptionPlan} from './video';
import  moment from 'moment';

export default class SubscriptionPlanPremium extends VideoSubscriptionPlan {
    
    constructor(renewalDate: moment.Moment, renewalAmount: number) {
        super();
        this.renewalDate = renewalDate;
        this.renewalAmount = renewalAmount;
    }  

    getRenewalInfo(): { renewalMessage: string; renewalAmount: number; } {
        
        const video_renewalDate = this.renewalDate.add(3, 'months').subtract(10, 'days');
        this.renewalMessage = 'RENEWAL_REMINDER VIDEO '+ video_renewalDate.format('DD') +'-'+ video_renewalDate.format('MM') + '-' + video_renewalDate.format('YYYY');
        this.renewalAmount+=500;
            
        return {renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount};
    }
}