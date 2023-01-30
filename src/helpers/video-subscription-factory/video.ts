import  moment from 'moment';

export interface IVideoSubscriptionPlan {
    renewalDate: moment.Moment;
    renewalAmount: number;
    renewalMessage: string;
    getRenewalInfo(): { renewalMessage: string; renewalAmount: number; };

}


export class VideoSubscriptionPlan implements IVideoSubscriptionPlan {

    renewalDate;
    renewalAmount = 0;
    renewalMessage = "";
    getRenewalInfo() {
        return {renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount};
    }

}