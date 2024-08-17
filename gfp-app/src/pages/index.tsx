// Landing page
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ]

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 bg-gray-900 bg-scroll">
        <img
          src="./assets/bg-register.jpg"
          alt="Background"
          className="object-cover w-full blur-md opacity-50"
        />
      </div>
      {/* <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="./assets/logo.png"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm font-semibold leading-6 text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="./assets/logo.png"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header> */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Aquafish
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Find rare and exotic ornamental fish for your aquarium. Our trusted sellers offer top-quality freshwater and marine species. Join our community and enhance your underwater world today!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className='relative px-32'>
          <h2 className='font-bold text-3xl leading-8 text-gray-300 text-center'>ON SALE NOW</h2>
          <img src= './assets/koi2.jpg'
            alt='fishes'
            className='block ml-auto mr-auto w-6/12' />
          <a href='/fish/51' className='block ml-auto mr-auto text-xl font-bold w-6/12 text-center text-gray-300'>Koi Sanke - Buy Now</a>
        </div>
        <div className='relative mb-8 text-center mx-auto max-w-4xl'>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            At Aquafish, our mission is to seamlessly connect sellers and consumers of ornamental fish,
            making it easier to buy, sell, and discover a diverse range of aquatic life.
            We strive to create a trusted platform where hobbyists and enthusiasts can find healthy, ethically sourced fish with ease. By partnering with reputable breeders and sellers, we aim to simplify the search and purchase process, fostering a vibrant community dedicated to the beauty of fishkeeping.
          </p>
        </div>
      </section>

      <section>
        <div className='relative px-12 mb-4'>
          <h2 className="font-bold text-3xl leading-8 text-gray-300 text-center">
            Join us now! </h2>
        </div>
        
        <div className='relative flex flex-wrap justify-center px-12 gap-8 pb-8'>
          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">1. Register</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Register as Seller or Consumer</p>
          </div>
          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">2. List</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Make a list or search fish from the marketplace</p>
          </div>
          <div className="relative block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">3. Connect</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Connect to your seller or consumer to make a deal</p>
          </div>
        </div>
      </section>
    </main>
  );
}
