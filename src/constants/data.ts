import { FaDisease } from "react-icons/fa";
import { MdOutlineScubaDiving } from "react-icons/md";
import { FcManager } from "react-icons/fc";
export const services = [
  {
    title: "Lặn biển",
    icon: MdOutlineScubaDiving,
    description:
      "Trải nghiệm lặn biển cùng các chuyên gia và thế giới biển xanh bát ngát đầy màu sắc thú vị.",
    image: "https://kinhboi.com/wp-content/uploads/2022/02/lan-bien-1.jpg",
  },
  {
    title: "Du lịch sinh thái",
    icon: FaDisease,
    description:
      "Khám phá các khu bảo tồn biển và trải nghiệm những điều thú vị sẽ đến với bạn tại vùng đất này.",
    image:
      "https://bcp.cdnchinhphu.vn/334894974524682240/2022/4/2/con-dao-1648858077344216792948.jpg",
  },
  {
    title: "Hướng dẫn viên",
    icon: FcManager,
    description:
      "Được hướng dẫn bởi các chuyên gia giàu nhiệt huyết, tận tình và giàu kinh nghiệm .",
    image:
      "https://m.baotuyenquang.com.vn/media/images/2022/03/img_20220331093237.jpg",
  },
];

export const homepageList = [
  {
    title: "Dịch vụ của chúng tôi",
    icon: MdOutlineScubaDiving,
    description:
      "Trải nghiệm lặn biển cùng các chuyên gia và thế giới biển xanh bát ngát đầy màu sắc thú vị.",
    image: "https://kinhboi.com/wp-content/uploads/2022/02/lan-bien-1.jpg",
    link: "/service",
  },
  {
    title: "Thông tin về chúng tôi",
    icon: FaDisease,
    description:
      "Khám phá các khu bảo tồn biển và trải nghiệm những điều thú vị sẽ đến với bạn tại vùng đất này.",
    image:
      "https://bcp.cdnchinhphu.vn/334894974524682240/2022/4/2/con-dao-1648858077344216792948.jpg",
    link: "/about",
  },
  {
    title: "Hướng dẫn viên tận tình",
    icon: FcManager,
    description:
      "Được hướng dẫn bởi các chuyên gia giàu nhiệt huyết, tận tình và giàu kinh nghiệm .",
    image:
      "https://m.baotuyenquang.com.vn/media/images/2022/03/img_20220331093237.jpg",
    link: "/about",
  },
];

export const products = [
  {
    id: 1,
    name: "Túi Xanh",
    price: 150000,
    description: "Túi màu xanh với thiết kế đơn giản, thích hợp cho nhiều dịp.",
    color: "Xanh",
    size: "M",
    image: "/images/blue-sky.jpg",
  },
  {
    id: 2,
    name: "Túi Đỏ",
    price: 200000,
    description: "Túi màu đỏ nổi bật, phù hợp cho những sự kiện đặc biệt.",
    color: "Đỏ",
    size: "L",
    image: "/images/blue-sky.jpg",
  },
  {
    id: 3,
    name: "Túi Vàng",
    price: 180000,
    description: "Túi màu vàng sáng, thời trang và cá tính.",
    color: "Vàng",
    size: "S",
    image: "/images/blue-sky.jpg",
  },
  {
    id: 4,
    name: "Túi Vàng 2",
    price: 180000,
    description: "Túi màu vàng sáng, thời trang và cá tính.",
    color: "Vàng",
    size: "S",
    image: "/images/blue-sky.jpg",
  },
  {
    id: 5,
    name: "Túi Xanh",
    price: 150000,
    description: "Túi màu xanh với thiết kế đơn giản, thích hợp cho nhiều dịp.",
    color: "Xanh",
    size: "M",
    image: "/images/blue-sky.jpg",
  },
  {
    id: 6,
    name: "Túi Đỏ",
    price: 200000,
    description: "Túi màu đỏ nổi bật, phù hợp cho những sự kiện đặc biệt.",
    color: "Đỏ",
    size: "L",
    image: "/images/blue-sky.jpg",
  },
  {
    id: 7,
    name: "Túi Vàng",
    price: 180000,
    description: "Túi màu vàng sáng, thời trang và cá tính.",
    color: "Vàng",
    size: "S",
    image: "/images/blue-sky.jpg",
  },
  {
    id: 8,
    name: "Túi Vàng 2",
    price: 180000,
    description: "Túi màu vàng sáng, thời trang và cá tính.",
    color: "Vàng",
    size: "S",
    image: "/images/blue-sky.jpg",
  },
];

