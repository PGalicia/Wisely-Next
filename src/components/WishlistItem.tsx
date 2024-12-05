/**
 * Imports
 */
// React
import { useRef, useState, useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { openDeleteConfirmationModal } from '@/redux/features/modalSlice';

// Types
import type { WislistType } from '@/types/WishlistType';
import type { AppDispatch } from '@/redux/store';

interface PriorityPillProps {
  priority: number
}

function PriorityPill({ priority }: PriorityPillProps) {
  if (priority < 0 || priority > 5) {
    throw new Error('Priority must be between 1 and 5');
  }

  function determinePriorityColor(): string {
    if (priority === 3) {
      return '#F6BB54';
    } else if (priority > 3) {
      return '#FFAFAF';
    } else {
      return '#5CD66A';
    }
  }

  function determinePriorityText(): string {
    switch (priority) {
      case 1:
        return 'Low';
      case 2:
        return 'Moderately Low';
      case 4:
        return 'Moderately High';
      case 5:
        return 'High';
      default:
        return 'Medium';
    }
  }

  return (
    <div
      className="rounded-full bg-red-500 w-fit px-2 py-1 text-xs mt-4"
      style={{
        backgroundColor: determinePriorityColor()
      }}
    >{determinePriorityText()}</div>
  );
}

interface CircularProgressBarProps {
  percentage: number
}

function CircularProgressBar({ percentage }: CircularProgressBarProps) {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Priority must be between 1 and 100');
  }

  // Circular progress bar calculations
  const progressBarSize = 60;
  const halfSize = progressBarSize / 2;
  const strokeWidth = 6;
  const radius = (progressBarSize - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (percentage * circumference) / 100;

  // Progress bar percentage
  const progressPercentage = {
    // I need to include transformOrigin here due to it not working if I include it via className
    transformOrigin: `${halfSize}px ${halfSize}px`,
    strokeDasharray: `${dash} ${circumference - dash}`
  } as React.CSSProperties;

  // Default circle properties
  const defaultCircleProperties: React.SVGProps<SVGCircleElement> = {
    cx: halfSize,
    cy: halfSize,
    strokeWidth: strokeWidth,
    r: radius,
    fill: 'none',
    strokeLinecap: 'round'
  };

  const containerSize = {
    width: `${progressBarSize}px`,
    height: `${progressBarSize}px`
  }

  function determineProgressBarColor(): string {
    if (percentage === 100) {
      return '#5CD66A';
    } else if (percentage < 100 && 20 < percentage) {
      return '#F6BB54';
    } else {
      return '#FFAFAF';
    }
  }

  return (
    <div className="relative self-center" style={containerSize}>
      <svg
        width={progressBarSize} height={progressBarSize} viewBox={`0 0 ${progressBarSize} ${progressBarSize}`}
        className="circular-progress"
      >
        <circle {...defaultCircleProperties} stroke="#ddd"></circle>
        {percentage > 0 &&
          <circle
            {...defaultCircleProperties}
            stroke={determineProgressBarColor()}
            className="fg transition-all -rotate-90"
            style={progressPercentage}
          ></circle>
        }
      </svg>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-xs">{percentage}%</div>
    </div>
  );
}

interface WishlistItemProp {
  wishlist: WislistType
}

export default function WishlistItem({ wishlist }: WishlistItemProp) {
  // States
  const [isExtraShowing, setIsExtraShowing] = useState(false);
  const [poppableHeight, setPoppableHeight] = useState<number>(0);

  // Dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Ref
  const poppableRef = useRef<HTMLDivElement>(null);

  // Use effect
  useEffect(() => {
    // Set the height - this is to make sure that the module is popping up on the right spot
    if (poppableRef.current) {
      setPoppableHeight(poppableRef.current.getBoundingClientRect().height);
    }
  }, []);

  // Constants
  const { id, itemName, itemLink, itemDescription, priority, targetAmount, currentAmount } = wishlist;

  // Methods
  function onItemClick(): void {
    setIsExtraShowing(!isExtraShowing);
  }

  function modifyPrice(price: number): string {
    return parseFloat(price.toString()).toFixed(2)
  }

  function updateItemDescription(description = ''): string {
    return description || 'Not available';
  }

  function grabPercentage(current: number = 0, target: number): number {
    return Math.ceil((current / target) * 100);
  }
  
  function onDeleteClick(): void {
    dispatch(openDeleteConfirmationModal({
      id,
      itemName,
    }))
  }

  return (
    <div
      className="flex flex-col gap-2 relative transition-all"
      style={{
        marginBottom: isExtraShowing ? `${poppableHeight + 10}px` : '0'
      }}
    >
      {/* Main */}
      <div
        className="p-4 flex gap-4 relative rounded-2xl overflow-hidden border border-black bg-white z-10"
        onClick={onItemClick}
      >
        {/* Info */}
        <div className="flex gap-1 justify-between w-full">
          <div className="flex flex-col gap-1">
            <div className="font-black">{itemName}</div>
            <div className="font-mono text-xs"><span className="font-bold">${modifyPrice(currentAmount!)}</span> <span className="text-black/60">/ ${modifyPrice(targetAmount)}</span></div>
            <PriorityPill priority={priority!} />
          </div>

          <CircularProgressBar percentage={grabPercentage(currentAmount, targetAmount)} />
        </div>
      </div>

      {/* Poppable info */}
      <div
        className={`rounded-2xl overflow-hidden border border-black transition-all absolute bottom-[-5px] w-[90%] left-1/2 -translate-x-1/2`}
        ref={poppableRef}
        style={{
          bottom: isExtraShowing ? `-${poppableHeight + 10}px` : '-5px',
          backgroundColor: isExtraShowing ? 'white' : 'black'
        }}
      >
        <div className="flex flex-col gap-2 p-4 text-[0.75rem]">
          <div className="font-mono"><span className="uppercase font-bold">Description:</span> {updateItemDescription(itemDescription)}</div>
          {
            itemLink && <div>
              Click <a className="underline text-[#F36D56] underline-offset-2" href={itemLink} target="_blank">HERE</a> to view the item.
            </div>
          }
        </div>

        <div className="text-right gap-1 text-xs border-t px-4 py-2 border-black/20 font-mono">
          {/* Delete button */}
          <button
            className="uppercase underline text-[#F36D56] underline-offset-2"
            onClick={onDeleteClick}
          >Delete</button>
        </div>
      </div>
    </div>
  )
}