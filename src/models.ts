export interface Subscription {
    name: string,
    Subscription_Type: string,
    Subscription_Plan: string,
    Start_Date: moment.Moment,
    id: number
  }


export interface TopUp {
    name: string,
    TopUp_Plan: string,
    Required_number_of_months: string
    Start_Date: moment.Moment,
    id: number
  }