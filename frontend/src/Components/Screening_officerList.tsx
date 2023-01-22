import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Screening_officersInterface } from "../Models/IScreening_officer";
import { GetScreening_officer } from "../Services/HttpClientService";


function Screening_officerList() {
    const [Screening_officers, setScreening_officers] = useState<Screening_officersInterface[]>([]);
  
    useEffect(() => {
      getScreening_officers();
    }, []);
  
    const getScreening_officers = async () => {
      let res = await GetScreening_officer();
      if (res) {
        setScreening_officers(res);
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
        field: "Name",
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
        field: "Phone",
        headerName: "เบอร์โทร",
        width: 300,
      },
      {
        field: "Education",
        headerName: "ระดับการศึกษา",
        width: 300,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "Email",
        headerName: "อีเมล",
        width: 300,

      },
      {
        field: "Password",
        headerName: "sรหัสผ่าน",
        width: 300,
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
                ข้อมูลเจ้าหน้าที่ฝ่ายคัดกรอง
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/Screening_officerCreate"
                variant="contained"
                color="primary"
              >
                สร้างข้อมูลเจ้าหน้าที่คนอื่น
              </Button>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={Screening_officers}
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
  
  export default Screening_officerList;