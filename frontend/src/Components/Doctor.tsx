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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PrefixsInterface } from "../Models/IPrefix";
import { GendersInterface } from "../Models/IGender";
import { PolicingsInterface } from "../Models/IPolicing";
import { PatiendsInterface } from "../Models/IPatiend";

import { DocPrefixInterface } from "../Models/IDocPrefix";
import { BloodInterface } from "../Models/IBlood";
import { MaritalInterface } from "../Models/IMarital";
import { ReligionInterface } from "../Models/IReligion";
import { NationalityInterface } from "../Models/INationality";
import { AddressThailandInterface } from "../Models/IAddressThailand";
import { EducationsInterface } from "../Models/IEducation";
import { DoctorInterface } from "../Models/IDoctor";

import {
  GetPolicing,
  GetGender,
  GetPrefix,
  GetDocPrefix,
  CreatePatiend,
  GetEducation,
  GetScreening_officer,
  CreateScreening_officer,
  GetPatiend,
  GetBlood,
  GetMarital,
  GetReligion,
  GetNationality,
  GetAddressThailand,
  GetDoctor,
  CreateDoctor,
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

  const [Patiends, setPatiends] = useState<PatiendsInterface>({});
  const [Genders, setGenders] = useState<GendersInterface[]>([]);
  const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
  const [Policings, setPolicings] = useState<PolicingsInterface[]>([]);

  const [DocPrefix, setDocPrefix] = useState<DocPrefixInterface[]>([]);
  const [Blood, setBlood] = useState<BloodInterface[]>([]);
  const [Marital, setMarital] = useState<MaritalInterface[]>([]);
  const [Religion, setReligion] = useState<ReligionInterface[]>([]);
  const [Nationality, setNationality] = useState<NationalityInterface[]>([]);
  const [AddressThailand, setAddressThailand] = useState<AddressThailandInterface[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledPrefix, setIsDisabledPrefix] = useState(false);
  const [Educations, setEducations] = useState<EducationsInterface[]>([]);
  const [Doctor, setDoctor] = useState<Partial<DoctorInterface>>({});
  const [DoctorA, setDoctorA] = useState<DoctorInterface[]>([]);

  const [DocterCode, setDocterCode] = useState<string>("");
  const [DocterIDCar, setDocterIDCar] = useState<string>("");
  const [FirstNameTH, setFirstNameTH] = useState<string>("");
  const [LastNameTH, setLastNameTH] = useState<string>("");
  const [FirstNameEN, setFirstNameEN] = useState<string>("");
  const [LastNameEN, setLastNameEN] = useState<string>("");

  const [TelPhone, setTelPhone] = useState<string>("");
  const [ReOther, setReOther] = useState<string>("");
  const [TelOffice, setTelOffice] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [AllAddress, setAllAddress] = useState<string>("");

  const [Subdistrict, setSubdistrict] = useState<string>("");
  const [District, setDistrict] = useState<string>("");
  const [Province, setProvince] = useState<string>("");
  const [FaIDCard, setFaIDCard] = useState<string>("");

  const [FaFirstName, setFaFirstName] = useState<string>("");
  const [FaLastName, setFaLastName] = useState<string>("");
  const [FaOccupation, setFaOccupation] = useState<string>("");
  const [MoIDCard, setMoIDCard] = useState<string>("");

  const [MoFirstName, setMoFirstName] = useState<string>("");
  const [MoLastName, setMoLastName] = useState<string>("");
  const [MoOccupation, setMoOccupation] = useState<string>("");
  const [WiIDCard, setWiIDCard] = useState<string>("");

  const [WiFirstName, setWiFirstName] = useState<string>("");
  const [WiLastName, setWiLastName] = useState<string>("");
  const [WiOccupation, setWiOccupation] = useState<string>("");
  const [WiPhone, setWiPhone] = useState<string>("");

  const [EducationName, setEducationName] = useState<string>("");
  const [EducationMajor, setEducationMajor] = useState<string>("");
  const [University, setUniversity] = useState<string>("");
  const [DocPassword, setDocPassword] = useState<string>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(
    dayjs("2000-01-01T21:11:54")
  );

  const handleClickAnyRegion = () => {
    console.log(Doctor.ReligionID);
    setIsDisabled(false);
  };
  
  const getDocCode = async () => {
    let new_Date: Date = new Date();
    let result: string = new_Date.toLocaleString();

    fetch(`${apiUrl}/Doctors`, requestOptionsGet)
    .then((response) => response.json())
    .then((res) => {
        // console.log(res.data.length);
        let num: number = ((+(result[7]+result[8]))*1000)+(res.data.length)+1
        let docid: string = "D"+num.toString();
        // console.log("The date is: " + docid);
        setDocterCode(docid);

    });
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
    if(event.target.value==="5") {
      setIsDisabled(false);
    }else{
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
    if(event.target.value==="0"){
      setIsDisabledPrefix(true);
    }else if(event.target.value==="1"){
      setIsDisabledPrefix(true);
    }else if(event.target.value==="4"){
      setIsDisabledPrefix(true);
    }else{
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
  const getPolicing = async () => {
    let res = await GetPolicing();
    if (res) {
      setPolicings(res);
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
    getBlood();
    getMarital();
    getReligion();
    getNationality();
    getAddressThailand();
    getGender();
    getPrefix();
    getPolicing();
    getDocPrefix();
    getEducations();
    setIsDisabled(!isDisabled);
    getDocCode();
    getDocCode();
    setIsDisabledPrefix(true);
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const convertTypePrefix = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data
    if(typeof val === "undefined"){
      return 99
    }else if(val > 0){
      return val
    }else{
      return 99
    }
  };


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
      ReOther: ReOther,
      NationalityID: convertType(Doctor.NationalityID),
      CountryID: convertType(Doctor.CountryID),
      TelPhone: TelPhone,
      TelOffice: TelOffice,

      Email: Email,
      AllAddress: AllAddress,
      Subdistrict: Subdistrict,
      District: District,
      Province: Province,
      AddressID: convertType("98"),

      FaIDCard: FaIDCard,
      DocFaPrefixID: convertType(Doctor.DocFaPrefixID),
      FaFirstName: FaFirstName,
      FaLastName: FaLastName,
      FaOccupation: FaOccupation,
      MoIDCard: MoIDCard,
      DocMoPrefixID: convertType(Doctor.DocMoPrefixID),

      MoFirstName: MoFirstName,
      MoLastName: MoLastName,
      MoOccupation: MoOccupation,
      WiIDCard: WiIDCard,
      DocWiPrefixID: convertTypePrefix(Doctor.DocWiPrefixID),
      WiFirstName: WiFirstName,
      
      WiLastName: WiLastName,
      WiOccupation: WiOccupation,
      WiPhone: WiPhone,
      EducationID: convertType(Doctor.EducationID),
      EducationName: EducationName,
      EducationMajor: EducationMajor,

      University: University,
      DocPassword: DocPassword,
    };
    console.log("กดดดดดดดด");
    console.log(data);
    let res = await CreateDoctor(data);
    // console.log(res);
    if (res) {
      setSuccess(true);
      getDocCode();
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
              ประวัติข้อมูลส่วนตัว
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={1} sx={{ padding: 2 }}>
          <Grid item xs={5}>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="LocationReservationID"
                type="search"
                label="ป้อนรหัสประจำตัวของแพทย์ หรือเลขบัตรประชาชน"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1.3}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClickOpen}
              startIcon={<SearchIcon />}
            >
              Find
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              startIcon={<AddIcon />}
            >
              Add New
            </Button>
            <Dialog
              open={openD}
              // onClose={touchPage(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>เพิ่มข้อมูลของแพทย์</DialogTitle>
              <DialogContent>
                {/* <ส่วนที่1 ข้อมูลส่วนตัว/> */}
                <DialogTitle>1. ข้อมูลส่วนตัว</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  {/* <คำนำหน้า ชื่อจริงสกุล/> */}
                  <Grid item xs={2}>
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
                          คำนำหน้า
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="ชื่อจริง"
                      fullWidth
                      id="FirstNameTH"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setFirstNameTH(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="นามสกุล"
                      fullWidth
                      id="LastNameTH"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setLastNameTH(event.target.value)}
                    />
                  </Grid>

                  {/* <ชื่อสกุลอิ้ง วันเกิด/> */}
                  <Grid item xs={4.5}>
                    <TextField
                      label="First Name"
                      fullWidth
                      id="FirstNameEN"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setFirstNameEN(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4.5}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      id="LastNameEN"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setLastNameEN(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="เลือกวันเกิด"
                        inputFormat="MM/DD/YYYY"
                        value={valueDate}
                        onChange={handleChangeDate}
                        renderInput={(params) => (
                          <TextField size="small" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  {/* <เพศ เลือด สถานภาพ ศาสนา อื่นๆ/> */}
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.GenderID + ""}
                        onChange={handleChangeDoctor}
                        inputProps={{
                          name: "GenderID",
                        }}
                      >
                        <option aria-label="None" value="">
                          เพศ
                        </option>
                        {Genders.map((item: GendersInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Description}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.BloodID + ""}
                        onChange={handleChangeDoctor}
                        inputProps={{
                          name: "BloodID",
                        }}
                      >
                        <option aria-label="None" value="">
                          หมู่โลหิต
                        </option>
                        {Blood.map((item: BloodInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Phenotype}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.5}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.MaritalID + ""}
                        onChange={handleChangeMarital}
                        inputProps={{
                          name: "MaritalID",
                        }}
                      >
                        <option aria-label="None" value="">
                          สถานภาพ
                        </option>
                        {Marital.map((item: MaritalInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.MaritalStatus}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.5}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.ReligionID + ""}
                        onChange={handleChangeReligion}
                        inputProps={{
                          name: "ReligionID",
                        }}
                      >
                        <option aria-label="None" value="">
                          ศาสนา
                        </option>
                        {Religion.map((item: ReligionInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.ReligionType}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      label="โปรดระบุฯ "
                      disabled={isDisabled}
                      fullWidth
                      id="ddaa"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setReOther(event.target.value)}
                    />
                  </Grid>

                  {/* <สัญชาติ เชื้อชาติ รหัส หมายเลขบัตร/> */}
                  <Grid item xs={2.2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.NationalityID + ""}
                        onChange={handleChangeDoctor}
                        inputProps={{
                          name: "NationalityID",
                        }}
                      >
                        <option aria-label="None" value="">
                          สัญชาติ
                        </option>
                        {Nationality.map((item: NationalityInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.NationalityType}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.CountryID + ""}
                        onChange={handleChangeDoctor}
                        inputProps={{
                          name: "CountryID",
                        }}
                      >
                        <option aria-label="None" value="">
                          เชื้อชาติ
                        </option>
                        {Nationality.map((item: NationalityInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.NationalityType}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2.6}>
                    <TextField
                      disabled
                      label="รหัสประจำตัวแพทย์"
                      fullWidth
                      id="DocterCode"
                      type="string"
                      variant="outlined"
                      size="small"
                      defaultValue={DocterCode}
                      onChange={(event) => setDocterCode(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="หมายเลขบัตรประชาชน"
                      fullWidth
                      id="DocterIDCar"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setDocterIDCar(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่2 ข้อมูลการติดต่อ/> */}
                <DialogTitle>2. ข้อมูลการติดต่อ</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  {/* <ค้นหารหัสไปรษณีย์/> */}
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="LocationReservationID"
                      type="search"
                      label="ป้อนรหัสไปรษณีย์"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={1.3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      // onClick={handleClickOpen}
                      // onClick={handleClickAnyRegion}
                      startIcon={<SearchIcon />}
                    >
                      Find
                    </Button>
                  </Grid>
                  <Grid item xs={6.7}>
                  <TextField
                      label="อีเมล์"
                      fullWidth
                      id="Email"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </Grid>

                  {/* <ที่อยู่ ตำบล อำเภอ/> */}
                  <Grid item xs={6}>
                    <TextField
                      label="ที่อยู่"
                      fullWidth
                      id="AllAddress"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setAllAddress(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="ตำบล"
                      fullWidth
                      id="Subdistrict"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setSubdistrict(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="อำเภอ"
                      fullWidth
                      id="District"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setDistrict(event.target.value)}
                    />
                  </Grid>

                  {/* <จังหวัด เบอร์ โทรสาร/> */}
                  <Grid item xs={5}>
                    <TextField
                      label="จังหวัด"
                      fullWidth
                      id="Province"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setProvince(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="เบอร์โทรศัพท์"
                      fullWidth
                      id="TelPhone"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setTelPhone(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="โทรสาร"
                      fullWidth
                      id="TelOffice"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setTelOffice(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่2 ข้อมูลบิดา/> */}
                <DialogTitle>3. ข้อมูลบิดา</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.DocFaPrefixID + ""}
                        onChange={handleChangeDoctor}
                        inputProps={{
                          name: "DocFaPrefixID",
                        }}
                      >
                        <option aria-label="None" value="">
                          คำนำหน้า
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="ชื่อจริง"
                      fullWidth
                      id="FaFirstName"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setFaFirstName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="นามสกุล"
                      fullWidth
                      id="FaLastName"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setFaLastName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="อาชีพ"
                      fullWidth
                      id="FaOccupation"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setFaOccupation(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="เลขบัตรประชาชน"
                      fullWidth
                      id="FaIDCard"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setFaIDCard(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่4 ข้อมูลมารดาดา/> */}
                <DialogTitle>4. ข้อมูลมารดา</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.DocMoPrefixID + ""}
                        onChange={handleChangeDoctor}
                        inputProps={{
                          name: "DocMoPrefixID",
                        }}
                      >
                        <option aria-label="None" value="">
                          คำนำหน้า
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="ชื่อจริง"
                      fullWidth
                      id="MoFirstName"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setMoFirstName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="นามสกุล"
                      fullWidth
                      id="MoLastName"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setMoLastName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="อาชีพ"
                      fullWidth
                      id="MoOccupation"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setMoOccupation(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="เลขบัตรประชาชน"
                      fullWidth
                      id="MoIDCard"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setMoIDCard(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่5 ข้อมูลคู่สมรส/> */}
                <DialogTitle>5. ข้อมูลคู่สมรส</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  <Grid item xs={2}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        disabled={isDisabledPrefix}
                        value={Doctor.DocWiPrefixID + ""}
                        onChange={handleChangeDoctor}
                        inputProps={{
                          name: "DocWiPrefixID",
                        }}
                      >
                        <option aria-label="None" value="">
                          คำนำหน้า
                        </option>
                        {DocPrefix.map((item: DocPrefixInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.PreInitialTH}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="ชื่อจริง"
                      fullWidth
                      disabled={isDisabledPrefix}
                      id="WiFirstName"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setWiFirstName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="นามสกุล"
                      fullWidth
                      disabled={isDisabledPrefix}
                      id="WiLastName"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setWiLastName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="อาชีพ"
                      fullWidth
                      disabled={isDisabledPrefix}
                      id="WiOccupation"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setWiOccupation(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="เลขบัตรประชาชน"
                      fullWidth
                      disabled={isDisabledPrefix}
                      id="WiIDCard"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setWiIDCard(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="เบอร์โทร"
                      fullWidth
                      disabled={isDisabledPrefix}
                      id="WiPhone"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setWiPhone(event.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* <ส่วนที่6 ประวัติการศึกษา/> */}
                <DialogTitle>6. ประวัติการศึกษา</DialogTitle>
                <Grid container spacing={2} sx={{ padding: 4 }}>
                  <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        native
                        value={Doctor.EducationID + ""}
                        onChange={handleChangeDoctor}
                        inputProps={{
                          name: "EducationID",
                        }}
                      >
                        <option aria-label="None" value="">
                          ระดับการศึกษาสูงสุด
                        </option>
                        {Educations.map((item: EducationsInterface) => (
                          <option value={item.ID} key={item.ID}>
                            {item.Description}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      label="ชื่อปริญา"
                      fullWidth
                      id="EducationName"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setEducationName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="สาขาวิชาเอก"
                      fullWidth
                      id="EducationMajor"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setEducationMajor(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      label="สถานศึกษา"
                      fullWidth
                      id="University"
                      type="string"
                      variant="outlined"
                      size="small"
                      onChange={(event) => setUniversity(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="ปีที่เข้ารับการศึกษา"
                      fullWidth
                      id="StartEducation	"
                      type="string"
                      variant="outlined"
                      size="small"
                      // onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="ปีที่จบการศึกษา"
                      fullWidth
                      id="EndEducation"
                      type="string"
                      variant="outlined"
                      size="small"
                      // onChange={(event) => setNames(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseD}>ยกเลิก</Button>
                <Button onClick={submit}>บันทึกข้อมูล</Button>
              </DialogActions>
            </Dialog>
          </Grid>

          <Grid item xs={6}>
            <p>โชว์ข้อมูลแพทย์ทั้งหมด</p>
            <p>1.</p>
            <p>2.</p>
            <p>3.</p>
            <p>4.</p>
            <p>5.</p>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="inherit"
            >
              กลับสู่หน้าหลัก
            </Button>
            <Button
              style={{ float: "right" }}
              // onClick={submit}
              // to="/"
              variant="contained"
              color="primary"
            >
              บันทึกหลอกๆ
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Doctor;
