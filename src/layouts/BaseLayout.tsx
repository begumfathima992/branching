import { AppShell } from "@mantine/core";
import Appheader from "../componentsV2/Appheader";
import Footer from "../componentsV2/Footer";
import { BottomNav } from "../componentsV2/BottomNav";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      styles={{ main: { padding: 0 } }}
      header={<Appheader />}
      footer={<Footer />}
    >
      {children}
      <BottomNav />
    </AppShell>
  );
};

export default BaseLayout;
