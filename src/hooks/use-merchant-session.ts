"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMerchantSessionAddress } from "@/lib/merchant-storage";

export type MerchantSession = {
  walletAddress: string | null;
  isLoading: boolean;
};

export function useMerchantSession(): MerchantSession {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const address = getMerchantSessionAddress();

    if (!address) {
      router.replace("/sign-in");
      setIsLoading(false);
      return;
    }

    setWalletAddress(address);
    setIsLoading(false);
  }, [router]);

  return { walletAddress, isLoading };
}
