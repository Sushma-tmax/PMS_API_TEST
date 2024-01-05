import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Checkbox, Grid, IconButton, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Autocomplete from '@mui/material/Autocomplete';

export default function Practice(props: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    setShowTable(!showTable);
    if (showTable) {
      setShowTable(false);
    }
  };
  const styles = {
    box: {},
  };
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  return (
    <>
      <div
        style={{
          background: "#f1f1f1",
          height: "auto",
        }}
      >
        <Box
          sx={{
            // maxWidth: "95% !important",
            // width: "100%",
            height: "100vh",
            background: "#FFF",
            padding: "20px",
            marginLeft: "25px",
            marginRight: "25px",
          }}
        >
          <Box
                bgcolor="#fff"
                /* boxShadow=" 2px 4px 6px 4px rgba(0, 0, 0, 0.2)"*/
                minHeight="calc(100vh - 190px)"
                border={1}
                borderColor="#e0e0e0"
              // width={400}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #e0e0e0",
                    height: "50px",
                  }}
                >
                  <Typography
                    style={{
                      color: "#3E8CB5",
                      fontSize: "18px",
                      fontFamily: "Arial",
                      // marginTop: "5px",
                      // margin: "25px",
                      padding: "10px",
                    }}
                  >
                    Objective Type
                  </Typography>
                </div>
          <Box
            borderColor="#3e8cb5"
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            boxShadow="1px 1px 10px 1px rgba(0, 0, 0, 0.1)"
            margin="20px"
            style={{
              border: "1px solid #3e8cb5",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              minWidth: "330px",
            }}
          >
            <div
              style={{
                color: "#333333",
                fontFamily: "Arial",
                fontSize: "14px",
                wordBreak: "break-word",
                padding: "15px",
                maxWidth: "260px",
              }}
            >
              csbwqcbqwbckjwbkcwkjc
            </div>
            <div style={{ paddingRight: "10px" }}>
              <input
                type="checkbox"
                style={{
                  height: "18px",
                  width: "18px",
                }}
              />
            </div>
          </Box>
          </Box>
          <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label="Select an option" variant="outlined" />
      )}
    />
        </Box>
      </div>
    </>
  );
}
