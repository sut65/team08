import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import internal from "stream";
import Paper from "@mui/material/Paper";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Typography from "@mui/material/Typography";
import { AppointInterface } from "../Models/IAppoint";
import { TreatmentsInterface } from "../Models/ITreatment";
import { LevelcureInterface } from "../Models/ILevelcure";
import { DepartmentInterface } from "../Models/IDepartment";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';


import {
  GetTreatment,
  GetLevelcure,
  GetDepartment, 
  GetScrenByUID, ///++
  CreateAppoint,
  ListReady_Appoint,
  Treatment_Disease_Text,
} from "../Services/HttpClientService";
import { Screening_officersInterface } from "../Models/IScreening_officer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Appoints() {
  const [appoint, setAppoint] = useState<AppointInterface>({
    Date_now: new Date(),
    Date_appoint: new Date(),
  });
  const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);
  const [screening_officer, setScrenByUID] = useState<Screening_officersInterface>({});
  const [levelcure, setLevelcure] = useState<LevelcureInterface[]>([]);
  const [department, setDepartment] = useState<DepartmentInterface[]>([]);
  const [Text_appoint, setText_appoint] = useState<string>("");
  const [Appoint_ID, setAppoint_ID] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //เพิ่ม
  const [treatment_Dis, setTreatment_Dis] = useState<TreatmentsInterface>({});
  const [message, setAlertMessage] = React.useState("");

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
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
  ///+++gg
  const getScrenByUID = async () => {
    let res = await GetScrenByUID();
    appoint.Screening_officerID = res.ID;
    if (res) {

      setScrenByUID(res);
      console.log(res);
    }
  };

  // const getScreening_officer = async () => {
  //   let res = await GetScreening_officer();
  //   if (res) {
  //     setScreening_officer(res);
  //     console.log("Load Officer Complete");
  //   } else {
  //     console.log("Load Officer InComplete!!!!");
  //   }
  // };
  const getDepartment = async () => {
    let res = await GetDepartment();
    if (res) {
      setDepartment(res);
      console.log("Load Department Complete");
    } else {
      console.log("Load Department InComplete!!!!");
    }
  };
  const getLevelcure = async () => {
    let res = await GetLevelcure();
    if (res) {
      setLevelcure(res);
      console.log("Load Levelcure Complete");
    } else {
      console.log("Load Levelcure InComplete!!!!");
    }
  };
  const getTreatment = async () => {
    let res = await ListReady_Appoint();
    if (res) {
      setTreatment(res);
      console.log("Load Treatment Complete");
    } else {
      console.log("Load Treatment InComplete!!!!");
    }
  };

  useEffect(() => {
    getScrenByUID();//++
    getDepartment();
    getTreatment();
    getLevelcure();
  }, []);

// รวมดึงการรักษา
const Final_OnChangetreat = async (e: SelectChangeEvent) =>{
  const id = e.target.value
  const name = e.target.name as keyof typeof appoint;
  const value = e.target.value;
  let res = await Treatment_Disease_Text(id);
  if (res) {
    setAppoint({
      ...appoint,
      [name]: value,
    });
  }
  setTreatment_Dis(res);
    console.log(treatment_Dis);
    console.log(`[${name}]: ${value}`);
}

const onChangetreat = async (e: SelectChangeEvent) =>{
  const id = e.target.value
  let res = await Treatment_Disease_Text(id);
  if (res) {
    setTreatment_Dis(res);
    console.log(res);
  }
}
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof appoint;
    const value = event.target.value;
    setAppoint({
      ...appoint,
      [name]: value,
    });
    console.log(`[${name}]: ${value}`);
  };

  async function submit() {
    if (appoint.TreatmentID == undefined || appoint.TreatmentID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกผู้ป่วยที่ต้องการนัด");
  }
    else if (appoint.LevelcureID == undefined || appoint.LevelcureID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกสิทธิการรักษาของผู้ป่วย")
    }
    else if (appoint.DepartmentID == undefined|| appoint.DepartmentID == 0){
      setError(true);
      setAlertMessage("กรุณาแผนกที่ทำการนัด")
  }
  else{
    let data = {
      Screening_officerID: convertType(appoint.Screening_officerID),
      TreatmentID: convertType(appoint.TreatmentID),
      LevelcureID: convertType(appoint.LevelcureID),
      DepartmentID: convertType(appoint.DepartmentID),
      Text_appoint: (Text_appoint),
      Date_now: appoint.Date_now,
      Date_appoint: appoint.Date_appoint,
      Appoint_ID:(Appoint_ID),
    };
    console.log(data);
    let res = await CreateAppoint(data);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }}

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >

