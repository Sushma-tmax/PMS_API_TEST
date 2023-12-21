import * as React from "react";
import { useEffect, useState } from "react";
import Accordion01 from "./Accordion01";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Left1 from "../ReviewerRejection/Icons/Left.svg";
import Right1 from "../ReviewerRejection/Icons/Right.svg";
import Button from "@mui/material/Button";
import { useGetObjectiveTitleQuery } from "../../../service";

const Tablet = styled("div")({
  marginLeft: "25px",
  marginTop: "10px",
  paddingBottom: "15px",
  color: "#3C8BB5",
});
const Typo1 = styled("div")({
  //position: "absolute",
  // marginLeft: "25px",
  // marginTop: "0px",
  fontSize: "20px",
});
const Typo2 = styled("div")({
  //position: "absolute",
  //marginLeft: "60px",
  // marginTop: "8px",
  fontSize: "15px",
});
const Panel = styled("div")({
  "&.MuiBox-root": {
    paddingTop: "0px",
  },
});

const Cancel = styled("div")({
  "& .MuiButton-root": {
    color: "#004C75",
    fontSize: "16px",
    fontWeight: "400",
    textTransform: "none",
  },
  "& .MuiButton-outlined": {
    border: "1px solid #004C75",
    borderRadius: "10px",
    width: "140px",
  },
});
const Left = styled("div")({
  "& .MuiButton-root": {
    color: "#3C8BB5",
  },
});
const Right = styled("div")({
  "& .MuiButton-root": {
    color: "#3C8BB5",
  },
});
const FooterStack = styled("div")({
  marginTop: "30px",
  paddingBottom: "40px",
});

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, paddingTop: "0px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const HeaderTabs = (props: any) => {
  const { employee1Data, rating1Data } = props;
  console.log(employee1Data, "employee1Data");
  const [tabValue, setTabValue] = React.useState(0);
  const [activeObjectiveType, setActiveObjectiveType] = useState(null);
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    React.useState([]);

  console.log(activeObjectiveDescription, "activeObjectiveDescription");

  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
  };

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  useEffect(() => {
    if (employee1Data && objectiveTitleData) {
      setActiveObjectiveDescription(() => {
        return employee1Data.data.reviewer.objective_description.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
            };
          }
        );
      });
    }
  }, [employee1Data, objectiveTitleData]);

  useEffect(() => {
    if (employee1Data) {
      setActiveObjectiveType(
        employee1Data.data.reviewer.objective_type[tabValue].name._id
      );
    }
  }, [tabValue, employee1Data]);

  const filterObjectiveDescription = (data: any) => {
    if (data && activeObjectiveType) {
      console.log(data, "data");
      const res = data.filter((i: any) => {
        // console.log(i.objective_type._id , 'id', valueData);
        return i.name.objective_type === activeObjectiveType;
      });
      // console.log(res, 'descriptions')
      return res;
    }
  };

  const tabNext = () => {
    if (tabValue != employee1Data.data.reviewer.objective_type.length - 1) {
      setTabValue(tabValue + 1);
    }
  };

  const tabPrevious = () => {
    if (
      tabValue != employee1Data.data.reviewer.objective_type.length &&
      tabValue > 0
    ) {
      setTabValue(tabValue - 1);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Tablet>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {employee1Data &&
                employee1Data.data.reviewer.objective_type.map(
                  (objType: any, index: number) => {
                    return <Tab label={objType.name.name} />;
                  }
                )}
            </Tabs>
          </Box>
        </Tablet>

        <Stack
          direction="row"
          alignItems="center"
          marginLeft="25px"
          spacing={2}
        >
          <Typo1> 4.1 </Typo1>
          <Typo2>Exceeds Expectations</Typo2>
        </Stack>
        {employee1Data &&
          activeObjectiveType &&
          activeObjectiveDescription.map((objDesc: any, index: number) => {
            return (
              <Panel>
                <TabPanel value={tabValue} index={index}>
                  {activeObjectiveDescription &&
                    activeObjectiveType &&
                    employee1Data &&
                    filterObjectiveDescription(activeObjectiveDescription).map(
                      (j: any) => {
                        return (
                          <Accordion01
                            objective={j}
                            objectiveDescription={activeObjectiveDescription}
                            setObjectiveDescription={
                              setActiveObjectiveDescription
                            }
                            appraisarObjectiveDescription={
                              employee1Data.data.appraisal.objective_description
                            }
                            rating2Data={rating1Data}
                          />
                        );
                      }
                    )}
                </TabPanel>
              </Panel>
            );
          })}
      </Box>
      <FooterStack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Left>
            {" "}
            <Button
              size="large"
              onClick={() => {
                tabPrevious();
              }}
            >
              <img src={Left1} alt="icon" />
            </Button>
          </Left>
          <Cancel>
            <Button variant="outlined" size="large">
              Cancel
            </Button>
          </Cancel>
          <Right>
            <Button
              size="large"
              onClick={() => {
                tabNext();
              }}
            >
              <img src={Right1} alt="icon" />
            </Button>
          </Right>
        </Stack>
      </FooterStack>
    </>
  );
};

export default HeaderTabs;
