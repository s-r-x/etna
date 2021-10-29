import React from "react";
import PhoenixModule from "@phoenix/components";
import PhoenixLogger from "@phoenix/components/Logger";
import TwoColResizable from "@/layouts/TwoColResizable";

export const PhoenixPage = () => {
  return <TwoColResizable left={<PhoenixModule />} right={<PhoenixLogger />} />;
};

export default PhoenixPage;
