"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireAdmin = false,
  fallback 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (requireAuth && !session) {
      router.push("/auth/signin");
      return;
    }

    if (requireAdmin && session?.user?.role !== "admin") {
      router.push("/");
      return;
    }

    if (session?.user?.status === "pending") {
      router.push("/auth/pending");
      return;
    }

    if (session?.user?.status === "rejected") {
      router.push("/auth/rejected");
      return;
    }
  }, [session, status, router, requireAuth, requireAdmin]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (requireAuth && !session) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Gerekli</h2>
          <p className="text-gray-600 mb-4">Bu sayfaya erişmek için giriş yapmanız gerekiyor.</p>
          <button
            onClick={() => router.push("/auth/signin")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  if (requireAdmin && session?.user?.role !== "admin") {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Yetkisiz Erişim</h2>
          <p className="text-gray-600 mb-4">Bu sayfaya erişim yetkiniz bulunmuyor.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

