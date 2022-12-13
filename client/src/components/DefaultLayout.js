import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      path: "/easy-booking",
      icon: "ri-home-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/easy-booking",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menutoBeRendered = user?.isAdmin ? adminMenu : userMenu;
  
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    
    
    activeRoute = "/easy-booking";
  }

  return (
    <div className="flex w-full">
      <div className="h-screen sticky top-0 flex flex-col bg-purple-900 shadow justify-start px-5 py-0 ">
        <div className="flex flex-col justify-start items-center p-5">
          <div className="bg-purple-900 w-full ">
            {collapsed ? (
              <i
                className="ri-menu-2-fill cursor-pointer text-[30px] text-white"
                
                onClick={() => {
                  setCollapsed(false);
                }}
              ></i>
            ) : (
              <i
                className="ri-close-line cursor-pointer text-[30px] text-white"
                onClick={() => {
                  setCollapsed(true);
                }}
              ></i>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-start mt-[100px] ">
          {menutoBeRendered.map((item, key) => {
            return (
              <div
                key={key}
                className={`${
                  activeRoute === item.path && "rounded-xl bg-purple-800"
                } text-base gap-5 mr-[10px] text-white flex items-center hover:bg-purple-400 hover:rounded-xl duration-200 justify-start py-[5px] px-[15px] w-full cursor-pointer transition-[0.2s]`}
              >
                <i className={item.icon}></i>

                {!collapsed && (
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user_id");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
   
      <div className="w-full">
        <div className="bg-purple-900 space-x-5 flex flex-wrap justify-start items-center py-2 ">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="logo"
            className="w-30 h-20  cursor-pointer"
          />
          <h1 className="text-white text-base mb-0 p-0 text-center ">
            <div className="mt-1">{user?.name} </div>
          </h1>
        </div>
        <div className="p-[10px] px-0">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
