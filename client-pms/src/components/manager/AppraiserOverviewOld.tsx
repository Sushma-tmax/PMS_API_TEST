import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IconButton, TextField } from "@mui/material";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Stack from "@mui/material/Stack";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import RemoveIcon from "@mui/icons-material/Remove";
import { AnyRecord } from "dns";
import { AnyArray } from "immer/dist/internal";
import { useDeleteRatingScaleMutation } from "../../service/ratings/ratings";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: any;
}

function TabPanel(props: TabPanelProps) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AppraiserOverviewOld = (props: any) => {
  const { otherData, trainingData, feedBackData, employeeData } = props;
  console.log(employeeData, "0000000");

  const [tabValue, setTabValue] = React.useState<any>(1);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("handle change run");
    console.log(newValue, "index check");
    setTabValue(newValue);
  };
  // console.log(objectiveType[tabValue]._id, 'objectiveType  iddd')

  const tabClickHandler = (index: number) => {
    console.log(index, "clicked");
    console.log(activeIndex);
  };

  const [value, setValue] = React.useState();
  const [trainingDataValue, setTrainingDataValue] = React.useState("");

  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    console.log("useeffect run");
    if (otherData) {
      setUsers(otherData.data);
    }
  }, [otherData]);

  const handleOnCheck = (e: any) => {
    const { name, checked } = e.target;

    const tempUser = users.map((OtherData: any) => {
      return OtherData._id === name
        ? { ...OtherData, isChecked: checked }
        : OtherData;
    });
    setUsers(tempUser);
    console.log(tempUser, "temp");
  };

  const checkboxHandler = (checkbox: any[]) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      const check = res.map((i: any) => {
        return i._id;
      });
      return check;
    }
  };

  useEffect(() => {
    //@ts-ignore
    console.log(checkboxIdHandler(checkboxHandler(users)));
  }, [users]);

  const [specificActionList, setSpecificActionList] = useState([
    { specificAction: "" },
  ]);

  const handleSpecificAdd = () => {
    setSpecificActionList([...specificActionList, { specificAction: "" }]);
  };

  const handleSpecificRemove = (index: any) => {
    const newSpecificActionList = [...specificActionList];
    newSpecificActionList.splice(index, 1);
    setSpecificActionList(newSpecificActionList);
  };

  const handleSpecificChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const newSpecificActionList = [...specificActionList];
    // @ts-ignore
    newSpecificActionList[index][name] = value;
    setSpecificActionList(newSpecificActionList);
  };

  const handleChangeTemp = (event: any) => {
    setValue(event.target.value);
  };

  const handleSelectChange = (event: any) => {
    setTrainingDataValue(event.target.value as string);
    console.log(trainingDataValue, "``````````````````````````");
  };

  const [formValues, setFormValues] = useState([
    { dropSelect: "", name: "", justification: "" },
  ]);

  const handleTrainingChange = (i: any, e: any) => {
    const newFormValues = [...formValues];
    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    console.log(newFormValues, "hi");
  };

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      { dropSelect: "", name: "", justification: "" },
    ]);
  };

  const removeFormFields = (i: any) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const Dropdown = () => {
    const handleSelectChange = (event: any) => {
      setTrainingDataValue(event.target.value as string);
    };

    return (
      <FormControl fullWidth>
        <Select
          autoWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={trainingDataValue}
          label="select"
          onChange={handleSelectChange}
        >
          {trainingData &&
            trainingData.data.map((TrainingData: any) => {
              return [
                <MenuItem value={TrainingData._id}>
                  {TrainingData.title}
                </MenuItem>,
              ];
            })}
        </Select>
      </FormControl>
    );
  };

  return (
    <>
      <Container>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {employeeData &&
            employeeData.data.appraisal.objective_type.map(
              (objType: any, index: number) => {
                return <Tab label={objType.name.name} />;
              }
            )}
        </Tabs>

        {employeeData &&
          employeeData.data.appraisal.objective_type.map(
            (objDesc: any, index: number) => {
              return (
                <TabPanel value={tabValue} index={index}>
                  {employeeData.data.appraisal.objective_type[tabValue]
                    .objective_description.length > 0 &&
                    employeeData.data.appraisal.objective_type[
                      tabValue
                    ].objective_description.map((j: any) => {
                      return (
                        <Stack direction="row" justifyContent="space-between">
                          <div>
                            <p> {j.name.description}</p>
                            <p> {j.name.detailed_description}</p>
                          </div>
                          <div>
                            <p> {j.ratings.rating}</p>
                          </div>
                        </Stack>
                      );
                    })}
                </TabPanel>
              );
            }
          )}
      </Container>

      <Container>
        <Container>
          <h2>Performance Feedback Summary</h2>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Overall Feedback"
            variant="outlined"
            inputProps={{ maxLength: 256 }}

          />
          <Grid margin={3} container spacing={4}>
            <Grid item xs={6}>
              <TextareaAutosize
                style={{ width: 400, height: 200 }}
                aria-label="Area(s) of Improvement (if any) "
                placeholder="Add area(s) of improvement "
              />
            </Grid>
            <Grid item xs={6}>
              {specificActionList &&
                specificActionList.map((singleSpecificActionList, index) => (
                  <>
                    <Stack direction="row" spacing={2} margin={3}>
                      <TextField
                        id="outlined-basic"
                        label="Add specific action(s)"
                        variant="outlined"
                        name="specificAction"
                        key={index}
                        value={singleSpecificActionList.specificAction}
                        inputProps={{ maxLength: 256}}

                        onChange={(e) => handleSpecificChange(e, index)}
                      />
                      {specificActionList.length - 1 === index &&
                        specificActionList.length < 4 && (
                          <IconButton onClick={handleSpecificAdd}>
                            <AddCircleRoundedIcon />
                          </IconButton>
                        )}
                      {specificActionList.length !== index + 1 && (
                        <IconButton onClick={() => handleSpecificRemove(index)}>
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </>
                ))}
            </Grid>
          </Grid>
          <IconButton>
            <AddRoundedIcon />
          </IconButton>
          Add
          <h3>Training Recommendation(s)</h3>
          {formValues.map((element, index) => (
            <Stack
              direction="row"
              justifyContent="space-evenly"
              spacing={2}
              margin={3}
            >
              <Select
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={trainingDataValue}
                label="select"
                name="dropSelect"
                value={element.dropSelect || ""}
                onChange={(e) => handleTrainingChange(index, e)}

                // onChange={handleSelectChange}
              >
                {trainingData &&
                  trainingData.data.map((TrainingData: any) => {
                    return [
                      <MenuItem value={TrainingData._id}>
                        {TrainingData.title}
                      </MenuItem>,
                    ];
                  })}
              </Select>

              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter Training Name"
                variant="outlined"
                name="name"
                value={element.name || ""}
                inputProps={{ maxLength: 256 }}

                onChange={(e) => handleTrainingChange(index, e)}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter your Justification"
                variant="outlined"
                name="justification"
                value={element.justification || ""}
                inputProps={{ maxLength: 256 }}

                onChange={(e) => handleTrainingChange(index, e)}
              />

              <IconButton onClick={() => addFormFields()}>
                <AddCircleRoundedIcon />
              </IconButton>
              {index ? (
                <IconButton onClick={() => removeFormFields(index)}>
                  <RemoveIcon />
                </IconButton>
              ) : null}
            </Stack>
          ))}
          <h3>Other Recommendation(s)</h3>
          <Stack direction="row" justifyContent={"space-between"}>
            {users &&
              users.map((OtherData: any) => {
                return (
                  <div>
                    <input
                      name={OtherData._id}
                      checked={OtherData?.isChecked || false}
                      onChange={handleOnCheck}
                      type="checkbox"
                    />
                    <label> {OtherData.name}</label>
                  </div>
                );
              })}
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            margin={10}
            alignItems="center"
          >
            <Button variant="contained">Save</Button>
            <Button variant="outlined">Save and Submit</Button>
            <Button variant="outlined">Back to Assessment</Button>
          </Stack>
        </Container>
      </Container>
    </>
  );
};

export default AppraiserOverviewOld;
