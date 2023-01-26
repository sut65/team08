import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RequestInterface } from "../Models/IRequest";
import { GetRequest } from "../Services/HttpClientService";

function Request() {
    const [treatments, setRequests] = React.useState<RequestInterface[]>([]);

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

    const columns: GridColDef[] = [
        {field: "ID", headerName: "ลำดับ", width: 50  },
        {field: "R_ID", headerName: "เลขกำกับการเบิก", width: 150 },
        {field: "R_NAME", headerName: "เคส", width: 150 },
        {field: "QUANTITY", headerName: "จำนวน", width: 120 },
        {field: "Med_Equipment", headerName: "อุปกรณ์", width: 150 ,valueFormatter: (params) => params.value.ID,},
        {field: "TIME", headerName: "วันที่ เวลา", width: 100 },
        {field: "Location", headerName: "สถานที่", width: 120 ,valueFormatter: (params) => params.value.Name,},
        
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

export default Request;