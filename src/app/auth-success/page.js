"use client";

import { useEffect, Suspense } from 'react'; // Suspense ইম্পোর্ট করুন
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

// আসল লজিকটি একটি আলাদা কম্পোনেন্টে নিয়ে আসুন
function AuthSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // আপনার প্রোডাকশন এপিআই ইউআরএল ব্যবহার করুন
            fetch('https://skkhandokar22.pythonanywhere.com/api/current-user/', {
                headers: { 'Authorization': `Token ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                login(data.username, token);
                router.push('/');
            })
            .catch(() => router.push('/signin'));
        }
    }, [searchParams, login, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-2">Logging you in...</h1>
            <p className="text-gray-500">Please wait while we redirect you.</p>
        </div>
    );
}

// মেইন পেজ কম্পোনেন্ট যা Suspense দিয়ে মোড়ানো
export default function AuthSuccess() {
    return (
        <Suspense fallback={<div>Loading authentication...</div>}>
            <AuthSuccessContent />
        </Suspense>
    );
}