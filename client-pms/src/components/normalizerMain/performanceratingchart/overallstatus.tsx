import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
    useGetEmployeeQuery,
    useGetEmployeeByFilterQuery,
} from "../../../service";
import Button from "@mui/material/Button";
import { useState, createContext, useContext, useEffect } from "react";
import { Stack } from "@mui/material";
export default function OverallStatus(props: any) {
    // const { data, isLoading } = useGetEmployeeQuery("all");
    const { data: employeeData,isLoading } = useGetEmployeeByFilterQuery(
        `?select=appraisal.status&limit=800`
    );
    const { setstatusSort } = props;
    const [SortValue, setSortValue] = useState<any>("");
    // @ts-ignore
    // const { statusSort, setstatusSort} = useAppraisalContext()

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const checkAppraisalStatus = (status: string) => {
        return employeeData?.data?.filter((item: any) => {
            return item.appraisal.status === status;
        }).length;
    };

    const calculatePercentage = (num: number) => {
        return (num * 100) / employeeData?.data?.length;
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
                <Grid
                    padding="20px"
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                    container
                    justifyContent="space-between"
                    // sx={{"&.MuiGrid-root" : { boxSizing: "content-box"

                    // }}}
                    // spacing={1}
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
                    {/* <Grid item xs={2}>
            <Typography
              gutterBottom
              component="div"
              // align="center"
              // height={40}
              // // fontWeight={500}
              // marginBottom={2}
              // marginRight={2}
              borderLeft={1}
              borderColor={"#d4d9d6"}
              paddingTop="18px"
            >
              <Stack
              direction="row"
              >
              <span
              >
                <Button
                style={{
                  fontSize: "13px",
                  fontFamily: "Arial",
                }}
                  variant="text"
                  value="In Progress"
                  onClick={(event) => {
                    sortFunction(event);
                  }}
                >
                  IN PROGRESS
                </Button>
              </span>
              <div>
              <span
                style={{
                  paddingLeft: "0px",
                  fontSize: "18px",
                  color: "#333333",
                  opacity: "80%",
                }}
              >
                {checkAppraisalStatus("in-progress")}
              </span>
              <span
                style={{
                  paddingLeft: "15px",
                  fontSize: "18px",
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
              </div>
              </Stack>
            </Typography>
          </Grid> */}
                    {/* <Grid item xs={2}>
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
                <Button
                  variant="text"
                  value="Not Started"
                  onClick={(event) => {
                    sortFunction(event);
                  }}
                >
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
                (
                {calculatePercentage(
                  checkAppraisalStatus("not-started")
                ).toFixed(2)}
                )%
              </span>
            </Typography>
          </Grid> */}
                    {/* <Grid item xs={2}>
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
                <Button
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
                (
                {calculatePercentage(
                  checkAppraisalStatus("normalized")
                ).toFixed(2)}
                )%
              </span>
            </Typography>
          </Grid> */}
                    {/* <Grid item xs={2}>
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
                <Button
                  variant="text"
                  value="rejected"
                  onClick={(event) => {
                    sortFunction(event);
                  }}
                >
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
                (
                {calculatePercentage(checkAppraisalStatus("rejected")).toFixed(
                  2
                )}
                )%
              </span>
            </Typography>
          </Grid> */}
                </Grid>
            </Box>
        </div>
    );
}
