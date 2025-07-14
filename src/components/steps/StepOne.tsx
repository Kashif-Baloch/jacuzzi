export interface DataState {
    handleNext?: () => void;
    formData: any;
    updateFormData: any;
    errors: any;
    handleBack?: () => void;
    getProgressPercentage?: () => number | undefined;
    handleSubmit?: () => void;
    handlePhoneChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    projectOptions?: any;
    validatePhoneNumber?: (value: string) => any;
}


const StepOne = ({ handleNext, formData, updateFormData, errors }: DataState) => {
    return (
        <div className="bg-white max-w-lg mx-auto">
            <div className="bg-[#00667F] text-white text-center py-4 px-8">
                <h2 className="text-lg">Get a Free Bathtub Conversion Price Quote</h2>
            </div>

            <div className="p-8">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-2">Enter your ZIP Code</h3>
                </div>

                <div className="space-y-4 flex items-center justify-center flex-col">
                    <div>
                        <input
                            type="text"
                            placeholder="ZIP Code"
                            value={formData.zipCode}
                            onChange={(e) => updateFormData('zipCode', e.target.value)}
                            className={`p-3 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00667F] ${errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                }`}
                            maxLength={10}
                        />
                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-auto bg-orange-400 hover:bg-orange-500  text-white font-semibold py-3 px-12 rounded-lg transition-colors flex items-center justify-center"
                    >
                        GO <span className="ml-2">
                            <img src="arrow.png" className="w-4 rotate-180 invert" alt="" />
                        </span>
                    </button>
                </div>

                <div className="mt-6 text-center border-t border-gray-300">
                    <div className="p-4 rounded-lg">
                        <p className="text-2xl text-gray-800">Waiving All Installation Costs*</p>
                        <div className="bg-[#00667F] text-white text-xs px-2 py-[1px] rounded-full mt-1 inline-block">PLUS</div>
                        <p className="text-sm font-[500] text-gray-600 mt-2">No Interest and No Payments for up to 1 Year*</p>
                        <p className="text-xs text-gray-500 mt-1">*If paid in full by end of 12 months</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepOne
