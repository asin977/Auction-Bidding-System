export type ProductList = {
  id: string;
  name: string;
  imageUrl: string;
  imageDetails: string;
  price: number;
  startingPrice: number;
  time: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  
};

export type AuctionState = {
  bidInputs: Record<string, string>;
  bids: Record<string, { userId: string; amount: number }>;
  loadingBids: Record<string, boolean>;
  successBids: Record<string, boolean>;
  notifications: Record<string, string>;
};

export type AuctionAction =
  | { type: 'SET_INPUT'; productId: string; value: string }
  | { type: 'START_BID'; productId: string }
  | { type: 'BID_SUCCESS'; productId: string; userId: string; amount: number }
  | { type: 'CLEAR_INPUT'; productId: string }
  | { type: 'SET_NOTIFICATION'; productId: string; message: string }
  | { type: 'CLEAR_NOTIFICATION'; productId: string }
  | { type: 'RESET_SUCCESS'; productId: string };
   

