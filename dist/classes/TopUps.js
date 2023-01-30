"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopUps = void 0;
const storage_1 = require("../storage/storage");
function TopUps(name, plan, numberOfMonths, startDate) {
    this.name = name;
    this.TopUp_Plan = plan;
    this.Required_number_of_months = numberOfMonths;
    this.Start_Date = startDate;
}
exports.TopUps = TopUps;
TopUps.prototype.getClass = function () {
    return TopUps;
};
TopUps.prototype.save = function () {
    storage_1.Subscribed_services.saveTopUp(this);
};
