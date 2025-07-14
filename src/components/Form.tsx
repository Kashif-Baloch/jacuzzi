import React, { useState, useEffect, type JSX } from 'react';

interface FormData {
  zipCode: string;
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  isHomeowner: boolean;
  projectType: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ProjectOption {
  id: string;
  label: string;
  selected: boolean;
}

const STORAGE_KEY = 'jacuzziFormData';
const STEP_KEY = 'jacuzziFormStep';

const JacuzziForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    zipCode: '',
    phoneNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    isHomeowner: false,
    projectType: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Storage utility with fallback for Claude environment
  const storage = {
    setItem: (key: string, value: string): void => {
      try {
        if (typeof window !== 'undefined') {
          // Try localStorage first
          if (window.localStorage) {
            window.localStorage.setItem(key, value);
            return;
          }
        }
        // Fallback to window object for Claude environment
        if (typeof window !== 'undefined') {
          (window as any)[key] = value;
        }
      } catch (error) {
        console.error('Storage error:', error);
        // Final fallback to window object
        if (typeof window !== 'undefined') {
          (window as any)[key] = value;
        }
      }
    },
    getItem: (key: string): string | null => {
      try {
        if (typeof window !== 'undefined') {
          // Try localStorage first
          if (window.localStorage) {
            return window.localStorage.getItem(key);
          }
        }
        // Fallback to window object for Claude environment
        if (typeof window !== 'undefined') {
          return (window as any)[key] || null;
        }
      } catch (error) {
        console.error('Storage error:', error);
        // Final fallback to window object
        if (typeof window !== 'undefined') {
          return (window as any)[key] || null;
        }
      }
      return null;
    }
  };

  // Load data from storage on component mount
  useEffect(() => {
    const loadSavedData = (): void => {
      try {
        // Load form data
        const savedDataString = storage.getItem(STORAGE_KEY);
        if (savedDataString) {
          const savedData: FormData = JSON.parse(savedDataString);
          setFormData(savedData);
        }

        // Load current step
        const savedStepString = storage.getItem(STEP_KEY);
        if (savedStepString) {
          const savedStep = parseInt(savedStepString, 10);
          if (savedStep >= 1 && savedStep <= 4) {
            setCurrentStep(savedStep);
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadSavedData();
  }, []);

  // Save form data whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving form data:', error);
      }
    }
  }, [formData, isLoaded]);

