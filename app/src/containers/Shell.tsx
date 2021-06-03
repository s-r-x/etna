import React from "react";
import Router from "@/containers/Router";
import SettingsModal from "@/domains/settings/components/Modal";
import RootLayout from "@/layouts/Root";

const Shell = () => {
  return (
    <>
      <RootLayout>
        <Router />
      </RootLayout>
      <SettingsModal />
    </>
  );
};

export default Shell;
