import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from '@mui/icons-material/Book';
import SigninOfficer from "./SigninOfficer";
import SigninMed_employee from "./SigninMed_employee";
import SigninScreening from "./SigninScreening";
import SigninDoctor from "./SigninDoctor";
import SigninScreening_officer from "./SigninScreening";

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PersonIcon from '@mui/icons-material/Person';
import { Grid } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme({
    palette: {
      primary: {
          main: '#009688',

          light: '#B99B6B',

          //สีสว่าง
          contrastText: '#f8f8f8',
      },
      secondary: {
          main: '#AA5656',
          light: '#B99B6B',
          contrastText: '#F1DBBF',
      },
  },
  });

const menu = [
    { name: "ฝ่ายผู้ดูแลระบบ", icon: <ManageAccountsIcon />, path: "/signin_officer" },
    { name: "ฝ่ายคัดกรอง", icon: <PersonSearchIcon />, path: "/signinScreening_officer" },
    { name: "ฝ่ายแพทย์", icon: <HowToRegIcon />, path: "/signinDoctor" },
    { name: "ฝ่ายเทคนิคการแพทย์", icon: <PersonIcon />, path: "/signinMed_employee" },
];

function SelectLogin() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Router>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: "24px", // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: "36px",
                                    ...(open && { display: "none" }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Software Engineering 2/65 (ระบบโรงพยาบาล)
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List>
                            {menu.map((item, index) => (
                                <Link
                                    to={item.path}
                                    key={item.name}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <ListItem button>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Routes>
                                <Route path="/signin_officer" element={<SigninOfficer />} />
                                <Route path="/signinMed_employee" element={<SigninMed_employee />} />
                                <Route path="/signinScreening_officer" element={<SigninScreening_officer />} />
                                <Route path="/signinDoctor" element={<SigninDoctor />} />

                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </Router>
    );
}
 
export default SelectLogin;

