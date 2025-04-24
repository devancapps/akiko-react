import React, { useRef } from 'react';

const destinations = [
  {
    name: 'Tokyo',
    image: 'https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Ftokyo%2Ftickets-tok.html'
  },
  {
    name: 'Paris',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Fparis%2Ftickets-par.html'
  },
  {
    name: 'New York',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Fnew-york%2Ftickets-nyc.html'
  },
  {
    name: 'Barcelona',
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Fbarcelona%2Ftickets-bcn.html'
  },
  {
    name: 'Sydney',
    image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Fsydney%2Ftickets-syd.html'
  },
  {
    name: 'Dubai',
    image: 'https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Fdubai%2Ftickets-dxb.html'
  },
  {
    name: 'Rome',
    image: 'https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Frome%2Ftickets-rom.html'
  },
  {
    name: 'Bangkok',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Fbangkok%2Ftickets-bkk.html'
  },
  {
    name: 'Singapore',
    image: 'https://images.pexels.com/photos/3152126/pexels-photo-3152126.jpeg',
    link: 'https://tp.media/r?marker=409664&trs=624965&p=4132&u=https%3A%2F%2Fwww.trip.com%2Fflights%2Fsingapore%2Ftickets-sin.html'
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