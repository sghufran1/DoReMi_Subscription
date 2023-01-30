"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai = __importStar(require("chai"));
const moment_1 = __importDefault(require("moment"));
const renewal_helper_1 = require("../../helpers/renewal-helper");
const expect = chai.expect;
(0, mocha_1.describe)('Renewal-Helper:', () => {
    const start_date = (0, moment_1.default)('20-02-2022', "DD-MM-YYYY");
    (0, mocha_1.describe)('Subscription renewal handler', () => {
        [
            {
                subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "VIDEO",
                    "Subscription_Plan": "FREE",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
                    renewalMessage: 'RENEWAL_REMINDER VIDEO 10-03-2022', renewalAmount: 0
                }
            },
            { subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "VIDEO",
                    "Subscription_Plan": "PERSONAL",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
                    renewalMessage: 'RENEWAL_REMINDER VIDEO 10-03-2022', renewalAmount: 200
                } },
            { subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "VIDEO",
                    "Subscription_Plan": "PREMIUM",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
                    renewalMessage: 'RENEWAL_REMINDER VIDEO 10-05-2022', renewalAmount: 500
                } },
            { subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "MUSIC",
                    "Subscription_Plan": "FREE",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
                    renewalMessage: 'RENEWAL_REMINDER MUSIC 10-03-2022', renewalAmount: 0
                } },
            { subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "MUSIC",
                    "Subscription_Plan": "PERSONAL",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
                    renewalMessage: 'RENEWAL_REMINDER MUSIC 10-03-2022', renewalAmount: 100
                } },
            { subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "MUSIC",
                    "Subscription_Plan": "PREMIUM",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
                    renewalMessage: 'RENEWAL_REMINDER MUSIC 10-05-2022', renewalAmount: 250
                } },
            { subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "PODCAST",
                    "Subscription_Plan": "FREE",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
                    renewalMessage: 'RENEWAL_REMINDER PODCAST 10-03-2022', renewalAmount: 0
                } },
            { subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "PODCAST",
                    "Subscription_Plan": "PERSONAL",
                    "Start_Date": start_date,
                    "id": 1
                }, response: {
                    renewalMessage: 'RENEWAL_REMINDER PODCAST 10-03-2022', renewalAmount: 100
                } },
            {
                subscribed_services: {
                    "name": "Subscriptions",
                    "Subscription_Type": "PODCAST",
                    "Subscription_Plan": "PREMIUM",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
                    renewalMessage: 'RENEWAL_REMINDER PODCAST 10-05-2022', renewalAmount: 300
                }
            },
        ].forEach(data => {
            (0, mocha_1.it)(`should return ${data.subscribed_services.Subscription_Plan} ${data.subscribed_services.Subscription_Type} renewal reminder message and amount`, () => {
                const result = renewal_helper_1.renewalHelper.subscriptions_renewal_Handler(data.subscribed_services);
                expect(result).to.be.deep.equal(data.response);
            });
        });
    });
    (0, mocha_1.describe)('TopUps renewal handler', () => {
        [
            {
                subscribed_topUps: {
                    "name": "TopUps",
                    "TopUp_Plan": "TEN_DEVICE",
                    "Required_number_of_months": "2",
                    "Start_Date": start_date,
                    "id": 1
                },
                response: {
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
                response: {
                    renewalMessage: '', renewalAmount: 150
                }
            },
        ].forEach(data => {
            (0, mocha_1.it)(`should return ${data.subscribed_topUps.TopUp_Plan} top up plan renewal amount`, () => {
                const result = renewal_helper_1.renewalHelper.topUps_renewal_Handler(data.subscribed_topUps);
                expect(result).to.be.deep.equal(data.response);
            });
        });
    });
});
