import { RootContainer } from "@/components/common/RootContainer";
import theme from "@/styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { CustomisedSnackbar } from "@/components/common/CustomisedSnackbar";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
  dehydratedState: DehydratedState;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomisedSnackbar>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <NextNProgress />
              <RootContainer>
                <Component {...pageProps} />
              </RootContainer>
            </Hydrate>
          </QueryClientProvider>
        </SessionProvider>
      </CustomisedSnackbar>
    </ThemeProvider>
  );
}
