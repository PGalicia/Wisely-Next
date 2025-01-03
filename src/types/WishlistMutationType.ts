/**
 * Imports
 */
// Constans
import { MUTATION_NAME_CREATE_WISHLIST, MUTATION_NAME_UPDATE_WISHLIST } from '@/constants/GraphQLQueries';

// Types
import type { WishlistType } from '@/types/WishlistType';

export type createWishlistMutationType = { [MUTATION_NAME_CREATE_WISHLIST]: WishlistType };
export type updateWishlistMutationType = { [MUTATION_NAME_UPDATE_WISHLIST]: WishlistType; };