## Citizen Kanine App Code samples
I am submitted several segmens of code to review. the segment corresponds to a feature spread across multiple files. Below is a simplified directory structure, in case this helpful. specific files submitted for review are marked with ******
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
### SQL query
#### [invoice.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/invoice.router.js)
- lines 17-114: organize SQL query
- lines 118-130: query postgres database
- lines 133-234: restructuring query response data for client display
### API and OAUTH2.0 Implementation
#### [quickbooks.invoice.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/quickbooks.invoice.router.js)
- lines 33-78: batch-send invoice data to clients' quickbooks accounts via implementation of OAUTH2.0 protocol
- lins 81-126: function conforms invoice data to [Quickbooks Online API](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice#read-an-invoice)

#### [quickbooks.oauth2.router](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/server/routes/quickbooks.oauth2.router.js)
- lines 12-57: implementation of OAUTH2.0 protocols
## React Frontend
### Refactoring for modularity
My client asked to me reproduce a function originally performed in the [Route component](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Route/Route.jsx) in the [MapView component](https://github.com/citizenkanineapp/citizenkanineapp/blob/main/src/components/Mobile/MapView/MapView.jsx). I knew I wanted to refactor some of the existing code into a child component and impliment in the MapView. The UI of MapsView requires a suite of interacting state variables, and at first I struggled to allocate awareness of these state variables between MapsView, DogCheckinModal and CheckIn components.
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
- These two features rely on 
