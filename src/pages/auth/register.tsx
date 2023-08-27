import { registerUser } from "@/api/authApi";
import { RegisterInterface } from "@/interfaces/AuthInterface";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const Register = () => {
  const router = useRouter();
  const { redirectUrl } = router.query;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const registerUserMutate = useMutation(registerUser);
  const [formValues, setFormValues] = useState<RegisterInterface>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const payload = { ...formValues };
      const response = await registerUserMutate.mutateAsync({ payload });
      console.log(response);
      if (response?.status === 200) {
        const msg = response.data.status;
        enqueueSnackbar(msg, { variant: "success" });
        router.push({
          pathname: "/auth/login",
          query: { redirectUrl: redirectUrl },
        });
      }
    } catch (err: any) {
      console.error(err);
      if (err?.response?.data?.error?.keyPattern?.email) {
        enqueueSnackbar("Email already exists. Try Signing in", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const disableButton =
    !formValues.email || !formValues.password || !formValues.name || loading;
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
      <Box
        sx={{ backgroundColor: "#fff", maxWidth: 400, height: 500 }}
        boxShadow={4}
        borderRadius={4}
        p={2}
        m={2}
      >
        <Box sx={{ position: "absolute", top: 16, left: 16 }}>
          {" "}
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
        <Box mt={1} mb={1} textAlign="center">
          <Typography variant="h5" fontWeight={700} color="secondary">
            Kudoboard Registration
          </Typography>
        </Box>
        <Box mt={4}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Name"
                required
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
                value={formValues.email}
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
                {loading ? <CircularProgress size={16} /> : "Register"}
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography color="secondary">
                  Already have an account?
                </Typography>
                <Link
                  href={{
                    pathname: "/auth/login",
                    query: { redirectUrl: redirectUrl },
                  }}
                >
                  <Button variant="text" sx={{ fontSize: 14 }}>
                    Sign in
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

export default Register;

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
