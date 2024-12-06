export default function getInputErrorClasses(isErrorShowingItemName: boolean) {
  return isErrorShowingItemName
    ? 'border-red-500 u-shake'
    : 'border-slate-300';
}