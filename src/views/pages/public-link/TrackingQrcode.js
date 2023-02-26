import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate, useLocation } from 'react-router-dom';

const TrackingQrcode = () => {
    const [url, setUrl] = useState(null);
    const [id, setId] = useState();
    const { state } = useLocation();
    const { params } = state;
    return (
        <div>
            <Grid sx={{ textAlign: 'center' }}>
                <Typography variant="h1" sx={{ marginBottom: '20px' }}>
                    TRACK ID:{params}
                </Typography>
                <QRCodeSVG
                    value={'https://picturesofpeoplescanningqrcodes.tumblr.com/'}
                    size={400}
                    bgColor={'#ffffff'}
                    fgColor={'#000000'}
                    level={'L'}
                    includeMargin={false}
                />
            </Grid>
        </div>
    );
};

export default TrackingQrcode;
