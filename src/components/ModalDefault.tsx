interface ModalDefaultProps {
  children: React.ReactNode;
  isFull?: boolean;
  onCloseClick: () => void;
}

export default function ModalDefault ({ children, isFull = false, onCloseClick }: ModalDefaultProps) {
  const mainDefaultClasses = 'absolute bg-offWhite overflow-hidden u-slideUp';
  const mainShapeAndPositionClasses = isFull
    ? 'top-0 left-0 h-screen w-screen'
    : 'bottom-0 h-auto rounded-t-3xl';

  const mainClasses = mainDefaultClasses.concat(' ', mainShapeAndPositionClasses);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex justify-center p-0 sm:p-8 z-[100] items-center u-fadeIn"
      onClick={() => onCloseClick()}
    >
      <div
        className={mainClasses}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}