/**
 * Imports
 */
// Apollo
import { gql } from '@apollo/client';

export const QUERY_NAME_GET_ALL_WISHLIST = 'getAllWishlist';
export const QUERY_NAME_GET_BUDGET = 'getBudget';
export const MUTATION_NAME_CREATE_WISHLIST = 'createWishlist';
export const MUTATION_NAME_DELETE_WISHLIST = 'deleteWishlist';
export const MUTATION_NAME_UPDATE_WISHLIST = 'updateWishlist';

export const REMOVE_WISHLIST = gql`
  mutation deleteWishlist($id: String!){
    ${MUTATION_NAME_DELETE_WISHLIST}(
      id: $id,
    ) {
      id
    }
  }
`;

export const GET_WISHLIST = gql`
  query{
    ${QUERY_NAME_GET_ALL_WISHLIST}{
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
    ${QUERY_NAME_GET_BUDGET}
  }
`;

export const GET_WISHLIST_AND_BUDGET = gql`
  query{
    ${QUERY_NAME_GET_ALL_WISHLIST}{
      id,
      itemName,
      itemLink,
      itemDescription,
      priority,
      currentAmount,
      targetAmount
    }
    ${QUERY_NAME_GET_BUDGET}
  }
`;

export const ADD_WISHLIST = gql`
  mutation CreateWishlist($itemName: String!, $targetAmount: Float!, $priority: Int!) {
    ${MUTATION_NAME_CREATE_WISHLIST}(
      itemName: $itemName,
      targetAmount: $targetAmount,
      priority: $priority
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
    ${MUTATION_NAME_UPDATE_WISHLIST}(
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