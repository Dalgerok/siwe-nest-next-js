import type { AppProps } from "next/app"
import { WagmiConfig, createClient, configureChains } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { mainnet } from "wagmi/chains"
import { SiweMessage } from 'siwe';

export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export const createSiweMessage = async (address: string) => {
  console.log('BACKEND_URL:', BACKEND_URL)
  const res = await fetch(`${BACKEND_URL}/auth/nonce`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ address }),
    credentials: 'include',
  });
  const { nonce } = await res.json();
  console.log('nonce:', nonce)
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in with Ethereum to the app.',
    uri: origin,
    version: '1',
    chainId: 1,
    nonce,
  });
  return message.prepareMessage();
}

export const { chains, provider } = configureChains(
  [mainnet],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
})

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}