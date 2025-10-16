"use client";

import { useState, useEffect } from "react";
import { UserDocument } from "@/types/auth";

type AdminUser = Omit<UserDocument, "password"> & { _id: string };

interface UserManagementProps {
  initialUsers: AdminUser[];
}

export default function UserManagement({ initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filteredUsers = users.filter(user => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  const updateUserStatus = async (userId: string, status: "approved" | "rejected") => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, status }),
      });

      if (response.ok) {
        setUsers(prev => 
          prev.map(user => 
            user._id === userId 
              ? { ...user, status, updatedAt: new Date() }
              : user
          )
        );
      } else {
        alert("Kullanıcı durumu güncellenirken hata oluştu");
      }
    } catch (error) {
      alert("Bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case "approved":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Beklemede";
      case "approved":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Üyelik Başvuruları</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "all" 
                ? "bg-indigo-100 text-indigo-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "pending" 
                ? "bg-yellow-100 text-yellow-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Beklemede
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "approved" 
                ? "bg-green-100 text-green-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Onaylandı
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "rejected" 
                ? "bg-red-100 text-red-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Reddedildi
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <li key={user._id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                      {user.organization && (
                        <p className="text-xs text-gray-400 truncate">
                          {user.organization} • {user.position}
                        </p>
                      )}
                    </div>
                  </div>
                  {user.reason && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Sebep:</span> {user.reason}
                      </p>
                    </div>
                  )}
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span>
                      Başvuru: {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                    <span className={getStatusBadge(user.status)}>
                      {getStatusText(user.status)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {user.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateUserStatus(user._id!, "approved")}
                        disabled={isLoading}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => updateUserStatus(user._id!, "rejected")}
                        disabled={isLoading}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                      >
                        Reddet
                      </button>
                    </>
                  )}
                  {user.status === "approved" && (
                    <button
                      onClick={() => updateUserStatus(user._id!, "rejected")}
                      disabled={isLoading}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                      Reddet
                    </button>
                  )}
                  {user.status === "rejected" && (
                    <button
                      onClick={() => updateUserStatus(user._id!, "approved")}
                      disabled={isLoading}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                    >
                      Onayla
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Bu kategoride kullanıcı bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
