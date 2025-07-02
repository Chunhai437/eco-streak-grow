import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Community,
  createCommunity,
  getAllCommunities,
} from "@/services/CommunityApi";

export const AdminCommunity = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    createdAt: "",
  });
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    if (user && isAdmin()) {
      fetchCommunities(); // chỉ fetch nếu đúng quyền
    }
  }, [user]); // hoặc [user, isAdmin]
  const fetchCommunities = async () => {
    try {
      const data = await getAllCommunities();
      setCommunities(data);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách cộng đồng",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateCommunity = async () => {
    setIsLoading(true);
    if (!newCommunity.name || !newCommunity.description) return;

    try {
      const now = new Date().toISOString();
      const communityToCreate: Community = {
        ...newCommunity,
        createdAt: now,
      };

      await createCommunity(communityToCreate);
      setIsLoading(false);
      toast({
        title: "Tạo cộng đồng thành công!",
        description: `Cộng đồng "${newCommunity.name}" đã được thêm vào.`,
      });

      setNewCommunity({ name: "", description: "", createdAt: "" });
      fetchCommunities();
    } catch (error) {
      toast({
        title: "Lỗi tạo cộng đồng",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Create New community */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo cộng đồng
          </CardTitle>
          <CardDescription>Thêm cộng đồng mới vào trang chủ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Tên cộng đồng"
              value={newCommunity.name}
              onChange={(e) =>
                setNewCommunity({ ...newCommunity, name: e.target.value })
              }
            />
          </div>
          <Textarea
            placeholder="Mô tả cộng đồng"
            value={newCommunity.description}
            onChange={(e) =>
              setNewCommunity({ ...newCommunity, description: e.target.value })
            }
          />
          <Button
            onClick={handleCreateCommunity}
            className="gradient-green text-white"
            disabled={isLoading}
          >
            {isLoading ? "Đang tạo cộng đồng..." : "Tạo cộng đồng"}
          </Button>
        </CardContent>
      </Card>

      {/* Existing Communities */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-green-800">Danh sách cộng đồng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communities.map((community) => (
              <div
                key={community._id}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-green-800">
                      {community.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className="bg-green-500 text-white"
                    >
                      Đang hoạt động
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2 word-break">
                    {community.description}
                  </p>
                </div>
                {/* <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div> */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
