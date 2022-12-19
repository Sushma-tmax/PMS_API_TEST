import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, TablePagination } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button,IconButton } from "@mui/material";
import Expand from "../../assets/Images/Expand.svg";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Newexcel from "../reviewer/Dashboard/Reviewericons/Newexcel.svg";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from '@mui/material/Pagination';
import {Scrollbar} from "react-scrollbars-custom";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import {useGetEmployeeByFilterQuery} from "../../service";
import { useLoggedInUser } from "../../hooks/useLoggedInUser";
import { Link,useNavigate  } from "react-router-dom";

import * as XLSX from "xlsx";
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
export default function TopperformersExpand(props: any) {
  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);
  const SELECT_FOR_DASHBOARD = `employee_code,legal_full_name,position_long_description,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled`
  
  React.useEffect(() => {
  if(user?.calendar?._id !== undefined){
    setappCalId(user?.calendar?._id)
  }
  
}, [user])
  const { data: employeeData } = useGetEmployeeByFilterQuery(
    `?manager_code=${user?.employee_code}&calendar=${appCalId}&limit=600&select=${SELECT_FOR_DASHBOARD}`
  );
  const topPerformerEmployees = () => {
    return employeeData?.data?.slice()?.sort((a:any,b:any) => b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating)?.slice(0,5)
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tablecount, settablecount] = React.useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0)
  const [filData, setfilData] = React.useState<any>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // setPageNumber(pageNumber + 1)
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(()=>{
    const mapped =topPerformerEmployees()?.filter((f:any) => f?.appraisal?.appraiser_rating >= 4).sort((a:any,b:any) => b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating)
    ?.map((j:any) => {
      return { 
        Ecode :j?.employee_code,
      Ename:j?.legal_full_name,
      Position :j?.position_long_description,
      Rating : j?.appraisal?.appraiser_rating
      };
    }
    )
    setfilData(mapped)
    console.log(mapped,"mapped")

  },[employeeData])

 
  const handleExport = () => {
    // console.log(users, "excel");
    // setfilData(topPerformerEmployees)
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filData);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };
  console.log(topPerformerEmployees()?.length,"topPerformerEmployees()?")
  return (
    <Container
    sx={{
      maxWidth: "95% !important",
      width: "100%",
      height: "calc(100vh - 165px)",
      background: "#fff",
      padding:"15px",
      marginTop:"50px"

    }}
    >
      <div>
      <Stack direction="row" alignItems="center" paddingBottom="10px" spacing={1} >
      <IconButton
       onClick={() => {
        navigate(-1)
      }}
      >
          <img  src={Leftarrow} alt="button" />
       </IconButton>
        <Typography
        sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
        >Top Performers</Typography>
         <img
                      src={Newexcel}
                      // style={{float:"right"}}
                      alt="icon"
                      style={{ marginLeft: "80%", marginTop: "5px" ,float:"right",cursor:"pointer"}}
                      onClick={handleExport}
                    />
        </Stack>
        <TableContainer>
          <Scroll>
           <Scrollbar style={{ width: "100%", height: "calc(100vh - 260px)" }}> 
            <Table size="small" aria-label="simple table">
              <TableHead
                style={{ position: "sticky", zIndex: "1000", top: "0px" }}
              >
                <TableRow sx={{ bgcolor: "#eaeced" }}>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Employee Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Position
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                   Rating
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {topPerformerEmployees()?.filter((f:any) => f?.appraisal?.appraiser_rating >= 4).sort((a:any,b:any) => b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating)
       ?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )?.map((i:any) => {

     return(
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderColor: "lightgrey",
                    },
                  }}
                >
                  <TableCell width="1%" align="center">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </TableCell>
                  <TableCell
                  width="30%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      borderColor: "lightgrey",
                      fontSize: "14px",
                      color: "#333333",
                      wordBreak: "break-word",
                    }}
                  >
                    {i?.legal_full_name}
                  </TableCell>
                  <TableCell
                     width="40%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      borderColor: "lightgrey",
                      fontSize: "14px",
                      color: "#333333",
                      wordBreak: "break-word",
                    }}
                  >
                    {i?.position_long_description}
                  </TableCell>
                  <TableCell
                  width="10%"
                    align="center"
                    sx={{
                      fontFamily: "Arial",
                      borderColor: "lightgrey",
                      fontSize: "14px",
                      color: "#52C8F8",
                      wordBreak: "break-word",
                      textDecoration:"underline"
                    }}
                  >
                    {i?.appraisal?.appraiser_rating}
                  </TableCell>
                </TableRow>)})}
              </TableBody>
            </Table>
            </Scrollbar>
          </Scroll>
         
        </TableContainer>
        <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  // count={users.length}
                  count={topPerformerEmployees()?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
          />
        {/* <div style={{display:"flex",justifyContent:"center"}}>
        <Pagination count={5} color="primary" />
        </div> */}
      </div>
    </Container>
  );
}
