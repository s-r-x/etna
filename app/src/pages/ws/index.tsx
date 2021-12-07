import React from "react";
import Request from "@/domains/ws/raw/components";
import Logger from "@/domains/ws/raw/components/Logger";
import TwoColResizable from "@/layouts/TwoColResizable";

export const WsPage = () => {
  return <TwoColResizable left={<Request />} right={<Logger />} />;
};

export default WsPage;
