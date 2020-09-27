const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Recursion will be key to this, wrap the prompt in an if statement that will provide an exit functionality
//whenever the user answers that they would not like to continue.

//Instead of having the entire thing wrapped in a single recursive function, split it into different types of employees
// this way the manager is onlly asked for once and then based on the users choice they can add in another engineer 
//or an intern. 
//Chain events with a .then statement so that the mamager function is always executed before anyting else?


// Write code to use inquirer to gather information about the development team membeers,
// and to create objects for each team member (using the correct classes as blueprints!)

const members = [];

//Prompt for manager information(only executed once)
async function getManager() {
    try{
        const manager = await inquirer.prompt([
            {
                message: "What is the managers name?",
                type: 'input',
                name: 'name'
            },
            {
                message: "What is their ID number?",
                type: 'input',
                name: 'id'
            },
            {
                message: "What is thier email address?",
                type: 'input',
                name: 'email'
            },
            {
                message: 'What is their office phone number?',
                type: 'input',
                name: 'officenumber'
            }
        ]);

        const manager1 = new Manager(manager.name, manager.id, manager.email, manager.officenumber);
        members.push(manager1);

        getEmployee();

    } catch(error) {
        console.log(error);
    };
};


//Prompt for emplyee information with choices for either an intern or engineer
//Recursive function that exits only when the user declines to enter further info
async function getEmployee() {
    try {
        const choice = await inquirer.prompt([
            {
                type: 'list',
                choices: [
                    'Intern',
                    'Engineer'
                ],
                name: 'type'
            },
        ]);

        if(choice.type == 'Intern') {
            const intern = await inquirer.prompt([
                {
                    message: "What is the interns' name?",
                    type: 'input',
                    name: 'name'
                },
                {
                    message: 'What is their ID number?',
                    type: 'input',
                    name: 'id'
                },
                {
                    message: 'What is their email address?',
                    type: 'input',
                    name: 'email'
                },
                {
                    message: 'What school do they attend?',
                    type: 'input',
                    name: 'school'
                },
                {
                    message: 'Would you like to enter another employee?',
                    type: 'confirm',
                    name: 'confirm',
                    default: 'false'
                }
            ]);

            const intern1 = new Intern(intern.name, intern.id, intern.email, intern.school);
            members.push(intern1);

            if(intern.confirm == true) {
            getEmployee();
            } else {
                console.log(members);
            };

        } else {
            const engineer = await inquirer.prompt([
                {
                    message: "What is the engineers' name?",
                    type: 'input',
                    name: 'name'
                },
                {
                    message: 'What is their ID number?',
                    type: 'input',
                    name: 'id'
                },
                {
                    message: 'What is their email address?',
                    type: 'input',
                    name: 'email'
                },
                {
                    message: 'What is their personal GitHub URL?',
                    type: 'input',
                    name: 'github'
                },
                {
                    message: 'Would you like to enter another employee?',
                    type: 'confirm',
                    name: 'confirm',
                    default: 'false'
                }
            ]);

            const engineer1 = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
            members.push(engineer1);

            if(engineer.confirm == true) {
                getEmployee();
            } else {
                console.log(members);
            };
        }; 
    } catch(error) {
        console.log(error);
    };
};

getManager();

// getManager()
// .then(() => {
//     getEmployee();
// })
// .then(() => {
//     console.log(members);
// })
// .catch((err) => {
//     console.log(err);
// });


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
