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
import { Link } from "react-router-dom";

export interface NewsArticle {
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
        "https://th.bing.com/th/id/OIP.zqIY6lAMmSRZGs3XveMrmQHaEt?w=281&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
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
                  <CardTitle>
                    <Link to={`/news/${article.id}`}>{article.title}</Link>
                  </CardTitle>
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
