/**
 * Props typing
 */
interface ButtonDefaultProps {
    buttonText: string;
    onClick: () => void;
    extraClasses?: string;
    isSecondary?: boolean;
    isDisabled?: boolean;
  }
  
  export default function ButtonDefault ({ buttonText, onClick, isSecondary = false, isDisabled = false, extraClasses = '' }: ButtonDefaultProps) {
    // Adjust button classes based on if secondary or disabled
    const backgroundColor = isSecondary ? 'bg-white' : 'bg-lightGray';
    const borderClasses = 'border-2 border-lightGray';
    const textColor = isSecondary ? 'text-lightGray' : 'text-white';
    const hoverColor = isSecondary
      ? 'hover:bg-lightGray hover:text-white'
      : 'hover:bg-white hover:text-lightGray';
    const defaultClasses = 'text-center p-2 rounded font-bold transition-colors';
  
    const buttonClasses = isDisabled
      ? `bg-gray-300 text-gray-500 border-2 border-gray-300 cursor-not-allowed ${defaultClasses}`
      : `${backgroundColor} ${borderClasses} ${textColor} ${defaultClasses} ${hoverColor}`;
  
    return (
      <button
        className={`${buttonClasses} ${extraClasses}`}
        disabled={isDisabled}
        onClick={onClick}
      >
        {buttonText}
      </button>
    );
  }