export const dataBlogs = [
  {
    id: 1,
    name: "Blog Sống Xanh",
    description: "Sống bền vững và thân thiện với môi trường.",
    author: "Alice Green",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-01-15",
    posts: [
      {
        id: 101,
        title: "10 Mẹo Sống Không Rác Thải",
        content:
          "Sống không rác thải có thể khó khăn nhưng rất đáng giá. Dưới đây là 10 mẹo để bạn bắt đầu...",
        tags: ["không rác thải", "bền vững", "mẹo sống xanh"],
        datePublished: "2024-08-10",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Kiến Thức Năng Lượng Xanh",
    description: "Khám phá tương lai của năng lượng tái tạo.",
    author: "Bob Sun",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-02-20",
    posts: [
      {
        id: 102,
        title: "Sự Trỗi Dậy Của Năng Lượng Mặt Trời Năm 2024",
        content:
          "Năng lượng mặt trời ngày càng trở nên dễ tiếp cận và hiệu quả hơn. Đây là lý do tại sao nó đang phát triển mạnh...",
        tags: ["năng lượng mặt trời", "năng lượng tái tạo", "công nghệ xanh"],
        datePublished: "2024-07-22",
        image: "/images/blue-sky.jpg",
      },
      {
        id: 103,
        title: "5 Lợi Ích Của Năng Lượng Gió",
        content:
          "Năng lượng gió là sạch, hiệu quả và bền vững. Dưới đây là 5 lợi ích hàng đầu...",
        tags: ["năng lượng gió", "tái tạo", "năng lượng xanh"],
        datePublished: "2024-08-01",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Sống Không Nhựa",
    description:
      "Mẹo và thủ thuật để giảm sử dụng nhựa trong cuộc sống hàng ngày.",
    author: "Clara Rivers",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-03-15",
    posts: [
      {
        id: 104,
        title: "Cách Chuyển Sang Sản Phẩm Tái Sử Dụng",
        content:
          "Từ túi đến chai nước, đây là cách bạn có thể chuyển sang các sản phẩm tái sử dụng để giảm thiểu rác thải nhựa...",
        tags: ["không nhựa", "bền vững", "thân thiện với môi trường"],
        datePublished: "2024-09-05",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Vườn Xanh Thành Phố",
    description:
      "Blog dành cho những người yêu thích làm vườn ở đô thị và muốn sống xanh.",
    author: "David Bloom",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-04-10",
    posts: [
      {
        id: 105,
        title: "Trồng Cây Gia Vị Trong Không Gian Nhỏ",
        content:
          "Dù bạn có ít không gian, bạn vẫn có thể trồng các loại gia vị tại nhà. Dưới đây là cách làm...",
        tags: ["làm vườn đô thị", "cây gia vị", "bền vững"],
        datePublished: "2024-06-30",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Thời Trang Bền Vững",
    description:
      "Lựa chọn quần áo phong cách và bền vững cho những người yêu môi trường.",
    author: "Emma Vogue",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-05-25",
    posts: [
      {
        id: 106,
        title: "Top 5 Thương Hiệu Thời Trang Bền Vững Năm 2024",
        content:
          "Những thương hiệu này đang dẫn đầu trong lĩnh vực thời trang thân thiện với môi trường. Hãy khám phá...",
        tags: ["thời trang bền vững", "thân thiện môi trường", "quần áo"],
        datePublished: "2024-08-14",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 6,
    name: "Đánh Giá Công Nghệ Xanh",
    description: "Những sản phẩm công nghệ thân thiện với môi trường mới nhất.",
    author: "Frank Tech",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-06-01",
    posts: [
      {
        id: 107,
        title: "Đánh Giá: Những Bộ Sạc Năng Lượng Mặt Trời Tốt Nhất Năm 2024",
        content:
          "Chúng tôi đã thử nghiệm các bộ sạc năng lượng mặt trời tốt nhất trên thị trường. Đây là kết quả...",
        tags: ["công nghệ xanh", "sạc năng lượng mặt trời", "đánh giá"],
        datePublished: "2024-09-01",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 7,
    name: "Trái Đất Khỏe, Bạn Khỏe",
    description: "Blog về việc sống khỏe mạnh và có ý thức bảo vệ môi trường.",
    author: "Grace Earth",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-07-20",
    posts: [
      {
        id: 108,
        title: "Cách Bắt Đầu Chế Độ Ăn Chay",
        content:
          "Chuyển sang chế độ ăn chay dễ dàng hơn bạn nghĩ. Dưới đây là một số bước đơn giản...",
        tags: ["ăn chay", "sức khỏe", "thân thiện môi trường"],
        datePublished: "2024-07-18",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 8,
    name: "Du Lịch Không Rác Thải",
    description:
      "Khám phá thế giới trong khi giảm thiểu dấu chân carbon của bạn.",
    author: "Harry Traveler",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-08-05",
    posts: [
      {
        id: 109,
        title:
          "Mẹo Du Lịch Thân Thiện Với Môi Trường Cho Chuyến Phiêu Lưu Sắp Tới",
        content:
          "Du lịch không nhất thiết phải gây lãng phí. Dưới đây là một số mẹo để du lịch bền vững...",
        tags: ["du lịch", "không rác thải", "du lịch bền vững"],
        datePublished: "2024-09-12",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 9,
    name: "Những Nhà Sáng Tạo Xanh",
    description:
      "Hồ sơ những người sáng tạo đang tạo ra sự khác biệt trong lĩnh vực bền vững.",
    author: "Ivy Innovate",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-09-10",
    posts: [
      {
        id: 110,
        title: "Gặp Gỡ Những Người Đang Cách Mạng Hóa Năng Lượng Xanh",
        content:
          "Những người tiên phong này đang dẫn đầu trong việc phát triển các giải pháp năng lượng bền vững...",
        tags: ["năng lượng xanh", "sáng tạo", "bền vững"],
        datePublished: "2024-08-25",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
  {
    id: 10,
    name: "Dự Án DIY Xanh",
    description:
      "Những dự án DIY dễ dàng và thú vị để giúp cuộc sống của bạn trở nên bền vững hơn.",
    author: "Jack Maker",
    image: "/images/blue-sky.jpg",
    createdDate: "2024-09-01",
    posts: [
      {
        id: 111,
        title: "Tự Làm Thùng Ủ Phân Hữu Cơ Cho Không Gian Nhỏ",
        content:
          "Hãy học cách làm thùng ủ phân phù hợp với không gian sống nhỏ gọn của bạn...",
        tags: ["DIY", "ủ phân", "dự án xanh"],
        datePublished: "2024-07-29",
        image: "/images/blue-sky.jpg",
      },
    ],
  },
];
