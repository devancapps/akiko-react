import React from 'react';
import SEO from '../layout/SEO';

const resources = [
  {
    category: 'VPN Services',
    items: [
      {
        name: 'NordVPN',
        description: 'Secure your online activities while traveling with military-grade encryption.',
        link: 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=624965',
        image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg'
      },
      {
        name: 'ExpressVPN',
        description: 'Fast and reliable VPN service with servers in 94 countries.',
        link: 'https://www.expressvpn.com/offer/akiko?offer=3monthsfree&a_fid=624965',
        image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg'
      }
    ]
  },
  {
    category: 'Travel Credit Cards',
    items: [
      {
        name: 'Chase Sapphire Preferred',
        description: 'Earn 60,000 bonus points after spending $4,000 in the first 3 months.',
        link: 'https://www.referyourchasecard.com/6j/624965',
        image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg'
      },
      {
        name: 'American Express Platinum',
        description: 'Premium travel benefits including airport lounge access and travel credits.',
        link: 'https://www.americanexpress.com/en-us/referral/624965',
        image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg'
      }
    ]
  },
  {
    category: 'Travel Insurance',
    items: [
      {
        name: 'World Nomads',
        description: 'Comprehensive travel insurance for adventurous travelers.',
        link: 'https://www.worldnomads.com/?affiliate=624965',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
      },
      {
        name: 'SafetyWing',
        description: 'Flexible travel medical insurance for digital nomads.',
        link: 'https://safetywing.com/?referenceID=624965',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
      }
    ]
  },
  {
    category: 'Travel Gear',
    items: [
      {
        name: 'Amazon Travel Store',
        description: 'Curated selection of essential travel gear and accessories.',
        link: 'https://www.amazon.com/shop/akikoadventures',
        image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
      },
      {
        name: 'REI Co-op',
        description: 'Quality outdoor gear and clothing for your adventures.',
        link: 'https://www.rei.com/?cm_mmc=aff_624965',
        image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
      }
    ]
  }
];

function Resources() {
  return (
    <>
      <SEO
        title="Travel Resources"
        description="Essential tools and services for travelers, including VPNs, credit cards, insurance, and gear."
        image="https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg"
        canonical="/resources"
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Travel Resources</h1>
        
        <div className="space-y-16">
          {resources.map((category) => (
            <section key={category.category} className="space-y-8">
              <h2 className="text-3xl font-bold">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-40">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold text-white">{item.name}</h3>
                          <p className="text-white/90 mt-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Affiliate Disclosure</h2>
          <p className="text-gray-600">
            Some of the links on this page are affiliate links. This means that if you click on the link and make a purchase, we may receive a commission at no additional cost to you. We only recommend products and services that we believe will add value to our readers. The income from these affiliate links helps us maintain and improve our website.
          </p>
        </div>
      </div>
    </>
  );
}

export default Resources; 