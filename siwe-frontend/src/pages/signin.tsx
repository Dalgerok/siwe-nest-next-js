import { useRouter } from 'next/router'
import { useAccount, useSignMessage } from "wagmi"
import { useEffect, useState } from "react";
import { BACKEND_URL, createSiweMessage } from './_app'

export default function Signup() {
    const { address } = useAccount()
    const router = useRouter()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { signMessageAsync } = useSignMessage()

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const message = await createSiweMessage(address!)
        const signature = await signMessageAsync({
            message: message,
        })
        const res = await fetch(`${BACKEND_URL}/auth/verify_signature`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, signature }),
            credentials: 'include'
        })

        const response = await fetch(`${BACKEND_URL}/auth/signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address, username, password }),
            credentials: 'include'
        })
        const result = await response.json()

        localStorage.setItem('jwtToken', result.access_token)
        router.push('/')
    };

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.ethereum === "undefined" || !address) {
            router.push('/')
        }
      }, [router, address]);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br/>
            <button type="submit">Sign In</button>
        </form>
    );
}