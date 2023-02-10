import React, { useEffect, useState } from 'react';
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
import { Link as RouterLink, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DiseasesInterface } from "../Models/IDisease";
import { DoctorInterface } from "../Models/IDoctor";
import { TreatmentsInterface } from "../Models/ITreatment";
import { PatientsInterface } from "../Models/IPatient";
import { StatusInterface } from "../Models/IStatus";
import { TrackInterface } from "../Models/ITrack";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  GetDisease,
  GetStatus,
  GetDoctorByUID,
  GetPatient,
  GetTrack,
  Treatment,
} from "../Services/HttpClientService";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Typography } from '@mui/material';
//import moment from 'moment';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TreatmentUpdate() {

  const [treatment, settreatment] = useState<TreatmentsInterface>({DATE: new Date(),});
  const [treatmentID, settreatmentID] = React.useState<Number | undefined>(undefined);


  const [TREATMENT_ID, setTREATMENT_ID] = useState<string>("");
  const [TREATMENT, setTREATMENT] = useState<string>("");
  const [CONCLUSION, setCONCLUSION] = useState<string>("");
  const [GUIDANCE, setGUIDANCE] = useState<string>("");
  const [Disease, setDisease] = useState<DiseasesInterface[]>([]);
  const [Status, setStatus] = useState<StatusInterface[]>([]);
  const [Track, setTrack] = useState<TrackInterface[]>([]);
  const [Patient, setPatient] = useState<PatientsInterface[]>([]);
  const [doctor, setDoctors] = useState<DoctorInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [APPOINTMENT, setAPPOINTMENT] = useState<string>(""); 
  const [DoctorByUID, setDoctorByUID] = useState<DoctorInterface[]>([]);

  const [message, setAlertMessage] = React.useState("");
  const params = useParams()
  //const [MedicalEquipment, setMedicalEquipment] = useState<MedicalEquimentInterface>({});



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
  //++
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof treatment;

    const { value } = event.target;

    settreatment({ ...treatment, [id]: value });
  };
  //--
  const getDoctorByUID = async () => {
    let res = await GetDoctorByUID();
    treatment.DoctorID = res.ID;
    if (res) {

      setDoctorByUID(res);
      console.log(res);
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

  const getPatient = async () => {
    let res = await GetPatient();
    if (res) {
      setPatient(res);
    }
  };

  useEffect(() => {
    getDisease();
    getStatus();
    getTrack();
    getPatient();
    getDoctorByUID();
    getTreatment();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function update() {

    if (treatment.DiseaseID == 0|| treatment.DiseaseID == undefined){
      setError(true);
      setAlertMessage("  กรุณาเลือกโรคจากการวินิจฉัย");
    }
    else if (treatment.StatusID == 0 ||treatment.StatusID == undefined ){
      setError(true);
      setAlertMessage("  กรุณาเลือกสถานะการรักษา");
    }
    else if (treatment.TrackID == 0 ||treatment.TrackID == undefined ){
      setError(true);
      setAlertMessage("  กรุณาเลือกสถานะติดตามผล");
    }
    else if (treatment.PatientID == 0 ||treatment.PatientID == undefined){
      setError(true);
      setAlertMessage("  กรุณาเลือกผู้ป่วย");
    }
    else{
      let data = {
        ID: treatment.ID,

        DiseaseID: convertType(treatment.DiseaseID),
        StatusID: convertType(treatment.StatusID),
        TrackID: convertType(treatment.TrackID),
        PatientID: convertType(treatment.PatientID),
        DoctorID: convertType(treatment.DoctorID),
  
        TREATMENT_ID: treatment.TREATMENT_ID,
        TREATMENT: treatment.TREATMENT,
        DATE: treatment.DATE,
        CONCLUSION: treatment.CONCLUSION,
        GUIDANCE: treatment.GUIDANCE,
        APPOINTMENT: convertType(treatment.APPOINTMENT),
  
      };
      console.log(data)
      let res = await Treatment(data);
      if (res.status) {
        setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
       } else {
        setAlertMessage(res.message);
        setError(true);
      }
      const requestOptions = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log(data);
  
      fetch(`http://localhost:8080/treatmentsUpdate`, requestOptions)
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
  };

  const getTreatment = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/treatmentss/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          settreatment(res.data);
          settreatmentID(res.data.ID);
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
            }}
          >
            <Box sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                ข้อมูลการรักษา
              </Typography>
            </Box>
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
                
                value={treatment.TREATMENT_ID}
                onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <p>อาการเบื้องต้น</p>
              <TextField
                fullWidth
                id="TREATMENT"
                type="string"
                variant="outlined"
                value={treatment.TREATMENT}
                onChange={handleInputChange} />
              {/*<Item>ชื่อนามสกุล</Item>*/}
            </Grid>


            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>ผู้ป่วย</p>
                <Select
                  native
                  value={treatment.PatientID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "PatientID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกผู้ป่วย
                  </option>
                  {Patient.map((item: PatientsInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Patient_Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>โรคจากการวินิจฉัย</p>
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
                <p>สถานะติดตามผล</p>
                <Select
                  native
                  value={treatment.TrackID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "TrackID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกสถานะติดตามผล
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
              <FormControl fullWidth variant="outlined">
              <TextField
                id="APPOINTMENT"
                
                type="Number"
                inputProps={{ name: "Number", min: 0 ,max:100}} 
                value={treatment.APPOINTMENT}
                onChange={handleInputChange}
              />
            </FormControl>
              {/* <TextField
                fullWidth
                id="APPOINTMENT"
                type="string"
                variant="outlined"
                label="0-100"
                onChange={(event) => setAPPOINTMENT(event.target.value)} />
              นัดครั้งถัดไป */}
            </Grid>

            <Grid item xs={6}>
              <p>สรุปผลการรักษา</p>
              <TextField
                fullWidth
                id="CONCLUSION"
                type="string"
                variant="outlined"
                value={treatment.CONCLUSION}
                onChange={handleInputChange} />
              {/*<Item>เบอร์โทร</Item>*/}
            </Grid>


            <Grid item xs={6}>
              <p>คำแนะนำ</p>
              <TextField
                fullWidth
                id="GUIDANCE"
                type="string"
                variant="outlined"
                value={treatment.GUIDANCE}
                onChange={handleInputChange} />
              {/*<Item>เบอร์โทร</Item>*/}
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <p>สถานะการรักษา</p>
                <Select
                  native
                  value={treatment.StatusID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "StatusID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกสถานะการรักษา
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
              <Button component={RouterLink} to="/Treatments" variant="contained" color='info' startIcon={<FavoriteIcon />}>ดูข้อมูลการรักษา</Button>
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

export default TreatmentUpdate;

