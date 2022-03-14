import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDispatch } from "react-redux";
import RegisterPage from "../components/auth/RegisterPage";
import Layout from "../components/layout/layout";

function register() {
  return (
    <Layout>
      <RegisterPage title="register page" />
    </Layout>
  );
}

export default register;
