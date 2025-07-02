import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { getAllHabit } from "@/services/HabitApi";
import { getAllPlaces } from "@/services/PlaceApi";
import { getAllCommunities } from "@/services/CommunityApi";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import post_1 from "@/assets/post 1.png";
import post_2 from "@/assets/post 2.png";
import post_3 from "@/assets/post 3.png";
import { Spinner } from "@/components/Spinner/Spinner";

const Index = () => {
  const { user, isAdmin } = useAuth();
  const [habitCount, setHabitCount] = useState(0);
  const [placeCount, setPlaceCount] = useState(0);
  const [communityCount, setCommunityCount] = useState(0);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoadingPage(true);
        const [habits, places, communities] = await Promise.all([
          getAllHabit(),
          getAllPlaces(),
          getAllCommunities(),
        ]);
        setHabitCount(habits.length);
        setPlaceCount(places.length);
        setCommunityCount(communities.length);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      } finally {
        setLoadingPage(false);
      }
    };

    if (user) {
      fetchAll();
    }
  }, [user]);

  const stats = [
    { label: "Thói quen xanh", value: habitCount, color: "text-green-600" },
    { label: "Địa điểm xanh", value: placeCount, color: "text-blue-600" },
    {
      label: "Cộng đồng xanh",
      value: communityCount,
      color: "text-purple-600",
    },
    { label: "CO2 tiết kiệm (kg)", value: "2,847", color: "text-orange-600" },
  ];

  if (loadingPage) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
        <Header />

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 flex-grow">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight">
              Cùng nhau <span className="text-green-600">sống xanh</span>
              <br />
              <span className="text-emerald-600">bảo vệ hành tinh</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Tham gia cộng đồng Green Living để theo dõi thói quen sống xanh,
              tham gia thử thách môi trường và kết nối với những người cùng chí
              hướng.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="gradient-green text-white px-8 py-3 text-lg"
                >
                  Bắt đầu ngay
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg border-green-200 hover:bg-green-50"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-32">
            <Card className="glass-card hover-lift">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-3xl">🌱</span>
                </div>
                <CardTitle className="text-green-800">
                  Theo dõi thói quen
                </CardTitle>
                <CardDescription>
                  Xây dựng và duy trì các thói quen sống xanh hàng ngày
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-3xl">🏆</span>
                </div>
                <CardTitle className="text-green-800 text-xl">
                  Thử thách xanh
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Tham gia các thử thách môi trường thú vị và nhận phần thưởng ý
                  nghĩa
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover-lift">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-3xl">🤝</span>
                </div>
                <CardTitle className="text-green-800 text-xl">
                  Cộng đồng
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Chia sẻ kinh nghiệm và học hỏi từ cộng đồng sống xanh toàn cầu
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Chào mừng trở lại, {user.fullname}! 🌿
          </h1>
          {!isAdmin() && (
            <p className="text-gray-600 text-lg">
              Hãy tiếp tục hành trình sống xanh của bạn hôm nay
            </p>
          )}

          {isAdmin() && (
            <p className="text-gray-600 text-lg">
              Hãy tiếp tục quản lý tốt cộng đồng sống xanh này nhé
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass-card hover-lift">
              <CardContent className="p-8 text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-3`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Events */}
        <div className="container mx-auto px-4 py-8">
          {/* Tiêu đề */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Sự kiện nổi bật
            </h2>
            {isAdmin() && (
              <Link to="/admin">
                <Button
                  variant="outline"
                  className="border-green-200 hover:bg-green-50"
                >
                  Quản lý trang
                </Button>
              </Link>
            )}
          </div>

          {/* Carousel mở rộng full chiều ngang container */}
          <div className="-mx-4">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <img
                    src={post_2}
                    alt="Event 1"
                    className="w-full h-[400px] bg-cover bg-center"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={post_1}
                    alt="Event 2"
                    className="w-full h-[400px] bg-cover bg-center"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    src={post_3}
                    alt="Event 3"
                    className="w-full h-[400px] bg-cover bg-center"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        {!isAdmin() && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">
                  Thói quen hôm nay
                </CardTitle>
                <CardDescription>
                  Hoàn thành các thói quen xanh của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/habits">
                  <Button className="w-full gradient-green text-white">
                    Xem thói quen
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">
                  Cộng đồng sống xanh
                </CardTitle>
                <CardDescription>
                  Xem bài đăng mới của các cộng đồng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/community">
                  <Button className="w-full gradient-green text-white">
                    Đến xem ngay
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">
                  Khám phá địa điểm
                </CardTitle>
                <CardDescription>
                  Tìm các địa điểm thân thiện với môi trường
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/places">
                  <Button className="w-full gradient-green text-white">
                    Khám phá ngay
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
