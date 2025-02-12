"use client";

import { observer } from "mobx-react-lite";
import { authStore } from "@/stores/auth-store";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { LogOut, User, Key, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">내 프로필</h1>

      <div className="space-y-6">
        <Card className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0">
            <div className="flex justify-center md:justify-start">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-2 ring-primary/10">
                <AvatarFallback className="text-xl md:text-2xl bg-primary/5">
                  {authStore.user ? getInitials(authStore.user.name) : "?"}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-2" />
                    이름
                  </div>
                  <p className="text-lg font-semibold">{authStore.user?.name}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Key className="w-4 h-4 mr-2" />
                    Bigs ID
                  </div>
                  <p className="text-lg font-semibold">
                    {authStore.user?.username}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <div className="flex items-center mb-4">
                  <Shield className="w-5 h-5 mr-2" />
                  <h3 className="text-lg font-semibold">계정 보안</h3>
                </div>
                
                <button
                  className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                  onClick={() => authStore.logout()}
                >
                  <span className="font-medium">로그아웃</span>
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* 추가 섹션 */}
        <Card className="p-4 md:p-8">
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="text-lg font-semibold">최근 활동</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            곧 새로운 기능이 추가될 예정입니다.
          </p>
        </Card>
      </div>
    </div>
  );
});

export default ProfilePage;