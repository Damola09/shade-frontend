"use client";

import { BadgeCheck, WalletCards } from "lucide-react";
import { useRouter } from "next/navigation";

import { WalletConnectButton } from "@/components/wallet-connect-button";
import { useWalletConnect } from "@/hooks/use-wallet-connect";
import { getMerchantProfile } from "@/lib/merchant-storage";

export function SignInClient() {
  const router = useRouter();
  const { status, error, session, connect } = useWalletConnect();

  async function handleSignIn() {
    const nextSession = await connect();

    if (!nextSession) {
      return;
    }

    const profile = getMerchantProfile(nextSession.address);
    router.push(profile?.emailVerified ? "/dashboard" : "/register");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <WalletCards className="size-6" />
          </div>
          <h1 className="mt-5 text-3xl font-bold">Sign in to Shade</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Connect your Stellar wallet and sign a verification message.
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
          {error ? (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {session ? (
            <div className="mb-4 rounded-lg border border-primary/25 bg-secondary/60 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <BadgeCheck className="size-4" />
                Wallet verified
              </div>
              <p className="mt-2 break-all text-xs text-muted-foreground">
                {session.address}
              </p>
            </div>
          ) : null}

          <WalletConnectButton status={status} onClick={handleSignIn} />
        </div>
      </section>
    </main>
  );
}
