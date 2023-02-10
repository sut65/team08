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

import { TreatmentsInterface } from "../Models/ITreatment";
import { BuildingInterface } from "../Models/IBuilding";
import { RoomInterface } from "../Models/IRoom";
import { StateInterface } from "../Models/IState";
import { Save_ITIsInterface } from "../Models/ISave_ITI";

import {GetBuilding,GetRoom,GetState,CreateSave_ITI,GetReady_Treat,ListReady_Treat,GetDoctorByUID, ListRoombyBuildings, GetBuildingOne} from "../Services/HttpClientService";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { updateSourceFile } from "typescript";
import { DoctorInterface } from "../Models/IDoctor";

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function Save_ITIUpdate() {
    const [Save_ITIs, setSave_ITIs] = useState<Save_ITIsInterface>({
      Date_checkin: new Date(),
      Date_checkout: new Date(),
    });
    const [Save_ITIs_ID, setSave_ITIs_ID] = React.useState<Number | undefined>(undefined);

    const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);
    const [Building, setBuilding] = useState<BuildingInterface[]>([]);
    const [BuildingOne, setBuildingOne] = useState<BuildingInterface>({});
    const [Room, setRoom] = useState<RoomInterface[]>([]);
    const [State, setState] = useState<StateInterface[]>([]);
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
      Save_ITIs.DoctorID = res.ID;
      if (res) {
  
        setDoctorByUID(res);
        console.log(res);
      }
    };

// เอาฟังก์ชั่นมารวมกัน
  const final_Change =async (e: SelectChangeEvent) => {
  const id = e.target.value
  const name = e.target.name as keyof typeof Save_ITIs;
  const value = e.target.value;
  let res = await GetReady_Treat(id);
  if (res) {
  setSave_ITIs({
      ...Save_ITIs,
      [name]: value,
  });
  }
  console.log(`${name}: ${value}`);
  setTreatOne(res);
  console.log(TreatOne);
}

function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

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

function update() {
    let upsave = {
      ID: Save_ITIs.ID,

      Date_checkin: Save_ITIs.Date_checkin,
      Date_checkout: Save_ITIs.Date_checkin,

      TreatmentID: Save_ITIs.TreatmentID,
      //BuildingID: Number(Save_ITIs.BuildingID),
      RoomID: Number(Save_ITIs.RoomID),
      StateID: Number(Save_ITIs.StateID),
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upsave),
    };
    console.log(upsave);

    fetch(`http://localhost:8080/Save_ITIUpdate`, requestOptions)
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

  const getSave_ITI = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/Save_ITI/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setSave_ITIs(res.data);
          setSave_ITIs_ID(res.data.ID);
        }
      });
  };

const handleChange = (event: SelectChangeEvent) => {
  const name = event.target.name as keyof typeof Save_ITIs;
  const value = event.target.value;
  setSave_ITIs({
      ...Save_ITIs,
      [name]: value,
  });
  console.log(`${name}: ${value}`);
};
  
  const getTreatment = async () => {
    let res = await ListReady_Treat();
    if (res) {
      setTreatment(res);
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
 const getState = async () => {
    let res = await GetState();
    if (res) {
      setState(res);
      console.log(res);
  }
};
  useEffect(() => {
    getTreatment();
    getBuilding();
    getRoom();
    getState();
    getSave_ITI();
    getDoctorByUID();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
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
              จัดการข้อมูลการรักษาคนไข้ภายใน
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>การรักษา</p>
              <Select
                native
                value={Save_ITIs.TreatmentID + ""}
                onChange={final_Change}
                inputProps={{
                  name: "TreatmentID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกการรักษา
                </option>
                {treatment.map((item: TreatmentsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.TREATMENT_ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

        <Grid item xs={4.5}>
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

        <Grid item xs={4.5}>
          <p>ชื่อผู้ป่วย</p>
          <FormControl fullWidth >
            <TextField
              required
              id="Patiend"
              type="string"
              label=""
              inputProps={{
                name: "Patiend",
              }}
              // แก้ไขตัวแปร ******************
              value={TreatOne?.Patient?.Patient_Name + ""}
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
                value={Save_ITIs.RoomID + ""}
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
            <FormControl fullWidth variant="outlined">
              <p>สถานะ</p>
              <Select
                native
                value={Save_ITIs.StateID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "StateID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานะ
                </option>
                {State.map((item: StateInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

        <Grid item xs={6}>
          <p>วันเวลาที่เข้า</p>
          <FormControl fullWidth > 
            <LocalizationProvider required dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="กรุณาเลือกวันเวลาที่เข้า *"
                value={Save_ITIs.Date_checkin}
                onChange={(newValue) => {
                  setSave_ITIs({
                    ...Save_ITIs,
                    Date_checkin: newValue,
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <p>วันเวลาที่ออก</p>
          <FormControl fullWidth > 
            <LocalizationProvider required dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="กรุณาเลือกวันเวลาที่ออก *"
                value={Save_ITIs.Date_checkout}
                minDateTime = {Save_ITIs.Date_checkin}
                onChange={(newValue) => {
                  setSave_ITIs({
                    ...Save_ITIs,
                    Date_checkout: newValue,
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
              to="/Save_ITICreate"
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

export default Save_ITIUpdate;