import React from "react";
import Router from "@/containers/Router";
import SettingsModal from "@/domains/settings/components/Modal";
import RootLayout from "@/layouts/Root";
import { useRouterSideEffects } from "@/hooks/useRouterSideEffects";

const Shell = () => {
  useRouterSideEffects();
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
