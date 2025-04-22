import React from 'react';

export const About = () => {
  return (
    <section className="overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="relative mb-32">
          <div className="hidden lg:block absolute top-0 left-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" fill="none">
              <path
                d="M0.5 498.311V304.054C0.5 136.406 136.406 0.5 304.054 0.5H498.311C498.967 0.5 499.5 1.03289 499.5 1.68919V136.561C499.5 137.217 498.967 137.75 498.311 137.75H342.061C290.59 137.75 239.516 163.123 201.319 201.319C163.123 239.516 137.75 290.59 137.75 342.061V498.311C137.75 498.967 137.217 499.5 136.561 499.5H1.68919C1.03249 499.5 0.5 498.967 0.5 498.311Z"
                fill="url(#paint0_linear_231_9230)" stroke="#F0F0F0"
              />
              <defs>
                <linearGradient id="paint0_linear_231_9230" x1="0" y1="500" x2="500" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F8F8F8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="hidden lg:block absolute top-0 right-12">
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500" fill="none">
              <path
                d="M499.5 1.68919V195.946C499.5 363.594 363.594 499.5 195.946 499.5H1.68919C1.03289 499.5 0.5 498.967 0.5 498.311V363.439C0.5 362.783 1.03289 362.25 1.68919 362.25H157.939C209.41 362.25 260.484 336.877 298.681 298.681C336.877 260.484 362.25 209.41 362.25 157.939V1.68919C362.25 1.03289 362.783 0.5 363.439 0.5H498.311C498.967 0.5 499.5 1.03289 499.5 1.68919Z"
                fill="url(#paint0_linear_231_9229)" stroke="#F0F0F0"
              />
              <defs>
                <linearGradient id="paint0_linear_231_9229" x1="499.998" y1="0" x2="8.49831" y2="500" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F8F8F8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10">
            <h1 className="text-center text-5xl lg:text-7xl font-bold font-heading max-w-lg lg:max-w-3xl mx-auto pt-14 pb-32">
              On a mission to make trading fun
            </h1>
            <div className="border border-gray-200 bg-white rounded-3xl flex flex-wrap">
              {[
                { label: 'Founded', value: '2023' },
                { label: 'Total funding', value: '$9.6M' },
                { label: 'Team members', value: '110' },
                { label: 'Nationalities', value: '24' },
              ].map((item, idx) => (
                <div key={idx} className="w-full md:w-1/2 lg:w-1/4 py-8">
                  <div className={`px-12 ${idx !== 3 ? 'md:border-r lg:border-r border-gray-200' : ''}`}>
                    <p className="text-gray-600 mb-2 text-center">{item.label}</p>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-center">{item.value}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-4xl lg:text-5xl font-semibold text-center mb-14">
          Dedicated to Infusing Joy into Education
        </h2>

        <div className="flex flex-wrap mb-32 -mx-4">
          <div className="w-full lg:w-1/2 p-4">
            <p className="text-gray-600 text-lg">
              We are driven to transform the landscape of learning into a captivating journey of excitement and discovery. Our aim is to infuse every educational experience with the essence of joy.
            </p>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <p className="text-gray-600 text-lg">
              Guided by our fervent belief in the power of education, we weave a tapestry of dynamic interactions that seamlessly blend technology, interactivity, and meaningful human connections.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap mb-32 -mx-8">
          <div className="w-full lg:w-1/2 px-8">
            <h2 className="text-3xl lg:text-5xl font-bold font-heading mb-20 max-w-xs lg:max-w-lg">
              A company with values
            </h2>
            {/* Uncomment and add image paths if needed */}
            {/* <img className="rounded-3xl mb-8 w-full lg:w-auto" src="..." alt="" /> */}
          </div>
          <div className="w-full lg:w-1/2 px-8">
            <p className="text-gray-600 text-lg mb-6">
              Diversity, inclusion, and belonging are fundamental to our success. We believe the best solutions occur when a plurality of backgrounds, experiences, and identities work together.
            </p>
            <div className="flex flex-col gap-2 mb-14">
              <div className="flex items-center flex-wrap gap-3">
                <div className="w-4 h-4 rounded-full bg-orange-500 border border-orange-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12.4733 4.8067C12.4114 4.74421 12.3376 4.69461 12.2564 4.66077..."
                      fill="white"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Inclusive culture</span>
              </div>
              {/* Add more values as needed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
