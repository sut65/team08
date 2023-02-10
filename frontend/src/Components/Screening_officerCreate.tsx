import React, { useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
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
import BoyIcon from '@mui/icons-material/Boy';

import { PrefixsInterface } from "../Models/IPrefix";
import { GendersInterface } from "../Models/IGender";
import { EducationsInterface } from "../Models/IEducation";
import { BloodInterface } from "../Models/IBlood";
import { ReligionInterface } from "../Models/IReligion";
import { NationalityInterface } from "../Models/INationality";
import { Screening_officersInterface } from "../Models/IScreening_officer";
import { OfficersInterface } from "../Models/IOfficer";/////

import {GetOfficerByUID,GetEducation,GetGender,GetPrefix,GetBlood,GetReligion,GetNationality,Screening_officer,} from "../Services/HttpClientService";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function Screening_officerCreate() {
    const [Screening_officers, setScreening_officers] = useState<Screening_officersInterface>({});
    const [Genders, setGenders] = useState<GendersInterface[]>([]);
    const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
    const [Bloods, setBloods] = useState<BloodInterface[]>([]);
    const [Religions, setReligions] = useState<ReligionInterface[]>([]);
    const [Educations, setEducations] = useState<EducationsInterface[]>([]);
    const [Nationalitys, setNationalitys] = useState<NationalityInterface[]>([]);
    const [officers, setOfficers] = useState<OfficersInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    //
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

    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof Screening_officers;
  
      const { value } = event.target;
  
      setScreening_officers({ ...Screening_officers, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof Screening_officers;
      const value = event.target.value;
      setScreening_officers({
          ...Screening_officers,
          [name]: value,
      });
      console.log(`${name}: ${value}`);
  };

  const getOfficersID = async () => {
    let res = await GetOfficerByUID();
    Screening_officers.OfficerID = res.ID;
    console.log(Screening_officers.OfficerID);
    if (res) {
        setOfficers(res);
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
  const getEducation = async () => {
    let res = await GetEducation();
    if (res) {
      setEducations(res);
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


  useEffect(() => {
    getGender(); getPrefix(); getEducation(); getBlood(); getReligion(); getNationality();getOfficersID(); }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {

    if (Screening_officers.PrefixID == undefined || Screening_officers.PrefixID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกคำนำหน้า");
  }
    else if (Screening_officers.GenderID == undefined || Screening_officers.GenderID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกเพศ")
  }
    else if (Screening_officers.BloodID == undefined || Screening_officers.BloodID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกกรุ๊ปเลือด")
    }
    else if (Screening_officers.ReligionID == undefined || Screening_officers.ReligionID == 0){
      setError(true);
      setAlertMessage("กรุณาเลือกศาสนา")
  }
  else if (Screening_officers.NationalityID == undefined || Screening_officers.NationalityID == 0){
    setError(true);
    setAlertMessage("กรุณาเลือกสัญชาติ")
  }
  else if (Screening_officers.EducationID == undefined || Screening_officers.EducationID == 0){
    setError(true);
    setAlertMessage("กรุณาเลือกระดับการศึกษา")
  }

    else{
    let data = {

      PrefixID: convertType(Screening_officers.PrefixID ?? ""),
      GenderID: convertType(Screening_officers.GenderID ?? ""),
      EducationID: convertType(Screening_officers.EducationID ?? ""),
      ReligionID: convertType(Screening_officers.ReligionID ?? ""),
      BloodID: convertType(Screening_officers.BloodID ?? ""),
      NationalityID: convertType(Screening_officers.NationalityID ?? ""),
      OfficerID: convertType(Screening_officers.OfficerID ?? ""), 

      Screening_officer_Name: Screening_officers.Screening_officer_Name ?? "",
      ScreeningIDCard: Screening_officers.ScreeningIDCard ?? "",
      Birthday: Screening_officers.Birthday ?? "",
      Phone: Screening_officers.Phone ?? "",
      Email: Screening_officers.Email ?? "",
      EducationName: Screening_officers.EducationName ?? "",
      EducationMajor: Screening_officers.EducationMajor ?? "",
      University: Screening_officers.University ?? "",
    };
    
    console.log(data)
    let res = await Screening_officer(data);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
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
            <p>ระบบบันทึกข้อมูลฝ่ายคัดกรอง</p>
          </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ paddingX: 2, paddingY: 0.1 }}>
          <Typography variant="h6" color="primary">
            <p>ข้อมูลส่วนตัว</p>
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ padding: 2 }}>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>คำนำหน้า</p>
              <Select
                native
                value={Screening_officers.PrefixID + ""}
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
                <p>ชื่อ-สกุล</p>
                <TextField fullWidth id="Screening_officer_Name" type="string" variant="outlined"
                label="ชื่อ-นามสกุล" 
                value={Screening_officers.Screening_officer_Name}
                onChange={handleInputChange} />
              </Grid>
      
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={Screening_officers.GenderID + ""}
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
                value={Screening_officers.BloodID + ""}
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
                value={Screening_officers.ReligionID + ""}
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
                value={Screening_officers.Birthday}
                onChange={handleInputChange} />
              </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>สัญชาติ</p>
              <Select
                native
                value={Screening_officers.NationalityID + ""}
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
                value={Screening_officers.NationalityID + ""}
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

          <Grid item xs={5.5}>
                <p>รหัสบัตรประชาชน</p>
                <TextField fullWidth id="ScreeningIDCard" type="string" variant="outlined" 
                label="รหัสบัตรประชาชน 13 หลัก" 
                value={Screening_officers.ScreeningIDCard}
                onChange={handleInputChange} />
              </Grid>
          <Grid item xs={6.5}> </Grid>

          </Grid>
          <Box sx={{ paddingX: 2, paddingY: 0.1 }}>
          <Divider />
          <Typography variant="h6" color="primary">
            <p>ข้อมูลการศึกษา</p>
          </Typography>
          </Box>

        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={5.5}>
            <FormControl fullWidth variant="outlined">
              <p>ระดับปริญญา</p>
              <Select
                native
                value={Screening_officers.EducationID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EducationID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกระดับปริญญา
                </option>
                {Educations.map((item: EducationsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Description}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6.5}>
                <p>ชื่อปริญญา</p>
                <TextField fullWidth id="EducationName" type="string" variant="outlined"
                label="ชื่อปริญญา"   
                value={Screening_officers.EducationName}
                onChange={handleInputChange}/>
          </Grid>

              <Grid item xs={5.5}>
                <p>ชื่อสาขาวิชาเอก</p>
                <TextField fullWidth id="EducationMajor" type="string" variant="outlined"
                label="ชื่อสาขาวิชาเอก"   
                value={Screening_officers.EducationMajor}
                onChange={handleInputChange} />
              </Grid>

          <Grid item xs={6.5}>
                <p>ชื่อมหาวิทยาลัย</p>
                <TextField fullWidth id="University" type="string" variant="outlined"
                label="ชื่อมหาวิทยาลัย"  
                value={Screening_officers.University}
                onChange={handleInputChange}/>
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
                value={Screening_officers.Phone}
                onChange={handleInputChange} />
              </Grid>

          <Grid item xs={6}>
                <p>อีเมล</p>
                <TextField fullWidth id="Email" type="string" variant="outlined"  
                 label="ตัวอย่าง xxxx@gmail.com" 
                 value={Screening_officers.Email}
                 onChange={handleInputChange} />
              </Grid>
             


          <Grid item xs={12}>
          <Button
              component={RouterLink}
              to="/Screening_officerList"
              variant="contained"
              color="inherit"
              startIcon={<BoyIcon />}
            >
              ดูข้อมูลเจ้าหน้าที่คัดกรอง
            </Button>
            <Button
             style={{ float: "right" }}
             onClick={submit}
             variant="contained"
             color="primary"
             startIcon={<SaveIcon />}

           >
             บันทึกข้อมูลเจ้าหน้าที่คัดกรอง
            </Button>
            </Grid>
          </Grid>
      </Paper>
    </Container>
  );
}

export default Screening_officerCreate;