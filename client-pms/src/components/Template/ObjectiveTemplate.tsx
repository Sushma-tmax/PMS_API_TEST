import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Alert } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    CREATE_MAPPING,
    EDIT_VIEW_TEMPLATE,
    MASTER_NAV,
} from "../../constants/routes/Routing";
import Scrollbar from "react-scrollbars-custom";
import Edit from "../../assets/Images/Edit.svg";

const ObjectiveTemplate = (props: any) => {
    const { id } = useParams();

    const { templateData, isLoading } = props;
    const [tabValue, setTabValue] = React.useState(0);
    const [activeTab, setActiveTab] = useState("");
    const [templatevalue, settemplateValue] = React.useState(false);
    console.log(tabValue, "tabValue");
    console.log(templateData, "tabValue");

    const navigate = useNavigate();
   
    const templateHandler = () => {
       if(templateData.lenght === 0){
        settemplateValue(true);

       }else{
           //@ts-ignore 
        settemplateValue(false);
        navigate(`${CREATE_MAPPING}/${activeTab}`);
       }
    }

    function a11yProps(index: number) {
        return {
            id: `vertical-tab-${index}`,
            "aria-controls": `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log("handle change run");
        console.log(newValue, "index check");
        setTabValue(newValue);
    };

    useEffect(() => {
        if (templateData) {
            if (id) {
                setTabValue(() => {
                    // @ts-ignore
                    return templateData.templates.findIndex((item) => item._id === id);
                });
            } else {
                return navigate(
                    `${EDIT_VIEW_TEMPLATE}/${templateData.templates[0]._id}`
                );
            }
        }
    }, [templateData, isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>


            <Grid item xs={4}>
                <Box
                    height="calc(100vh - 180px)"
                    border={1}
                    borderColor="#e0e0e0"
                    width={320}
                    marginTop={2}
                    marginLeft="-50px"
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid #e0e0e0",
                        }}
                    >

                        <p
                            style={{
                                color: "#004C75",
                                fontSize: "20px",
                                fontFamily: "regular",
                                marginTop: "5px",
                                // margin: "25px",
                                paddingTop: "15px",
                                paddingLeft: "13px"
                            }}
                        >
                            Templates
                        </p>
                        {templatevalue && <Alert severity="error">
                            There are no templates available
                        </Alert>}


                    </div>
                    <Box
                        sx={{
                            flexGrow: 1,
                            bgcolor: "background.paper",
                            display: "flex",
                        }}
                    >

                        <Scrollbar
                            style={{
                                width: 380,
                                height: "calc(100vh - 315px)",
                                float: "left",
                            }}
                        >
                            <Tabs
                                value={tabValue}
                                onChange={handleChange}
                                orientation="vertical"
                                variant="scrollable"
                                TabIndicatorProps={{
                                    style: {
                                        left: 0,
                                        borderColor: "divider",
                                    },
                                }}
                            >
                                [


                                {templateData &&
                                    templateData.templates.map((i: any, index: any) => {
                                        return (
                                            [

                                                <Tab
                                                    style={{
                                                        textTransform: "none",
                                                        fontSize: "14px",
                                                        fontFamily: "regular",
                                                        float: "left",
                                                        alignItems: "start",
                                                        // display: "flex",
                                                        // justifyContent: "center",
                                                        // flexDirection: "row-reverse",
                                                    }}
                                                    label={i.name}
                                                    // icon={<img src={Edit} alt="icon" />}
                                                    onClick={() => {
                                                        // navigate(`${EDIT_VIEW_TEMPLATE}/${i._id}`);
                                                        setActiveTab(i._id);
                                                      //  navigate(`${CREATE_MAPPING}/${activeTab}`);
                                                      { setTimeout(()=>{ navigate(`${CREATE_MAPPING}/${activeTab}${i._id}`) }, 1000);}
                                                    }}
                                                />

                                            ]
                                        );
                                    })}
                                ]
                            </Tabs>
                        </Scrollbar>
                    </Box>
                    {/* <Link to={`${CREATE_MAPPING}/${activeTab}`}> */}
                        <div
                            style={{
                                position: "absolute",
                                top: "90%",
                                left: "82%",
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <Button
                                style={{
                                    textTransform: "none",
                                    backgroundColor: "#014D76",
                                    fontSize: "16px",
                                    padding: "4px 19px",
                                }}
                                disabled={templatevalue}
                                variant="contained"
                                onClick={templateHandler}
                            >
                                Create Employee Mapping
                            </Button>
                        </div>
                    {/* </Link> */}
                </Box>
            </Grid>
        </>
    );
};

export default ObjectiveTemplate;
