const scheduledDogs =
[
  {"id":4,"monday":true,"tuesday":false,"wednesday":false,"thursday":true,"friday":false,"client_id":4,"route_id":1,"first_name":"Jaimie & Aaron","last_name":"Burk","name":"Juniper","route_name":"Tangletown","dog_id":6},              
  {"id":40,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":40,"route_id":1,"first_name":"Rick & Alicia","last_name":"Reuter","name":"Dexter","route_name":"Tangletown","dog_id":49},            
  {"id":40,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":40,"route_id":1,"first_name":"Rick & Alicia","last_name":"Reuter","name":"Feddie","route_name":"Tangletown","dog_id":96},            
  {"id":40,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":40,"route_id":1,"first_name":"Rick & Alicia","last_name":"Reuter","name":"Cowboy","route_name":"Tangletown","dog_id":48},            
  {"id":48,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":48,"route_id":1,"first_name":"Pia","last_name":"Sass & Kristin Lockhart","name":"Dani","route_name":"Tangletown","dog_id":59},      
  {"id":60,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":false,"client_id":60,"route_id":1,"first_name":"Jenni and Sam","last_name":"Ives","name":"Sadie","route_name":"Tangletown","dog_id":80},                
  {"id":66,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":66,"route_id":1,"first_name":"David & Sharon","last_name":"Johnson","name":"Hank","route_name":"Tangletown","dog_id":87},            
  {"id":69,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":false,"client_id":69,"route_id":1,"first_name":"Kathryn","last_name":"Brumbaugh","name":"Skadi","route_name":"Tangletown","dog_id":92},               
  {"id":3,"monday":true,"tuesday":false,"wednesday":false,"thursday":true,"friday":false,"client_id":3,"route_id":2,"first_name":"Wendy & Nick","last_name":"Brown","name":"Pippa","route_name":"Emerson","dog_id":5},                    
  {"id":15,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":15,"route_id":2,"first_name":"Doug","last_name":"Han & Debra Parisi","name":"Brooklyn","route_name":"Emerson","dog_id":19},            
  {"id":35,"monday":true,"tuesday":true,"wednesday":false,"thursday":true,"friday":true,"client_id":35,"route_id":2,"first_name":"Laura & David","last_name":"Oman","name":"Nalle","route_name":"Emerson","dog_id":42},                   
  {"id":37,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":false,"client_id":37,"route_id":2,"first_name":"Jennifer & Shannon","last_name":"Plourde","name":"StevieP","route_name":"Emerson","dog_id":44},         
  {"id":42,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":42,"route_id":2,"first_name":"Rich & Bill Brown","last_name":"Stephanie","name":"Penny","route_name":"Emerson","dog_id":52},          
  {"id":42,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":42,"route_id":2,"first_name":"Rich & Bill Brown","last_name":"Stephanie","name":"Olive","route_name":"Emerson","dog_id":53},           
  {"id":50,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":50,"route_id":2,"first_name":"Anna & Dan Jankovich","last_name":"Seime","name":"Enzo","route_name":"Emerson","dog_id":61},             
  {"id":71,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":false,"client_id":71,"route_id":2,"first_name":"Shelly","last_name":"GIlbertson","name":"Bear.","route_name":"Emerson","dog_id":94},                 
  {"id":7,"monday":true,"tuesday":false,"wednesday":false,"thursday":false,"friday":true,"client_id":7,"route_id":3,"first_name":"Makea & Tim","last_name":"Duffy","name":"Newmin","route_name":"Far","dog_id":10},                       
  {"id":11,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":false,"client_id":11,"route_id":3,"first_name":"Pamela","last_name":"Gaard","name":"Bobby","route_name":"Far","dog_id":15},                           
  {"id":25,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":25,"route_id":3,"first_name":"Krista & RJ","last_name":"Kern","name":"Cedar","route_name":"Far","dog_id":31},                          
  {"id":28,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":false,"client_id":28,"route_id":3,"first_name":"Rhonda & Jason","last_name":"Lindner","name":"Zuri","route_name":"Far","dog_id":35},                  
  {"id":57,"monday":true,"tuesday":true,"wednesday":false,"thursday":true,"friday":false,"client_id":57,"route_id":3,"first_name":"Gordon","last_name":"Wright","name":"MontyH","route_name":"Far","dog_id":71},                          
  {"id":57,"monday":true,"tuesday":true,"wednesday":false,"thursday":true,"friday":false,"client_id":57,"route_id":3,"first_name":"Gordon","last_name":"Wright","name":"North","route_name":"Far","dog_id":70},                           
  {"id":68,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":false,"client_id":68,"route_id":3,"first_name":"Erin","last_name":"Hart and Ben Langager","name":"Scruffy","route_name":"Far","dog_id":90},             
  {"id":73,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":73,"route_id":3,"first_name":"Megan & Peter","last_name":"Shakow","name":"OllieS","route_name":"Far","dog_id":97},                     
  {"id":8,"monday":true,"tuesday":false,"wednesday":false,"thursday":false,"friday":true,"client_id":8,"route_id":4,"first_name":"Susan & Chase Van Gorder","last_name":"Dunn","name":"Baker","route_name":"Misfits","dog_id":11},        
  {"id":26,"monday":true,"tuesday":true,"wednesday":false,"thursday":true,"friday":false,"client_id":26,"route_id":4,"first_name":"Cindy","last_name":"Kozloff","name":"Stan","route_name":"Misfits","dog_id":32},                        
  {"id":53,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":false,"client_id":53,"route_id":4,"first_name":"Sheila","last_name":"Steichen","name":"Surley","route_name":"Misfits","dog_id":64},                   
  {"id":55,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":55,"route_id":4,"first_name":"Janet","last_name":"Uri","name":"Sherlock","route_name":"Misfits","dog_id":75},                        
  {"id":55,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":55,"route_id":4,"first_name":"Janet","last_name":"Uri","name":"Gnocchi","route_name":"Misfits","dog_id":76},                         
  {"id":56,"monday":true,"tuesday":false,"wednesday":false,"thursday":false,"friday":true,"client_id":56,"route_id":4,"first_name":"Betsy & Jim","last_name":"Wyvell","name":"Clarice","route_name":"Misfits","dog_id":69},               
  {"id":62,"monday":true,"tuesday":false,"wednesday":false,"thursday":false,"friday":true,"client_id":62,"route_id":4,"first_name":"Miranda & Tom Johnson","last_name":"Hong","name":"Cookie","route_name":"Misfits","dog_id":83},        
  {"id":64,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":false,"client_id":64,"route_id":4,"first_name":"Ruth","last_name":"Dunn","name":"Declan","route_name":"Misfits","dog_id":91},                         
  {"id":67,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":67,"route_id":4,"first_name":"Ricki","last_name":"Thompson","name":"Zora","route_name":"Misfits","dog_id":88},                       
  {"id":1,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":false,"client_id":1,"route_id":5,"first_name":"Andrea & Jeremy","last_name":"Abbs","name":"Millie","route_name":"Unassigned","dog_id":2},                
  {"id":1,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":false,"client_id":1,"route_id":5,"first_name":"Andrea & Jeremy","last_name":"Abbs","name":"Lulu","route_name":"Unassigned","dog_id":1},                  
  {"id":23,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":23,"route_id":5,"first_name":"Jennifer","last_name":"Jorgensen","name":"Indie","route_name":"Unassigned","dog_id":102},                
  {"id":23,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":23,"route_id":5,"first_name":"Jennifer","last_name":"Jorgensen","name":"Ollie","route_name":"Unassigned","dog_id":28},                 
  {"id":33,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":33,"route_id":5,"first_name":"Mike & Suzanne","last_name":"O'Brien","name":"RosieO","route_name":"Unassigned","dog_id":40},          
  {"id":45,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":45,"route_id":5,"first_name":"Val & Craig","last_name":"Ritacco","name":"Vita","route_name":"Unassigned","dog_id":56},               
  {"id":46,"monday":true,"tuesday":false,"wednesday":true,"thursday":false,"friday":true,"client_id":46,"route_id":5,"first_name":"Andrew & Michelle Sullivan","last_name":"Rosen","name":"Sully","route_name":"Unassigned","dog_id":57}, 
  {"id":47,"monday":true,"tuesday":true,"wednesday":false,"thursday":false,"friday":true,"client_id":47,"route_id":5,"first_name":"Laura","last_name":"Russ","name":"Basil","route_name":"Unassigned","dog_id":58},                       
  {"id":49,"monday":true,"tuesday":true,"wednesday":true,"thursday":true,"friday":true,"client_id":49,"route_id":5,"first_name":"Nate","last_name":"Scott","name":"HazelS","route_name":"Unassigned","dog_id":60},                        
  {"id":61,"monday":true,"tuesday":false,"wednesday":false,"thursday":true,"friday":true,"client_id":61,"route_id":5,"first_name":"Will","last_name":"Cottrell","name":"Frenchy","route_name":"Unassigned","dog_id":81},                 
  {"id":65,"monday":true,"tuesday":false,"wednesday":false,"thursday":true,"friday":true,"client_id":65,"route_id":5,"first_name":"Sarah & Manse","last_name":"Mitchell","name":"Loki","route_name":"Unassigned","dog_id":86},            
  {"id":72,"monday":true,"tuesday":true,"wednesday":false,"thursday":true,"friday":false,"client_id":72,"route_id":5,"first_name":"Teresa","last_name":"Thein","name":"Irving","route_name":"Unassigned","dog_id":95}
]

const scheduleAdjustments =
  [
    {"id":1185,"dog_id":15,"client_id":11,"date_to_change":"2024-03-22","is_scheduled":true,"date":"2024-02-05","name":"Bobby","route_id":3},     
    {"id":1274,"dog_id":19,"client_id":15,"date_to_change":"2024-03-22","is_scheduled":false,"date":"2024-02-16","name":"Brooklyn","route_id":2}, 
    {"id":1445,"dog_id":31,"client_id":25,"date_to_change":"2024-03-22","is_scheduled":false,"date":"2024-03-18","name":"Cedar","route_id":3},    
    {"id":1352,"dog_id":35,"client_id":28,"date_to_change":"2024-03-22","is_scheduled":true,"date":"2024-03-04","name":"Zuri","route_id":3},      
    {"id":1436,"dog_id":59,"client_id":48,"date_to_change":"2024-03-22","is_scheduled":false,"date":"2024-03-14","name":"Dani","route_id":1},     
    {"id":1440,"dog_id":81,"client_id":61,"date_to_change":"2024-03-22","is_scheduled":false,"date":"2024-03-18","name":"Frenchy","route_id":5}, 
    {"id":1425,"dog_id":88,"client_id":67,"date_to_change":"2024-03-22","is_scheduled":false,"date":"2024-03-11","name":"Zora","route_id":4},     
    {"id":1486,"dog_id":97,"client_id":73,"date_to_change":"2024-03-22","is_scheduled":false,"date":"2024-03-22","name":"OllieS","route_id":3}, 
    {"id":1470,"dog_id":102,"client_id":23,"date_to_change":"2024-03-22","is_scheduled":false,"date":"2024-03-20","name":"Indie","route_id":5}
  ]


const fillScheduled = (dogArray) => {
    let dogList = dogArray.map(dog => ({
           dog_id: dog.dog_id,
           client_id: dog.client_id,
           name: dog.name,
           id: dog.id,
           route_id: dog.route_id,
           client_first_name: dog.first_name,
           client_last_name: dog.last_name,
           route_name: dog.route_name
       }));
       const sortedDogList = dogList.sort((a, b) => {
           const nameA = a.client_last_name.toUpperCase(); // Ignore case during sorting
           const nameB = b.client_last_name.toUpperCase();
           // console.log(nameA, nameB);
           const dogNameA = a.name.toUpperCase(); // Ignore case during sorting
           const dogNameB = b.name.toUpperCase();
         
           if (nameA < nameB) {
             return -1;
           }
         
           if (nameA > nameB) {
             return 1;
           }
         
           if (dogNameA < dogNameB) {
               return -1;
           }
           
           if (dogNameA > dogNameB) {
               return 1;
           }
           // Names are equal
           return 0;
       });
       return sortedDogList;
   };

   // BELOW sorts dogs by client
   // const fillScheduled = (dogArray) => {
   //     let dogList = dogArray.map(dog => ({
   //         dog_id: dog.dog_id,
   //         client_id: dog.client_id,
   //         name: dog.name,
   //         id: dog.id,
   //         route_id: dog.route_id,
   //         client_first_name: dog.first_name,
   //         client_last_name: dog.last_name,
   //         route_name: dog.route_name
   //     }));
       
   //     let idArray = dogArray.map(dog => dog.client_id);

   //     //this filters out duplicate IDs
   //     let uniqueIds = [...new Set(idArray)]

   //     //this groups result.rows by id
   //     const group = dogList.reduce((acc, item) => {
   //         // console.log(acc)
   //         if (!acc[item.client_id]) {
   //             acc[item.client_id] = [];
   //         }
   //         acc[item.client_id].push(item);
   //         return acc;
   //     }, {})

   //     let clients = uniqueIds.map(clientId => {
   //         let dogsForClient = group[clientId];
       
   //         const { client_last_name, client_first_name, route_id, route_name } = dogsForClient[0];
   //         const client = { client_last_name, client_first_name, client_id: clientId, route_id, route_name };
       
   //         client.dogs = dogsForClient.map(({ name, id }) => ({ name, id }));
           
   //         return client;
   //     });
   //     return clients;
   // }
   const getAdjustedSchedule = (scheduledDogs, scheduleAdjustments) => {
    // taking out the dog_id's from the cancellations to quickly find the dogs that need to be removed.
    const cancellations = scheduleAdjustments
        .filter(item => item.is_scheduled === false)
        .map(item => item.dog_id);
    // adjustedDogs is the original dog array MINUS the canceled dogs for the day. there is a possibility for duplicate values to end up in additions!
    const adjustedDogs = scheduledDogs.filter(item => !cancellations.includes(item.dog_id));
    // here are the dogs that were added for the day that typically might not be scheduled
    const additions = scheduleAdjustments.filter(item => item.is_scheduled === true);
    // returns TRUE if id matches dog.dog_id in adjustedDogs
    const checkDogId = (id, array) => {
        return array.some(dog => dog.dog_id === id);
    }
    for (let item of additions) {
        if (!checkDogId(item.dog_id,adjustedDogs)) {
            adjustedDogs.push(item);
        }
    }
    return adjustedDogs;
}
       if (scheduleAdjustments < 1 ) {
           
           const dogsScheduledForDay = fillScheduled(scheduledDogs);
           console.log(dogsScheduledForDay[0].dogs)
       } else {
           const adjustedDogs = getAdjustedSchedule(scheduledDogs,scheduleAdjustments);
           console.log(adjustedDogs.length);
           dogsScheduledForDay = fillScheduled(adjustedDogs);
          //  console.log('DOGS FOR DAY!', dogsScheduledForDay);
          console.log('dogsScheduled!');
           // res.sendStatus(201);

       }