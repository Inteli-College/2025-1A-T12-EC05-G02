// app/login/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PharmaTech - Login',
  description: 'Sistema de gerenciamento de farmácia',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}