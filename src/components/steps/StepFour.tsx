import type { DataState } from "./StepOne"

const StepFour = ({ handlePhoneChange, formData, updateFormData, errors, handleBack, getProgressPercentage, handleSubmit }: DataState) => {
    return (
        <div className="bg-white max-w-md mx-auto">
            <div className="bg-[#00667F] text-white py-4">
                <h2 className="text-xl font-semibold text-center">Get a Free Bathtub Conversion Price Quote</h2>

            </div>
            <div className="mt-3 px-4 w-[94%] mx-auto">
                <div className="flex justify-between text-xs mb-1">
                    <span>YOUR PROGRESS</span>
                    <span>{getProgressPercentage?.()}%</span>
                </div>
                <div className="w-full bg-teal-400 rounded-full h-2">
                    <div
                        className="bg-[#00667F] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage?.()}%` }}
                    ></div>
                </div>
            </div>

            <div className="p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Last Step!</h3>
                    <p className="text-gray-600 text-sm">Let us know how best to contact you with pricing details:</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handlePhoneChange}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00667F] ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                            maxLength={14}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00667F] ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="flex justify-between mt-2">
                        <button
                            onClick={handleBack}
                            className="flex-1 max-w-fit px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                        >
                            <img src="/arrow.png" className='w-4' alt="" />
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 max-w-fit px-6 md:px-12 rounded-lg transition-colors flex items-center justify-center"
                        >
                            GET QUOTE <span className="ml-2"><img src="/arrow.png" className="w-4 invert rotate-180" alt="arrow" /></span>
                        </button>
                    </div>
                </div>

                <div className="mt-6 ">
                    <p className="text-sm text-center text-gray-600 italic">Encrypted form, free and competitive quote</p>
                    <p className="text-xs text-gray-500 mt-3">
                        By clicking "Get Quote", you authorize Jacuzzi or one of its dealers to make marketing calls and texts to the phone number provided for a free estimate and to keep you informed about bath remodeling products and services. You understand they may use auto-dialer, AI, SMS messages, artificial and prerecorded voice messages to contact you. There is no requirement to purchase services. Please see our Privacy Policy and QuintStreet's Terms of Use and be aware that all calls are recorded for quality and safety purposes.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StepFour
