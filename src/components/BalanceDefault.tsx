/**
 * Imports
 */
// Components
import { PencilSquareIcon } from '@heroicons/react/24/outline';

// Redux
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { openEditBudgetModal } from '@/redux/features/modalSlice';

/**
 * Prop typing
 */
interface BalanceDefaultProps {
  balance: number;
}

export default function BalanceDefault({ balance }: BalanceDefaultProps) {
  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="p-4 rounded-2xl mb-8 bg-[#FC9753] relative">
      {/* Title */}
      <div className="text-sm uppercase font-mono">Available Budget</div>

      {/* Edit budget button */}
      <button
        className=" absolute top-4 right-4 w-4 aspect-square border border-black bg-white rounded-md p-2 box-content transition-colors hover:bg-white/50"
        onClick={() => dispatch(openEditBudgetModal())}
      >
        <PencilSquareIcon className="size-5" />
      </button>

      {/* Balance */}
      <div className="font-bold text-5xl">${balance}</div>
    </div>
  );
}