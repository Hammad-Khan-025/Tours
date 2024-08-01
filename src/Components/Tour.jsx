import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';

// Use an environment variable for the API URL
const url = process.env.REACT_APP_API_URL || "/react-tours-project";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch tours from the API
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Function to clear a tour card based on its id
  const clearCard = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  // Display a loading message while the data is being fetched
  if (loading) {
    return (
      <div className='flex justify-center h-screen py-20 font-medium text-4xl text-gray-500'>
        <h1>Loading...</h1>
      </div>
    );
  }

  // Display a message when there are no tours left
  if (tours.length === 0) {
    return (
      <div className='text-center pt-10 font-bold tracking-wider min-h-screen bg-gray-200'>
        <h1 className='text-2xl md:text-3xl uppercase'>No Tours Left</h1>
        <button
          className='bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 mt-5 rounded-lg'
          onClick={fetchTours}
        >
          Refresh
        </button>
      </div>
    );
  }

  // Map through the tours and create a TourCard for each
  const cardElements = tours.map((tour) => (
    <TourCard
      key={tour.id}
      {...tour}
      clearCard={clearCard} // Pass the clearCard function as a prop
    />
  ));

  // Render the list of tours
  return (
    <div className='flex justify-center py-10 tracking-wider min-h-screen bg-gray-200'>
      <div className='mx-5 sm:mx-0'>
        <h1 className='text-center text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2'>
          Our Tours
        </h1>
        <div className='flex justify-center'>
          <div className='w-20 h-1 bg-blue-500 rounded-full mb-10'></div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-start gap-10 sm:mx-10'>
          {cardElements} {/* Render the tour cards */}
        </div>
      </div>
    </div>
  );
}
