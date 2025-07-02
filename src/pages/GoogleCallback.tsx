import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "@/components/ui/use-toast"; // hoặc từ `sonner` nếu bạn dùng `sonner`

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const baseUrl = import.meta.env.VITE_API_URL;

    if (!code) {
      toast({
        title: "Lỗi xác thực!",
        description: "Không có mã xác thực từ Google.",
        variant: "destructive",
      });
      return;
    }

    const fetchToken = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/auth/google/callback?code=${code}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          const token = data.token;

          const decoded = jwtDecode(token);
          localStorage.setItem("accessToken", token);
          localStorage.setItem("user", JSON.stringify(decoded));

          toast({
            title: "Đăng nhập Google thành công!",
            description: "Chào mừng bạn đến với Eco Habit.",
          });

          navigate("/");
        } else {
          toast({
            title: "Lỗi đăng nhập Google!",
            description: data.message || "Không thể xử lý xác thực Google.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Lỗi callback Google:", err);
        toast({
          title: "Lỗi hệ thống!",
          description: "Không thể kết nối đến máy chủ.",
          variant: "destructive",
        });
      }
    };

    fetchToken();
  }, []);

  return <p>Đang xử lý đăng nhập từ Google...</p>;
};

export default GoogleCallback;
