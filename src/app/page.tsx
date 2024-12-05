'use client'
/**
 * Imports
 */
// Apollo
import { useQuery, gql, useMutation } from '@apollo/client';

// Components
import WishlistItem from '@/components/WishlistItem';
import ModalDeleteConfirmation from '@/components/ModalDeleteConfirmation';

// React
import { useSelector } from 'react-redux';

// Redux
import { AppDispatch, RootState } from '@/redux/store';

// Types
import type { WislistType } from '@/types/WishlistType';

// @TODO: I might put this in a constants folder
const GET_WISHLIST = gql`
  query{
    getAllWishlist{
      id,
      itemName,
      itemLink,
      itemDescription,
      priority,
      currentAmount,
      targetAmount
    }
  }
`;

const ADD_WISHLIST = gql`
  mutation CreateWishlist($itemName: String!){
    createWishlist(
      itemName: $itemName,
      targetAmount: 10
    ) {
      id,
      itemName,
      priority,
      currentAmount,
      targetAmount 
    }
  }
`;

const REMOVE_WISHLIST = gql`
  mutation deleteWishlist($id: String!){
    deleteWishlist(
      id: $id,
    ) {
      id
    }
  }
`;

function formatWishlistQuery(queryObj: any) {
  return queryObj['getAllWishlist'];
}

export default function Home() {
  // Redux
  const isDeleteConfirmationModalActive = useSelector((state: RootState) => state.modalReducer.isDeleteConfirmationModalActive);

  const { loading, error, data = [] } = useQuery(GET_WISHLIST);

  const [createWishlistMutation] = useMutation(ADD_WISHLIST, {
    refetchQueries: [{ query: GET_WISHLIST }],
  });
  const [removeWishlistMutation] = useMutation(REMOVE_WISHLIST, {
    refetchQueries: [{ query: GET_WISHLIST }],
  });

  // if (!loading) {
  //   console.log(formatWishlistQuery(data));
  // }

  function handleSubmit (value: string) {
    createWishlistMutation({ variables: { itemName: value } });
  }

  function handleOnClick(id: string) {
    removeWishlistMutation({ variables: { id } });
  }

  return (
    <main className="m-4">
      <h1>Hello World</h1>

      <input className="text-black" type="text" onKeyDown={
        (e) => {
          if (e.key === "Enter") {
            handleSubmit((e.target as HTMLInputElement).value);
          }
        }
      }/>

      <div className="flex flex-col gap-4">
        {
          !loading && formatWishlistQuery(data).map((wishlist: WislistType) => {
            return <WishlistItem key={wishlist.id} wishlist={wishlist} />
          })
        }
      </div>

      {isDeleteConfirmationModalActive && <ModalDeleteConfirmation />}
    </main>
  );
}