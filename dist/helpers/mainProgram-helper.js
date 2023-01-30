"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainProgram = void 0;
const moment_1 = __importDefault(require("moment"));
const enumerations_1 = require("../enumerations");
const subscription_helper_1 = require("../helpers/subscription-helper");
let subscription_start_date;
exports.mainProgram = {
    // run program with input from text file
    runProgram: (dataInput) => {
        const dataArray = dataInput.trim().split("\n");
        for (let i = 0; i < dataArray.length; i++) {
            const inputType = dataArray[i].trim().split(" ");
            // Store command(START_SUBSCRIPTION/ADD_SUBSCRIPTION/ADD_TOPUP/PRINT_RENEWAL_DETAILS) from each line of input
            const command = inputType[0];
            switch (command) {
                case enumerations_1.CommandType.START_SUBSCRIPTION:
                    if (inputType.length === 2) {
                        const [command, start_date] = inputType;
                        subscription_start_date = (0, moment_1.default)(start_date, "DD-MM-YYYY");
                        if (!subscription_start_date.isValid()) {
                            console.log('INVALID_DATE');
                        }
                    }
                    else
                        console.log('Please provide subscription start date in DD-MM-YYYY format');
                    break;
                case enumerations_1.CommandType.ADD_SUBSCRIPTION:
                    if (inputType.length === 3) {
                        const [command, subscriptionType, subscriptionPlan] = inputType;
                        // Call subscription helper to save Subscription in storage
                        subscription_helper_1.subscriptionHelper.add_Subscription(subscriptionType, subscriptionPlan, subscription_start_date);
                    }
                    else
                        console.log('Please provide all required details (Subscription Category/Plans)');
                    break;
                case enumerations_1.CommandType.ADD_TOPUP:
                    if (inputType.length === 3) {
                        const [command, topUpPlan, numberOfMonths] = inputType;
                        // Call TopUp helper to save TopUp in storage
                        subscription_helper_1.subscriptionHelper.add_TopUp(topUpPlan, numberOfMonths, subscription_start_date);
                    }
                    else
                        console.log('Please provide all required details (TopUp Plan/Number of months)');
                    break;
                case enumerations_1.CommandType.PRINT_RENEWAL_DETAILS:
                    subscription_helper_1.subscriptionHelper.print_renewal_details();
                    break;
                default:
                    console.log('Invalid Command!');
            }
        }
    }
};
