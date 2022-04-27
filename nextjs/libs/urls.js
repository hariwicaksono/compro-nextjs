//import React from 'react';
export const SiteUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL
}

export const ImageUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_ASSET_IMG
}