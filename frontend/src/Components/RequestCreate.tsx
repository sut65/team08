import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
//import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormControl from '@mui/material/FormControl/FormControl';

//New
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RequestInterface } from "../Models/IRequest";
import { LocationInterface } from "../Models/ILocation";
//box
import {
  GetMedicalEquipments,
  //GetDoctorByUID,
  GetLocation,
  GetMedByUID,
  Request,
} from "../Services/HttpClientService";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DateTimePicker } from '@mui/x-date-pickers';
import { MedEmployeeInterface } from '../Models/IMedEmployee';
import { MedicalEquimentInterface } from '../Models/IMedEquipment';
//import moment from 'moment';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RequestCreate() {

  const [request, setrequest] = React.useState<RequestInterface>({
    TIME: new Date(),
  });
  const [R_ID, setR_ID] = useState<string>("");
  const [QUANTITY, setQUANTITY] = useState<string>("");
  const [R_NAME, setR_NAME] = useState<string>("");
  
  const [Med_Equipment, setMed_Equipment] = useState<MedicalEquimentInterface[]>([]);
  const [Location, setLocation] = useState<LocationInterface[]>([]);

  const [Med_Employee, setMedByUID] = useState<MedEmployeeInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  


  // handleClose ประมาณว่าแสดงสเน็บบลาเร็จ ก็ปิดไป
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };
  //onChange ทำงานตอนไหน == ทุกครั้งที่มีการเปลี่ยนค่าในฟิลนั่นๆ เช่นcombobox
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof request;
    setrequest({
      ...request,
      [name]: event.target.value,
    });
  };
  ////

  const getMedByUID = async () => {
    let res = await GetMedByUID();
    request.Med_EmployeeID = res.ID;
    if (res) {

      setMedByUID(res);
      console.log(res);
    }
  };
  

  const getMed_Equipment = async () => {
    let res = await GetMedicalEquipments();
    if (res) {
      setMed_Equipment(res);
    }
  };

  const getLocation = async () => {
    let res = await GetLocation();
    if (res) {
      setLocation(res);
    }
  };

  useEffect(() => {
    getMed_Equipment();
    getLocation();
    getMedByUID();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      
      Med_EquipmentID: convertType(request.MedEquipmentID),
      LocationID: convertType(request.LocationID),
      Med_EmployeeID: convertType(request.Med_EmployeeID),
      R_ID: (R_ID),
      QUANTITY: (QUANTITY),
      TIME: request.TIME,
      R_NAME: (R_NAME),
      
    };

    let res = await Request(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  };


  return (
    <div>
      <Container maxWidth="md">
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            บันทึกข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            บันทึกข้อมูลไม่สำเร็จ
          </Alert>
        </Snackbar>
        {/*<Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />*/}
        <Paper >
          <Box
            display={"flex"}
            sx={{
              marginTop: 2,
              paddingX: 2,
              paddingY: 2,
            }}
          >
            <h2>Creat Request</h2>
          </Box>
          <hr />
          <Grid container spacing={2} sx={{ padding: 2 }} >
            <Grid item xs={6}>
              <p>เลขกำกับการเบิก</p>
              <TextField
                fullWidth
                id="R_ID"
                type="string"
                variant="outlined"
                onChange={(event) => setR_ID(event.target.value)} />
              {/*<Item>ชื่อนามสกุล</Item>*/}
            </Grid>
            <Grid item xs={6}>
              <p>จำนวน</p>
              <TextField
                fullWidth
                id="QUANTITY"
                type="string"
                variant="outlined"
                onChange={(event) => setQUANTITY(event.target.value)} />
              {/*<Item>ชื่อนามสกุล</Item>*/}
            </Grid>

            <Grid item xs={6}>
              <p>วันเวลาที่เบิก</p>
              <FormControl fullWidth > 
                <LocalizationProvider required dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="กรุณาเลือกวันเวลา *"
                    value={request.TIME}
                    onChange={(newValue) => {
                      setrequest({
                        ...request,
                        TIME: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>สถานที่</p>
                <Select
                  native
                  value={request.LocationID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "LocationID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกสถานที่
                  </option>
                  {Location.map((item: LocationInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <p>เคส</p>
              <TextField
                fullWidth
                id="R_NAME"
                type="string"
                variant="outlined"
                onChange={(event) => setR_NAME(event.target.value)} />
              {/*<Item>เบอร์โทร</Item>*/}
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>อุปกรณ์</p>
                <Select
                  native
                  value={request.MedEquipmentID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "MedEquipmentID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกอุปกรณ์
                  </option>
                  {Med_Equipment.map((item: MedicalEquimentInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Equipment}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button component={RouterLink} to="/students" variant="contained" color='info'>Back</Button>
              <Button
                variant="contained"
                color='success'
                sx={{ float: "right" }}
                onClick={submit}
              >Submit</Button>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    </div>
  );
}

export default RequestCreate;

