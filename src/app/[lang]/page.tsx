import { Button } from "@/components/ui/button";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <div>
      <div>
        <Button variant="outline">味覚診断を始める</Button>
        <Button variant="outline">Starting a Taste Diagnosis</Button>
      </div>
    </div>
  );
}
