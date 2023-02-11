import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import BedIcon from '@mui/icons-material/Bed';
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import { BuildingInterface } from "../Models/IBuilding";
import { RoomInterface } from "../Models/IRoom";
import { Save_ITIsInterface } from "../Models/ISave_ITI";

import {GetBuilding,GetRoom,ListReady_Save,CreateOperating_Room,GetReady_Save_ITI,GetReady_Treat,GetDoctorByUID, ListRoombyBuildings, GetBuildingOne} from "../Services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Operating_RoomsInterface } from "../Models/IOperating_Room";
import { TreatmentsInterface } from "../Models/ITreatment";
import { DoctorInterface } from "../Models/IDoctor";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Operating_RoomCreate() {
  const [Operating_Rooms, setOperating_Rooms] = useState<Operating_RoomsInterface>({
    Datetime: new Date(),
  });
  const [Save_ITIs, setSave_ITIs] = useState<Save_ITIsInterface[]>([]);
  const [Building, setBuilding] = useState<BuildingInterface[]>([]);
  const [BuildingOne, setBuildingOne] = useState<BuildingInterface>({});
  const [Room, setRoom] = useState<RoomInterface[]>([]);
  const [Save_ITIOne, setSave_ITIOne] = useState<Save_ITIsInterface>({
    State:{Name:"-----"}
  });
  const [TreatOne, setTreatOne] = useState<TreatmentsInterface>({
    Patient:{Patient_Name:"-----"}
  });
  const [NumOper, setNumOper] = useState<string>("");
  const [TextOper, setTextOper] = useState<string>("");
  const [DoctorByUID, setDoctorByUID] = useState<DoctorInterface>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setAlertMessage] = React.useState("");


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
    setErrorMessage("");
  };

  const getDoctorByUID = async () => {
    let res = await GetDoctorByUID();
    Operating_Rooms.DoctorID = res.ID;
    if (res) {

      setDoctorByUID(res);
      console.log(res);
    }
  };

  function clear() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const final_Change =async (e: SelectChangeEvent) => {
    const id = e.target.value
    const name = e.target.name as keyof typeof Operating_Rooms;
    const value = e.target.value;
    let res = await GetReady_Save_ITI(id);
    //let res1 = await GetReady_Treat(id);
    if (res) {
      setOperating_Rooms({
        ...Operating_Rooms,
        [name]: value,
      });
      console.log(`${name}: ${value}`);
      setSave_ITIOne(res);
      console.log(res);
    }
    let res1 = await GetReady_Treat(res.TreatmentID);
    if (res1) {
      console.log(`${name}: ${value}`);
      setTreatOne(res1);
      console.log(res1);
    }
  }

  const onChange_Save = async (e: SelectChangeEvent) =>{
    const id = e.target.value
    let res = await GetReady_Save_ITI(id);
    if (res) {
      setSave_ITIOne(res);
      console.log(res);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Operating_Rooms;
    const value = event.target.value;
    setOperating_Rooms({
        ...Operating_Rooms,
        [name]: value,
    });
    console.log(`${name}: ${value}`);
};

const onChangeBuilding = async (e: SelectChangeEvent) =>{
  const bid = e.target.value;
  let res = await ListRoombyBuildings(bid);
  if (res) {
    setRoom(res);
    console.log("Load Room Complete");
  }
  else{
    console.log("Load Room Incomplete!!!");
  }

  res = await GetBuildingOne(bid);
  if (res) {
    setBuildingOne(res) ;
    console.log("Load Building Complete");
  }
  else{
    console.log("Load Building Incomplete!!!");
  }
}

const getSave_ITI = async () => {
  let res = await ListReady_Save();
  if (res) {
    setSave_ITIs(res);
    console.log(res);
  }
};

const getBuilding = async () => {
  let res = await GetBuilding();
  if (res) {
    setBuilding(res);
    console.log(res);
}
};
const getRoom = async () => {
  let res = await GetRoom();
  if (res) {
    setRoom(res);
    console.log(res);
}
};
useEffect(() => {
  getDoctorByUID();
  getSave_ITI();
  getBuilding();
  getRoom();
}, []);

const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};

