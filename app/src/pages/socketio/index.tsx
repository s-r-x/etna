import React from "react";
import SocketIoRequest from "@/domains/ws/socket-io/components";
import SocketIOLogger from "@socket-io/components/Logger";
import TwoColResizable from "@/layouts/TwoColResizable";

export const SocketIOPage = () => {
  return (
    <TwoColResizable left={<SocketIoRequest />} right={<SocketIOLogger />} />
  );
};

export default SocketIOPage;
