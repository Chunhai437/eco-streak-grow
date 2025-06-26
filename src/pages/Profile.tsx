
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Lock, MapPin, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.name?.toLowerCase().replace(/\s+/g, '') || '',
    fullname: user?.name || '',
    email: user?.email || '',
    password: '',
    address: ''
  });

  const handleSave = async () => {
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Cập nhật thành công!",
        description: "Thông tin cá nhân đã được cập nhật.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Lỗi cập nhật",
        description: "Có lỗi xảy ra, vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setProfileData({
      username: user?.name?.toLowerCase().replace(/\s+/g, '') || '',
      fullname: user?.name || '',
      email: user?.email || '',
      password: '',
      address: ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <p className="text-gray-600">Vui lòng đăng nhập để xem thông tin cá nhân.</p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800">Thông tin cá nhân</h1>
            <p className="text-green-600 mt-2">Quản lý thông tin tài khoản của bạn</p>
          </div>

          <Card className="glass-effect shadow-xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 gradient-green rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-green-800">
                {isEditing ? 'Chỉnh sửa thông tin' : 'Thông tin cá nhân'}
              </CardTitle>
              <CardDescription>
                {isEditing ? 'Cập nhật thông tin của bạn' : 'Xem và chỉnh sửa thông tin cá nhân'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Tên người dùng
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullname" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Họ và tên
                  </Label>
                  <Input
                    id="fullname"
                    type="text"
                    value={profileData.fullname}
                    onChange={(e) => setProfileData({...profileData, fullname: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Mật khẩu mới (để trống nếu không muốn thay đổi)
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={profileData.password}
                      onChange={(e) => setProfileData({...profileData, password: e.target.value})}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Địa chỉ
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Nhập địa chỉ của bạn"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="w-full gradient-green text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleSave}
                      className="flex-1 gradient-green text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thay đổi
                    </Button>
                    <Button 
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 border-green-200 hover:bg-green-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Hủy
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
