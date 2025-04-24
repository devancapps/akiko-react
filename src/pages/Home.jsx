import React from 'react';
import SEO from '../components/SEO';
import DestinationGrid from '../components/DestinationGrid';
import FlightWidget from '../components/FlightWidget';
import HotelWidget from '../components/HotelWidget';
import SubscribeForm from '../components/SubscribeForm';

function Home() {
  return (
    <>
      <SEO
        title="Your Ultimate Travel Guide"
        description="Discover amazing destinations, get travel tips, and find the best deals on flights and hotels."
        image="https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg"
        canonical="/"
      />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Explore the world with our expert travel guides and find the best deals on flights and hotels.
          </p>
          <a
            href="#destinations"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Explore Destinations
          </a>
        </div>
      </section>

      {/* Flight Search */}
      <FlightWidget />

      {/* Popular Destinations */}
      <section id="destinations" className="py-12 bg-gray-50">
        <DestinationGrid />
      </section>

      {/* Hotel Search */}
      <HotelWidget />

      {/* Newsletter */}
      <SubscribeForm />
    </>
  );
}

export default Home; 