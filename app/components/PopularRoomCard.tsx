import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";

function PopularRoomCard({ image, desc, price, rating, type }: IPopularCard) {
  return (
    <div>
      <div
        className="border rounded-tl-[50px] border-gray-200 flex flex-col bg-white justify-center items-center h-full"
        style={{
          backgroundImage: `url("./${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "30vh",
        }}
      ></div>
      <div className="p-8 border border-gray-200 border-t-0">
        <div className="flex flex-row justify-between items-center font-bold">
          <h1 className="text-3xl">{type} Room</h1>
          <div className="flex flex-row gap-3 items-center">
            <h1 className="text-yellow-500 text-2xl">
              <FaStar />
            </h1>
            <h1 className="text-xl">{rating}</h1>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center mt-3">
          <span className="font-bold rounded-full p-1.5 text-white bg-fourth">
            <BsCurrencyDollar />
          </span>
          <span className="font-semibold">Rp.{price}/Day</span>
        </div>

        <div className="mt-3 ">
          <p className="text-justify text-sm">{desc}</p>
        </div>
      </div>
      <div className="bg-third w-full flex justify-center items-center p-5 rounded-br-[50px]">
        <h1 className="text-white font-bold text-xl">Book Now</h1>
      </div>
    </div>
  );
}

export default PopularRoomCard;
