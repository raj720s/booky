import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrorsAction,
  forgotPasswordAction,
} from "../../redux/actions/userActions";
import LoadButton from "../layout/LoadButton";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorsAction());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
    };
    dispatch(forgotPasswordAction(userData));
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            {loading ? <LoadButton /> : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
