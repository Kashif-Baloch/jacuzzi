import JacuzziForm from "./Form"

const Hero = () => {
    return (
        <section className="relative bg-[url('hero.png')] bg-no-repeat bg-cover z-10 pb-14">
            <div className="container flex items-center justify-center flex-col max-w-6xl mx-auto px-4">
                <div className="mt-7">
                    <img className="w-[200px]" src="logo.webp" alt="logo" />
                </div>
                <div className="mt-16">
                    <h1 className="text-4xl uppercase font-thin">Your bathroom project</h1>
                    <h2 className="text-4xl uppercase font mt-2">starts here</h2>
                    <p className="text-2xl mt-4">Just answer a few questions to get started.</p>
                </div>
                {/* <JacuzziForm /> */}
                <JacuzziForm />
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-t from-transparent to-white opacity-100"></div>
        </section>
    )
}

export default Hero
