import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Box ,TextField,InputAdornment} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import Expand from "../../assets/Images/Expand.svg";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { Scrollbar } from "react-scrollbars-custom";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Searchicon from "../../assets/Images/Searchicon.svg";
import Tooltip from "@mui/material/Tooltip";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import PAMaster from "../../components/UI/PAMaster";

const Searchfeild = styled("div")({
    // marginLeft: "auto",
    // marginRight: "8px",
    marginTop: "8px",
    "& .MuiOutlinedInput-root": {
      height: "30px",
      width: "100%",
      borderRadius: "25px",
      background: "#F2F6F8",
      // border:'2px solid white'
    },
    "& .MuiInputLabel-root": {
      fontSize: "12px",
      color: "#D5D5D5",
      marginTop: "-10px",
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "12px",
      color: "#333333",
      opacity: "70%",
    },
    "& .MuiTextField-root": {
      minWidth: "100%",
      //   paddingLeft: "10px",
      //   paddingRight: "10px"
    },
  });
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ExceptionHandling(props: any) {
  const [age, setAge] = React.useState("");

  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const [value, setValue] = React.useState<any>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
    <PAMaster name={"Exception Handling"} />
    <Container
      sx={{
        maxWidth: "95% !important",
        width: "100%",
        height: "calc(100vh - 165px)",
        background: "#fff",
        padding: "15px",
        // marginTop: "50px",
      }}
    >
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: 1, borderColor: "divider", left: 20 }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              style={{
                textTransform: "capitalize",
                color: "#3E8CB5",
                fontSize: "14px",
                fontFamily: "Arial",
                fontWeight: "600",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
              label="Employee Master"
              {...a11yProps(0)}
            />
            <Tab
              style={{
                textTransform: "capitalize",
                color: "#3E8CB5",
                fontSize: "14px",
                fontFamily: "Arial",
                fontWeight: "600",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
              label="Exception Handling"
              {...a11yProps(1)}
            />
          </Tabs>
        </Stack>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack paddingTop="5px" paddingBottom="5px"direction="row" alignItems="center" justifyContent="space-between">        <div>
        <FormControl sx={{ m: 1, minWidth: 25 }} size="small">
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            onChange={handleChange1}
          >
            <MenuItem value="10"></MenuItem>
            <MenuItem value={10}>All</MenuItem>
            <MenuItem value={20}>Grade</MenuItem>
            <MenuItem value={30}>Grade</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            // label="Age"
            onChange={handleChange1}
          >
            <MenuItem value="10"></MenuItem>
            <MenuItem value={10}>Grade</MenuItem>
            <MenuItem value={20}>Grade</MenuItem>
            <MenuItem value={30}>Grade</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            // label="Age"
            onChange={handleChange1}
          >
            <MenuItem value="10"></MenuItem>
            <MenuItem value={10}>Division</MenuItem>
            <MenuItem value={20}>Grade</MenuItem>
            <MenuItem value={30}>Grade</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            onChange={handleChange1}
          >
            <MenuItem value="10"></MenuItem>
            <MenuItem value={10}>Section</MenuItem>
            <MenuItem value={20}>Grade</MenuItem>
            <MenuItem value={30}>Grade</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div>
        <Searchfeild>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          placeholder="Search Here..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Searchicon} alt="icon" />
              </InputAdornment>
            ),
          }}
        />
      </Searchfeild>
      </div>
      </Stack>

        <TableContainer>
          <Scroll>
            <Scrollbar style={{ width: "100%", height: "calc(100vh - 300px)" }}>
              <Table size="small" aria-label="simple table">
                <TableHead
                  style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                >
                  <TableRow sx={{ bgcolor: "#eaeced" }}>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span> Employee Name</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                     
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span>  Employee Email</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span>  Department</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span>  Division</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span>  Section</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                     <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span>  Grade</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderColor: "lightgrey",
                      },
                    }}
                  >
                    <TableCell width="1%" align="center">
                      <input
                        type="checkbox"
                        style={{
                          height: "20px",
                          width: "20px",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      //   width="30%"
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Haytham M. M. Alkurdi
                    </TableCell>
                    <TableCell
                      //  width="40%"
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Haytham @taqeef.com
                    </TableCell>
                    <TableCell
                      //   width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Sales
                    </TableCell>
                    <TableCell
                      //   width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Retail
                    </TableCell>
                    <TableCell
                      //   width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Human Resources
                    </TableCell>
                    <TableCell
                      //   width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Grade 12
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Scrollbar>
          </Scroll>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TableContainer sx={{paddingTop:"10px"}}>
          <Scroll>
            <Scrollbar style={{ width: "100%", height: "calc(100vh - 300px)" }}>
              <Table size="small" aria-label="simple table">
                <TableHead
                  style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                >
                  <TableRow sx={{ bgcolor: "#eaeced" }}>
                    
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span> Employee Name</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                     
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span>  Employee Email</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span>  Section</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      
                      <FormControl sx={{ m: 0, height: "0" }} size="small">
                        <Stack direction="row">
                          <span>  Grade</span>
                          <Select
                            sx={{ width: "25px", fontSize: "0rem" }}
                            disableUnderline
                            onChange={handleChange1}
                            variant="standard"
                          >
                            <MenuItem value="10"></MenuItem>
                            <MenuItem value={10}>Section</MenuItem>
                            <MenuItem value={20}>Grade</MenuItem>
                            <MenuItem value={30}>Grade</MenuItem>
                          </Select>
                        </Stack>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      
                       Line Manager
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                    Line Manager 1
                          
                      
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                     Line Manager 2
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                    Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderColor: "lightgrey",
                      },
                    }}
                  >
                    <TableCell
                      //   width="30%"
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Haytham M. M. Alkurdi
                    </TableCell>
                    <TableCell
                      //   width="30%"
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                     Haytham @taqeef.com
                    </TableCell>
                    <TableCell
                      //  width="40%"
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Haytham @taqeef.com
                    </TableCell>
                    <TableCell
                      //   width="10%"
                      align="center"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Sales
                    </TableCell>
                    <TableCell
                      //   width="10%"
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Retail
                    </TableCell>
                    <TableCell
                      //   width="10%"
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Human Resources
                    </TableCell>
                    <TableCell
                      //   width="10%"
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      Grade 12
                    </TableCell>
                    <TableCell
                      align="justify"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "lightgrey",
                        fontSize: "14px",
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                     <Tooltip title="Edit">
                              <IconButton
                                aria-label="EditIcon"
                                
                              >
                                <img src={Edit} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                                
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
                            </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Scrollbar>
          </Scroll>
        </TableContainer>
      </TabPanel>
    </Container>
    </>
  );
}
