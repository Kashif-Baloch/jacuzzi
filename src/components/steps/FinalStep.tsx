const FinalStep = () => {
    return (
        <div>
            <div className="bg-white max-w-lg mx-auto">
                <div className="bg-[#00667F] text-white text-center py-4 px-8">
                    <h2 className="text-lg">Get a Free Bathtub Conversion Price Quote</h2>
                </div>

                <div className="p-8">
                    <div className="text-center mb-6">
                        <h1 className='font-semibold text-2xl'>
                            Welcome Back
                        </h1>
                        <p className='text-gray-700 mt-5 w-[60%] mx-auto'>
                            It looks like you just submitted your information a moment ago.
                        </p>

                        <button className="mt-5 bg-orange-400 hover:bg-orange-500  text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center w-[60%] mx-auto">
                            See Your Matches
                        </button>
                    </div>

                    <div className="mt-6 text-center border-t border-gray-300">
                        <div className="p-4 rounded-lg">
                            <p className="text-2xl text-gray-800">Waiving All Installation Costs*</p>
                            <div className="bg-blue-600 text-white text-xs px-2 py-[2px] rounded-full mt-1 inline-block">PLUS</div>
                            <p className="text-sm text-gray-600 mt-2">No Interest and No Payments for up to 1 Year*</p>
                            <p className="text-xs text-gray-500 mt-1">*If paid in full by end of 12 months</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalStep
