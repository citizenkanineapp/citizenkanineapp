## Citizen Kanine App Code samples
### Project Overview
I am submitting several segments of code for review that demonstrate the range of my contributions to a production business application. The Citizen Kanine app is a custom web application built in three phases.
- In the first phase, a team of five (myself included) scoped, designed, and developed the application as a viable business product.
- In the second phase, I worked with a colleague to expand key features of the application and take it into a live production environment. The two features we worked on were integration with the Intuit Quickbooks API, and an interactive maps view.
- In the third phase, I have maintained the application and provided additional feature improvements as the sole developer
- The application uses a Node.js/Express/postgreSQL backend and a React (Saga/Redux) fronted.

The code samples I am sharing below demonstrate several types of contributions to the project I'd like to highlight:

1. Frontend feature development
2. Bugfixes in legacy code
3. Database/SQL-related backend
4. Working with and implementing 3rd party services
5. Collaborative process and design

Sections 1, 2, and 5 showcase how I've worked with other peoples' code. The base code in sections 1 and 2 were initially written by colleagues during phases 1 and 2 of development. Sections 3 and 4 showcase my sole authorship and implementation.

## 1. Refactoring legacy code and frontend feature development
My client asked to me reproduce a function originally performed in the [Route component](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/Route/Route.jsx) in the [MapView component](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/MapView.jsx). I knew I wanted to refactor some of the existing code into a child component and impliment in the MapView. The UI of MapView involves a suite of interacting component state variables. At first I struggled to allocate awareness of these component state variables between MapsView, DogCheckinModal and CheckIn components. My solutions involved refactored existing code for DRY principles and modularity, and writing original functionality that properly handles both the data layer and the component state layer.

### [CheckIn](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/Route/CheckIn.jsx)
- resuable component.
- child of [Route](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/Route/Route.jsx) and [DogCheckinModal](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/DogCheckinModal.jsx)
- lines 19-39: function sets dog status and dispatches to saga function. Saga function updates database.
- lines 41-76: resuable UI
- CheckIn refactored from Route (see [this older branch](https://github.com/citizenkanineapp/citizenkanineapp/blob/OAuth2-setup-sam/src/components/Mobile/Route/Route.jsx) for comparison)
- ^^^ (old branch) lines 73-102: three separate 'set dog status' functions
- ^^^ (old branch) lines 202-235: old UI integrated into component

### [DogCheckinModal](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/DogCheckinModal.jsx)
- Child component of [MapView](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/MapView.jsx). In Mapview, user selects a location pin hovering over client loation on map. This populates a pop-up 'modal' component, DogCheckinModal, which displays dogs in that client's household.
- Imports [Checkin](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/Route/CheckIn.jsx) component
- lines 48-65: function updates checkin status in database for all dogs dispayed in modal.
- lines 67-81: function for responsive UI: changes map-marker icon color based on dog check-in status.
- These two features rely on awareness of React-component state variables passed from MapView.

## 2. Bugfixes in legacy code
This app syncs its database to our client's Quickbooks Online account. My customer noticed that the app was breaking when they were trying to update the database with new customer data from Quickboks, and I discovered a gap in our input validation. My client had forgotten to add 'street' and 'city' data for a new customer. I added input validation and a custom error message to alert user that some customer fields in quickbooks account need updating.

### [quickbooks.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/quickbooks.router.js)
- line 56: function filters customer data in to return to client
- lines 115-134: input validation in after recieving customer data via quickbooks api
- lines 133-13: custom error message sent to [do i even have this file?](https://blah.org)
- lines 230-246: input validation is necessary to get coordinate data via geocoder api

## 3. DB/SQL-related backend
During development phase 1, I wrote the backend logic that queries the postgres database for clients' service record (ie, which dogs were walked on which days) and formatted this data into an invoice. I worked closely with my client to understand their formatting requirements.

### [invoice.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/invoice.router.js)
- lines 17-114: organize SQL query
- lines 118-130: query postgres database
- lines 133-234: restructuring query response data for client display
## 4. API and OAUTH2.0 Implementation
During the second development phase, I led the App's integration with quickbooks API. Part of this was learning OAUTH2.0 protocols and working to implement by adapting a provided SDK/toolkit. The other part was learning to format data objects properly in order to update our clients' account.
### [quickbooks.invoice.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/quickbooks.invoice.router.js)
- lines 33-78: Express functions batch-send invoice data to clients' quickbooks accounts via implementation of OAUTH2.0 protocol
- lines 81-126: function conforms invoice data to [Quickbooks Online API](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice#read-an-invoice)
- lines 95-99: Notes on an interesting API issue I encountered

### [quickbooks.oauth2.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/quickbooks.oauth2.router.js)
- lines 12-57: more implementation of OAUTH2.0 protocols--updating authentiation and refresh tokens.

## 5. Collaborative Process and Design

This section is related to a different project; [Air Quality Spike Alerts](https://github.com/SpikeAlerts). My contributions to this project have been the implementation of cloud hosting solutions and, importantly, project organization. Most of the code displayed here was written by the main developer. However, the structural changes that have been made between the [development repo](https://github.com/SpikeAlerts/SpikeAlerts_Dev) and the current [production version](https://github.com/SpikeAlerts/SpikeAlerts_Heroku) followed directly from my approach setting the project up for production.

### [Initiate database functions](https://github.com/SpikeAlerts/SpikeAlerts_Heroku/blob/main/App/modules/db_init.py)
When I joined the project, the functions that seeded the database with geographic boundaries were organized in [jupyter notebook files](https://github.com/SpikeAlerts/SpikeAlerts_Dev/tree/main/Notebooks/1_Initialize_Database), which are used for data analysis and visualization, not production processes. 
- I organized notebooke function into separate module
- lines 94-105: evalutes whether database needs initialization
- [main script](https://github.com/SpikeAlerts/SpikeAlerts_Heroku/blob/main/App/aq_spikealerts.py) initializes database and runs [main project loop](https://github.com/SpikeAlerts/SpikeAlerts_Heroku/blob/main/App/modules/MAIN.py)

