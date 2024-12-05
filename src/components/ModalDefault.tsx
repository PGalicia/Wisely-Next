interface ModalDefaultProps {
  children: React.ReactNode;
  name: string;
  onCloseClick: () => void;
}

export default function ModalDefault ({ name, children, onCloseClick }: ModalDefaultProps) {
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/30 flex justify-center p-0 sm:p-8 z-[100] items-center"
      onClick={() => onCloseClick()}
    >
      {/* <div
        className="min-w-auto md:min-w-[500px] flex flex-col relative h-full md:h-fit overflow-hidden bg-white text-black w-full sm:w-auto border-lightGray border-4"
        onClick={e => e.stopPropagation()}
      > */}
      <div
        className="absolute bottom-0 h-auto bg-white rounded-t-3xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        {/* <div className="bg-secondary border-b-4 border-solid border-lightGray py-2 px-4 flex justify-between"> */}
        {/* <div className="pt-4 px-4 flex justify-between">
          <div className="font-mono uppercase font-bold text-base">
            {name}
          </div>

          <div
            className="w-8 cursor-pointer hover:text-white text-right"
            onClick={() => onCloseClick()}
          >
            x
          </div>
        </div> */}

        {children}
      </div>
    </div>
  )
}