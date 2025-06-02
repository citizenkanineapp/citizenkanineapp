import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { Button, Box } from "@mui/material";
import dayjs from 'dayjs';
import './CSVLink.css';
import { Oval } from "react-loader-spinner";
// let localeData = require('dayjs/plugin/localeData');
// dayjs.extend(localeData);

// Component creates invoice object.
//invoice objects can be downloaded as CSV, OR used to create QB invoices directly via the api/qb_services endpoint 

const ExportCSV = ({ monthsShort }) => {
    const dispatch = useDispatch();
    const invoiceItems = useSelector(store => store.invoiceReducer);
   // console.log(invoiceItems);
   const [loading, setLoading] = useState(false);

    const headers = [
        { label: 'InvoiceNo', key: 'InvoiceNo' },
        { label: 'Customer', key: 'Customer' },
        { label: 'InvoiceDate', key: 'InvoiceDate' },
        { label: 'DueDate', key: 'DueDate' },
        { label: 'Item(Product/Service)', key: 'Item(Product/Service)' },
        { label: 'Description', key: 'Description' },
        { label: 'ItemQuantity', key: 'ItemQuantity' },
        { label: 'ItemRate', key: 'ItemRate' },
        { label: 'ItemAmount', key: 'ItemAmount' },
        { label: 'Taxable', key: 'Taxable' },
        { label: 'TaxRate', key: 'TaxRate' }
    ]
    const data = [];
    if (invoiceItems && invoiceItems.map) {
        for (let item of invoiceItems) {
            // data object exported as CSV
            data.push(
                {
                    "InvoiceNo": item.clientid,
                    "Customer": item.first_name + ' ' + item.last_name,
                    "Email": item.email,
                    "InvoiceDate": dayjs().format('MM/DD/YYYY'),
                    "DueDate": dayjs().add(1, 'month').format('MM/DD/YYYY'),
                    "Item(Product/Service)": item.service.service,
                    "Description": `${monthsShort[invoiceItems[0].month - 1]}: ${item.dates.map(date => (date))}`,
                    "ItemQuantity": item.dates.length,
                    "ItemRate": item.service.price,
                    "ItemAmount": item.service.price * item.dates.length,
                    "Taxable": 'Y',
                    "TaxRate": '8.03%'
                }
            );
            // item in invoiceItems sent in POST request to quickbooks for invoice creation
            item.description = `${monthsShort[invoiceItems[0].month - 1]}: ${item.dates.map(date => (date))}`;
        }
    };

    const exportToQB = (e) => {
        // setLoading(true)
        dispatch({type: 'CREATE_QB_INVOICE', payload: invoiceItems })
    }

    return (
        <Box component="span">
            {invoiceItems && invoiceItems.map &&
            <>
            <Box sx={{display: 'block'}} >
                <Button size="small" variant="contained" color="primary" sx={{ mx: 1, mt: 1 }}>
                    <CSVLink
                    headers={headers}
                    data={data}
                    filename={`invoice_${data[0].InvoiceDate}.csv` || null}
                    id='csvButton'
                    >
                        EXPORT CSV
                   </CSVLink>
                </Button>
                <Button 
                    onClick={(e) => exportToQB(e)}
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ mx: 1, mt: 1 }}
                    // disabled={loading}
                    >
                        EXPORT QB
                </Button>
            </Box>
            </>
            }
        </Box>


    )
}

export default ExportCSV;