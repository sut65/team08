import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { Dialog, DialogTitle } from "@mui/material";

import { Operating_RoomsInterface } from "../Models/IOperating_Room";
import { GetOperating_Room } from "../Services/HttpClientService";


function Operating_RoomList() {
    const [Operating_Rooms, setOperating_Rooms] = useState<Operating_RoomsInterface[]>([]);
    const [Operating_RoomID, setOperating_RoomID] = React.useState(0);

    const [openDelete, setOpendelete] = React.useState(false);
    const [openUpdate, setOpenupdate] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      getOperating_Rooms();
    }, []);

    const handleRowClick: GridEventListener<"rowClick"> = (params) => {
      setOperating_RoomID(Number(params.row.ID));
      localStorage.setItem("Operating_RoomID", params.row.ID);
    };
    
    const handleClose = () => {
      setOpendelete(false);
      setOpenupdate(false);
    };
  
    const Delete_Operating_Room = async () => {
      const apiUrl = `http://localhost:8080/Operating_Room/${Operating_RoomID}`;
      const requestOptions = {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
          },
      };
      
      await fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
             //console.log("delete ID: " + DispenseID)
          } else {
            console.log("NO DATA")
          }
      });
      
      handleClose();
      getOperating_Rooms();
  };
  
    const getOperating_Rooms = async () => {
      let res = await GetOperating_Room();
      if (res) {
        setOperating_Rooms(res);
        console.log(res);
      } 
    };
  
    const columns: GridColDef[] = [
      { field: "ID", headerName: "ลำดับ", width: 50 },
      {
        field: "UPDATE", headerName: "แก้ไข", width: 100,
        renderCell: () => {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenupdate(true)}
                >
                    Edit
                </Button>
            );
        },
    },
    {
        field: "DELETE", headerName: "ลบ", width: 100,
        renderCell: () => {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpendelete(true)}
                >
                    Delete
                </Button>
            );
        },
    },
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
        {/* ยืนยันการลบ */}
      <Dialog open={openDelete} onClose={handleClose} >
                <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={Delete_Operating_Room}
                    >
                        <div className="good-font">
                            ยืนยัน
                        </div>
                    </Button>
            </Dialog>
          
        {/* ยืนยันการแก้ไข */}
        {Operating_Rooms.map((row) => (
            <Dialog open={openUpdate} onClose={handleClose} key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        aria-lable="outlined button group"
                        //กด "ยืนยัน" ไปที่หน้าแก้ไข
                        onClick={() => navigate({ pathname: `/operating_roomUpdate/${row.ID}` })} autoFocus
                    >
                        <div className="good-font">
                          ยืนยัน
                        </div>
                  </Button>
              </Dialog>
        ))}

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
              onRowClick={handleRowClick}
            />
          </div>
        </Container>
      </div>
    );
  }
  
  export default Operating_RoomList;