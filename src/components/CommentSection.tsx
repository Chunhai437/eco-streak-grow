
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
}

interface CommentSectionProps {
  postId: number;
  isVisible: boolean;
  onClose: () => void;
}

const CommentSection = ({ postId, isVisible, onClose }: CommentSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  
  // Mock comments data - in real app this would come from backend
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: "Lan Anh",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      content: "Thật tuyệt vời! Mình cũng đang thử thách tương tự. Cảm ơn bạn đã chia sẻ!",
      timeAgo: "1 giờ trước"
    },
    {
      id: 2,
      author: {
        name: "Minh Đức",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
      },
      content: "Mình cũng muốn tham gia. Bạn có thể chia sẻ thêm kinh nghiệm không?",
      timeAgo: "30 phút trước"
    }
  ]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: comments.length + 1,
      author: {
        name: user?.name || "Bạn",
        avatar: user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      content: newComment,
      timeAgo: "Vừa xong"
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    
    toast({
      title: "Đã thêm bình luận! 💬",
      description: "Bình luận của bạn đã được đăng thành công.",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="border-t border-gray-100 mt-4 pt-4">
      {/* Comments List */}
      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
              <AvatarFallback>
                {comment.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <div className="font-semibold text-sm text-gray-800">
                  {comment.author.name}
                </div>
                <div className="text-gray-700 text-sm mt-1">
                  {comment.content}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1 ml-3">
                {comment.timeAgo}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      {user && (
        <div className="flex space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex space-x-2">
            <Textarea
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[40px] resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitComment();
                }
              }}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              size="sm"
              className="gradient-green text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
