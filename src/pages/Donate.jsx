import { Box, Typography, Button } from "@mui/material";
import React from "react";

const Donate = () => {
  return (
    <Box>
      <Typography variant="h4" color="primary" mb={3}>
        Support Our Cause
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        Copy below link for donation through PayPal
      </Typography>

      <Typography variant="paragraph" component="p" fontSize="1.2rem" mb={3}>
        https://www.paypal.com/donate/?hosted_button_id=5AFEFHRYLY558
      </Typography>

      <Typography variant="h6" color="textSecondary" mt={3} mb={2}>
        Financial Details
      </Typography>

      <Button variant="contained" color="primary" fullWidth>
        Account Name : Murphy charitable foundation Uganda
      </Button>

      <Button variant="contained" color="primary" fullWidth>
        Account Number: 01113657970966
      </Button>

      <Button variant="contained" color="primary" fullWidth>
        Bank Name: Dfcu Bank Uganda
      </Button>

      <Button variant="contained" color="primary" fullWidth>
        4.Swift code: DFCUUGKA.
      </Button>
    </Box>
  );
};

export default Donate;

