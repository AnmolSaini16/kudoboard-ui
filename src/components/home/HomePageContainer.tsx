import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const HomePageContainer: React.FC = () => {
  return (
    <Box
      height="calc(100vh - 80px)"
      maxWidth="1100px"
      margin="0 auto"
      display="flex"
      alignItems="center"
      p={2}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item container xs={12} sm={7}>
          <Grid item xs={10}>
            <Typography
              sx={{
                typography: { xs: "h5", sm: "h4" },
                fontWeight: { xl: 700, lg: 700, md: 700, sm: 700, xs: 700 },
              }}
            >
              Kudoboard is the <br /> Perfect Group Card <br /> for Special
              Occasions
            </Typography>
            <Box mt={3}>
              <Typography
                sx={{ typography: { xs: "body1", sm: "h6" } }}
                color="secondary"
              >
                Celebrate someone with an online group card filled with
                messages, GIFs, photos, & videos!
              </Typography>
            </Box>
            <Box mt={3}>
              <Link href="/boards/create">
                <Button
                  sx={{ fontSize: { xs: 14, sm: 20 } }}
                  variant="contained"
                >
                  Create a Kudoboard
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box mt={{ xs: 4, sm: 0 }}>
            <Image
              src="./kudo-home-bg.svg"
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt=""
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
