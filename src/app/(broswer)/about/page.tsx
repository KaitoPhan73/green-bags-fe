"use client";
import styled from "styled-components";
import Contact from "./_components/Contact";

import PageTitle from "@/components/page-tittle";

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("/images/bg.jpg");
  &::-webkit-scrollbar {
    display: none;
  }
`;

function page() {
  return (
    <div>
      <PageTitle title="Liên hệ với chúng tôi" />

      <Contact />
    </div>
  );
}

export default page;
