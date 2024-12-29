/**
 * Imports
 */
// Apollo
import { useQuery } from '@apollo/client';

// Constants
import { GET_BUDGET } from '@/constants/GraphQLQueries';

export default function BalanceDefault() {
  const { loading, error, data = 0 } = useQuery(GET_BUDGET);

  return (
    <div className="p-4 rounded-2xl mb-8 bg-[#FC9753]">
      <div className="text-sm font-bold font-mono mb-4">Available Budget</div>
      <div className="flex flex-row gap-2">
        {!loading && <div className="font-bold text-4xl">${data.getBudget}</div>}
        {/* @TODO: I need to add this later */}
        {/* <button className="uppercase text-sm self-end">Edit</button> */}
      </div>
    </div>
  );
}