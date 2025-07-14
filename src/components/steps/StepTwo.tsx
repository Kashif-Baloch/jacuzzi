import type { DataState } from './StepOne'

const StepTwo = ({ handleNext, formData, updateFormData, errors, handleBack, getProgressPercentage, projectOptions }: DataState) => {
    return (
        <div className="bg-white max-w-md mx-auto">
            <div className="bg-[#00667F] text-white py-4">
                <h2 className="text-lg font-semibold text-center">Get a Free Bathtub Conversion Price Quote</h2>
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
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-4">Tell us about the project you're working on:</h3>
                </div>

                <div className="space-y-3">
                    {projectOptions?.map((option: any, index: any) => (
                        <div key={option.id} className="relative">
                            <button
                                onClick={() => updateFormData('projectType', option.id)}
                                className={`w-full p-4 text-left rounded-lg border-2 transition-colors flex items-center gap-4 ${(formData.projectType === option.id || (index === 0 && !formData.projectType))
                                    ? 'bg-[#00667F] text-white border-[#00667F]'
                                    : 'bg-blue-50 text-gray-700 border-blue-200 hover:border-blue-300'
                                    }`}
                            >
                                {(formData.projectType === option.id || (index === 0 && !formData.projectType)) ? (
                                    <span className="text-white">✓</span>
                                ) :
                                    (
                                        <span className="border border-[#00667F] rounded-full w-3 h-3 flex items-center justify-center">
                                        </span>
                                    )
                                }
                                <span className="font-medium">{option.label}</span>
                            </button>
                        </div>
                    ))}

                    {errors.projectType && <p className="text-red-500 text-sm mt-2">{errors.projectType}</p>}
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleBack}
                        className="flex-1 max-w-fit bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <img className="w-4" src="/arrow.png" alt="arrow" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-1 max-w-fit px-6 md:px-12 bg-orange-400 hover:bg-orange-500  text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                    >
                        NEXT <span className="ml-2"><img className="rotate-180 w-4 invert" src="/arrow.png" alt="arrow" /></span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StepTwo
