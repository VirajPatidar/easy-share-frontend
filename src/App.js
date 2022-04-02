import React from 'react';
import { Route, Routes } from "react-router-dom";

import NotFound from './components/notFound';
import Home from './components/home';
import GetFile from './components/getFile';

// MUI
import { blueGrey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: blueGrey[900],
        },
    },
});


function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                
                <Route path="/" element={<Home />} exact />
                <Route path="/file-link" element={<GetFile />} exact />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </ThemeProvider>
    );
}

export default App;