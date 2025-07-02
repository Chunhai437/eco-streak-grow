import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { add } from "date-fns";
import logo from "../assets/avt.png";

const Auth = () => {
  const { login, register, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng bạn quay trở lại.",
      });
      window.location.href = "/";
    } catch (error) {
      toast({
        title: "Lỗi đăng nhập",
        description: "Email hoặc mật khẩu không chính xác.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(
        registerData.username,
        registerData.fullname,
        registerData.email,
        registerData.password,
        registerData.address,
        registerData.phoneNumber
      );
      toast({
        title: "Đăng ký thành công!",
        description: "Tài khoản của bạn đã được tạo.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Lỗi đăng ký",
        description: "Có lỗi xảy ra, vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle(); // redirect rồi thì thôi
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-800">Eco Habit</h1>
          <p className="text-green-600 mt-2">
            Cùng nhau sống xanh, bảo vệ môi trường
          </p>
        </div>

        <Card className="glass-effect shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-green-800">
              Chào mừng!
            </CardTitle>
            <CardDescription className="text-center">
              Đăng nhập hoặc tạo tài khoản để bắt đầu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="register">Đăng ký</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mật khẩu</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gradient-green text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-green-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-green-600">Hoặc</span>
                  </div>
                </div>

                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full border-green-200 hover:bg-green-50"
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập với Google"}
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Tên tài khoản</Label>
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="yourusername"
                      value={registerData.username}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          username: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-fullname">Họ tên</Label>
                    <Input
                      id="register-fullname"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={registerData.fullname}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          fullname: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Mật khẩu</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-address">Địa chỉ</Label>
                    <Input
                      id="register-address"
                      type="text"
                      placeholder="123 Nam Kì Khởi Nghĩa, Quận 1, TP.HCM"
                      value={registerData.address}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-phone-number">Số điện thoại</Label>
                    <Input
                      id="register-phone-number"
                      type="tel"
                      placeholder="0123456789"
                      value={registerData.phoneNumber}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gradient-green text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
