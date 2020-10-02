// Engineer class extends Employee
const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
    };

    getRole() {
        return 'Engineer';
    };

    getGithub() {
        return this.github;
    };
};

//New instance for testing purposes
const engineer = new Engineer('Jon', 456, 'test@test.com', 'www.stuff.com');
module.exports = Engineer;

