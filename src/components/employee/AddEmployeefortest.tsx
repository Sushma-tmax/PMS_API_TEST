import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Container, TableHead, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Employeelisttable from "../PaMaster/employeeMaster/Employeelisttable";
import PAMaster from '../../components/UI/PAMaster'
import { useGetEmployeeQuery } from "../../service";
import EmployeeDataTable from "./employeeTable/EmpTable";
import TableSearch from "./employeeTable/TableSearch";

// import DataTable, { TableColumn } from 'react-data-table-component';
// import e from "express";
// import {DataTable} from "primereact/datatable";
// import {Column} from 'primereact/column'
// import { FilterMatchMode, FilterOperator } from 'primereact/api';
// import { CustomerService } from '../service/CustomerService';

function Item(props: BoxProps) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) => (theme.palette.mode === "dark" ? "black" : "black"),

        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 1,
        fontSize: "1.1rem",
        fontWeight: "100",
        height: "80px",
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
      {...other}
    />
  );
}

export default function AddEmployeefortest() {
  const { data } = useGetEmployeeQuery("all");
  console.log(data, "jjjjjjj")
  const [value, setValue] = React.useState(0);
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  // const [data, setData] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState([])
  const [tableData, setTableData] = useState([])
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  //@ts-ignore
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (data) {
      // setDivision(data?.data)
      setDivision(() => {
        return data?.data?.map((i: any) => {
          return {
            ...i,
            Ecode: i?.employee_code
          }
        })
      })
      setFilter(() => {
        return data?.data?.map((i: any) => {
          return {
            ...i,
            Ecode: i?.employee_code
          }
        })
      })
    }
  }, [data])
  console.log(division, "division")
  console.log(division, "ecode")
  const [searchName, setSearchName] = React.useState("");

  //   const [globalFilterValue2, setGlobalFilterValue2] = useState('');
  //   const [filters2, setFilters2] = useState({

  //     'Ecode': { value: null, matchMode: FilterMatchMode.IN },
  //     'EmployeeName': { value: null, matchMode: FilterMatchMode.EQUALS },

  // });
  React.useEffect(() => {
    if (data != undefined)
      setTableData(data?.data)
    // console.log(found, "check");
  }, [data]);


  return (
    <>
      <PAMaster name={"Employee Master"} />
      <Box
        sx={{
          //   maxWidth:"95% !important",
          // width: "100%",
          height: "calc(100vh - 200px)",
          backgroundColor: "#fff",
          marginLeft: "25px",
          marginRight: "25px",
          padding: "20px"

        }}
      >
        <TableSearch          
          setSearchName={setSearchName}
        />
        {tableData != undefined &&
          <EmployeeDataTable
            data={tableData}
            searchName={searchName}
          ></EmployeeDataTable>
        }






        {/* <div className="card">

           <DataTable
        //    header={header2}
           value={division}
           responsiveLayout="scroll"
           paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
           dataKey="id"
           paginator
           emptyMessage="No data found."
           className="datatable-responsive"
           currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"
           rows={10}
           >
            <Column field="Ecode"  header="Ecode"></Column>
            <Column field="legal_full_name"  header="EmployeeName"></Column>
            <Column field="first_name"  header="FirstName"></Column>
            <Column field="position_long_description"  header="Position"></Column>
            //  <Column field= {isSupervisor != undefined ? "SP" : "N-SP"} sortable header="Ecode"></Column> 
            <Column field="attachmen"  header="Grade"></Column>
            <Column field="service_reference_date"  header="service_reference_date"></Column>
            <Column field="position_code"  header="PositionCode"></Column>
            <Column field="division"  header="Division"></Column>
           <Column field= {["sub section"]} sortable header="SubSection"></Column> 
            <Column field="section"  header="Section"></Column>
            <Column field="manager_code"  header="ManagerCode"></Column>
            {/* <Column field="manager_name"  header="ManagerName"></Column>
            <Column field="manager_position"  header="ManagerPosition"></Column>
            <Column field="work_location"  header="WorkLocation"></Column>
            <Column field="grade_set"  header="GradeSet"></Column>
            <Column field="job_code"  header="JobCode"></Column>
            <Column field="job_title"  header="JobTitle"></Column>
            <Column field="job_level"  header="JobLevel"></Column> 
           </DataTable>
</div> */}

        {/* <DataTable
          title="Table"
          columns={columns}
          data={dataa}
          // selectableRows
          // onSelectedRowsChange={handleRowSelected}
          // clearSelectedRows={toggleCleared}
          pagination
          defaultSortFieldId={2}
          highlightOnHover
          subHeader
          subHeaderComponent={
          <input type={"text"}
           placeholder={"search"}
          value={search}
          // onChange={()=>setSearch(e.target.value)}
          />}
        /> */}
      </Box>
    </>
  );
}
