/**
 * Imports
 */
// Components
import { PlusIcon } from '@heroicons/react/16/solid';

/**
 * Props typing
 */
interface ButtonAddProps {
  buttonText: string;
  onClick: () => void;
}

export default function ButtonAdd({ buttonText, onClick }: ButtonAddProps) {
  return (
    <button
      className="fixed bottom-12 right-8 bg-purpleAccent font-bold p-4 rounded-2xl flex gap-2 items-center z-50"
      onClick={onClick}
    >
      <span>{buttonText}</span>
      <PlusIcon className="size-5" />
    </button>
  );
}