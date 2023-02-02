import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DispenseInterface } from "../Models/IDispense";
import { GetDispense ,GetTreatment } from "../Services/HttpClientService";
import { TreatmentsInterface } from "../Models/ITreatment";

function DispenseList() {
  const [Dispenses, setDispenses] = useState<DispenseInterface[]>([]);
  const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);

  useEffect(() => {
    getDispenses();
    getTreatment();
  }, []);

  const getTreatment = async () => {
    let res = await GetTreatment();
    if (res) {
      setTreatment(res);
      console.log(res);
    }
  };

  const getDispenses = async () => {
    let res = await GetDispense();
    if (res) {
      setDispenses(res);
      console.log(res);
    }
  };


  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Treatment",
      headerName: "หมายเลขการรักษา",
      width: 200,
      valueFormatter: (params) => params.value.TREATMENT_ID,
    },
    {
      field: "Drug",
      headerName: "ยาที่จ่าย",
      width: 250,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Practice",
      headerName: "การรับประทานยา",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Number",
      headerName: "จำนวนยา",
      width: 150,
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
              ข้อมูลการจ่ายยา
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/DispenseCreate"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูลการจ่ายยาลำดับต่อไป
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={Dispenses }
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

export default DispenseList;

//Aern
