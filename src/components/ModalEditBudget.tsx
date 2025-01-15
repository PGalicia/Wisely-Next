/**
 * Imports
 */
// Components
import ModalDefault from "@/components/ModalDefault";
import ButtonDefault from "@/components/ButtonDefault";
import InputNumberController from "@/components/InputNumberController";

// React
import { useForm } from "react-hook-form";

// Redux
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeEditBudgetModal } from "@/redux/features/modalSlice";
import { setBudget } from '@/redux/features/wishlistSlice';

// Zod
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * Form type
 */
const schema = z.object({
  budget: z.string()
  .refine(value => /^[0-9]+(\.[0-9]+)?$/.test(value), {
    message: "Budget must be a valid positive number with optional decimal",
  }),
  percentage: z.string()
    .refine(value => /^[1-9][0-9]*$/.test(value), {
      message: "Budget must be a whole positive number without decimals",
    })
    .refine(value => {
      const numberValue = parseInt(value, 10);
      return numberValue >= 1 && numberValue <= 100;
    }, {
      message: "Budget must be between 1 and 100",
    })
});
type EditBudgetFormInputs = z.infer<typeof schema>;

export default function ModalEditBudget() {
  // State
  const budgetSelector = useSelector((state: RootState) => state.wishlistReducer.budget);

  // Hooks
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<EditBudgetFormInputs>({
    defaultValues: {
      budget: budgetSelector.toString(),
      percentage: '100'
    },
    resolver: zodResolver(schema),
  });

  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Methods
  function onCloseClick () {
    dispatch(closeEditBudgetModal());
  }

  // function onEditBudgetSubmit(data: EditBudgetFormInputs): SubmitHandler<EditBudgetFormInputs> {
  function onEditBudgetSubmit(data: EditBudgetFormInputs) {
    const { budget, percentage } = data;
    dispatch(setBudget(Number((Number(budget) * (Number(percentage) / 100)).toFixed(2))));
    onCloseClick();
  }

  return (
    <ModalDefault
      modalTitle="Set Budget 🏦"
      onCloseClick={() => onCloseClick()}
    >
      <form
        className="flex flex-col h-full justify-between max-w-[500px] w-screen md:min-w-[500px] px-4 pb-4"
        onSubmit={handleSubmit(onEditBudgetSubmit)} 
        noValidate
      >
        <InputNumberController
          label="Budget"
          register={register('budget')}
          isRequired={true}
          isErrorShowing={!!errors.budget}
          errorMessage={errors.budget?.message}
          extraClasses="mb-4"
        />

        <InputNumberController
          label="Percentage"
          register={register('percentage')}
          isRequired={true}
          isErrorShowing={!!errors.percentage}
          errorMessage={errors.percentage?.message}
          extraClasses="my-4"
        />

        <div className="pt-4 w-full flex flex-col md:flex-row-reverse gap-2 justify-between">
          <ButtonDefault
            buttonText="Cancel"
            onClick={() => onCloseClick()}
            isSecondary={true}
            extraClasses="grow"
          />
          <ButtonDefault
            buttonText="Confirm"
            extraProperties={{
              type: "submit"
            }}
            extraClasses="grow"
          />
        </div>
      </form>
    </ModalDefault>
  );
}