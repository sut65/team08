import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TreatmentsInterface } from "../Models/ITreatment";
import { GetTreatment } from "../Services/HttpClientService";

function Treatment() {
    const [treatments, setTreatments] = React.useState<TreatmentsInterface[]>([]);

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

    const columns: GridColDef[] = [
        {field: "ID", headerName: "ลำดับ", width: 50  },
        {field: "TREATMENT_ID", headerName: "เลขกำกับการรักษา", width: 100 },
        {field: "TREATMENT", headerName: "ทำการรักษา", width: 150 },
        {field: "Patient", headerName: "ผู้ป่วย", width: 150 ,valueFormatter: (params) => params.value.Name, },
        {field: "Disease", headerName: "โรค", width: 150 ,valueFormatter: (params) => params.value.Name,},
        {field: "DATE", headerName: "วันที่ เวลา", width: 100 },
        {field: "Track", headerName: "สถานะติดตามผล", width: 120 ,valueFormatter: (params) => params.value.Name,},
        {field: "APPOINTMENT", headerName: "นัดครั้งถัดไป", width: 50 },
        {field: "Status", headerName: "สถานะการรักษา", width: 120 ,valueFormatter: (params) => params.value.Name,},
        {field: "CONCLUSION", headerName: "ผลการรักษา", width: 150 },
        {field: "GUIDANCE", headerName: "คำแนะนำ", width: 150 },
        {field: "Doctor", headerName: "แพทย์", width: 100 ,valueFormatter: (params) => params.value.Name, },
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
                    />
                </div>
            </Container>
        </div>
    );
}

export default Treatment;