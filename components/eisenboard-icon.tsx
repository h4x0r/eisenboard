export function EisenboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Top-left quadrant - Do First (Red) */}
      <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#fca5a5" />

      {/* Top-right quadrant - Schedule (Blue) */}
      <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#93c5fd" />

      {/* Bottom-left quadrant - Delegate (Yellow) */}
      <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#fde047" />

      {/* Bottom-right quadrant - Eliminate (Gray) */}
      <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#d1d5db" />
    </svg>
  )
}
