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
import SaveIcon from '@mui/icons-material/Save';
import BoyIcon from '@mui/icons-material/Boy';

import { PrefixsInterface } from "../Models/IPrefix";
import { GendersInterface } from "../Models/IGender";

import { PatientsInterface } from "../Models/IPatient";
import { AddressThailandInterface } from "../Models/IAddressThailand";
import { BloodInterface } from "../Models/IBlood";
import { NationalityInterface } from "../Models/INationality";
import { ReligionInterface } from "../Models/IReligion";
import { Screening_officersInterface } from "../Models/IScreening_officer";


import {GetGender,GetPrefix,CreatePatient,GetAddressThailand,GetBlood,GetNationality,GetReligion,GetScrenByUID} from "../Services/HttpClientService";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function PatientCreate() {
    const [screening_officers, setScrenByUID] = useState<Screening_officersInterface>({});
    const [Patients, setPatients] = useState<PatientsInterface>({});
    const [Genders, setGenders] = useState<GendersInterface[]>([]);
    const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
    const [Address, setAddress] = useState<AddressThailandInterface[]>([]);
    const [Bloods, setBloods] = useState<BloodInterface[]>([]);
    const [Nationalitys, setNationalitys] = useState<NationalityInterface[]>([]);
    const [Religions, setReligions] = useState<ReligionInterface[]>([]);

    const [Patient_Name, setPatient_Names] = useState<string>("");

    const [Age, setAges] = useState<string>("");
    const [Birthday, setBirthdays] = useState<string>("");
    const [IDCard, setIDCards] = useState<string>("");
    const [Phone, setPhones] = useState<string>("");
    const [House_ID, setHouse_IDs] = useState<string>("");


    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = React.useState("");

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

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof Patients;
      const value = event.target.value;
      setPatients({
          ...Patients,
          [name]: value,
      });
      console.log(`${name}: ${value}`);
  };

  const getScrenByUID = async () => {
    let res = await GetScrenByUID();
    Patients.Screening_officerID = res.ID;
    if (res) {

      setScrenByUID(res);
      console.log(res);
    }
  };
  
  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGenders(res);
      console.log(res);
  }
};
  const getPrefix = async () => {
    let res = await GetPrefix();
    if (res) {
      setPrefixs(res);
      console.log(res);
  }
};

  const getBlood = async () => {
    let res = await GetBlood();
    if (res) {
      setBloods(res);
      console.log(res);
  }
};

  const getNationality = async () => {
    let res = await GetNationality();
    if (res) {
      setNationalitys(res);
      console.log(res);
  }
};

  const getReligion = async () => {
      let res = await GetReligion();
      if (res) {
        setReligions(res);
        console.log(res);
    }
};
const getAddress = async () => {
  let res = await GetAddressThailand();
  if (res) {
    setAddress(res);
    console.log(res);
}
};


  useEffect(() => {
    getScrenByUID();
    getGender();
    getPrefix();
    getReligion();
    getNationality();
    getAddress();
    getBlood();

  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      Screening_officerID: convertType(Patients.Screening_officerID),
      PrefixID: convertType(Patients.PrefixID),
      Patient_Name: (Patient_Name),
      Age: (convertType(Age)),
      GenderID: convertType(Patients.GenderID),
      BloodID: convertType(Patients.BloodID),
      ReligionID: convertType(Patients.ReligionID),
      Birthday: (Birthday),
      NationalityID: convertType(Patients.NationalityID),
      IDCard: (IDCard),
      Phone: (Phone),
      House_ID: (House_ID),
      AddressID: convertType(Patients.AddressID),
          
    };
    console.log(data)
    let res = await CreatePatient(data);

    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
    
  }

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
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
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
          <Typography variant="h5" color="primary">
            <p>ระบบบันทึกข้อมูลผู้ป่วย</p>
          </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ paddingX: 2, paddingY: 0.1 }}>
          <Typography variant="h6" color="primary">
            <p>ข้อมูลส่วนตัวผู้ป่วย</p>
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>คำนำหน้า</p>
              <Select
                native
                value={Patients.PrefixID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PrefixID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกคำนำหน้า
                </option>
                {Prefixs.map((item: PrefixsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Description}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
                <p>ชื่อ-นามสกุล</p>
                <TextField fullWidth id="Patient_Name" type="string" variant="outlined"
                label="ชื่อ-นามสกุล"  
                onChange={(event) => setPatient_Names(event.target.value)} />
              </Grid>          
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={Patients.GenderID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพศ
                </option>
                {Genders.map((item: GendersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Description}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>กรุ๊ปเลือด</p>
              <Select
                native
                value={Patients.BloodID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "BloodID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกกรุ๊ปเลือด
                </option>
                {Bloods.map((item: BloodInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Phenotype}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>ศาสนา</p>
              <Select
                native
                value={Patients.ReligionID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ReligionID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกศาสนา
                </option>
                {Religions.map((item: ReligionInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ReligionType}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
                <p>วันเดือนปีเกิด</p>
                <TextField fullWidth id="Birthday" type="string" variant="outlined"  
                label="DD/MM/YYYY" 
                onChange={(event) => setBirthdays(event.target.value)} />
              </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>สัญชาติ</p>
              <Select
                native
                value={Patients.NationalityID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "NationalityID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสัญชาติ
                </option>
                {Nationalitys.map((item: NationalityInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.NationalityType}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>เชื้อชาติ</p>
              <Select
                disabled
                value={Patients.NationalityID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "NationalityID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเชื้อชาติ
                </option>
                {Nationalitys.map((item: NationalityInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Country}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          
          <Grid item xs={3}>
                <p>อายุ</p>
                <TextField fullWidth id="ScreeningIDCard" type="number" variant="outlined" 
                inputProps={{ name: "Age", min: 0}} 
                onChange={(event) => setAges(event.target.value)} />
              </Grid>

          <Grid item xs={9}>
                <p>รหัสบัตรประชาชน</p>
                <TextField fullWidth id="IDCard" type="string" variant="outlined" 
                 label="รหัสบัตรประชาชน 13 หลัก" 
                onChange={(event) => setIDCards(event.target.value)} />
              </Grid>
          </Grid>

          <Box sx={{ paddingX: 2, paddingY: 0.1 }}>
          <Divider />
          <Typography variant="h6" color="primary">
            <p>ข้อมูลการติดต่อ</p>
          </Typography>
          </Box>
          <Grid container spacing={3} sx={{ padding: 2 }}>

          <Grid item xs={6}>
                <p>เบอร์โทรศัพท์</p>
                <TextField fullWidth id="Phone" type="string" variant="outlined" 
                label="ตัวอย่าง 08xxxxxxxx" 
                onChange={(event) => setPhones(event.target.value)} />
              </Grid>

          <Grid item xs={6}>
                <p>บ้านเลขที่</p>
                <TextField fullWidth id="House_ID" type="string" variant="outlined"  
                label="บ้านเลขที่" 
                onChange={(event) => setHouse_IDs(event.target.value)} />
              </Grid>
          
              <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ตำบล</p>
              <Select
                native
                value={Patients.AddressID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "AddressID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกตำบล
                </option>
                {Address.map((item: AddressThailandInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Subdistrict}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อำเภอ</p>
              <Select
                disabled
                value={Patients.AddressID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "AddressID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกอำเภอ
                </option>
                {Address.map((item: AddressThailandInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.District}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จังหวัด</p>
              <Select
                disabled
                value={Patients.AddressID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "AddressID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกจังหวัด
                </option>
                {Address.map((item: AddressThailandInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Province}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รหัสไปรณีย์</p>
              <Select
                disabled
                value={Patients.AddressID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "AddressID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรหัสไปรณีย์
                </option>
                {Address.map((item: AddressThailandInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Zipcode}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <Button
              component={RouterLink}
              to="/PatientList"
              variant="contained"
              color="inherit"
              startIcon={<BoyIcon />}
            >
              ดูข้อมูลผู้ป่วย
            </Button>

            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}

            >
              บันทึกข้อมูลผู้ป่วย
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PatientCreate;