import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Màu nền sáng hơn */
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px; /* Giới hạn chiều rộng tối đa */
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Bóng đổ cho container */
  border-radius: 10px; /* Bo góc cho container */
  overflow: hidden; /* Đảm bảo không có phần nội dung nào lòi ra */
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center; /* Căn giữa nội dung */
  padding: 20px; /* Thêm padding để nội dung không chạm vào biên */
`;

const Title = styled.h1`
  font-weight: 300; /* Giảm độ dày của tiêu đề */
  margin-bottom: 20px; /* Thêm khoảng cách dưới tiêu đề */
  text-align: center; /* Căn giữa tiêu đề */
`;

const Form = styled.form`
  width: 100%; /* Đảm bảo form chiếm toàn bộ chiều rộng */
  max-width: 500px; /* Giới hạn chiều rộng tối đa cho form */
  display: flex;
  flex-direction: column;
  gap: 15px; /* Thay đổi khoảng cách giữa các phần tử */
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 15px;
  transition: background-color 0.3s ease; /* Hiệu ứng chuyển màu */

  &:hover {
    background-color: #c84c92; /* Màu nền khi hover */
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center; /* Căn giữa nội dung */
  justify-content: center; /* Căn giữa nội dung */

  @media only screen and (max-width: 768px) {
    display: none; /* Ẩn bản đồ trên màn hình nhỏ */
  }
`;

const Contact = () => {
  const ref = useRef();
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_j5fnr88",
        "template_q0zq2yq",
        ref.current,
        "KAuZZSUdJRD4-yrmz"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
        }
      );
  };

  return (
    <Section className="dark:bg-slate-900">
      {/* <Container> */}
      <Left>
        <Form ref={ref} onSubmit={handleSubmit}>
          <Title
            style={{ color: "chocolate", fontSize: "36px", fontWeight: "bold" }}
          >
            Liên hệ với chúng tôi
          </Title>
          <Input placeholder="Tên" name="name" required />
          <Input type="email" placeholder="Email" name="email" required />
          <Textarea
            name="message"
            placeholder="Tin nhắn của bạn ở đây."
            required
            rows={10}
          />
          <Button type="submit">Gửi</Button>
          {success && <p>Tin nhắn của bạn đã được gửi</p>}
          {success === false && <p>Vui lòng thử lại</p>}
        </Form>
      </Left>
      <Right>
        <div className="w-full">
          <div className="embed-responsive">
            <iframe
              width="90%"
              height="400"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=L%C3%B4%20E2a-7,%20%C4%90%C6%B0%E1%BB%9Dng%20D1,%20%C4%90.%20D1,%20Long%20Th%E1%BA%A1nh%20M%E1%BB%B9,%20Th%C3%A0nh%20Ph%E1%BB%91%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c,%20H%E1%BB%93%20Ch%C3%AD%20Minh%20700000,%20Vietnam+(fpt%20)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </Right>
      {/* </Container> */}
    </Section>
  );
};

export default Contact;
