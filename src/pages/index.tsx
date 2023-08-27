import { NavHeader } from "@/components/common/NavHeader";
import { HomePageContainer } from "@/components/home/HomePageContainer";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

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
  const session = await getServerSession(context.req, context.res, authOptions);
  const isLoggedIn = !!session;

  return { props: { isLoggedIn } };
};
