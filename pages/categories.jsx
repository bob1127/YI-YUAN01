"use client";

import Layout from "./Layout";
import Carousel from "../components/SwiperCarousel/SwiperCardFood";
export default function Home() {
  return (
    <Layout>
      <main>
        <Carousel />
      </main>
    </Layout>
  );
}
