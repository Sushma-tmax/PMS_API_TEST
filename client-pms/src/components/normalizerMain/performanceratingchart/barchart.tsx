import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress, {
    linearProgressClasses,
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { useGetEmployeeByFilterQuery, useGetEmployeeQuery } from "../../../service";
import { styled } from "@mui/material/styles";


const Text = styled("div")({
    "& .MuiLinearProgress-determinate": {
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#ffffff",

            borderRadius: 1,
            height: "20px",
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 1,
            backgroundColor: "#C00000",
        },
    },
});
const Text2 = styled("div")({
    "& .MuiLinearProgress-determinate": {
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#ffffff",

            borderRadius: 1,
            height: "20px",
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 1,
            backgroundColor: "#EE8A1E",
        },
    },
});
const Text3 = styled("div")({
    "& .MuiLinearProgress-determinate": {
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#ffffff",

            borderRadius: 1,
            height: "20px",
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 1,
            backgroundColor: "#00B050",
        },
    },
});
const Text4 = styled("div")({
    "& .MuiLinearProgress-determinate": {
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#ffffff",

            borderRadius: 1,
            height: "20px",
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 1,
            backgroundColor: "#00B0F0",
        },
    },
});
const Text5 = styled("div")({
    "& .MuiLinearProgress-determinate": {
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#ffffff",

            borderRadius: 1,
            height: "20px",

        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 1,
            backgroundColor: "#004C75",
        },
    },
});

function LinearProgressWithLabel(
    props: JSX.IntrinsicAttributes & LinearProgressProps
) {

    const { data, isLoading } = useGetEmployeeByFilterQuery(`?limit=800&select=appraisal.appraiser_rating`);
    // const { data, isLoading } = useGetEmployeeQuery("all");
    const checklengthinRange = (min: number, max: number) => {
        return (
            (data?.data?.filter((item: any) => {
                    console.log(item.appraisal.appraiser_rating, "appraisal_rating3");
                    return (
                        item.appraisal.appraiser_rating >= min &&
                        item.appraisal.appraiser_rating <= max
                    );
                }).length *
                100) /
            data?.data?.length
        );
    };

    if (isLoading) {
        return <p>Loading </p>;
    }
    console.log(checklengthinRange(1, 1.99), "data3");
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <Box sx={{ width: "50px", mr: 1 }}> */}
            {/* <Box sx={{ mr: 4 }}> */}
            <div
                style={{
                    width: "50px"
                }}>
                <LinearProgress
                    variant="determinate"
                    value={checklengthinRange(2.5,2.99)}
                    // value={40}
                /> </div>
            {/* </Box> */}
            {/* <Box sx={{ minWidth: 35 }}> */}
            <div>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    checklengthinRange(2.5,2.99)
                )}`}</Typography>
            </div>
            {/* </Box> */}

        </Box>
    );
}
function LinearProgressWithLabel2(
    props: JSX.IntrinsicAttributes & LinearProgressProps
) {

    const { data, isLoading } = useGetEmployeeByFilterQuery(`?limit=800&select=appraisal.appraiser_rating`);
    // const { data, isLoading } = useGetEmployeeQuery("all");
    const checklengthinRange = (min: number, max: number) => {
        return (
            (data?.data?.filter((item: any) => {
                    console.log(item.appraisal.appraiser_rating, "appraisal_rating1");
                    return (
                        item.appraisal.appraiser_rating >= min &&
                        item.appraisal.appraiser_rating <= max
                    );
                }).length *
                100) /
            data?.data?.length
        );
    };

    if (isLoading) {
        return <p>Loading </p>;
    }
    return (
        <>
            {/* <Box sx={{ display: "flex", alignItems: "center" }}> */}
            <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <div
                    style={{
                        width: "50px"
                    }}>
                    {/* <Box sx={{ mr: 4 }}> */}
                    <LinearProgress
                        variant="determinate"
                        value={checklengthinRange(1, 1.99)}
                        // value={40}
                    /></div>
                {/* </Box> */}
                {/* <Box sx={{ minWidth: 35 }}> */}
                <div><Typography variant="body2" color="text.secondary">{`${Math.round(
                    checklengthinRange(1, 1.99)
                )}`}</Typography></div>
                {/* </Box> */}

            </Box>
        </>
    );
}
function LinearProgressWithLabel3(
    props: JSX.IntrinsicAttributes & LinearProgressProps
) {

    const { data, isLoading } = useGetEmployeeByFilterQuery(`?limit=800&select=appraisal.appraiser_rating`);
    // const { data, isLoading } = useGetEmployeeQuery("all");
    const checklengthinRange = (min: number, max: number) => {
        return (
            (data?.data?.filter((item: any) => {
                    console.log(item.appraisal.appraiser_rating, "appraisal_rating2");
                    return (
                        item.appraisal.appraiser_rating >= min &&
                        item.appraisal.appraiser_rating <= max
                    );
                }).length *
                100) /
            data?.data?.length
        );
    };

    if (isLoading) {
        return <p>Loading </p>;
    }
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* <Box sx={{ width: "50px", mr: 1 }}> */}
                <div style={{
                    width:"50px"
                }}>
                    <LinearProgress
                        variant="determinate"
                        value={checklengthinRange(2, 2.49)}
                        // value={40}
                    /></div>
                <div>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        checklengthinRange(2, 2.49)
                    )}`}</Typography></div>
            </Box>
        </>
    );
}
function LinearProgressWithLabel4(
    props: JSX.IntrinsicAttributes & LinearProgressProps
) {


    const { data, isLoading } = useGetEmployeeByFilterQuery(`?limit=800&select=appraisal.appraiser_rating`);
    // const { data, isLoading } = useGetEmployeeQuery("all");
    const checklengthinRange = (min: number, max: number) => {
        return (
            (data?.data?.filter((item: any) => {
                    console.log(item.appraisal.appraiser_rating, "appraisal_rating4");
                    return (
                        item.appraisal.appraiser_rating >= min &&
                        item.appraisal.appraiser_rating <= max
                    );
                }).length *
                100) /
            data?.data?.length
        );
    };

    if (isLoading) {
        return <p>Loading </p>;
    }
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* <Box sx={{ , mr: 1 }}> */}

                <div style={{width:"50px"}}>
                    <LinearProgress
                        variant="determinate"
                        value={checklengthinRange(3, 3.49)}
                        // value={40}
                    /></div>
                <div> <Typography variant="body2" color="text.secondary">
                    {`${Math.round(
                        checklengthinRange(3, 3.49)
                    )}`}
                    {/* {40} */}
                </Typography>
                </div>

            </Box>
        </>
    );
}
function LinearProgressWithLabel5(
    props: JSX.IntrinsicAttributes & LinearProgressProps
) {
    const { data, isLoading } = useGetEmployeeByFilterQuery(`?limit=800&select=appraisal.appraiser_rating`);
    // const { data, isLoading } = useGetEmployeeQuery("all");
    const checklengthinRange = (min: number, max: number) => {
        return (
            (data?.data?.filter((item: any) => {
                    console.log(item.appraisal.appraiser_rating, "appraisal_rating5");
                    return (
                        item.appraisal.appraiser_rating >= min &&
                        item.appraisal.appraiser_rating <= max
                    );
                }).length *
                100) /
            data?.data?.length
        );
    };

    if (isLoading) {
        return <p>Loading </p>;
    }
    return (
        <>
            {/* <Box sx={{ display: "flex", alignItems: "center" }}> */}
            <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                {/* <Box sx={{  mr: 4 }}>  */}
                <Stack
                    direction="row"
                >
                    <div
                        style={{ width: "50px" }}
                    >
                        <LinearProgress
                            variant="determinate"
                            value={checklengthinRange(3.5, 3.99)}
                            // value={20}
                        />
                        {/* {5666} */}
                    </div>
                    <div> <Typography variant="body2" color="text.secondary">
                        {`${Math.round(
                            checklengthinRange(3.5, 3.99)
                        )}`}
                    </Typography></div>

                </Stack>
                {/* </Box> */}
                {/* <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(
            checklengthinRange(5, 5)
          )}`}
          </Typography>
        </Box> */}
            </Box>
        </>
    );
}

