import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border sticky top-0 z-10 backdrop-blur bg-background/85">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
          <span className="font-display font-semibold text-lg tracking-tight text-foreground">
            StackScout
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Today
          </Link>
          <Link
            href="/library"
            className="font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Library
          </Link>
        </nav>
      </div>
    </header>
  );
}
