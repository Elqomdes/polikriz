import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/mongodb";
import type { WithId } from "mongodb";
import { redirect } from "next/navigation";
import UserManagement from "@/components/UserManagement";
import { UserDocument } from "@/types/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "admin") {
    redirect("/auth/signin");
  }

  // Get all users for admin management
  const users = await getCollection<UserDocument>("users");
  const allUsers = await users.find({}).toArray();
  
  // Remove password from response
  type AdminUser = Omit<UserDocument, "password"> & { _id: string };
  const usersWithoutPassword: AdminUser[] = (allUsers as WithId<UserDocument>[]) .map((user) => {
    const { password: _password, ...rest } = user;
    return { ...rest, _id: user._id?.toString?.() ?? String(user._id) } as AdminUser;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Yönetim Paneli</h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">Sistem yönetimi ve kullanıcı onayları</p>
      
      <div className="space-y-8">
        <UserManagement initialUsers={usersWithoutPassword} />
        
        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Sistem Yönetimi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["Gösterge Sözlüğü", "Kriz Türleri", "Model Açıklamaları", "Örnek Senaryolar", "Uyarı Kuralları"].map((name) => (
              <a key={name} href="#" className="rounded-lg border border-black/10 dark:border-white/10 p-4 hover:bg-black/[.03] dark:hover:bg-white/[.03]">
                <h3 className="font-medium">{name}</h3>
                <p className="text-sm text-black/60 dark:text-white/60">Düzenle</p>
              </a>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <form action="/api/seed" method="post">
                <button className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 text-sm">Başlangıç İçeriklerini Yükle</button>
              </form>
              <form action="/api/admin/db-setup" method="post">
                <button className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 text-sm">Veritabanı İndekslerini Kur</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


