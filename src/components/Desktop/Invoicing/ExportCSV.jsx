import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { Button, Box } from "@mui/material";
import dayjs from 'dayjs';
import './CSVLink.css';
// let localeData = require('dayjs/plugin/localeData');
// dayjs.extend(localeData);

const ExportCSV = ({ monthsShort }) => {
    const invoiceItems = useSelector(store => store.invoiceReducer);
    // console.log(invoiceItems);

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
            console.log(item)
            data.push(
                {
                    "InvoiceNo": item.clientid,
                    "Customer": item.first_name + ' ' + item.last_name,
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
        }
    };

    return (
        <Box component="span">
            {invoiceItems && invoiceItems.map &&
                <Button size="small" variant="contained" color="primary" sx={{ mx: 1, mt: 1 }}>
                    <CSVLink
                        headers={headers}
                        data={data}
                        filename={`invoice_${data[0].InvoiceDate}.csv` || null}
                        id='csvButton'
                    >
                        EXPORT
                    </CSVLink>
                </Button>
            }
        </Box>


    )
}

export default ExportCSV;