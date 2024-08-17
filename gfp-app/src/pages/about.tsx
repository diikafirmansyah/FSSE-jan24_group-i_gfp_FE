const About = () => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <img
        src="./assets/bg-register.jpg"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full -z-10 blur-md opacity-50"
      />
      <div className="relative flex flex-col items-center justify-center w-full h-full p-4 bg-opacity-80 bg-gray-900">
        <h1 className="text-3xl font-bold text-center my-8 text-white">
          About Us
        </h1>
        <p className="text-lg text-center mb-8 text-white">
          Welcome to AquaFish, your ultimate destination for high-quality
          ornamental fish, both imported and local!
        </p>
        <p className="text-lg text-center mb-8 text-white">
          At AquaFish, we understand the importance of having ornamental fish
          that are not only beautiful but also healthy and top-quality. That’s
          why we carefully curate our collection, offering a range of ornamental
          fish from around the world as well as the finest local fish.
        </p>
        <p className="text-lg text-center mb-8 text-white">
          <strong>What Sets Us Apart?</strong>
        </p>
        <ul className="text-lg text-center mb-8 text-white list-disc list-inside">
          <li>
            <strong>Guaranteed Quality:</strong> Every fish we offer undergoes a
            rigorous selection process to ensure only the best reaches you. We
            partner with trusted suppliers and ornamental fish breeders who
            adhere to the highest quality standards.
          </li>
          <li>
            <strong>Diverse Selection:</strong> From exotic tropical fish to
            charming local species, we have a wide variety to meet all your
            aquarium needs. Whether you’re looking for vibrant fish for your
            home aquarium or rare species for your collection, we’ve got you
            covered.
          </li>
          <li>
            <strong>Professional Service:</strong> Our team consists of
            ornamental fish experts ready to provide information and advice to
            help you choose the fish that best suits your needs and preferences.
            We also offer fish care guides to ensure the health and happiness of
            your aquatic pets.
          </li>
          <li>
            <strong>Safe and Timely Shipping:</strong> We understand the
            importance of proper transportation for ornamental fish. With a
            meticulous and professional shipping system, we ensure that your
            fish arrive in the best condition.
          </li>
          <li>
            <strong>Customer Support:</strong> Your satisfaction is our
            priority. Our customer service team is here to assist with any
            questions or needs you may have before, during, and after your
            purchase.
          </li>
        </ul>
        <p className="text-lg text-center mb-8 text-white">
          Explore AquaFish today and discover your dream ornamental fish! Join
          our community and enjoy the beauty and uniqueness of the wide range of
          fish we offer. AquaFish - The Best Place to Find Quality Ornamental
          Fish.
        </p>
      </div>
    </div>
  );
};

export default About;
