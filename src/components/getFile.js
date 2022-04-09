import React, { useState } from 'react';
import { fileLink } from '../atoms';
import { useRecoilValue } from 'recoil';
import logo from '../images/logo.png';
import GithubCorner from 'react-github-corner';


// MUI
import { Box, Button, Grid, IconButton, Link, TextField, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import axios from 'axios';

const GetFile = () => {

    const fl = useRecoilValue(fileLink)

    const [from, setFrom] = useState("")
    const [fromError, setFromError] = useState(false)

    const [to, setTo] = useState("")
    const [toError, setToError] = useState(false)

    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = e => {
        e.preventDefault();

        let submit = true;
        setFromError(false);
        setToError(false);

        if (from === "" || !re.test(from)) {
            submit = false;
            setFromError(true);
        }
        if (to === "" || !re.test(to)) {
            submit = false;
            setToError(true);
        }

        if (submit) {
            axios.post(`http://localhost:5000/api/files/send`, {
                "uuid": fl.split("/")[4],
                "emailTo": to,
                "emailFrom": from
            })
                .then((res) => {
                    alert("Email sent successfully")
                    setFrom("");
                    setTo("");
                })
                .catch(err => {
                    alert("An error occured! Please try again.")
                });
        }

    }

    return (
        <>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Box mt={6}>
                        <Link href="/">
                            <img src={logo} alt="logo" style={{ width: '220px' }} />
                        </Link>
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
                            {fl ? fl : "No link to show! Please try again"}
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
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={8} md={5} mt={3} p={2}>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        Enter details to share the file via email:
                    </Typography>
                    <Box>
                        <TextField
                            value={from}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="from"
                            label="From Email"
                            id="from"
                            error={fromError}
                            multiline
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <TextField
                            value={to}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="to"
                            label="To Email"
                            id="to"
                            error={toError}
                            multiline
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </Box>
                    <Box mt={3}>
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                            color="primary"
                            sx={{ width: '100%' }}
                        >
                            Send
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <GithubCorner href="https://github.com/VirajPatidar" target="_blank" rel="noopener noreferrer" />
        </>
    );
}

export default GetFile;