import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircuarProgressbar from "./circularprogressbar";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import BarChartUsing from "./barchart";
import {
   useGetEmployeeByFilterQuery,
} from "./../../../service";

import { Stack } from "@mui/material";
function StatusBar() {
  // const { data: employeeData, refetch } = useGetEmployeeQuery("all");
  //const {data: data2} = useGetEmployeeByFilterQuery("?manager_code=\"1038\"")
  const {data: data2} = useGetEmployeeByFilterQuery(`?select=appraisal.status,employee.employee_agree&limit=800`)

  console.log(data2,'data2')
  const [users, setUsers] = useState<any>([]);
  const [completed, setcompleted] = React.useState<any>(0);
  const [inprogress, setinprogress] = React.useState<any>(0);
  const [mediation, setMediation] = React.useState<any>(0);
  console.log(users,'rejectedusers')
  useEffect(() => {
    console.log("useeffect run");
    if (data2) {
      // let temp = employeeData.data.filter((data: any) => data.manager_code == "1038")
      setUsers(data2?.data);
      console.log(data2, "temp")
    }
  }, [data2]);

//old code
// useEffect(() => {
//   console?.log("useeffect run");
//   let temp = users?.filter((data: any) => {
//     console?.log(data?.appraisal?.status,'ddddddd')
//   return( data?.appraisal?.status == "completed" )

// })
//   console?.log(temp,temp?.length,'useeffect temp')
//   setcompleted(temp?.length)
//   let temp2 = users?.filter((data: any) => data?.appraisal?.status == "rejected" )
//   console?.log(temp2,temp2?.length,'useeffect temp2')
//   setinprogress(temp2?.length)
//   let temp3 = users?.filter((data: any) => data?.employee?.employee_agree === true  )
//   console?.log(temp3,temp3?.length,'useeffect temp3')
//   setMediation(temp3?.length)
// }, [data2]);

//count
  const checkAppraisalStatus = (status: string) => {
    return data2?.data?.filter((item: any) => {
      return item?.appraisal?.status === status;
    }).length;
  };
  const checkAppraisalinProgressStatus = () => {
    return data2?.data?.filter((item: any) => {
      return item?.employee?.employee_agree === true
    }).length;
  };
  console.log(
      checkAppraisalStatus("completed"),'checkcheck'
  );

  return (
      <div>
        <Container sx={{ marginTop: 3 }} maxWidth="xl">
          <Box sx={{ flexGrow: 1, bgcolor: "#fff" }}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <BarChartUsing />
              </Grid>
              <Grid item xs={2} sx={{ borderLeft: 1, borderColor: "#d4d9d6",paddingTop:"30px !important" }}>
                <Stack alignItems="center">
                  <Typography
                      align="center"
                      // fontWeight={500}
                      marginBottom={2}
                      marginRight={2}
                      fontSize="14px"
                      fontFamily="Arial"
                      color="#333333"
                  >
                    Employee Rejections
                  </Typography>
                  <Stack direction="column" alignItems="end">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography
                          align="center"
                          // fontWeight={400}
                          // marginRight={2}
                          color="#00B050"
                          fontFamily="Arial"
                          fontSize="12px"
                      >
                        Completed
                      </Typography>
                      <label
                          style={{
                            color: "#00B050",
                            fontFamily: "Arial",
                            fontSize: "12px",
                          }}
                      >
                        {checkAppraisalStatus("completed")}
                      </label>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography
                          gutterBottom
                          component="div"
                          align="center"
                          // fontWeight={400}
                          // marginRight={2}
                          color="#F6C609"
                          fontFamily="Arial"
                          fontSize="12px"
                      >
                        In progress
                      </Typography>
                      <label
                          style={{
                            color: "#F6C609",
                            fontFamily: "Arial",
                            fontSize: "12px",
                          }}
                      >
                        {" "}
                        {checkAppraisalStatus("rejected")}


                      </label>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography
                          gutterBottom
                          component="div"
                          align="center"
                          // fontWeight={400}
                          // marginRight={2}
                          color="#C00000"
                          fontFamily="Arial"
                          fontSize="12px"
                      >
                        In mediation
                      </Typography>
                      <label
                          style={{
                            color: "#C00000",
                            fontFamily: "Arial",
                            fontSize: "12px",
                          }}
                      >
                        {/* {mediation} */}
                        {checkAppraisalinProgressStatus()}
                      </label>
                    </Stack>
                  </Stack>
                  {/* <div> */}
                  {/* <Stack direction="row" justifyContent="center" alignItems="center" gap="20px" > */}
                  {/* <Typography
                align="center"
                color="#00B050"
                fontFamily="Arial"
                fontSize="12px"
              >
                Completed
              </Typography> */}
                  {/* <Typography
              align="center"
                color="#00B050"
                fontFamily="Arial"
                fontSize="12px">
               {checkAppraisalStatus("completed")}
                </Typography> */}
                  {/* </Stack> */}
                  {/* <Stack direction="row" justifyContent="center" alignItems="center" gap="20px" > */}

                  {/* <Typography
                align="center"
                color="#F6C609"
                fontFamily="Arial"
                fontSize="12px"
              >
                In progress

              </Typography> */}
                  {/* <Typography
              align="center"
                color="#F6C609"
                fontFamily="Arial"
                fontSize="12px"
              >

                 {checkAppraisalStatus("in-progress")}
              </Typography> */}

                  {/* </Stack> */}
                  {/* <Stack direction="row" justifyContent="center" alignItems="center" gap="20px" > */}

                  {/* <Typography
                align="center"
                color="#C00000"
                fontFamily="Arial"
                fontSize="12px"
              >
              In mediation

              </Typography> */}
                  {/* <Typography
              align="center"
              color="#C00000"
              fontFamily="Arial"
              fontSize="12px"
              >
                 {mediation}
                 </Typography> */}
                  {/* </Stack>
                 </div> */}
                </Stack>
              </Grid>
              <Grid item xs={2} style={{display:"flex",justifyContent:"center"}}>
                <CircuarProgressbar />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
  );
}
export default StatusBar;
