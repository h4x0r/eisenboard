"use client"

import { useEffect, useState } from "react"
import packageInfo from "../package.json"

export function VersionFooter() {
  const [commitHash, setCommitHash] = useState<string | null>(null)

  useEffect(() => {
    // Get git commit hash if available (usually in production builds)
    const gitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
    if (gitSha) {
      setCommitHash(gitSha.slice(0, 7)) // Use first 7 chars of commit hash
    }
  }, [])

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
      <div className="flex justify-center p-2">
        <div className="text-xs text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors pointer-events-auto">
          <span className="select-none">
            v{packageInfo.version}
            {commitHash && (
              <>
                {" • "}
                <a
                  href={`https://github.com/h4x0r/eisenboard/commit/${commitHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {commitHash}
                </a>
              </>
            )}
            {process.env.NODE_ENV === "development" && (
              <span className="text-amber-500/50"> • dev</span>
            )}
          </span>
        </div>
      </div>
    </footer>
  )
}