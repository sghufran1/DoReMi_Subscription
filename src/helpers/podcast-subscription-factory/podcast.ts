import  moment from 'moment';

export interface IPodcastSubscriptionPlan {
    renewalDate: moment.Moment;
    renewalAmount: number;
    renewalMessage: string;
    getRenewalInfo(): { renewalMessage: string; renewalAmount: number; };

}


export class PodcastSubscriptionPlan implements IPodcastSubscriptionPlan {

    renewalDate;
    renewalAmount = 0;
    renewalMessage = "";
    getRenewalInfo() {
        return {renewalMessage: this.renewalMessage, renewalAmount: this.renewalAmount};
    }

}