import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { Helmet } from "react-helmet";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/create-user", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Form onFinish={onFinish}>
        <div
          className="bg-white min-h-screen flex flex-col"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/004/972/943/non_2x/purple-retro-abstract-background-free-vector.jpg")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded-xl shadow-xl text-black w-full border-2">
              <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Sign Up </h3>
              <p className="text-gray-400">Already have an account? <a href="/login"
                  className="text-sm text-purple-700 hover:text-purple-700">Sign In</a></p>
              </div>
              <Form.Item
                name="name"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: "Please input your fullname!",
                    validateTrigger: "onSubmit",
                    validateFirst: true,
                  },
                ]}
              >
                <input
                  type="text"
                  className="block border  bg-gray-200 focus:bg-gray-100 w-full p-3 rounded mb-4"
                  placeholder="Fullname"
                />
              </Form.Item>

              <Form.Item
                name="email"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    validateTrigger: "onSubmit",
                  },
                ]}
              >
                <input
                  type="email"
                  className="block border  bg-gray-200 focus:bg-gray-100 w-full p-3 rounded mb-4"
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message:
                      "Password must be at least 6 characters! and must contain at least one uppercase letter, one lowercase letter and one number",
                    min: 6,
                    validateTrigger: "onSubmit",
                  },
                ]}
              >
                <input
                  type="password"
                  className="block border bg-gray-200 focus:bg-gray-100  w-full p-3 rounded mb-4"
                  placeholder="Password"
                  autoComplete="off"
                />
              </Form.Item>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" bg-purple-700 rounded-2xl font-bold w-56 text-center py-3 text-white hover:text-black hover:bg-purple-800 hover:bg-white-500 hover:border-black hover:border duration-500 focus:outline-none my-1"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Register;
