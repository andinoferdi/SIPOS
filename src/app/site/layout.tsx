import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header/header";

const SiteLayout = (
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>,
) => {
  return (
    <div className="flex flex-1 flex-col dark:bg-gray-900">
      <Header />
      <div className="isolate flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
