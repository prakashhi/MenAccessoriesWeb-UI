import ContentRenderer from "./ContentRenderComponent";

export default function DesktopContentRenderComponent({
  handleLogout,
  active,
}: {
  handleLogout: () => void;
  active: string;
}) {
  return (
    <>
      {/* Desktop-only content area */}
      <div className="hidden lg:block">
        <div className="mb-6">
          <ContentRenderer keyname={active} onLogout={handleLogout} />
        </div>
      </div>
    </>
  );
}
