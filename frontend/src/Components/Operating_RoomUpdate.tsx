import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
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

import { BuildingInterface } from "../Models/IBuilding";
import { RoomInterface } from "../Models/IRoom";
import { Save_ITIsInterface } from "../Models/ISave_ITI";

import {GetBuilding,GetRoom,ListReady_Save,CreateOperating_Room,GetReady_Save_ITI,GetReady_Treat,GetDoctorByUID} from "../Services/HttpClientService";
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

function Operating_RoomUpdate() {
  const [Operating_Rooms, setOperating_Rooms] = useState<Operating_RoomsInterface>({
    Datetime: new Date(),
  });
  const [Operating_Rooms_ID, setOperating_Rooms_ID] = React.useState<Number | undefined>(undefined);

  const [Save_ITIs, setSave_ITIs] = useState<Save_ITIsInterface[]>([]);
  const [Building, setBuilding] = useState<BuildingInterface[]>([]);
  const [Room, setRoom] = useState<RoomInterface[]>([]);
  const [Save_ITIOne, setSave_ITIOne] = useState<Save_ITIsInterface>({
    State:{Name:"-----"}
  });
  const [TreatOne, setTreatOne] = useState<TreatmentsInterface>({
    Patient:{Patient_Name:"-----"}
  });
  const [DoctorByUID, setDoctorByUID] = useState<DoctorInterface>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams()

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

  const getDoctorByUID = async () => {
    let res = await GetDoctorByUID();
    Operating_Rooms.DoctorID = res.ID;
    if (res) {

      setDoctorByUID(res);
      console.log(res);
    }
  };

  const final_Change =async (e: SelectChangeEvent) => {
    const id = e.target.value
    const name = e.target.name as keyof typeof Operating_Rooms;
    const value = e.target.value;
    let res = await GetReady_Save_ITI(id);
    let res1 = await GetReady_Treat(id);
    if (res) {
      setOperating_Rooms({
        ...Operating_Rooms,
        [name]: value,
      });
      console.log(`${name}: ${value}`);
      setSave_ITIOne(res);
      console.log(res);
    }
    if (res1) {
      setOperating_Rooms({
        ...Operating_Rooms,
        [name]: value,
      });
      console.log(`${name}: ${value}`);
      setTreatOne(res1);
      console.log(res1);
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
  getOperating_Room();
}, []);

const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  function update() {
    let upopeate = {
      ID: Operating_Rooms.ID,

      Datetime: Operating_Rooms.Datetime,
		
	  Save_ITI: Operating_Rooms.Save_ITI,
	  Building: Number(Operating_Rooms.Building),
	  Room: Number(Operating_Rooms.Room),
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upopeate),
    };
    console.log(upopeate);

    fetch(`http://localhost:8080/Operating_RoomUpdate`, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          await timeout(1000); //for 1 sec delay
          window.location.reload();     
          
        } else {
          setError(true);
        }
      });
  }

  const getOperating_Room = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/Operating_Room/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setOperating_Rooms(res.data);
          setOperating_Rooms_ID(res.data.ID);
        }
      });
  };

return (
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

      <Grid item xs={8}>
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
            value={TreatOne?.Patient?.Patient_Name + ""}
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
            value={Save_ITIOne?.State?.Name + ""}
            // onChange={handleInputChange_Text}
          />
        </FormControl>
      </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ตึก</p>
            <Select
              native
              value={Operating_Rooms.BuildingID + ""}
              onChange={handleChange}
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

      <Grid item xs={6}>
        <p>วันเวลาที่จอง</p>
        <FormControl fullWidth > 
          <LocalizationProvider required dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="กรุณาเลือกวันเวลาที่เข้า *"
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
            to="/Operating_RoomCreate"
            variant="contained"
            color="inherit"
          >
            กลับ
          </Button>
          <Button
            style={{ float: "right" }}
            onClick={update}
            variant="contained"
            color="primary"
          >
            บันทึก
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);
}

export default Operating_RoomUpdate;