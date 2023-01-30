import { describe, it, before, after, afterEach } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import  moment from 'moment';
import { SubscriptionType, SubscriptionPlan, TopUpPlan } from '../../enumerations';
import { Subscriptions } from '../../classes/Subscriptions';
import { TopUps } from '../../classes/TopUps';
import rewire from 'rewire';
const storageHelper = rewire("../../storage/storage");
const expect = chai.expect;



const storage_tables = storageHelper.__get__("tables");

describe('Storage-Helper:', () => {

    let consoleStub;
    const dump_stub = sinon.stub();
    let revert;

    before(() => {
        storageHelper.Subscribed_services.reset();
        revert = storageHelper.__set__("dumpToJsonFile", dump_stub);
    });

    beforeEach(() => {
        consoleStub = {log: sinon.stub(console, 'log')};
    });
  
    afterEach(() => {
        consoleStub.log.restore();
        dump_stub.reset();
        storageHelper.Subscribed_services.reset();
    });
  
    after(() => {
      storageHelper.__set__("tables", storage_tables);
      revert();
    });

    describe('save Subscriptions and TopUps', () => {

        const start_date = moment('20-02-2022', "DD-MM-YYYY");

        let newSubscription;
        let newTopUp;
        

        describe('Save Subscriptions', () => {

            const table = {
                "Subscriptions": {
                    "name": "Subscriptions",
                    "nextId": 2,
                    "rows": {
                        "1": {
                            "name": "Subscriptions",
                            "Subscription_Type": "MUSIC",
                            "Subscription_Plan": "FREE",
                            "Start_Date": "2022-02-19T18:30:00.000Z",
                            "id": 1
                        }
                    }
                }
            };

            const subscriptions_Table = JSON.stringify({
                "Subscriptions": {
                    "name": "Subscriptions",
                    "nextId": 3,
                    "rows": {
                        "1": {
                            "name": "Subscriptions",
                            "Subscription_Type": "MUSIC",
                            "Subscription_Plan": "FREE",
                            "Start_Date": "2022-02-19T18:30:00.000Z",
                            "id": 1
                        },
                        "2": {
                            "name": "Subscriptions",
                            "Subscription_Type": "VIDEO",
                            "Subscription_Plan": "PREMIUM",
                            "Start_Date": "2022-02-19T18:30:00.000Z",
                            "id": 2
                        }
                    }
                }
            });

            it('should add a new Subscription', () => {
                storageHelper.__set__("tables", table);
                newSubscription = new Subscriptions('Subscriptions', SubscriptionType.VIDEO, SubscriptionPlan.PREMIUM, start_date);
                storageHelper.Subscribed_services.saveSubscription(newSubscription);
    
                expect(dump_stub.called).to.be.true;
                expect(JSON.stringify(storageHelper.__get__("tables"))).to.eq(subscriptions_Table);
                expect(consoleStub.log.called).to.be.false;
    
            });
    
            it('should display error message when adding a new Subscription of existing category', () => {
                storageHelper.__set__("tables", table);
                newSubscription = new Subscriptions('Subscriptions', SubscriptionType.MUSIC, SubscriptionPlan.PREMIUM, start_date);
                storageHelper.Subscribed_services.saveSubscription(newSubscription);
    
                expect(dump_stub.called).to.be.false;
                expect(storageHelper.__get__("tables")).to.eq(table);
                expect(consoleStub.log.called).to.be.true;
                expect(consoleStub.log.calledWith('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY') ).to.be.true;
    
            });
    });

    describe('Save TopUps', () => {

        const table = {

            "TopUps": {
                "name": "TopUps",
                "nextId": 2,
                "rows": {
                    "1": {
                        "name": "TopUps",
                        "TopUp_Plan": "TEN_DEVICE",
                        "Required_number_of_months": "2",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 1
                    }
                }
            }
        };

        const topUpsTable = JSON.stringify({

            "TopUps": {
                "name": "TopUps",
                "nextId": 2,
                "rows": {
                    "1": {
                        "name": "TopUps",
                        "TopUp_Plan": "TEN_DEVICE",
                        "Required_number_of_months": "3",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 1
                    }
                }
            }
        });

        it('should add a new TopUp', () => {
            newTopUp = new TopUps('TopUps', TopUpPlan.TEN_DEVICE, '3', start_date);
            storageHelper.Subscribed_services.saveTopUp(newTopUp);

            expect(dump_stub.called).to.be.true;
            expect(JSON.stringify(storageHelper.__get__("tables"))).to.eq(topUpsTable);
            expect(consoleStub.log.called).to.be.false;

        });

        it('should display error message when adding a duplicate TopUp', () => {
            storageHelper.__set__("tables", table);
            newTopUp = new TopUps('TopUps', TopUpPlan.TEN_DEVICE, '3', start_date);
            storageHelper.Subscribed_services.saveTopUp(newTopUp);

            expect(dump_stub.called).to.be.false;
            expect(storageHelper.__get__("tables")).to.eq(table);
            expect(consoleStub.log.called).to.be.true;
            expect(consoleStub.log.calledWith('ADD_TOPUP_FAILED DUPLICATE_TOPUP') ).to.be.true;

        });
    });

    describe('Get data from storage', () => {

        [ {name: "Subscriptions",
           stored_Table: {
            "Subscriptions": {
                "name": "Subscriptions",
                "nextId": 3,
                "rows": {
                    "1": {
                        "name": "Subscriptions",
                        "Subscription_Type": "MUSIC",
                        "Subscription_Plan": "FREE",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 1
                    },
                    "2": {
                        "name": "Subscriptions",
                        "Subscription_Type": "VIDEO",
                        "Subscription_Plan": "PREMIUM",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 2
                    }
                }
            },
            "TopUps": {
                "name": "TopUps",
                "nextId": 2,
                "rows": {
                    "1": {
                        "name": "TopUps",
                        "TopUp_Plan": "TEN_DEVICE",
                        "Required_number_of_months": "2",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 1
                    }
                }
            }
        }, response: {
            "1": {
                "name": "Subscriptions",
                "Subscription_Type": "MUSIC",
                "Subscription_Plan": "FREE",
                "Start_Date": "2022-02-19T18:30:00.000Z",
                "id": 1
            },
            "2": {
                "name": "Subscriptions",
                "Subscription_Type": "VIDEO",
                "Subscription_Plan": "PREMIUM",
                "Start_Date": "2022-02-19T18:30:00.000Z",
                "id": 2
            }
        }},
        {name: "TopUps",
        stored_Table: {
         "Subscriptions": {
             "name": "Subscriptions",
             "nextId": 3,
             "rows": {
                 "1": {
                     "name": "Subscriptions",
                     "Subscription_Type": "MUSIC",
                     "Subscription_Plan": "FREE",
                     "Start_Date": "2022-02-19T18:30:00.000Z",
                     "id": 1
                 },
                 "2": {
                     "name": "Subscriptions",
                     "Subscription_Type": "VIDEO",
                     "Subscription_Plan": "PREMIUM",
                     "Start_Date": "2022-02-19T18:30:00.000Z",
                     "id": 2
                 }
             }
         },
         "TopUps": {
             "name": "TopUps",
             "nextId": 2,
             "rows": {
                 "1": {
                     "name": "TopUps",
                     "TopUp_Plan": "TEN_DEVICE",
                     "Required_number_of_months": "2",
                     "Start_Date": "2022-02-19T18:30:00.000Z",
                     "id": 1
                 }
             }
         }
     }, response: {
        "1": {
            "name": "TopUps",
            "TopUp_Plan": "TEN_DEVICE",
            "Required_number_of_months": "2",
            "Start_Date": "2022-02-19T18:30:00.000Z",
            "id": 1
        }
    }}].forEach(data => {
            it(`should return ${data.name} from storage`, () => {
                storageHelper.__set__("tables", data.stored_Table);
                const result = JSON.stringify(storageHelper.Subscribed_services.getData(data.name));
              expect(result).to.be.deep.equal(JSON.stringify(data.response));
            });
          });



        [
            {name: "Subscriptions"},
            {name: "TopUps"}
        ].forEach(data => {
            it(`should throw error if ${data.name} are not present in storage`, () => {
                expect(function () {
                    storageHelper.Subscribed_services.getData(data.name);
                  }).to.throw('No ' + data.name + ' available');
            });
          });

        

    });


    describe('Iterate over data in storage', () => {

        const storage_Table = {
            "Subscriptions": {
                "name": "Subscriptions",
                "nextId": 4,
                "rows": {
                    "1": {
                        "name": "Subscriptions",
                        "Subscription_Type": "MUSIC",
                        "Subscription_Plan": "FREE",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 1
                    },
                    "2": {
                        "name": "Subscriptions",
                        "Subscription_Type": "VIDEO",
                        "Subscription_Plan": "PREMIUM",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 2
                    },
                    "3": {
                        "name": "Subscriptions",
                        "Subscription_Type": "PODCAST",
                        "Subscription_Plan": "PREMIUM",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 3
                    }
                }
            },
            "TopUps": {
                "name": "TopUps",
                "nextId": 2,
                "rows": {
                    "1": {
                        "name": "TopUps",
                        "TopUp_Plan": "TEN_DEVICE",
                        "Required_number_of_months": "2",
                        "Start_Date": "2022-02-19T18:30:00.000Z",
                        "id": 1
                    }
                }
            }
        };
        

        const subscriptions_Response = {
            final_renewalMessage: 'RENEWAL_REMINDER MUSIC 10-03-2022'+ '\n' +'RENEWAL_REMINDER VIDEO 10-05-2022'+ '\n' +'RENEWAL_REMINDER PODCAST 10-05-2022', final_renewalAmount: 800
        };

        const topUps_Response = {
            final_renewalMessage: "", final_renewalAmount: 200
        };


        it('should iterate over Subscriptions in storage and return renewal reminder message and renewal amount', () => {
            const callbackFunc = sinon.stub();

            const callback_Result_1 = {renewalMessage: 'RENEWAL_REMINDER MUSIC 10-03-2022', renewalAmount: 0};
            const callback_Result_2 = {renewalMessage: 'RENEWAL_REMINDER VIDEO 10-05-2022', renewalAmount: 500};
            const callback_Result_3 = {renewalMessage: 'RENEWAL_REMINDER PODCAST 10-05-2022', renewalAmount: 300};

            storageHelper.__set__("tables", storage_Table);
            callbackFunc.onCall(0).returns(callback_Result_1);
            callbackFunc.onCall(1).returns(callback_Result_2);
            callbackFunc.onCall(2).returns(callback_Result_3);


            const result = storageHelper.Subscribed_services.iterate('Subscriptions', callbackFunc);

            expect(result).to.be.deep.equal(subscriptions_Response);
            expect(callbackFunc.calledThrice).to.be.true;
            expect(callbackFunc.calledOnceWithExactly(storage_Table.Subscriptions.rows[1]));
            expect(callbackFunc.calledOnceWithExactly(storage_Table.Subscriptions.rows[2]));
            expect(callbackFunc.calledOnceWithExactly(storage_Table.Subscriptions.rows[3]));

        });

        it('should iterate over TopUps in storage and return renewal reminder message and renewal amount', () => {
            const callbackFunc = sinon.stub();

            const callback_Result_1 = {renewalMessage: "", renewalAmount: 200};

            storageHelper.__set__("tables", storage_Table);
            callbackFunc.onCall(0).returns(callback_Result_1);
            const result = storageHelper.Subscribed_services.iterate('TopUps', callbackFunc);

            expect(result).to.be.deep.equal(topUps_Response);
            expect(callbackFunc.calledOnce).to.be.true;
            expect(callbackFunc.calledOnceWithExactly(storage_Table.TopUps.rows[1]));

        });


        [
            {name: "Subscriptions"},
            {name: "TopUps"}
        ].forEach(data => {
            it(`should throw error if ${data.name} are not present in storage`, () => {
                const callbackFunc = sinon.stub();
                expect(function () {
                    storageHelper.Subscribed_services.iterate(data.name, callbackFunc);
                  }).to.throw('No ' + data.name + ' available');
            });
          });
    });

    });

});