import SessionDetailPage from "./_components/SessionDetailPage";

export default async function DashboardSessionDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  return <SessionDetailPage sessionId={sessionId} />;
}
