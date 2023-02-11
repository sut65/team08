import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink, useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DispenseInterface } from "../Models/IDispense";
import { DoctorInterface } from "../Models/IDoctor";
import Typography from "@mui/material/Typography";
import { DrugInterface } from "../Models/IDrug";
import { PracticeInterface } from "../Models/IPractice";
import { TreatmentsInterface } from "../Models/ITreatment";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AddBoxIcon from '@mui/icons-material/AddBox';


import {
  GetDoctorByUID,
  GetTreatment,
  GetDrug,
  GetPractice,
  CreateDispense,
  ListReady_Dispense,
  Treatment_Disease_Text,
} from "../Services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DispenseUpdate() {
  const [doctor, setDoctor] = useState<DoctorInterface>({});
  const [dispense, setDispense] = useState<DispenseInterface>({
    Date: new Date(),
  });
  const [dispenseID, setDispenseID] = React.useState<Number | undefined>(undefined);
  const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);
  const [practice, setPractice] = useState<PracticeInterface[]>([]);
  const [drug, setDrug] = useState<DrugInterface[]>([]);
  const [Text, setText] = useState<string>("");
  const [Number, setNumber] = useState<string>("");
  const params = useParams()
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //เพิ่ม
  const [treatment_Dis, setTreatment_Dis] = useState<TreatmentsInterface>({});
  const [DoctorByUID, setDoctorByUID] = useState<DoctorInterface>({});

  ///
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

  const getDoctorByUID = async () => {
    let res = await GetDoctorByUID();
    dispense.DoctorID = res.ID;
    if (res) {

      setDoctorByUID(res);
      console.log(res);
    }
  };

  const getTreatment = async () => {
    let res = await ListReady_Dispense();
    if (res) {
      setTreatment(res);
      console.log("Load Treatment Complete");
    } else {
      console.log("Load Treatment InComplete!!!!");
    }
  };


  const getPractice = async () => {
    let res = await GetPractice();
    if (res) {
      setPractice(res);
      console.log("Load Practice Complete");
    } else {
      console.log("Load Practice InComplete!!!!");
    }
  };

  const getDrug = async () => {
    let res = await GetDrug();
    if (res) {
      setDrug(res);
      console.log("Load Drug Complete");
    } else {
      console.log("Load Drug InComplete!!!!");
    }
  };

  useEffect(() => {
    getDoctorByUID();
    getDrug();
    getTreatment();
    getPractice();
    getDispense();
  }, []);

  
// รวมดึงการรักษา
  
const Final_OnChangetreat = async (e: SelectChangeEvent) =>{
  const id = e.target.value
  const name = e.target.name as keyof typeof dispense;
  const value = e.target.value;
  let res = await Treatment_Disease_Text(id);
  if (res) {
    setDispense({
      ...dispense,
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
///
//++
const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof treatment;

    const { value } = event.target;

    setDispense({ ...dispense, [id]: value });
  };
  //--
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof dispense;
    const value = event.target.value;
    setDispense({
      ...dispense,
      [name]: value,
    });
    console.log(`[${name}]: ${value}`);
  };

  async function update() {

    if (dispense.TreatmentID == undefined || dispense.TreatmentID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกผู้ป่วยที่ต้องการจ่ายยา");
  }
    else if (dispense.DrugID == undefined || dispense.DrugID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกยาที่ต้องการจ่าย")
    }
    else if (dispense.PracticeID == undefined|| dispense.PracticeID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกประเภทการรับประทานยา")
  }
  else{
    let data = {
        ID: dispense.ID,
      DoctorID: convertType(dispense.DoctorID),
      TreatmentID: convertType(dispense.TreatmentID),
      DrugID: convertType(dispense.DrugID),
      PracticeID: convertType(dispense.PracticeID),
      Number: convertType(dispense.Number),
      Text: dispense.Text,
      Date: dispense.Date,
      Dispense_ID:dispense.Dispense_ID,
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
  
      fetch(`http://localhost:8080/DispenseUpdate/${data.ID}`, requestOptions)
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
const getDispense = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/dispensess/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
            setDispense(res.data);
            setDispenseID(res.data.ID);
        }
      });
  };

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
                ระบบจ่ายยา
              </Typography>
            </Box>
          </Paper>
          <Divider />
        </Box>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={2}>
            <p>แพทย์ผู้รักษา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                value={DoctorByUID.DocterCode || ""}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p>แพทย์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                value={DoctorByUID.FirstNameEN || ""}
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
                value={dispense.TreatmentID + ""}
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
          <Grid item xs={8}>
            <p>รายละเอียดการรักษา</p>
            <FormControl fullWidth variant="outlined">
            <TextField
            value={dispense.Treatment?.CONCLUSION || ""}
            InputProps={{
              readOnly: true,
            }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p>เลขกำกับการจ่ายยา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                id="Dispense_ID"
                type="string"
                variant="outlined"
                value={dispense.Dispense_ID}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ประเภทยา</p>
              <Select
                native
                value={dispense.DrugID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "DrugID"
                }}

              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทยา
                </option>
                {drug.map((item: DrugInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>จำนวนยา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Number"
                type="Number"
                inputProps={{ name: "Number", min: 0}} 
                value={dispense.Number}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <p>การรับประทานยา</p>
            <FormControl required fullWidth variant="outlined">
              <Select
              native
              value={dispense.PracticeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PracticeID",
                }}
              >
               <option aria-label="None" value="">
                  รายละเอียดการรับประทานยา
                </option>
                {practice?.map((item: PracticeInterface) => (
               <option value={item.ID} key={item.ID}>
               {item.Name}
             </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <p>รายละเอียดเพิ่มเติม</p>
              <TextField
                fullWidth
                id="Text"
                type="string"
                variant="outlined"
                value={dispense.Text}
                onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12}>
            <p>วันที่และเวลา</p>
            <FormControl fullWidth>
              <LocalizationProvider required dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="กรุณาเลือกวันและเวลา *"
                  value={dispense.Date}
                  onChange={(newValue) => {
                    setDispense({
                      ...dispense,
                      Date: newValue,
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
              startIcon={<VaccinesIcon />}
            >
              ดูข้อมูลการจ่ายยา
            </Button>
            <Button
             style={{ float: "right" }}
             onClick={update}
             variant="contained"
             color="primary"
             startIcon={<AddBoxIcon />}

           >
             บันทึกข้อมูลการจ่ายยา
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
//เหลือ load 
//doctor
export default DispenseUpdate;
