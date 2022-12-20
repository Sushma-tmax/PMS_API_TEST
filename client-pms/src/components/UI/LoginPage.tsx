import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import Logo from "../../assets/Images/Logo.svg";

import React, { useEffect } from "react";
import Loginimage from "../../assets/Images/Loginimage.jpg";

import { useAppContext } from "../../context/AppContext";
import {
  AuthenticatedTemplate,
  MsalAuthenticationTemplate,
  useIsAuthenticated,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/`);
    }
  }, [isAuthenticated]);

  const app = useAppContext();

  return (
    <UnauthenticatedTemplate>
      <Container
        sx={{
          backgroundColor: "#ffffffb8",
          height: "100%",
          "&.MuiContainer-root": {
            maxWidth: "100%",
            paddingLeft: "0px",
            paddingRight: "0px",
          },
        }}
      >
        <Grid style={{marginTop:"0px"}}container spacing={2} height="100%">
          <Grid item xs={5}>
            <Box style={{ position: "relative", top: "34%" }}>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <img src={Logo} alt="icon" />
              </span>

              <p
                style={{
                  paddingTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  color: "#3e8cb5",
                  fontSize: "22px",
                }}
              >
                Welcome to Performance Appraisal System
              </p>
              {/* <span style={{ display: "flex", justifyContent: "center", color:"#676767",fontSize: "13px" }}>
              Performance Appraisal System
            </span> */}

              {/* <p style={{ paddingLeft: "180px", color:"#676767", fontSize: "13px" }}>User Email</p>
            <p style={{ paddingLeft: "180px" }}>
            <TextField
        variant="outlined"
        size="small"
        style={{width:"60%"}}
        inputProps={{ maxLength: 256 }}

      />            </p>
<p style={{ paddingLeft: "180px", color:"#676767", fontSize: "13px" }}>User Password</p>
            <p style={{ paddingLeft: "180px" }}>
            <TextField
        variant="outlined"
        size="small"
        style={{width:"60%"}}
        inputProps={{ maxLength: 256 }}


      />            </p> */}

              {/* <p style={{ paddingLeft: "180px", color:"#676767", fontSize: "13px" }}>User Role</p>
            <p style={{ paddingLeft: "180px" }}>
            <TextField
            select
        variant="outlined"
        size="small"
        style={{width:"60%"}}

      >     <MenuItem style={{ fontSize: "12px" }} >
      HR Manager
    </MenuItem>

    
      <MenuItem style={{ fontSize: "12px" }} >
      Administrator
      </MenuItem>      </TextField> </p> */}

              <p style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  size="medium"
                  variant="outlined"
                  onClick={app.signIn!}
                  style={{
                    backgroundColor: "#3e8cb5",
                    borderRadius: "16px",
                    paddingLeft: "8px",
                    padding: "3px 16px",
                    color: "#fff",
                    textTransform: "none",
                  }}
                >
                  Login
                </Button>
              </p>
              {/* <p
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "13px",
                fontStyle: "italic",
                color:"#adadb1"
              }}
            >
              Forgot Password ?
            </p> */}
            </Box>
          </Grid>
          <Grid
            item
            xs={7}
            sx={{
              backgroundImage: `url(${Loginimage})`,
              backgroundSize: "cover",  
              backgroundRepeat: "no-repeat",
              // height: "calc(100vh + 16px)",
              height:"100vh"
            }}
          ></Grid>
        </Grid>
      </Container>
    </UnauthenticatedTemplate>
  );
};

export default LoginPage;
