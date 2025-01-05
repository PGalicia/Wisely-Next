'use client'
/**
 * Imports
 */
// Components
import BalanceDefault from '@/components/BalanceDefault';
import ButtonAdd from '@/components/ButtonAdd';
import ModalDeleteConfirmation from '@/components/ModalDeleteConfirmation';
import ModalAddEditItem from '@/components/ModalAddEditItem';
import WishlistItem from '@/components/WishlistItem';

// React
import { useEffect, useId, useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { openAddItemModal } from '@/redux/features/modalSlice';
import { setWishlistAndAdjustCurrentAmount, setBudget, setIsOnDemo } from '@/redux/features/wishlistSlice';

// Types
import type { WishlistType } from '@/types/WishlistType';

export default function DemoPage() {
  // Consts
  const DEFAULT_WISHLIST = [
    {
      id: useId(),
      itemName: 'Multi purpose cake scraper',
      itemDescription: '',
      itemLink: 'https://www.target.com/p/oxo-stainless-steel-multi-purpose-scraper-and-chopper/-/A-76341863?ref=tgt_adv_xsp&AFID=google_pla_df&fndsrc=tmnv&DFA=71700000120201461&CPNG=PLA_DVM%2Ba064R000015PkkpQAC-OXO_Google+Search_Q1_2024-1439950&adgroup=PLA_OXO&LID=700000001393753pgs&network=g&device=c&location=9031602&gad_source=1&gclid=Cj0KCQiAst67BhCEARIsAKKdWOlDtzfoE3-E-uYNfdGNNjMYuE9VDg25Qn_SEcrLMZ-prPlkv9l5ZTcaAs-iEALw_wcB&gclsrc=aw.ds',
      priority: 5,
      targetAmount: 11.99,
      currentAmount: 0
    },
    {
      id: useId(),
      itemName: 'Macbook Air 13"',
      itemDescription: 'Color: Midnight | Size: 156GB',
      itemLink: 'https://www.apple.com/shop/buy-mac/macbook-air/13-inch-midnight-apple-m3-chip-with-8-core-cpu-and-8-core-gpu-16gb-memory-256gb',
      priority: 4,
      targetAmount: 1099,
      currentAmount: 0
    },
    {
      id: useId(),
      itemName: 'Charizard 151 Pokemon card',
      itemDescription: '',
      itemLink: 'https://www.tcgplayer.com/product/517045/pokemon-sv-scarlet-and-violet-151-charizard-ex-199-165?page=1&Language=English',
      priority: 3,
      targetAmount: 99.99,
      currentAmount: 0
    },
    {
      id: useId(),
      itemName: 'Dune: Imperium board game',
      itemDescription: 'Buy at local board game shop',
      itemLink: '',
      priority: 3,
      targetAmount: 59.99,
      currentAmount: 0
    },
    {
      id: useId(),
      itemName: 'Black Myth Wukong',
      itemDescription: 'Need to wait for a sale',
      itemLink: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/',
      priority: 1,
      targetAmount: 59.99,
      currentAmount: 0
    },
  ]

  // State
  const [isLoading, setIsLoading] = useState(true);

  // Dispatch
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux
  const wishlists = useSelector((state: RootState) => state.wishlistReducer.wishlists);
  const budget = useSelector((state: RootState) => state.wishlistReducer.budget);
  const isDeleteConfirmationModalActive = useSelector((state: RootState) => state.modalReducer.isDeleteConfirmationModalActive);
  const isAddItemModalActive = useSelector((state: RootState) => state.modalReducer.isAddItemModalActive);
  
  // Update the state to reflect the wishlist and budget
  useEffect(() => {
    dispatch(setIsOnDemo(true));
    dispatch(setBudget(100));
    dispatch(setWishlistAndAdjustCurrentAmount(DEFAULT_WISHLIST));
    setIsLoading(false);
  }, [DEFAULT_WISHLIST, dispatch]);

  if (isLoading) {
    return <div className="font-black text-2xl text-center mt-12">Setting up Demo...</div>
  }

  function onAddNewItemClick() {
    dispatch(openAddItemModal());
  }

  return (
    <main className="m-5 pb-28">
      <BalanceDefault balance={budget} />

      <ButtonAdd buttonText="Add" onClick={onAddNewItemClick} />

      <div className="uppercase mb-2 font-mono font-bold">Wishlist</div>

      <div className="flex flex-col gap-4">
        {
          wishlists.map((wishlist: WishlistType) => {
            return <WishlistItem key={wishlist.id} wishlist={wishlist} />
          })
        }
      </div>

      {/* Modals */}
      {isDeleteConfirmationModalActive && <ModalDeleteConfirmation />}
      {isAddItemModalActive && <ModalAddEditItem />}
    </main>
  );
}