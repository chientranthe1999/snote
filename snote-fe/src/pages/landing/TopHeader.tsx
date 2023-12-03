import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import {styled} from "@mui/system";

const TopHeader = () => {
  const nav = useNavigate();

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
        position: 'fixed',
        backgroundColor: 'white',
        zIndex: 1,
        height: '60px',
        width: '100vw',
        padding: '0 36px'
      }}
    >
      <Typography
        className="font-bold cursor-pointer"
        color="primary"
        onClick={() => nav('/landing')}
      >
        SNote
      </Typography>

      <Box component="div">
        <Button
          variant="outlined"
          sx={{ marginRight: '10px' }}
          onClick={() => nav('/login')}
        >
          Login
        </Button>
        <Button variant="contained" sx={{ color: 'white' }} onClick={() => nav('/register')}>
          Get start free
        </Button>
      </Box>
    </Box>
  );
};

export default TopHeader;
