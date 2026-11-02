import { AlertTriangle } from "lucide-react";
import { Button, Modal } from "../../components/ui";

export interface AdminSectionProps {
  notify: (message: string) => void;
}
export interface ConfirmRequest {
  title: string;
  description: string;
  action: () => void;
}
export function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "The change could not be saved. Please try again.";
}
export function ConfirmDialog({
  request,
  onClose,
}: {
  request: ConfirmRequest | null;
  onClose: () => void;
}) {
  return (
    <Modal
      open={!!request}
      onClose={onClose}
      title={request?.title || "Confirm action"}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle size={21} className="mt-1 text-safety" />
        <p className="text-sm leading-7 text-muted">{request?.description}</p>
      </div>
      <div className="mt-7 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Keep it
        </Button>
        <Button
          variant="orange"
          onClick={() => {
            request?.action();
            onClose();
          }}
        >
          Confirm action
        </Button>
      </div>
    </Modal>
  );
}
export function SaveError({ message }: { message: string }) {
  return message ? (
    <p className="form-error mb-4" role="alert">
      {message}
    </p>
  ) : null;
}
export function EditorFooter({
  onClose,
  busy = false,
  label = "Save changes",
}: {
  onClose: () => void;
  busy?: boolean;
  label?: string;
}) {
  return (
    <div className="mt-6 flex justify-end gap-3 border-t border-line pt-5">
      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
        disabled={busy}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={busy}>
        {busy ? "Processing…" : label}
      </Button>
    </div>
  );
}
