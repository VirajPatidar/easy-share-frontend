import React, { useState } from 'react';
import { fileLink } from '../atoms';
import { useRecoilValue } from 'recoil';
import logo from '../images/logo.png';
import GithubCorner from 'react-github-corner';


// MUI
import { Box, Grid, IconButton, Link, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const GetFile = () => {

    const fl = useRecoilValue(fileLink)
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Box mt={6}>
                        <img src={logo} alt="logo" style={{ width: '220px' }} />
                    </Box>
                    <Box mt={6} px={2}>
                        <Typography variant='h6' gutterBottom>
                            Share the file using email or the following link:
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={5} p={2} sx={{ textAlign: "center" }}>
                    <Box p={3} sx={{ maxWidth: "800px", backgroundColor: "#e0f7fa", border: "1px solid", borderColor: "#006064", borderLeftWidth: "8px", borderLeftStyle: "solid" }}>
                        <Link href={fl} target="_blank" rel="noopener noreferrer" underline="hover">
                            {fl}
                        </Link>
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true,
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="Link Copied ✔"
                                arrow
                                placement='top'
                            >
                                <IconButton aria-label="copy" onClick={() => { navigator.clipboard.writeText(fl); handleTooltipOpen(); }}>
                                    <ContentCopyIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </ClickAwayListener>
                    </Box>
                </Grid>
            </Grid>
            <GithubCorner href="https://github.com/VirajPatidar" target="_blank" rel="noopener noreferrer" />
        </>
    );
}

export default GetFile;