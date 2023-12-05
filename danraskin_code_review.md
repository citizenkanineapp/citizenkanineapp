## Citizen Kanine App Code samples
### Project Overview
This Citizen Kanine web application is a custom business applicationas built in three phases.
- In the first phase, a team of five (myself included) scoped, designed, and developed the application as a viable business product.
- In the second phase, I worked with a colleague to expand key features of the application and take it into a live production environment. The two features we worked on were integration with the Intuit Quickbooks API, and an interactive maps view.
- In the third phase, I have maintained the application and provided additional feature improvements as the sole developer
- The application uses a Node.js/Express/postgreSQL backend and a React (Saga/Redux) fronted.

I am submitting several segments of code to review that demonstrate the range of my contributions to this project. The features I am highlighting are spread across multiple files. Below is a simplified directory structure. I have included files mentioned in my descriptions below or in the code notes. The specific files submitted for review are marked with ******.
```
├── server
│   ├── modules
│   │   ├── pool.js
│   │   ├── tools.js
│   ├── routes
│   │   ├── quickbooks.invoice.router.js *****
│   │   ├── quickbooks.oauth2.router.js ****
│   │   ├── invoice.router.js *****
│   ├── server.js   
├── src
│   ├── components
│   │   ├── Mobile
│   │   │   ├── MapView
│   │   │   │   ├── MapView.jsx
│   │   │   │   ├── DogCheckinModal.jsx *****
│   │   │   ├── Route
│   │   │       ├── CheckIn.jsx *****
│   │   │       ├── Route.jsx *****
│   │   ├── Redux
│   │   │   ├── sagas
│   │   │   │   ├── routes.saga.js
│   ├── index.js
```

## Express Backend
This section showcases my sole authorship of several backend features.  
### SQL query
During initial team development phase of this application, I wrote the backend logic that queried the postgres database for clients' service record (which dogs walked on which days) and formatted this data into an invoice. I worked closely with my client to understand their formatting requirements.

#### [invoice.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/invoice.router.js)
- lines 17-114: organize SQL query
- lines 118-130: query postgres database
- lines 133-234: restructuring query response data for client display
### API and OAUTH2.0 Implementation
During the second development phase, I led the App's integration with quickbooks API. Part of this was learning OAUTH2.0 protocols and working to implement by adapting a provided SDK/toolkit. The other part was learning to format data objects properly in order to update our clients' account.
#### [quickbooks.invoice.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/quickbooks.invoice.router.js)
- lines 33-78: Express functions batch-send invoice data to clients' quickbooks accounts via implementation of OAUTH2.0 protocol
- lines 81-126: function conforms invoice data to [Quickbooks Online API](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice#read-an-invoice)
- lines 95-99: Notes on an interesting API issue I encountered

#### [quickbooks.oauth2.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/quickbooks.oauth2.router.js)
- lines 12-57: more implementation of OAUTH2.0 protocols--updating authentiation and refresh tokens.

## React Frontend
This section showcases how I've worked with other peoples' code. The base code in these sections were initially written by colleagues during phases 1 and 2 of development. I began working on these components after my client requested a number of feature improvements in the maps and dog check-in views. I have written some original functions, but mostly adapted and refactored existing code for modularity, functionality, and readability/cleanliness.

### Refactoring for modularity
My client asked to me reproduce a function originally performed in the [Route component](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Route/Route.jsx) in the [MapView component](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/MapView.jsx). I was not the original author of the code in this part of the application.
I knew I wanted to refactor some of the existing code into a child component and impliment in the MapView. The UI of MapView involves a suite of interacting state variables. At first I struggled to allocate awareness of these state variables between MapsView, DogCheckinModal and CheckIn components.
#### [CheckIn](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Route/CheckIn.jsx)
- resuable component.
- child of [Route](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Route/Route.jsx) and [DogCheckinModal](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/DogCheckinModal.jsx)
- lines 19-39: function sets dog status and dispatches to saga function. Saga function updates database.
- lines 41-76: resuable UI
- CheckIn refactored from [Route](https://github.com/citizenkanineapp/citizenkanineapp/blob/OAuth2-setup-sam/src/components/Mobile/Route/Route.jsx) (see this older branch for comparison)
- ^^^ lines 73-102: set dog status functions
- ^^^ lines 202-235: old UI

#### [DogCheckinModal](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/DogCheckinModal.jsx)
- Child component of [MapView](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/MapView.jsx). In Mapview, user selects a location pin hovering over client loation on map. This populates a pop-up 'modal' component, DogCheckinModal, which displays dogs in that client's household.
- Imports [Checkin](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/Route/CheckIn.jsx) component
- lines 48-65: function changes checkin status all dogs for given client.
- lines 67-81: function for responsive UI: changes map-marker icon color based on dog check-in status.
- These two features rely on awareness of React state variables passed from MapView.
