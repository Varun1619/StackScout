"use client";

import { useState, useSyncExternalStore } from "react";

type NavigatorWithStandalone = Navigator & { standalone?: boolean };

function noopSubscribe() {
  return () => {};
}

function getIsIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function getIsStandalone() {
  const nav = navigator as NavigatorWithStandalone;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

function getServerFalse() {
  return false;
}

export function InstallPrompt() {
  const isIOS = useSyncExternalStore(
    noopSubscribe,
    getIsIOS,
    getServerFalse,
  );
  const isStandalone = useSyncExternalStore(
    noopSubscribe,
    getIsStandalone,
    getServerFalse,
  );
  const [dismissed, setDismissed] = useState(false);

  if (!isIOS || isStandalone || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 sm:w-sm z-20 rounded-xl border border-border bg-card p-4 shadow-2xl shadow-black/50 flex items-start gap-3">
      <span className="text-2xl leading-none" aria-hidden="true">
        📡
      </span>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-foreground">
          Install StackScout
        </p>
        <p className="text-xs text-muted-foreground">
          Tap <span className="font-mono">Share</span> then{" "}
          <span className="font-mono">Add to Home Screen</span> for the
          full-screen app experience.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="text-muted-foreground hover:text-foreground text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
