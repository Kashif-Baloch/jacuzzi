const Banner = () => {
    return (
        <div className='container max-w-6xl px-4 mx-auto'>
            <section className="text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div
                        className="lg:flex-grow md:w-1/2 lg:pr-16 text-sm md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-xl text-2xl mb-4 font-medium text-gray-900">Bathroom Remodeling by Jacuzzi Bath Remodel
                        </h1>
                        <p className="mb-8 leading-relaxed">
                            Showers from Jacuzzi Bath Remodel offer a number of unique benefits and a level of individualization that is second to none. Whether you're looking to replace a cracked or outdated shower or the time has come to replace your bathtub with a safer, easier to use and maintain shower, we can help. Our custom-manufactured showers are available in a wide range of colors and patterns and feature a number of different accessories and fixtures, allowing you to design a shower that will meet your needs and complement the decor of your bathroom.
                        </p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg">Get Your Free Quote Now
                            </button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src="/ban.webp" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner
