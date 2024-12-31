/**
 * Prop typing
 */
interface BalanceDefaultProps {
  balance: number;
}

export default function BalanceDefault({ balance }: BalanceDefaultProps) {
  return (
    <div className="p-4 rounded-2xl mb-8 bg-[#FC9753]">
      <div className="text-sm font-bold font-mono mb-4">Available Budget</div>
      <div className="flex flex-row gap-2">
        <div className="font-bold text-4xl">${balance}</div>
        {/* @TODO: I need to add this later */}
        {/* <button className="uppercase text-sm self-end">Edit</button> */}
      </div>
    </div>
  );
}