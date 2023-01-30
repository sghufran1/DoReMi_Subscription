/* eslint-disable prefer-const */
import { utils } from '../helpers/utils';


/*
 * Simulated in-memory database
 */


let tables = {};
let dumpToJsonFile = function() {
	utils.writeFile('./dist/storage/storage.json', JSON.stringify(tables, null, 4));
};

export const Subscribed_services = {
    
/*
 * Reset by removing all tables
 */
reset: function () {
	tables = {};
},


/*
 * Creates a new object of Subscriptions (row in a table)
 */
saveSubscription: function (object) {
	const className = object.getClass().name;
	if(!tables[className]) {
		tables[className] = {
			name: className,
			nextId: 1,
			rows: {}
		};
	}
    const nextId = tables[className].nextId;
    for(let i=1; i<nextId; i++){
        if(tables[className].rows[i].Subscription_Type === object.Subscription_Type) {
            console.log('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY');
			return;
        }

    }
    
	object.id = tables[className].nextId++;
	tables[className].rows[object.id] = object;
	dumpToJsonFile();
},

/*
 * Creates a new object of TopUps (row in a table)
 */
saveTopUp: function (object) {
	const className = object.getClass().name;
	if(!tables[className]) {
		tables[className] = {
			name: className,
			nextId: 1,
			rows: {}
		};
	}
    const nextId = tables[className].nextId;
    for(let i=1; i<nextId; i++){
        if(tables[className].rows[i].TopUp_Plan === object.TopUp_Plan) {
            console.log('ADD_TOPUP_FAILED DUPLICATE_TOPUP');
			return;
        }

    }
    
	object.id = tables[className].nextId++;
	tables[className].rows[object.id] = object;
	dumpToJsonFile();
},

/*
 * Get an object by id from a table
 */
getData: function (className: string) {
	if(!tables[className]) {throw new Error('No ' + className + ' available');}
	return tables[className].rows;
},


/*
 * Iterate through all objects
 */
iterate: function (className: string, callback): {final_renewalMessage: string, final_renewalAmount: number} {
	let final_renewalMessage = "";
	let final_renewalAmount = 0;
	if(!tables[className]) throw new Error('No ' + className + ' available');
	for(let id in tables[className].rows) {
		const {renewalMessage, renewalAmount} = callback(tables[className].rows[id]);
		if(final_renewalMessage === ""){
			final_renewalMessage = final_renewalMessage + renewalMessage;
		}
		else{
			final_renewalMessage = final_renewalMessage + '\n' + renewalMessage;
		}
		final_renewalAmount = final_renewalAmount + renewalAmount;
		
	}
	return {final_renewalMessage: final_renewalMessage, final_renewalAmount: final_renewalAmount};
}

};