  // Save current step whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        storage.setItem(STEP_KEY, currentStep.toString());
      } catch (error) {
        console.error('Error saving current step:', error);
      }
    }
  }, [currentStep, isLoaded]);

  const updateFormData = (field: keyof FormData, value: string | boolean): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.zipCode.trim()) {
          newErrors.zipCode = 'ZIP Code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
          newErrors.zipCode = 'Please enter a valid ZIP Code';
        }
        break;

      case 4:
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phoneNumber.trim())) {
          newErrors.phoneNumber = 'Please enter a valid phone number';
        }

        if (!formData.email.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;

      case 3:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData.address.trim()) {
          newErrors.address = 'Address is required';
        }
        break;

      case 2:
        if (!formData.projectType) {
          newErrors.projectType = 'Please select a project type';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validateStep(currentStep)) {
      console.log("Inner");

      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = (): void => {
    setCurrentStep(prev => prev - 1);
  };

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatPhoneNumber(e.target.value);
    updateFormData('phoneNumber', formatted);
  };

  const getProgressPercentage = (): number => {
    switch (currentStep) {
      case 2: return 25;
      case 3: return 50;
      case 4: return 75;
      default: return 0;
    }
  };

  const handleSubmit = (): void => {
    if (validateStep(4)) {
      // Clear saved data on successful submission
      try {
        storage.setItem(STORAGE_KEY, '');
        storage.setItem(STEP_KEY, '1');
      } catch (error) {
        console.error('Error clearing saved data:', error);
      }

      alert('Form submitted successfully!');
      console.log('Form Data:', formData);

      // Reset form
      setFormData({
        zipCode: '',
        phoneNumber: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        isHomeowner: false,
        projectType: ''
      });
      setCurrentStep(5);
    }
  };

  const projectOptions: ProjectOption[] = [
    { id: 'bathtub-conversion', label: 'Bathtub to Shower Conversion', selected: true },
    { id: 'bath-shower-updates', label: 'Bath & Shower Updates', selected: false },
    { id: 'shower-enclosure', label: 'Shower Enclosure', selected: false },
    { id: 'walk-in-shower', label: 'Walk In Shower', selected: false },
    { id: 'low-threshold-shower', label: 'Low Threshold Shower', selected: false }
  ];

  // Show loading state until data is loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00667F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }


  const renderStep1 = (): JSX.Element => (
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
            className="w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-12 rounded-lg transition-colors flex items-center justify-center"
          >
            GO <span className="ml-2">→</span>
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
  );

  const renderStep4 = (): JSX.Element => (
    <div className="bg-white max-w-md mx-auto">
      <div className="bg-[#00667F] text-white py-4">
        <h2 className="text-xl font-semibold text-center">Get a Free Bathtub Conversion Price Quote</h2>

      </div>
      <div className="mt-3 px-4 w-[94%] mx-auto">
        <div className="flex justify-between text-xs mb-1">
          <span>YOUR PROGRESS</span>
          <span>{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-teal-400 rounded-full h-2">
          <div
            className="bg-[#00667F] h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
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
  );

  const renderStep3 = (): JSX.Element => (
    <div className="bg-white max-w-md mx-auto">
      <div className="bg-[#00667F] text-white py-4">
        <h2 className="text-xl font-semibold text-center">Get a Free Bathtub Conversion Price Quote</h2>

      </div>

      <div className="mt-3 w-[94%] mx-auto px-4">
        <div className="flex justify-between text-xs mb-1">
          <span>YOUR PROGRESS</span>
          <span>{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-teal-400 rounded-full h-2">
          <div
            className="bg-[#00667F] h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
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
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 max-w-fit px-6 md:px-12 rounded-lg transition-colors flex items-center justify-center"
            >
              NEXT <span className="ml-2"> <img src="/arrow.png" className='w-4 rotate-180 invert' alt="arrow" /></span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 italic">Encrypted form, free and competitive quote</p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = (): JSX.Element => (
    <div className="bg-white max-w-md mx-auto">
      <div className="bg-[#00667F] text-white py-4">
        <h2 className="text-lg font-semibold text-center">Get a Free Bathtub Conversion Price Quote</h2>
      </div>

      <div className="mt-3 w-[94%] mx-auto px-4">
        <div className="flex justify-between text-xs mb-1">
          <span>YOUR PROGRESS</span>
          <span>{getProgressPercentage()}%</span>
        </div>
        <div className="w-full bg-teal-400 rounded-full h-2">
          <div
            className="bg-[#00667F] h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-4">Tell us about the project you're working on:</h3>
        </div>

        <div className="space-y-3">
          {projectOptions.map((option, index) => (
            <div key={option.id} className="relative">
              <button
                onClick={() => updateFormData('projectType', option.id)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors flex items-center justify-between ${(formData.projectType === option.id || (index === 0 && !formData.projectType))
                  ? 'bg-[#00667F] text-white border-[#00667F]'
                  : 'bg-blue-50 text-gray-700 border-blue-200 hover:border-blue-300'
                  }`}
              >
                <span className="font-medium">{option.label}</span>
                {(formData.projectType === option.id || (index === 0 && !formData.projectType)) && (
                  <span className="text-white">✓</span>
                )}
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
            className="flex-1 max-w-fit px-6 md:px-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            NEXT <span className="ml-2"><img className="rotate-180 w-4 invert" src="/arrow.png" alt="arrow" /></span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep5 = (): JSX.Element => (
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

          <button className="mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center w-[60%] mx-auto">
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
  );


  return (
    <div className='mt-10'>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 justify-center">
          <div className="flex flex-col bg-white items-center h-[430px] w-[246px]">
            <img src="/women.png" alt="Women" />
            <h2 className='text-[25px] mt-2 text-[#00667F]'>Christina Haack</h2>
            <p className='text-sm text-gray-700'>Renovation Expert</p>
          </div>

          <div className="flex-1">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JacuzziForm;