import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Custom404() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box mt={20} textAlign="center">
        <Typography variant="h4" color="secondary">
          Oops! We couldn't find what you are looking for
        </Typography>
        <Box mt={2}>
          <Link href="/">
            <Button variant="contained">Go to Homepage</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
