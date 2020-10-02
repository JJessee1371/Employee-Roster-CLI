// Manager class extends Employee
const Employee = require('./Employee');
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    };
    
    getRole() {
        return 'Manager';
    };

    getOfficeNumber() {
        return this.officeNumber;
    };
};

//New instance for testing purposes
const e = new Manager('Jon', 123, 'test@test.com', 987654321);
module.exports = Manager;