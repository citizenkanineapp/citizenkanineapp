![REPO SIZE](https://img.shields.io/github/repo-size/citizenkanineapp/citizenkanineapp?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/citizenkanineapp/citizenkanineapp?style=flat-square)
![FORKS](https://img.shields.io/github/forks/citizenkanineapp/citizenkanineapp?style=social)

## Getting Started:


### Installation


Using your package manager - install the dependencies

```
$ ~ npm install
```
In your database manager - create a database named `citizen_kanine` use the provided database.sql file to create the necessary tables for this project. 
*(We have included optional dummy data for testing purposes)*

Populate dotEnv file with:

> SERVER_SESSION_SECRET= 'string'
> map_api_key= 'string'
> CLOUDINARY_NAME= 'string'
> CLOUDINARY_API_KEY= 'string'
> CLOUDINARY_API_SECRET= 'string'

With your database set up - start the server.
```
$ ~ npm run server
```

With the server running - open another terminal window and start your client.

Navigate to http://localhost:3000 if the run client script doesn't automatically open the application.

```
$ ~ npm run client
```

Since the app is not client facing at this time - there is no registration page. You will have to add an account through a `SQL INSERT` in your database manager.

## Built With:

*  [React.js](https://reactjs.org/docs/getting-started.html)
*  [Node.js](https://nodejs.org/en/docs/)
* [Material-UI](https://mui.com) - components and styling
* [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) - Drag and Drop functionality for mobile view
* [Day.js](https://day.js.org) - Time Utility
* [SweetAlert](https://sweetalert.js.org) - Visual feedback for users
* [Passport](https://www.passportjs.org) - Secure Login & Account Management

*For a full list of dependencies - see the Package.json*

## Screen Shots

  ![](/ScreenShots/Landing.png)

## Usage

  This application is meant to serve as a business management tool for Citizen Canine. It is meant to handle client, and employee scheduling - as well as client invoicing.  The next sections will walk you through the tools at your disposal in each view. 

### Desktop *(Admin Dashboard)*

 1. **Log In** - when logging in on a desktop using admin level credentials users will be brought to a desktop 'Splash Page'
 2. **Splash Page** - a Home Screen for the desktop experience, contains a notes section to help keep admin organized. Also includes a collapsible sidebar which allows for convenient site navigation.
 3. **Employee Management 'Pack Leaders'** - enter this view through the sidebar -  in this view admin is able to add/edit/delete employees, as well as modify and view their schedules.  Adding an employee will generate an account with their email as the username, and a temporary password.
 4. **Clients** -  enter this view through the sidebar - in this view admin can add/edit/delete clients as well as their dogs. There is also a search function to help access a specific client quickly. Also allows for schedule viewing and editing. 
 5. **Reports** -  enter this view through the sidebar - an invoicing tool for admins to select relevant data and export a CSV file to import into Quickbooks.
 6. **Account** - a form for admin to change their password.

### Mobile *(Employee View)*

 1. **Log In** - employees and admins can log in on a mobile device to access the mobile features. 
 2. **Splash Page** -  quick navigation page for relevant tools, as well as a bottom navigation bar to access these tools.

**Dogs in this section may contain 'flags' which tell the employee there may be a relevant note about the dog and its behavior.**

 3. **Routes / Route Select** - accessing routes through the provided navigation tools will lead users to a view showing the assigned dogs for a given day, and their default route distribution. **Admin** level users will have a button to access load balancing. Once routes are set for the day - users simply click their assigned route to view the details. 
 4. **Load Balancing** -  a tool for Admin level users to distribute dogs amongst their daily employees using a drag and drop interface. If a household has multiple dogs - they are grouped and have a matching background color. (Section contains flags)
 5. **Route Screen** -  once routes are set, and a user selects their assigned route on the route select page and is brought to a list view with tools for route management. Clicking on a line in the list of dogs will reveal the options available for a user. Here employees are able to mark a dog as 'checked in' or a 'no show', which will in turn update their list visually marking said dog off of the list. In this view, Admin level users are able to cancel a dog at no charge - in case they were accidentally still on the schedule for a given day. Clicking on a dog photo or avatar on the left side of the list will bring a user to Dog Details. (Section contains flags)
 6. **Dog Details** - this view shows relevant information for a specific dog and their client. Here is a centralized location for access protocols for client homes, notes on dog needs, emergency contact information, as well as photo upload for dog identification. (Section contains flags)
 7. **Account** - a form for users to change their password.

## Developer Notes

#### Quickbooks API/flexible invoice output

  Given the opportunity to revisit this project - we would be interested in exploring Quickbooks API integration especially for Client Data and Invoice Item sync so that any changes made app-side will reflect on Quickbooks.

  App does not allow customization of CSV output. Currently, dog walking history is formatted by server in invoice.router.js and sent to client. Invoice is itemized by invoice period (month), client, and service provided. Dog walking services are indexed in the "services" SQL table (database.SQL), and referenced by "id" in invoice.router.js.

  App currently determines service provided to customer based on number of days scheduled listed per client in "client_schedule" table AND number of dogs walked per day of service. Prices are currently fixed in the table. If Citizen Kanine needs to adjust their prices or services, a Quickbooks sync function could update the "service" table based on Quickbooks 'items' list. Depending on the type of changes, it would be important to preserve service "id" position in "services" table.

  Another possible solution is to add an updatable services menu, and to allow admin user to link customer directly to a 'base service' in on the 'client details' page. The advantage of these approaches would be A) allow admin user to interact with services list in the app and B) allow admin user to select 'friend and family' rate for a given customer.

  A third change to invoicing functionality would be to bypass CSV export and directly create invoices using Quickbooks API.

  The two hurdles with quickbooks integration are:
  1) setting up two-factor authentication with Citizen Kanine account.
  2) building a sandbox company with sample dataset and datastructure as close to the Citizen Kanine buisness account as possible

#### Mapping routes and dog location
  While we started exploring mapping for this project, it unfortunately did not fit into our timeline - this is a feature we think would be incredibly helpful for a visual of routes (for load balancing, and navigation). (Map API's / Providers listed below)

  some effort towards mapping routes has been made in the 'map' branch. In this branch:
  - "clients" table includes "lat" and "long" fields.
  - add new and update client routes automatically populates table with coorinate data based on address (MapTiler).
  - SQL queries in mobile.router need to updated to select "lat" and "long" for each client.
  
  Another area for exploration would be to attempt to develop step by step route directions for the employee - providing a streamlined pickup process for their morning. 

## Authors & Acknowledgement

Thanks to [Cloudinary](https://cloudinary.com) whose API supplied image upload capabilities for multiple parts of this application.

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped us make this application a reality.

Special thanks to the services that made the start of our Map display development possible:

 - [Radar](https://radar.com) - for Geo Coding
 - [MapTiler](https://www.maptiler.com) 
 - [Pigeon Maps](https://pigeon-maps.js.org) - React Maps

  
test
  
