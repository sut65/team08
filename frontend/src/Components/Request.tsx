import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { RequestInterface } from "../Models/IRequest";
import { GetRequest } from "../Services/HttpClientService";
import { Dialog, DialogTitle } from "@mui/material";

function Request() {
    const [requests, setRequests] = React.useState<RequestInterface[]>([]);
    const [RequestID, setRequestID] = React.useState(0);
    
    const [openDelete, setOpendelete] = React.useState(false);
    const [openUpdate, setOpenupdate] = React.useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = async () => {
            let res = await GetRequest();
        if (res) {
            setRequests(res);
            console.log(res);
        }
    };
    const handleRowClick: GridEventListener<"rowClick"> = (params) => {
        setRequestID(Number(params.row.ID));
        localStorage.setItem("RequestID", params.row.ID);
      };
      const handleClose = () => {
        setOpendelete(false);
        setOpenupdate(false);
      };
    
      const Delete_Request = async () => {
        const apiUrl = `http://localhost:8080/request/${RequestID}`;
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
        getRequests();
    };
    

    const columns: GridColDef[] = [
        {field: "ID", headerName: "ลำดับ", width: 50  },
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
        {field: "R_ID", headerName: "เลขกำกับการเบิก", width: 150 },
        {field: "R_NAME", headerName: "เคส", width: 150 },
        {field: "QUANTITY", headerName: "จำนวน", width: 120 },
        {field: "Med_Equipment", headerName: "อุปกรณ์", width: 150 ,valueFormatter: (params) => params.value.Equipment,},
        {field: "TIME", headerName: "วันที่ เวลา", width: 100 },
        {field: "Location", headerName: "สถานที่", width: 120 ,valueFormatter: (params) => params.value.Name,},
        
    ];
    return (
        <div>
            {/* ยืนยันการลบ */}
            <Dialog open={openDelete} onClose={handleClose} >
                        <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={Delete_Request}
                            >
                                <div className="good-font">
                                   ยืนยัน
                             </div>
                            </Button>
                    </Dialog>
          
             {/* ยืนยันการแก้ไข */}
             {/* ยืนยันการแก้ไข */}
        {requests.map((row) => (
            <Dialog open={openUpdate} onClose={handleClose} key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        aria-lable="outlined button group"
                        //กด "ยืนยัน" ไปที่หน้าแก้ไข
                        onClick={() => navigate({ pathname: `/request/update/${RequestID}` })} autoFocus
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
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            ข้อมูลการเบิกอุปกรณ์
                        </Typography>
                    </Box>
                    <Box>
                        <Button component={RouterLink} to="/request/create" variant="contained" color="primary">
                            บันทักข้อมูลการเบิกอุปกรณ์
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid
                        rows={requests}
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

export default Request;