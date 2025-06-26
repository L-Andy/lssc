import Image from 'next/image';
import React from 'react';

interface VipButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const VipButton: React.FC<VipButtonProps> = ({ children, disabled = true }) => {
  return (
    <button disabled={disabled} className="relative flex flex-col items-center cursor-pointer justify-center w-32 h-32 bg-transparent border-none outline-none" style={{ filter: disabled ? 'grayscale(1)' : 'none' }}>
      <Image src="/assets/vip/btn.png" alt="VIP Button" width={120} height={120} />
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white drop-shadow">
        {children}
      </span>
    </button>
  );
};

export default VipButton; 