export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 bg-gray-900 bg-scroll">
        <img
          src="./assets/bg-register.jpg"
          alt="Background"
          className="object-cover w-full blur-md opacity-50"
        />
      </div>
      
      <div className="relative isolate px-6 pt-14 lg:px-8">
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
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="/fishcare"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Fishcare
              </a>
            </div>
          </div>
        </div>
      </div>
      <section className="px-4 sm:px-8 lg:px-32">
        <div className="relative text-center">
          <h2 id="on-sale" className="font-bold text-2xl sm:text-3xl leading-8 text-gray-300">
            ON SALE NOW
          </h2>
          <img
            src="./assets/koi2.jpg"
            alt="fishes"
            className="block mx-auto my-4 w-8/12 sm:w-6/12 lg:w-4/12"
          />
          <a
            href="/fish/51"
            className="block mx-auto text-lg sm:text-xl font-bold w-8/12 sm:w-6/12 lg:w-4/12 text-center text-gray-300"
          >
            Koi Sanke - Buy Now
          </a>
        </div>
        <div className="relative mb-8 text-center mx-auto max-w-full sm:max-w-4xl px-4">
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-300">
            At Aquafish, our mission is to seamlessly connect sellers and consumers of ornamental fish, making it easier to buy, sell, and discover a diverse range of aquatic life. We strive to create a trusted platform where hobbyists and enthusiasts can find healthy, ethically sourced fish with ease. By partnering with reputable breeders and sellers, we aim to simplify the search and purchase process, fostering a vibrant community dedicated to the beauty of fishkeeping.
          </p>
        </div>
      </section>
      
      <section className="relative bg-gray-800 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Learn How to Care for Your Fish</h2>
          <p className="mt-4 text-lg text-gray-300">
            Discover expert tips and guidelines on keeping your ornamental fish healthy and thriving.
          </p>
          <div className="mt-8">
            <a
              href="/fishcarepage"
              className="inline-block rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Visit Fishcare Page
            </a>
          </div>
        </div>
      </section>
      
      <section>
        <div className="relative px-12 mb-4">
          <h2 className="font-bold text-3xl leading-8 text-gray-300 text-center">
            Join us now!
          </h2>
        </div>
        <div className="relative flex flex-wrap justify-center px-12 gap-8 pb-8">
          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              1. Register
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Sign up now and become a part of the Aquafish community, where you can explore and purchase a wide variety of ornamental fish.
            </p>
          </div>

          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              2. Browse
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Browse through our vast selection of rare and exotic ornamental fish to find the perfect addition to your aquarium.
            </p>
          </div>

          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              3. Enjoy
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Enjoy your new aquarium inhabitants and immerse yourself in the relaxing world of fishkeeping with the support of our community.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
