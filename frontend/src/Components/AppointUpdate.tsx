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
import { Link as RouterLink, useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
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

function AppointUpdate() {
  const [appoint, setAppoint] = useState<AppointInterface>({
    Date_now: new Date(),
    Date_appoint: new Date(),
  });
  const params = useParams()
  const [appointID, setAppointID] = React.useState<Number | undefined>(undefined);
  const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);
  const [treatmentOne, setTreatmentOne] = useState<TreatmentsInterface>({});
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
  const getTreatmentOne = async (id: any) => {
    let res = await Treatment_Disease_Text(id);
  if (res) {
    setTreatmentOne(res);
    console.log("One Treatment")
    console.log(res)
  }
  }

  useEffect(() => {
    getScrenByUID();//++
    getDepartment();
    getTreatment();
    getLevelcure();
    getAppoint();
  }, []);

// รวมดึงการรักษา
const Final_OnChangetreat = async (e: SelectChangeEvent) =>{
  const id = e.target.value
  const name = e.target.name as keyof typeof appoint;
  const value = e.target.value;
  setAppoint({
    ...appoint,
    [name]: value,
  });
  let res = await Treatment_Disease_Text(id);
  if (res) {
    setTreatment_Dis(res);
  }
  
    console.log(treatment_Dis);
    console.log(`[${name}]: ${value}`);
}



const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof treatment;

    const { value } = event.target;

    setAppoint({ ...appoint, [id]: value });
  };

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

  async function update() {
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
        ID: appoint.ID,
      Screening_officerID: convertType(appoint.Screening_officerID),
      TreatmentID: convertType(appoint.TreatmentID),
      LevelcureID: convertType(appoint.LevelcureID),
      DepartmentID: convertType(appoint.DepartmentID),
      Text_appoint: appoint.Text_appoint,
      Date_now: appoint.Date_now,
      Date_appoint: appoint.Date_appoint,
      Appoint_ID:appoint.Appoint_ID,
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
  
      fetch(`http://localhost:8080/AppointUpdate/${data.ID}`, requestOptions)
        .then((response) => response.json())
        .then(async (res) => {
          console.log(res);
        if (res.data) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
        } else {
          setAlertMessage(res.error);
          setError(true);
    }
        });
  }
  }
  const getAppoint = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/appointss/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
            setAppoint(res.data);
            setAppointID(res.data.ID)
            getTreatmentOne(res.data.TreatmentID);
        }
      });

  };
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
                value={appoint.TreatmentID + ""}
                onChange={Final_OnChangetreat}
                inputProps={{
                  name: "TreatmentID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรายการการรักษา
                </option>
                <option value={treatmentOne.ID} key={treatmentOne.ID}>
                    {treatmentOne.Patient?.Patient_Name}
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
            value={appoint.Treatment?.TREATMENT_ID || ""}
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
                value={appoint.Appoint_ID}
                onChange={handleInputChange} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>รายละเอียดการรักษา</p>
            <TextField
            fullWidth
            value={appoint.Treatment?.CONCLUSION || ""}
            InputProps={{
              readOnly: true,
            }}
              />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สิทธิในการรักษา</p>
              <Select
                native
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
                value={appoint.Treatment?.APPOINTMENT || ""}
                onChange={handleInputChange} />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <p>ข้อปฎิบัติก่อนการตรวจ</p>
              <TextField
                fullWidth
                id="Text_appoint"
                type="string"
                variant="outlined"
                value={appoint.Text_appoint}
                onChange={handleInputChange} />
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
              to="/AppointList"
              variant="contained"
              color="primary"
              startIcon={<ContentPasteSearchIcon />}
            >
              ดูข้อมูลการนัด
            </Button>
            <Button
             style={{ float: "right" }}
             onClick={update}
             variant="contained"
             color="primary"
             startIcon={<AddCircleIcon />}

           >
             บันทึกข้อมูลการนัด
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default AppointUpdate;
