import { Box, Typography, Button, Grid } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const NavHeader = ({
  isLoggedIn,
  homePage,
  redirectUrl,
}: {
  isLoggedIn: boolean;
  homePage?: boolean;
  redirectUrl?: string;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    localStorage.clear();
    router.push({
      pathname: "/auth/login",
      query: { redirectUrl: redirectUrl ?? "/" },
    });
  };

  return (
    <Box height="70px" width="100%">
      <Box maxWidth={homePage ? "1100px" : "1300px"} margin="0 auto" p={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={4}>
            <Typography
              variant="h5"
              component="a"
              fontWeight={800}
              color="primary"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => router.push("/")}
            >
              KudoBoard
            </Typography>
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            <Box display="flex" width="100%" justifyContent="flex-end">
              {!isLoggedIn ? (
                <Box mr={1}>
                  <Link
                    href={{
                      pathname: "/auth/login",
                      query: { redirectUrl: redirectUrl ?? "/" },
                    }}
                  >
                    <Button variant="text" color="secondary">
                      Sign In
                    </Button>
                  </Link>
                </Box>
              ) : (
                <>
                  <Box mr={1}>
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Box>
                  <Box mr={1}>
                    <Link href="/dashboard">
                      <Button
                        variant="text"
                        color={
                          router.asPath === "/dashboard"
                            ? "primary"
                            : "secondary"
                        }
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </Box>
                </>
              )}

              <Box sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
                <Link href="/boards/create">
                  <Button variant="contained" sx={{ width: 180 }}>
                    Create a Kudoboard
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
