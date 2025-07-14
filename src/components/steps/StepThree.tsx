import type { DataState } from './StepOne'

const StepThree = ({ handleNext, formData, updateFormData, errors, handleBack, getProgressPercentage }: DataState) => {
    return (
        <div className="bg-white max-w-md mx-auto">
            <div className="bg-[#00667F] text-white py-4">
                <h2 className="text-xl font-semibold text-center">Get a Free Bathtub Conversion Price Quote</h2>

            </div>

            <div className="mt-3 w-[94%] mx-auto px-4">
                <div className="flex justify-between text-xs mb-1">
                    <span>YOUR PROGRESS</span>
                    <span>{getProgressPercentage?.()}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                    <div
                        className="bg-[#00667F] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage?.()}%` }}
                    ></div>
                </div>
            </div>

            <div className="p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#00667F]">Congratulations!</h3>
                    <p className="text-gray-600 text-sm">We've got a bath remodel quote ready for you in Chicago!</p>
                    <p className="text-gray-600 text-sm">Enter your information to get your quote:</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00667F] ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) => updateFormData('lastName', e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00667F] ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Address"
                            value={formData.address}
                            onChange={(e) => updateFormData('address', e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00667F] ${errors.address ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="homeowner"
                            checked={formData.isHomeowner}
                            onChange={(e) => updateFormData('isHomeowner', e.target.checked)}
                            className="w-4 h-4 text-[#00667F] focus:ring-[#00667F] border-gray-300 rounded"
                        />
                        <label htmlFor="homeowner" className="text-gray-700">I'm a homeowner</label>
                    </div>

                    <div className="text-right">
                        <span className="text-[#00667F] text-sm cursor-pointer">Chicago, IL ✏️</span>
                    </div>

                    <div className="flex justify-between mt-2">
                        <button
                            onClick={handleBack}
                            className="flex-1 max-w-fit px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                        >
                            <img src="/arrow.png" className='w-4' alt="arrow" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="flex-1 bg-orange-400 hover:bg-orange-500  text-white font-semibold py-3 max-w-fit px-6 md:px-12 rounded-lg transition-colors flex items-center justify-center"
                        >
                            NEXT <span className="ml-2"> <img src="/arrow.png" className='w-4 rotate-180 invert' alt="arrow" /></span>
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 font-bold italic">Encrypted form, free and competitive quote</p>
                </div>
            </div>
        </div>
    )
}

export default StepThree
