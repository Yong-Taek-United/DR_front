import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: CSSProperties;
}
export default function Button({ children, style, ...props }: ButtonTypes) {
  return (
    <button
      {...props}
      className={twMerge(
        props.disabled
          ? `bg-gray-400 cursor-not-allowed text-white font-bold text-lg rounded-md w-96 h-10`
          : `bg-black text-white font-bold text-lg rounded-md w-96 h-10`,
        `${props.className}`
      )}
      style={{ ...style }}
    >
      {children}
    </button>
  );
}
