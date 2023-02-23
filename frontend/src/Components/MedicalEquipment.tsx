import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { MedicalEquimentInterface } from "../Models/IMedEquipment";
import { GetMedicalEquipments } from "../Services/HttpClientService";
import { Dialog, DialogTitle } from "@mui/material";

function MedicalEquipmentsList() {
  const [medicalequipments, SetMedicalEquipments] = useState<MedicalEquimentInterface[]>([]);
  const [medicalequipmentID, setMedicalequipmentID] = React.useState(0);

  const [openDelete, setOpendelete] = React.useState(false);
  const [openUpdate, setOpenupdate] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getMedicalequipments();
  }, []);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setMedicalequipmentID(Number(params.row.ID));
    localStorage.setItem("medicalequipmentID", params.row.ID);
  };

  const handleClose = () => {
    setOpendelete(false);
    setOpenupdate(false);
  };

  const Delete_Medicalequipments = async () => {
    const apiUrl = `http://localhost:8080/medicalequipments/${medicalequipmentID}`;
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
    getMedicalequipments();
};

  const getMedicalequipments = async () => {
    let res = await GetMedicalEquipments();
    if (res) {
      SetMedicalEquipments(res);
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
      field: "Equipment",
      headerName: "อุปกรณ์",
      width: 150,
      valueFormatter: (params) => params.value.Equipment,
    },
    {
      field: "Brand",
      headerName: "ยี่ห้อ",
      width: 150,
      valueFormatter: (params) => params.value.Brand_name,
    },
    {
      field: "Med_Status",
      headerName: "สถานะ",
      width: 150,
      valueFormatter: (params) => params.value.Status_name,
    },
    {
      field: "Quantity",
      headerName: "จำนวน",
      width: 150,
      valueFormatter: (params) => params.value.Quantity ,
    },
    {
      field: "Shop",
      headerName: "ร้านค้า",
      width: 150,
      valueFormatter: (params) => params.value.Shop ,
    },
    // {
    //   field: "Med_Employee",
    //   headerName: "Med_Employee",
    //   width: 150,
    //   valueFormatter: (params) => params.value.Name ,
    // },
  ];

  return (
    <div>
    {/* ยืนยันการลบ */}
  <Dialog open={openDelete} onClose={handleClose} >
            <DialogTitle><div className="good-font">ยืนยันการลบรายการ</div></DialogTitle>
            <Button
                    variant="contained"
                    color="primary"
                    onClick={Delete_Medicalequipments}
                >
                    <div className="good-font">
                        ยืนยัน
                    </div>
                </Button>
        </Dialog>
      
    {/* ยืนยันการแก้ไข */}
    {medicalequipments.map((row) => (
        <Dialog open={openUpdate} onClose={handleClose} key={row.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <DialogTitle><div className="good-font">ยืนยันการแก้ไขรายการ</div></DialogTitle>
            <Button
                    variant="contained"
                    color="primary"
                    aria-lable="outlined button group"
                    //กด "ยืนยัน" ไปที่หน้าแก้ไข
                    onClick={() => navigate({ pathname: `/medicalequipmentsupdate/${medicalequipmentID}` })} autoFocus
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
            ข้อมูลเครื่องมือแพทย์
          </Typography>
        </Box>
        <Box>
          <Button
            component={RouterLink}
            to="/medicalequipment/create"
            variant="contained"
            color="primary"
          >
            จัดการข้อมูลข้อมูลเครื่องมือแพทย์
          </Button>
        </Box>
      </Box>
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={medicalequipments}
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

export default MedicalEquipmentsList;