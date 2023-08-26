import { CreateBoardForm } from "@/components/board/CreateBoardForm";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function CreateBoard() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container sx={{ height: "100vh" }}>
        <Box component={Grid} item md={6} xs={12}>
          <Box
            sx={{
              backgroundColor: "#04BFFA",
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box textAlign={"center"}>
              <Typography
                variant="h3"
                color={(theme) => theme.palette.secondary.dark}
                fontWeight={700}
              >
                Let's Get Started!
              </Typography>
              <Box mt={2}>
                <Typography
                  variant="h6"
                  color={(theme) => theme.palette.secondary.dark}
                  fontWeight={400}
                >
                  Create a Kudoboard in less than a minute.
                </Typography>
              </Box>
              <Box>
                <Image
                  src="../create-board.svg"
                  width={400}
                  height={400}
                  alt=""
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid item md={6} xs={12}>
          <Box
            width="100%"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CreateBoardForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
