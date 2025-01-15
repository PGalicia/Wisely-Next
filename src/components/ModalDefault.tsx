/**
 * Imports
 */
// Components
import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Props typing
 */
interface ModalDefaultProps {
  children: React.ReactNode;
  onCloseClick: () => void;
  isFull?: boolean;
  modalTitle?: string;
  extraClassesTitle?: string;
}

export default function ModalDefault({
  children,
  isFull = false,
  onCloseClick,
  modalTitle = '',
  extraClassesTitle = ''
}: ModalDefaultProps) {
  const extraContainerClasses = isFull ? '' : 'backdrop-blur';
  const mainDefaultClasses = 'absolute bg-offWhite overflow-hidden u-slideUp';
  const mainShapeAndPositionClasses = isFull
    ? 'top-0 left-0 h-screen w-screen'
    : 'bottom-0 md:bottom-auto h-auto rounded-t-3xl md:rounded-3xl';

  const mainClasses = mainDefaultClasses.concat(' ', mainShapeAndPositionClasses);

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex justify-center p-0 sm:p-8 z-[100] items-center u-fadeIn ${extraContainerClasses}`}
      onClick={onCloseClick}
    >
      <div
        className={mainClasses}
        onClick={e => e.stopPropagation()}
      >
        {modalTitle &&
          <div className={`flex justify-between p-4 ${extraClassesTitle}`}>
            <div className="text-2xl font-bold">{modalTitle}</div>
            <button
              className="w-4 aspect-square border border-black bg-white rounded-md p-2 box-content transition-colors hover:bg-black/10"
              onClick={onCloseClick}
            >
              <XMarkIcon />
            </button>
          </div>
        }

        {children}
      </div>
    </div>
  )
}