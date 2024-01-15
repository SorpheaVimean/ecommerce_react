import React from "react";
import error from "../../img/error.gif";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div>
      {/* <div className="flex justify-center items-center h-screen ">
        Hello
      </div> */}
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl text-black font-bold mb-2">Page not Found</h1>
        <img src={error} alt="" />
        <p className="text-black font-bold text-3xl mb-5"> Oops! Page not found</p>
        <p className="mb-2">
          The page you are trying to access does not exist or has been moved.
          Try going back to our homepage.
        </p>
        <p className="mb-3">Try going back to our homepage.</p>
        <Link to={"/"}>
          {" "}
          <button class="w-40 h-12 bg-white cursor-pointer rounded-3xl border-2 border-BgBtnHover shadow-[inset_0px_-2px_0px_1px_#01cc7a] group hover:bg-BgBtnHover transition duration-300 ease-in-out">
            <span class="font-medium text-[#333] group-hover:text-white">
              Back to HomePage
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
