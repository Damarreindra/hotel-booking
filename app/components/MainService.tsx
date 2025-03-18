import React from "react";

function MainService() {
  return (
    <div className="w-full flex flex-row px-72 mt-24 mb-24 gap-24">
      <div
        className="max-w-1/2 rounded"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1582564286939-400a311013a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",

          height: "70vh",
          width: "100%",
        }}
      ></div>
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-5xl text-fourth font-extrabold mb-8">
          We have the best service.
        </h1>
        <p className="text-justify text-gray-500 font-inter  text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="w-1/2 flex flex-col gap-3 mt-12">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-third font-bold text-xl">192</span>
              <span className="text-gray-600  text-xl ">Countries</span>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-third font-bold text-xl">45</span>
              <span className="text-gray-600  text-xl ">Hotels</span>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-third font-bold text-xl ">2000+</span>
              <span className="text-gray-600  text-xl ">Rooms</span>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-third font-bold text-xl ">1000+</span>
              <span className="text-gray-600  text-xl ">Workers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainService;
