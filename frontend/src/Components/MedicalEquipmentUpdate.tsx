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
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";



import { MedEmployeeInterface } from "../Models/IMedEmployee";

import { BrandsInterface } from "../Models/IBrand";
import { MedStatusInterface } from "../Models/IMedStatus";
import { MedicalEquimentInterface } from "../Models/IMedEquipment";



import {
  GetMedByUID,
  GetBrand,
  GetMedStatus,
  MedicalEquipments,
} from "../Services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MedicalEquipmentUpdate() {

  const [MedicalEquipment_ID, setMedicalEquipment_ID] = React.useState<Number | undefined>(undefined);

  const [Brand, setBrands] = useState<BrandsInterface[]>([]);
  const [medstatuses, setMedStatuses] = useState<MedStatusInterface[]>([]);
  //const [medemployees, setMed_Employee] = useState<MedEmployeeInterface[]>([]);
  const [MedicalEquipment, setMedicalEquipment] = useState<MedicalEquimentInterface>({});
  const params = useParams()

  const [Equipment, setEquipments] = useState<string>("");
  const [Quantity, setQuantitys] = useState<string>("");
  const [Shop, setShops] = useState<string>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  

  
  
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
    const name = event.target.name as keyof typeof MedicalEquipment;
    const value = event.target.value;
    setMedicalEquipment({
      ...MedicalEquipment,
      [name]: event.target.value,
    });
  };

  const getMedStatus = async () => {
    let res = await GetMedStatus();
    if (res) {
      setMedStatuses(res);
      console.log(res);
    }
  };

  const getBrand = async () => {
    let res = await GetBrand();
    if (res) {
      setBrands(res);
      console.log(res);

    }
  };

 
  useEffect(() => {
    getBrand();
    getMedStatus();
    getMedicalEquipment();
   
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };


  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }


  function update() {
    if (MedicalEquipment.BrandID == undefined || MedicalEquipment.BrandID == 0){
      setError(true);
      setErrorMessage("กรุณาเลือกยี่ห้อสินค้า");
  }
    else if (MedicalEquipment.Med_StatusID == undefined || MedicalEquipment.Med_StatusID == 0){
      setError(true);
      setErrorMessage("กรุณาเลือกสถานะสินค้า")
    }
  else{
    let upequipment = {
      ID: MedicalEquipment.ID,
      Equipment: MedicalEquipment.Equipment ?? "",
      Quantity: convertType(MedicalEquipment.Quantity) ,
      Shop : MedicalEquipment.Shop ?? "",
      BrandID: convertType(MedicalEquipment.BrandID),
      Med_StatusID: convertType(MedicalEquipment.Med_StatusID),
    };

  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(upequipment),
  };
  console.log(upequipment);

  fetch(`http://localhost:8080/medicalequipmentsUpdate`, requestOptions)
    .then((response) => response.json())
    .then(async (res) => {
      console.log(res);
      if (res.data) {
        setErrorMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
        await timeout(1000); //for 1 sec delay
        window.location.reload();     
        
      } else {
        setErrorMessage(res.error);
        setError(true);
      }
    });
}
}
const handleInputChange = (
  event: React.ChangeEvent<{ id?: string; value: any }>
) => {
  const id = event.target.id as keyof typeof MedicalEquipment;

  const { value } = event.target;

  setMedicalEquipment({ ...MedicalEquipment, [id]: value });
};
const getMedicalEquipment = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  fetch(`http://localhost:8080/medicalequipment/${params.id}`, requestOptions )
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data)
      if (res.data) {
        setMedicalEquipment(res.data);
        setMedicalEquipment_ID(res.data.ID);
      }
    });
};


  return (
    <Container maxWidth="md">
      <Snackbar
        id='success'
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
        id='error'
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
        บันทึกข้อมูลไม่สำเร็จ : {errorMessage}
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
              ข้อมูลอุปกรณ์แพทย์
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
          <p>สถานะ</p>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>      
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Med_Status"
                  native
                  value={MedicalEquipment.Med_StatusID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "Med_StatusID",
                  }}                
                >
                  <option aria-label="None" value=""></option>
                  {medstatuses.map((item: MedStatusInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Status_name}
                    </option>
                  ))}
                </Select>
            </FormControl>            
          </Grid>
          <Grid item xs={6}>
            <p>จำนวน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Quantity"
                label="Number"
                type="Number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={MedicalEquipment.Quantity}
                onChange={handleInputChange}   />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
                <p>เครื่องมือ</p>
                <TextField fullWidth id="Equipment" type="string" variant="outlined"  
                  value={MedicalEquipment.Equipment}
                   onChange={handleInputChange}   />
              </Grid>

          <Grid item xs={6}>
                 <p>ยี่ห้อ</p>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>      
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="BrandID"
                  native
                  value={MedicalEquipment.BrandID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "BrandID",
                  }}                
                >
                  <option aria-label="None" value=""></option>
                  {Brand.map((item: BrandsInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Brand_name}
                    </option>
                  ))}
                </Select>
            </FormControl>  
          </Grid>

          <Grid item xs={6}>
                <p>ร้านค้า</p>
                <TextField fullWidth id="Shop" type="string" variant="outlined"  
                value={MedicalEquipment.Shop}
                 onChange={handleInputChange}  />
              </Grid>

          {/* <Grid item xs={12}>
          <p>Employee</p>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-label">Employee</InputLabel>      
              <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="MedEmployeeID"
                  native
                  value={MedicalEquipment.Med_EmployeeID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "name",
                  }}                
                >
                  <option aria-label="None" value=""></option>
                  {medemployees.map((item: MedEmployeeInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/medicalequipment"
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

export default MedicalEquipmentUpdate;