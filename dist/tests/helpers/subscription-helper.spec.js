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
const sinon = __importStar(require("sinon"));
const moment_1 = __importDefault(require("moment"));
const enumerations_1 = require("../../enumerations");
const Subscriptions_1 = require("../../classes/Subscriptions");
const TopUps_1 = require("../../classes/TopUps");
const storage_1 = require("../../storage/storage");
const rewire_1 = __importDefault(require("rewire"));
const subscriptionHelper = (0, rewire_1.default)("../../helpers/subscription-helper");
const expect = chai.expect;
const subscriptionsNamespace = {
    Subscriptions: Subscriptions_1.Subscriptions
};
const topUpsNamespace = {
    TopUps: TopUps_1.TopUps
};
(0, mocha_1.describe)('Subscription-Helper:', () => {
    let consoleStub;
    let subscriptionsStub;
    let topUpsStub;
    let saveSubscriptionsStub;
    let saveTopUpsStub;
    let Subscribed_services_Stub;
    (0, mocha_1.before)(() => {
        subscriptionsStub = { Subscriptions: sinon.stub(subscriptionsNamespace, 'Subscriptions') };
        topUpsStub = { TopUps: sinon.stub(topUpsNamespace, 'TopUps') };
        saveSubscriptionsStub = { save: sinon.stub(Subscriptions_1.Subscriptions.prototype, 'save') };
        saveTopUpsStub = { save: sinon.stub(TopUps_1.TopUps.prototype, 'save') };
        Subscribed_services_Stub = { saveSubscription: sinon.stub(storage_1.Subscribed_services, 'saveSubscription'),
            saveTopUp: sinon.stub(storage_1.Subscribed_services, 'saveTopUp'),
            getData: sinon.stub(storage_1.Subscribed_services, 'getData'),
            iterate: sinon.stub(storage_1.Subscribed_services, 'iterate') };
    });
    beforeEach(() => {
        consoleStub = { log: sinon.stub(console, 'log') };
    });
    (0, mocha_1.afterEach)(() => {
        consoleStub.log.restore();
        subscriptionsStub.Subscriptions.reset();
        topUpsStub.TopUps.reset();
        saveSubscriptionsStub.save.reset();
        saveTopUpsStub.save.reset();
        Subscribed_services_Stub.saveSubscription.reset();
        Subscribed_services_Stub.saveTopUp.reset();
        Subscribed_services_Stub.getData.reset();
        Subscribed_services_Stub.iterate.reset();
        subscriptionHelper.__set__({ "video_tracker": 0,
            "music_tracker": 0,
            "podcast_tracker": 0,
            "topUp_tracker": 0
        });
    });
    (0, mocha_1.after)(() => {
        subscriptionsStub.Subscriptions.restore();
        topUpsStub.TopUps.restore();
        saveSubscriptionsStub.save.restore();
        saveTopUpsStub.save.restore();
        Subscribed_services_Stub.saveSubscription.restore();
        Subscribed_services_Stub.saveTopUp.restore();
        Subscribed_services_Stub.getData.restore();
        Subscribed_services_Stub.iterate.restore();
        subscriptionHelper.__set__({ "video_tracker": 0,
            "music_tracker": 0,
            "podcast_tracker": 0,
            "topUp_tracker": 0
        });
    });
    (0, mocha_1.describe)('add new Subscription/TopUp', () => {
        const start_date = (0, moment_1.default)('20-02-2022', "DD-MM-YYYY");
        (0, mocha_1.it)('should add a new Subscription', () => {
            subscriptionHelper.subscriptionHelper.add_Subscription(enumerations_1.SubscriptionType.VIDEO, enumerations_1.SubscriptionPlan.PREMIUM, start_date);
            expect(saveSubscriptionsStub.save.called).to.be.true;
            expect(subscriptionHelper.__get__("video_tracker")).to.eq(1);
            expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(0);
        });
        (0, mocha_1.it)('should add a new TopUp when a Subscription has already been added', () => {
            subscriptionHelper.__set__("video_tracker", 1);
            subscriptionHelper.subscriptionHelper.add_TopUp(enumerations_1.TopUpPlan.FOUR_DEVICE, '3', start_date);
            expect(saveTopUpsStub.save.called).to.be.true;
            expect(subscriptionHelper.__get__("video_tracker")).to.eq(1);
            expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(1);
        });
    });
    (0, mocha_1.describe)('display error while adding subscription/topUp', () => {
        const start_date = (0, moment_1.default)('20-02-2022', "DD-MM-YYYY");
        (0, mocha_1.it)('should display error when adding a new Subscription of existing category', () => {
            subscriptionHelper.__set__("podcast_tracker", 1);
            subscriptionHelper.subscriptionHelper.add_Subscription(enumerations_1.SubscriptionType.PODCAST, enumerations_1.SubscriptionPlan.FREE, start_date);
            expect(saveSubscriptionsStub.save.called).to.be.false;
            expect(subscriptionHelper.__get__("video_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(1);
            expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(0);
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY')).to.be.true;
        });
        (0, mocha_1.it)('should display error when adding a topUp when no Subscription exists', () => {
            subscriptionHelper.subscriptionHelper.add_TopUp(enumerations_1.TopUpPlan.FOUR_DEVICE, '3', start_date);
            expect(saveTopUpsStub.save.called).to.be.false;
            expect(subscriptionHelper.__get__("video_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(0);
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith('ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND')).to.be.true;
        });
        (0, mocha_1.it)('should display error when adding a topUp while a topUp already exists', () => {
            subscriptionHelper.__set__("podcast_tracker", 1);
            subscriptionHelper.__set__("topUp_tracker", 1);
            subscriptionHelper.subscriptionHelper.add_TopUp(enumerations_1.TopUpPlan.FOUR_DEVICE, '3', start_date);
            expect(saveTopUpsStub.save.called).to.be.false;
            expect(subscriptionHelper.__get__("video_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
            expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(1);
            expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(1);
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith('ADD_TOPUP_FAILED DUPLICATE_TOPUP')).to.be.true;
        });
        (0, mocha_1.it)('should display the error when save Subscription method throws an error', () => {
            const error = { message: 'message' };
            saveSubscriptionsStub.save.throws(error);
            subscriptionHelper.subscriptionHelper.add_Subscription(enumerations_1.SubscriptionType.PODCAST, enumerations_1.SubscriptionPlan.FREE, start_date);
            expect(saveTopUpsStub.save.called).to.be.false;
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith(error)).to.be.true;
        });
        (0, mocha_1.it)('should display the error when save TopUp method throws an error', () => {
            subscriptionHelper.__set__("podcast_tracker", 1);
            const error = { message: 'message' };
            saveTopUpsStub.save.throws(error);
            subscriptionHelper.subscriptionHelper.add_TopUp(enumerations_1.TopUpPlan.FOUR_DEVICE, '3', start_date);
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith(error)).to.be.true;
        });
    });
    (0, mocha_1.describe)('print renewal details', () => {
        const subscribed_services = {
            "1": {
                "name": "Subscriptions",
                "Subscription_Type": "VIDEO",
                "Subscription_Plan": "PREMIUM",
                "Start_Date": "2022-02-19T18:30:00.000Z",
                "id": 1
            },
            "2": {
                "name": "Subscriptions",
                "Subscription_Type": "PODCAST",
                "Subscription_Plan": "FREE",
                "Start_Date": "2022-02-19T18:30:00.000Z",
                "id": 2
            }
        };
        const subscribed_topUps = {
            "1": {
                "name": "TopUps",
                "TopUp_Plan": "TEN_DEVICE",
                "Required_number_of_months": "2",
                "Start_Date": "2022-02-19T18:30:00.000Z",
                "id": 1
            }
        };
        const final_renewalMessage = 'RENEWAL_REMINDER VIDEO 10-05-2022' + '\n' + 'RENEWAL_REMINDER PODCAST 10-03-2022';
        const subscriptions_response = { final_renewalMessage: final_renewalMessage, final_renewalAmount: 600 };
        const topUps_response = { final_renewalMessage: "", final_renewalAmount: 150 };
        (0, mocha_1.it)('should print renewal details if subscriptions are present', () => {
            subscriptionHelper.__set__({ "video_tracker": 1,
                "music_tracker": 0,
                "podcast_tracker": 1,
                "topUp_tracker": 1
            });
            Subscribed_services_Stub.getData.onCall(0).returns(subscribed_services);
            Subscribed_services_Stub.iterate.onCall(0).returns(subscriptions_response);
            Subscribed_services_Stub.getData.onCall(1).returns(subscribed_topUps);
            Subscribed_services_Stub.iterate.onCall(1).returns(topUps_response);
            subscriptionHelper.subscriptionHelper.print_renewal_details();
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith(final_renewalMessage + '\n' + 'RENEWAL_AMOUNT 750')).to.be.true;
        });
        (0, mocha_1.it)('should display error message if no subscriptions are found in storage', () => {
            subscriptionHelper.__set__({ "video_tracker": 1
            });
            Subscribed_services_Stub.getData.onCall(0).returns(null);
            subscriptionHelper.subscriptionHelper.print_renewal_details();
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith('SUBSCRIPTIONS_NOT_FOUND')).to.be.true;
        });
        (0, mocha_1.it)('should print renewal details and also display error message if no topUps are found in storage', () => {
            subscriptionHelper.__set__({ "video_tracker": 1,
                "podcast_tracker": 1
            });
            Subscribed_services_Stub.getData.onCall(0).returns(subscribed_services);
            Subscribed_services_Stub.iterate.onCall(0).returns(subscriptions_response);
            Subscribed_services_Stub.getData.onCall(1).returns(null);
            subscriptionHelper.subscriptionHelper.print_renewal_details();
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith('TOPUPS_NOT_FOUND')).to.be.true;
            expect(consoleStub.log.calledWith(final_renewalMessage + '\n' + 'RENEWAL_AMOUNT 600')).to.be.true;
        });
    });
});
