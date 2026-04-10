import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const ToolButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
}) => (
  <Button
    variant={active ? "secondary" : "outline"}
    size="icon"
    onClick={onClick}
    className={cn(
      "w-full h-12 rounded-xl transition-all duration-200 cursor-pointer",
      active
        ? "bg-[#88eade] text-zinc-950 hover:bg-[#88eade]/90 border-[#88eade]/90 shadow-[0_0_12px_rgba(234,179,8,0.4)]"
        : "bg-zinc-900/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border-zinc-800"
    )}
    title={label}
  >
    {icon}
  </Button>
);