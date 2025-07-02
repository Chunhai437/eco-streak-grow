import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getPlacesById } from "@/services/PlaceApi";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ReviewDialogProps {
  placeId: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
}

const ReviewDialog = ({ placeId, trigger, children }: ReviewDialogProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchReviews();
    }
  }, [user]);
  const fetchReviews = async () => {
    try {
      const data = await getPlacesById(placeId);
      setReviews(data.reviews);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách địa điểm",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || children || (
          <div className="flex items-center gap-1 text-yellow-500 cursor-pointer">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">Xem đánh giá</span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Đánh giá người dùng</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-2">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm">Chưa có đánh giá nào</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="mb-4 border-b pb-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {review?.userFullName || "Người dùng ẩn danh"}
                  </span>
                  <span className="text-yellow-500 text-sm flex items-center">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    {review.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
