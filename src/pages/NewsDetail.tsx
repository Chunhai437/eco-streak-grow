import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../assets/avt.png";
import { NewsArticle } from "./News";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Hội thảo Sống Xanh 2025 - Hướng tới Tương lai Bền vững",
      excerpt:
        "Tham gia hội thảo lớn nhất năm về cuộc sống bền vững với sự tham gia của các chuyên gia hàng đầu.",
      content:
        "Hội thảo Sống Xanh 2025 là một trong những sự kiện nổi bật nhất trong năm dành cho những người quan tâm đến môi trường và phát triển bền vững. Với chủ đề `Hướng tới Tương lai Bền vững`, hội thảo sẽ quy tụ hơn 500 chuyên gia, nhà khoa học, nhà hoạt động xã hội và những người trẻ đam mê với lối sống xanh. Tham gia hội thảo, bạn sẽ được lắng nghe những bài tham luận sâu sắc từ các diễn giả hàng đầu trong lĩnh vực môi trường, biến đổi khí hậu, và phát triển đô thị bền vững. Các chủ đề chính bao gồm: giảm thiểu rác thải nhựa, năng lượng tái tạo, nông nghiệp hữu cơ và giáo dục môi trường cho thế hệ trẻ.Ngoài ra, sự kiện còn tổ chức nhiều workshop thực hành như: làm xà phòng thiên nhiên, tái chế rác thải, và hướng dẫn trồng cây xanh tại nhà. Người tham gia còn có cơ hội kết nối, giao lưu, và mở rộng mạng lưới quan hệ với những cá nhân, tổ chức đang hoạt động vì một hành tinh xanh hơn.Hội thảo sẽ kết thúc bằng lễ ký kết cam kết Sống Xanh giữa các đại biểu và đại diện cộng đồng địa phương nhằm lan tỏa thông điệp bảo vệ môi trường trên phạm vi rộng hơn.",
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
      content: `
Chiến dịch "Trồng Cây Xanh - Cùng nhau Bảo vệ Hành tinh" là lời kêu gọi mạnh mẽ tới cộng đồng nhằm ứng phó với tình trạng biến đổi khí hậu và suy giảm độ che phủ rừng.

Trong chiến dịch này, các đội nhóm tình nguyện sẽ được phân chia về nhiều khu vực trên toàn quốc để thực hiện hoạt động trồng cây. Ngoài ra, sẽ có các buổi tuyên truyền tại trường học và khu dân cư về tầm quan trọng của cây xanh trong việc lọc không khí, giữ đất và bảo vệ đa dạng sinh học.

Mỗi người tham gia đều được khuyến khích chia sẻ hành động của mình trên mạng xã hội với hashtag #PlantForFuture để lan tỏa cảm hứng đến cộng đồng. Đặc biệt, chương trình còn có phần thưởng dành cho nhóm có số lượng cây trồng nhiều nhất và có những câu chuyện ý nghĩa nhất về hành trình trồng cây.
    `,
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
      content: `
Workshop "Zero Waste" là sự kiện giáo dục cộng đồng dành cho những ai muốn bắt đầu hành trình sống không rác thải. Thông qua các hoạt động thực hành như: tự làm nước giặt từ thiên nhiên, tái sử dụng đồ cũ, phân loại rác đúng cách và sáng tạo đồ handmade từ vật liệu tái chế.

Chuyên gia đến từ các tổ chức bảo vệ môi trường sẽ chia sẻ về tác động tiêu cực của rác thải nhựa đối với hệ sinh thái biển và đất liền, đồng thời hướng dẫn cách giảm lượng rác sinh hoạt hàng ngày.

Workshop cũng dành thời gian để người tham gia thảo luận, chia sẻ câu chuyện cá nhân về hành trình zero waste, đồng thời khuyến khích mỗi người lập ra một cam kết cụ thể cho bản thân sau khi kết thúc sự kiện.
    `,
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
      content: `Cuộc thi "Ý tưởng Xanh" là một sân chơi lớn dành cho tất cả những ai quan tâm đến môi trường và mong muốn đóng góp những sáng kiến mới lạ, sáng tạo để cải thiện chất lượng sống xanh. Người tham gia có thể gửi bài dự thi dưới nhiều hình thức khác nhau như bản vẽ, video, mô hình hoặc bài thuyết trình. Chủ đề tập trung vào các giải pháp giảm thiểu rác thải, tái chế, tiết kiệm năng lượng hoặc cải thiện không gian sống.

Ban giám khảo là các chuyên gia về môi trường, giáo dục và sáng tạo sẽ chọn ra những ý tưởng xuất sắc nhất dựa trên các tiêu chí: tính sáng tạo, tính khả thi và tác động cộng đồng. Bên cạnh giải thưởng tiền mặt lên đến 50 triệu đồng, các ý tưởng được đánh giá cao còn có cơ hội được triển khai thực tế. Đây là dịp tuyệt vời để lan tỏa thông điệp sống xanh đến nhiều người hơn nữa.`,

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
      content: `Triển lãm Tái Chế 2025 mang đến cho khách tham quan cơ hội trải nghiệm những sản phẩm sáng tạo từ rác thải tái chế, từ đồ gia dụng, trang trí nội thất cho đến quần áo và vật liệu xây dựng. Sự kiện có hơn 100 gian hàng đến từ các startup, doanh nghiệp xã hội và tổ chức phi chính phủ hoạt động trong lĩnh vực tái chế.

Ngoài ra, khách tham dự còn có thể tham gia các workshop thực hành như: cách tự làm đồ trang trí từ nhựa tái chế, cách phân loại rác tại nguồn, hay tái sử dụng quần áo cũ. Diễn đàn chuyên đề với các chuyên gia môi trường sẽ chia sẻ về xu hướng tái chế trong tương lai và các giải pháp kinh tế tuần hoàn. Triển lãm hứa hẹn sẽ mang lại góc nhìn mới mẻ về giá trị của rác thải trong cuộc sống hiện đại.`,

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
      content: `Hội chợ Năng Lượng Xanh 2025 là sự kiện quy mô lớn dành cho những ai quan tâm đến các giải pháp năng lượng tái tạo. Hơn 200 doanh nghiệp, startup và tổ chức phi lợi nhuận sẽ tham gia trưng bày các công nghệ mới nhất như: pin mặt trời, tuabin gió, hệ thống tiết kiệm điện cho gia đình và doanh nghiệp.

Khách tham quan sẽ được tận mắt chứng kiến các mô hình nhà thông minh sử dụng năng lượng mặt trời, trải nghiệm các thiết bị sạc xe điện, và tham dự hội thảo về chính sách phát triển năng lượng sạch tại Việt Nam. Ngoài ra, có các chương trình khuyến mãi đặc biệt dành cho khách hàng muốn lắp đặt hệ thống năng lượng tái tạo tại nhà. Hội chợ không chỉ là nơi trưng bày mà còn là diễn đàn kết nối doanh nghiệp và người tiêu dùng vì một tương lai bền vững.`,

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
      content: `Chương trình "Một Ngày Không Rác" kêu gọi cộng đồng cùng nhau thực hiện thử thách 24 giờ không phát sinh rác thải. Mục tiêu là nâng cao nhận thức và thay đổi thói quen sử dụng sản phẩm nhựa dùng một lần. Người tham gia được khuyến khích mang theo bình nước cá nhân, túi vải đi chợ, sử dụng hộp đựng thức ăn riêng và hạn chế mua sắm không cần thiết.

Để tăng phần hấp dẫn, BTC tổ chức cuộc thi ảnh "Hành trình Không Rác" trên mạng xã hội, nơi người tham gia chia sẻ cách họ thực hiện thử thách. Những bức ảnh, câu chuyện truyền cảm hứng sẽ được trao giải thưởng nhỏ như voucher mua sắm xanh hoặc sản phẩm thân thiện môi trường. Chương trình đã nhận được sự hưởng ứng mạnh mẽ từ học sinh, sinh viên đến các doanh nghiệp và tổ chức cộng đồng.`,

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
      content: `Diễn đàn Giáo dục Xanh 2025 quy tụ các nhà giáo dục, nhà quản lý, chuyên gia và phụ huynh để cùng nhau trao đổi về tầm quan trọng của giáo dục môi trường trong hệ thống giáo dục Việt Nam. Chủ đề chính bao gồm: lồng ghép kiến thức bảo vệ môi trường vào chương trình học, xây dựng trường học xanh, và tổ chức các hoạt động ngoại khóa hướng tới phát triển bền vững.

Các trường học tham gia diễn đàn sẽ chia sẻ mô hình giáo dục xanh đã áp dụng thành công như: tiết học ngoài trời, vườn rau trường học, phân loại rác và tiết kiệm năng lượng. Ngoài ra, các chuyên gia quốc tế cũng sẽ trình bày các case study từ các nước phát triển. Đây là dịp tốt để các trường học kết nối, học hỏi và lên kế hoạch triển khai những sáng kiến xanh trong tương lai.`,

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
      content: `Ngày Hội Giao Thông Xanh là sự kiện toàn quốc nhằm khuyến khích cộng đồng giảm thiểu khí thải giao thông bằng cách sử dụng các phương tiện thân thiện môi trường như xe đạp, xe buýt, hoặc đi bộ. Trong ngày diễn ra sự kiện, nhiều tuyến đường ở các thành phố lớn như Hà Nội, TP.HCM, Đà Nẵng sẽ được tổ chức thành "tuyến đường không khói xe".

Song song đó, nhiều hoạt động hưởng ứng được tổ chức như: diễu hành xe đạp, hội chợ phương tiện xanh, hội thảo về giao thông bền vững, khu trải nghiệm lái thử xe điện miễn phí. Các doanh nghiệp vận tải công cộng cũng đưa ra chương trình ưu đãi vé xe bus trong ngày này để khuyến khích người dân tham gia. Sự kiện là lời kêu gọi mạnh mẽ cho một lối sống xanh, văn minh và có trách nhiệm hơn với môi trường.`,

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
      content: `Mini Camp "Xanh lên nào!" là một chương trình trại hè đặc biệt kéo dài 2 ngày 1 đêm, được thiết kế dành riêng cho học sinh tiểu học và THCS. Thông qua các hoạt động ngoài trời như: trồng cây, xây dựng khu vườn nhỏ, làm đồ tái chế từ rác thải nhựa, các em sẽ được giáo dục về tầm quan trọng của môi trường.

Chương trình còn có các buổi workshop về kỹ năng sinh tồn trong rừng, nhận biết các loài cây bản địa, cũng như các trò chơi tập thể nhằm nâng cao tinh thần đồng đội và lòng yêu thiên nhiên. Ban tổ chức còn tổ chức đêm lửa trại, nơi các em được kể chuyện môi trường và tham gia các tiết mục văn nghệ chủ đề sống xanh. Mini Camp không chỉ là kỳ nghỉ bổ ích mà còn là hành trình nuôi dưỡng tinh thần yêu thiên nhiên ngay từ khi còn nhỏ.`,

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

  const article = newsArticles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Không tìm thấy bài viết</h2>
        <button
          onClick={() => navigate("/news")}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Quay lại trang Tin tức
        </button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Badge className="text-xs">{article.category}</Badge>
          <h1 className="text-3xl font-bold mt-2">{article.title}</h1>
          <div className="flex items-center text-gray-500 text-sm mt-2 gap-4">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />{" "}
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" /> {article.views} lượt xem
            </span>
          </div>
        </div>

        <div className="aspect-video overflow-hidden mb-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Nội dung bài viết */}
        <div className="prose prose-green max-w-none mb-8">
          <p>{article.content}</p>
        </div>

        {/* Thông tin sự kiện nếu có */}
        {article.eventDate && (
          <div className="mb-8 text-gray-700 space-y-2">
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
        <div className="flex flex-wrap gap-1 mb-6">
          {article.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Tác giả */}
        <div className="flex items-center space-x-3 pt-4 border-t pt-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={logo} alt={article.author.name} />
            <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium">{article.author.name}</div>
            <div className="text-gray-500">{article.author.role}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
