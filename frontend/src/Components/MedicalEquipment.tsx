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
    { field: "ID", headerName: "ID", width: 50 },
    {
      field: "Equipment",
      headerName: "Equipment",
      width: 150,
      valueFormatter: (params) => params.value.Equipment,
    },
    {
      field: "Brand",
      headerName: "Brand",
      width: 150,
      valueFormatter: (params) => params.value.Brand_name,
    },
    {
      field: "Med_Status",
      headerName: "Status",
      width: 150,
      valueFormatter: (params) => params.value.Status_name,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 150,
      valueFormatter: (params) => params.value.Quantity ,
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
              Medical Equipment Information
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/medicalequipment/create"
              variant="contained"
              color="primary"
            >
              Create Medical Equipment
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