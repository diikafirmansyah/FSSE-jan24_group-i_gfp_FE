import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const About = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setModalImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage(null);
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-gray-900 text-white">
      <div className="relative flex flex-col items-center justify-center w-full h-full p-6 md:p-12 lg:p-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-80">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center my-8 leading-tight animate-fade-in">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-center mb-6 md:mb-8 leading-relaxed animate-slide-in">
          Welcome to <span className="font-bold text-yellow-400">LautLestari</span>, your ultimate destination for high-quality ornamental fish, both imported and local!
        </p>
        <div
          className="flex flex-wrap justify-center gap-8 mb-8"
          onClick={() => openModal('https://www.youtube.com/embed/HHi8qOtHnhE?si=Zg5wXHWEuiUkuqM6?autoplay=1&mute=1')}
        >
          <div className="w-full lg:w-[78%] p-4 bg-gray-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <iframe
              width="100%" height="315"
              src="https://www.youtube.com/embed/HHi8qOtHnhE?si=Zg5wXHWEuiUkuqM6?autoplay=1&mute=1"
              title="Ornamental Fishes" allow="autoplay; encrypted-media"
            >
            </iframe>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Ornamental Fish</h2>
              <p>Discover our exquisite collection of ornamental fish, carefully curated for quality and beauty.</p>
            </div>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 animate-scroll-reveal">
          What Sets Us Apart?
        </h2>
        <ul className="text-lg md:text-xl text-left md:text-center mb-6 md:mb-8 list-disc list-inside space-y-4 md:space-y-6">
          <li className="animate-fade-in">
            <strong className="text-yellow-400">Guaranteed Quality:</strong> Every fish we offer undergoes a rigorous selection process to ensure only the best reaches you.
          </li>
          <li className="animate-fade-in">
            <strong className="text-yellow-400">Diverse Selection:</strong> From exotic tropical fish to charming local species, we have a wide variety to meet all your aquarium needs.
          </li>
          <li className="animate-fade-in">
            <strong className="text-yellow-400">Professional Service:</strong> Our team consists of ornamental fish experts ready to provide information and advice.
          </li>
          <li className="animate-fade-in">
            <strong className="text-yellow-400">Safe and Timely Shipping:</strong> We ensure that your fish arrive in the best condition with our meticulous shipping system.
          </li>
          <li className="animate-fade-in">
            <strong className="text-yellow-400">Customer Support:</strong> Our customer service team is here to assist with any questions or needs you may have.
          </li>
        </ul>
        <p className="text-lg md:text-xl text-center mb-6 md:mb-8 leading-relaxed">
          Explore LautLestari today and discover your dream ornamental fish! Join our community and enjoy the beauty and uniqueness of the wide range of fish we offer. <span className="font-bold text-yellow-400">LautLestari</span> - The Best Place to Find Quality Ornamental Fish.
        </p>
        <a href="#contact" className="mt-8 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold text-lg rounded-lg shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-105">
          Contact Us
        </a>
      </div>

      {/* Modal for Image Popup */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-60"
      >
        <div className="relative bg-white p-4 rounded-lg max-w-full w-full md:max-w-6xl">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-800 hover:text-gray-600"
          >
            &times;
          </button>
          {modalImage && (
            <iframe
              className="w-full h-[500px] md:h-[700px] rounded-lg"
              src={modalImage}
              title="Ornamental Fishes expanded view"
              allow="autoplay; encrypted-media"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default About;
