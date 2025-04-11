import { ListCollapse, StarIcon } from "lucide-react";
import React from "react";
import { FaMoneyBill } from "react-icons/fa6";

function FilterContainer() {
  return (
    <section className="w-full flex gap-3 mt-3">
      <div className="py-1 px-3 rounded-full flex flex-row gap-2 items-center justify-center border border-gray-300">
        <FaMoneyBill className="text-gray-400" />
        <span>Price</span>
      </div>
      <div className="py-1 px-3 rounded-full flex flex-row gap-2 items-center justify-center border border-gray-300">
        <StarIcon className="text-gray-400" size={15} />
        <span>Rating</span>
      </div>
      <div className="py-1 px-3 rounded-full flex flex-row gap-2 items-center justify-center border border-gray-300">
        <ListCollapse className="text-gray-400" size={15} />
        <span>Sort</span>
      </div>
    </section>
  );
}

export default FilterContainer;
