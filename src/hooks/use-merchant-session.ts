"use client";

import { useEffect, useState } from "react";

import { getMerchantSessionAddress } from "@/lib/merchant-storage";

export type MerchantSessionState = {
  /** Wallet address of the signed-in merchant, null when unauthenticated. */
  address: string | null;
  /** True until the sessionStorage check has run on the client. */
  isLoading: boolean;
};

export function useMerchantSession(): MerchantSessionState {
  const [state, setState] = useState<MerchantSessionState>({
    address: null,
    isLoading: true,
  });

  useEffect(() => {
    setState({ address: getMerchantSessionAddress(), isLoading: false });
  }, []);

  return state;
}
