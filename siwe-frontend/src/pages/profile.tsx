import { useRouter } from 'next/router'
import { useAccount, useSignMessage } from "wagmi"
import { useEffect, useState } from "react";
import { BACKEND_URL, createSiweMessage } from './_app'

export default function Profile() {
    const router = useRouter()
    const [info, setInfo] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
    
        if (!token) {
            router.push('/')
            return;
        }
    
        fetch(`${BACKEND_URL}/auth/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async (res) => {
            if (!res.ok) {
              throw new Error('Failed to verify JWT token');
            }
            setInfo(await res.text());
          })
          .catch((err) => {
            console.error(err);
            router.push('/')
            return;
          });
    }, [router]);

    return (
        <div>
            <h3>{info}</h3>
        </div>
    )
}