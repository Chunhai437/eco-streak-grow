
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import CommentSection from '@/components/CommentSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Heart, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newPost, setNewPost] = useState('');
  const [activeComments, setActiveComments] = useState<number | null>(null);
  
  const [posts] = useState([
    {
      id: 1,
      author: {
        name: "Minh Anh",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        verified: true
      },
      content: "Hôm nay mình đã hoàn thành thử thách 30 ngày không dùng ống hút nhựa! Cảm giác thật tuyệt khi biết mình đã góp phần bảo vệ môi trường. Các bạn cũng thử thách bản thân nhé! 🌱",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      category: "Giảm rác thải",
      likes: 24,
      comments: 8,
      timeAgo: "2 giờ trước",
      tags: ["30ngaykhongonghua", "zerowaste", "sống_xanh"]
    },
    {
      id: 2,
      author: {
        name: "Hoàng Nam",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        verified: false
      },
      content: "Chia sẻ cách làm túi vải từ áo cũ siêu đơn giản! Chỉ cần vài bước là có ngay túi đựng đồ thân thiện môi trường. Video hướng dẫn chi tiết ở comment nhé! ♻️",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop",
      category: "Tái chế",
      likes: 156,
      comments: 23,
      timeAgo: "1 ngày trước",
      tags: ["DIY", "taiche", "handmade"]
    },
    {
      id: 3,
      author: {
        name: "Thu Hương",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        verified: true
      },
      content: "Vườn rau nhỏ trên sân thượng sau 3 tháng chăm sóc! Từ những hạt giống nhỏ bé giờ đã cho thu hoạch rau sạch cho gia đình. Ai muốn bắt đầu trồng rau thì inbox mình nhé! 🥬🍅",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
      category: "Trồng trọt",
      likes: 89,
      comments: 12,
      timeAgo: "3 ngày trước",
      tags: ["vuonrau", "rausach", "nongsan"]
    }
  ]);

  const categories = [
    "Tất cả",
    "Giảm rác thải", 
    "Tái chế",
    "Tiết kiệm nước",
    "Tiết kiệm điện",
    "Trồng trọt",
    "Giao thông xanh"
  ];

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    toast({
      title: "Đăng bài thành công!",
      description: "Bài viết của bạn đã được chia sẻ với cộng đồng.",
    });
    setNewPost('');
  };

  const handleLike = (postId: number) => {
    toast({
      title: "Đã thích bài viết! ❤️",
      description: "Cảm ơn bạn đã ủng hộ cộng đồng.",
    });
  };

  const handleToggleComments = (postId: number) => {
    setActiveComments(activeComments === postId ? null : postId);
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cộng đồng sống xanh</h1>
          <p className="text-gray-600">Chia sẻ và học hỏi kinh nghiệm sống bền vững</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-effect mb-6">
              <CardHeader>
                <CardTitle className="text-green-800">Danh mục</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-green-50"
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">Thống kê tuần</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-gray-600">Bài viết mới</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2,341</div>
                  <div className="text-sm text-gray-600">Lượt tương tác</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-sm text-gray-600">Thành viên mới</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-green-800">Chia sẻ câu chuyện xanh</CardTitle>
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
                <div className="flex items-center justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Thêm ảnh
                  </Button>
                  <Button 
                    onClick={handleCreatePost}
                    className="gradient-green text-white"
                    disabled={!newPost.trim()}
                  >
                    Đăng bài
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="glass-effect">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>
                            {post.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{post.author.name}</span>
                            {post.author.verified && (
                              <span className="text-blue-500">✓</span>
                            )}
                            <Badge variant="secondary">{post.category}</Badge>
                          </div>
                          <span className="text-sm text-gray-500">{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                    
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
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-green-600">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
                        >
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleComments(post.id)}
                          className={`flex items-center space-x-2 text-gray-600 hover:text-blue-500 ${
                            activeComments === post.id ? 'text-blue-500' : ''
                          }`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="flex items-center space-x-2 text-gray-600 hover:text-green-500"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Chia sẻ</span>
                        </Button>
                      </div>
                    </div>

                    {/* Comment Section */}
                    <CommentSection
                      postId={post.id}
                      isVisible={activeComments === post.id}
                      onClose={() => setActiveComments(null)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
