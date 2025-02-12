"use client";

import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/auth-store";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";

const ProfilePage = observer(() => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl py-24">
      <h1 className="text-2xl font-semibold mb-8">내 프로필</h1>

      <Card className="p-6">
        <div className="flex items-start space-x-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl">
              {authStore.user ? getInitials(authStore.user.name) : "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">이름</p>
              <p className="text-base font-semibold">{authStore.user?.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Bigs ID</p>
              <p className="text-base font-semibold">
                {authStore.user?.username}
              </p>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">계정 보안</h3>
              <div className="space-y-4">
                <button
                  className="w-full flex items-center justify-between p-4 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                  onClick={() => authStore.logout()}
                >
                  <span>로그아웃</span>
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

export default ProfilePage;
