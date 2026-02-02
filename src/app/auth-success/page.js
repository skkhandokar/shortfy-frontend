"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

// আসল লজিকটি আলাদা কম্পোনেন্টে রাখা হয়েছে
function AuthSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // আপনার PythonAnywhere এপিআই লিঙ্ক
            fetch('https://skkhandokar22.pythonanywhere.com/api/current-user/', {
                headers: { 'Authorization': `Token ${token}` }
            })
            .then(res => {
                if (!res.ok) throw new Error('Token verification failed');
                return res.json();
            })
            .then(data => {
                // login(username, token)
                login(data.username, token);
                router.push('/');
            })
            .catch((err) => {
                console.error(err);
                router.push('/signin');
            });
        }
    }, [searchParams, login, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A1A2F] text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <h1 className="text-2xl font-bold">Logging you in...</h1>
            <p className="text-slate-400">Please wait while we sync your profile.</p>
        </div>
    );
}

// মেইন এক্সপোর্ট যা Suspense দিয়ে মোড়ানো
export default function AuthSuccess() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0A1A2F] text-white flex items-center justify-center">Loading...</div>}>
            <AuthSuccessContent />
        </Suspense>
    );
}