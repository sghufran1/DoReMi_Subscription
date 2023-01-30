import { Subscribed_services } from '../storage/storage';

export function TopUps(name: string, plan: string, numberOfMonths: string, startDate: moment.Moment) {
    
        this.name = name;
        this.TopUp_Plan = plan;
        this.Required_number_of_months = numberOfMonths;
        this.Start_Date = startDate;

}

TopUps.prototype.getClass = function () {
	return TopUps;
};

TopUps.prototype.save = function () {
	Subscribed_services.saveTopUp(this);
};