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
import Button from "@mui/material/Button";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from '@mui/icons-material/Book';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// import Home from "./components/Home";
 import Screening_officerList from "./Components/Screening_officerList";
 import Screening_officerCreate from "./Components/Screening_officerCreate";
 import PatiendCreate from "./Components/PatiendCreate";
 import PatiendList from "./Components/PatiendList";
 import Doctor from "./Components/Doctor";
 import Treatment from "./Components/Treatment";
 import TreatmentCreate from "./Components/TreatmentCreate";
 import Save_ITI from "./Components/Save_ITI";
 import Save_ITICreate from "./Components/Save_ITICreate";
 import Operating_Room from "./Components/Operating_Room";
 import Operating_RoomCreate from "./Components/Operating_RoomCreate";
import DispenseList from "./Components/DispenseList";
import DispenseCreate from "./Components/DispenseCreate";

// import SignIn from "./components/SignIn";

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

const mdTheme = createTheme();

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
  { name: "สร้างข้อมูลฝ่ายคัดกรอง", icon: <PeopleIcon />, path: "/Screening_officerCreate" },
  { name: "ดูข้อมูลฝ่ายคัดกรอง", icon: <BookIcon />, path: "/Screening_officerList" },
  { name: "บันทึกข้อมูลผู้ป่วย", icon: <BookIcon />, path: "/PatiendCreate" },
  { name: "ข้อมูลผู้ป่วย", icon: <BookIcon />, path: "/PatiendList" },
  { name: "ข้อมูลแพทย์", icon: <LocalHospitalIcon />, path: "/Doctor" },
  { name: "บันทึกข้อการรักษา", icon: <PeopleIcon />, path: "/Treatment/create" }, //Gg
  { name: "ข้อมูลการรักษา", icon: <BookIcon />, path: "Treatments" }, //Gg
  //J
  { name: "จัดการข้อมูลคนไข้ภายใน", icon: <PeopleIcon />, path: "/Save_ITICreate" },
  { name: "ข้อมูลคนไข้ภายใน", icon: <BookIcon />, path: "/Save_ITI" },
  { name: "จองห้องผ่าตัด", icon: <PeopleIcon />, path: "/Operating_RoomCreate" },
  { name: "ข้อมูลการจองห้องผ่าตัด", icon: <BookIcon />, path: "/Operating_Room"},
  { name: "บันทึกข้อมูลการจ่ายยา", icon: <BookIcon />, path: "DispenseCreate" },
  { name: "ข้อมูลการจ่ายยา", icon: <BookIcon />, path: "/DispenseList" },
 
];

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  // if (!token) {
  //   return <SignIn />;
  // }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/login";
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
                ระบบโรงพยาบาล
              </Typography>
              <Button color="inherit" onClick={signout}>
                ออกจากระบบ
              </Button>
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
                <Route path="/Screening_officerCreate" element={<Screening_officerCreate />} />
                <Route path="/Screening_officerList" element={<Screening_officerList />} /> 
                <Route path="/PatiendCreate" element={<PatiendCreate />} /> 
                <Route path="/PatiendList" element={<PatiendList />} />
                <Route path="/Doctor" element={<Doctor />} />
                <Route path="/Treatments" element={<Treatment />} />
                <Route path="/Treatment/create" element={<TreatmentCreate />} />
                <Route path="/Save_ITICreate" element={<Save_ITICreate />} />
                <Route path="/Save_ITI" element={<Save_ITI />} />
                <Route path="/Operating_RoomCreate" element={<Operating_RoomCreate />} />
                <Route path="/Operating_Room" element={<Operating_Room />} />
                <Route path="/DispenseList" element={<DispenseList />} />
                <Route path="/DispenseCreate" element={<DispenseCreate />} />

              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;