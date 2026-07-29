import { Radar } from "./Radar";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <Radar size={180} spinning={false} />
      <p className="font-mono text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
