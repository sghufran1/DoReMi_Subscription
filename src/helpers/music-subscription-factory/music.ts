import  moment from 'moment';

export interface IMusicSubscriptionPlan {
    renewalDate: moment.Moment;
    renewalAmount: number;
    renewalMessage: string;
    getRenewalInfo(): { renewalMessage: string; renewalAmount: number; };

}


export class MusicSubscriptionPlan implements IMusicSubscriptionPlan {

    renewalDate;
    renewalAmount = 0;
    renewalMessage = "";
    getRenewalInfo() {
        return {renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount};
    }

}