'use client'

import React from 'react';
import { loadingAnimation } from '@/data/Animation';
import dynamic from 'next/dynamic';

export default function Loading() {

    const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
            <div className="flex flex-col items-center space-y-4">
                <Lottie animationData={loadingAnimation} loop={true} />
            </div>
        </div>
    );
}
