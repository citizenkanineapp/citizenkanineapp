import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import { Button, Box } from "@mui/material";

const ExportCSV = () => {
    const invoiceItems = useSelector(store=>store.invoiceReducer);
    console.log(invoiceItems);
  
    const headers = [
        {label: 'InvoiceNo', key: 'InvoiceNo'},
        {label: 'Customer', key: 'Customer'},
        {label: 'InvoiceDate', key: 'InvoiceDate'},
        {label: 'DueDate', key: 'DueDate'},
        {label: 'Item(Product/Service)', key: 'Item(Product/Service)'},
        {label: 'ItemQuantity', key: 'ItemQuantity'},
        {label: 'ItemRate', key: 'ItemRate'},
        {label: 'ItemAmount', key: 'ItemAmount'},
        {label: 'Taxable', key: 'Taxable'},
        {label: 'TaxRate', key: 'TaxRate'}
    ]
    const data = [];
    if (invoiceItems && invoiceItems.map){
        for (let item of invoiceItems) {
            data.push(
                {
                    "InvoiceNo": 1,
                    "Customer": item.first_name + ' ' + item.last_name,
                    "InvoiceDate": item.month + '/' + item.year,
                    "DueDate": item.month + '/' + item.year,
                    "Item(Product/Service)": item.service.service,
                    "ItemQuantity": item.dates.length,
                    "ItemRate": item.service.price,
                    "ItemAmount": item.service.price*item.dates.length,
                    "Taxable": true,
                    "TaxRate": 8.03
                }
            );
        }
    };

    return (
        <Box component="span">
            { invoiceItems && invoiceItems.map &&
                <Button size="large" variant="contained" color="secondary" sx={{mx: 1}}>
                    <CSVLink
                        headers={headers}
                        data={data}
                        filename={`invoice_${data[0].InvoiceDate}.csv`}
                    >
                        EXPORT
                    </CSVLink>
                </Button>
            }
        </Box>
               
            
    )
}

export default ExportCSV;