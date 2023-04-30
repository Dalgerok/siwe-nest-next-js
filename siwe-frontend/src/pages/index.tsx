import { useAccount, useConnect } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BACKEND_URL } from './_app'

export default function Home() {

  const router = useRouter()

  const [hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (typeof window.ethereum !== "undefined") {
        setHasMetamask(true);
      }
    }
  }, [setHasMetamask]);

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch(`${BACKEND_URL}/auth/verify_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to verify JWT token');
        }
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.error(err);
        setIsAuthenticated(false);
      });
  }, []);

  const handleLogout = async() => {
    const token = localStorage.getItem('jwtToken');
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
  }

  return (
    <div>
      <h3>SIWE authentication demo</h3>
      {!hasMetamask ? 
        "Please install Metamask" 
      : !isConnected ? 
        <button onClick={() => connect()}>Connect to Metamask</button>
      : isAuthenticated ? 
        <div>
          <Link href="/profile">Profile</Link>
          <br/>
          <button onClick={() => handleLogout()}>Logout</button>
          <br/>
        </div>
      : 
        <div>
          <button onClick={() => router.push('/signup')}>Signup</button>
          <br/>
          <button onClick={() => router.push('/signin')}>Signin</button>
          <br/>
        </div>
      }
    </div>
  )
}
