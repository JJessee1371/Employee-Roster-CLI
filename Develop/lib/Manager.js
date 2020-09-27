// Manager class constructor requires Employee export
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

const e = new Manager('Jon', 123, 'test@test.com', 987654321);

module.exports = Manager;

//Office number property
//getRole will return manager