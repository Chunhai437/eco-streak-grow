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
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  MapPin, 
  Calendar,
  TrendingUp,
  Award
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

  const [habits] = useState([
    { id: 1, name: "Mang túi vải", description: "Giảm sử dụng túi nilon", category: "Mua sắm xanh", points: 10, usage: 245 },
    { id: 2, name: "Tắt điện", description: "Tiết kiệm năng lượng", category: "Tiết kiệm điện", points: 5, usage: 189 },
    { id: 3, name: "Mang chai nước", description: "Giảm rác thải nhựa", category: "Giảm rác thải", points: 15, usage: 356 }
  ]);

  const [places] = useState([
    { id: 1, name: "Green Cafe", type: "Quán cafe", status: "Hoạt động", vouchers: 4, reviews: 124 },
    { id: 2, name: "Eco Market", type: "Siêu thị", status: "Hoạt động", vouchers: 6, reviews: 89 },
    { id: 3, name: "Urban Garden", type: "Nhà hàng", status: "Chờ duyệt", vouchers: 3, reviews: 203 }
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="habits">Thói quen</TabsTrigger>
            <TabsTrigger value="places">Địa điểm</TabsTrigger>
            <TabsTrigger value="events">Sự kiện</TabsTrigger>
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
                        <div className="text-sm text-gray-600">
                          {place.vouchers} voucher • {place.reviews} đánh giá
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
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
                        <Button size="sm" variant="outline">
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
      </div>
    </div>
  );
};

export default Admin;
