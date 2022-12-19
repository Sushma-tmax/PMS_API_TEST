import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Avatar, Box, Container, Typography } from "@mui/material";
import Profile from "./Profile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Bottom from "./Bottom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Tablets from "./Tablets";


export default function Appr(props:any) {
    const {ratings, appraisal, mutation} = props
  
    return (
        <Container
            sx={{
                position: "relative",
                width: "989px",
                height: "800px",
                background: "#f1f1f1",
            }}
        >
            <Typography variant="h5" color={"#004c75"} sx={{ marginLeft: "50px" }}>
                <ChevronLeftIcon
                    fontSize="large"
                    sx={{
                        position: "absolute",
                        marginLeft: "-30px",
                        marginTop: "0px",
                    }}
                />
                Mid-year Performance Appraisal
            </Typography>
            <Box
                sx={{
                    position: "absolute",
                    background: "#fff",
                    width: "889px",
                    height: "700px",
                    marginLeft: "27px",
                    marginTop: "10px",
                }}
            >
                <Profile appraisalData = {appraisal}/>
                <Typography
                    variant="button"
                    sx={{
                        position: "absolute",

                        // width: "730px",
                        // height: "100px",
                        marginLeft: "813px",
                        marginTop: "10px",
                        fontSize: "10px",
                    }}
                >
                    Auto save
                </Typography>

                <Box
                    sx={{
                        position: "absolute",
                        //  background: "#fcba03",
                        width: "730px",
                        height: "100px",
                        marginLeft: "145px",
                        marginTop: "50px",
                        // justifyContent: "center",
                        // alignItems: "center",
                    }}
                >
                    <Tablets appraiser1Data = {appraisal} ratingsData = {ratings} mutation = {mutation}/>
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        // background: "#fcba03",
                        width: "530px",
                        height: "200px",
                        marginLeft: "170px",
                        marginTop: "150px",
                        justifyContent: "center",
                    }}
                >
                    
                    {/* <Main/> */}
                </Box>

                <Box>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            position: "absolute",

                            // width: "530px",
                            // height: "200px",
                            marginLeft: "750px",
                            marginTop: "445px",
                        }}
                    >
                        <AttachFileIcon /> Attachment
                    </Button>
                </Box>

                <Box marginTop="500px" width='872px' marginLeft='7px'>
                    <hr />
                </Box>

                <Box
                    sx={{
                        //position: "absolute",
                        // background: "#fcba03",
                        width: "889px",
                        height: "70px",
                        marginLeft: "0px",
                        marginTop: "0px",
                        justifyContent: "center",
                    }}
                >
                    {/* <Bottom /> */}
                </Box>
            </Box>
        </Container>
    );
}
