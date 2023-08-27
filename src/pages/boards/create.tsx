import { CreateBoardForm } from "@/components/board/CreateBoardForm";
import { Box, Button, Grid, Typography } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]";
import Link from "next/link";

export default function CreateBoard({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Grid container sx={{ height: "100vh" }}>
        <Box
          component={Grid}
          item
          display={{ xs: "none", sm: "block" }}
          md={6}
          xs={12}
        >
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
            {!isLoggedIn ? (
              <Box m={2}>
                <Typography variant="h6" fontWeight={700} color="secondary">
                  Please Sign in or Register a new account to create a kudoboard
                </Typography>
                <Box textAlign="center" mt={2}>
                  <Link
                    href={{
                      pathname: "/auth/login",
                      query: { redirectUrl: "/boards/create" },
                    }}
                  >
                    <Button variant="contained" color="primary">
                      Sign In
                    </Button>
                  </Link>
                </Box>
              </Box>
            ) : (
              <CreateBoardForm />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const isLoggedIn = !!session;

  return { props: { isLoggedIn } };
};
