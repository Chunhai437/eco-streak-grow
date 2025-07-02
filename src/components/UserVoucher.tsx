import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Gift } from "lucide-react";
import { Button } from "./ui/button";
import { getAllPlaces } from "@/services/PlaceApi";

interface VoucherProps {
  userPoints: number;
  setUserPoints: (points: number) => void;
}
export const UserVoucher = ({ userPoints, setUserPoints }: VoucherProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [places, setPlaces] = useState([]);
  const [redeemedVouchers, setRedeemedVouchers] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      fetchPlaces();
    }
  }, [user]);

  const fetchPlaces = async () => {
    try {
      const data = await getAllPlaces();
      setPlaces(data);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách địa điểm",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRedeemVoucher = (voucher, placeName: string) => {
    if (redeemedVouchers.includes(voucher._id)) {
      toast({
        title: "Bạn đã đổi voucher này rồi",
        description: "Hãy chọn voucher khác nhé!",
        variant: "default",
      });
      return;
    }

    if (userPoints >= voucher.pointsRequired) {
      setUserPoints(userPoints - voucher.pointsRequired);
      setRedeemedVouchers([...redeemedVouchers, voucher._id]); // ✅ thêm voucher vào danh sách đã đổi

      toast({
        title: "🎉 Đổi voucher thành công!",
        description: `Bạn đã đổi "${voucher.name}" tại ${placeName}`,
      });
    } else {
      toast({
        title: "Không đủ điểm",
        description: `Bạn cần ${
          voucher.pointsRequired - userPoints
        } điểm nữa để đổi voucher này.`,
        variant: "destructive",
      });
    }
  };

  if (places.length === 0) {
    return (
      <div className="text-center mt-8">
        <p className="text-gray-500">Chưa có vouchers nào được cung cấp</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6">
        {places
          .filter(
            (place) => place.partnerVouchers && place.partnerVouchers.length > 0
          )
          .map((place) => (
            <Card key={place._id} className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  {place.name}
                </CardTitle>
                <CardDescription>
                  {place.type === "coffee"
                    ? "Quán cà phê"
                    : place.type === "shop"
                    ? "Cửa hàng"
                    : place.type === "recycle"
                    ? "Tái chế"
                    : place.type === "restaurant"
                    ? "Nhà hàng"
                    : "Khác"}{" "}
                  • {place.location.address}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {place.partnerVouchers.map((voucher) => (
                    <div
                      key={voucher._id}
                      className="p-4 border border-green-200 rounded-lg bg-green-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-800">
                            {voucher.name}
                          </h4>
                          <p className="text-sm text-green-700">
                            {voucher.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Gift className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-700">
                              {voucher.pointsRequired} điểm
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleRedeemVoucher(voucher, place.name)}
                        className="w-full gradient-green text-white"
                        disabled={
                          userPoints < voucher.pointsRequired ||
                          redeemedVouchers.includes(voucher._id)
                        }
                      >
                        {redeemedVouchers.includes(voucher._id)
                          ? "Đã đổi"
                          : userPoints >= voucher.pointsRequired
                          ? "Đổi voucher"
                          : "Không đủ điểm"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};
