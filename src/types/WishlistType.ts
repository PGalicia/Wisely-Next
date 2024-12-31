export interface WishlistType {
  id: string;
  itemName: string;
  itemDescription?: string;
  itemLink?: string;
  priority?: number;
  targetAmount: number;
  currentAmount?: number;
}