<Alert onClose={handleClose} severity="success">
        {message}
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} >
      <Alert onClose={handleClose} severity="error">
        {message}
        </Alert>
      </Snackbar>

      <Paper>
        <Box flexGrow={1}>
          <Paper>
            <Box sx={{ paddingX: 2, paddingY: 2 }}>
              <Typography
                component="h5"
                variant="h5"
                color="primary"
                gutterBottom
              >
                ระบบการนัดคนไข้ของแพทย์
              </Typography>
            </Box>
          </Paper>
          <Divider />
        </Box>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <p>เจ้าหน้าที่ผู้บันทึก</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                value={screening_officer.Screening_officer_Name || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้ป่วย</p>
              <Select
                native
                id="TreatmentID"
                value={appoint.TreatmentID + ""}
                onChange={Final_OnChangetreat}
                inputProps={{
                  name: "TreatmentID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรายการการรักษา
                </option>
                {treatment.map((item: TreatmentsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Patient?.Patient_Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <p>หมายเลขการรักษา</p>
            <FormControl fullWidth variant="outlined">
            <TextField
            value={treatment_Dis?.TREATMENT_ID || ""}
            InputProps={{
              readOnly: true,
            }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <p>หมายเลขการนัด</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                id="Appoint_ID"
                type="string"
                variant="outlined"
                onChange={(event) => setAppoint_ID(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>รายละเอียดการรักษา</p>
            <FormControl fullWidth variant="outlined">
            <TextField
            value={treatment_Dis?.CONCLUSION || ""}
            InputProps={{
              readOnly: true,
            }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สิทธิในการรักษา</p>
              <Select
                native
                id = "LevelcureID"
                value={appoint.LevelcureID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "LevelcureID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสิทธิในการรักษา
                </option>
                {levelcure.map((item: LevelcureInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>แผนกที่ทำการนัด</p>
              <Select
                native
                id = "DepartmentID"
                value={appoint.DepartmentID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "DepartmentID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกแผนก
                </option>
                {department.map((item: DepartmentInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <p>จำนวนวันที่แพทย์ต้องการนัด</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                value={treatment_Dis?.APPOINTMENT || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <p>ข้อปฎิบัติก่อนการตรวจ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                id="Name"
                type="string"
                variant="outlined"
                onChange={(event) => setText_appoint(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>วันที่และเวลาปัจจุบัน</p>
            <FormControl fullWidth>
              <LocalizationProvider required dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="กรุณาเลือกวันและเวลา *"
                  value={appoint.Date_now}
                  onChange={(newValue) => {
                    setAppoint({
                      ...appoint,
                      Date_now: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>วันที่และเวลาในการนัด</p>
            <FormControl fullWidth>
              <LocalizationProvider required dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="กรุณาเลือกวันและเวลา *"
                  value={appoint.Date_appoint}
                  minDateTime = {appoint.Date_now}
                  onChange={(newValue) => {
                    setAppoint({
                      ...appoint,
                      Date_appoint: newValue,
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
              to="/DispenseList"
              variant="contained"
              color="primary"
              startIcon={<ContentPasteSearchIcon />}
            >
              ดูข้อมูลการนัดหมาย
            </Button>
            <Button
             style={{ float: "right" }}
             onClick={submit}
             variant="contained"
             color="primary"
             startIcon={<AddCircleIcon />}

           >
             บันทึกข้อมูลการนัดหมาย
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default Appoints;
