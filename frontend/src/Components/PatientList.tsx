import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { PatientsInterface } from "../Models/IPatient";
import { GetPatient } from "../Services/HttpClientService";
import { Dialog, DialogTitle } from "@mui/material";




function PatientList() {
    const [Patients, setPatients] = useState<PatientsInterface[]>([]);
    const [PatientID, setPatientID] = React.useState(0);  
    const [openDelete, setOpendelete] = React.useState(false); 
    const [openUpdate, setOpenupdate] = React.useState(false);
    const navigate = useNavigate(); 
  
    useEffect(() => {
      getPatients();
    }, []);

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
      setPatientID(Number(params.row.ID)); 
      localStorage.setItem("setPatientID", params.row.ID); 
  };

const handleClose = () => {
      setOpendelete(false)
      setOpenupdate(false)
  };

  const Delete_Patient = async () => {
    const apiUrl = `http://localhost:8080/Patients/${PatientID}`;
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

        } else {
          console.log("NO DATA")
        }
    });
    
    handleClose();
    getPatients();
};
  
    const getPatients = async () => {
      let res = await GetPatient();
      if (res) {
        setPatients(res);
      } 
    };
  
    const columns: GridColDef[] = [
      {  field: "ID", headerName: "ลำดับ", width: 50 },
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
    {field: "Prefix",headerName: "คำนำหน้า",width: 100,valueFormatter: (params) => params.value.Description,},
    {field: "Patient_Name",headerName: "ชื่อ-สกุล",width: 180,},
    {field: "Age",headerName: "อายุ",width: 100,},
    {field: "Gender",headerName: "เพศ",width: 100,valueFormatter: (params) => params.value.Description,},
    {field: "Birthday",headerName: "วันเดือนปีเกิด",width: 100,},
    {field: "Blood",headerName: "กรุ๊ปเลือด",width: 100,valueFormatter: (params) => params.value.Phenotype,},
    {field: "Religion",headerName: "ศาสนา",width: 150,valueFormatter: (params) => params.value.ReligionType,},
    {field: "Nationality",headerName: "เชื้อชาติ",width: 150,valueFormatter: (params) => params.value.NationalityType,},
    {field: "IDCard", headerName: "รหัสบัตรประชาชน",width: 150,},
    {field: "Phone",headerName: "เบอร์โทร",width: 150,},
    {field: "House_ID",headerName: "ที่อยู่",width: 100,},
    ];
  
    return (
      <div>
      {/* ยืนยันการลบ */}
      <Dialog open={openDelete} onClose={handleClose} >
                <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={Delete_Patient}
                    >
                        <div className="good-font">
                            ยืนยัน
                        </div>
                    </Button>
            </Dialog>
          
        {/* ยืนยันการแก้ไข */}
        <Dialog open={openUpdate} onClose={handleClose} >
           <DialogTitle><div className="good-font">ยืนยันการแก้ไข</div></DialogTitle>
           <Button
                   variant="contained"
                   color="primary"

                   onClick={() => navigate({ pathname: `/PatientsUpdate/${PatientID}` })}
               >
                   <div className="good-font">
                       ยืนยัน
                   </div>
               </Button>
       </Dialog>
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
                ข้อมูลคนไข้
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/PatientCreate"
                variant="contained"
                color="primary"
              >
                สร้างข้อมูลคนไข้ลำดับต่อไป
              </Button>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={Patients}
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
  
  export default PatientList;