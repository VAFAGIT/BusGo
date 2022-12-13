import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="p-3 m-2 rounded-2xl border-[0.5px] bg-white hover:shadow-xl duration-300">
      <h1 className="text-xl font-bold text-gray-700">{bus.name}</h1>
      <div className="flex justify-between p-2">
        <div>
          <p className="text-base font-bold">From</p>
          <p className="text-base">{bus.from}</p>
        </div>

        <div>
          <p className="text-base font-bold">To</p>
          <p className="text-base">{bus.to}</p>
        </div>

        <div>
          <p className="text-base font-bold">Price</p>
          <p className="text-base">{bus.price} $ </p>
        </div>

        <div>
          <p className="text-base font-bold">Date</p>
          <p className="text-base">{bus.journeyDate}</p>
        </div>
      </div>

     
        <button
          className="text-base text-white  rounded-full px-5 py-2 bg-amber-500 hover:bg-amber-600 hover:duration-300 hover:text-white"
          onClick={() => {
            navigate(`/book-now/${bus._id}`);
          }}
        >
          Book
        </button>
    </div>
  );
}

export default Bus;
