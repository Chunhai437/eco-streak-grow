
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Vui lòng đăng nhập để khám phá địa điểm xanh
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Địa điểm xanh</h1>
          <p className="text-gray-600">Khám phá và ủng hộ các doanh nghiệp thân thiện môi trường</p>
        </div>

        {/* Search and Stats */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tìm kiếm địa điểm, loại hình, hoặc thẻ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Card className="glass-effect px-6 py-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Điểm của bạn: {userPoints}</span>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explore">Khám phá</TabsTrigger>
            <TabsTrigger value="vouchers">Voucher</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <Card key={place.id} className="glass-effect hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${place.image})`}}>
                    <div className="h-full bg-black bg-opacity-30 flex items-end p-4">
                      <Badge variant="secondary" className="bg-white text-gray-800">
                        {place.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-green-800">{place.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{place.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">{place.rating}</span>
                        <span className="text-xs text-gray-600">({place.reviews})</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm">{place.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-green-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-800 text-sm">Đặc điểm xanh:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {place.greenFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {place.vouchers.length} voucher có sẵn
                        </span>
                        <Button size="sm" variant="outline" className="border-green-200 hover:bg-green-50">
                          Xem chi tiết
                        </Button>
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
                <Card key={place.id} className="glass-effect">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      {place.name}
                    </CardTitle>
                    <CardDescription>{place.type} • {place.address}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {place.vouchers.map((voucher) => (
                        <div key={voucher.id} className="p-4 border border-green-200 rounded-lg bg-green-50">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-green-800">{voucher.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Gift className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-green-700">{voucher.points} điểm</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => handleRedeemVoucher(voucher, place.name)}
                            className="w-full gradient-green text-white"
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
