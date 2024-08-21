// src/components/ProfilePicture.tsx

import React from 'react';

interface ProfilePictureProps {
    src: string;
    alt: string;
    size?: number;  // Optional: size of the profile picture
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ src, alt, size = 64 }) => {
    return (
        <div
            className="flex items-center justify-center bg-gray-200 rounded-full"
            style={{ width: size, height: size }}
        >
            <img
                src={src}
                alt={alt}
                className="rounded-full object-cover"
                style={{ width: size, height: size }}
            />
        </div>
    );
};

export default ProfilePicture;
