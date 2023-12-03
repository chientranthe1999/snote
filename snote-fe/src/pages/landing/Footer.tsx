import { EmailRounded, FacebookRounded, Phone, Twitter } from '@mui/icons-material';
import { Box, Grid, List } from '@mui/material';
import './style.css';
const Footer = () => {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid #c9c4c4' }}>
      <Box component="div" className="tw-max-w-[1080px] tw-mx-auto tw-py-12 tw-sm:px-4">
        <Grid container spacing={2}>
          <Grid item md={3} xs={3}>
            <p className="footer-heading">About us</p>

            <p>Made with ❤ by me</p>
          </Grid>
          <Grid item md={3} xs={3}>
            <p className="footer-heading">Quick link</p>

            <div className="tw-py-2">Product</div>
            <div className="tw-py-2">Download</div>
            <div className="tw-py-2">Try now</div>
          </Grid>
          <Grid item md={3} xs={3}>
            <p className="footer-heading">Office hours</p>
            <p>Open from 8AM to 9PM</p>
          </Grid>
          <Grid item md={3} xs={3}>
            <p className="footer-heading">Contact me</p>
            <p className="mb-4">
              <Phone></Phone> <span>123123123</span>
            </p>
            <p className="tw-mb-4 tw-flex tw-items-center">
              <EmailRounded></EmailRounded> <span className="ml-1">demo@gm.co</span>
            </p>

            <div className="text-xl mb-2">
              <span>Find me on </span>
              <FacebookRounded className="social-icon"></FacebookRounded>
              <Twitter className="social-icon"></Twitter>
            </div>
            <List></List>
          </Grid>
        </Grid>
      </Box>
      <Box component="p" className="tw-py-4 tw-text-center" sx={{ background: '#f5f5f5' }}>
        © {new Date().getFullYear()} Snote Copyright
      </Box>
    </Box>
  );
};
export default Footer;
