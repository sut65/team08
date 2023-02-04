import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Dialog, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";

import { Screening_officersInterface } from "../Models/IScreening_officer";
import { GetScreening_officer } from "../Services/HttpClientService";


function Screening_officerList() {
    const [Screening_officers, setScreening_officers] = useState<Screening_officersInterface[]>([]);
    const [Screening_officerID, setScreening_officerID] = React.useState(0);  
    const [openDelete, setOpendelete] = React.useState(false); 
    const [openUpdate, setOpenupdate] = React.useState(false); 
    
    useEffect(() => {
      getScreening_officer();  
    }, []);
     
    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
          setScreening_officerID(Number(params.row.ID)); 
          localStorage.setItem("Screening_officerID", params.row.ID); 
      };
  
    const handleClose = () => {
          setOpendelete(false)
          setOpenupdate(false)
      };

    const Delete_Screening_officer = async () => {
        const apiUrl = `http://localhost:8080/Screening_officers/${Screening_officerID}`;
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
               console.log("delete ID: " + Screening_officerID)
            } else {
              console.log("NO DATA")
            }
        });
        
        handleClose();
        getScreening_officer();
    };
    
    const getScreening_officer = async () => {
        let res = await GetScreening_officer();
        if (res) {
          setScreening_officers(res);
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
    
      {field: "Prefix",headerName: "คำนำหน้า",width: 100, valueFormatter: (params) => params.value.Description,},
      {field: "Screening_officer_Name",headerName: "ชื่อ-สกุล",width: 300,},
      {field: "Gender",headerName: "เพศ",width: 100,valueFormatter: (params) => params.value.Description,},
      {field: "Blood",headerName: "กรุ๊ปเลือด",width: 100,valueFormatter: (params) => params.value.Phenotype,},
      {field: "Religion",headerName: "ศาสนา",width: 150,valueFormatter: (params) => params.value.ReligionType,},
      {field: "Birthday",headerName: "วันเดือนปีเกิด",width: 200,},
      {field: "Nationality",headerName: "เชื้อชาติ",width: 150,valueFormatter: (params) => params.value.NationalityType,},
      {field: "Phone",headerName: "เบอร์โทรศัพท์",width: 200,},
      {field: "Email",headerName: "อีเมล",width: 300,},
      {field: "ScreeningIDCard",headerName: "รหัสบัตรประชาชน",width: 250,},
      {field: "Education",headerName: "ระดับการศึกษา",width: 200,valueFormatter: (params) => params.value.Description,},
      {field: "EducationName",headerName: "ชื่อปริญญา",width: 300,},
      {field: "EducationMajor",headerName: "สาขาเอก",width: 300,},
      {field: "University",headerName: "มหาวิทยาลัย",width: 300,},
    ];
  
    return (
      <div>
        {/* ยืนยันการลบ */}
        <Dialog open={openDelete} onClose={handleClose} >
                <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={Delete_Screening_officer}
                    >
                        <div className="good-font">
                            ยืนยัน
                        </div>
                    </Button>
            </Dialog>
          
        {/* ยืนยันการแก้ไข */}
        <Dialog open={openUpdate} onClose={handleClose} >
                <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
                <Button
                        variant="contained"
                        color="primary"
                        //กด "ยืนยัน" ไปที่หน้าแก้ไข
                        component={RouterLink}
                        to="/EmployeeattemdanceINUpdate"
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
                ข้อมูลเจ้าหน้าที่ฝ่ายคัดกรอง
              </Typography>
            </Box>
            <Box>
              <Button
                component={RouterLink}
                to="/Screening_officerCreate"
                variant="contained"
                color="primary"
              >
                ข้อมูลเจ้าหน้าที่ฝ่ายคัดกรอง
              </Button>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
            <DataGrid
              rows={Screening_officers}
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
  
  export default Screening_officerList;