# ShahsAccretion

# This Web based Project is made on MEAN Stack Technologies ( MongoDB, Express.js, Angular, Node,js ) and It is more Focused on Front-end (CSS3,BOOTSTRAP4,HTML5)

Managing an Organization for the Director or CEO is the most challenging and tedious work to do. It is a Open Organization Management web application which provides management functionality to any third party Organization and their respective employees.Users can Register,Login & Logout.Organization user can add,view, remove employees, and can also update the profile of the employees. Users can also edit their own profile.Organization user can assign,update,view, delete todo’s to the respective employee to their organization.Organization can manage the Salary-Roles of the employee by adding,updating the salary and roles.Organization and employees can have general announcements and discussion on Forum.Both user can give their Feedback to admin.Employee can view the details of Todos and can mark the task done.Both user can see their finished todos.If User forgets the password then password can be reset by OTP validation through registered email. Admin will be managing all Organization and Employee.


## This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.
## Steps to configure:
1. cd node
2. npm install
3. cd ..
4. npm install

## First install the MongoDb. Start the client and the Server of it on port 27017. Execute following commands.
1. use shah_accretion_db
2. db.createCollection("Organization_Users")
3. db.createCollection("Employee_Users")
4. db.createCollection("Todos")
5. db.Organization_Users.insert({"org_id":0, "name": "DefaultOrganization"})
6. db.Employee_Users.insert({"org_id":0, "name": "DefaultClient"})

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
