import React, { useRef } from 'react';

const destinations = [
  {
    name: 'Tokyo',
    image: 'https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg',
    link: 'https://www.trip.com/flights/tokyo/tickets-tok.html?marker=624965'
  },
  {
    name: 'Paris',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
    link: 'https://www.trip.com/flights/paris/tickets-par.html?marker=624965'
  },
  {
    name: 'New York',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
    link: 'https://www.trip.com/flights/new-york/tickets-nyc.html?marker=624965'
  },
  {
    name: 'Barcelona',
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    link: 'https://www.trip.com/flights/barcelona/tickets-bcn.html?marker=624965'
  },
  {
    name: 'Sydney',
    image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg',
    link: 'https://www.trip.com/flights/sydney/tickets-syd.html?marker=624965'
  },
  {
    name: 'Dubai',
    image: 'https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg',
    link: 'https://www.trip.com/flights/dubai/tickets-dxb.html?marker=624965'
  },
  {
    name: 'Rome',
    image: 'https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg',
    link: 'https://www.trip.com/flights/rome/tickets-rom.html?marker=624965'
  },
  {
    name: 'Bangkok',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    link: 'https://www.trip.com/flights/bangkok/tickets-bkk.html?marker=624965'
  },
  {
    name: 'Singapore',
    image: 'https://images.pexels.com/photos/3152126/pexels-photo-3152126.jpeg',
    link: 'https://www.trip.com/flights/singapore/tickets-sin.html?marker=624965'
  }
];

function DestinationCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 py-4 px-2 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          {destinations.map((destination) => (
            <a
              key={destination.name}
              href={destination.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-none w-64 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-40">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                    <p className="text-white/90 text-sm">Book your flight now</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DestinationCarousel; 