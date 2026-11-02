import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  Search,
  Trash2,
} from "lucide-react";
import { useDatabase } from "../../context/DatabaseContext";
import { COURSES, formatTaka } from "../../data/courses";
import type { Enrollment, EnrollmentStatus } from "../../types";
import { downloadJson } from "../../lib/storage";
import { formatDate, searchMatches } from "../../lib/utils";
import { Button, EmptyState, Modal, StatusBadge } from "../../components/ui";
import type { AdminSectionProps, ConfirmRequest } from "./shared";
import { getErrorMessage, SaveError } from "./shared";

export function AdminEnrollments({
  notify,
  confirm,
}: { confirm: (request: ConfirmRequest) => void } & AdminSectionProps) {
  const { enrollments, update } = useDatabase();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<{
    entry: Enrollment;
    status: EnrollmentStatus;
  } | null>(null);
  const [verified, setVerified] = useState(false);
  const filtered = [...enrollments]
    .filter(
      (entry) =>
        (status === "all" || entry.status === status) &&
        searchMatches(
          query,
          entry.studentName,
          entry.mobile,
          entry.transactionId,
          COURSES.find((course) => course.id === entry.courseId)?.title || "",
        ),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const pageCount = Math.max(1, Math.ceil(filtered.length / 10));
  const currentPage = Math.min(page, pageCount);
  const rows = filtered.slice((currentPage - 1) * 10, currentPage * 10);
  function saveStatus(event: React.FormEvent) {
    event.preventDefault();
    if (!editing) return;
    if (editing.status === "confirmed" && !verified) return;
    try {
      update("enrollments", (current) =>
        current.map((entry) =>
          entry.id === editing.entry.id
            ? { ...entry, status: editing.status }
            : entry,
        ),
      );
      notify("Enrollment status updated in this browser.");
      setEditing(null);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  }
  return (
    <>
      <div className="admin-toolbar">
        <div>
          <h1>Course enrollments</h1>
          <p>
            Verify original payment receipts outside this app before confirming.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            downloadJson(
              `trust-enrollments-${new Date().toISOString().slice(0, 10)}.json`,
              filtered,
            );
            notify("Enrollment export prepared. Keep the file private.");
          }}
          disabled={!filtered.length}
        >
          <Download size={15} />
          Export JSON
        </Button>
      </div>
      <SaveError message={error} />
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="search-field flex-1">
          <Search size={16} />
          <label htmlFor="enrollment-search" className="sr-only">
            Search enrollments
          </label>
          <input
            id="enrollment-search"
            className="field"
            type="search"
            placeholder="Search name, phone, course or TrxID…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <label className="sr-only" htmlFor="enrollment-status">
          Enrollment status
        </label>
        <select
          id="enrollment-status"
          className="field !w-auto !min-h-11 !text-xs"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
        >
          <option value="all">All statuses</option>
          <option value="pending">Awaiting verification</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {rows.length ? (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course / fee</th>
                <th>Payment details</th>
                <th>Received</th>
                <th>Status</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <strong className="font-medium">{entry.studentName}</strong>
                    <span className="block text-muted">{entry.mobile}</span>
                  </td>
                  <td className="max-w-[200px]">
                    {
                      COURSES.find((course) => course.id === entry.courseId)
                        ?.shortTitle
                    }
                    <small>{formatTaka(entry.fee)}</small>
                  </td>
                  <td>
                    <span className="font-mono">{entry.transactionId}</span>
                    <small>From: {entry.senderNumber}</small>
                  </td>
                  <td className="whitespace-nowrap">
                    {formatDate(entry.createdAt)}
                    <small>
                      {new Date(entry.createdAt).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </td>
                  <td>
                    <StatusBadge status={entry.status} />
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button
                        className="icon-btn !h-8 !w-8"
                        aria-label={`Review enrollment for ${entry.studentName}`}
                        title="Review enrollment"
                        onClick={() => {
                          setEditing({ entry, status: entry.status });
                          setVerified(false);
                          setError("");
                        }}
                      >
                        <CheckCircle2 size={15} />
                      </button>
                      <button
                        className="icon-btn !h-8 !w-8 hover:!text-red-400"
                        aria-label={`Delete enrollment for ${entry.studentName}`}
                        title="Delete enrollment"
                        onClick={() =>
                          confirm({
                            title: "Delete this enrollment?",
                            description: `Permanently remove ${entry.studentName}’s enrollment and TrxID from this browser. Export a private backup first if needed. This does not refund or change the original bKash transaction.`,
                            action: () => {
                              try {
                                update("enrollments", (current) =>
                                  current.filter(
                                    (item) => item.id !== entry.id,
                                  ),
                                );
                                notify("Enrollment deleted from this browser.");
                              } catch (error) {
                                setError(getErrorMessage(error));
                              }
                            },
                          })
                        }
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title={
            enrollments.length
              ? "No matching enrollments"
              : "No enrollments yet"
          }
          description={
            enrollments.length
              ? "Try another search or status filter."
              : "New checkout entries saved in this browser will appear here."
          }
        />
      )}
      <div className="mt-5 flex items-center justify-between gap-4 text-[11px] text-muted">
        <span>
          {filtered.length} records · Page {currentPage} of {pageCount}
        </span>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="!min-h-9 !px-3 !py-2"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            aria-label="Previous page"
          >
            <ArrowLeft size={14} />
          </Button>
          <Button
            variant="secondary"
            className="!min-h-9 !px-3 !py-2"
            disabled={currentPage === pageCount}
            onClick={() => setPage(currentPage + 1)}
            aria-label="Next page"
          >
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
      <p className="form-notice mt-6">
        These records contain personal and payment-reference information. Export
        only to a trusted location. Records are local to this browser and are
        not delivered to a server or synchronized between devices.
      </p>
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Review enrollment"
      >
        {editing && (
          <form onSubmit={saveStatus}>
            <div className="mb-5 rounded-lg bg-canvas p-4">
              <h3 className="text-base font-semibold">
                {editing.entry.studentName}
              </h3>
              <p className="mt-2 text-xs text-muted">
                {
                  COURSES.find((course) => course.id === editing.entry.courseId)
                    ?.title
                }
              </p>
              <div className="summary-row">
                <span>Amount recorded</span>
                <strong>{formatTaka(editing.entry.fee)}</strong>
              </div>
              <div className="summary-row">
                <span>TrxID</span>
                <strong className="font-mono">
                  {editing.entry.transactionId}
                </strong>
              </div>
              <div className="summary-row">
                <span>Sender</span>
                <strong>{editing.entry.senderNumber}</strong>
              </div>
            </div>
            <label className="field-label" htmlFor="review-status">
              Enrollment status
            </label>
            <select
              id="review-status"
              className="field"
              value={editing.status}
              onChange={(event) => {
                setEditing({
                  ...editing,
                  status: event.target.value as EnrollmentStatus,
                });
                setVerified(false);
              }}
            >
              <option value="pending">Awaiting verification</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {editing.status === "confirmed" && (
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-6 text-muted">
                <input
                  type="checkbox"
                  className="mt-1 accent-blue-600"
                  required
                  checked={verified}
                  onChange={(event) => setVerified(event.target.checked)}
                />
                <span>
                  I have independently verified the original bKash receipt,
                  recipient, amount and transaction. This app does not verify
                  payments.
                </span>
              </label>
            )}
            <SaveError message={error} />
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={editing.status === "confirmed" && !verified}
              >
                Save status
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
