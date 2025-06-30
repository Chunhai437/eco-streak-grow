
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

interface RatingDialogProps {
  placeName: string;
  children: React.ReactNode;
}

const RatingDialog = ({ placeName, children }: RatingDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast({
        title: "Vui lòng chọn số sao",
        description: "Bạn cần chọn ít nhất 1 sao để đánh giá.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Đánh giá thành công! ⭐",
      description: `Cảm ơn bạn đã đánh giá ${rating} sao cho ${placeName}`,
    });

    // Reset form
    setRating(0);
    setComment('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-800">Đánh giá {placeName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Star Rating */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Bạn đánh giá như thế nào về địa điểm này?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-green-600 mt-2">
                {rating === 1 && "Không hài lòng"}
                {rating === 2 && "Tạm được"}
                {rating === 3 && "Bình thường"}
                {rating === 4 && "Tốt"}
                {rating === 5 && "Xuất sắc"}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Chia sẻ trải nghiệm của bạn (tùy chọn)
            </label>
            <Textarea
              placeholder="Hãy chia sẻ những gì bạn thích hoặc không thích về địa điểm này..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmitRating}
            className="w-full gradient-green text-white"
          >
            Gửi đánh giá
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
