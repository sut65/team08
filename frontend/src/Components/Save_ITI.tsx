import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { Dialog, DialogTitle } from "@mui/material";

import { Save_ITIsInterface } from "../Models/ISave_ITI";
import { ListSave_ITIs } from "../Services/HttpClientService";


function Save_ITIList() {
    const [Save_ITIs, setSave_ITIs] = useState<Save_ITIsInterface[]>([]);
    const [Save_ITIID, setSave_ITIID] = React.useState(0);

    const [openDelete, setOpendelete] = React.useState(false);
    const [openUpdate, setOpenupdate] = React.useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      getSave_ITIs();
    }, []);

    const handleRowClick: GridEventListener<"rowClick"> = (params) => {
      setSave_ITIID(Number(params.row.ID));
      localStorage.setItem("Save_ITIID", params.row.ID);
    };

    const handleClose = () => {
      setOpendelete(false);
      setOpenupdate(false);
    };
  
    const Delete_Save_ITI = async () => {
      const apiUrl = `http://localhost:8080/Save_ITI/${Save_ITIID}`;
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
      getSave_ITIs();
  };
  
    const getSave_ITIs = async () => {
      let res = await ListSave_ITIs();
      if (res) {
        setSave_ITIs(res);
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
                    onClick={() => {
                      console.log()
                      setOpenupdate(true)
                    }}
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
        field: "TreatmentID",
        headerName: "การรักษา",
        width: 100,
        valueFormatter: (params) => params.value.Name,
      },
      // {
      //   field: "Building",
      //   headerName: "ตึก",
      //   width: 100,
      //   valueFormatter: (params) => params.value.Name,
      // },
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
        {/* ยืนยันการลบ */}
      <Dialog open={openDelete} onClose={handleClose} >
                <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={Delete_Save_ITI}
                    >
                        <div className="good-font">
                            ยืนยัน
                        </div>
                    </Button>
            </Dialog>
          
        {/* ยืนยันการแก้ไข */}
        {Save_ITIs.map((row) => (
            <Dialog open={openUpdate} onClose={handleClose} key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        aria-lable="outlined button group"
                        //กด "ยืนยัน" ไปที่หน้าแก้ไข
                        onClick={() => navigate({ pathname: `/save_itiUpdate/${Save_ITIID}` })} autoFocus
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
              onRowClick={handleRowClick}
            />
          </div>
        </Container>
      </div>
    );
  }
  
  export default Save_ITIList;