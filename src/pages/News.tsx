import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "../assets/avt.png";
import { Spinner } from "@/components/Spinner/Spinner";

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  category: string;
  location?: string;
  eventDate?: string;
  participants?: number;
  views: number;
  tags: string[];
}

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loadingPage, setLoadingPage] = useState(true);
  // Mock news data - in real app this would come from backend
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Hội thảo Sống Xanh 2025 - Hướng tới Tương lai Bền vững",
      excerpt:
        "Tham gia hội thảo lớn nhất năm về cuộc sống bền vững với sự tham gia của các chuyên gia hàng đầu.",
      content:
        "Hội thảo Sống Xanh 2024 sẽ diễn ra vào cuối tháng này với chủ đề 'Hướng tới Tương lai Bền vững'. Sự kiện quy tụ hơn 500 chuyên gia, nhà hoạt động môi trường và những người quan tâm đến cuộc sống xanh...",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-01-15",
      category: "event",
      location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
      eventDate: "2025-01-28",
      participants: 500,
      views: 1250,
      tags: ["hội thảo", "bền vững", "môi trường"],
    },
    {
      id: 2,
      title: "Chiến dịch Trồng Cây Xanh - Cùng nhau Bảo vệ Hành tinh",
      excerpt:
        "Tham gia chiến dịch trồng 10,000 cây xanh trên toàn quốc nhằm góp phần chống biến đổi khí hậu.",
      content:
        "Chiến dịch 'Trồng Cây Xanh - Cùng nhau Bảo vệ Hành tinh' được khởi động với mục tiêu trồng 10,000 cây xanh trong năm 2024. Đây là hoạt động ý nghĩa nhằm nâng cao ý thức bảo vệ môi trường...",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-02-12",
      category: "campaign",
      location: "Toàn quốc",
      eventDate: "2025-03-01",
      participants: 2000,
      views: 890,
      tags: ["trồng cây", "chiến dịch", "khí hậu"],
    },
    {
      id: 3,
      title: "Workshop 'Zero Waste' - Cuộc sống Không Rác thải",
      excerpt:
        "Học cách áp dụng lối sống zero waste trong gia đình với các chuyên gia môi trường.",
      content:
        "Workshop 'Zero Waste - Cuộc sống Không Rác thải' sẽ hướng dẫn mọi người cách thực hành lối sống không tạo ra rác thải. Các chuyên gia sẽ chia sẻ những mẹo hay và thực tế...",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=400&fit=crop",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-01-10",
      category: "workshop",
      location: "Online & Offline",
      eventDate: "2025-01-25",
      participants: 150,
      views: 645,
      tags: ["zero waste", "workshop", "thực hành"],
    },
    {
      id: 4,
      title: "Cuộc thi 'Ý tưởng Xanh' - Sáng tạo vì Môi trường",
      excerpt:
        "Gửi ý tưởng sáng tạo của bạn để bảo vệ môi trường và có cơ hội nhận giải thưởng lớn.",
      content:
        "Cuộc thi 'Ý tưởng Xanh' dành cho tất cả mọi người muốn đóng góp những ý tưởng sáng tạo cho việc bảo vệ môi trường. Giải thưởng lên đến 50 triệu đồng cho ý tưởng xuất sắc nhất...",
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-03-08",
      category: "contest",
      location: "Online",
      eventDate: "2025-04-01",
      participants: 800,
      views: 1100,
      tags: ["cuộc thi", "sáng tạo", "giải thưởng"],
    },
    {
      id: 5,
      title: "Triển lãm Tái Chế 2025 – Biến Rác Thành Tài Nguyên",
      excerpt:
        "Khám phá những sản phẩm độc đáo từ rác thải tái chế và công nghệ xanh mới nhất.",
      content:
        "Triển lãm Tái Chế 2025 là nơi quy tụ các ý tưởng sáng tạo trong việc tái sử dụng rác thải thành sản phẩm hữu ích. Sự kiện còn có khu vực trải nghiệm thực tế và hội thảo từ các chuyên gia...",
      image:
        "https://th.bing.com/th/id/OIP.XoC5YhU87imBQ-7D0sSAcwHaEK?w=257&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-03-20",
      category: "exhibition",
      location: "Eco Center, TP. Hồ Chí Minh",
      eventDate: "2025-04-10",
      participants: 1200,
      views: 950,
      tags: ["tái chế", "triển lãm", "công nghệ xanh"],
    },
    {
      id: 6,
      title: "Hội chợ Năng Lượng Xanh 2025",
      excerpt:
        "Giới thiệu các giải pháp năng lượng mặt trời, gió và công nghệ tiết kiệm điện.",
      content:
        "Hội chợ Năng Lượng Xanh quy tụ các doanh nghiệp và startup hoạt động trong lĩnh vực năng lượng tái tạo. Các gian hàng trải nghiệm giúp người dân hiểu rõ hơn về việc sử dụng năng lượng xanh trong đời sống...",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=400&fit=crop",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-03-25",
      category: "fair",
      location: "Công viên phần mềm Quang Trung, TP.HCM",
      eventDate: "2025-04-15",
      participants: 1700,
      views: 1320,
      tags: ["năng lượng", "tái tạo", "hội chợ"],
    },
    {
      id: 7,
      title: "Chương trình 'Một Ngày Không Rác'",
      excerpt: "Thử thách 24 giờ không tạo rác thải – bạn đã sẵn sàng chưa?",
      content:
        "Cùng tham gia thử thách 'Một Ngày Không Rác' để trải nghiệm cuộc sống tối giản, hạn chế sử dụng sản phẩm nhựa và đồ dùng một lần. Người tham gia sẽ chia sẻ hành trình qua mạng xã hội...",
      image:
        "https://th.bing.com/th/id/OIP.mYDo6w5n5xSyFphjVVKllAHaEt?w=280&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-02-28",
      category: "challenge",
      location: "Toàn quốc",
      eventDate: "2025-03-10",
      participants: 3500,
      views: 2500,
      tags: ["zero waste", "thử thách", "cuộc sống xanh"],
    },
    {
      id: 8,
      title: "Diễn đàn Giáo dục Xanh – Hướng đi cho Thế hệ Tương lai",
      excerpt:
        "Chia sẻ các mô hình giáo dục bền vững trong trường học và cộng đồng.",
      content:
        "Diễn đàn Giáo dục Xanh 2025 mời các nhà giáo dục, nhà quản lý và phụ huynh cùng thảo luận về việc tích hợp kiến thức môi trường vào chương trình học. Các mô hình thành công sẽ được giới thiệu...",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=400&fit=crop",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-04-01",
      category: "forum",
      location: "Đại học Quốc gia Hà Nội",
      eventDate: "2025-04-20",
      participants: 900,
      views: 775,
      tags: ["giáo dục", "diễn đàn", "bền vững"],
    },
    {
      id: 9,
      title: "Ngày Hội Giao Thông Xanh",
      excerpt:
        "Khuyến khích sử dụng phương tiện công cộng, xe đạp, xe điện trong một ngày đặc biệt.",
      content:
        "Ngày Hội Giao Thông Xanh là chiến dịch cộng đồng nhằm giảm ô nhiễm không khí và khuyến khích thói quen di chuyển bền vững. Nhiều thành phố sẽ triển khai các tuyến đường không khói xe trong ngày này...",
      image:
        "https://th.bing.com/th/id/OIP.ee5BBBIzKc2yke-sLYBd-QHaE8?w=232&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-03-30",
      category: "event",
      location: "Hà Nội, Đà Nẵng, TP.HCM",
      eventDate: "2025-04-22",
      participants: 4200,
      views: 3000,
      tags: ["giao thông xanh", "không khí sạch", "phương tiện công cộng"],
    },
    {
      id: 10,
      title: "Mini Camp 'Xanh lên nào!' dành cho Học sinh",
      excerpt:
        "Trại hè môi trường giúp học sinh khám phá và yêu quý thiên nhiên thông qua trò chơi và trải nghiệm thực tế.",
      content:
        "Mini Camp 'Xanh lên nào!' là chương trình trại hè ngắn ngày cho học sinh tiểu học và THCS. Các em sẽ được tham gia trò chơi khám phá, học cách trồng cây, làm đồ tái chế, và tham quan rừng phòng hộ...",
      image:
        "data:image/jpeg;base64,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",
      author: {
        name: "Eco Habit Admin",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "Quản trị viên",
      },
      publishedAt: "2025-04-05",
      category: "camp",
      location: "Rừng Cúc Phương, Ninh Bình",
      eventDate: "2025-05-02",
      participants: 300,
      views: 510,
      tags: ["trại hè", "thiếu nhi", "giáo dục xanh"],
    },
  ];

  const categories = [
    { id: "all", name: "Tất cả", count: newsArticles.length },
    {
      id: "event",
      name: "Sự kiện",
      count: newsArticles.filter((a) => a.category === "event").length,
    },
    {
      id: "campaign",
      name: "Chiến dịch",
      count: newsArticles.filter((a) => a.category === "campaign").length,
    },
    {
      id: "workshop",
      name: "Workshop",
      count: newsArticles.filter((a) => a.category === "workshop").length,
    },
    {
      id: "contest",
      name: "Cuộc thi",
      count: newsArticles.filter((a) => a.category === "contest").length,
    },
    {
      id: "forum",
      name: "Diễn đàn",
      count: newsArticles.filter((a) => a.category === "forum").length,
    },
    {
      id: "exhibition",
      name: "Triển lãm",
      count: newsArticles.filter((a) => a.category === "exhibition").length,
    },
    {
      id: "challenge",
      name: "Thử thách",
      count: newsArticles.filter((a) => a.category === "challenge").length,
    },
    {
      id: "camp",
      name: "Trại hè",
      count: newsArticles.filter((a) => a.category === "camp").length,
    },
    {
      id: "fair",
      name: "Hội chợ",
      count: newsArticles.filter((a) => a.category === "fair").length,
    },
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? newsArticles
      : newsArticles.filter((article) => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "event":
        return "bg-blue-100 text-blue-800";
      case "campaign":
        return "bg-green-100 text-green-800";
      case "workshop":
        return "bg-purple-100 text-purple-800";
      case "contest":
        return "bg-orange-100 text-orange-800";
      case "forum":
        return "bg-indigo-100 text-indigo-800";
      case "exhibition":
        return "bg-pink-100 text-pink-800";
      case "challenge":
        return "bg-yellow-100 text-yellow-800";
      case "camp":
        return "bg-teal-100 text-teal-800";
      case "fair":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tin tức Sống Xanh
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về các sự kiện, chiến dịch và hoạt
            động hướng tới cuộc sống bền vững và thân thiện với môi trường
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "gradient-green text-white"
                  : "border-green-200 hover:bg-green-50"
              }`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryBadgeColor(article.category)}>
                    {article.category === "event" && "Sự kiện"}
                    {article.category === "campaign" && "Chiến dịch"}
                    {article.category === "workshop" && "Workshop"}
                    {article.category === "contest" && "Cuộc thi"}
                    {article.category === "forum" && "Diễn đàn"}
                    {article.category === "exhibition" && "Triển lãm"}
                    {article.category === "challenge" && "Thử thách"}
                    {article.category === "camp" && "Trại hè"}
                    {article.category === "fair" && "Hội chợ"}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.views}
                  </div>
                </div>

                <CardTitle className="text-lg leading-tight hover:text-green-600 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Event Details */}
                {article.eventDate && (
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-green-600" />
                      {formatDate(article.eventDate)}
                    </div>
                    {article.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                        {article.location}
                      </div>
                    )}
                    {article.participants && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-green-600" />
                        {article.participants} người tham gia
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Author & Date */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={logo} alt={article.author.name} />
                      <AvatarFallback>
                        {article.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-xs">
                      <div className="font-medium">{article.author.name}</div>
                      <div className="text-gray-500">{article.author.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(article.publishedAt)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Không có bài viết nào trong danh mục này
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default News;
