"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/context/auth/AuthContext";
import { useDashboardData } from "../../_components/DashboardDataProvider";
import { deleteDashboardResource, type DashboardResource } from "@/services/dashboard.service";

const statusStyles: Record<DashboardResource["status"], string> = {
  READY: "text-primary bg-primary/10 border-primary/30",
  PROCESSING: "text-tertiary bg-tertiary/10 border-tertiary/30",
  PENDING: "text-on-surface-variant bg-surface-container-high border-outline-variant/40",
  FAILED: "text-error bg-error/10 border-error/30",
};

const sourceTypeIcon: Record<DashboardResource["sourceType"], string> = {
  UPLOAD: "upload_file",
  URL: "link",
  TEXT: "notes",
};

export default function ResourcesPage() {
  const { accessToken } = useAuth();
  const { resources, isLoading, refresh } = useDashboardData();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (resource: DashboardResource) => {
    if (!accessToken) return;
    const confirmed = window.confirm(`Delete "${resource.title}"? This can't be undone.`);
    if (!confirmed) return;

    setDeletingId(resource.id);
    try {
      await deleteDashboardResource(accessToken, resource.id);
      toast.success("Resource deleted");
      await refresh();
    } catch {
      toast.error("Failed to delete resource");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar-settings p-4 sm:p-6 md:p-8 bg-surface">
      <div className="max-w-3xl mx-auto space-y-6 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline-md text-headline-md text-on-surface">
              Resources
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Everything you&apos;ve uploaded, synced and ready to ground your sessions.
            </p>
          </div>
          <Link
            href="/session/new-session"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-on-primary rounded-lg px-4 py-2 font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add resource
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`resource-skeleton-${index}`}
                className="p-4 bg-surface-container-low border border-outline-variant/30 rounded-lg animate-pulse h-20"
              />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-4 py-16 border border-dashed border-outline-variant/40 rounded-xl">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
              folder_open
            </span>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                No resources yet
              </h3>
              <p className="text-body-md text-on-surface-variant mt-1">
                Upload a PDF, transcript, or link to ground your next session.
              </p>
            </div>
            <Link
              href="/session/new-session"
              className="inline-flex items-center gap-2 bg-primary text-on-primary rounded-lg px-4 py-2 font-label-md text-label-md"
            >
              Upload your first resource
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 bg-surface-container-low border border-outline-variant/30 rounded-lg flex items-center gap-4"
              >
                <span className="material-symbols-outlined text-on-surface-variant">
                  {sourceTypeIcon[resource.sourceType]}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline-md text-headline-md text-on-surface truncate">
                    {resource.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {resource.subject && (
                      <span className="text-label-sm text-on-surface-variant">
                        {resource.subject}
                      </span>
                    )}
                    {resource.topic && (
                      <span className="text-label-sm text-on-surface-variant">
                        · {resource.topic}
                      </span>
                    )}
                    {typeof resource._count?.chunks === "number" && (
                      <span className="text-label-sm text-on-surface-variant">
                        · {resource._count.chunks} chunks
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border ${statusStyles[resource.status]}`}
                >
                  {resource.status}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(resource)}
                  disabled={deletingId === resource.id}
                  className="text-on-surface-variant hover:text-error transition-colors disabled:opacity-40"
                  aria-label={`Delete ${resource.title}`}
                >
                  <span className="material-symbols-outlined">
                    {deletingId === resource.id ? "hourglass_empty" : "delete"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
