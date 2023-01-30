import { describe, it, before, after, afterEach } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import  moment from 'moment';
import { SubscriptionType, SubscriptionPlan, TopUpPlan } from '../../enumerations';
import { Subscriptions } from '../../classes/Subscriptions';
import { TopUps } from '../../classes/TopUps';
import { Subscribed_services } from '../../storage/storage';
import rewire from 'rewire';
const subscriptionHelper = rewire("../../helpers/subscription-helper");

const expect = chai.expect;
const subscriptionsNamespace = {
    Subscriptions
  };
const topUpsNamespace = {
    TopUps
  };

describe('Subscription-Helper:', () => {
    let consoleStub;
    let subscriptionsStub;
    let topUpsStub;
    let saveSubscriptionsStub;
    let saveTopUpsStub;
    let Subscribed_services_Stub;
  
    before(() => {
        subscriptionsStub = {Subscriptions: sinon.stub(subscriptionsNamespace,'Subscriptions')};
        topUpsStub = {TopUps: sinon.stub(topUpsNamespace,'TopUps')};
        saveSubscriptionsStub = {save: sinon.stub(Subscriptions.prototype, 'save')};
        saveTopUpsStub = {save: sinon.stub(TopUps.prototype, 'save')};


        Subscribed_services_Stub = {saveSubscription: sinon.stub(Subscribed_services, 'saveSubscription'), 
        saveTopUp: sinon.stub(Subscribed_services, 'saveTopUp'),
        getData: sinon.stub(Subscribed_services, 'getData'),
        iterate: sinon.stub(Subscribed_services, 'iterate')};

    });

    beforeEach(() => {
      consoleStub = {log: sinon.stub(console, 'log')};
  });
  
    afterEach(() => {
      consoleStub.log.restore();
      subscriptionsStub.Subscriptions.reset();
      topUpsStub.TopUps.reset();
      saveSubscriptionsStub.save.reset();
      saveTopUpsStub.save.reset();
      Subscribed_services_Stub.saveSubscription.reset();
      Subscribed_services_Stub.saveTopUp.reset();
      Subscribed_services_Stub.getData.reset();
      Subscribed_services_Stub.iterate.reset();
      subscriptionHelper.__set__({"video_tracker": 0,
        "music_tracker": 0,
        "podcast_tracker": 0,
        "topUp_tracker": 0
    });
    });
  
    after(() => {
      subscriptionsStub.Subscriptions.restore();
      topUpsStub.TopUps.restore();
      saveSubscriptionsStub.save.restore();
      saveTopUpsStub.save.restore();
      Subscribed_services_Stub.saveSubscription.restore();
      Subscribed_services_Stub.saveTopUp.restore();
      Subscribed_services_Stub.getData.restore();
      Subscribed_services_Stub.iterate.restore();
      subscriptionHelper.__set__({"video_tracker": 0,
       "music_tracker": 0,
       "podcast_tracker": 0,
       "topUp_tracker": 0
    });
    });
  
    describe('add new Subscription/TopUp', () => {
      const start_date = moment('20-02-2022', "DD-MM-YYYY");
    
  
      it('should add a new Subscription', () => {
        subscriptionHelper.subscriptionHelper.add_Subscription(SubscriptionType.VIDEO, SubscriptionPlan.PREMIUM, start_date);

        expect(saveSubscriptionsStub.save.called).to.be.true;
        expect(subscriptionHelper.__get__("video_tracker")).to.eq(1);
        expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(0);
  
        
      });

      it('should add a new TopUp when a Subscription has already been added', () => {
        subscriptionHelper.__set__("video_tracker", 1);
        subscriptionHelper.subscriptionHelper.add_TopUp(TopUpPlan.FOUR_DEVICE, '3', start_date);

        
        expect(saveTopUpsStub.save.called).to.be.true;
        expect(subscriptionHelper.__get__("video_tracker")).to.eq(1);
        expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(1);
  
        
      });

    });


    describe('display error while adding subscription/topUp', () => {
        
      const start_date = moment('20-02-2022', "DD-MM-YYYY");
    
  
      it('should display error when adding a new Subscription of existing category', () => {
        subscriptionHelper.__set__("podcast_tracker", 1);
        subscriptionHelper.subscriptionHelper.add_Subscription(SubscriptionType.PODCAST, SubscriptionPlan.FREE, start_date);

        expect(saveSubscriptionsStub.save.called).to.be.false;
        expect(subscriptionHelper.__get__("video_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(1);
        expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(0);
        expect(consoleStub.log.called).to.be.true;
        expect(consoleStub.log.calledWith('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY') ).to.be.true;
  
        
      });

      it('should display error when adding a topUp when no Subscription exists', () => {
        subscriptionHelper.subscriptionHelper.add_TopUp(TopUpPlan.FOUR_DEVICE, '3', start_date);

        expect(saveTopUpsStub.save.called).to.be.false;
        expect(subscriptionHelper.__get__("video_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(0);
        expect(consoleStub.log.called).to.be.true;
        expect(consoleStub.log.calledWith('ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND') ).to.be.true;
  
        
      });

      it('should display error when adding a topUp while a topUp already exists', () => {
        subscriptionHelper.__set__("podcast_tracker", 1);
        subscriptionHelper.__set__("topUp_tracker", 1);
        subscriptionHelper.subscriptionHelper.add_TopUp(TopUpPlan.FOUR_DEVICE, '3', start_date);

        expect(saveTopUpsStub.save.called).to.be.false;
        expect(subscriptionHelper.__get__("video_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("music_tracker")).to.eq(0);
        expect(subscriptionHelper.__get__("podcast_tracker")).to.eq(1);
        expect(subscriptionHelper.__get__("topUp_tracker")).to.eq(1);
        expect(consoleStub.log.called).to.be.true;
        expect(consoleStub.log.calledWith('ADD_TOPUP_FAILED DUPLICATE_TOPUP') ).to.be.true;
  
        
      });

      it('should display the error when save Subscription method throws an error', () => {
        const error = { message: 'message' };
        saveSubscriptionsStub.save.throws(error);
        subscriptionHelper.subscriptionHelper.add_Subscription(SubscriptionType.PODCAST, SubscriptionPlan.FREE, start_date);

        expect(saveTopUpsStub.save.called).to.be.false;
        expect(consoleStub.log.called).to.be.true;
        expect(consoleStub.log.calledWith(error) ).to.be.true;
  
        
      });

      it('should display the error when save TopUp method throws an error', () => {
        subscriptionHelper.__set__("podcast_tracker", 1);
        
        const error = { message: 'message' };
        saveTopUpsStub.save.throws(error);
        subscriptionHelper.subscriptionHelper.add_TopUp(TopUpPlan.FOUR_DEVICE, '3', start_date);

        expect(consoleStub.log.called).to.be.true;
        expect(consoleStub.log.calledWith(error) ).to.be.true;
  
        
      });

    });


    describe('print renewal details', () => {
        
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
        const final_renewalMessage: string = 'RENEWAL_REMINDER VIDEO 10-05-2022'+ '\n' +'RENEWAL_REMINDER PODCAST 10-03-2022';
        const subscriptions_response = {final_renewalMessage: final_renewalMessage, final_renewalAmount: 600};
        const topUps_response = {final_renewalMessage: "", final_renewalAmount: 150};
      
    
        it('should print renewal details if subscriptions are present', () => {

            subscriptionHelper.__set__({"video_tracker": 1,
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
          expect(consoleStub.log.calledWith(final_renewalMessage+ '\n' + 'RENEWAL_AMOUNT 750')).to.be.true;
    
          
        });

        it('should display error message if no subscriptions are found in storage', () => {

            subscriptionHelper.__set__({"video_tracker": 1
            });
            Subscribed_services_Stub.getData.onCall(0).returns(null);

            subscriptionHelper.subscriptionHelper.print_renewal_details();

          expect(consoleStub.log.called).to.be.true;
          expect(consoleStub.log.calledWith('SUBSCRIPTIONS_NOT_FOUND')).to.be.true;
    
          
        });

        it('should print renewal details and also display error message if no topUps are found in storage', () => {

            subscriptionHelper.__set__({"video_tracker": 1,
              "podcast_tracker": 1
            });
            Subscribed_services_Stub.getData.onCall(0).returns(subscribed_services);
            Subscribed_services_Stub.iterate.onCall(0).returns(subscriptions_response);
            Subscribed_services_Stub.getData.onCall(1).returns(null);

            subscriptionHelper.subscriptionHelper.print_renewal_details();

          expect(consoleStub.log.called).to.be.true;
          expect(consoleStub.log.calledWith('TOPUPS_NOT_FOUND')).to.be.true;
          expect(consoleStub.log.calledWith(final_renewalMessage+ '\n' + 'RENEWAL_AMOUNT 600')).to.be.true;
    
          
        });

    });

    
});