import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, TextField, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import Typography from "@mui/material/Typography";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  MASTER_NAV,
  VIEW_ALL,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import {
  OBJECTIVE,
  VIEW_OBJECTIVE_DESCRIPTION,
} from "../../constants/routes/Routing";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";

function createData(
  name: any,
  objectivetitle: any,
  objectivedefinition: any,
  action: any
) {
  return { name, objectivetitle, objectivedefinition, action };
}

const rows = [
  createData(
    "1",
    <>
      <TextField value="Knowledge of the job" fullWidth size="small" />
    </>,
    <>
      <TextField
        value="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        fullWidth
        size="small"
      />
    </>,
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Link to={VIEW_ALL}>
          <Button
            style={{
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "sans-serif",
              padding: "2px 9px",

              borderColor: "#004C75",
              color: "#004C75",
            }}
            variant="outlined"
          >
            Save
          </Button>
        </Link>
        <Link to={VIEW_ALL}>
          <Button
            style={{
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "15px",
              fontFamily: "sans-serif",
              padding: "2px 9px",

              borderColor: "#004C75",
              color: "#004C75",
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </Link>
      </Stack>
    </>
  ),
  createData(
    "2",
    "Quality of work",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sit temporibus iusto unde provident laborum libero fuga rerum a expedita.",
    <>
      <Tooltip title="Edit">
        <IconButton>
          <img src={Edit} alt="icon" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton>
          <img src={Close} alt="icon" />
        </IconButton>
      </Tooltip>
    </>
  ),
];
function EditViewall(props: any) {
  const { name } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <div id="master">
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>
            <Typography
              style={{
                color: "#004C75",
                fontSize: "24px",
                fontFamily: "regular",
              }}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <span style={{ marginRight: "4px" }}>
                <IconButton>
                  <Link to={OBJECTIVE}>
                    <img src={Leftarrow} alt="button" />
                  </Link>
                </IconButton>
              </span>

              <label> Objective Title</label>
            </Typography>
            <Button
              style={{
                textTransform: "none",
                color: "#004C75",
                fontSize: "16px",
                marginRight: "30px",
                fontWeight: "400",
              }}
            >
              <Link to="/"> Master</Link>
            </Button>
            <Button
              style={{
                textTransform: "none",
                color: "#004C75",
                fontSize: "16px",
                marginRight: "30px",
                fontWeight: "400",
              }}
              id="basic-button"
              color="inherit"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Template
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to="/template/create-template"
                >
                  Create Template
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to={VIEW_TEMPLATE}
                >
                  View Template
                </Link>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to="template/edit-template"
                >
                  Edit Template
                </Link>
              </MenuItem> */}
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to={CREATE_MAPPING}
                >
                  Create Employee Mapping
                </Link>
              </MenuItem>
            </Menu>
            <Link to={CREATE_CALENDER}>
              <Button
                style={{
                  textTransform: "none",
                  color: "#004C75",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Appraisal Calendar
              </Button>
            </Link>
          </Toolbar>
        </Box>
      </div>

      <Container
        sx={{
          maxWidth: "96% !important",
          height: "calc(100vh - 165px)",
          backgroundColor: "#fff",
          paddingTop: "10px",
        }}
      >
        <TableContainer sx={{ marginBottom: 10, marginTop: 3 }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#F7F9FB" }}>
                <TableCell
                  sx={{
                    border: 1,
                    borderColor: "lightgrey",
                    color: "#004C75",
                    fontSize: "12px",
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    border: 1,
                    borderColor: "lightgrey",
                    color: "#004C75",
                    fontSize: "12px",
                  }}
                >
                  Objective Title
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    border: 1,
                    borderColor: "lightgrey",
                    color: "#004C75",
                    fontSize: "12px",
                  }}
                >
                  Objective Definition
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    border: 1,
                    borderColor: "lightgrey",
                    color: "#004C75",
                    fontSize: "12px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 1,
                      borderColor: "lightgrey",
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    width="10"
                    sx={{
                      border: 1,
                      borderColor: "lightgrey",
                      fontSize: "14px",
                      color: "#33333",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    width="400"
                    sx={{
                      border: 1,
                      borderColor: "lightgrey",
                      fontSize: "14px",
                      color: "#33333",
                      padding: 2,
                    }}
                  >
                    {row.objectivetitle}
                  </TableCell>
                  <TableCell
                    align="left"
                    width="800"
                    sx={{
                      border: 1,
                      borderColor: "lightgrey",
                      fontSize: "14px",
                      color: "#33333",
                      padding: 2,
                    }}
                  >
                    {row.objectivedefinition}
                  </TableCell>
                  <TableCell
                    align="center"
                    width="100"
                    sx={{
                      border: 1,
                      borderColor: "lightgrey",
                      fontSize: "14px",
                      color: "#33333",
                      padding: 2,
                    }}
                  >
                    {row.action}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
}
export default EditViewall;
