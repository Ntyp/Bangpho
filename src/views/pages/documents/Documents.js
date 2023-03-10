import React, { useState, useEffect } from 'react';
import {
    TextField,
    Card,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    IconButton,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const Documents = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [value, setValue] = useState([]);
    const [equipment, setEquipment] = useState([]);

    // Define steps for the stepper
    const steps = ['ขั้นตอนที่ 1', 'ขั้นตอนที่ 2'];
    const handleCheck = (row) => {
        setHistory(row);
        console.log('row =>', row);
        setOpenCheck(true);
    };

    const handleDeleteEquipment = (row) => {
        // setHistory(row);
        console.log('row =>', row);
        // setOpenCheck(true);
    };

    const columns = [
        { id: 'order', label: 'ลำดับที่', minWidth: 100 },
        { id: 'date', label: 'วันที่ส่ง', minWidth: 100 },
        { id: 'topic', label: 'หัวข้อ', minWidth: 100 },
        { id: 'documents', label: 'เอกสาร', minWidth: 100 },
        { id: 'reporter', label: 'ผู้รายงาน', minWidth: 100 },
        { id: 'detail', label: 'รายละเอียด', minWidth: 100 },
        { id: 'status', label: 'สถานะ', minWidth: 100 },
        {
            id: 'mange',
            label: 'การจัดการ',
            minWidth: 50,
            render: (row) => (
                <>
                    <IconButton aria-label="check" onClick={() => handleCheck(row)}>
                        <VisibilityRoundedIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" size="small" onClick={() => handleDeleteEquipment(row)}>
                        <DeleteIcon />
                    </IconButton>
                    {/* <IconButton onClick={() => handleDeleteEquipment(key)} color="error" size="small">
                        <DeleteIcon />
                    </IconButton> */}
                </>
            )
        }
    ];

    function createData(order, date, topic, documents, reporter, detail, status) {
        return { order, date, topic, documents, reporter, detail, status };
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form submission
        const name = event.target.elements.name.value;
        const detail = event.target.elements.detail.value;
        const file = selectedFile.name;
        // ถ้ามีชื่ออุปกรณ์และจำนวนส่งมา
        if (name && file) {
            const newValue = { name, detail, file };
            setValue([...value, newValue]);
            event.target.elements.name.value = '';
            event.target.elements.detail.value = '';
            setSelectedFile(null);
            console.log('value', value);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            // ไม่ทำอะไร
        }
    };

    const rows = [
        createData(
            '1',
            '2023-08-13',
            'การเบิกเงิน',
            'เอกสารเบิกเงิน.pdf',
            'โชคดี มีชัย เจ้าหน้าที่รพ.สต',
            'เบิกเงินซื้อพัดลม',
            'รอตรวจสอบ'
        ),
        createData(
            '2',
            '2023-08-13',
            'การเบิกเงิน',
            'เอกสารเบิกเงิน.pdf',
            'โชคดี มีชัย เจ้าหน้าที่รพ.สต',
            'เบิกเงินซื้อพัดลม',
            'รอตรวจสอบ'
        ),
        createData(
            '3',
            '2023-08-13',
            'การเบิกเงิน',
            'เอกสารเบิกเงิน.pdf',
            'โชคดี มีชัย เจ้าหน้าที่รพ.สต',
            'เบิกเงินซื้อพัดลม',
            'รอตรวจสอบ'
        ),
        createData(
            '4',
            '2023-08-13',
            'การเบิกเงิน',
            'เอกสารเบิกเงิน.pdf',
            'โชคดี มีชัย เจ้าหน้าที่รพ.สต',
            'เบิกเงินซื้อพัดลม',
            'รอตรวจสอบ'
        ),
        createData(
            '5',
            '2023-08-13',
            'การเบิกเงิน',
            'เอกสารเบิกเงิน.pdf',
            'โชคดี มีชัย เจ้าหน้าที่รพ.สต',
            'เบิกเงินซื้อพัดลม',
            'รอตรวจสอบ'
        ),
        createData('6', '2023-08-13', 'การเบิกเงิน', 'เอกสารเบิกเงิน.pdf', 'โชคดี มีชัย เจ้าหน้าที่รพ.สต', 'เบิกเงินซื้อพัดลม', 'รอตรวจสอบ')
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleEdit = (row) => {
        // Implement the edit logic
    };

    const handleDelete = (row) => {
        // Implement the delete logic
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedFile(null);
        setValue([]);
        setOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleNext = (event) => {
        // event.preventDefault(); // prevent form submission
        // const name = event.target.elements.name.value;
        // const detail = event.target.elements.detail.value;
        // const file = selectedFile.name;
        // // ถ้ามีชื่ออุปกรณ์และจำนวนส่งมา
        // if (name && file) {
        //     const newValue = { name, detail, file };
        //     setValue([...value, newValue]);
        //     event.target.elements.name.value = '';
        //     event.target.elements.detail.value = '';
        //     setSelectedFile(null);
        //     console.log('value', value);

        // } else {
        //     // ไม่ทำอะไร
        // }
        // // setForm
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSaveForm = () => {
        console.log('save');
        setOpen(false);
        setActiveStep(0);
        setValue([]);
        // setEquipment([]);
    };
    return (
        <div>
            <Card sx={{ minWidth: 275, minHeight: 625 }}>
                <Typography variant="h3" sx={{ fontWeight: 500, textAlign: 'center', marginTop: '20px' }}>
                    การนำส่งเอกสาร
                </Typography>
                <Button
                    variant="contained"
                    sx={{ float: 'right', marginRight: '20px', marginTop: '20px', marginBottom: '20px' }}
                    onClick={handleClickOpen}
                >
                    เพิ่มรายงาน
                </Button>
                <Paper
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '30px'
                    }}
                >
                    <Button variant="contained" sx={{ float: 'left', marginBottom: '20px' }}>
                        Export
                    </Button>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.order}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align="center">
                                                {column.render ? column.render(row) : row[column.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                            แบบฟอร์มอุปกรณ์การแพทย์
                        </Typography>
                    </DialogTitle>
                    {/* <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <TextField margin="dense" id="name" name="name" label="ชื่อหัวข้อ" type="text" fullWidth variant="outlined" />
                            <TextField
                                margin="dense"
                                id="detail"
                                name="detail"
                                label="รายละเอียด"
                                multiline
                                rows={4}
                                type="text"
                                fullWidth
                                variant="outlined"
                            />
                            <p>
                                อัพโหลดไฟล์:
                                {selectedFile ? <span> {selectedFile.name}</span> : <span>No file selected</span>}
                                {selectedFile ? (
                                    ''
                                ) : (
                                    <Button variant="contained" component="label" sx={{ marginLeft: '20px' }}>
                                        แนบไฟล์
                                        <input type="file" hidden onChange={handleFileChange} />
                                    </Button>
                                )}
                            </p>
                        </form>
                    </DialogContent> */}
                    {/* <DialogContent>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === 0 && (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="ชื่อหัวข้อ"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    margin="dense"
                                    id="detail"
                                    name="detail"
                                    label="รายละเอียด"
                                    multiline
                                    rows={4}
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                                <p>
                                    อัพโหลดไฟล์:
                                    {selectedFile ? <span> {selectedFile.name}</span> : <span>No file selected</span>}
                                    {selectedFile ? (
                                        ''
                                    ) : (
                                        <Button variant="contained" component="label" sx={{ marginLeft: '20px' }}>
                                            แนบไฟล์
                                            <input type="file" id="file" name="file" hidden onChange={handleFileChange} />
                                        </Button>
                                    )}
                                </p>
                                <Box textAlign="right" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <Button onClick={handleClose}>ย้อนกลับ</Button>
                                    <Button type="submit" onClick={handleNext}>
                                        ตกลง
                                    </Button>
                                </Box>
                            </form>
                        )}
                        {activeStep === 1 && (
                            <>
                                <Typography variant="h3" sx={{ fontWeight: 500, textAlign: 'center', marginTop: '20px' }}>
                                    รายการทั้งหมด
                                </Typography>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <p>ชื่อหัวข้อ:{form.name} </p>
                                        <p>รายละเอียด:{form.detail} </p>
                                        <p>อัพโหลดไฟล์:{form.file} </p>
                                        <p>วันที่: </p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleBack}>ย้อนกลับ</Button>
                                    <Button onClick={handleSaveForm}>ต่อไป</Button>
                                </DialogActions>
                            </>
                        )}
                    </DialogContent> */}

                    <DialogContent>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === 0 && (
                            <form onSubmit={handleSubmit}>
                                {/* <Typography variant="h5" sx={{ fontWeight: 500, marginBottom: '20px' }}>
                                    TRACK:{track}
                                </Typography> */}
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="ชื่อหัวข้อ"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    margin="dense"
                                    id="detail"
                                    name="detail"
                                    label="รายละเอียด"
                                    multiline
                                    rows={4}
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                                <p>
                                    อัพโหลดไฟล์:
                                    {selectedFile ? <span> {selectedFile.name}</span> : <span>No file selected</span>}
                                    {selectedFile ? (
                                        ''
                                    ) : (
                                        <Button variant="contained" component="label" sx={{ marginLeft: '20px' }}>
                                            แนบไฟล์
                                            <input type="file" id="file" name="file" hidden onChange={handleFileChange} />
                                        </Button>
                                    )}
                                </p>
                                {/* <Box textAlign="center" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <Button type="submit">เพิ่มรายการ</Button>
                                </Box> */}
                                {equipment.length > 0 ? (
                                    <>
                                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                                            รายการทั้งหมด
                                        </Typography>
                                        <ol>
                                            {equipment.map((item, key) => (
                                                <li key={key}>
                                                    {item.name} จำนวน: {item.detail} file: {item.file}
                                                    {/* <button onClick={() => handleDeleteEquipment(key)}>ลบ</button> */}
                                                    <IconButton onClick={() => handleDeleteEquipment(key)} color="error" size="small">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </li>
                                            ))}
                                        </ol>
                                    </>
                                ) : (
                                    ''
                                )}
                                <Box textAlign="center" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <Button onClick={handleClose}>ย้อนกลับ</Button>
                                    <Button type="submit">ต่อไป</Button>
                                </Box>
                            </form>
                        )}
                        {activeStep === 1 && (
                            <>
                                <Typography variant="h3" sx={{ fontWeight: 500, textAlign: 'center', marginTop: '20px' }}>
                                    รายการทั้งหมด
                                </Typography>
                                <ul>
                                    {value.map((item, key) => (
                                        <li key={key}>
                                            {/* {item.name} จำนวน: {item.detail} */}
                                            <p>ชื่อหัวข้อ:{item.name} </p>
                                            <p>รายละเอียด:{item.detail} </p>
                                            <p>อัพโหลดไฟล์:{item.file} </p>
                                            <p>วันที่: </p>
                                        </li>
                                    ))}
                                </ul>
                                <DialogActions>
                                    <Button onClick={handleBack}>ย้อนกลับ</Button>
                                    <Button onClick={handleSaveForm}>ยืนยัน</Button>
                                </DialogActions>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </Card>
        </div>
    );
};

export default Documents;
