/**
 * Imports
 */
// Components
import { ExclamationTriangleIcon } from '@heroicons/react/16/solid';

interface InputErrorProps {
  message?: string;
} 

export default function InputError({ message = '' }: InputErrorProps) {
  // Methods
  function getErrorMessage() {
    return message || 'This is required';
  }

  return (
    <div className="absolute text-xs mt-1 right-0 text-red-500"><ExclamationTriangleIcon className="size-3 inline-block mr-1" />{getErrorMessage()}</div>
  )
}