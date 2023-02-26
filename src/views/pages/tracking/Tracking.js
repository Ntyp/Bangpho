import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    Typography,
    Button,
    Modal,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ErrorIcon from '@mui/icons-material/Error';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const Tracking = () => {
    const [open, setOpen] = useState(false);
    const [openCheck, setOpenCheck] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [page, setPage] = useState(0);
    const [equipment, setEquipment] = useState([]);
    const [track, setTrack] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [history, setHistory] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    // Define steps for the stepper
    const steps = ['ขั้นตอนที่ 1', 'ขั้นตอนที่ 2'];

    const handleCheck = (row) => {
        setHistory(row);
        console.log('row =>', row);
        setOpenCheck(true);
    };

    const handleQrcode = (row) => {
        console.log('row =>', row);
        navigate('/tracking-qrcode', { state: { params: row.track } });
    };

    const columns = [
        { id: 'order', label: 'ลำดับที่', minWidth: 100 },
        { id: 'date', label: 'วันที่ส่ง', minWidth: 100 },
        { id: 'track', label: 'รหัสชุด', minWidth: 100 },
        { id: 'status', label: 'สถานะ', minWidth: 100 },
        {
            id: 'check',
            label: 'ตรวจสอบ',
            minWidth: 50,
            render: (row) => (
                <>
                    <IconButton aria-label="check" onClick={() => handleCheck(row)}>
                        <VisibilityRoundedIcon />
                    </IconButton>
                    <IconButton aria-label="check" onClick={() => handleQrcode(row)}>
                        <QrCode2Icon />
                    </IconButton>
                </>
            )
        }
    ];

    function createData(order, date, track, status) {
        return { order, date, track, status };
    }

    const rows = [
        createData('1', '2023-08-13', 'BPTH40674', 'รอตรวจสอบ'),
        createData('2', '2023-08-13', 'BPTH84625', 'รอตรวจสอบ'),
        createData('3', '2023-08-13', 'BPTH40674', 'รอตรวจสอบ'),
        createData('4', '2023-08-13', 'BPTH40674', 'รอตรวจสอบ'),
        createData('5', '2023-08-13', 'BPTH84625', 'รอตรวจสอบ'),
        createData('6', '2023-08-13', 'BPTH40674', 'รอตรวจสอบ'),
        createData('7', '2023-08-13', 'BPTH84625', 'รอตรวจสอบ'),
        createData('8', '2023-08-13', 'BPTH40674', 'รอตรวจสอบ'),
        createData('9', '2023-08-13', 'BPTH84625', 'รอตรวจสอบ'),
        createData('10', '2023-08-13', 'BPTH40674', 'รอตรวจสอบ'),
        createData('11', '2023-08-13', 'BPTH84625', 'รอตรวจสอบ'),
        createData('12', '2023-08-13', 'BPTH40674', 'รอตรวจสอบ'),
        createData('13', '2023-08-13', 'BPTH84625', 'รอตรวจสอบ'),
        createData('14', '2023-08-13', 'BPTH40674', 'รอตรวจสอบ'),
        createData('15', '2023-08-13', 'BPTH84625', 'รอตรวจสอบ')
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
        randomTrack();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (row) => {
        // Implement the edit logic
    };

    const handleDelete = (row) => {
        // Implement the delete logic
    };

    const handleNextPage = () => {
        // Next Page
    };

    const handleSaveForm = () => {
        console.log('save');
        setOpen(false);
        setActiveStep(0);
        setEquipment([]);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent form submission
        const name = event.target.elements.name.value;
        const quantity = event.target.elements.quantity.value;
        const note = event.target.elements.note.value;

        // ถ้ามีชื่ออุปกรณ์และจำนวนส่งมา
        if (name && quantity) {
            const newEquipment = { name, quantity, note };
            setEquipment([...equipment, newEquipment]);

            // reset the form fields
            event.target.elements.name.value = '';
            event.target.elements.quantity.value = '';
            event.target.elements.note.value = '';
        } else {
            // ไม่ทำอะไร
        }
    };

    const handleDeleteEquipment = (key) => {
        // Remove the item from the equipment array using its key value as the index
        setEquipment((prevEquipment) => prevEquipment.filter((item, index) => index !== key));
    };

    const randomTrack = () => {
        var track = `BPTH` + Math.floor(Math.random() * 90000);
        setTrack(track);
    };

    const handleClickOpenCheck = () => {
        setOpenCheck(true);
    };

    const handleCloseCheck = () => {
        setOpenCheck(false);
    };

    const handleNext = () => {
        if (equipment.length > 0) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    return (
        <div>
            <Card sx={{ minWidth: 275, minHeight: 650 }}>
                <Typography variant="h3" sx={{ fontWeight: 500, textAlign: 'center', marginTop: '20px' }}>
                    การนำส่งอุปกรณ์
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ float: 'right', marginRight: '20px', marginTop: '20px', marginBottom: '20px' }}
                >
                    นำส่งอุปกรณ์
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
                    <TableContainer>
                        <Table>
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
                                    label="ชื่ออุปกรณ์"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    margin="dense"
                                    id="quantity"
                                    name="quantity"
                                    label="จำนวน"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    margin="dense"
                                    id="note"
                                    name="note"
                                    label="หมายเหตุ"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box textAlign="center" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                    <Button type="submit">เพิ่มรายการ</Button>
                                </Box>
                                {equipment.length > 0 ? (
                                    <>
                                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                                            รายการทั้งหมด
                                        </Typography>
                                        <ol>
                                            {equipment.map((item, key) => (
                                                <li key={key}>
                                                    {item.name} จำนวน: {item.quantity}
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
                                    <Button type="submit" onClick={handleNext}>
                                        ต่อไป
                                    </Button>
                                </Box>
                            </form>
                        )}
                        {activeStep === 1 && (
                            <>
                                <Typography variant="h3" sx={{ fontWeight: 500, textAlign: 'center', marginTop: '20px' }}>
                                    รายการทั้งหมด
                                </Typography>
                                <ol>
                                    {equipment.map((item, key) => (
                                        <li key={key}>
                                            {item.name} จำนวน: {item.quantity}
                                        </li>
                                    ))}
                                </ol>
                                <DialogActions>
                                    <Button onClick={handleBack}>ย้อนกลับ</Button>
                                    <Button onClick={handleSaveForm}>ยืนยัน</Button>
                                </DialogActions>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Dialog Check */}
                <Dialog
                    open={openCheck}
                    fullWidth={true}
                    maxWidth={'sm'}
                    onClose={handleCloseCheck}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <h3>ประวัติการส่งอุปกรณ์การแพทย์</h3>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <p>ชื่อผู้ส่ง: </p>
                            <p>หมายเลข: {history.track}</p>
                            <p>วันที่ส่ง: {history.date}</p>
                            <p>หมายเหตุ: </p>
                            <p>อุปกรณ์ที่ส่ง: </p>
                            <p>สถานะ: {history.status}</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCheck}>ปิด</Button>
                    </DialogActions>
                </Dialog>

                {/* Dialog Save */}
                {/* <Dialog open={openConfirm} onClose={handleClickCloseConfirm}>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ErrorIcon sx={{ fontSize: '100px', marginTop: '20px' }} color="error" />
                        <h3>ฆ่าเชื้ออุปกรณ์เสร็จสิ้น</h3>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={handleClickCloseConfirm}>ตกลง</Button>
                    </DialogActions>
                </Dialog> */}
            </Card>
        </div>
    );
};

export default Tracking;
