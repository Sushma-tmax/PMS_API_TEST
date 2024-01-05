import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export default function EmployeeDataTable(props: any) {
    const { data, searchName } = props
    const [rows, setRows] = React.useState([])
    const columns: GridColDef[] = [
        { field: 'employee_code', headerName: 'Emp Code', width: 90 },
        {
            field: 'legal_full_name',
            headerName: 'Employee name',
            width: 150,
            editable: true,
            disableColumnMenu: true,
        },
        {
            field: 'position_long_description',
            headerName: 'Position',
            width: 150,
            editable: true,
            disableColumnMenu: true
        },
        {
            field: 'grade',
            headerName: 'grade',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'section',
            headerName: 'Section',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            // valueGetter: (params: GridValueGetterParams) =>
            //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    //   const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //   ];
    React.useEffect(() => {
        if (searchName != "") {
            const filtered = data?.filter((entry: any) => Object.values(entry).some(val => typeof val === "string" && val.includes(searchName)));
            setRows(filtered)
            // const found = data?.data?.filter((r:any) => dataCode.includes(r.employee_code)).map((k:any) => k._id)
        } else {
            setRows(data)
        }
        // console.log(found, "check");
    }, [searchName, data]);
    console.log(rows, "data")
    return (
        <>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row._id}
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#EAECED",
                        color: "#3E8CB5",
                        fontSize: 14
                    }
                }}
            />
        </>
    )
}