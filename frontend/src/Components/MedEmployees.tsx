import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";

import { MedEmployeeInterface } from "../Models/IMedEmployee";
import { GetMedEmployees } from "../Services/HttpClientService";
import { Dialog, DialogTitle } from "@mui/material";

function MedEmployee() {
    const [MedEmployees, setMedEmployees] = useState<MedEmployeeInterface[]>([]);

    const [medemployeeID, setMedEmployeeID] = React.useState(0);

    const [openDelete, setOpendelete] = React.useState(false);
    const [openUpdate, setOpenupdate] = React.useState(false);
    const navigate = useNavigate();

    const apiUrl = "http://localhost:8080/medemployee"
  
    useEffect(() => {
        getMedEmployee();
    }, []);

    const handleRowClick: GridEventListener<"rowClick"> = (params) => {
      setMedEmployeeID(Number(params.row.ID));
      localStorage.setItem("medemployeeID", params.row.ID);
    };
  
    const handleClose = () => {
      setOpendelete(false);
      setOpenupdate(false);
    };
  
    const Delete_MedEmployees = async () => {
      const apiUrl = `http://localhost:8080/medemployees/${medemployeeID}`;
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
      getMedEmployee();
  };
   
    const getMedEmployee = async () => {
      let res = await GetMedEmployees();
      if (res) {
        setMedEmployees(res);
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
        field: "Prefix",
        headerName: "คำนำหน้า",
        width: 90,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "Name",
        headerName: "ชื่อ-สกุล",
        width: 200,
      },
      {
        field: "Age",
        headerName: "อายุ",
        width: 100,
      },
      {
        field: "Gender",
        headerName: "เพศ",
        width: 80,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "Phone",
        headerName: "เบอร์โทร",
        width: 100,
      },
      {
        field: "Education",
        headerName: "ระดับการศึกษา",
        width: 120,
        valueFormatter: (params) => params.value.Description,
      },
      {
        field: "EducationName",
        headerName: "การศึกษา",
        width: 150,
      },
      {
        field: "EducationMajor",
        headerName: "สาขา",
        width: 150,
      },
      {
        field: "University",
        headerName: "มหาวิทยาลัย",
        width: 130,
      },
      {
        field: "Email",
        headerName: "อีเมล",
        width: 200,

      },
      {
        field: "Password",
        headerName: "รหัสผ่าน",
        width: 200,
      },

    ];
  
    return (
      <div>
      {/* ยืนยันการลบ */}
          <Dialog open={openDelete} onClose={handleClose} >
              <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
              <Button
                      variant="contained"
                      color="primary"
                      onClick={Delete_MedEmployees}
                  >
                      <div className="good-font">
                          ยืนยัน
                      </div>
                  </Button>
          </Dialog>
        
      {/* ยืนยันการแก้ไข */}
      {MedEmployees.map((row) => (
          <Dialog open={openUpdate} onClose={handleClose} key={row.ID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
              <Button
                      variant="contained"
                      color="primary"
                      aria-lable="outlined button group"
                      //กด "ยืนยัน" ไปที่หน้าแก้ไข
                      onClick={() => navigate({ pathname: `/medemployeesupdate/${medemployeeID}` })} autoFocus
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
              ข้อมูลเจ้าหน้าที่เทคนิคการแพทย์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/medemployees/create"
              variant="contained"
              color="primary"
            >
              จัดการข้อมูลเจ้าหน้าที่เทคนิคการแพทย์
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={MedEmployees}
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
  
export default MedEmployee;