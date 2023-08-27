import { NavHeader } from "@/components/common/NavHeader";
import Dashboard from "@/components/dashboard/Dashboard";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

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
  const session = await getServerSession(context.req, context.res, authOptions);
  const isLoggedIn = !!session;

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
