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
const mainProgram_helper_1 = require("../../helpers/mainProgram-helper");
const enumerations_1 = require("../../enumerations");
const subscription_helper_1 = require("../../helpers/subscription-helper");
const expect = chai.expect;
(0, mocha_1.describe)('Main Program-Helper:', () => {
    let consoleStub;
    let subscriptionHelperStub;
    (0, mocha_1.before)(() => {
        subscriptionHelperStub = { add_Subscription: sinon.stub(subscription_helper_1.subscriptionHelper, 'add_Subscription'),
            add_TopUp: sinon.stub(subscription_helper_1.subscriptionHelper, 'add_TopUp'),
            print_renewal_details: sinon.stub(subscription_helper_1.subscriptionHelper, 'print_renewal_details') };
    });
    beforeEach(() => {
        consoleStub = { log: sinon.stub(console, 'log') };
    });
    (0, mocha_1.afterEach)(() => {
        consoleStub.log.restore();
        subscriptionHelperStub.add_Subscription.reset();
        subscriptionHelperStub.add_TopUp.reset();
        subscriptionHelperStub.print_renewal_details.reset();
    });
    (0, mocha_1.after)(() => {
        subscriptionHelperStub.add_Subscription.restore();
        subscriptionHelperStub.add_TopUp.restore();
        subscriptionHelperStub.print_renewal_details.restore();
    });
    (0, mocha_1.describe)('Process file input', () => {
        const input = `START_SUBSCRIPTION 20-02-2022
        ADD_SUBSCRIPTION MUSIC PERSONAL
        ADD_SUBSCRIPTION VIDEO PREMIUM
        ADD_TOPUP TEN_DEVICE 2
        PRINT_RENEWAL_DETAILS`.toString();
        (0, mocha_1.it)('should process input commands', () => {
            mainProgram_helper_1.mainProgram.runProgram(input);
            const subs_args = subscriptionHelperStub.add_Subscription.getCall(0).args;
            expect(subs_args[0]).eq(enumerations_1.SubscriptionType.MUSIC);
            expect(subs_args[1]).eq(enumerations_1.SubscriptionPlan.PERSONAL);
            expect(subs_args[2]).to.be.deep.equal((0, moment_1.default)("20-02-2022", "DD-MM-YYYY"));
            const subs_args1 = subscriptionHelperStub.add_Subscription.getCall(1).args;
            expect(subs_args1[0]).eq(enumerations_1.SubscriptionType.VIDEO);
            expect(subs_args1[1]).eq(enumerations_1.SubscriptionPlan.PREMIUM);
            expect(subs_args1[2]).to.be.deep.equal((0, moment_1.default)("20-02-2022", "DD-MM-YYYY"));
            const topUp_args = subscriptionHelperStub.add_TopUp.getCall(0).args;
            expect(topUp_args[0]).eq(enumerations_1.TopUpPlan.TEN_DEVICE);
            expect(topUp_args[1]).eq('2');
            expect(topUp_args[2]).to.be.deep.equal((0, moment_1.default)("20-02-2022", "DD-MM-YYYY"));
            expect(subscriptionHelperStub.print_renewal_details.calledOnce).to.be.true;
        });
        [
            {
                error_type: 'absent start date',
                erroneous_input: `START_SUBSCRIPTION`.toString(),
                error_message: 'Please provide subscription start date in DD-MM-YYYY format'
            },
            {
                error_type: 'invalid start date',
                erroneous_input: `START_SUBSCRIPTION 20-14-2025`.toString(),
                error_message: 'INVALID_DATE'
            },
            {
                error_type: 'absent subscription plan',
                erroneous_input: `ADD_SUBSCRIPTION MUSIC`.toString(),
                error_message: 'Please provide all required details (Subscription Category/Plans)'
            },
            {
                error_type: 'absent subscription type',
                erroneous_input: `ADD_SUBSCRIPTION PREMIUM`.toString(),
                error_message: 'Please provide all required details (Subscription Category/Plans)'
            },
            {
                error_type: 'absent topup plan',
                erroneous_input: `ADD_TOPUP`.toString(),
                error_message: 'Please provide all required details (TopUp Plan/Number of months)'
            },
        ].forEach(data => {
            (0, mocha_1.it)(`should display error message for ${data.error_type} in input commands`, () => {
                mainProgram_helper_1.mainProgram.runProgram(data.erroneous_input);
                expect(consoleStub.log.called).to.be.true;
                expect(consoleStub.log.calledWith(data.error_message)).to.be.true;
            });
        });
    });
});
