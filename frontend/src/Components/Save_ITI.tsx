import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Save_ITIsInterface } from "../Models/ISave_ITI";
import { ListSave_ITIs } from "../Services/HttpClientService";


function Save_ITIList() {
    const [Save_ITIs, setSave_ITIs] = useState<Save_ITIsInterface[]>([]);
  
    useEffect(() => {
      getSave_ITIs();
    }, []);
  
    const getSave_ITIs = async () => {
      let res = await ListSave_ITIs();
      if (res) {
        setSave_ITIs(res);
      } 
    };
  
    const columns: GridColDef[] = [
      { field: "ID", headerName: "ลำดับ", width: 50 },
      {
        field: "TreatmentID",
        headerName: "การรักษา",
        width: 100,
        valueFormatter: (params) => params.value.Name,
      },
      {
        field: "Building",
        headerName: "ตึก",
        width: 100,
        valueFormatter: (params) => params.value.Name,
      },
      {
        field: "Room",
        headerName: "ห้อง",
        width: 100,
        valueFormatter: (params) => params.value.Name,
      },
      {
        field: "State",
        headerName: "สถานะ",
        width: 175,
        valueFormatter: (params) => params.value.Name,
      },
      { field: "Date_checkin", headerName: "วันเวลาที่เข้า", width: 200 },
      { field: "Date_checkout", headerName: "วันเวลาที่ออก", width: 200 },

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
                ข้อมูลการรักษาคนไข้ภายใน
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/save_itiCreate"
                variant="contained"
                color="primary"
              >
                จัดการข้อมูลการรักษาคนไข้ภายใน
              </Button>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={Save_ITIs}
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
  
  export default Save_ITIList;