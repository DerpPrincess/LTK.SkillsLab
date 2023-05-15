import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountMenu from "../components/AccountMenu";

export const Home = () => {
  const handleOnClick = (e) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <AccountMenu onClick={handleOnClick} />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React Skills Test
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
