"use client"

import React from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./_components/Experience";
import { UI } from "./_components/UI";
import PageTitle from "@/components/page-tittle";

const page = () => {
  return (
    <div>
      <PageTitle title="Liên hệ với chúng tôi " />
      <section className="py-12 md:py-24 lg:py-24" style={{ width: '1500px', height: '700px' }}>
        <UI />
        {/* <Loader /> */}
        <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
          <group position-y={0}>
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </group>
        </Canvas>
      </section >
    </div >
  );
};

export default page;
