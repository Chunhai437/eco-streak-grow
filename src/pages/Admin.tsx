import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  MapPin, 
  Calendar,
  TrendingUp,
  Award,
  User
} from 'lucide-react';

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: '',
    points: 0
  });

  const [editingHabit, setEditingHabit] = useState({
    id: 0,
    name: '',
    description: ''
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    type: 'Sự kiện cộng đồng'
  });

  const [editingEvent, setEditingEvent] = useState({
    id: 0,
    title: '',
    description: '',
    location: '',
    date: '',
    type: 'Sự kiện cộng đồng'
  });

  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false);

  const [newPlace, setNewPlace] = useState({
    name: '',
    description: '',
    type: 'coffee',
    address: '',
    latitude: 0,
    longitude: 0,
    image: '',
    greenTags: '',
    voucherName: '',
    voucherDescription: '',
    pointsRequired: 0
  });

  const [editingPlace, setEditingPlace] = useState({
    id: 0,
    name: '',
    description: '',
    type: 'coffee',
    address: '',
    latitude: 0,
    longitude: 0,
    image: '',
    greenTags: '',
    voucherName: '',
    voucherDescription: '',
    pointsRequired: 0
  });

  const [isEditPlaceDialogOpen, setIsEditPlaceDialogOpen] = useState(false);

  const [habits] = useState([
    { id: 1, name: "Mang túi vải", description: "Giảm sử dụng túi nilon", category: "Mua sắm xanh", points: 10, usage: 245 },
    { id: 2, name: "Tắt điện", description: "Tiết kiệm năng lượng", category: "Tiết kiệm điện", points: 5, usage: 189 },
    { id: 3, name: "Mang chai nước", description: "Giảm rác thải nhựa", category: "Giảm rác thải", points: 15, usage: 356 }
  ]);

  const [places, setPlaces] = useState([
    { 
      id: 1, 
      name: "Green Cafe", 
      description: "Quán thân thiện môi trường", 
      type: "coffee", 
      address: "123 Nguyễn Trãi, Q.5, TP.HCM",
      latitude: 10.762622,
      longitude: 106.660172,
      image: "https://res.cloudinary.com/abc/image/upload/v1/sample.jpg",
      greenTags: ["tái chế", "thân thiện môi trường"],
      status: "Hoạt động", 
      vouchers: 4, 
      reviews: 124 
    },
    { 
      id: 2, 
      name: "Eco Market", 
      description: "Siêu thị xanh", 
      type: "market", 
      address: "456 Lê Lợi, Q.1, TP.HCM",
      latitude: 10.773245,
      longitude: 106.701583,
      image: "https://res.cloudinary.com/abc/image/upload/v1/sample2.jpg",
      greenTags: ["organic", "zero waste"],
      status: "Hoạt động", 
      vouchers: 6, 
      reviews: 89 
    }
  ]);

  const [events] = useState([
    { id: 1, title: "Ngày Trái Đất 2024", type: "Sự kiện cộng đồng", date: "22/04/2024", participants: 150, status: "Sắp diễn ra" },
    { id: 2, title: "Workshop Tái Chế", type: "Đối tác", date: "15/04/2024", participants: 45, status: "Đang diễn ra" },
    { id: 3, title: "Chợ Xanh Cuối Tuần", type: "Quán đối tác", date: "20/04/2024", participants: 89, status: "Hoàn thành" }
  ]);

  const stats = [
    { label: "Tổng người dùng", value: "12,543", icon: Users, color: "text-blue-600" },
    { label: "Thói quen được tạo", value: "89", icon: Award, color: "text-green-600" },
    { label: "Địa điểm đối tác", value: "156", icon: MapPin, color: "text-purple-600" },
    { label: "Sự kiện tháng này", value: "23", icon: Calendar, color: "text-orange-600" }
  ];

  // New user management state
  const [users, setUsers] = useState([
    {
      _id: "685a9934123590436dcd9e00",
      username: "chunhai27",
      fullname: "Võ Nguyễn Trung Hải",
      email: "chunhai27@gmail.com",
      password: "$2a$10$JkgsOSii4jzwZLwhIkAVvOoYrq5q3AOA6F6m2lLpsH7Wnqb0ABnhS",
      role: "user",
      address: "123 Main St",
      phoneNumber: "0876567897",
      isVerified: true,
      verificationToken: "157ffbb26179340ec1159c35b100ab51f0d6e4323562aa19fb2192b6aeb7f273",
      createdAt: "2025-06-24T12:25:24.395Z",
      updatedAt: "2025-06-24T12:25:24.395Z",
      __v: 0
    },
    {
      _id: "685a9f46e75f0bfa0680e9ba",
      username: "johndoe",
      fullname: "John Doe",
      email: "johndoe@gmail.com",
      password: "$2a$10$lvddOwIdwwm6JK2MAGYsA.a86BOMmOAONnh6r2hW22J5Kq.cTzr0m",
      role: "admin",
      address: "123 Main St",
      phoneNumber: "0123456789",
      isVerified: true,
      verificationToken: "dc444a65463c09c097b5402354c42d02f81ee310c8ba838c44a1f631bc42fc7f",
      createdAt: "2025-06-24T12:51:18.460Z",
      updatedAt: "2025-06-24T12:51:18.460Z",
      __v: 0,
      firstLogin: true
    }
  ]);

  const [editingUser, setEditingUser] = useState({
    _id: '',
    username: '',
    fullname: '',
    email: '',
    role: 'user',
    address: '',
    phoneNumber: '',
    isVerified: false
  });

  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);

  if (!user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Bạn không có quyền truy cập trang này
          </h1>
          <p className="text-gray-600">Vui lòng đăng nhập với tài khoản admin.</p>
        </div>
      </div>
    );
  }

  const handleCreateHabit = () => {
    if (!newHabit.name || !newHabit.description) return;
    
    toast({
      title: "Tạo thói quen thành công!",
      description: `Thói quen "${newHabit.name}" đã được thêm vào hệ thống.`,
    });
    
    setNewHabit({ name: '', description: '', category: '', points: 0 });
  };

  const handleEditHabit = (habit) => {
    setEditingHabit({
      id: habit.id,
      name: habit.name,
      description: habit.description
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateHabit = () => {
    if (!editingHabit.name || !editingHabit.description) return;
    
    toast({
      title: "Cập nhật thói quen thành công!",
      description: `Thói quen "${editingHabit.name}" đã được cập nhật.`,
    });
    
    setIsEditDialogOpen(false);
    setEditingHabit({ id: 0, name: '', description: '' });
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.description) return;
    
    toast({
      title: "Tạo sự kiện thành công!",
      description: `Sự kiện "${newEvent.title}" đã được thêm vào trang chủ.`,
    });
    
    setNewEvent({ title: '', description: '', location: '', date: '', type: 'Sự kiện cộng đồng' });
  };

  const handleEditEvent = (event) => {
    setEditingEvent({
      id: event.id,
      title: event.title,
      description: '', // Will be loaded from backend in real app
      location: '', // Will be loaded from backend in real app
      date: event.date,
      type: event.type
    });
    setIsEditEventDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent.title || !editingEvent.description) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive"
      });
      return;
    }

    console.log('Updating event with data:', editingEvent);
    
    toast({
      title: "Cập nhật sự kiện thành công!",
      description: `Sự kiện "${editingEvent.title}" đã được cập nhật.`,
    });
    
    setIsEditEventDialogOpen(false);
    setEditingEvent({
      id: 0,
      title: '',
      description: '',
      location: '',
      date: '',
      type: 'Sự kiện cộng đồng'
    });
  };

  const handleCreatePlace = () => {
    if (!newPlace.name || !newPlace.description || !newPlace.address) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive"
      });
      return;
    }

    const placeData = {
      name: newPlace.name,
      description: newPlace.description,
      type: newPlace.type,
      location: {
        latitude: newPlace.latitude,
        longitude: newPlace.longitude,
        address: newPlace.address
      },
      image: newPlace.image,
      greenTags: newPlace.greenTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      partnerVouchers: newPlace.voucherName ? [{
        name: newPlace.voucherName,
        description: newPlace.voucherDescription,
        pointsRequired: newPlace.pointsRequired
      }] : [],
      reviews: []
    };

    console.log('Creating place with data:', placeData);
    
    toast({
      title: "Tạo địa điểm thành công!",
      description: `Địa điểm "${newPlace.name}" đã được thêm vào hệ thống.`,
    });
    
    setNewPlace({
      name: '',
      description: '',
      type: 'coffee',
      address: '',
      latitude: 0,
      longitude: 0,
      image: '',
      greenTags: '',
      voucherName: '',
      voucherDescription: '',
      pointsRequired: 0
    });
  };

  const handleEditPlace = (place) => {
    setEditingPlace({
      id: place.id,
      name: place.name,
      description: place.description,
      type: place.type,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
      image: place.image,
      greenTags: place.greenTags.join(', '),
      voucherName: '',
      voucherDescription: '',
      pointsRequired: 0
    });
    setIsEditPlaceDialogOpen(true);
  };

  const handleUpdatePlace = () => {
    if (!editingPlace.name || !editingPlace.description || !editingPlace.address) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive"
      });
      return;
    }

    const updatedPlaceData = {
      name: editingPlace.name,
      description: editingPlace.description,
      type: editingPlace.type,
      location: {
        latitude: editingPlace.latitude,
        longitude: editingPlace.longitude,
        address: editingPlace.address
      },
      image: editingPlace.image,
      greenTags: editingPlace.greenTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      partnerVouchers: editingPlace.voucherName ? [{
        name: editingPlace.voucherName,
        description: editingPlace.voucherDescription,
        pointsRequired: editingPlace.pointsRequired
      }] : []
    };

    console.log('Updating place with data:', updatedPlaceData);
    
    toast({
      title: "Cập nhật địa điểm thành công!",
      description: `Địa điểm "${editingPlace.name}" đã được cập nhật.`,
    });
    
    setIsEditPlaceDialogOpen(false);
    setEditingPlace({
      id: 0,
      name: '',
      description: '',
      type: 'coffee',
      address: '',
      latitude: 0,
      longitude: 0,
      image: '',
      greenTags: '',
      voucherName: '',
      voucherDescription: '',
      pointsRequired: 0
    });
  };

  const handleDeletePlace = (placeId) => {
    const place = places.find(p => p.id === placeId);
    if (place) {
      console.log('Deleting place:', placeId);
      setPlaces(places.filter(p => p.id !== placeId));
      toast({
        title: "Xóa địa điểm thành công!",
        description: `Địa điểm "${place.name}" đã được xóa khỏi hệ thống.`,
      });
    }
  };

  const handleEditUser = (userData) => {
    setEditingUser({
      _id: userData._id,
      username: userData.username,
      fullname: userData.fullname,
      email: userData.email,
      role: userData.role,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      isVerified: userData.isVerified
    });
    setIsEditUserDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser.username || !editingUser.fullname || !editingUser.email) {
      toast({
        title: "Lỗi!",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc.",
        variant: "destructive"
      });
      return;
    }

    console.log('Updating user with data:', editingUser);
    
    toast({
      title: "Cập nhật người dùng thành công!",
      description: `Thông tin người dùng "${editingUser.fullname}" đã được cập nhật.`,
    });
    
    setIsEditUserDialogOpen(false);
    setEditingUser({
      _id: '',
      username: '',
      fullname: '',
      email: '',
      role: 'user',
      address: '',
      phoneNumber: '',
      isVerified: false
    });
  };

  const handleDeleteUser = (userId) => {
    const userData = users.find(u => u._id === userId);
    if (userData) {
      console.log('Deleting user:', userId);
      setUsers(users.filter(u => u._id !== userId));
      toast({
        title: "Xóa người dùng thành công!",
        description: `Người dùng "${userData.fullname}" đã được xóa khỏi hệ thống.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bảng điều khiển Admin</h1>
          <p className="text-gray-600">Quản lý hệ thống Green Living</p>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="habits">Thói quen</TabsTrigger>
            <TabsTrigger value="places">Địa điểm</TabsTrigger>
            <TabsTrigger value="events">Sự kiện</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="analytics">Thống kê</TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="space-y-6 mt-6">
            {/* Create New Habit */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Tạo thói quen mới
                </CardTitle>
                <CardDescription>
                  Thêm thói quen gốc cho người dùng lựa chọn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Tên thói quen"
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                  />
                  <Input
                    placeholder="Danh mục"
                    value={newHabit.category}
                    onChange={(e) => setNewHabit({...newHabit, category: e.target.value})}
                  />
                </div>
                <Textarea
                  placeholder="Mô tả thói quen"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                />
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    placeholder="Điểm thưởng"
                    value={newHabit.points}
                    onChange={(e) => setNewHabit({...newHabit, points: parseInt(e.target.value) || 0})}
                    className="w-32"
                  />
                  <Button onClick={handleCreateHabit} className="gradient-green text-white">
                    Tạo thói quen
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Existing Habits */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">Danh sách thói quen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {habits.map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-green-800">{habit.name}</h4>
                          <Badge variant="secondary">{habit.category}</Badge>
                          <Badge variant="outline" className="text-green-600">
                            {habit.points} điểm
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{habit.description}</p>
                        <div className="text-xs text-gray-500">
                          Được sử dụng bởi {habit.usage} người dùng
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditHabit(habit)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="places" className="space-y-6 mt-6">
            {/* Create New Place */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Tạo địa điểm xanh mới
                </CardTitle>
                <CardDescription>
                  Thêm địa điểm thân thiện môi trường
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Tên địa điểm *"
                    value={newPlace.name}
                    onChange={(e) => setNewPlace({...newPlace, name: e.target.value})}
                  />
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newPlace.type}
                    onChange={(e) => setNewPlace({...newPlace, type: e.target.value})}
                  >
                    <option value="coffee">Quán cà phê</option>
                    <option value="restaurant">Nhà hàng</option>
                    <option value="market">Siêu thị</option>
                    <option value="store">Cửa hàng</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <Textarea
                  placeholder="Mô tả địa điểm *"
                  value={newPlace.description}
                  onChange={(e) => setNewPlace({...newPlace, description: e.target.value})}
                />
                <Input
                  placeholder="Địa chỉ *"
                  value={newPlace.address}
                  onChange={(e) => setNewPlace({...newPlace, address: e.target.value})}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    step="any"
                    placeholder="Vĩ độ (latitude)"
                    value={newPlace.latitude}
                    onChange={(e) => setNewPlace({...newPlace, latitude: parseFloat(e.target.value) || 0})}
                  />
                  <Input
                    type="number"
                    step="any"
                    placeholder="Kinh độ (longitude)"
                    value={newPlace.longitude}
                    onChange={(e) => setNewPlace({...newPlace, longitude: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <Input
                  placeholder="URL hình ảnh"
                  value={newPlace.image}
                  onChange={(e) => setNewPlace({...newPlace, image: e.target.value})}
                />
                <Input
                  placeholder="Thẻ xanh (cách nhau bởi dấu phẩy)"
                  value={newPlace.greenTags}
                  onChange={(e) => setNewPlace({...newPlace, greenTags: e.target.value})}
                />
                
                {/* Voucher section */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Voucher đối tác (tùy chọn)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Tên voucher"
                      value={newPlace.voucherName}
                      onChange={(e) => setNewPlace({...newPlace, voucherName: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Điểm yêu cầu"
                      value={newPlace.pointsRequired}
                      onChange={(e) => setNewPlace({...newPlace, pointsRequired: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <Textarea
                    placeholder="Mô tả voucher"
                    value={newPlace.voucherDescription}
                    onChange={(e) => setNewPlace({...newPlace, voucherDescription: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <Button onClick={handleCreatePlace} className="gradient-green text-white">
                  Tạo địa điểm
                </Button>
              </CardContent>
            </Card>

            {/* Existing Places */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">Danh sách địa điểm đối tác</CardTitle>
                <CardDescription>
                  Quản lý các địa điểm thân thiện môi trường
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {places.map((place) => (
                    <div key={place.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-green-800">{place.name}</h4>
                          <Badge variant="secondary">{place.type}</Badge>
                          <Badge 
                            variant={place.status === "Hoạt động" ? "default" : "secondary"}
                            className={place.status === "Hoạt động" ? "bg-green-500" : ""}
                          >
                            {place.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{place.description}</p>
                        <div className="text-sm text-gray-600 mb-2">
                          📍 {place.address}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {place.greenTags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-green-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          {place.vouchers} voucher • {place.reviews} đánh giá
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditPlace(place)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeletePlace(place.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6 mt-6">
            {/* Create New Event */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Tạo sự kiện nổi bật
                </CardTitle>
                <CardDescription>
                  Thêm sự kiện mới vào trang chủ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Tiêu đề sự kiện"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  >
                    <option>Sự kiện cộng đồng</option>
                    <option>Đối tác</option>
                    <option>Quán đối tác</option>
                  </select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Địa điểm"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <Textarea
                  placeholder="Mô tả sự kiện"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
                <Button onClick={handleCreateEvent} className="gradient-green text-white">
                  Tạo sự kiện
                </Button>
              </CardContent>
            </Card>

            {/* Existing Events */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">Danh sách sự kiện</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-green-800">{event.title}</h4>
                          <Badge variant="secondary">{event.type}</Badge>
                          <Badge variant="outline">{event.status}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          📅 {event.date} • 👥 {event.participants} người tham gia
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditEvent(event)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 mt-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Quản lý người dùng
                </CardTitle>
                <CardDescription>
                  Danh sách và quản lý tất cả người dùng trong hệ thống
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên đăng nhập</TableHead>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Vai trò</TableHead>
                        <TableHead>SĐT</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((userData) => (
                        <TableRow key={userData._id}>
                          <TableCell className="font-medium">{userData.username}</TableCell>
                          <TableCell>{userData.fullname}</TableCell>
                          <TableCell>{userData.email}</TableCell>
                          <TableCell>
                            <Badge variant={userData.role === 'admin' ? 'default' : 'secondary'}>
                              {userData.role === 'admin' ? 'Admin' : 'Người dùng'}
                            </Badge>
                          </TableCell>
                          <TableCell>{userData.phoneNumber}</TableCell>
                          <TableCell>
                            <Badge variant={userData.isVerified ? 'default' : 'destructive'} className={userData.isVerified ? 'bg-green-500' : ''}>
                              {userData.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(userData.createdAt).toLocaleDateString('vi-VN')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditUser(userData)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteUser(userData._id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-green-800">Tăng trưởng người dùng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Tháng này</span>
                      <span className="font-semibold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tuần này</span>
                      <span className="font-semibold text-blue-600">+3.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Hôm nay</span>
                      <span className="font-semibold text-purple-600">+45 người</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="text-green-800">Thói quen phổ biến nhất</CardTitle>
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
                <CardTitle className="text-green-800">Tác động môi trường</CardTitle>
                <CardDescription>
                  Ước tính các chỉ số môi trường từ hoạt động của người dùng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">2,847 kg</div>
                    <div className="text-sm text-gray-600">CO2 tiết kiệm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">1,543 L</div>
                    <div className="text-sm text-gray-600">Nước tiết kiệm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">456 kg</div>
                    <div className="text-sm text-gray-600">Rác thải giảm</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">234 kWh</div>
                    <div className="text-sm text-gray-600">Điện tiết kiệm</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Habit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-green-800">Chỉnh sửa thói quen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tên thói quen
                </label>
                <Input
                  placeholder="Tên thói quen"
                  value={editingHabit.name}
                  onChange={(e) => setEditingHabit({...editingHabit, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mô tả
                </label>
                <Textarea
                  placeholder="Mô tả thói quen"
                  value={editingHabit.description}
                  onChange={(e) => setEditingHabit({...editingHabit, description: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleUpdateHabit}
                  className="gradient-green text-white"
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Place Dialog */}
        <Dialog open={isEditPlaceDialogOpen} onOpenChange={setIsEditPlaceDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-green-800">Chỉnh sửa địa điểm xanh</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tên địa điểm *
                  </label>
                  <Input
                    placeholder="Tên địa điểm"
                    value={editingPlace.name}
                    onChange={(e) => setEditingPlace({...editingPlace, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Loại địa điểm
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={editingPlace.type}
                    onChange={(e) => setEditingPlace({...editingPlace, type: e.target.value})}
                  >
                    <option value="coffee">Quán cà phê</option>
                    <option value="restaurant">Nhà hàng</option>
                    <option value="market">Siêu thị</option>
                    <option value="store">Cửa hàng</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mô tả *
                </label>
                <Textarea
                  placeholder="Mô tả địa điểm"
                  value={editingPlace.description}
                  onChange={(e) => setEditingPlace({...editingPlace, description: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Địa chỉ *
                </label>
                <Input
                  placeholder="Địa chỉ"
                  value={editingPlace.address}
                  onChange={(e) => setEditingPlace({...editingPlace, address: e.target.value})}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Vĩ độ (Latitude)
                  </label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="Vĩ độ"
                    value={editingPlace.latitude}
                    onChange={(e) => setEditingPlace({...editingPlace, latitude: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Kinh độ (Longitude)
                  </label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="Kinh độ"
                    value={editingPlace.longitude}
                    onChange={(e) => setEditingPlace({...editingPlace, longitude: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  URL hình ảnh
                </label>
                <Input
                  placeholder="URL hình ảnh"
                  value={editingPlace.image}
                  onChange={(e) => setEditingPlace({...editingPlace, image: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Thẻ xanh (cách nhau bởi dấu phẩy)
                </label>
                <Input
                  placeholder="tái chế, thân thiện môi trường"
                  value={editingPlace.greenTags}
                  onChange={(e) => setEditingPlace({...editingPlace, greenTags: e.target.value})}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-700 mb-3">Voucher đối tác (tùy chọn)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Tên voucher
                    </label>
                    <Input
                      placeholder="Tên voucher"
                      value={editingPlace.voucherName}
                      onChange={(e) => setEditingPlace({...editingPlace, voucherName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Điểm yêu cầu
                    </label>
                    <Input
                      type="number"
                      placeholder="Điểm yêu cầu"
                      value={editingPlace.pointsRequired}
                      onChange={(e) => setEditingPlace({...editingPlace, pointsRequired: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Mô tả voucher
                  </label>
                  <Textarea
                    placeholder="Mô tả voucher"
                    value={editingPlace.voucherDescription}
                    onChange={(e) => setEditingPlace({...editingPlace, voucherDescription: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditPlaceDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleUpdatePlace}
                  className="gradient-green text-white"
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-green-800">Chỉnh sửa thông tin người dùng</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tên đăng nhập *
                  </label>
                  <Input
                    placeholder="Tên đăng nhập"
                    value={editingUser.username}
                    onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Họ tên *
                  </label>
                  <Input
                    placeholder="Họ tên"
                    value={editingUser.fullname}
                    onChange={(e) => setEditingUser({...editingUser, fullname: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Vai trò
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  >
                    <option value="user">Người dùng</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Số điện thoại
                  </label>
                  <Input
                    placeholder="Số điện thoại"
                    value={editingUser.phoneNumber}
                    onChange={(e) => setEditingUser({...editingUser, phoneNumber: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Địa chỉ
                </label>
                <Input
                  placeholder="Địa chỉ"
                  value={editingUser.address}
                  onChange={(e) => setEditingUser({...editingUser, address: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isVerified"
                  checked={editingUser.isVerified}
                  onChange={(e) => setEditingUser({...editingUser, isVerified: e.target.checked})}
                  className="rounded"
                />
                <label htmlFor="isVerified" className="text-sm font-medium text-gray-700">
                  Đã xác thực tài khoản
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditUserDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleUpdateUser}
                  className="gradient-green text-white"
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Event Dialog */}
        <Dialog open={isEditEventDialogOpen} onOpenChange={setIsEditEventDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-green-800">Chỉnh sửa sự kiện</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tiêu đề sự kiện *
                  </label>
                  <Input
                    placeholder="Tiêu đề sự kiện"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Loại sự kiện
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={editingEvent.type}
                    onChange={(e) => setEditingEvent({...editingEvent, type: e.target.value})}
                  >
                    <option value="Sự kiện cộng đồng">Sự kiện cộng đồng</option>
                    <option value="Đối tác">Đối tác</option>
                    <option value="Quán đối tác">Quán đối tác</option>
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Địa điểm
                  </label>
                  <Input
                    placeholder="Địa điểm"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Ngày diễn ra
                  </label>
                  <Input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Mô tả sự kiện *
                </label>
                <Textarea
                  placeholder="Mô tả sự kiện"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditEventDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button 
                  onClick={handleUpdateEvent}
                  className="gradient-green text-white"
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
