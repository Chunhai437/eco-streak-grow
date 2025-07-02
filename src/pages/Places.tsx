
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Star, Gift, Search, Filter } from "lucide-react";
import Footer from "@/components/Footer";
import { UserPlace } from "@/components/UserPlace";
import { UserVoucher } from "@/components/UserVoucher";

const Places = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const [userPoints, setUserPoints] = useState(450);

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Địa điểm xanh
          </h1>
          <p className="text-gray-600">
            Khám phá và ủng hộ các doanh nghiệp thân thiện môi trường
          </p>
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
              <span className="font-semibold text-green-800">
                Điểm của bạn: {userPoints}
              </span>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explore">Khám phá</TabsTrigger>
            <TabsTrigger value="vouchers">Voucher</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6 mt-6">
            <UserPlace searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="vouchers" className="space-y-6 mt-6">
            <UserVoucher
              userPoints={userPoints}
              setUserPoints={setUserPoints}
            />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Places;
