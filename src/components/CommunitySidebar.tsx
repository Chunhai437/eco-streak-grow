import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getAllCommunities } from "@/services/CommunityApi";

export const CommunitySidebar = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    if (user) {
      fetchCommunities();
    }
  }, [user]);
  const fetchCommunities = async () => {
    try {
      const data = await getAllCommunities();
      setCommunities(data);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách thói quen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
                 {/* <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-gray-600">Bài viết mới</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2,341</div>
                  <div className="text-sm text-gray-600">Lượt tương tác</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-sm text-gray-600">Thành viên mới</div>
                </div>
              </CardContent>
            </Card> */}
    </>
  );
};
