// Intern class extends Employee
const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
    };

    getRole() {
        return 'Intern';
    };

    getSchool() {
        return this.school;
    };
};

//New instance for testing purposes
const intern = new Intern ('Jon', 123, 'test@test.com', 'University of Utah');
module.exports = Intern;
