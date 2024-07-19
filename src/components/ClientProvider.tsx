"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

const ClientProvider = ({ children }: { children: ReactNode }) => {
  useAuth();

  return <>{children}</>;
};

export default ClientProvider;