async function submit() {
  if (Operating_Rooms.Save_ITIID == undefined || Operating_Rooms.Save_ITIID == 0){
    setError(true);
    setAlertMessage("กรุณาเลือกเคสผู้ป่วยที่ต้องการผ่าตัด");
  }
  else if (Operating_Rooms.RoomID == undefined || Operating_Rooms.RoomID == 0){
    setError(true);
    setAlertMessage("กรุณาเลือกตึกและห้องที่ต้องการผ่าตัด")
  }

  else {
    let data = {
      DoctorID: convertType(Operating_Rooms.DoctorID),
      Save_ITIID: convertType(Operating_Rooms.Save_ITIID),
      //BuildingID: convertType(Save_ITIOne.ID),
      RoomID: convertType(Operating_Rooms.RoomID),

      NumOper: (NumOper),
      TextOper: (TextOper),
      Datetime: Operating_Rooms.Datetime,
    };
  
    console.log(data);
    let res = await CreateOperating_Room(data);
      if (res.status) {
        setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
      } else {
        setAlertMessage(res.message);
        setError(true);
      }
    }
}

return (
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
      open={error}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>

    <Paper>
      <Box
        display="flex"
        sx={{
          marginTop: 2,
        }}
      >
        <Box sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
          >
            จองห้องผ่าตัด
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Grid container spacing={3} sx={{ padding: 2 }}>

      <Grid item xs={3}>
            <p>หมายเลขการผ่าตัด</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                id="NumOper"
                type="string"
                variant="outlined"
                label="ระบุหมายเลข" 
                onChange={(event) => setNumOper(event.target.value)}
              />
           </FormControl>
      </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <p>คนไข้ภายในที่ต้องรับการผ่าตัด</p>
            <Select
              native
              value={Operating_Rooms.Save_ITIID + ""}
              onChange={final_Change}
              inputProps={{
                name: "Save_ITIID",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือก
              </option>
              {Save_ITIs.map((item: Save_ITIsInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.ID}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

      <Grid item xs={5}>
        <p>ชื่อแพทย์ที่รับผิดชอบ</p>
        <FormControl fullWidth >
          <TextField
            required
            id="Explain"
            type="string"
            label=""
            inputProps={{
              name: "Explain",
            }}
            value={DoctorByUID?.FirstNameEN + ""}
            // onChange={handleInputChange_Text}
          />
        </FormControl>
      </Grid>

      <Grid item xs={7}>
        <p>ชื่อผู้ป่วย</p>
        <FormControl fullWidth >
          <TextField
            required
            id="Explain"
            type="string"
            label=""
            inputProps={{
              name: "Explain",
            }}
            value={TreatOne?.Patient?.Patient_Name + "" || "aa"}
            // onChange={handleInputChange_Text}
          />
        </FormControl>
      </Grid>

      <Grid item xs={5}>
        <p>สถานะ</p>
        <FormControl fullWidth >
          <TextField
            required
            id="Explain"
            type="string"
            label=""
            inputProps={{
              name: "Explain",
            }}
            value={Save_ITIOne?.State?.Name + "" || "aa"}
            // onChange={handleInputChange_Text}
          />
        </FormControl>
      </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ตึก</p>
            <Select
              native
              value={BuildingOne.ID + ""}
              onChange={onChangeBuilding}
              inputProps={{
                name: "BuildingID",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกตึก
              </option>
              {Building.map((item: BuildingInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ห้อง</p>
            <Select
              native
              value={Operating_Rooms.RoomID + ""}
              onChange={handleChange}
              inputProps={{
                name: "RoomID",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกห้อง
              </option>
              {Room.map((item: RoomInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      
        <Grid item xs={7}>
            <p>ระบุรายละเอียดการผ่าตัด</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                id="setTextOper"
                type="string"
                variant="outlined"
                label="รายละเอียดแผนการรักษา" 
                onChange={(event) => setTextOper(event.target.value)}
              />
            </FormControl>
          </Grid>

      <Grid item xs={5}>
        <p>วันเวลาที่จอง</p>
        <FormControl fullWidth > 
          <LocalizationProvider required dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="กรุณาเลือกวันเวลาที่ต้องการจอง"
              value={Operating_Rooms.Datetime}
              onChange={(newValue) => {
                setOperating_Rooms({
                  ...Operating_Rooms,
                  Datetime: newValue,
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
          <Button
              component={RouterLink}
              to="/Operating_Room"
              variant="contained"
              color="primary"
              startIcon={<BedIcon />}
            >
              ดูข้อมูลคนการจองห้องผ่าตัด
            </Button>
            <Button
             style={{ float: "right" }}
             onClick={submit}
             variant="contained"
             color="primary"
             startIcon={<DataSaverOffIcon />}

           >
             บันทึกข้อมูลการจองห้องผ่าตัด
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);
}

export default Operating_RoomCreate;