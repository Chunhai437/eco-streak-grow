import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

import { CommunityPost } from "@/components/CommunityPost";
import { getAllCommunities } from "@/services/CommunityApi";

const Community = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState("");

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
        title: "Không thể tải danh sách cộng đồng",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Vui lòng đăng nhập để tham gia cộng đồng
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cộng đồng sống xanh
          </h1>
          <p className="text-gray-600">
            Chia sẻ và học hỏi kinh nghiệm sống bền vững
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-effect mb-6">
              <CardHeader>
                <CardTitle className="text-green-800">Danh mục</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-green-50"
                  onClick={() => setSelectedId("")}
                >
                  Tất cả
                </Button>
                {communities.map((community) => (
                  <Button
                    key={community._id}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-green-50"
                    onClick={() => setSelectedId(community._id)}
                  >
                    {community.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
          {/* Main Content */}
          <CommunityPost communityId={selectedId} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Community;
