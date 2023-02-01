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
import { PolicingsInterface } from "../Models/IPolicing";
import { PatiendsInterface } from "../Models/IPatiend";
import { AddressThailandInterface } from "../Models/IAddressThailand";
import { BloodInterface } from "../Models/IBlood";
import { NationalityInterface } from "../Models/INationality";
import { ReligionInterface } from "../Models/IReligion";

import {GetPolicing,GetGender,GetPrefix,CreatePatiend,GetAddressThailand,GetBlood,GetNationality,GetReligion} from "../Services/HttpClientService";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function PatiendCreate() {
    const [Patiends, setPatiends] = useState<PatiendsInterface>({});
    const [Genders, setGenders] = useState<GendersInterface[]>([]);
    const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
    const [Address, setAddress] = useState<AddressThailandInterface[]>([]);
    const [Bloods, setBloods] = useState<BloodInterface[]>([]);
    const [Nationalitys, setNationalitys] = useState<NationalityInterface[]>([]);
    const [Religions, setReligions] = useState<ReligionInterface[]>([]);
    const [Policings, setPolicings] = useState<PolicingsInterface[]>([]);

    const [FirstNameTH, setFirstNameTHs] = useState<string>("");
    const [LastNameTH, setLastNameTHs] = useState<string>("");
    const [Age, setAges] = useState<string>("");
    const [Birthday, setBirthdays] = useState<string>("");
    const [IDCard, setIDCards] = useState<string>("");
    const [Phone, setPhones] = useState<string>("");
    const [House_ID, setHouse_IDs] = useState<string>("");


    
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
      const name = event.target.name as keyof typeof Patiends;
      const value = event.target.value;
      setPatiends({
          ...Patiends,
          [name]: value,
      });
      console.log(`${name}: ${value}`);
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
  const getPolicing = async () => {
    let res = await GetPolicing();
    if (res) {
      setPolicings(res);
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
    getGender();
    getPrefix();
    getPolicing();
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
      PrefixID: convertType(Patiends.PrefixID),
      GenderID: convertType(Patiends.GenderID),
      PolicingID: convertType(Patiends.PolicingID),
      AddressID: convertType(Patiends.AddressID),
      NationalityID: convertType(Patiends.NationalityID),
      ReligionID: convertType(Patiends.ReligionID),
      BloodID: convertType(Patiends.BloodID),

      FirstNameTH: (FirstNameTH),
      LastNameTH: (LastNameTH),
      Birthday: (Birthday),
      IDCard: (IDCard),
      Age: (convertType(Age)),
      Phone: (Phone),
      House_ID: (House_ID),
     
    };
    console.log(data)
    let res = await CreatePatiend(data);
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
              ข้อมูลผู้ป่วย
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12}><h3>ข้อมูลส่วนตัว</h3>  </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth variant="outlined">
              <p>คำนำหน้า</p>
              <Select
                native
                value={Patiends.PrefixID + ""}
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

          <Grid item xs={4.5}>
                <p>ชื่อ</p>
                <TextField fullWidth id="FirstNameTH" type="string" variant="outlined"  
                onChange={(event) => setFirstNameTHs(event.target.value)} />
              </Grid>

          <Grid item xs={4.5}>
                <p>นามสกุล</p>
                <TextField fullWidth id="LastNameTH" type="string" variant="outlined"  
                onChange={(event) => setLastNameTHs(event.target.value)} />
              </Grid>
          
              <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={Patiends.GenderID + ""}
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
                value={Patiends.BloodID + ""}
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
                value={Patiends.ReligionID + ""}
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
                value={Patiends.NationalityID + ""}
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
                value={Patiends.NationalityID + ""}
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

          
          <Grid item xs={3.5}>
                <p>อายุ</p>
                <TextField fullWidth id="ScreeningIDCard" type="number" variant="outlined"  
                onChange={(event) => setAges(event.target.value)} />
              </Grid>

          <Grid item xs={5.5}>
                <p>รหัสบัตรประชาชน</p>
                <TextField fullWidth id="IDCard" type="string" variant="outlined"  
                onChange={(event) => setIDCards(event.target.value)} />
              </Grid>

          
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <p>สิทธิการรักษา</p>
              <Select
                native
                value={Patiends.PolicingID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PolicingID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสิทธิการรักษา
                </option>
                {Policings.map((item: PolicingsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Description}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}><h3>ข้อมูลการติดต่อ</h3>  </Grid>

          <Grid item xs={6}>
                <p>เบอร์โทรศัพท์</p>
                <TextField fullWidth id="Phone" type="string" variant="outlined"  
                onChange={(event) => setPhones(event.target.value)} />
              </Grid>
          <Grid item xs={6}> </Grid>

          <Grid item xs={6}>
                <p>บ้านเลขที่</p>
                <TextField fullWidth id="House_ID" type="string" variant="outlined"  
                onChange={(event) => setHouse_IDs(event.target.value)} />
              </Grid>
          
              <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ตำบล</p>
              <Select
                native
                value={Patiends.AddressID + ""}
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
                native
                value={Patiends.AddressID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "AddressID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสัญชาติ
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
                native
                value={Patiends.AddressID + ""}
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
                native
                value={Patiends.AddressID + ""}
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
              to="/PatiendCreate"
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

export default PatiendCreate;