import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { signIn } from "next-auth/client";
import LoadButton from "../layout/LoadButton";

function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loginFunction = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res.error) {
      console.log(res);
      setLoading(false);
      toast.error(res.error);
    } else {
      setLoading(false);
      window.location.href = "/";
    }
    // console.log(email, password);
  };
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={loginFunction}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <Link href="/password/forgot" className="float-right mb-4">
              Forgot Password?
            </Link>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {loading ? <LoadButton /> : "login"}
            </button>

            <Link href="/register" className="float-right mt-3">
              New User?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
