/**
 * Imports
 */
// Apollo
import { gql } from '@apollo/client';

export const REMOVE_WISHLIST = gql`
  mutation deleteWishlist($id: String!){
    deleteWishlist(
      id: $id,
    ) {
      id
    }
  }
`;

export const GET_WISHLIST = gql`
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