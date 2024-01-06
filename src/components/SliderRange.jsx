import React, { useState } from 'react';

const RangeSlider = () => {
  const [range, setRange] = useState({ min: 0, max: 20000 });

  const handleRangeChange = (event) => {
    setRange({
      ...range,
      [event.target.name]: parseInt(event.target.value)
    });
  };

  return (
    <div className="w-full ">
      <div className="flex justify-between">
        <label htmlFor="min" className="text-sm font-medium text-gray-700">Min</label>
        <label htmlFor="max" className="text-sm font-medium text-gray-700">Max</label>
      </div>
      <div className="flex justify-between gap-4 mt-1">
        <input
          type="number"
          name="min"
          id="min"
          value={range.min}
          onChange={handleRangeChange}
          className="w-1/2 px-2 py-1 text-sm text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <input
          type="number"
          name="max"
          id="max"
          value={range.max}
          onChange={handleRangeChange}
          className="w-1/2 px-2 py-1 text-sm text-gray-700 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
