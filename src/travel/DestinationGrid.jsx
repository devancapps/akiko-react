import React from 'react';

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

function DestinationGrid() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <a
            key={destination.name}
            href={destination.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="image-container image-lg">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="image-overlay">
                <div className="image-overlay-content">
                  <h3 className="text-2xl font-bold">{destination.name}</h3>
                  <p className="text-white/90 mt-2">Book your flight now</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default DestinationGrid; 