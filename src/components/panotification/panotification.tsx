import * as React from "react";
import Grid from "@mui/material/Grid";
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  Switch,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Scrollbar } from "react-scrollbars-custom";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Searchicon from "../../assets/Images/Searchicon.svg";
import Tooltip from "@mui/material/Tooltip";
import PAMaster from "../../components/UI/PAMaster";
import Blueadd from "../../assets/appraiser/Reviewericons/Blueadd.svg";
import Blueminus from "../../assets/appraiser/Reviewericons/Blueminus.svg";
const Text = styled("div")({
  "& .MuiInputBase-input": {
    fontSize: "14px",
    color: "#333333",
    fontFamily: "Arial",
    minHeight: "50px",
    background: "#f8f8f8",
    padding: "8px",
    borderRadius: "5px",
  },
});
export default function PaNotification(props: any) {
  return (
    <>
      <PAMaster name={"PA Notification"} />
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          background: "#fff",
          padding: "20px",
          marginLeft:"25px",
          marginRight:"25px"
          
          // marginTop: "50px",
        }}
      >
        <div>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Typography fontSize="16px" color="#333333" fontFamily="arial">
              Enable automatic reminder
            </Typography>
            <Switch defaultChecked />
          </Stack>
        </div>
        <div>
          <Stack sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography
              fontSize="16px"
              color="#333333"
              paddingTop="10px"
              fontFamily="arial"
            >
              Reminder notification
            </Typography>
            <Stack direction="row" alignItems="baseline" spacing={2}>
              <Stack direction="row" alignItems="baseline" spacing={6}>
                <Typography
                  fontSize="14px"
                  color="#333333"
                  paddingTop="10px"
                  fontFamily="arial"
                >
                  1st reminder
                </Typography>
                <div>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <img style={{ width: "14px" }} src={Blueminus} />

                    <input
                      // type="checkbox"
                      style={{
                        height: "12px",
                        width: "12px",
                        // borderColor: "#D5D5D5",
                      }}
                    />

                    <img style={{ width: "14px" }} src={Blueadd} />
                  </Stack>
                </div>
              </Stack>
              <Typography
                fontSize="14px"
                color="#333333"
                paddingTop="10px"
                fontFamily="arial"
              >
                Days Before
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="baseline" spacing={2}>
              <Stack direction="row" alignItems="baseline" spacing={5.5}>
                <Typography
                  fontSize="14px"
                  color="#333333"
                  paddingTop="10px"
                  fontFamily="arial"
                  paddingBottom="10px"
                >
                  2nd reminder
                </Typography>
                <div>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <img style={{ width: "14px" }} src={Blueminus} />

                    <input
                      // type="checkbox"
                      style={{
                        height: "12px",
                        width: "12px",
                        // borderColor: "#D5D5D5",
                      }}
                    />

                    <img style={{ width: "14px" }} src={Blueadd} />
                  </Stack>
                </div>
              </Stack>
              <Typography
                fontSize="14px"
                color="#333333"
                paddingTop="10px"
                fontFamily="arial"
              >
                Days Before
              </Typography>
            </Stack>
            {/* <Stack direction="row" alignItems="baseline" spacing={5.5}>
              <Typography
                fontSize="14px"
                color="#333333"
                paddingTop="10px"
                paddingBottom="10px"
                fontFamily="arial"
              >
                2nd reminder
              </Typography>
              <div>
                <Stack direction="row"spacing={1}>
                  <img style={{ width: "14px" }} src={Blueminus} />

                  <input
                    // type="checkbox"
                    style={{
                      height: "12px",
                      width: "12px",
                      // borderColor: "#D5D5D5",
                    }}
                  />

                  <img style={{ width: "14px" }} src={Blueadd} />
                </Stack>
              </div>
            </Stack> */}
          </Stack>
        </div>
        <Typography
          fontSize="16px"
          color="#333333"
          paddingTop="10px"
          fontFamily="arial"
        >
          Message content
        </Typography>
        <TableContainer sx={{ paddingTop: "10px" }}>
          <Scrollbar style={{ width: "100%", height: "calc(100vh - 380px)" }}>
            <Table size="small" aria-label="simple table">
              <TableBody
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableRow
                  sx={{
                    "& td, & th": {
                      border: "1px solid #e0e0e0",
                    },
                  }}
                >
                  <TableCell
                    width="10%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#3e8cb5",
                      wordBreak: "break-word",
                    }}
                  >
                    PA Initiation
                  </TableCell>
                  <TableCell
                    width="90%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#333333",
                      wordBreak: "break-word",
                    }}
                  >
                    <Text>
                      <TextField
                        style={{ cursor: "pointer" }}
                        placeholder="Add "
                        fullWidth
                        multiline
                        //rows={2}
                        inputProps={{ maxLength: 512 }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true, // <== added this
                        }}
                        autoComplete="off"
                      ></TextField>
                    </Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table size="small" aria-label="simple table">
              <TableBody
               sx={{
                "& td, & th": {
                  border: "1px solid #e0e0e0",
                
                },
              }}
              >
                <TableRow
                  sx={{
                    "& td, & th": {
                      border: "1px solid #e0e0e0",
                    
                    },
                  }}
                >
                  <TableCell
                    width="10%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#3e8cb5",
                      wordBreak: "break-word",
                    }}
                  >
                    Submission
                  </TableCell>
                  <TableCell
                    width="90%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#333333",
                      wordBreak: "break-word",
                    }}
                  >
                    <Text>
                      <TextField
                        style={{ cursor: "pointer" }}
                        placeholder="Add "
                        fullWidth
                        multiline
                        //rows={2}
                        inputProps={{ maxLength: 512 }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true, // <== added this
                        }}
                        autoComplete="off"
                      ></TextField>
                    </Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table size="small" aria-label="simple table">
              <TableBody
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  
                  },
                }}
              >
                <TableRow
                  sx={{
                    "& td, & th": {
                      border: "1px solid #e0e0e0",
                    
                    },
                  }}
                >
                  <TableCell
                    width="10%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#3e8cb5",
                      wordBreak: "break-word",
                    }}
                  >
                    Acceptance
                  </TableCell>
                  <TableCell
                    width="90%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#333333",
                      wordBreak: "break-word",
                    }}
                  >
                    <Text>
                      <TextField
                        style={{ cursor: "pointer" }}
                        placeholder="Add "
                        fullWidth
                        multiline
                        //rows={2}
                        inputProps={{ maxLength: 512 }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true, // <== added this
                        }}
                        autoComplete="off"
                      ></TextField>
                    </Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table size="small" aria-label="simple table">
              <TableBody
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  
                  },
                }}
              >
                <TableRow
                  sx={{
                    "& td, & th": {
                      border: "1px solid #e0e0e0",
                    
                    },
                  }}
                >
                  <TableCell
                    width="10%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#3e8cb5",
                      wordBreak: "break-word",
                    }}
                  >
                    Rejection
                  </TableCell>
                  <TableCell
                    width="90%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#333333",
                      wordBreak: "break-word",
                    }}
                  >
                    <Text>
                      <TextField
                        style={{ cursor: "pointer" }}
                        placeholder="Add "
                        fullWidth
                        multiline
                        //rows={2}
                        inputProps={{ maxLength: 512 }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true, // <== added this
                        }}
                        autoComplete="off"
                      ></TextField>
                    </Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table size="small" aria-label="simple table">
              <TableBody
                
              >
                <TableRow
                  sx={{
                    "& td, & th": {
                      border: "1px solid #e0e0e0",
                    
                    },
                  }}
                >
                  <TableCell
                    width="10%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#3e8cb5",
                      wordBreak: "break-word",
                    }}
                  >
                    PA Closing
                  </TableCell>
                  <TableCell
                    width="90%"
                    align="justify"
                    sx={{
                      fontFamily: "Arial",
                      // borderColor: "e0e0e0",
                      fontSize: "14px",
                      color: "#333333",
                      wordBreak: "break-word",
                    }}
                  >
                    <Text>
                      <TextField
                        style={{ cursor: "pointer" }}
                        placeholder="Add "
                        fullWidth
                        multiline
                        //rows={2}
                        inputProps={{ maxLength: 512 }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true, // <== added this
                        }}
                        autoComplete="off"
                      ></TextField>
                    </Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "35px",
                  width: "70px",
                }}
                variant="outlined"
              >
                Save
              </Button>
            </div>
          </Scrollbar>
        </TableContainer>
      </Box>
    </>
  );
}
