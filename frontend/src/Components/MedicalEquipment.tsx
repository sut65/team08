import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MedicalEquimentInterface } from "../Models/IMedEquipment";
import { GetMedicalEquipments } from "../Services/HttpClientService";

function MedicalEquipments() {
  const [medicalequipments, SetMedicalEquipments] = useState<MedicalEquimentInterface[]>([]);

  useEffect(() => {
    getMedicalEquipments();
  }, []);

  const getMedicalEquipments = async () => {
    let res = await GetMedicalEquipments();
    if (res) {
      SetMedicalEquipments(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Equipment",
      headerName: "อุปกรณ์",
      width: 150,
      valueFormatter: (params) => params.value.Equipment,
    },
    {
      field: "Brand",
      headerName: "ยี่ห้อ",
      width: 150,
      valueFormatter: (params) => params.value.Brand_name,
    },
    {
      field: "Med_Status",
      headerName: "สถานะ",
      width: 150,
      valueFormatter: (params) => params.value.Status_name,
    },
    {
      field: "Quantity",
      headerName: "จำนวน",
      width: 150,
      valueFormatter: (params) => params.value.Quantity ,
    },
    {
      field: "Shop",
      headerName: "ร้านค้า",
      width: 150,
      valueFormatter: (params) => params.value.Shop ,
    },
    // {
    //   field: "Med_Employee",
    //   headerName: "Med_Employee",
    //   width: 150,
    //   valueFormatter: (params) => params.value.Name ,
    // },
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
              ข้อมูลอุปกรณ์แพทย์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/medicalequipment/create"
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูลอุปกรณ์
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={medicalequipments}
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

export default MedicalEquipments;