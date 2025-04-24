import React from 'react';

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
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                <p className="text-white/90 mt-2">Book your flight now</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default DestinationGrid; 