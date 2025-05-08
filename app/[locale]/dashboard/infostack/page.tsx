'use client'
import InfoStack from "@/components/infostack/components/InfoStack";
import { useParams } from "next/navigation";

export default function InfostackPage() {
  const params = useParams();
  const nodeId = params?.nodeId as string;
  return (
    <div>
      <InfoStack nodeId={nodeId} />
    </div>
  );
}
