import  moment from 'moment';
import { CommandType } from '../enumerations';
import { subscriptionHelper } from '../helpers/subscription-helper';

let subscription_start_date: moment.Moment;

export const mainProgram = {

    // run program with input from text file

    runProgram: (dataInput: string): void => {   
   
     const dataArray: Array<string> = dataInput.trim().split("\n");
   
     for (let i = 0; i < dataArray.length; i++) {
   
       const inputType: Array<string> = dataArray[i].trim().split(" ");
       
       // Store command(START_SUBSCRIPTION/ADD_SUBSCRIPTION/ADD_TOPUP/PRINT_RENEWAL_DETAILS) from each line of input
       const command = inputType[0];

       switch(command){
        case CommandType.START_SUBSCRIPTION:
            if(inputType.length === 2) {
   
                const [command, start_date] = inputType;
                subscription_start_date = moment(start_date, "DD-MM-YYYY");
    
                if(!subscription_start_date.isValid()){
                    console.log('INVALID_DATE');
                }
            }
            else console.log('Please provide subscription start date in DD-MM-YYYY format');
            break;
        
        case CommandType.ADD_SUBSCRIPTION:
            if(inputType.length === 3) {
   
                const [command, subscriptionType, subscriptionPlan] = inputType;
    
                // Call subscription helper to save Subscription in storage
                subscriptionHelper.add_Subscription(subscriptionType, subscriptionPlan, subscription_start_date);
                
    
            }
            else console.log('Please provide all required details (Subscription Category/Plans)');
            break;

        case CommandType.ADD_TOPUP:
            if(inputType.length === 3) {
   
                const [command, topUpPlan, numberOfMonths] = inputType;
    
                // Call TopUp helper to save TopUp in storage
                subscriptionHelper.add_TopUp(topUpPlan, numberOfMonths, subscription_start_date);
    
            }
            else console.log('Please provide all required details (TopUp Plan/Number of months)');
            break;

        case CommandType.PRINT_RENEWAL_DETAILS:
            subscriptionHelper.print_renewal_details();
            break;

        default:
            console.log('Invalid Command!');
       }
     }
   }
   
   }