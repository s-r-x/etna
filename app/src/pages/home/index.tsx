import React from "react";
import HttpResponse from "@/domains/http/res/components";
import HttpRequest from "@/domains/http/req/root/components";
import TwoColResizable from "@/layouts/TwoColResizable";

export const HomePage = () => {
  return <TwoColResizable left={<HttpRequest />} right={<HttpResponse />} />;
};

export default HomePage;
