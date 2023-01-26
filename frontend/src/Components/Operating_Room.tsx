import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Operating_RoomsInterface } from "../Models/IOperating_Room";
import { GetOperating_Room } from "../Services/HttpClientService";


function Operating_RoomList() {
    const [Operating_Rooms, setOperating_Rooms] = useState<Operating_RoomsInterface[]>([]);
  
    useEffect(() => {
      getOperating_Rooms();
    }, []);
  
    const getOperating_Rooms = async () => {
      let res = await GetOperating_Room();
      if (res) {
        setOperating_Rooms(res);
      } 
    };
  
    const columns: GridColDef[] = [
      { field: "ID", headerName: "ลำดับ", width: 50 },
      {
        field: "Save_ITI",
        headerName: "คนไข้ภายในที่ได้รับการผ่าตัด",
        width: 200,
        valueFormatter: (params) => params.value.ID,
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
      { field: "Datetime", headerName: "วันเวลาที่จอง", width: 200 },
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
                ข้อมูลการจองห้องผ่าตัด
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/operating_roomCreate"
                variant="contained"
                color="primary"
              >
                จองห้องผ่าตัด
              </Button>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={Operating_Rooms}
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
  
  export default Operating_RoomList;