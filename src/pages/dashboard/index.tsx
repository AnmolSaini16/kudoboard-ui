import { NavHeader } from "@/components/common/NavHeader";
import Dashboard from "@/components/dashboard/Dashboard";
import { GetServerSidePropsContext } from "next";
import { redirect } from "next/dist/server/api-utils";

const DashBoard = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <>
      <NavHeader isLoggedIn={isLoggedIn} />
      <Dashboard />
    </>
  );
};

export default DashBoard;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let isLoggedIn = false;
  const authCookie = context?.req.cookies["access_token"] ?? null;
  if (authCookie) {
    isLoggedIn = true;
  }

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { isLoggedIn } };
};
