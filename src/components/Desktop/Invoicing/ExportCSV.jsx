const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'file.csv',
    header: [
        {id: 'client_id', title: 'client_id'},
        {id: 'dogs_id', title: 'dogs_id'},
        {id: 'date', title: 'date'},
        {id: 'checked_in', title: 'check_in'},
        {id: 'no_show', title: 'no_show'}
    ]
});

const records = [
    {
        client_id: 1,
        dogs_id: 1,
        date: '05-01-2023',
        checked_in: true,
        no_show: false
    },
    {
        client_id: 1,
        dogs_id: 2,
        date: '05-01-2023',
        checked_in: true,
        no_show: false
    },
    {
        client_id: 1,
        dogs_id: 1,
        date: '05-02-2023',
        checked_in: true,
        no_show: false
    },
    {
        client_id: 1,
        dogs_id: 2,
        date: '05-02-2023',
        checked_in: true,
        no_show: false
    },

];
 
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });