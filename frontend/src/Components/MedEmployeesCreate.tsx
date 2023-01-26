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
import { MedEmployeeInterface } from "../Models/IMedEmployee";

import {GetEducation,GetGender,GetPrefix,CreateMedEmployee,} from "../Services/HttpClientService";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function MedEmployeeCreate() {
    const [MedEmployees, setMedEmployees] = useState<MedEmployeeInterface>({});
    const [Genders, setGenders] = useState<GendersInterface[]>([]);
    const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
    const [Educations, setEducations] = useState<EducationsInterface[]>([]);

    const [Name, setNames] = useState<string>("");
    const [Age, setAges] = useState<string>("");
    const [Phone, setPhones] = useState<string>("");
    const [Email, setEmails] = useState<string>("");
    const [Password, setPasswords] = useState<string>("");

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
      const name = event.target.name as keyof typeof MedEmployees;
      const value = event.target.value;
      setMedEmployees({
          ...MedEmployees,
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
  const getEducation = async () => {
    let res = await GetEducation();
    if (res) {
      setEducations(res);
      console.log(res);
  }
};


  useEffect(() => {
    getGender();
    getPrefix();
    getEducation();

  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      PrefixID: convertType(MedEmployees.PrefixID),
      GenderID: convertType(MedEmployees.GenderID),
      EducationID: convertType(MedEmployees.EducationID),
      Name: (Name),
      Age: (convertType(Age)),
      Phone: (Phone),
      Email: (Email),
      Password: (Password),
    };
    
    console.log(data)
    let res = await CreateMedEmployee(data);
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
              ประเมินผู้สอน
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>คำนำหน้า</p>
              <Select
                native
                value={MedEmployees.PrefixID + ""}
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

          <Grid item xs={6}>
                <p>ชื่อ</p>
                <TextField fullWidth id="Name" type="string" variant="outlined"  
                onChange={(event) => setNames(event.target.value)} />
              </Grid>
          
          <Grid item xs={6}>
                <p>อายุ</p>
                <TextField fullWidth id="Age" type="number" variant="outlined"  
                onChange={(event) => setAges(event.target.value)} />
              </Grid> 

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={MedEmployees.GenderID + ""}
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

          <Grid item xs={6}>
                <p>เบอร์โทร</p>
                <TextField fullWidth id="Phone" type="string" variant="outlined" 
                onChange={(event) => setPhones(event.target.value)} />
                
              </Grid> 

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ระดับการศึกษา</p>
              <Select
                native
                value={MedEmployees.EducationID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EducationID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกระดับการศึกษา
                </option>
                {Educations.map((item: EducationsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Description}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
                <p>อีเมล</p>
                <TextField fullWidth id="Email" type="string" variant="outlined"  
                onChange={(event) => setEmails(event.target.value)} />
              </Grid> 
            
          <Grid item xs={6}>
                <p>รหัสผ่าน</p>
                <TextField fullWidth id="Password" type="string" variant="outlined"
                onChange={(event) => setPasswords(event.target.value)} />
              </Grid> 

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/MedEmployeeCreate"
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

export default MedEmployeeCreate;