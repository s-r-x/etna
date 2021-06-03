import React from "react";
import Router from "@/containers/Router";
import SettingsModal from "@/domains/settings/components/Modal";

const Shell = () => {
  return (
    <>
      <Router />
      <SettingsModal />
    </>
  );
};

export default Shell;
