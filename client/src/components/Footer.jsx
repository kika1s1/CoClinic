import { Container, Typography, Box, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box className="bg-green-400 py-4 mt-16">
      <Container maxWidth="lg" className="flex justify-between items-center text-white">
        <Typography variant="body2" component="p">
          © 2024 CoClinic
        </Typography>
        <Box className="flex space-x-4">
          <Link href="#" color="inherit" underline="none">
            Privacy
          </Link>
          <Link href="#" color="inherit" underline="none">
            Terms
          </Link>
          <Link href="#" color="inherit" underline="none">
            Contact
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
