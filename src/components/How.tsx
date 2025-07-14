const How = () => {
    return (
        <div className='container max-w-6xl px-10 text-sm mt-4 mx-auto'>
            <h2 className='text-2xl text-center mt-20'>How It Works</h2>
            <ul className="mt-12 flex items-center justify-center gap-8 lg:gap-36 flex-wrap">
                <li className="items-center gap-2 group relative flex lg:flex-col">
                    <span
                        className="hidden lg:block  absolute left-[28px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-[120px] lg:top-[28px] lg:h-[2px] lg:w-[calc(160%_-_72px)]"
                        aria-hidden="true"></span>
                    <div
                        className="w-14">
                        <img src="pass.png" alt="" />
                    </div>
                    <p>Get a Free Quote</p>
                </li>
                <li className="items-center gap-2 group relative flex lg:flex-col">
                    <span
                        className="hidden lg:block absolute left-[28px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-[120px] lg:top-[36px] lg:h-[2px] lg:w-[calc(160%_-_72px)]"
                        aria-hidden="true"></span>
                    <div
                        className="w-14">
                        <img src="calender.png" alt="" />
                    </div>
                    <p className="text-center w-[120px]">Installation in as Little as One Day</p>
                </li>
                <li className="items-center gap-2 group relative flex lg:flex-col">
                    <div
                        className="w-14">
                        <img src="heart.png" alt="" />
                    </div>
                    <p>Installation</p>
                </li>
            </ul>
        </div>
    )
}

export default How
