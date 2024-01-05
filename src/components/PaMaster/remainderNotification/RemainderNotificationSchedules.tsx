import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TableHead,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
//import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LocalizationProvider, DatePicker as MuiDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RemainderNotificationSchedules(props: any) {
  const {
    reminderStartDate,
    reminderfrequency,
    reminderSubject,
    reminderEmailContent,
    reminderActiveStatus,
    reminderfrequencyAfter,
    reminderSubjectAfter,
    reminderEmailContentAfter,
    handleReminderActiveStatus,
    handleReminderStartDate,
    handlereminderfrequency,
    handleReminderSubject,
    handleReminderEmailContent,
    handlereminderfrequencyAfter,
    handleReminderSubjectAfter,
    handleReminderEmailContentAfter,
    handleClickSaveButton,
    reminderStartDateAfter,
    handleReminderStartDateAfter,
    selectedroleName,
    handleChangeSelectingRoles,
    handleChangeSelectedCategory,
    selectedCategory,
    names,
    reminderNotificationData,
    setReminderEmailContent,
  } = props;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              color: "#3E8CB5",
              fontSize: "16px",
              fontFamily: "Arial",
              // marginTop: "5px",
              // margin: "25px",
              //padding: "10px",
            }}
          >
            Reminder Schedule
          </Typography>
        </div>
        <Stack direction="row" spacing={4} marginTop="20px">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
              toolbarPlaceholder="Start date"
              value={reminderStartDate}
              onChange={handleReminderStartDate}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  // inputProps={{ ...params.inputProps, placeholder: "dd/mm/aaaa" }}
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px !important",
                      fontFamily: "Arial !important",
                      color: "#333333 !important",
                      // padding: "11.5px 14px ",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            sx={{
              "& .MuiOutlinedInput-input": {
                fontSize: "14px !important",
                fontFamily: "Arial !important",
                color: "#333333 !important",
                // padding: "11.5px 14px ",
              },
            }}
            size="small"
            placeholder="Occurence"
            // fullWidth
            value={reminderfrequency}
            onChange={handlereminderfrequency}
          />
        </Stack>
        <Grid style={{ marginTop: "5px" }} container spacing={2}>
          {/* <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MuiDatePicker
                label="Start date"
                value={reminderStartDate}
                onChange={handleReminderStartDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        fontSize: "14px !important",
                        fontFamily: "Arial !important",
                        color: "#333333 !important",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px !important",
                  fontFamily: "Arial !important",
                  color: "#333333 !important",
                },
              }}
              size="small"
              label="Occurence"
              // fullWidth
              value={reminderfrequency}
              onChange={handlereminderfrequency}
            />
          </Grid> */}
          {/* <Grid item xs={6}> */}
          {/* <TextField
              label="Subject"
              fullWidth
              value={reminderSubject}
              onChange={handleReminderSubject}
            /> */}
          {/* <FormControl size="small" sx={{ width: "100%" }}>
              <InputLabel
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "12px !important",
                    fontFamily: "Arial !important",
                    color: "#333333 !important",
                  },
                }}
                //  }}
                id="demo-multiple-checkbox-label"
              >
                Select Roles
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "13px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                multiple
                displayEmpty
                value={selectedroleName}
                onChange={handleChangeSelectingRoles}
                input={<OutlinedInput label="Select Roles" />}
                renderValue={(selected) => selected.join(", ")}
                // renderValue={(selected) => {
                //   if (selected.length === 0) {
                //     return 'Select Role';
                //   }
                //   return selected.join(', ');
                // }}
                //MenuProps={MenuProps}
              >
                {names.map((name: any) => (
                  <MenuItem
                    sx={{
                      fontSize: "13px",
                      color: "#333333",
                      fontFamily: "Arial",
                      padding: "0px",
                    }}
                    key={name}
                    value={name}
                  >
                    <ListItemIcon>
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "14px !important",
                          },
                        }}
                        style={{
                          padding: "0px",
                          paddingLeft: "14px",
                          height: "0px",
                        }}
                        size="small"
                        checked={selectedroleName.indexOf(name) > -1}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          // paddingRight: "10px"
                        },
                      }}
                      primary={name}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          {/* </Grid> */}
          <Grid item xs={12}>
            <TextField
              placeholder="Subject"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px !important",
                  fontFamily: "Arial !important",
                  color: "#333333 !important",
                },
              }}
              fullWidth
              value={reminderSubject}
              onChange={handleReminderSubject}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <TextField
              placeholder="Email content"
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "14px !important",
                  fontFamily: "Arial !important",
                  color: "#333333 !important",
                },
              }}
              fullWidth
              multiline
              value={reminderEmailContent}
              //maxRows={4}
              onChange={handleReminderEmailContent}
            /> */}
            <ReactQuill
              theme="snow"
              value={reminderEmailContent}
              onChange={setReminderEmailContent}
            />
          </Grid>
        </Grid>
        <div
          style={{ display: "flex", justifyContent: "end", paddingTop: "20px" }}
        >
          <Button
            style={{
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "Arial",
              borderColor: "#3E8CB5",
              color: "#3e8cb5",
              width: "70px",
              height: "35px",
              background: "transparent",
            }}
            variant="outlined"
            onClick={handleClickSaveButton}
          >
            Save
          </Button>
        </div>
      </Box>
      {/* <Box sx={{ flexGrow: 1, marginTop: "2%" }}>
        <Typography
          style={{
            color: "#3E8CB5",
            fontSize: "16px",
            fontFamily: "Arial",
         
          }}
        >
          Schedule after timeline
        </Typography>
        <Grid sx={{ marginTop: "0.2%" }} container spacing={2}>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MuiDatePicker
                label="Start date"
                value={reminderStartDateAfter}
                onChange={handleReminderStartDateAfter}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        fontSize: "12px !important",
                        fontFamily: "Arial !important",
                        color: "#333333 !important",
                        padding: "11.5px 14px ",
                      },
                    }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "12px !important",
                  fontFamily: "Arial !important",
                  color: "#333333 !important",
                  padding: "11.5px 14px ",
                },
              }}
              label="Occurence"
              fullWidth
              value={reminderfrequencyAfter}
              onChange={handlereminderfrequencyAfter}
            />
          </Grid>
          <Grid item xs={6}>
          
            <FormControl size="small" sx={{ width: "100%" }}>
              <InputLabel
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "12px !important",
                    fontFamily: "Arial !important",
                    color: "#333333 !important",
                    paddingLeft: "8px", // Added padding to the left
                  },
                }}
                //  }}
                id="demo-multiple-checkbox-label"
              >
                Select Roles
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "13px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                multiple
                displayEmpty
                value={selectedCategory}
                onChange={handleChangeSelectedCategory}
                input={<OutlinedInput label="Select Roles" />}
                renderValue={(selected) => selected.join(", ")}
                // renderValue={(selected) => {
                //   if (selected.length === 0) {
                //     return 'Select Role';
                //   }
                //   return selected.join(', ');
                // }}
                //MenuProps={MenuProps}
              >
                {names.map((name: any) => (
                  <MenuItem
                    sx={{
                      fontSize: "13px",
                      color: "#333333",
                      fontFamily: "Arial",
                      padding: "0px",
                    }}
                    key={name}
                    value={name}
                  >
                    <ListItemIcon>
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "14px !important",
                          },
                        }}
                        style={{
                          padding: "0px",
                          paddingLeft: "14px",
                          height: "0px",
                        }}
                        size="small"
                        checked={selectedCategory.indexOf(name) > -1}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "13px",
                          fontFamily: "Arial",
                          color: "#333333",
                          // paddingRight: "10px"
                        },
                      }}
                      primary={name}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "12px !important",
                  fontFamily: "Arial !important",
                  color: "#333333 !important",
                  //padding: "11.5px 14px ",
                },
              }}
              label="Subject"
              fullWidth
              value={reminderSubjectAfter}
              onChange={handleReminderSubjectAfter}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: "12px !important",
                  fontFamily: "Arial !important",
                  color: "#333333 !important",
                  // padding: "11.5px 14px ",
                },
              }}
              label="Email content"
              fullWidth
              multiline
              //maxRows={4}
              value={reminderEmailContentAfter}
              onChange={handleReminderEmailContentAfter}
            />
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
}
