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

export const GET_BUDGET = gql`
  query{
    getBudget
  }
`;

export const ADD_WISHLIST = gql`
  mutation CreateWishlist($itemName: String!, $targetAmount: Float!) {
    createWishlist(
      itemName: $itemName,
      targetAmount: $targetAmount
    ) {
      id,
      itemName,
      priority,
      currentAmount,
      targetAmount 
    }
  }
`;

export const UPDATE_WISHLIST = gql`
mutation UpdateWishlist(
  $id: String!
  $itemName: String
  $itemLink: String
  $itemDescription: String
  $priority: Int
  $targetAmount: Float
  $isComplete: Boolean
) {
  updateWishlist(
    id: $id
    itemName: $itemName
    itemLink: $itemLink
    itemDescription: $itemDescription
    priority: $priority
    targetAmount: $targetAmount
    isComplete: $isComplete
  ) {
    id
    itemName
    itemLink
    itemDescription
    priority
    targetAmount
    isComplete
  }
}
`;