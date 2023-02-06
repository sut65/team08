import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { MedEmployeeInterface } from "../Models/IMedEmployee";
import { GetMedEmployees } from "../Services/HttpClientService";

function MedEmployee() {
    const [MedEmployees, setMedEmployees] = useState<MedEmployeeInterface[]>([]);

    const apiUrl = "http://localhost:8080/medemployee"
  
    useEffect(() => {
        getMedEmployee();
    }, []);
  
    const getMedEmployee = async () => {
      let res = await GetMedEmployees();
      if (res) {
        setMedEmployees(res);
      } 
    };
 
    const columns: GridColDef[] = [
      { field: "ID", headerName: "ลำดับ", width: 50 },
      {
        field: "Prefix",
        headerName: "คำนำหน้า",
        width: 90,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "Name",
        headerName: "ชื่อ-สกุล",
        width: 200,
      },
      {
        field: "Age",
        headerName: "อายุ",
        width: 100,
      },
      {
        field: "Gender",
        headerName: "เพศ",
        width: 80,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "Phone",
        headerName: "เบอร์โทร",
        width: 100,
      },
      {
        field: "Education",
        headerName: "ระดับการศึกษา",
        width: 120,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "EducationName",
        headerName: "การศึกษา",
        width: 150,
      },
      {
        field: "EducationMajor",
        headerName: "สาขา",
        width: 150,
      },
      {
        field: "University",
        headerName: "มหาวิทยาลัย",
        width: 130,
      },
      {
        field: "Email",
        headerName: "อีเมล",
        width: 200,

      },
      {
        field: "Password",
        headerName: "รหัสผ่าน",
        width: 200,
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
              ข้อมูลเจ้าหน้าที่เทคนิคการแพทย์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/medemployees/create"
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูลเจ้าหน้าที่เทคนิคการแพทย์
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={MedEmployees}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      </Container>
    </div>
  );
}
  
export default MedEmployee;