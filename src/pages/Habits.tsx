import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Circle, Trophy, Gift } from "lucide-react";
import { UserHabit } from "@/components/UserHabit";
import Footer from "@/components/Footer";
import { UserChallenge } from "@/components/UserChallenge";
import { UserDaily } from "@/components/UserDaily";

const Habits = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Vui lòng đăng nhập để xem thói quen
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thói quen xanh
          </h1>
          <p className="text-gray-600">
            Theo dõi và phát triển lối sống bền vững
          </p>
        </div>

        <Tabs defaultValue="challenges" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="challenges">Thử thách của tôi</TabsTrigger>
            <TabsTrigger value="habits">Thói quen gốc</TabsTrigger>
            <TabsTrigger value="progress">Tiến độ</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-6 mt-6">
            <UserChallenge />
          </TabsContent>

          <TabsContent value="habits" className="space-y-6 mt-6">
            <UserHabit />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6 mt-6">
            <UserDaily />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Habits;
