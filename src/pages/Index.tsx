
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const { user, isAdmin } = useAuth();

  const greenLivingImages = [
    {
      id: 1,
      title: "Ngày Trái Đất 2024",
      location: "Công viên Tao Đàn",
      date: "22/04/2024",
      type: "Sự kiện cộng đồng",
      description: "Tham gia hoạt động trồng cây và làm sạch môi trường",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Workshop Tái Chế",
      location: "Cafe Green Living",
      date: "15/04/2024",
      type: "Đối tác",
      description: "Học cách tái chế đồ gia dụng thành vật dụng hữu ích",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Chợ Xanh Cuối Tuần",
      location: "Trung tâm thương mại",
      date: "20/04/2024",
      type: "Quán đối tác",
      description: "Mua sắm thực phẩm hữu cơ và sản phẩm thân thiện môi trường",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Phân Loại Rác Thải",
      location: "Khu dân cư",
      date: "25/04/2024",
      type: "Giáo dục",
      description: "Hướng dẫn phân loại rác thải đúng cách để bảo vệ môi trường",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Nông Nghiệp Xanh",
      location: "Nông trại hữu cơ",
      date: "30/04/2024",
      type: "Thực hành",
      description: "Tìm hiểu về phương pháp canh tác bền vững và hữu cơ",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop"
    }
  ];

  const stats = [
    { label: "Thành viên tham gia", value: "12,543", color: "text-green-600" },
    { label: "Thói quen xanh", value: "89", color: "text-blue-600" },
    { label: "Địa điểm xanh", value: "156", color: "text-purple-600" },
    { label: "CO2 tiết kiệm (kg)", value: "2,847", color: "text-orange-600" }
  ];

  if (!user) {
    return (
      <div className="min-h-screen gradient-blue-green flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 flex-grow">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Cùng nhau <span className="text-cyan-200">sống xanh</span>
              <br />
              <span className="text-lime-200">bảo vệ hành tinh</span>
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Tham gia cộng đồng Green Living để theo dõi thói quen sống xanh, 
              tham gia thử thách môi trường và kết nối với những người cùng chí hướng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-cyan-600 hover:bg-white/90 px-8 py-3 text-lg">
                  Bắt đầu ngay
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white/30 text-white hover:bg-white/10">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <Card className="glass-effect hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">🌱</span>
                </div>
                <CardTitle className="text-cyan-800">Theo dõi thói quen</CardTitle>
                <CardDescription>
                  Xây dựng và duy trì các thói quen sống xanh hàng ngày
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <CardTitle className="text-cyan-800">Thử thách xanh</CardTitle>
                <CardDescription>
                  Tham gia các thử thách môi trường và nhận phần thưởng
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-effect hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 gradient-green rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <CardTitle className="text-cyan-800">Cộng đồng</CardTitle>
                <CardDescription>
                  Chia sẻ kinh nghiệm và học hỏi từ cộng đồng sống xanh
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-blue-green flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Chào mừng trở lại, {user.name}! 🌿
          </h1>
          <p className="text-white/90 text-lg">
            Hãy tiếp tục hành trình sống xanh của bạn hôm nay
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <Card key={stat.label} className="glass-effect">
              <CardContent className="p-6 text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Green Living Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Hoạt động sống xanh</h2>
            {isAdmin() && (
              <Link to="/admin">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Quản lý hoạt động
                </Button>
              </Link>
            )}
          </div>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {greenLivingImages.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="glass-effect hover:shadow-lg transition-shadow overflow-hidden h-full">
                    <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: `url(${item.image})`}}>
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm">
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-green-800 text-lg">{item.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          📍 {item.location} • 📅 {item.date}
                        </div>
                        <p className="text-sm">{item.description}</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button className="w-full gradient-green text-white">
                        Tham gia ngay
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-cyan-800">Thói quen hôm nay</CardTitle>
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
              <CardTitle className="text-cyan-800">Khám phá địa điểm</CardTitle>
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
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
