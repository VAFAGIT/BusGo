import React from "react";
import { Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { Helmet } from "react-helmet";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/auth/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        localStorage.setItem("user_id", response.data.user._id);

        navigate("/easy-booking");
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
        <title>Login</title>
      </Helmet>
      <Form onFinish={onFinish}>
        <div
          className="bg-white min-h-screen flex flex-col "
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/004/972/943/non_2x/purple-retro-abstract-background-free-vector.jpg")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white  px-6 py-8 rounded-3xl shadow-xl text-black w-full border-2">
            <div className="mb-7">
            <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
            <p className="text-gray-400">Don'thave an account? <a href="/register"
                className="text-sm text-purple-700 hover:text-purple-700">Sign Up</a></p>
            </div>
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
                  className="block border bg-gray-200 focus:bg-gray-100 w-full p-3 rounded mb-4"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                    min: 6,
                    validateTrigger: "onSubmit",
                  },
                ]}
              >
                <input
                  type="password"
                  className="block border bg-gray-200 focus:bg-gray-100 w-full p-3 rounded mb-4"
                  placeholder="Password"
                  autoComplete="off"
                />
              </Form.Item>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" bg-purple-700 rounded-2xl font-bold w-56 text-center py-3 text-white hover:text-black hover:bg-purple-800 hover:bg-white-500 hover:border-black hover:border duration-500 focus:outline-none my-1"
                >
                  LOGIN
                </button>
              </div>
            
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default Login;
