import React, { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
} from "lucide-react";
import { AdminHabit } from "@/components/AdminHabit";
import { AdminCommunity } from "@/components/AdminCommunity";
import { AdminPlace } from "@/components/AdminPlace";
import { AdminUser } from "@/components/AdminUser";
import { getAllUsers } from "@/services/UserApi";
import { getAllHabit } from "@/services/HabitApi";
import { getAllPlaces } from "@/services/PlaceApi";
import { getAllCommunities } from "@/services/CommunityApi";
import { AdminNews } from "@/components/AdminNews";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [userCount, setUserCount] = useState(0);
  const [habitCount, setHabitCount] = useState(0);
  const [placeCount, setPlaceCount] = useState(0);
  const [communityCount, setCommunityCount] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [users, habits, places, communities] = await Promise.all([
          getAllUsers(),
          getAllHabit(),
          getAllPlaces(),
          getAllCommunities(),
        ]);
        setUserCount(users.length);
        setHabitCount(habits.length);
        setPlaceCount(places.length);
        setCommunityCount(communities.length);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      }
    };

    if (user && isAdmin()) {
      fetchAll();
    }
  }, [user, isAdmin]);

  const stats = [
    {
      label: "Tổng người dùng",
      value: userCount,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Thói quen được tạo",
      value: habitCount,
      icon: Award,
      color: "text-green-600",
    },
    {
      label: "Địa điểm đối tác",
      value: placeCount,
      icon: MapPin,
      color: "text-purple-600",
    },
    {
      label: "Tổng cộng đồng",
      value: communityCount,
      icon: Calendar,
      color: "text-orange-600",
    },
  ];

  if (!user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bạn không có quyền truy cập trang này
          </h1>
          <p className="text-gray-600">
            Vui lòng đăng nhập với tài khoản admin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Bảng điều khiển Admin
          </h1>
          <p className="text-gray-600">Quản lý hệ thống Eco Habit</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="habits" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="habits">Thói quen</TabsTrigger>
            <TabsTrigger value="places">Địa điểm</TabsTrigger>
            <TabsTrigger value="communities">Cộng đồng</TabsTrigger>
            {/* <TabsTrigger value="news">Tin tức</TabsTrigger> */}
            <TabsTrigger value="users">Người dùng</TabsTrigger>

            {/* <TabsTrigger value="analytics">Thống kê</TabsTrigger> */}
          </TabsList>

          <TabsContent value="habits" className="space-y-6 mt-6">
            <AdminHabit />
          </TabsContent>

          <TabsContent value="places" className="space-y-6 mt-6">
            <AdminPlace />
          </TabsContent>

          <TabsContent value="communities" className="space-y-6 mt-6">
            <AdminCommunity />
          </TabsContent>

          {/* <TabsContent value="news" className="space-y-6 mt-6">
            <AdminNews />
          </TabsContent> */}

          <TabsContent value="users" className="space-y-6 mt-6">
            <AdminUser />
          </TabsContent>

          {/* <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Tăng trưởng người dùng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Tháng này</span>
                      <span className="font-semibold text-green-600">
                        +12.5%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tuần này</span>
                      <span className="font-semibold text-blue-600">+3.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Hôm nay</span>
                      <span className="font-semibold text-purple-600">
                        +45 người
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    Thói quen phổ biến nhất
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Mang chai nước</span>
                      <span className="font-semibold">356 lượt</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mang túi vải</span>
                      <span className="font-semibold">245 lượt</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tắt điện</span>
                      <span className="font-semibold">189 lượt</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">
                  Tác động môi trường
                </CardTitle>
                <CardDescription>
                  Ước tính các chỉ số môi trường từ hoạt động của người dùng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      2,847 kg
                    </div>
                    <div className="text-sm text-gray-600">CO2 tiết kiệm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      1,543 L
                    </div>
                    <div className="text-sm text-gray-600">Nước tiết kiệm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      456 kg
                    </div>
                    <div className="text-sm text-gray-600">Rác thải giảm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      234 kWh
                    </div>
                    <div className="text-sm text-gray-600">Điện tiết kiệm</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
