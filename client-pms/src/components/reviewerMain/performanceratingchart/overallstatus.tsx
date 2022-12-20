import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useGetEmployeeQuery,useGetEmployeeByFilterQuery } from "../../../service";
import Button from "@mui/material/Button";
import { useState, createContext, useContext, useEffect } from "react";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";


export default function OverallStatus(props: any) {
  const { data: employeeData, isLoading } = useGetEmployeeQuery("all");
  const {data:user} = useLoggedInUser()

  const { setstatusSort, All, setAll } = props;
  console.log(All,'aaaaa')
  const [SortValue, setSortValue] = useState<any>("");
  const [myAppraisals, setMyAppraisals] = useState<any>([]);
  console.log(myAppraisals.length,'myAppraisalsLen')
  // useEffect(() => {
  //   console.log("useeffect run");
  //   if (data) {
  //     setUsers(data.data);
  //     let appraisals = data.data.filter(
  //       (emp: any) => emp.manager_code == user?.employee_code
  //     );
  //     setMyAppraisals(appraisals);
  //     console.log("myappraisals", "appraisals");
  //   }
  // }, []);
  useEffect(() => {
    console.log("useeffect run");
    if (employeeData) {
     
      let appraisals = employeeData.data.filter(
        (emp: any) => emp.manager_code == user?.employee_code
      );
      let reviewer = appraisals.map((i: any) => {
        return employeeData.data.filter((j: any) =>
          j.manager_code == i.employee_code
        )
      }
      ).flat()
      setMyAppraisals(reviewer);

      // console.log("myappraisals", "appraisals");
    }
  }, [employeeData]);

  //b
  const [allActions, setallActions] = React.useState<any>(0);
   const [completedEmp, setcompletedEmp] = React.useState<any>(0);
   const [inprogressEmp, setinprogressEmp] = React.useState<any>(0);
   const [notstartedEmp, setnotstartedEmp] = React.useState<any>(0);
   const [employeeRej, setemployeeRej] = React.useState<any>(0);
   const [mypendingActions, setmypendingActions] = React.useState<any>(0);

   const [users, setUsers] = useState<any>([]);
 

 
  useEffect(() => {
    let length = 0;
    let completedBadge = 0;
    let Inprogress = 0;
    let Notstarted = 0;
    let Emprejected = 0;
    let PendingwithReviewer = 0;
    // myAppraisals.forEach((manager: any) => {
    //   let temp = users.filter(
    //     (emp: any) => emp.manager_code == manager.employee_code
    //   );
    //   length += temp.length;
    //   console.log(temp, "lengthlength");
    //   let temp2 = temp.filter(
    //     (emp: any) => emp.appraisal.status === "completed"
    //   );
    //   completedBadge += temp2.length;
    //   console.log(temp2, "temp2");
    //   let temp3 = temp.filter(
    //     (emp: any) => emp.appraisal.status === "in-progress"
    //   );
    //   Inprogress += temp3.length;
    //   console.log(temp3, "temp3");
    //   let temp4 = temp.filter(
    //     (emp: any) => emp.appraisal.status === "not-started"
    //   );
    //   Notstarted += temp4.length;
    //   console.log(temp4, "temp4");
    //   let temp5 = temp.filter(
    //     (emp: any) => emp.appraisal.status === "rejected"
    //   );
    //   Emprejected += temp5.length;
    //   console.log(temp5, "temp5");
    
      
    // });
    if (myAppraisals) {
    let temp = myAppraisals;
      length += temp.length;
      console.log(temp, "lengthlength");
      let temp2 = temp.filter(
        (emp: any) => emp.appraisal.status === "completed"
      );
      completedBadge += temp2.length;
      console.log(temp2, "temp2");
      let temp3 = temp.filter(
        (emp: any) => emp.appraisal.status === "in-progress" || emp.appraisal.status === "normalized"
      );
      Inprogress += temp3.length;
      console.log(temp3, "temp3");
      let temp4 = temp.filter(
        (emp: any) => emp.appraisal.status === "not-started"
      );
      Notstarted += temp4.length;
      console.log(temp4, "temp4");
      let temp5 = temp.filter(
        (emp: any) => emp.appraisal.status === "rejected"
      );
      Emprejected += temp5.length;
      console.log(temp5, "temp5");
     
     
    };
    setallActions(length);
    setcompletedEmp(completedBadge);
    setinprogressEmp(Inprogress);
    setnotstartedEmp(Notstarted);
    setemployeeRej(Emprejected);
    setmypendingActions(PendingwithReviewer);
  }, [myAppraisals]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const checkAppraisalStatus = (status: string) => {
    return myAppraisals?.filter((item: any) => {
      return item?.appraisal?.status === status;
    })?.length;
  };

  const calculatePercentage = (num: number) => {
    return (num * 100) /myAppraisals?.length;
  };

  console.log(
    calculatePercentage(checkAppraisalStatus("completed")),
    "checkAppraisalStatus"
  );
  const sortFunction = (event: any) => {
    // @ts-ignore
    // console.log(value?.target.value,'valueeees');
    setstatusSort(event?.target.value);
    setSortValue(event?.target.value);
    console.log(SortValue, "valueeeees");
  };
  return (
    <div style={{ paddingBottom: "14px" }}>
      <Box
        sx={{
          // flexGrow: 1,
          backgroundColor: "#fdf9f2",
          // padding: 3,
          marginTop: 3,
          // marginBottom: 3,
          width: "98%!important",
          marginLeft: "13px",
        }}
      >
        {/* #fdf9f2 */}
        {/* <Grid container spacing={1.5}>
          <Grid item xs={2}>
            <Typography
              component="div"
              paddingLeft="13px"
              fontSize="20px"
              fontFamily="regular"
              color="#333333"
            >
              Status
            </Typography>
            <Typography
              gutterBottom
              component="div"
              align="left"
              marginLeft={6}
              fontSize="14px"
              fontFamily="regular"
              color="#333333"
              style={{ opacity: "64%" }}
            >
              {data.data.length} Employees
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              gutterBottom
              component="div"
              align="right"
              // fontWeight={500}
              marginBottom={2}
              marginRight={2}
              paddingTop="18px"
            >
              <span
                style={{
                  color: "#00B050",
                  fontSize: "13px",
                  fontFamily: "regular",
                }}
              >
                <Button variant="text" value='completed' onClick={(event) => { sortFunction(event) }} >
                  COMPLETED
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: 10,
                  fontSize: "18px",
                  color: "#333333",
                  opacity: "80%",
                }}
              >
                {" "}
                {checkAppraisalStatus("completed")}
              </span>
              <span
                style={{
                  paddingLeft: 15,
                  fontSize: 18,
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                ({calculatePercentage(checkAppraisalStatus("completed")).toFixed(2)})%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              gutterBottom
              component="div"
              align="center"
              height={40}
              // fontWeight={500}
              marginBottom={2}
              marginRight={2}
              borderLeft={1}
              borderColor={"#d4d9d6"}
              paddingTop="18px"
            >
              <span
                style={{
                  color: "#F6C609",
                  fontSize: "13px",
                  fontFamily: "regular",
                }}
              >
                <Button variant="text" value="In Progress" onClick={(event) => { sortFunction(event) }} >
                  IN PROGRESS
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: 10,
                  fontSize: "18px",
                  color: "#333333",
                  opacity: "80%",
                }}
              >
                {checkAppraisalStatus("in-progress")}
              </span>
              <span
                style={{
                  paddingLeft: 15,
                  fontSize: 18,
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                ({calculatePercentage(checkAppraisalStatus("in-progress")).toFixed(2)})%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              gutterBottom
              component="div"
              align="center"
              // fontWeight={500}
              marginBottom={2}
              marginRight={2}
              borderLeft={1}
              borderColor={"#d4d9d6"}
              height={40}
              paddingTop="18px"
            >
              <span
                style={{
                  color: "#C00000",
                  fontSize: "13px",
                  fontFamily: "regular",
                }}
              >
                <Button variant="text" value="Not Started" onClick={(event) => { sortFunction(event) }} >
                  NOT STARTED
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: 10,
                  fontSize: "18px",
                  color: "#333333",
                  opacity: "80%",
                }}
              >
                {" "}
                {checkAppraisalStatus("not-started")}
              </span>
              <span
                style={{
                  paddingLeft: 15,
                  fontSize: 18,
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                ({calculatePercentage(checkAppraisalStatus("not-started")).toFixed(2)})%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
               gutterBottom
               component="div"
               align="center"
               height={40}
               // fontWeight={500}
               marginBottom={2}
               marginRight={2}
               borderLeft={1}
               borderColor={"#d4d9d6"}
               paddingTop="18px"
            >
              <span
                style={{
                  color: "#00B050",
                  fontSize: "13px",
                  fontFamily: "regular",
                }}
              >
                <Button variant="text" value='completed' onClick={(event)=>{sortFunction(event)} } >
                 NORMALIZED
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: 10,
                  fontSize: "18px",
                  color: "#333333",
                  opacity: "80%",
                }}
              >
                {" "}
                {checkAppraisalStatus("normalized")}
              </span>
              <span
                style={{
                  paddingLeft: 15,
                  fontSize: 18,
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                ({calculatePercentage(checkAppraisalStatus("normalized")).toFixed(2)})%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
               gutterBottom
               component="div"
               align="center"
               height={40}
               // fontWeight={500}
               marginBottom={2}
               marginRight={2}
               borderLeft={1}
               borderColor={"#d4d9d6"}
               paddingTop="18px"
            >
              <span
                style={{
                  color: "#00B050",
                  fontSize: "13px",
                  fontFamily: "regular",
                }}
              >
                <Button variant="text" value='employee rejected' onClick={(event)=>{sortFunction(event)} } >
                  REJECTED
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: 10,
                  fontSize: "18px",
                  color: "#333333",
                  opacity: "80%",
                }}
              >
                {" "}
                {checkAppraisalStatus("rejected")}
              </span>
              <span
                style={{
                  paddingLeft: 15,
                  fontSize: 18,
                  color: "#333333",
                  opacity: "75%",
                }}
              >
                ({calculatePercentage(checkAppraisalStatus("rejected")).toFixed(2)})%
              </span>
            </Typography>
          </Grid>
        </Grid> */}
        <Grid
          container
          display="flex"
          alignItems="center"
          textAlign="center"
          padding="20px"
          justifyContent="space-between"
          // sx={{ "&.MuiGrid-root": { boxSizing: "content-box" } }}
        >
          {/* <Grid item xs={1.5}>
            <Typography
              component="div"
              // paddingLeft="13px"

              fontSize="20px"
              fontFamily="Arial"
              color="#333333"
              align="left"
              paddingLeft="6px"
            >
              Status
            </Typography>

            <Typography
              component="div"
              align="left"
              // marginLeft={6}

              fontSize="14px"
              fontFamily="Arial"
              color="#333333"
              style={{ opacity: "64%" }}
            >
              <div style={{ paddingLeft: "23px" }}>{data.data.length}</div>
              <div>Employees</div>
            </Typography>
          </Grid> */}
         
          
          <Grid item xs={2.3}>
            <Typography
              gutterBottom
              component="div"
              // align="right"

              // fontWeight={500}

              // marginBottom={2}

              // marginRight={2}

              // borderLeft={1}
              // borderColor={"#d4d9d6"}
              paddingTop="10px"
              whiteSpace="nowrap"
            >
              <span>
                <Button
                  style={{
                    fontSize: "14px",

                    fontFamily: "Arial",
                  }}
                  variant="text"
                  value="completed"
                  onClick={(event) => {
                    sortFunction(event);
                  }}
                >
                  NOT STARTED
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: "0px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "80%",
                }}
              >
                {" "}
                {checkAppraisalStatus("not-started")}
              </span>

              <span
                style={{
                  paddingLeft: "15px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "75%",
                }}
              >
                (
                {calculatePercentage(
                  checkAppraisalStatus("not-started")
                ).toFixed(2)}
                )%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={2.2}>
            <Typography
              gutterBottom
              component="div"
              // align="right"

              // fontWeight={500}

              // marginBottom={2}

              // marginRight={2}

              borderLeft={1}
              borderColor={"#d4d9d6"}
              paddingTop="10px"
              whiteSpace="nowrap"
            >
              <span>
                <Button
                  style={{
                    fontSize: "14px",

                    fontFamily: "Arial",
                  }}
                  variant="text"
                  value="completed"
                  onClick={(event) => {
                    sortFunction(event);
                  }}
                >
                  IN PROGRESS
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: "0px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "80%",
                }}
              >
                {" "}
                {checkAppraisalStatus("in-progress")}
              </span>

              <span
                style={{
                  paddingLeft: "15px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "75%",
                }}
              >
                (
                {calculatePercentage(
                  checkAppraisalStatus("in-progress")
                ).toFixed(2)}
                )%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              gutterBottom
              component="div"
              // align="right"

              // fontWeight={500}

              // marginBottom={2}

              // marginRight={2}

              borderLeft={1}
              borderColor={"#d4d9d6"}
              paddingTop="10px"
              whiteSpace="nowrap"
            >
              <span>
                <Button
                  style={{
                    fontSize: "14px",

                    fontFamily: "Arial",
                  }}
                  variant="text"
                  value="completed"
                  onClick={(event) => {
                    sortFunction(event);
                  }}
                >
                  NORMALIZED
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: "0px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "80%",
                }}
              >
                {" "}
                {checkAppraisalStatus("normalized")}
              </span>

              <span
                style={{
                  paddingLeft: "15px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "75%",
                }}
              >
                (
                {calculatePercentage(
                  checkAppraisalStatus("normalized")
                ).toFixed(2)}
                )%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              gutterBottom
              component="div"
              // align="right"

              // fontWeight={500}

              // marginBottom={2}

              // marginRight={2}

              borderLeft={1}
              borderColor={"#d4d9d6"}
              paddingTop="10px"
              whiteSpace="nowrap"
            >
              <span>
                <Button
                  style={{
                    fontSize: "14px",

                    fontFamily: "Arial",
                  }}
                  variant="text"
                  value="completed"
                  onClick={(event) => {
                    sortFunction(event);
                  }}
                >
                  REJECTED
                </Button>
              </span>

              <span
                style={{
                  paddingLeft: "0px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "80%",
                }}
              >
                {checkAppraisalStatus("rejected")}
              </span>
              <span
                style={{
                  paddingLeft: "15px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "75%",
                }}
              >
                (
                {calculatePercentage(checkAppraisalStatus("rejected")).toFixed(
                  2
                )}
                )%
              </span>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              gutterBottom
              component="div"
              // align="right"

              // fontWeight={500}

              // marginBottom={2}

              // marginRight={2}
              borderLeft={1}
              borderColor={"#d4d9d6"}
              paddingTop="10px"
              whiteSpace="nowrap"
            >
              <span>
                <Button
                  style={{
                    fontSize: "14px",
                    fontFamily: "Arial",
                  }}
                  variant="text"
                  value="completed"
                  onClick={(event) => {
                    sortFunction(event);
                  }}
                >
                  COMPLETED
                </Button>
              </span>
              <span
                style={{
                  paddingLeft: "0px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "80%",
                }}
              >
                {" "}
                {checkAppraisalStatus("completed")}
              </span>

              <span
                style={{
                  paddingLeft: "15px",

                  fontSize: "14px",

                  color: "#333333",

                  opacity: "75%",
                }}
              >
                (
                {calculatePercentage(checkAppraisalStatus("completed")).toFixed(
                  2
                )}
                )%
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
