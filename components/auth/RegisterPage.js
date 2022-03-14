import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { registerUserAction } from "../../redux/actions/userActions";
import LoadButton from "../layout/LoadButton";
function RegisterPage() {
  const dispatch = useDispatch();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { name, email, password } = user;
  const [avatar, setavatar] = useState("");
  const [avatarPreview, setavatarPreview] = useState("/favicon.ico");
  const { success, error, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (success) {
      router.push("/login");
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, success, error]);

  const registerFunction = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      avatar,
    };
    dispatch(registerUserAction(userData));
    // console.log(userData);
  };

  const fieldSetter = (e) => {
    e.preventDefault();
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={registerFunction}>
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={fieldSetter}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={fieldSetter}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={fieldSetter}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={fieldSetter}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {loading ? <LoadButton /> : "REGISTER"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
