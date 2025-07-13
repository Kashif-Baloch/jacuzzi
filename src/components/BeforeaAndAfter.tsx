const BeforeAndAfter = () => {
    return (
        <div className="p-12">
            <div className='mt-14 container max-w-6xl px-4 mx-auto'>
                <h2 className="text-[#00667f] text-center text-2xl my-6">Before and After</h2>
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <div className='max-w-xl border border-[#00667F]'>
                            <img className='h-[400px] w-full object-cover' src="ba1.webp" alt="" />
                            <h2 className='bg-[#00667f] text-white p-2'>Shower Remodel</h2>
                            <p className='text-sm p-3'>
                                In addition to being a safe alternative to tubs, our shower conversion products are also extremely durable and attractive. We only use 100 percent acrylic that is built to last, and we also offer anti-microbial protection, which helps keep your shower clean by resisting mold and mildew.
                            </p>
                            <p className='p-3 font-thin text-sm'>*Not actual before and after depiction</p>
                        </div>
                        <div className='max-w-xl border border-[#00667F]'>
                            <img className='h-[400px] w-full object-cover' src="ba2.webp" alt="" />
                            <h2 className='bg-[#00667f] text-white p-2'>Bathtub Remodel</h2>
                            <p className='text-sm p-3'>
                                If your tub is showing its age or no longer reflects your current sense of style, you owe it to yourself to invest in an upgrade. We specialize in designing, manufacturing, and remodeling bathtubs and we can provide you with a new option you'll love. In only a day, you can begin to enjoy your bathtub remodel, with a tub that looks and feels like brand new.
                            </p>
                            <p className='p-3 font-thin text-sm'>*Not actual before and after depiction</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeforeAndAfter
