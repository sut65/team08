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

import { PrefixsInterface } from "../Models/IPrefix";
import { GendersInterface } from "../Models/IGender";
import { EducationsInterface } from "../Models/IEducation";
import { BloodInterface } from "../Models/IBlood";
import { ReligionInterface } from "../Models/IReligion";
import { NationalityInterface } from "../Models/INationality";
import { Screening_officersInterface } from "../Models/IScreening_officer";
import { OfficersInterface } from "../Models/IOfficer";/////

import {GetOfficerByUID,GetEducation,GetGender,GetPrefix,CreateScreening_officer,GetBlood,GetReligion,GetNationality} from "../Services/HttpClientService";
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

    const [Screening_officer_Names, setScreening_officer_Names] = useState<string>("");
    const [Birthday, setBirthdays] = useState<string>("");
    const [ScreeningIDCard, setScreeningIDCards] = useState<string>("");
    const [Phone, setPhones] = useState<string>("");
    const [Email, setEmails] = useState<string>("");
    const [EducationName, setEducationNames] = useState<string>("");
    const [EducationMajor, setEducationMajors] = useState<string>("");
    const [University, setUniversitys] = useState<string>("");
    const [officers, setOfficers] = useState<OfficersInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
    let data = {
      PrefixID: convertType(Screening_officers.PrefixID),
      GenderID: convertType(Screening_officers.GenderID),
      EducationID: convertType(Screening_officers.EducationID),
      ReligionID: convertType(Screening_officers.ReligionID),
      BloodID: convertType(Screening_officers.BloodID),
      NationalityID: convertType(Screening_officers.NationalityID),
      CountryID: convertType(Screening_officers.CountryID),

      Screening_officer_Name: (Screening_officer_Names),
      Birthday: (Birthday),
      ScreeningIDCard: (ScreeningIDCard),
      Phone: (Phone),
      Email: (Email),
      EducationName: (EducationName),
      EducationMajor: (EducationMajor),
      University: (University),
      OfficerID: convertType(Screening_officers.OfficerID),

    };
    
    console.log(data)
    let res = await CreateScreening_officer(data);
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
              ข้อมูลเจ้าหน้าที่ฝ่ายคัดกรอง
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12}><h3>ข้อมูลส่วนตัว</h3>  </Grid>
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
                <p>ชื่อ</p>
                <TextField fullWidth id="FirstNameTH" type="string" variant="outlined"  
                onChange={(event) => setScreening_officer_Names(event.target.value)} />
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
                onChange={(event) => setBirthdays(event.target.value)} />
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
                native
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
                onChange={(event) => setScreeningIDCards(event.target.value)} />
              </Grid>

          <Grid item xs={12}><h3>ข้อมูลการศึกษา</h3>  </Grid>


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
                onChange={(event) => setEducationNames(event.target.value)} />
          </Grid>

              <Grid item xs={5.5}>
                <p>ชื่อสาขาวิชาเอก</p>
                <TextField fullWidth id="EducationMajor" type="string" variant="outlined"  
                onChange={(event) => setEducationMajors(event.target.value)} />
              </Grid>

          <Grid item xs={6.5}>
                <p>ชื่อมหาวิทยาลัย</p>
                <TextField fullWidth id="University" type="string" variant="outlined"  
                onChange={(event) => setUniversitys(event.target.value)} />
              </Grid>

              <Grid item xs={12}><h3>ข้อมูลการติดต่อ</h3>  </Grid>   

          <Grid item xs={6}>
                <p>เบอร์โทรศัพท์</p>
                <TextField fullWidth id="Phone" type="string" variant="outlined"  
                onChange={(event) => setPhones(event.target.value)} />
              </Grid>

          <Grid item xs={6}>
                <p>อีเมล</p>
                <TextField fullWidth id="Email" type="string" variant="outlined"  
                onChange={(event) => setEmails(event.target.value)} />
              </Grid>


          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/Screening_officerCreate"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Screening_officerCreate;