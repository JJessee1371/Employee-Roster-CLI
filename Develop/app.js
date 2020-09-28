const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const writeFileAsync = util.promisify(fs.writeFile);


const members = [];
// Prompt for manager information and push the new instance to the members array(only executed once)
async function getManager() {
    try {
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


// Prompt user for emplyee information with choices for including either an intern or engineer
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
            const internQ = await inquirer.prompt([
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

            const intern = new Intern(internQ.name, internQ.id, internQ.email, internQ.school);
            members.push(intern);

            //If user declines to enter more info, the HTML is rendered and written to the output directory
            if(internQ.confirm == true) {
            getEmployee();
            } else {
                console.log(members);
                const html = await render(members);
                await writeFileAsync(outputPath, html);
            };

        } else {
            const engineerQ = await inquirer.prompt([
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

            const engineer = new Engineer(engineerQ.name, engineerQ.id, engineerQ.email, engineerQ.github);
            members.push(engineer);

            //If user declines to enter more info, the HTML is rendered and written to the output directory
            if(engineerQ.confirm == true) {
                getEmployee();
            } else {
                console.log(members);
                const html = await render(members);
                await writeFileAsync(outputPath, html);
            };
        }; 
    } catch(error) {
        console.log(error);
    };
};

getManager();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
