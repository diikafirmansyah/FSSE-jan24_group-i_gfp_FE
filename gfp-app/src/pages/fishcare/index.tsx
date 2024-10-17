import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FishCare: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center py-8">
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How to Care for Decorative Fish
        </motion.h1>
        <motion.p
          className="text-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Science-Based Guidelines for Healthy and Happy Fish
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-12 py-12">
        {/* Introduction */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">Introduction</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Decorative fish bring color and tranquility to any space, but they require proper care to thrive. Understanding their needs and maintaining their environment is key to their health and longevity.
          </p>
        </motion.section>

        {/* Tank Setup */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">1. Proper Tank Setup</h2>
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="md:w-max lg:w-max mb-6 lg:mb-0">
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/assets/tanksetup.jpg"
                  alt="Tank Setup"
                  width={550}
                  height={300}
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <p className="text-gray-800 text-lg leading-relaxed">
                Start with a tank that matches the size and number of fish you plan to keep. A general guideline is one gallon of water per inch of fish. Use a quality water filter and include plants and hiding spots to replicate their natural habitat.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Water Quality */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">2. Maintaining Water Quality</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Regularly test water parameters such as pH, ammonia, nitrate, and nitrite. Maintain a pH level between 6.5 and 7.5, and perform partial water changes (around 25%) every two weeks to keep the environment clean and stable.
          </p>
        </motion.section>

        {/* Feeding */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">3. Proper Feeding</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Avoid overfeeding by providing only as much food as your fish can consume in a few minutes, once or twice a day. Use high-quality fish food and offer occasional fresh or frozen treats like brine shrimp or bloodworms.
          </p>
        </motion.section>

        {/* Tank Mates */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">4. Choosing Compatible Tank Mates</h2>
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="md:w-max lg:w-max mb-6 lg:mb-0">
              <motion.div
                className="relative rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/assets/tankmates.jpg"
                  alt="Compatible Tank Mates"
                  width={550}
                  height={300}
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <p className="text-gray-800 text-lg leading-relaxed">
                Consider the temperament and size of the fish when choosing tank mates. Avoid mixing aggressive species with peaceful ones, and be mindful of size differences to prevent predation. Research species compatibility to ensure a harmonious tank environment.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Regular Maintenance */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">5. Regular Tank Maintenance</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Maintain tank health by cleaning algae, vacuuming the substrate, and checking the filter regularly. Monitor fish for signs of illness, such as changes in behavior or appearance, and address issues promptly to keep your fish in optimal condition.
          </p>
        </motion.section>

        {/* Conclusion */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">Conclusion</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Effective fish care involves understanding their needs and maintaining their environment. By following these guidelines, you'll ensure your decorative fish thrive and add beauty to your space.
          </p>
        </motion.section>
      </main>
    </div>
  );
};

export default FishCare;
