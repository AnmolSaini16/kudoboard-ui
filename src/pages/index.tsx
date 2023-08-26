import { NavHeader } from "@/components/common/NavHeader";
import { HomePageContainer } from "@/components/home/HomePageContainer";
import { GetServerSidePropsContext } from "next";

export default function Home({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <>
      <NavHeader isLoggedIn={isLoggedIn} homePage />
      <HomePageContainer />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let isLoggedIn = false;
  const authCookie = context?.req.cookies["access_token"] ?? null;
  if (authCookie) {
    isLoggedIn = true;
  }

  return { props: { isLoggedIn } };
};
