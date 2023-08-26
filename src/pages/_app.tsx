import { RootContainer } from "@/components/common/RootContainer";
import theme from "@/styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { CustomisedSnackbar } from "@/components/common/CustomisedSnackbar";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomisedSnackbar>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <NextNProgress />
            <RootContainer>
              <Component {...pageProps} />
            </RootContainer>
          </Hydrate>
        </QueryClientProvider>
      </CustomisedSnackbar>
    </ThemeProvider>
  );
}
