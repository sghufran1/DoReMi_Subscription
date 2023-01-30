import {MusicSubscriptionPlan} from './music';
import  moment from 'moment';

export default class SubscriptionPlanPersonal extends MusicSubscriptionPlan {
    constructor(renewalDate: moment.Moment, renewalAmount: number) {
        super();
        this.renewalDate = renewalDate;
        this.renewalAmount = renewalAmount;
    }  

    getRenewalInfo(): { renewalMessage: string; renewalAmount: number; } {
        
        const music_renewalDate = this.renewalDate.add(1, 'months').subtract(10, 'days');
        this.renewalMessage = 'RENEWAL_REMINDER MUSIC '+ music_renewalDate.format('DD') +'-'+ music_renewalDate.format('MM') + '-' + music_renewalDate.format('YYYY');
        this.renewalAmount+=100;
            
        return {renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount};
    }
}