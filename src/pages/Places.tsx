
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import RatingDialog from '@/components/RatingDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Star, Gift, Search, Filter } from 'lucide-react';

const Places = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [places] = useState([
    {
      id: 1,
      name: "Green Cafe & Bistro",
      type: "Quán cafe",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      rating: 4.8,
      reviews: 124,
      tags: ["Organic", "Zero waste", "Vegan friendly"],
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=300&fit=crop",
      description: "Quán cafe với concept zero waste, phục vụ đồ uống organic và thực phẩm thuần chay.",
      vouchers: [
        { id: 1, title: "Giảm 20% tổng bill", points: 100 },
        { id: 2, title: "Tặng 1 ly cafe khi mua 2", points: 150 }
      ],
      greenFeatures: ["Tái chế 100% rác thải", "Sử dụng năng lượng mặt trời", "Menu thuần chay"]
    },
    {
      id: 2,
      name: "Eco Market",
      type: "Siêu thị",
      address: "456 Đường Lê Lợi, Quận 3, TP.HCM",
      rating: 4.6,
      reviews: 89,
      tags: ["Organic food", "Eco products", "Local brands"],
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop",
      description: "Siêu thị chuyên cung cấp thực phẩm hữu cơ và sản phẩm thân thiện môi trường.",
      vouchers: [
        { id: 3, title: "Voucher 50k cho đơn từ 200k", points: 200 },
        { id: 4, title: "Giảm 15% sản phẩm organic", points: 120 }
      ],
      greenFeatures: ["100% sản phẩm hữu cơ", "Bao bì tái chế", "Hỗ trợ nông dân địa phương"]
    },
    {
      id: 3,
      name: "Urban Garden Restaurant",
      type: "Nhà hàng",
      address: "789 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
      rating: 4.9,
      reviews: 203,
      tags: ["Farm to table", "Organic", "Sustainable"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
      description: "Nhà hàng với concept farm-to-table, trồng rau sạch ngay tại chỗ.",
      vouchers: [
        { id: 5, title: "Giảm 25% cho bữa tối", points: 300 },
        { id: 6, title: "Miễn phí appetizer", points: 100 }
      ],
      greenFeatures: ["Vườn rau hữu cơ riêng", "Sử dụng năng lượng tái tạo", "Không plastic"]
    }
  ]);

  const [userPoints] = useState(450);

  const handleRedeemVoucher = (voucher: any, placeName: string) => {
    if (userPoints >= voucher.points) {
      toast({
        title: "Đổi voucher thành công! 🎉",
        description: `Bạn đã đổi "${voucher.title}" tại ${placeName}`,
      });
    } else {
      toast({
        title: "Không đủ điểm",
        description: `Bạn cần ${voucher.points - userPoints} điểm nữa để đổi voucher này.`,
        variant: "destructive",
      });
    }
  };

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-blue-green">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="glass-effect max-w-md mx-auto p-8 rounded-xl">
            <h1 className="text-3xl font-bold text-white mb-4">
              Vui lòng đăng nhập để khám phá địa điểm xanh
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-blue-green">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Địa điểm xanh</h1>
          <p className="text-white/80 text-lg">Khám phá và ủng hộ các doanh nghiệp thân thiện môi trường</p>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm địa điểm, loại hình, hoặc thẻ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-effect border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          
          <div className="glass-effect px-6 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">Điểm của bạn: {userPoints}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass-effect border-white/20">
            <TabsTrigger value="explore" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Khám phá
            </TabsTrigger>
            <TabsTrigger value="vouchers" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
              Voucher
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <Card key={place.id} className="glass-effect border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: `url(${place.image})`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800 backdrop-blur-sm">
                        {place.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl">{place.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-2">
                          <MapPin className="w-4 h-4 text-white/60" />
                          <span className="text-sm text-white/70">{place.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">{place.rating}</span>
                        <span className="text-xs text-white/60">({place.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-white/80 text-sm">{place.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/30 text-white/90 bg-white/10">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white text-sm">Đặc điểm xanh:</h4>
                      <ul className="text-sm text-white/70 space-y-1">
                        {place.greenFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white/80">
                          {place.vouchers.length} voucher có sẵn
                        </span>
                        <RatingDialog placeName={place.name}>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Star className="w-4 h-4 mr-1" />
                            Đánh giá
                          </Button>
                        </RatingDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vouchers" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {places.map((place) => (
                <Card key={place.id} className="glass-effect border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      {place.name}
                    </CardTitle>
                    <CardDescription className="text-white/70">{place.type} • {place.address}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {place.vouchers.map((voucher) => (
                        <div key={voucher.id} className="p-4 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">{voucher.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Gift className="w-4 h-4 text-white/80" />
                                <span className="text-sm text-white/80">{voucher.points} điểm</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => handleRedeemVoucher(voucher, place.name)}
                            className="w-full bg-white/20 text-white hover:bg-white/30 border-0"
                            disabled={userPoints < voucher.points}
                          >
                            {userPoints >= voucher.points ? 'Đổi voucher' : 'Không đủ điểm'}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Places;
