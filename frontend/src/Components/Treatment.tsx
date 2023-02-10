import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef,GridEventListener } from "@mui/x-data-grid";
import { TreatmentsInterface } from "../Models/ITreatment";
import { GetTreatment } from "../Services/HttpClientService";
import { Dialog, DialogTitle } from "@mui/material";
 
function Treatment() {
    const [treatments, setTreatments] = React.useState<TreatmentsInterface[]>([]);
    const [TreatmentID, setTreatmentID] = React.useState(0);
    
    const [openDelete, setOpendelete] = React.useState(false);
    const [openUpdate, setOpenupdate] = React.useState(false);
    const navigate = useNavigate();
 
    useEffect(() => {
        getTreatments();
    }, []);

    const getTreatments = async () => {
            let res = await GetTreatment();
        if (res) {
            setTreatments(res);
            console.log(res);
        }
    };
    const handleRowClick: GridEventListener<"rowClick"> = (params) => {
        setTreatmentID(Number(params.row.ID));
        localStorage.setItem("TreatmentID", params.row.ID);
      };
      const handleClose = () => {
        setOpendelete(false);
        setOpenupdate(false);
      };
    
      const Delete_Treatment = async () => {
        const apiUrl = `http://localhost:8080/treatment/${TreatmentID}`;
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
        getTreatments();
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
        {field: "TREATMENT_ID", headerName: "เลขกำกับการรักษา", width: 100 },
        {field: "TREATMENT", headerName: "ทำการรักษา", width: 150 },
        {field: "Patient", headerName: "ผู้ป่วย", width: 150 ,valueFormatter: (params) => params.value.Patient_Name, },
        {field: "Disease", headerName: "โรค", width: 150 ,valueFormatter: (params) => params.value.Name,},
        {field: "DATE", headerName: "วันที่ เวลา", width: 100 },
        {field: "Track", headerName: "สถานะติดตามผล", width: 120 ,valueFormatter: (params) => params.value.Name,},
        {field: "APPOINTMENT", headerName: "นัดครั้งถัดไป", width: 50 },
        {field: "Status", headerName: "สถานะการรักษา", width: 120 ,valueFormatter: (params) => params.value.Name,},
        {field: "CONCLUSION", headerName: "ผลการรักษา", width: 150 },
        {field: "GUIDANCE", headerName: "คำแนะนำ", width: 150 },
        {field: "Doctor", headerName: "แพทย์", width: 100 ,valueFormatter: (params) => params.value.DocterCode, },
    ]; 
    return (
        <div>
            {/* ยืนยันการลบ */}
            <Dialog open={openDelete} onClose={handleClose} >
                        <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={Delete_Treatment}
                            >
                                <div className="good-font">
                                   ยืนยัน
                             </div>
                            </Button>
                    </Dialog>
          
             {/* ยืนยันการแก้ไข */}
             {/* ยืนยันการแก้ไข */}
        {treatments.map((row) => (
            <Dialog open={openUpdate} onClose={handleClose} key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        aria-lable="outlined button group"
                        //กด "ยืนยัน" ไปที่หน้าแก้ไข
                        onClick={() => navigate({ pathname: `/treatment/update/${TreatmentID}` })} autoFocus
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
                            ข้อมูลการรักษา
                        </Typography>
                    </Box>
                    <Box>
                        <Button component={RouterLink} to="/treatment/create" variant="contained" color="primary">
                            บันทักข้อมูลการรักษา
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
                    <DataGrid
                        rows={treatments}
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

export default Treatment;