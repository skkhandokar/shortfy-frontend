// src/app/auth-success/page.js
"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';


export default function AuthSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // ব্যাকএন্ড থেকে ইউজারের নাম নিয়ে আসা
            fetch('https://skkhandokar22.pythonanywhere.com/api/current-user/', {
                headers: { 'Authorization': `Token ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                login(data.username, token); // Context এ ইউজারনেম এবং টোকেন দুইটাই সেভ হবে
                router.push('/');
            })
            .catch(() => router.push('/signin'));
        }
    }, [searchParams, login, router]);

    return <div>Logging you in...</div>;
}