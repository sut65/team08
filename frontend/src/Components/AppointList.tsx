import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppointInterface } from "../Models/IAppoint";
import { GetAppoint ,GetTreatment} from "../Services/HttpClientService";
import { TreatmentsInterface } from "../Models/ITreatment";

function AppointList() {
  const [Appoints, setAppoints] = useState<AppointInterface[]>([]);
  const [treatment, setTreatment] = useState<TreatmentsInterface[]>([]);

  useEffect(() => {
    getAppoints();
    getTreatment();
  }, []);

  const getTreatment = async () => {
    let res = await GetTreatment();
    if (res) {
      setTreatment(res);
      console.log(res);
    }
  };

  const getAppoints = async () => {
    let res = await GetAppoint();
    if (res) {
      setAppoints(res);
      console.log(res);
    }
  };
  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Treatment",
      headerName: "ผู้ป่วย",
      width: 200,
      valueFormatter: (params) => params.value.TREATMENT_ID,
    },

    {
      field: "Levelcure",
      headerName: "สิทธิในการรักษา",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },

    {
      field: "Department",
      headerName: "แผนกที่นัด",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },

    {
      field: "Date_now",
      headerName: "วันที่ออกใบนัด",
      width: 200,
    },
    {
      field: "Date_appoint",
      headerName: "วัน-เวลาที่นัด",
      width: 200,
    },

    // {
    //   field: "Officer",
    //   headerName: "เจ้าหน้าที่ผู้ออกใบนัด",
    //   width: 150,
    //   valueFormatter: (params) => params.value.Name,
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
              ข้อมูลการนัด
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/AppointCreate"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูลการนัดลำดับต่อไป
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={Appoints}
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
export default AppointList;