export default function LinearWithValueLabel5() {
    return (
        <Box sx={{ width: "100%" }}>
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
                marginTop="40px"
            >
                <Text>
                    <LinearProgressWithLabel2 />
                </Text>
                <Text2>
                    <LinearProgressWithLabel3 />
                </Text2>
                <Text3>
                    {" "}
                    <LinearProgressWithLabel />
                </Text3>
                <Text4>
                    <LinearProgressWithLabel4 />
                </Text4>
                <Text5>
                    <LinearProgressWithLabel5 />
                </Text5>
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
                marginTop="40px"
            >
                <div>
                    <p
                        style={{
                            justifyContent: "right",
                            fontSize: "16px",
                            color: "#333333",
                            opacity: "75%",
                        }}
                    >
                        1 - 1.99
                    </p>
                </div>
                <span>
          <p
              style={{
                  justifyContent: "right",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
              }}
          >
            2 - 2.49
          </p>
        </span>
                <span>
          <p
              style={{
                  justifyContent: "right",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
              }}
          >
            2.5 - 2.99
          </p>
        </span>
                <span>
          <p
              style={{
                  justifyContent: "right",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
              }}
          >
            3 - 3.49
          </p>
        </span>
                <span>
          <p
              style={{
                  justifyContent: "right",
                  fontSize: "16px",
                  color: "#333333",
                  opacity: "75%",
              }}
          >
            3.5 - 3.99
          </p>
        </span>
            </Stack>
        </Box>
    );
}
