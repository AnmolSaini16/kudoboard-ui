import { SingInInterface } from "@/interfaces/AuthInterface";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { redirectUrl } = router.query;
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SingInInterface>({
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        ...formValues,
        redirect: false,
      });
      if (response && !response.error) {
        enqueueSnackbar("Logged in", { variant: "success" });
        queryClient.invalidateQueries(["GetAllBoards"]);
        router.push(redirectUrl as string);
      } else {
        enqueueSnackbar(response?.error, { variant: "error" });
      }
    } catch (err: any) {
      enqueueSnackbar(err, { variant: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const disableButton = !formValues.email || !formValues.password || loading;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#04A5FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "absolute", top: 16, left: 16 }}>
        <Typography
          variant="h5"
          component="a"
          fontWeight={700}
          color="#fff"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          KudoBoard
        </Typography>
      </Box>
      <Box
        sx={{ backgroundColor: "#fff", maxWidth: 400, height: 500 }}
        boxShadow={4}
        borderRadius={4}
        p={2}
        m={2}
      >
        <Box mt={1} mb={1} textAlign="center">
          <Typography variant="h5" fontWeight={700} color="secondary">
            Sign in to Kudoboard
          </Typography>
        </Box>
        <Box mt={4}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formValues.email}
                required
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                required
                value={formValues.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </Grid>
            <Grid item xs={10}>
              <Button
                fullWidth
                variant="contained"
                disabled={disableButton}
                onClick={handleSignIn}
                sx={{ height: 40 }}
              >
                {loading ? <CircularProgress size={16} /> : "Sign in"}
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography color="secondary">No Account?</Typography>
                <Link
                  href={{
                    pathname: "/auth/register",
                    query: { redirectUrl: redirectUrl },
                  }}
                >
                  <Button variant="text" sx={{ fontSize: 14 }}>
                    Create one
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const isLoggedIn = !!session;

  if (isLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { isLoggedIn } };
};
