import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="flex items-start w-full mb-8">
      {steps.map((step, index) => {
        const stepIndex = index + 1;
        const isActive = stepIndex === currentStep;
        const isCompleted = stepIndex < currentStep;

        return (
          <div key={step} className="flex items-center w-full">
            <div className="flex flex-col items-center text-center w-20">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                  isCompleted ? 'bg-blue-600 border-blue-600 text-white' : '',
                  isActive ? 'border-blue-600 scale-110' : 'border-gray-300',
                )}
              >
                {isCompleted ? <Check className="w-6 h-6" /> : <span className={cn(isActive && "font-bold text-blue-600")}>{stepIndex}</span>}
              </div>
              <p className={cn('text-xs mt-2', isActive ? 'font-semibold text-blue-600' : 'text-gray-500')}>
                {step}
              </p>
            </div>
            {stepIndex < steps.length && (
              <div className={cn('flex-auto border-t-2 transition-colors duration-500 mt-5', isCompleted ? 'border-blue-600' : 'border-gray-300')} />
            )}
          </div>
        );
      })}
    </div>
  );
};