import { describe, it, before, after, afterEach } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import  moment from 'moment';
import { mainProgram } from '../../helpers/mainProgram-helper';
import { SubscriptionType, SubscriptionPlan, TopUpPlan } from '../../enumerations';
import { subscriptionHelper } from '../../helpers/subscription-helper';

const expect = chai.expect;


describe('Main Program-Helper:', () => {

    let consoleStub;
    let subscriptionHelperStub;

    before(() => {
        subscriptionHelperStub = {add_Subscription: sinon.stub(subscriptionHelper, 'add_Subscription'), 
        add_TopUp: sinon.stub(subscriptionHelper, 'add_TopUp'),
        print_renewal_details: sinon.stub(subscriptionHelper, 'print_renewal_details')};
    });

    beforeEach(() => {
        consoleStub = {log: sinon.stub(console, 'log')};
    });
  
    afterEach(() => {
        consoleStub.log.restore();
        subscriptionHelperStub.add_Subscription.reset();
        subscriptionHelperStub.add_TopUp.reset();
        subscriptionHelperStub.print_renewal_details.reset();
    });
  
    after(() => {
      subscriptionHelperStub.add_Subscription.restore();
        subscriptionHelperStub.add_TopUp.restore();
        subscriptionHelperStub.print_renewal_details.restore();
    });

    describe('Process file input', () => {

        const input = `START_SUBSCRIPTION 20-02-2022
        ADD_SUBSCRIPTION MUSIC PERSONAL
        ADD_SUBSCRIPTION VIDEO PREMIUM
        ADD_TOPUP TEN_DEVICE 2
        PRINT_RENEWAL_DETAILS`.toString();

        it('should process input commands', () => {

            mainProgram.runProgram(input);

            const subs_args = subscriptionHelperStub.add_Subscription.getCall(0).args;
            expect(subs_args[0]).eq(SubscriptionType.MUSIC);
            expect(subs_args[1]).eq(SubscriptionPlan.PERSONAL);
            expect(subs_args[2]).to.be.deep.equal(moment("20-02-2022", "DD-MM-YYYY"));

            const subs_args1 = subscriptionHelperStub.add_Subscription.getCall(1).args;
            expect(subs_args1[0]).eq(SubscriptionType.VIDEO);
            expect(subs_args1[1]).eq(SubscriptionPlan.PREMIUM);
            expect(subs_args1[2]).to.be.deep.equal(moment("20-02-2022", "DD-MM-YYYY"));

            const topUp_args = subscriptionHelperStub.add_TopUp.getCall(0).args;
            expect(topUp_args[0]).eq(TopUpPlan.TEN_DEVICE);
            expect(topUp_args[1]).eq('2');
            expect(topUp_args[2]).to.be.deep.equal(moment("20-02-2022", "DD-MM-YYYY"));

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
                it(`should display error message for ${data.error_type} in input commands`, () => {

                    mainProgram.runProgram(data.erroneous_input);
        
                    expect(consoleStub.log.called).to.be.true;
                    expect(consoleStub.log.calledWith(data.error_message)).to.be.true;
                    
                });
            });

        

       

        


    });



});