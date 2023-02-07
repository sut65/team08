import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { PatientsInterface } from "../Models/IPatient";
import { GetPatient } from "../Services/HttpClientService";


function PatientList() {
    const [Patients, setPatients] = useState<PatientsInterface[]>([]);
  
    useEffect(() => {
      getPatients();
    }, []);
  
    const getPatients = async () => {
      let res = await GetPatient();
      if (res) {
        setPatients(res);
      } 
    };
  
    const columns: GridColDef[] = [
      { field: "ID", headerName: "ลำดับ", width: 50 },
      {
        field: "Prefix",
        headerName: "คำนำหน้า",
        width: 300,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "Patient_Name",
        headerName: "ชื่อ-สกุล",
        width: 300,
      },
      {
        field: "Age",
        headerName: "อายุ",
        width: 300,
      },
      {
        field: "Gender",
        headerName: "เพศ",
        width: 300,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "Date_of_birth",
        headerName: "วันเดือนปีเกิด",
        width: 300,
      },
      {
        field: "ID_card",
        headerName: "รหัสบัตรประชาชน",
        width: 300,
      },
      {
        field: "Phone",
        headerName: "เบอร์โทร",
        width: 300,
      },

      {
        field: "Policing",
        headerName: "สิทธิการรักษา",
        width: 300,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "Address",
        headerName: "ที่อยู่",
        width: 500,

      },
    ];
  
    return (
      <div>
        <Container maxWidth="md">
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                ข้อมูลคนไข้
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/PatientCreate"
                variant="contained"
                color="primary"
              >
                สร้างข้อมูลคนไข้ลำดับต่อไป
              </Button>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={Patients}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Container>
      </div>
    );
  }
  
  export default PatientList;