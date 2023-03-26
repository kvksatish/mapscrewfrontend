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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PasswordValidation(password) {
  const errors = [];
  if (!password) {
    errors.push("Password is required");
  }
  if (password && password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  return errors;
}

function EmailValidation(email) {
  const errors = [];
  if (!email) {
    errors.push("Email is required");
  }
  if (email && !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Email is invalid");
  }
  return errors;
}
function nameValidation(email) {
  const errors = [];
  if (!email) {
    errors.push("Name is required");
  }
  
  return errors;
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignupPage() {
  const [passwordErrors, setPasswordErrors] = React.useState([]);
  const [emailErrors, setEmailErrors] = React.useState([]);
  const [nameErrors, setnameErrors] = React.useState([]);

  const navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const passwordValidationErrors = PasswordValidation(password);
    const emailValidationErrors = EmailValidation(email);
    const nameValidationErrors = nameValidation(firstName);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
    } else {
      setPasswordErrors([]);
    }
    if (emailValidationErrors.length > 0) {
      setEmailErrors(emailValidationErrors);
    } else {
      setEmailErrors([]);
    }
    if (nameValidationErrors.length > 0) {
      setnameErrors(nameValidationErrors);
    } else {
      setnameErrors([]);
    }
    if (passwordValidationErrors.length === 0 && emailValidationErrors.length === 0&&nameValidationErrors.length===0) {

      axios.post('https://mapscrew.vercel.app/signup', {
        email,
        password,
        username:firstName+" "+lastName
      }).then((res) => {
        alert(res.data)
        navigate("/")
        console.log({
          email,
          password,
          firstName,
          lastName,
          res
        });
      }).catch((res) => {
        alert(res.response.data)
        console.log({
          res,
          email,
          password,
          firstName,
          lastName,
        });
      })
    
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={nameErrors.length > 0} // Check if length of errors array is greater than 0
                  helperText={nameErrors.length > 0 && nameErrors[0]} // 
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailErrors.length > 0} // Check if length of errors array is greater than 0
                  helperText={emailErrors.length > 0 && emailErrors[0]} // Display the first error message if there are errors
                />


              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passwordErrors.length > 0} // Check if length of errors array is greater than 0
                  helperText={passwordErrors.length > 0 && passwordErrors[0]} // Display the first error message if there are errors
                />
              </Grid>
              <Grid item xs={12}>

              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}