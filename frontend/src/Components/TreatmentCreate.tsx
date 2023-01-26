import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FormControl from '@mui/material/FormControl/FormControl';

//New
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { DiseasesInterface } from "../Models/IDisease";
import { DoctorInterface } from "../Models/IDoctor";
import { TreatmentsInterface } from "../Models/ITreatment";
import { PatiendsInterface } from "../Models/IPatiend";
import { StatusInterface } from "../Models/IStatus";
import { TrackInterface } from "../Models/ITrack";
//box
import {
  GetDisease,
  GetStatus,
  GetDoctor,
  GetPatiend,
  GetTrack,
  Treatment,
} from "../Services/HttpClientService";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
//import moment from 'moment';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TreatmentCreate() {

  const [treatment, settreatment] = useState<TreatmentsInterface>({DATE: new Date(),});
  const [TREATMENT_ID, setTREATMENT_ID] = useState<string>("");
  const [TREATMENT, setTREATMENT] = useState<string>("");
  const [CONCLUSION, setCONCLUSION] = useState<string>("");
  const [GUIDANCE, setGUIDANCE] = useState<string>("");
  const [Disease, setDisease] = useState<DiseasesInterface[]>([]);
  const [Status, setStatus] = useState<StatusInterface[]>([]);
  const [Track, setTrack] = useState<TrackInterface[]>([]);
  const [Patient, setPatient] = useState<PatiendsInterface[]>([]);
  const [doctor, setDoctors] = useState<DoctorInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [APPOINTMENT, setAPPOINTMENT] = useState<string>("");


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
    const name = event.target.name as keyof typeof treatment;
    settreatment({
      ...treatment,
      [name]: event.target.value,
    });
  };
  //
  const getDoctor = async () => {
    let res = await GetDoctor();
    treatment.DoctorID = res.ID;
    console.log(treatment.DoctorID);
    if (res) {
      setDoctors(res);
    }
  };

  const getDisease = async () => {
    let res = await GetDisease();
    if (res) {
      setDisease(res);
    }
  };

  const getStatus = async () => {
    let res = await GetStatus();
    if (res) {
      setStatus(res);
    }
  };

  const getTrack = async () => {
    let res = await GetTrack();
    if (res) {
      setTrack(res);
    }
  };

  const getPatiend = async () => {
    let res = await GetPatiend();
    if (res) {
      setPatient(res);
    }
  };

  useEffect(() => {
    getDisease();
    getStatus();
    getTrack();
    getPatiend();
    getDoctor();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      DiseaseID: convertType(treatment.DiseaseID),
      StatusID: convertType(treatment.StatusID),
      TrackID: convertType(treatment.TrackID),
      PatiendID: convertType(treatment.PatiendID),
      DoctorID: convertType(treatment.DoctorID),

      TREATMENT_ID: (TREATMENT_ID),
      TREATMENT: (TREATMENT),
      DATE: treatment.DATE,
      CONCLUSION: (CONCLUSION),
      GUIDANCE: (GUIDANCE),
      APPOINTMENT: (APPOINTMENT),
    };

    let res = await Treatment(data);
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
            <h2>Creat Treatment</h2>
          </Box>
          <hr />
          <Grid container spacing={2} sx={{ padding: 2 }} >
            <Grid item xs={6}>
              <p>เลขกำกับผลการรักษา</p>
              <TextField
                fullWidth
                id="TREATMENT_ID"
                type="string"
                variant="outlined"
                onChange={(event) => setTREATMENT_ID(event.target.value)} />
              {/*<Item>ชื่อนามสกุล</Item>*/}
            </Grid>
            <Grid item xs={6}>
              <p>การรักษา</p>
              <TextField
                fullWidth
                id="TREATMENT"
                type="string"
                variant="outlined"
                onChange={(event) => setTREATMENT(event.target.value)} />
              {/*<Item>ชื่อนามสกุล</Item>*/}
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ผู้ป่วย</p>
                <Select
                  native
                  value={treatment.PatiendID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "PatiendID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกผู้ป่วย
                  </option>
                  {Patient.map((item: PatiendsInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>โรค</p>
                <Select
                  native
                  value={treatment.DiseaseID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "DiseaseID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกโรคที่ทำการรักษา
                  </option>
                  {Disease.map((item: DiseasesInterface) => (
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
                    value={treatment.DATE}
                    onChange={(newValue) => {
                      settreatment({
                        ...treatment,
                        DATE: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>สถาณะติดตามผล</p>
                <Select
                  native
                  value={treatment.TrackID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "TrackID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกสถาณะติดตามผล
                  </option>
                  {Track.map((item: TrackInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}> 
              <p>นัดครั้งถัดไป (จำนวนวัน)</p>
              <TextField
                fullWidth
                id="APPOINTMENT"
                type="string"
                variant="outlined"
                onChange={(event) => setAPPOINTMENT(event.target.value)} />
              {/*นัดครั้งถัดไป*/}
            </Grid>

            <Grid item xs={6}>
              <p>ผลการรักษา</p>
              <TextField
                fullWidth
                id="CONCLUSION"
                type="string"
                variant="outlined"
                onChange={(event) => setCONCLUSION(event.target.value)} />
              {/*<Item>เบอร์โทร</Item>*/}
            </Grid>


            <Grid item xs={6}>
              <p>คำแนะนำ</p>
              <TextField
                fullWidth
                id="GUIDANCE"
                type="string"
                variant="outlined"
                onChange={(event) => setGUIDANCE(event.target.value)} />
              {/*<Item>เบอร์โทร</Item>*/}
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>สถาณะการรักษา</p>
                <Select
                  native
                  value={treatment.StatusID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "StatusID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกสถาณะการรักษา
                  </option>
                  {Status.map((item: StatusInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
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

export default TreatmentCreate;

