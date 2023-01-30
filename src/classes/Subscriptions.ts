import { Subscribed_services } from '../storage/storage';


   export function Subscriptions(name: string, type: string, plan: string, startDate: moment.Moment){
        this.name = name;
        this.Subscription_Type = type;
        this.Subscription_Plan = plan;
        this.Start_Date = startDate;

}

Subscriptions.prototype.getClass = function () {
	return Subscriptions;
};

Subscriptions.prototype.save = function () {
	
	Subscribed_services.saveSubscription(this);
	
};