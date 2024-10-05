'use client';
import { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Alert, 
  AlertTitle,
  IconButton,
  Snackbar
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MailIcon from '@mui/icons-material/Mail';
import {
  AccountCircle,
  Lock,
  Person,
  Cake,
  Wc,
  Add,
  Delete
} from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/coclinic.png'; // Update the path to your logo image

const questions = [
  { key: 'username', label: 'Username', description: 'Please enter a unique username for your account.', icon: <AccountCircle color="primary" /> },
  { key: 'email', label: 'Email', description: ' Please enter a valid email address, example name@domain.com.', icon: <MailIcon style={{ color: '#8E24AD' }} /> },
  { key: 'name', label: 'Name', description: 'What is your full name?', icon: <Person style={{ color: '#FFD700' }} /> },
  { key: 'password', label: 'Password', type: 'password', description: 'Enter a strong password to secure your account.', icon: <Lock color="secondary" /> },
  { key: 'age', label: 'Age', type: 'number', description: 'How old are you?', icon: <Cake style={{ color: '#8E44AD' }} /> },
  { key: 'gender', label: 'Gender', type: 'select', options: ['male', 'female', 'other'], description: 'What is your gender?', icon: <Wc style={{ color: '#E74C3C' }} /> }
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#67B680',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h3: {
      fontWeight: 'bold',
      color: '#67B680', 
    },
    body1: {
      color: '#555',
    },
    body2: {
      color: '#777',
    }
  }
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-root': {
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#888',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const FormContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#ffffff', // Set the background color to white
  padding: '4rem',
  maxWidth: '800px',
  width: '100%',
  margin: '3rem auto',
  boxShadow: theme.shadows[3],
  borderRadius: '16px',
}));

const DescriptionBox = styled('div')(() => ({
  backgroundColor: '#b8e5e6', // Hex color codes should start with #
  padding: '1.5rem',
  marginBottom: '1.5rem',
  borderRadius: '16px',
  boxShadow: '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  flexDirection: 'column',
}));

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track registration success

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (key, index, value) => {
    const newArray = [...(formData[key] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [key]: newArray });
  };

  const handleAddField = (key) => {
    const newArray = [...(formData[key] || []), ''];
    setFormData({ ...formData, [key]: newArray });
  };
  const handleRemoveField = (key, index) => {
    const newArray = [...(formData[key] || [])];
    newArray.splice(index, 1);
    setFormData({ ...formData, [key]: newArray });
  };

  const handleSubmit = async () => {
    const emptyFields = questions.filter(q => !formData[q.key]);
    if (emptyFields.length > 0 || !formData.hobbies?.length || !formData.triggers?.length) {
      setOpenAlert(true);
    } else {
      setOpenAlert(false);
      try {
        const response = await axios.post('http://localhost:8000/auth/register', formData);
        console.log(response.data);
        setSnackbarMessage("Registration successful!");
        setSnackbarSeverity("success");
        setRegistrationSuccess(true); // Set registration success to true on successful registration
      } catch (error) {
        console.error(error);
        setSnackbarMessage("Registration failed. Please try again.");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen flex items-center justify-center bg-green-100 p-8">
        <FormContainer>
          <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="Logo" width={80} height={80} className="h-12 w-12" />
            <Typography variant="h3" className="ml-2">
              CoClinic
            </Typography>
          </div>
          <DescriptionBox>
            <Typography variant="body1">
              Embark on a transformative journey with our AI-powered personalized recovery plans and habit-building strategies. Share your details to begin crafting your unique path to wellness.
            </Typography>
          </DescriptionBox>
          {openAlert && (
            <Alert severity="warning" onClose={() => setOpenAlert(false)} className="mb-4">
              <AlertTitle>Warning</AlertTitle>
              Please fill in all the fields before submitting.
            </Alert>
          )}
          <Card className="rounded-lg bg-white mb-4">
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions.map((question) => (
                  <div key={question.key}>
                    <CardHeader avatar={<div>{question.icon}</div>} title={question.label} />
                    <Typography variant="body2" className="mb-4">{question.description}</Typography>
                    <CustomTextField
                      label={question.label}
                      variant="outlined"
                      fullWidth
                      name={question.key}
                      type={question.type || 'text'}
                      value={formData[question.key] || ''}
                      onChange={handleChange}
                      select={question.type === 'select'}
                    >
                      {question.type === 'select' && question.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Typography variant="h6">Hobbies</Typography>
                {formData.hobbies?.map((hobby, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <CustomTextField
                      label={`Hobby ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={hobby}
                      onChange={(e) => handleArrayChange('hobbies', index, e.target.value)}
                    />
                    <IconButton onClick={() => handleRemoveField('hobbies', index)}><Delete color="secondary" /></IconButton>
                  </div>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => handleAddField('hobbies')}
                  startIcon={<Add />}
                >
                  Add Hobby
                </Button>
              </div>
              <div className="mt-4">
                <Typography variant="h6">Triggers</Typography>
                {formData.triggers?.map((trigger, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <CustomTextField
                      label={`Trigger ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={trigger}
                      onChange={(e) => handleArrayChange('triggers', index, e.target.value)}
                    />
                    <IconButton onClick={() => handleRemoveField('triggers', index)}><Delete color="secondary" /></IconButton>
                  </div>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => handleAddField('triggers')}
                  startIcon={<Add />}
                >
                  Add Trigger
                </Button>
              </div>
              <div className="mt-4">
                <Typography variant="h6">Solutions Tried</Typography>
                {formData.solutions_tried?.map((solution, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <CustomTextField
                      label={`Solution ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={solution}
                      onChange={(e) => handleArrayChange('solutions_tried', index, e.target.value)}
                    />
                    <IconButton onClick={() => handleRemoveField('solutions_tried', index)}><Delete color="secondary" /></IconButton>
                  </div>
                ))}
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => handleAddField('solutions_tried')}
                  startIcon={<Add />}
                >
                  Add Solution
                </Button>
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                className="mt-4"
              >
                Signup
              </Button>
            </CardContent>
          </Card>
          {registrationSuccess && (
            <Link to="/login">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className="mt-4"
              >
                Go to Login
              </Button>
            </Link>
          )}
        </FormContainer>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Signup;