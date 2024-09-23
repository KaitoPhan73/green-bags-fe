"use client";
import styled from "styled-components";
import Contact from "./_components/Contact";
import Hero from "./_components/Hero";
import Who from "./_components/Who";
import Works from "./_components/Works";
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
    <PageTitle title="Dịch vụ" />
    <Container>
      {/* <Hero /> */}
      {/* <Who /> */}
      {/* <Works /> */}
      <Contact />
    </Container>
    </div>
  );
}

export default page;