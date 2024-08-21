import React from 'react';
import Image from 'next/image';

const fishcare: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            {/* Header */}
            <header className="bg-blue-900 text-white text-center py-6">
                <h1 className="text-4xl font-bold">How to Care for Decorative Fish</h1>
                <p className="text-lg mt-2">Science-Based Guidelines for Healthy and Happy Fish</p>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 lg:px-8 py-10">
                {/* Introduction */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-800 mb-4">Introduction</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Decorative fish can bring color, beauty, and a sense of calm to any space. However, they require specific care to thrive.
                        Understanding the science behind their needs will help you provide the best environment for your fish, ensuring they live long, healthy lives.
                    </p>
                </section>

                {/* Tank Setup */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-800 mb-4">1. Proper Tank Setup</h2>
                    <div className="flex flex-col lg:flex-row lg:space-x-8">
                        <div className="lg:w-1/2">
                            <Image
                                src="/path/to/tank-setup.jpg"
                                alt="Tank Setup"
                                width={500}
                                height={300}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="lg:w-1/2 mt-6 lg:mt-0">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                The foundation of fish care starts with the right tank setup. Ensure you have a tank that suits the size and number of fish you plan to keep.
                                A general rule is to have at least one gallon of water per inch of fish. Use a water filter to maintain clean water, and include plants and hiding spots
                                to mimic the fish's natural habitat.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Water Quality */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-800 mb-4">2. Maintaining Water Quality</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Water quality is crucial for the health of your fish. Regularly test the water's pH, ammonia, nitrate, and nitrite levels using a water testing kit.
                        The ideal pH level for most decorative fish is between 6.5 and 7.5. Perform partial water changes (about 25%) every two weeks to maintain cleanliness.
                    </p>
                </section>

                {/* Feeding */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-800 mb-4">3. Proper Feeding</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Overfeeding is a common mistake among fish keepers. Feed your fish once or twice a day, providing only as much food as they can consume in a few minutes.
                        Use high-quality fish food, and supplement their diet with fresh or frozen foods such as brine shrimp or bloodworms for variety.
                    </p>
                </section>

                {/* Tank Mates */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-800 mb-4">4. Choosing Compatible Tank Mates</h2>
                    <div className="flex flex-col lg:flex-row lg:space-x-8">
                        <div className="lg:w-1/2">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                When selecting tank mates, it's important to consider the temperament and size of the fish. Aggressive species should not be mixed with peaceful ones,
                                and large fish may prey on smaller fish. Research the species you plan to keep together to ensure compatibility and a stress-free environment.
                            </p>
                        </div>
                        <div className="lg:w-1/2 mt-6 lg:mt-0">
                            <Image
                                src="/path/to/tank-mates.jpg"
                                alt="Compatible Tank Mates"
                                width={500}
                                height={300}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Regular Maintenance */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-800 mb-4">5. Regular Tank Maintenance</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Regular maintenance is key to keeping your fish healthy. Clean the tank walls with an algae scraper, vacuum the substrate to remove debris,
                        and check the filter to ensure it's functioning properly. Regularly inspect your fish for signs of illness, such as changes in behavior, color, or appetite.
                    </p>
                </section>

                {/* Conclusion */}
                <section className="mb-10">
                    <h2 className="text-3xl font-semibold text-blue-800 mb-4">Conclusion</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Caring for decorative fish requires attention to detail and a commitment to maintaining a healthy environment. By following these science-based guidelines,
                        you'll ensure your fish live a long, vibrant life, bringing beauty and tranquility to your space.
                    </p>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-blue-900 text-white text-center py-4">
                <p className="text-sm">© 2024 AquaFish. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default fishcare;
