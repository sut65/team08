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
import { Link as RouterLink } from "react-router-dom";
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

import {
  GetDoctor,
  GetTreatment,
  GetDrug,
  GetPractice,
  CreateDispense,
  ListReady_Dispense,
} from "../Services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DispenseCreate() {
  const [doctor, setDoctor] = useState<DoctorInterface>({});
  const [dispense, setDispense] = useState<DispenseInterface>({
    Date: new Date(),
  });
  const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);
  const [practice, setPractice] = useState<PracticeInterface[]>([]);
  const [drug, setDrug] = useState<DrugInterface[]>([]);
  const [Text, setText] = useState<string>("");
  const [Number, setNumber] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

  const getDoctor = async () => {
    let res = await GetDoctor();
    if (res) {
      setDoctor(res);
      console.log("Load Doctor Complete");
    } else {
      console.log("Load Doctor InComplete!!!!");
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
    getDoctor();
    getDrug();
    getTreatment();
    getPractice();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof dispense;
    const value = event.target.value;
    setDispense({
      ...dispense,
      [name]: value,
    });
    console.log(`[${name}]: ${value}`);
  };

  async function submit() {
    let data = {
      DoctorID: convertType(dispense.DoctorID),
      TreatmentID: convertType(dispense.TreatmentID),
      DrugID: convertType(dispense.DrugID),
      PracticeID: convertType(dispense.PracticeID),
      Number: Number,
      Text: Text,
      Date: dispense.Date,
    };

    console.log(data);
    let res = await CreateDispense(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
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
          <Grid item xs={6}>
            <p>แพทย์ผู้รักษา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                value={doctor.ID || ""}
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
                onChange={handleChange}
                inputProps={{
                  name: "TreatmentID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรายการการรักษา
                </option>
                {treatment.map((item: TreatmentsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Patiend?.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <p>รายละเอียดการรักษา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                value={doctor.ID || ""}
                InputProps={{
                  readOnly: true,
                }}
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
                  name: "DrugID",
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
                id="setNumber"
                label="Number"
                type="Number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setNumber(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <p>การรับประทานยา</p>
            <FormControl required fullWidth variant="outlined">
              <Select
                defaultValue={"0"}
                onChange={handleChange}
                inputProps={{
                  name: "PracticeID",
                }}
              >
                <MenuItem value={"0"}>รายละเอียดการรับประทาน</MenuItem>
                {practice?.map((item: PracticeInterface) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <p>รายละเอียดเพิ่มเติม</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                fullWidth
                id="Name"
                type="string"
                variant="outlined"
                onChange={(event) => setText(event.target.value)}
              />
            </FormControl>
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
            <Button component={RouterLink} to="/dispensets" variant="contained">
              Back
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default DispenseCreate;
