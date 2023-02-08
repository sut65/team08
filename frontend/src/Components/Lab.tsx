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
import FormControlLabel from "@mui/material/FormControlLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Checkbox from "@mui/material/Checkbox";
import { pink, green } from "@mui/material/colors";

import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PrefixsInterface } from "../Models/IPrefix";
import { GendersInterface } from "../Models/IGender";
// import { PolicingsInterface } from "../Models/IPolicing";
import { PatientsInterface } from "../Models/IPatient";

import { DocPrefixInterface } from "../Models/IDocPrefix";
import { BloodInterface } from "../Models/IBlood";
import { MaritalInterface } from "../Models/IMarital";
import { ReligionInterface } from "../Models/IReligion";
import { NationalityInterface } from "../Models/INationality";
import { AddressThailandInterface } from "../Models/IAddressThailand";
import { EducationsInterface } from "../Models/IEducation";
import { DoctorInterface } from "../Models/IDoctor";
import { TreatmentsInterface } from "../Models/ITreatment";

import { LabNameInterface } from "../Models/ILabName";
import { LabInterface } from "../Models/ILab";

import {
  GetGender,
  GetPrefix,
  GetDocPrefix,
  GetEducation,
  GetBlood,
  GetMarital,
  GetReligion,
  GetNationality,
  GetAddressThailand,
  GetDoctor,
  GetShow,
  CreateDoctor,
  ListLabName,
  ListLab,
} from "../Services/HttpClientService";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Doctor() {
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const [Patiends, setPatiends] = useState<PatientsInterface>({});
  const [Genders, setGenders] = useState<GendersInterface[]>([]);
  const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
  // const [Policings, setPolicings] = useState<PolicingsInterface[]>([]);

  const [DocPrefix, setDocPrefix] = useState<DocPrefixInterface[]>([]);
  const [Blood, setBlood] = useState<BloodInterface[]>([]);
  const [Marital, setMarital] = useState<MaritalInterface[]>([]);
  const [Religion, setReligion] = useState<ReligionInterface[]>([]);
  const [Nationality, setNationality] = useState<NationalityInterface[]>([]);
  const [AddressThailand, setAddressThailand] = useState<
    AddressThailandInterface[]
  >([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledPrefix, setIsDisabledPrefix] = useState(false);
  const [Educations, setEducations] = useState<EducationsInterface[]>([]);
  const [Doctor, setDoctor] = useState<Partial<DoctorInterface>>({});
  const [DoctorA, setDoctorA] = useState<DoctorInterface[]>([]);

  const [Show, setShow] = useState<TreatmentsInterface[]>([]);
  const [ShowLab, setShowLab] = useState<TreatmentsInterface[]>([]);

  const [DocterCode, setDocterCode] = useState<string>("");
  const [DocterIDCar, setDocterIDCar] = useState<string>("");
  const [FirstNameTH, setFirstNameTH] = useState<string>("");
  const [LastNameTH, setLastNameTH] = useState<string>("");
  const [FirstNameEN, setFirstNameEN] = useState<string>("");
  const [LastNameEN, setLastNameEN] = useState<string>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(
    dayjs("2000-01-01T21:11:54")
  );
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleClickAnyRegion = () => {
    console.log(Doctor.ReligionID);
    setIsDisabled(false);
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
    setOpen(false);
  };
  const handleCloseD = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenD(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Patiends;
    const value = event.target.value;
    setPatiends({
      ...Patiends,
      [name]: value,
    });
    // console.log(`${name}: ${value}`);
  };

  const handleChangeDoctor = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Doctor;
    const value = event.target.value;
    setDoctor({
      ...Doctor,
      [name]: value,
    });
  };

  const handleChangeReligion = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Doctor;
    const value = event.target.value;
    setDoctor({
      ...Doctor,
      [name]: value,
    });

    // console.log(Doctor.ReligionID)
    if (event.target.value === "5") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const handleChangeMarital = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Doctor;
    const value = event.target.value;
    setDoctor({
      ...Doctor,
      [name]: value,
    });

    // console.log(Doctor.ReligionID)
    if (event.target.value === "0") {
      setIsDisabledPrefix(true);
    } else if (event.target.value === "1") {
      setIsDisabledPrefix(true);
    } else if (event.target.value === "4") {
      setIsDisabledPrefix(true);
    } else {
      setIsDisabledPrefix(false);
    }
  };

  const handleChangeDate = (newValue: Dayjs | null) => {
    setValueDate(newValue);
  };

  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGenders(res);
      // console.log(res);
    }
  };
  const getDocPrefix = async () => {
    let res = await GetDocPrefix();
    if (res) {
      setDocPrefix(res);
      // console.log(res);
    }
  };
  const getPrefix = async () => {
    let res = await GetPrefix();
    if (res) {
      setPrefixs(res);
      // console.log(res);
    }
  };

  const getBlood = async () => {
    let res = await GetBlood();
    if (res) {
      setBlood(res);
      // console.log(res);
    }
  };
  const getDoctor = async () => {
    let res = await GetDoctor();
    if (res) {
      setDoctor(res);
      setDoctorA(res);
      // console.log("set Doctor & DoctorA");
      // console.log(res);
    }
  };
  const getShow = async () => {
    let res = await GetShow();
    if (res) {
      // setDoctor(res);
      setShow(res);
      // console.log("set Doctor & DoctorA");
      // console.log(res);
    }
  };

  const getShowLab = async () => {
    let res = await ListLab();
    if (res) {
      // setDoctor(res);
      setShowLab(res);
      console.log(res, " -> set await ListLab()");
      // console.log(res);
    }
  };

  const getMarital = async () => {
    let res = await GetMarital();
    if (res) {
      setMarital(res);
      // console.log(res);
    }
  };
  const getReligion = async () => {
    let res = await GetReligion();
    if (res) {
      setReligion(res);
      // console.log(res);
    }
  };
  const getNationality = async () => {
    let res = await GetNationality();
    if (res) {
      setNationality(res);
      // // console.log("OkkkOkkkOkkkk");
      // // console.log(res);
    }
  };
  const getAddressThailand = async () => {
    let res = await GetAddressThailand();
    if (res) {
      setAddressThailand(res);
      // console.log(res);
    }
  };
  const getEducations = async () => {
    let res = await GetEducation();
    if (res) {
      setEducations(res);
      // console.log(res);
    }
  };

  const handleClickOpen = () => {
    // setOpen(true);
    setOpenD(true);
  };
  const touchPage = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    getDoctor();
    getShow();
    getBlood();
    getMarital();
    getReligion();
    getNationality();
    getAddressThailand();
    getGender();
    getPrefix();
    // getPolicing();
    getDocPrefix();
    getEducations();
    setIsDisabled(!isDisabled);
    setIsDisabledPrefix(true);

    getShowLab();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const convertTypePrefix = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    if (typeof val === "undefined") {
      return 99;
    } else if (val > 0) {
      return val;
    } else {
      return 99;
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "TREATMENT_ID",
      headerName: "เลขกำกับการรักษา",
      width: 100,
    },
    {
      field: "PatiendID",
      headerName: "หมายเลขผู้ป่วย",
      width: 120,
    },
    {
      field: "Doctor",
      headerName: "แพทย์ผู้สั่งแลป",
      width: 150,
      valueFormatter: (params) => params.value.FirstNameTH,
    },
    {
      field: "Status",
      headerName: "สถานะการรักษา",
      width: 120,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "CreatedAt",
      headerName: "วันที่และเวลา",
      width: 200,
      valueFormatter: (params) => dayjs(params.value).format("H:mm | DD/MM/YY"),
    },
  ];

  const columnsLab: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "CreatedAt",
      headerName: "วันที่และเวลา",
      width: 150,
      valueFormatter: (params) => dayjs(params.value).format("H:mm | DD/MM/YY"),
    },
    {
      field: "Lab_Name",
      headerName: "ใบแลป",
      width: 120,
      valueFormatter: (params) => params.value.Discription,
    },
    {
      field: "Lab_test",
      headerName: "ค่าที่รายงาน",
      width: 120,
    },
    {
      field: "Value",
      headerName: "หน่วย",
      width: 80,
    },
    {
      field: "Treatment",
      headerName: "เลขกำกับการรักษา",
      width: 150,
      valueFormatter: (params) => params.value.TREATMENT_ID,
    },
    {
      field: "Doctor",
      headerName: "แพทย์ผู้สั่งแลป",
      width: 120,
      valueFormatter: (params) => params.value.FirstNameTH,
    },
    {
      field: "Med_Employee",
      headerName: "ผู้รายงานผลแลป",
      width: 120,
      valueFormatter: (params) => params.value.ID,
    },
  ];

  async function submit() {
    let data = {
      DocterCode: DocterCode,
      DocterIDCard: DocterIDCar,
      DocPrefixID: convertType(Doctor.DocPrefixID),
      FirstNameTH: FirstNameTH,
      LastNameTH: LastNameTH,
      FirstNameEN: FirstNameEN,

      LastNameEN: LastNameEN,
      GenderID: convertType(Doctor.GenderID),
      BloodID: convertType(Doctor.BloodID),
      MaritalID: convertType(Doctor.MaritalID),

      ReligionID: convertType(Doctor.ReligionID),
      NationalityID: convertType(Doctor.NationalityID),
      CountryID: convertType(Doctor.CountryID),
      AddressID: convertType("98"),

      DocFaPrefixID: convertType(Doctor.DocFaPrefixID),
      DocMoPrefixID: convertType(Doctor.DocMoPrefixID),
      DocWiPrefixID: convertTypePrefix(Doctor.DocWiPrefixID),
      EducationID: convertType(Doctor.EducationID),
    };
    console.log("กดดดดดดดด");
    console.log(data);
    let res = await CreateDoctor(data);
    // console.log(res);
    if (res) {
      setSuccess(true);
      // console.log("เข้า");
    } else {
      setError(true);
      // console.log("ไม่เข้า");
    }
  }

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
              ส่งผลตรวจแลป
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid
          container
          spacing={1}
          sx={{ marginX: 0.5, marginY: 0, padding: 2 }}
        >
          <div style={{ height: 300, width: "98.5%" }}>
            <p>ข้อมูลการรักษาที่ยังรอผลตรวจแลป</p>
            <Grid item xs={12} md={5} sm={12}>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<AddIcon />}
              >
                ส่งข้อมูลผลแลป
              </Button>
              <Dialog
                open={openD}
                // onClose={touchPage(false)}
                fullWidth
                maxWidth="md"
              >
                <DialogContent>
                  <DialogTitle>สร้างข้อมูลผลแลปใหม่</DialogTitle>
                  <Grid container spacing={2} sx={{ padding: 4 }}>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.DocPrefixID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "DocPrefixID",
                          }}
                        >
                          <option aria-label="None" value="">
                            รหัสข้อมูลการรักษา
                          </option>
                          {Show.map((item: TreatmentsInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.TREATMENT_ID}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <Select
                          native
                          value={Doctor.DocPrefixID + ""}
                          onChange={handleChangeDoctor}
                          inputProps={{
                            name: "DocPrefixID",
                          }}
                        >
                          <option aria-label="None" value="">
                            ประเภทแลป
                          </option>
                          {Show.map((item: TreatmentsInterface) => (
                            <option value={item.ID} key={item.ID}>
                              {item.TREATMENT_ID}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <br/>
                    <br/>
                    <br/>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleChange}
                              // name="gilad"
                              sx={{
                                color: green[600],
                                "&.Mui-checked": {
                                  color: green[400],
                                },
                              }}
                            />
                          }
                          label="Positive"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleChange}
                              // name="gilad"
                              sx={{
                                color: pink[500],
                                "&.Mui-checked": {
                                  color: pink[300],
                                },
                              }}
                            />
                          }
                          label="Negetive"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="ค่าที่รายงาน"
                        fullWidth
                        id="LastNameTH"
                        type="string"
                        variant="outlined"
                        size="small"
                        onChange={(event) => setLastNameTH(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseD}>ยกเลิก</Button>
                  <Button onClick={submit}>บันทึกข้อมูลผลแลป</Button>
                </DialogActions>
              </Dialog>
              <p></p>
            </Grid>
            <DataGrid
              rows={Show}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
            <br></br>
            <p>ผลแลปที่ทำการบันทึกแล้ว</p>
            <DataGrid
              rows={ShowLab}
              getRowId={(row) => row.ID}
              columns={columnsLab}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
        <Grid container spacing={1} sx={{ marginY: 58, padding: 2 }}></Grid>
      </Paper>
    </Container>
  );
}

export default Doctor;
