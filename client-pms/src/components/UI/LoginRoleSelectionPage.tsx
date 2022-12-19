import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import Logo from "../../assets/Images/Logo.svg";
import React, { useEffect } from "react";
import Loginimage from "../../assets/Images/Loginimage.jpg";

import ProtectedRoute from "../ProtectedRoute";
import { useGetEmployeeByFilterQuery, useUpdateEmployeeAppraisalMutation } from "../../service";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticatedTemplate, MsalAuthenticationTemplate, useIsAuthenticated } from '@azure/msal-react';
import { useLoggedInUser } from "../../hooks/useLoggedInUser";


const LoginRoleSelectionPage = () => {

    const [updateRoles] = useUpdateEmployeeAppraisalMutation()
    // const { data } = useGetEmployeeByFilterQuery('?email=technomax@taqeef.com')
    const navigate = useNavigate()
    const isAuthenticated = useIsAuthenticated();


    const [value, setValue] = React.useState('employee');
    const [redirectUrl, setRedirectUrl] = React.useState('employeeperformance/employee-landing/employee/" + user?._id')

    console.log(redirectUrl)
    console.log(value)

    //update current role
    const updateCurrentRoleHandler = (role: any) => {
        updateRoles({
            current_role: role,
            id: user._id
        })
    }
    const { data: user } = useLoggedInUser();
    // console.log(user.appraisal.status,"user")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ((event.target as HTMLInputElement).value == "employee") {
            setValue('employee')
            if (user?.appraisal?.status == "not-started") {
                setRedirectUrl("employeeperformance/appraisal-notcompleted/employee/" + user?._id)
            } else if (user?.appraisal?.status == "completed") {
                setRedirectUrl("employeeperformance/appraisal-notcompleted/employee/" + user?._id)
            } else {
                setRedirectUrl("employeeperformance/employee-landing/employee/" + user?._id)
            }
        } else if ((event.target as HTMLInputElement).value == "dash") {
            setValue('dash')
            setRedirectUrl('/dash')
        } else if ((event.target as HTMLInputElement).value == "dashboardreview") {
            setValue('dashboardreview')
            setRedirectUrl('/dashboardreview')
        } else if ((event.target as HTMLInputElement).value == "reviewer") {
            setValue('reviewer')
            setRedirectUrl('/reviewer')
        } else if ((event.target as HTMLInputElement).value == "normalizer") {
            setValue('normalizer')
            setRedirectUrl('/normalizer')
        } else {
            setValue((event.target as HTMLInputElement).value);
        }
    };


    console.log(user)
    // useEffect(() => {
    //   if(data?.data[0]?.default_role) {
    //     navigate(`/ui/login-page`)
    //   }
    // },[data])

    function removeTrailingSlash(str: any) {
        console.log(str?.substring(1))
        // return  str?.substring(1);
        return 'dashboardreview';
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(`/ui/login-page`)
        }
    }, [isAuthenticated, user])

    useEffect(() => {
        console.log(typeof user?.default_role, 'user?.default_role')
        if (user) {
            setValue(user?.default_role)
            if (user?.default_role == "employee") {
                if (user?.employee?.employee_status == "pending") {
                    setRedirectUrl("employeeperformance/employee-landing/employee/" + user?._id)
                } else {
                    setRedirectUrl("employeeperformance/appraisal-notcompleted/employee/" + user?._id)
                }
                // if (user?.appraisal?.status == "not-started") {
                //     setRedirectUrl("employeeperformance/appraisal-notcompleted/employee/" + user?._id)
                // } else if (user?.appraisal?.status == "completed") {
                //     setRedirectUrl("employeeperformance/appraisal-notcompleted/employee/" + user?._id)
                // } else {
                //     setRedirectUrl("employeeperformance/employee-landing/employee/" + user?._id)
                // }
            }
            else setRedirectUrl(user?.default_role)
        }

        // setValue("dash")
    }, [user])
   
    return (
        <>

            {user &&
                <Container sx={{
                    height: "calc(100vh + 16px)",
                    backgroundImage: `url(${Loginimage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    "&.MuiContainer-root": {
                        maxWidth: "100%"
                    }
                }}>
                    <Grid container spacing={2}>

                        <Grid item xs={4}></Grid>
                        <Grid item xs={4} style={{ alignItems: "center" }}>
                            <Box style={{
                                borderRadius: "10px",
                                width: "70%",
                                padding: "20px",
                                marginTop: "30%",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "white"
                            }}>
                                <span style={{ display: "flex", justifyContent: "center", height: "35px" }}>
                                    <img src={Logo} alt="icon" />
                                </span>

                                <Typography style={{
                                    paddingTop: "20px",
                                    // paddingBottom: "10px",
                                    display: "flex",
                                    color: "#3e8cb5",
                                    fontSize: "18px",
                                    fontFamily: "Arial",
                                    // justifyContent:"center"
                                }}>
                                    Select Default Login
                                </Typography>
                                {/* <span style={{ display: "flex", justifyContent: "center", color: "#676767", fontSize: "13px" }}>
              Performance Appraisal System
            </span> */}

                                <FormControl style={{ display: "flex", }}>
                                    {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        //defaultValue="employee"
                                        name="radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    //   onChange={(e) => {
                                    //     handleacceptChange(e);
                                    // }}

                                    >
                                        <FormControlLabel value="employee" control={<Radio />} color="#333333" label={
                                            <Typography sx={{ color: "#333333", fontSize: "14px", fontFamily: "Arial" }}>
                                                Employee
                                            </Typography>
                                        } />

                                        {user?.roles?.appraiser &&
                                            <FormControlLabel value="dashboardreview" control={<Radio />} label={
                                                <Typography
                                                    sx={{ color: "#333333", fontSize: "14px", fontFamily: "Arial" }}>
                                                    Appraiser
                                                </Typography>
                                            } />}

                                        {user?.roles?.reviewer &&
                                            <FormControlLabel value="reviewer" control={<Radio />} label={
                                                <Typography
                                                    sx={{ color: "#333333", fontSize: "14px", fontFamily: "Arial" }}>
                                                    Reviewer
                                                </Typography>
                                            } />}

                                        {user?.roles?.normalizer &&
                                            <FormControlLabel value="normalizer" control={<Radio />} label={
                                                <Typography
                                                    sx={{ color: "#333333", fontSize: "14px", fontFamily: "Arial" }}>
                                                    Normalizer
                                                </Typography>
                                            } />}


                                        {user?.roles?.admin &&
                                            <FormControlLabel value="dash" control={<Radio />} label={
                                                <Typography
                                                    sx={{ color: "#333333", fontSize: "14px", fontFamily: "Arial" }}>
                                                    PA Admin
                                                </Typography>
                                            } />
                                        }
                                    </RadioGroup>
                                </FormControl>
                                {/* <br /> */}
                                <div style={{ display: "flex", paddingTop:"10px",justifyContent: "center" }}>
                                    {/* <Link to={`${redirectUrl}`}> */}
                                        <Button
                                            style={{
                                                textTransform: "none",
                                                fontSize: "15px",
                                                fontFamily: "Arial",
                                                borderColor: "#3E8CB5",
                                                borderRadius: "10px",
                                                
                                            }}
                                            variant="outlined"
                                            onClick={() => {
                                                let currentRole = "Employee"
                                                if(value == "dash")
                                                currentRole = "PA Admin"
                                                else if(value == "dashboardreview")
                                                currentRole = "Appraiser"
                                                else if(value == "normalizer")
                                                currentRole = "Normalizer"
                                                else if(value == "reviewer")
                                                currentRole = "Reviewer"
                                                updateRoles({ 
                                                    default_role: value, 
                                                    current_role: currentRole,
                                                    id: user?._id 
                                                }).then((data:any)=>{
                                                    navigate(`${redirectUrl}`);
                                                })
                                               
                                            }}
                                        >
                                            {" "}
                                            Continue
                                        </Button>
                                    {/* </Link> */}

                                </div>

                            </Box>
                            {/* <img src={Maskgroup} object-fit= "cover" /> */}
                        </Grid>
                    </Grid>
                </Container>}
        </>
    );
};

export default LoginRoleSelectionPage;
