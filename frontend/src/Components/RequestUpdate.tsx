import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormControl from '@mui/material/FormControl/FormControl';
import { Link as RouterLink, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RequestInterface } from "../Models/IRequest";
import { LocationInterface } from "../Models/ILocation";
import {
  GetMedicalEquipments,
  GetLocation,
  GetMedByUID, 
  Request,
} from "../Services/HttpClientService";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { DateTimePicker } from '@mui/x-date-pickers';
import { MedEmployeeInterface } from '../Models/IMedEmployee';
import { MedicalEquimentInterface } from '../Models/IMedEquipment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
//import moment from 'moment';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RequestUpdate() {

  const [request, setrequest] = React.useState<RequestInterface>({
    TIME: new Date(),
  });

  const [requestID, setrequestID] = React.useState<Number | undefined>(undefined);
  const [R_ID, setR_ID] = useState<string>("");
  const [QUANTITY, setQUANTITY] = useState<string>(""); 
  const [R_NAME, setR_NAME] = useState<string>("");
  const [Med_Equipment, setMed_Equipment] = useState<MedicalEquimentInterface[]>([]);
  const [Location, setLocation] = useState<LocationInterface[]>([]);
  const [Med_Employee, setMedByUID] = useState<MedEmployeeInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = React.useState("");
  const params = useParams()


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
  //++
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof request;

    const { value } = event.target;

    setrequest({ ...request, [id]: value });
  };
  //--

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
    getRequest();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function update() {
    if(request.Med_EquipmentID == 0 || request.Med_EquipmentID == undefined){
      setError(true);
      setAlertMessage("  กรุณาเลือกอุปกรณ์");
    }
    else if (request.LocationID == 0 || request.LocationID == undefined){
      setError(true);
      setAlertMessage("  กรุณาเลือกสถานที่");
    }
    else{
      let data = {

      ID: request.ID,
      
      Med_EquipmentID: convertType(request.Med_EquipmentID),
      LocationID: convertType(request.LocationID),
      Med_EmployeeID: convertType(request.Med_EmployeeID),
      R_ID: request.R_ID,
      QUANTITY: convertType(request.QUANTITY),
      TIME: request.TIME,
      R_NAME: request.R_NAME,
      
    }; 
    
    const requestOptions = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log(data);

      fetch(`http://localhost:8080/requestsUpdate/${data.ID}`, requestOptions)
        .then((response) => response.json())
        .then(async (res) => {
          console.log(res);
          if (res.data) {
            setAlertMessage("บันทึกข้อมูลสำเร็จ....");
            setSuccess(true);
           } else {
            setAlertMessage(res.error);
            setError(true);
          }
        });

    }
  };
  const getRequest = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
 
    fetch(`http://localhost:8080/request/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setrequest(res.data);
          setrequestID(res.data.ID);
        }
      });
  }


  return (
    <div>
      <Container maxWidth="md">
      <Snackbar
          id="success"
          open={success}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            
            {message}
          </Alert>
        </Snackbar>
        <Snackbar
          id="error"
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            
            {message}
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
            การเบิกอุปกรณ์เครื่องมือแลป
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
                value={request.R_ID}
                onChange={handleInputChange} />
              {/*<Item>ชื่อนามสกุล</Item>*/}
            </Grid>
            <Grid item xs={6}>
              <p>จำนวน</p>
              <FormControl fullWidth variant="outlined">
              {/* <TextField
                id="QUANTITY"
                 
                type="Number"
                inputProps={{ name: "Number", min: 0 ,max:1000}} 
                value={request.QUANTITY}
                onChange={handleInputChange}
              /> */}
              <TextField
                value={request.QUANTITY}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
              {/* <TextField
                fullWidth
                id="QUANTITY"
                type="string"
                variant="outlined"
                onChange={(event) => setQUANTITY(event.target.value)} />
              <Item>ชื่อนามสกุล</Item> */}
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
                value={request.R_NAME}
                onChange={handleInputChange}/>
              {/*<Item>เบอร์โทร</Item>*/}
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>อุปกรณ์</p>
                <Select
                  native
                  value={request.Med_EquipmentID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "Med_EquipmentID",
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
              <Button component={RouterLink} to="/requests" variant="contained" color='info' startIcon={<FactCheckIcon /> }>ดูข้อมูลการเบิกอุปกรณ์เครื่องมือแลป</Button>
              <Button
                variant="contained"
                color='success'
                sx={{ float: "right" }}
                onClick={update}
              >Submit</Button>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    </div>
  );
}

export default RequestUpdate;
