import { describe, it } from 'mocha';
import * as chai from 'chai';
import  moment from 'moment';
import { renewalHelper } from '../../helpers/renewal-helper';

const expect = chai.expect;

describe('Renewal-Helper:', () => {
    const start_date = moment('20-02-2022', "DD-MM-YYYY");

    describe('Subscription renewal handler', () => {
        
        [
            {
                subscribed_services: {
                "name": "Subscriptions",
                "Subscription_Type": "VIDEO",
                "Subscription_Plan": "FREE",
                "Start_Date": start_date,
                "id": 1
            },
            response:{
                renewalMessage: 'RENEWAL_REMINDER VIDEO 10-03-2022', renewalAmount: 0
            }
        },
            {subscribed_services:{
                "name": "Subscriptions",
                "Subscription_Type": "VIDEO",
                "Subscription_Plan": "PERSONAL",
                "Start_Date": start_date,
                "id": 1
            },
            response:{
                renewalMessage: 'RENEWAL_REMINDER VIDEO 10-03-2022', renewalAmount: 200
            }},
            {subscribed_services:{
                "name": "Subscriptions",
                "Subscription_Type": "VIDEO",
                "Subscription_Plan": "PREMIUM",
                "Start_Date": start_date,
                "id": 1
            },
            response:{
                renewalMessage: 'RENEWAL_REMINDER VIDEO 10-05-2022', renewalAmount: 500
            }},
            {subscribed_services:{
                "name": "Subscriptions",
                "Subscription_Type": "MUSIC",
                "Subscription_Plan": "FREE",
                "Start_Date": start_date,
                "id": 1
            },
            response:{
                renewalMessage: 'RENEWAL_REMINDER MUSIC 10-03-2022', renewalAmount: 0
            }},
            {subscribed_services:{
                "name": "Subscriptions",
                "Subscription_Type": "MUSIC",
                "Subscription_Plan": "PERSONAL",
                "Start_Date": start_date,
                "id": 1
            },
            response:{
                renewalMessage: 'RENEWAL_REMINDER MUSIC 10-03-2022', renewalAmount: 100
            }},
            {subscribed_services:{
                "name": "Subscriptions",
                "Subscription_Type": "MUSIC",
                "Subscription_Plan": "PREMIUM",
                "Start_Date": start_date,
                "id": 1
            },
            response:{
                renewalMessage: 'RENEWAL_REMINDER MUSIC 10-05-2022', renewalAmount: 250
            }},
            {subscribed_services:{
                "name": "Subscriptions",
                "Subscription_Type": "PODCAST",
                "Subscription_Plan": "FREE",
                "Start_Date": start_date,
                "id": 1
            },
            response:{
                renewalMessage: 'RENEWAL_REMINDER PODCAST 10-03-2022', renewalAmount: 0
            }},
            {subscribed_services:{
                "name": "Subscriptions",
                "Subscription_Type": "PODCAST",
                "Subscription_Plan": "PERSONAL",
                "Start_Date": start_date,
                "id": 1
            },response:{
                renewalMessage: 'RENEWAL_REMINDER PODCAST 10-03-2022', renewalAmount: 100
            }},
            {
                subscribed_services: {
                "name": "Subscriptions",
                "Subscription_Type": "PODCAST",
                "Subscription_Plan": "PREMIUM",
                "Start_Date": start_date,
                "id": 1
            },
            response:{
                renewalMessage: 'RENEWAL_REMINDER PODCAST 10-05-2022', renewalAmount: 300
            }

        },
    ].forEach(data => {
            it(`should return ${data.subscribed_services.Subscription_Plan} ${data.subscribed_services.Subscription_Type} renewal reminder message and amount`, () => {
              const result = renewalHelper.subscriptions_renewal_Handler(data.subscribed_services);
              expect(result).to.be.deep.equal(data.response);
            });
          });

    });

    describe('TopUps renewal handler', () => {
        [
            {
                subscribed_topUps: {
                    "name": "TopUps",
                    "TopUp_Plan": "TEN_DEVICE",
                    "Required_number_of_months": "2",
                    "Start_Date": start_date,
                    "id": 1
                },
            response:{
                renewalMessage: '', renewalAmount: 200
            }
        },
        {
            subscribed_topUps: {
                "name": "TopUps",
                "TopUp_Plan": "FOUR_DEVICE",
                "Required_number_of_months": "3",
                "Start_Date": start_date,
                "id": 1
            },
        response:{
            renewalMessage: '', renewalAmount: 150
        }
    },
    ].forEach(data => {
            it(`should return ${data.subscribed_topUps.TopUp_Plan} top up plan renewal amount`, () => {
              const result = renewalHelper.topUps_renewal_Handler(data.subscribed_topUps);
              expect(result).to.be.deep.equal(data.response);
            });
          });
    });

    
});