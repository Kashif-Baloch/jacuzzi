import { useState } from "react"
import Banner from "./Banner"
import BeforeAndAfter from "./BeforeaAndAfter"
import Latest from "./Latest"

const Services = () => {
    const [showMore, setShowMore] = useState(false)
    return (
        <div className='mt-10'>
            <div className='container max-w-6xl px-4 mx-auto'>
                <div className='flex shadow-custom justify-center items-center'>
                    <h2 onClick={() => setShowMore(!showMore)} className='font-thin rounded-tl-lg rounded-tr-lg bg-[#f6f6f6] w-fit text-center justify-center items-center flex mt-20 text-[#00667f] p-3 cursor-pointer'>Show More
                        <span className={`ml-2 ${showMore ? 'rotate-180' : ''} transition-all duration-300`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    </h2>
                </div>

            </div>
            {showMore && <div>
                <Banner />
                <Latest />
                <BeforeAndAfter />
            </div>}
        </div>
    )
}

export default Services
