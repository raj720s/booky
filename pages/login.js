import { getSession } from "next-auth/client";
import React from "react";
import LoginPage from "../components/auth/Login";
import Layout from "../components/layout/layout";

function login() {
  return (
    <Layout title="login page">
      <LoginPage />
    </Layout>
  );
}
export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default login;
