import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Comment,
  createComment,
  getAllCommentsOfPost,
} from "@/services/PostApi";
import { getUserByID, User } from "@/services/UserApi";

dayjs.extend(relativeTime);

interface CommentSectionProps {
  postId: string;
  isVisible: boolean;
  onClose: () => void;
}

const CommentSection = ({
  postId,
  isVisible,
  onClose,
}: CommentSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userMap, setUserMap] = useState<Record<string, User>>({});

  useEffect(() => {
    if (user && isVisible) {
      fetchCommentsOfPost();
    }
  }, [user, isVisible]);

  const fetchCommentsOfPost = async () => {
    try {
      const data = await getAllCommentsOfPost(postId);
      setComments(data);
      await fetchUserMap(data);
    } catch (error) {
      toast({
        title: "Không thể tải danh sách bình luận",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchUserMap = async (comments: Comment[]) => {
    const users: Record<string, User> = {};

    await Promise.all(
      comments.map(async (comment) => {
        const userId = comment.userId?._id;
        if (userId && !users[userId]) {
          try {
            const fetchedUser = await getUserByID(userId);
            users[userId] = fetchedUser;
          } catch {
            users[userId] = { fullname: "Anonymous User" } as User;
          }
        }
      })
    );

    setUserMap(users);
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsLoading(true);
      await createComment(postId, newComment);
      setNewComment("");
      toast({
        title: "Đã thêm bình luận! 💬",
        description: "Bình luận của bạn đã được đăng thành công.",
      });
      await fetchCommentsOfPost();
    } catch (error) {
      toast({
        title: "Không thể thêm bình luận",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="border-t border-gray-100 mt-4 pt-4">
      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-gray-500 text-center my-4">
          Chưa có bình luận nào. Hãy thêm bình luận của bạn.
        </div>
      ) : (
        <div className="space-y-4 mb-4">
          {comments.map((comment) => {
            const userId = comment.userId?._id;
            const userComment =
              userId && userMap[userId]
                ? userMap[userId]
                : { fullname: "Anonymous User" };

            return (
              <div key={comment._id} className="flex space-x-3">
                <div className="w-8 h-8 gradient-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {userComment.fullname?.charAt(0) ?? "?"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <div className="font-semibold text-sm text-gray-800">
                      {userComment.fullname}
                    </div>
                    <div className="text-gray-700 text-sm mt-1">
                      {comment.content}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 ml-3">
                    {dayjs(comment.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Comment Input */}
      {user && (
        <div className="flex space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={""} alt={user.fullname} />
            <AvatarFallback>{user.fullname?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex space-x-2">
            <Textarea
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[40px] resize-none"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitComment();
                }
              }}
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isLoading}
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
