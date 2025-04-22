import React from 'react'

export const Hero = () => {
  return (
    <section x-data="{ mobileNavOpen: false }" className="relative pb-20 overflow-hidden">
    <img className="absolute top-0 right-0 w-52 md:w-auto" src="saturn-assets/images/headers/star-background-header.png" alt=""/>
    <img className="absolute top-0 right-0 mt-10 mr-10" src="saturn-assets/images/headers/light-orange-blue-1.png" alt=""/>
    <img className="absolute top-0 right-0 mt-64 sm:mt-80 lg:mt-64 w-2/5 animate-moveHand" src="saturn-assets/images/headers/robot-hand-header.png" alt=""/>
    <nav className="relative py-6 mb-12 md:mb-20 bg-transparent">
      <div className="container px-4 mx-auto">
        <div className="flex items-center">
          <a className="inline-block text-lg font-bold" href="#">
            <img className="h-10" src="saturn-assets/logos/logo-saturn-dark.svg" alt="" width="auto"/>
          </a>
          <div className="lg:hidden ml-auto">
            <button x-on:click="mobileNavOpen = !mobileNavOpen" className="flex w-12 h-12 items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200">
              <svg width="24" height="24" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M3 6H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M3 18H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
    <div className="relative container px-4 mx-auto">
      <div className="max-w-xl xl:max-w-4xl">
        <h1 className="font-heading text-5xl xs:text-6xl md:text-8xl xl:text-10xl font-bold text-gray-900 mb-8 sm:mb-14">
          <span>World Best Crypto Startup</span>
          <span className="font-serif italic">Ever</span>
        </h1>
        <div className="md:flex mb-14 max-w-xs sm:max-w-sm md:max-w-none">
          <div className="mb-6 md:mb-0 md:mr-8 pt-3">
            <svg width="84" height="10" viewbox="0 0 84 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75L1 4.25ZM84 5.00001L76.5 0.669879L76.5 9.33013L84 5.00001ZM1 5.75L77.25 5.75001L77.25 4.25001L1 4.25L1 5.75Z" fill="#1E254C"></path>
            </svg>
          </div>
          <div className="max-w-md">
            <p className="md:text-xl text-gray-900 font-semibold">Saturn is a startup that's making the world a better place! We've been working on our mission since 2025</p>
          </div>
        </div>
        <a className="relative group inline-block w-full sm:w-auto py-4 px-6 mb-24 text-white font-semibold rounded-md bg-orange-900 overflow-hidden" href="#">
          <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
          <div className="relative flex items-center justify-center">
            <span className="mr-4">Meet The Expert</span>
            <span>
              <svg width="8" height="12" viewbox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.83 5.29L2.59 1.05C2.49704 0.956274 2.38644 0.881879 2.26458 0.83111C2.14272 0.780342 2.01202 0.754204 1.88 0.754204C1.74799 0.754204 1.61729 0.780342 1.49543 0.83111C1.37357 0.881879 1.26297 0.956274 1.17 1.05C0.983753 1.23736 0.879211 1.49082 0.879211 1.755C0.879211 2.01919 0.983753 2.27264 1.17 2.46L4.71 6L1.17 9.54C0.983753 9.72736 0.879211 9.98082 0.879211 10.245C0.879211 10.5092 0.983753 10.7626 1.17 10.95C1.26344 11.0427 1.37426 11.116 1.4961 11.1658C1.61794 11.2155 1.7484 11.2408 1.88 11.24C2.01161 11.2408 2.14207 11.2155 2.26391 11.1658C2.38575 11.116 2.49656 11.0427 2.59 10.95L6.83 6.71C6.92373 6.61704 6.99813 6.50644 7.04889 6.38458C7.09966 6.26272 7.1258 6.13201 7.1258 6C7.1258 5.86799 7.09966 5.73728 7.04889 5.61543C6.99813 5.49357 6.92373 5.38297 6.83 5.29Z" fill="#FFF2EE"></path>
              </svg>
            </span>
          </div>
        </a>
      </div>
  
    </div>
    <div className="hidden fixed top-0 left-0 bottom-0 w-5/6 max-w-md z-50">
      <div x-on:click="mobileNavOpen = !mobileNavOpen" className="fixed inset-0 bg-gray-800 opacity-25"></div>
      <nav className="relative flex flex-col py-6 px-10 w-full h-full bg-white border-r overflow-y-auto">
        <div className="flex items-center mb-16">
          <a className="mr-auto text-2xl font-medium leading-none" href="#">
            <img className="h-10" src="saturn-assets/logos/logo-saturn-dark.svg" alt="" width="auto"/>
          </a>
          <button x-on:click="mobileNavOpen = !mobileNavOpen">
            <svg className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
      </nav>
    </div>
  </section>
  )
}
