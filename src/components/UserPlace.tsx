import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import RatingDialog from "./RatingDialog";
import { getAllPlaces } from "@/services/PlaceApi";
import { pl } from "date-fns/locale";
import ReviewDialog from "./ReviewDialog";

interface UserPlaceProps {
  searchTerm: string;
}

export const UserPlace = ({ searchTerm }: UserPlaceProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [places, setPlaces] = useState([]);

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

  const filteredPlaces = places.filter(
    (place) =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.greenTags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (filteredPlaces.length === 0) {
    return (
      <div className="flex flex-col items-center h-screen text-gray-600 ">
        <h1 className="text-3xl font-bold text-center mt-4">
          Chưa có địa điểm nào phù hợp
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => {
          const totalRating =
            place.reviews.length > 0
              ? place.reviews.reduce((acc, review) => acc + review.rating, 0) /
                place.reviews.length
              : 0;

          return (
            <Card
              key={place._id}
              className="glass-effect hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${place.image})` }}
              >
                <div className="h-full bg-black bg-opacity-30 flex items-end p-4">
                  <Badge variant="secondary" className="bg-white text-gray-800">
                    {place.type === "coffee"
                      ? "Quán cà phê"
                      : place.type === "shop"
                      ? "Cửa hàng"
                      : place.type === "recycle"
                      ? "Tái chế"
                      : place.type === "restaurant"
                      ? "Nhà hàng"
                      : "Khác"}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-green-800">
                      {place.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {place.location.address}
                      </span>
                    </div>
                  </div>
                  <ReviewDialog placeId={place._id}>
                    <div className="flex items-center gap-1 text-yellow-500 cursor-pointer hover:underline">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">
                        {Math.round(totalRating).toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-600">
                        ({place.reviews.length})
                      </span>
                    </div>
                  </ReviewDialog>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm">{place.description}</p>

                <div className="flex flex-wrap gap-2">
                  {place.greenTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-green-600"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {place.partnerVouchers.length}{" "}
                      {place.partnerVouchers.length === 1
                        ? "voucher"
                        : "vouchers"}{" "}
                      có sẵn
                    </span>
                    <RatingDialog
                      placeName={place.name}
                      placeId={place._id}
                      refresh={fetchPlaces}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-200 hover:bg-green-50"
                      >
                        <Star className="w-4 h-4 mr-1" />
                        Đánh giá
                      </Button>
                    </RatingDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};
