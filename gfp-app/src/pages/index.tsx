import { useState } from "react";
import Slider from "react-slick";
import FishCard from "../components/FishCard";
import { GetStaticProps } from 'next';
import { API_URL } from "@/config";

interface Product {
  id: number;
  user_id: number;
  image: string | null;
  price: number;
  qty: number;
  description: string;
  category: string;
  location: string;
  created_at: string;
  updated_at: string | null;
  nationality: string;
  size: string;
}

interface HomeProps {
  fishData: Product[];
}

export const getStaticProps: GetStaticProps<{ fishData: Product[] }> = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();

    return {
      props: {
        fishData: data.products || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching fish data:", error);
    return {
      props: {
        fishData: [],
      },
    };
  }
}

export default function Home({ fishData }: HomeProps) {
  const [loading, setLoading] = useState<boolean>(fishData.length === 0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <main className="relative min-h-screen bg-background text-textPrimary">
      <div className="absolute inset-0 bg-gray-900 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('./assets/bg-register.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              LautLestari
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Find rare and exotic ornamental fish for your aquarium. Our trusted sellers offer top-quality freshwater and marine species. Join our community and enhance your underwater world today!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#on-sale"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="/fishcare"
                className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-300 transform hover:scale-105 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Fishcare
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* On Sale Section */}
      <section className="px-4 sm:px-8 lg:px-32">
        <div className="relative text-center">
          <h2 id="on-sale" className="font-bold text-2xl sm:text-3xl leading-8 text-gray-300 animate-bounce">
            ON SALE NOW
          </h2>
          {loading ? (
            <p className="text-gray-300">Loading...</p>
          ) : (
            fishData.length !== 0 ? (
              <Slider {...settings} className="my-8">
                {fishData.map((fish) => (
                  <div key={fish.id} className="px-4">
                    <FishCard
                      id={fish.id}
                      image={fish.image}
                      price={fish.price}
                      description={fish.description}
                      category={fish.category}
                      location={fish.location}
                      nationality={fish.nationality}
                      size={fish.size}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <p className="text-grap-400">Fetching Product Data error...</p>
            )
          )}
        </div>
        <div className="relative mb-8 text-center mx-auto max-w-full sm:max-w-4xl px-4">
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300">
            At LautLestari, our mission is to seamlessly connect sellers and consumers of ornamental fish, making it easier to buy, sell, and discover a diverse range of aquatic life. We strive to create a trusted platform where hobbyists and enthusiasts can find healthy, ethically sourced fish with ease. By partnering with reputable breeders and sellers, we aim to simplify the search and purchase process, fostering a vibrant community dedicated to the beauty of fishkeeping.
          </p>
        </div>
      </section>

      {/* Learn How to Care Section */}
      <section className="relative bg-gray-800 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Learn How to Care for Your Fish
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Discover expert tips and guidelines on keeping your ornamental fish healthy and thriving.
          </p>
          <div className="mt-8">
            <a
              href="/fishcare"
              className="inline-block rounded-md bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-300 transform hover:scale-110 hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Visit Fishcare Page
            </a>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section>
        <div className="relative px-12 mb-4">
          <h2 className="font-bold text-3xl leading-8 text-gray-300 text-center py-12">
            Join us now!
          </h2>
        </div>
        <div className="relative flex flex-wrap justify-center px-12 gap-8 pb-8">
          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              1. Register
            </h5>
            <p className="font-normal text-gray-700">
              Sign up now and become a part of the LautLestari community, where you can explore and purchase a wide variety of ornamental fish.
            </p>
          </div>

          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              2. Browse
            </h5>
            <p className="font-normal text-gray-700">
              Browse through our vast selection of rare and exotic ornamental fish to find the perfect addition to your aquarium.
            </p>
          </div>

          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              3. Enjoy
            </h5>
            <p className="font-normal text-gray-700">
              Enjoy your new aquarium inhabitants and immerse yourself in the relaxing world of fishkeeping with the support of our community.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
