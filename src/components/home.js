import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from "react-material-file-upload";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import GithubCorner from 'react-github-corner';
import { fileLink } from '../atoms';
import { useSetRecoilState } from 'recoil';


//MUI
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { blueGrey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Link } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const theme = createTheme({
    palette: {
        primary: {
            main: blueGrey[100],
        },
    },
});

const Home = () => {

    const navigate = useNavigate();

    const [file, setFile] = useState([])
    const [fileError, setFileError] = useState(false)

    const [loading, setLoading] = useState(false)
    const setFileLink = useSetRecoilState(fileLink)


    const handleSubmit = e => {
        e.preventDefault();

        let submit = true;
        setFileError(false);

        if (file.length === 0) {
            submit = false;
            setFileError(true);
            alert("Please select a file!");
        }
        else if (file.length > 1) {
            submit = false;
            alert("Only one file can be shared at a time!");
            setFileError(true);
        }
        else if (file[0].size > (20 * 1000000)) {
            submit = false;
            setFileError(true);
            alert("Maximum file size is 20 mb");
        }


        if (submit) {
            let form_data = new FormData();
            if (file.length > 0) {
                form_data.append('myfile', file[0]);
            }
            setLoading(true);
            axios.post(`http://localhost:5000/api/files`, form_data)
                .then((res) => {
                    setLoading(false);
                    setFileLink(res.data.file);
                    navigate("/file-link");
                })
                .catch(err => {
                    setLoading(false);
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
                    <Box mt={6} fontSize="h6.fontSize" fontWeight={400} fontFamily="Monospace">
                        <Link href="https://github.com/VirajPatidar/easy-share-frontend" color="inherit" target="_blank" rel="noopener" underline="hover">
                            <Button
                                variant="outlined"
                                display="inline"
                                color="inherit"
                                startIcon={<GitHubIcon />}
                            >
                                Source Code
                            </Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={5} mt={4} p={2} sx={{ textAlign: "center" }}>
                    <Typography variant="h5">
                        Upload the file you want to share:
                    </Typography>
                    <Box mt={2}>
                        <ThemeProvider theme={theme}>
                            <FileUpload
                                required
                                value={file}
                                onChange={setFile}
                                buttonText="Upload a file"
                                title="Drag 'n' Drop or select a file"
                                sx={fileError ? { borderColor: "red" } : ""}
                            />
                        </ThemeProvider>
                    </Box>
                    <Box mt={3}>
                        <LoadingButton
                            loading={loading}
                            loadingIndicator="Processing..."
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit}
                            color="primary"
                            sx={{ width: '100%' }}
                        >
                            Submit
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>
            <GithubCorner href="https://github.com/VirajPatidar" target="_blank" rel="noopener noreferrer" />
        </>
    );
}

export default Home;