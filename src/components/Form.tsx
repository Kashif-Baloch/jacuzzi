import React, { useState, useEffect, type JSX } from 'react';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import FinalStep from './steps/FinalStep';
import Loader from './loader/Loader';
import { WEBHOOK_URL } from '../utils/CONSTS';
import TagManager from 'react-gtm-module';

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

  // const HandleSubmit = async () => {
  //   setErrorMsg("");
  //   try {
  //     if (currentStep === 1 && fullName.length < 2) {
  //       setErrorMsg("לפחות 2 תווים");
  //       return;
  //     }

  //     if (currentStep === 5 && !regex.test(phoneNumber)) {
  //       setErrorMsg("אנא הזמן מספר תקין");
  //       return;
  //     }

  //     if (currentStep === 5 && !checkbox) {
  //       setErrorMsg("אנא אשר את התנאים");
  //       return;
  //     }

  //     setBtnLoading(true);

  //     if (currentStep === 5) {
  //       setIsLoading(true);

  //       const payload = {
  //         fullName,
  //         income,
  //         deficiencies,
  //         otherProblemsPatientSuffers,
  //         phoneNumber,
  //         createdAt,
  //         pageUrl: window.location.href,
  //       };
  //       console.log(payload);
  //       await fetch(WEBHOOK_URL, {
  //         method: "POST",
  //         body: JSON.stringify(payload),
  //       });
  //       TagManager.dataLayer({
  //         dataLayer: {
  //           event: `registration_complete_ashdod-law-tax`,
  //         },
  //       });
  //       localStorage.setItem(
  //         "formdata",
  //         JSON.stringify({
  //           fullName,
  //           income,
  //           deficiencies,
  //           phoneNumber,
  //           otherProblemsPatientSuffers,
  //           crime_record,
  //           createdAt,
  //           pageUrl: window.location.href,
  //         })
  //       );
  //       // setTimeout(() => {
  //       // }, 1000);
  //     } else {
  //       TagManager.dataLayer({
  //         dataLayer: {
  //           event: `step_${currentStep}_complete_ashdod-law-tax`,
  //         },
  //       });
  //     }
  //     setCurrentStep((prev) => prev + 1);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //     alert("something went wrong while sending data to api");
  //   } finally {
  //     setIsLoading(false);
  //     setBtnLoading(false);
  //   }
  // };

  const handleSubmit = async (): Promise<void> => {
    if (validateStep(4)) {
      // Clear saved data on successful submission
      try {
        // const payload = {
        //         fullName,
        //         income,
        //         deficiencies,
        //         otherProblemsPatientSuffers,
        //         phoneNumber,
        //         createdAt,
        //         pageUrl: window.location.href,
        //       };
        const payload = {
          zipCode: formData.zipCode,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          fullName: formData.firstName + " " + formData.lastName,
          address: formData.address,
          isHomeowner: formData.isHomeowner,
          projectType: formData.projectType,
          createdAt: new Date().toISOString(),
          pageUrl: window.location.href,
        };

        await fetch(WEBHOOK_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        TagManager.dataLayer({
          dataLayer: {
            event: `registration_complete_jacuzzi`,
          },
        });

        storage.setItem(STORAGE_KEY, '');
        storage.setItem(STEP_KEY, '1');
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
      } catch (error) {
        TagManager.dataLayer({
          dataLayer: {
            event: `registration_error_jacuzzi`,
          },
        });
        alert('Error submitting data');
        console.error('Error submitting data:', error);
      }

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
      <Loader />
      // <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      //   <div className="text-center">
      //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00667F] mx-auto"></div>
      //     <p className="mt-4 text-gray-600">Loading...</p>
      //   </div>
      // </div>
    );
  }

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
            {currentStep === 1 && <StepOne handleNext={handleNext} formData={formData} updateFormData={updateFormData} errors={errors} />}


            {currentStep === 2 && <StepTwo handleNext={handleNext} formData={formData} updateFormData={updateFormData} errors={errors} handleBack={handleBack} getProgressPercentage={getProgressPercentage} projectOptions={projectOptions} />}


            {currentStep === 3 && <StepThree handleNext={handleNext} formData={formData} updateFormData={updateFormData} errors={errors} handleBack={handleBack} getProgressPercentage={getProgressPercentage} />}


            {currentStep === 4 && <StepFour formData={formData} updateFormData={updateFormData} errors={errors} handleBack={handleBack} handlePhoneChange={handlePhoneChange} getProgressPercentage={getProgressPercentage} handleSubmit={handleSubmit} />}


            {currentStep === 5 && <FinalStep />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JacuzziForm;