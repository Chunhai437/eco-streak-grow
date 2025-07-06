import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";
import { Heart, ImageIcon, MessageCircle, Share2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import CommentSection from "./CommentSection";
import {
  createPost,
  getAllPosts,
  getPostsOfCommunity,
  likePost,
  Post,
  unLikePost,
} from "@/services/PostApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getUserByID, User } from "@/services/UserApi";
import { Spinner } from "./Spinner/Spinner";
import { uploadImage } from "@/services/MediaApi";
import { is } from "date-fns/locale";
import ImageUploader from "./ImageLoader";

dayjs.extend(relativeTime);

interface CommunityPostProps {
  communityId: string;
  children?: React.ReactNode;
}

export const CommunityPost = ({ communityId }: CommunityPostProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [newPost, setNewPost] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [activeComments, setActiveComments] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [userMap, setUserMap] = useState<Record<string, User>>({});

  useEffect(() => {
    if (user) {
      if (communityId) fetchPostsOfCommunity();
      else fetchAllPosts();
    }
  }, [user, communityId]);

  const fetchAllPosts = async () => {
    try {
      setLoadingPage(true);
      const data = await getAllPosts();
      setPosts(data);
      await fetchUserMap(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Lỗi không xác định";
      toast({
        title: "Không thể tải danh sách bài đăng",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const fetchPostsOfCommunity = async () => {
    try {
      setLoadingPage(true);
      const data = await getPostsOfCommunity(communityId);
      setPosts(data);
      await fetchUserMap(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Lỗi không xác định";
      toast({
        title: "Không thể tải danh sách bài đăng",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoadingPage(false);
    }
  };

  const fetchUserMap = async (posts: Post[]) => {
    const users: Record<string, User> = {};

    await Promise.all(
      posts.map(async (post) => {
        const userId = post.userId?._id;

        if (userId && !users[userId]) {
          try {
            const user = await getUserByID(userId);
            users[userId] = user;
          } catch {
            users[userId] = { fullname: "Anonymous User" };
          }
        }
      })
    );

    setUserMap(users);
  };

  const handleCreatePost = async () => {
    if (!newPost.trim() || !user) return;

    try {
      setIsLoading(true);

      await createPost("", newPost, imageUrl, communityId);
      toast({
        title: "Đăng bài thành công!",
        description: "Bài viết của bạn đã được chia sẻ với cộng đồng.",
      });
      setNewPost("");
      setImageUrl("");
      if (communityId) fetchPostsOfCommunity();
      else fetchAllPosts();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Lỗi không xác định";
      toast({
        title: "Không thể tạo bài viết",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLike = async (postId: string) => {
    if (!user) return;

    const post = posts.find((p) => p._id === postId);
    if (!post) return;

    const liked = post.likedByUser;

    try {
      // Gọi API trước
      if (liked) {
        await unLikePost(postId, user.id);
        toast({
          title: "Bỏ thích bài viết",
          description: "Ơ tại sao vậy 🥲!",
          variant: "default",
        });
      } else {
        await likePost(postId, user.id);
        toast({
          title: "Thích bài viết",
          description: "Cảm ơn bạn đã thích bài viết này ❤️!",
          variant: "default",
        });
      }

      // Nếu thành công mới cập nhật UI
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                likedByUser: !liked,
                likeCount: liked ? p.likeCount - 1 : p.likeCount + 1,
              }
            : p
        )
      );
    } catch (error) {
      toast({
        title: "Đã thích 😍",
        description: "Bạn đã bấm thích bài viết này rồi !",
        variant: "default",
      });
    }
  };

  if (loadingPage || !user) {
    return <Spinner />;
  }

  return (
    <div className="lg:col-span-3 space-y-6">
      {communityId && user && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-green-800">
              Chia sẻ câu chuyện xanh
            </CardTitle>
            <CardDescription>
              Hãy chia sẻ kinh nghiệm sống xanh của bạn với cộng đồng
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Bạn đang nghĩ gì về việc sống xanh?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px]"
            />
            <ImageUploader
              onImageUploaded={(url) => setImageUrl(url)}
              disabled={isLoading}
            />
            <div className="flex items-center justify-end">
              <Button
                onClick={handleCreatePost}
                className="gradient-green text-white"
                disabled={!newPost.trim() || isLoading}
              >
                {isLoading ? "Đang tạo..." : "Đăng bài"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="flex items-start justify-center h-96">
            <h1 className="text-gray-600 text-center">
              Chưa có bài viết nào trong cộng đồng này.
            </h1>
          </div>
        ) : (
          posts.map((post) => {
            const userId = post.userId?._id;
            const userPost = userId
              ? userMap[userId]
              : { fullname: "Anonymous User" };
            return (
              <Card key={post._id} className="glass-effect">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 gradient-green rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {userPost?.fullname?.charAt(0) ?? "?"}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">
                            {userPost?.fullname ?? "Anonymous User"}
                          </span>
                          <Badge variant="secondary">
                            {post.communityId.name || "Bảo vệ môi trường"}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {dayjs(post.createdAt).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {post.content}
                  </p>
                  {post.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-green-600">
                      #tái chế
                    </Badge>
                    <Badge variant="outline" className="text-green-600">
                      #sống xanh
                    </Badge>
                    <Badge variant="outline" className="text-green-600">
                      #organic
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleLike(post._id)}
                        className={`flex items-center space-x-2 ${
                          post.likedByUser
                            ? "text-red-500"
                            : "text-gray-600 hover:text-red-500"
                        }`}
                      >
                        {post.likedByUser ? (
                          <Heart className="w-4 h-4 fill-red-500" /> // Lấp đầy tim
                        ) : (
                          <Heart className="w-4 h-4" />
                        )}
                        <span>{post.likeCount}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveComments(post._id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.commentCount}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toast({
                            title: "Chia sẻ bài viết 🤗",
                            description: "Chia sẻ bài viết thành công!",
                          })
                        }
                        className="flex items-center space-x-2 text-gray-600 hover:text-green-500"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Chia sẻ</span>
                      </Button>
                    </div>
                  </div>
                  <CommentSection
                    postId={post._id}
                    isVisible={activeComments === post._id}
                    onClose={() => setActiveComments(null)}
                  />
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
