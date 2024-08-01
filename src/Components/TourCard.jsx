import React, { useState } from 'react';

export default function TourCard({ id, name, info, image, price, clearCard }) {
  const [readMore, setReadMore] = useState(false);

  const toggle = () => {
    setReadMore(prevState => !prevState);
  };

  return (
    <div className='max-w-[420px] md:w-[340px] lg:w-[380px] xl:w-[360px] bg-white shadow-2xl rounded-xl overflow-hidden '>
      <img src={image} alt="tour img" className='h-60 w-full' />
      <div className='p-5 bg-white'>
        <div className='flex justify-between font-semibold gap-5'>
          <h1>{name}</h1>
          <h2 className='text-blue-500'>${price}</h2>
        </div>
        <p className='my-5 text-justify'>
          {readMore ? info : `${info.substring(0, 190)}...`}{" "}
          <button className='text-blue-500 font-bold focus:ring-1 px-1 rounded-lg' onClick={toggle}>
            {readMore ? "Show Less" : "Read More"}
          </button>
        </p>
        <div className='text-center'>
          <button className='font-semibold border border-red-500 text-white bg-red-500 hover:bg-white hover:text-red-500 px-3 py-1 rounded' onClick={() => clearCard(id)}>Not Interested</button>
        </div>
      </div>
    </div>
  );
}
