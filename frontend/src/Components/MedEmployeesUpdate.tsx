import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
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
import { OfficersInterface } from "../Models/IOfficer";////

import {GetEducation,GetGender,GetPrefix,CreateMedEmployee,GetOfficerByUID,Med_Employee,} from "../Services/HttpClientService";
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function MedEmployeeUpdate() {

    const [MedEmployee_ID, setMedEmployee_ID] = React.useState<Number | undefined>(undefined);
    
    const [MedEmployees, setMedEmployees] = useState<MedEmployeeInterface>({});
    const [Genders, setGenders] = useState<GendersInterface[]>([]);
    const [Prefixs, setPrefixs] = useState<PrefixsInterface[]>([]);
    const [Educations, setEducations] = useState<EducationsInterface[]>([]);

    const [Name, setNames] = useState<string>("");
    const [Age, setAges] = useState<string>("");
    const [Phone, setPhones] = useState<string>("");
    const [Email, setEmails] = useState<string>("");
    const [Password, setPasswords] = useState<string>("");
    const [University, setUniversitys] = useState<string>("");
    const [EducationName, setEducationNames] = useState<string>("");
    const [EducationMajor, setEducationMajos] = useState<string>("");
    const params = useParams()

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [message, setAlertMessage] = React.useState("")

    const [officers, setOfficers] = useState<OfficersInterface[]>([]);

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
  /////////
  const getOfficersID = async () => {
    let res = await GetOfficerByUID();
    MedEmployees.OfficerID = res.ID;
    console.log(MedEmployees.OfficerID);
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


  useEffect(() => {
    getGender();
    getPrefix();
    getEducation();
    getOfficersID();
    getMedEmployee();

  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }


  function update() {
    let upmedemployee = {
      ID: MedEmployees.ID,
      PrefixID: convertType(MedEmployees.PrefixID),
      GenderID: convertType(MedEmployees.GenderID),
      EducationID: convertType(MedEmployees.EducationID),
      Name: MedEmployees.Name ?? "",
      EducationMajor: MedEmployees.EducationMajor ?? "",
      EducationName:MedEmployees.EducationName ?? "",
      University:MedEmployees.University ?? "",
      Age: (convertType(Age)),
      Phone: MedEmployees.Phone ?? "",
      Email: MedEmployees.Email ?? "",
      Password: MedEmployees.Password ?? "",
    };

    
  
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upmedemployee),
    };
    console.log(upmedemployee);
  
    fetch(`http://localhost:8080/medemployeesUpdate`, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          await timeout(1000); //for 1 sec delay
          window.location.reload();     
          
        } else {
          setError(true);
        }
      });
  }
  
  const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>) => {
    const id = event.target.id as keyof typeof MedEmployees;
  
    const { value } = event.target;
  
    setMedEmployees({ ...MedEmployees, [id]: value });
  };
  
  const getMedEmployee = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    fetch(`http://localhost:8080/medemployees/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setMedEmployees(res.data);
          setMedEmployee_ID(res.data.ID);
        }
      });
  };
  return (
    <Container maxWidth="md">
      <Snackbar
        id="success"
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
        บันทึกข้อมูลสำเร็จ
        {message}
        </Alert>
      </Snackbar>
      <Snackbar
        id="error"
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
        บันทึกข้อมูลไม่สำเร็จ
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
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลเจ้าหน้าที่เทคนิคการแพทย์
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={4}>
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

          <Grid item xs={8}>
                <p>ชื่อ</p>
                <TextField fullWidth id="Name" type="string" variant="outlined"  
                value={MedEmployees.Name}
                onChange={handleInputChange} />
              </Grid>
          
          <Grid item xs={2}>
                <p>อายุ</p>
                <TextField fullWidth id="Age" type="number" variant="outlined"  
                value={MedEmployees.Age}
                onChange={handleInputChange} />
              </Grid> 

          <Grid item xs={3}>
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
                value={MedEmployees.Phone}
                onChange={handleInputChange} />
                
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
                <p>การศึกษา</p>
                <TextField fullWidth id="EducationName" type="string" variant="outlined"  
                value={MedEmployees.EducationName}
                onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
                <p>สาขา</p>
                <TextField fullWidth id="EducationMajor" type="string" variant="outlined"  
                value={MedEmployees.EducationMajor}
                onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
                <p>มหาวิทยาลัย</p>
                <TextField fullWidth id="University" type="string" variant="outlined"  
                value={MedEmployees.University}
                onChange={handleInputChange} />
          </Grid>

          <Grid item xs={6}>
                <p>อีเมล</p>
                <TextField fullWidth id="Email" type="string" variant="outlined"  
                value={MedEmployees.Email}
                onChange={handleInputChange} />
              </Grid> 
            
          <Grid item xs={6}>
                <p>รหัสผ่าน</p>
                <TextField fullWidth id="Password" type="string" variant="outlined"
                value={MedEmployees.Password}
                onChange={handleInputChange} />
              </Grid> 

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/medemployees"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={update}
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

export default MedEmployeeUpdate;