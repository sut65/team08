import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { PatiendsInterface } from "../Models/IPatiend";
import { GetPatiend } from "../Services/HttpClientService";


function PatiendList() {
    const [Patiends, setPatiends] = useState<PatiendsInterface[]>([]);
  
    useEffect(() => {
      getPatiends();
    }, []);
  
    const getPatiends = async () => {
      let res = await GetPatiend();
      if (res) {
        setPatiends(res);
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
                to="/PatiendCreate"
                variant="contained"
                color="primary"
              >
                สร้างข้อมูลคนไข้ลำดับต่อไป
              </Button>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={Patiends}
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
  
  export default PatiendList;