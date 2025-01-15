/**
 * Imports
 */
// Components
import ModalDeleteConfirmation from "@/components/ModalDeleteConfirmation";
import ModalAddEditItem from "@/components/ModalAddEditItem";
import ModalEditBudget from "@/components/ModalEditBudget";

// Redux
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function ModalCollection() {
  const isDeleteConfirmationModalActive = useSelector((state: RootState) => state.modalReducer.isDeleteConfirmationModalActive);
  const isAddItemModalActive = useSelector((state: RootState) => state.modalReducer.isAddItemModalActive);
  const isEditBudgetModalActive = useSelector((state: RootState) => state.modalReducer.isEditBudgetModalActive);

  return (
    <>
      {/* Modals */}
      {isDeleteConfirmationModalActive && <ModalDeleteConfirmation />}
      {isAddItemModalActive && <ModalAddEditItem />}
      {isEditBudgetModalActive && <ModalEditBudget />}
    </>
  )
}