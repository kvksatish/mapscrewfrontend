import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PlusOne } from '@mui/icons-material';
import axios from 'axios';

const theme = createTheme();

export default function AddCourse({getdata}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const course = data.get('course');
        const duration = data.get('duration');
        const fee = data.get('fee');
        const mode = data.get('mode');
        const teacher = data.get('teacher');
        
        if (course && duration && fee && mode && teacher) {
          let token = sessionStorage.getItem('token');
          
          axios
            .post('https://mapscrew.vercel.app/addcourse', {
              course,
              duration,
              fee,
              mode,
              teacher
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((res) => {
                alert("successfully added course")
                  console.log(res);
                  
                getdata()
            })
            .catch((error) => {
              console.log(error);
            });
            
          console.log(course, duration, fee, mode, teacher);
        } else {
          alert('Invalid Values');
        }
      };
      

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Add Course
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0.5 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="course"
              label="Course Name"
              name="course"
              autoComplete="course"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="duration"
              label="duration"
              type="number"
              id="duration"
              autoComplete="duration"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="teacher"
              label="teacher"
              type="text"
              id="teacher"
              autoComplete="teacher"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="mode"
              label="mode"
              type="text"
              id="mode"
              autoComplete="mode"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="fee"
              label="fee"
              type="number"
              id="fee"
              autoComplete="fee"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             add Course
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}