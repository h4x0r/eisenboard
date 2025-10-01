"use client"

import { useEffect, useState } from "react"
import packageInfo from "../package.json"

export function VersionFooter() {
  const [commitHash, setCommitHash] = useState<string | null>(null)
  const [deployTime, setDeployTime] = useState<string>('')

  useEffect(() => {
    // Get git commit hash if available (usually in production builds)
    const gitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
    if (gitSha) {
      setCommitHash(gitSha.slice(0, 7)) // Use first 7 chars of commit hash
    }

    // Set deploy timestamp in ISO 8601 format
    // Generate current time in dev since env variables don't update in client components
    setDeployTime(new Date().toISOString())
  }, [])

  return (
    <footer className="mt-8 py-4 border-t border-border/20">
      <div className="flex justify-center">
        <div className="text-xs text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">
          <span className="select-none">
            v{packageInfo.version}{deployTime && ` • ${deployTime}`}
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