import React, { useReducer, useState } from 'react';

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
  | { type: 'RESET_SUCCESS'; productId: string };

export const initialAuctionState: AuctionState = {
    bidInputs: {},
    bids: {},
    loadingBids: {},
    successBids: {},
    notifications: {},
  };

export const auctionReducer = (
    state: AuctionState,
    action: AuctionAction,
  ): AuctionState => {
    switch (action.type) {
      case 'SET_INPUT':
        return {
          ...state,
          bidInputs: { ...state.bidInputs, [action.productId]: action.value },
        };
      case 'START_BID':
        return {
          ...state,
          loadingBids: { ...state.loadingBids, [action.productId]: true },
        };
      case 'BID_SUCCESS':
        return {
          ...state,
          bids: {
            ...state.bids,
            [action.productId]: { userId: action.userId, amount: action.amount },
          },
          successBids: { ...state.successBids, [action.productId]: true },
          loadingBids: { ...state.loadingBids, [action.productId]: false },
        };
      case 'CLEAR_INPUT':
        return {
          ...state,
          bidInputs: { ...state.bidInputs, [action.productId]: '' },
        };
      case 'SET_NOTIFICATION':
        return {
          ...state,
          notifications: {
            ...state.notifications,
            [action.productId]: action.message,
          },
        };
      case 'RESET_SUCCESS':
        return {
          ...state,
          successBids: { ...state.successBids, [action.productId]: false },
        };
      default:
        return state;
    }
};
