import { useEffect, useId, useRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, SearchX, X } from "lucide-react";
import { cx } from "../lib/utils";

type Variant =
  "primary" | "orange" | "secondary" | "ghost" | "bkash" | "whatsapp";
const variantClasses: Record<Variant, string> = {
  primary: "btn-primary",
  orange: "btn-orange",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  bkash: "btn-bkash",
  whatsapp: "btn-whatsapp",
};
export const buttonClass = (variant: Variant = "primary", className = "") =>
  cx("btn", variantClasses[variant], className);
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={buttonClass(variant, className)} {...props}>
      {children}
    </button>
  );
}
export function ActionLink({
  to,
  href,
  variant = "primary",
  className,
  children,
  onClick,
  download,
}: {
  to?: string;
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  download?: boolean;
}) {
  const classes = buttonClass(variant, className);
  if (to)
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  const external = href?.startsWith("http");
  return (
    <a
      href={href || "#"}
      className={classes}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
    >
      {children}
    </a>
  );
}
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: { label: string; to: string };
  centered?: boolean;
}) {
  return (
    <div className={cx("section-heading", centered && "text-center")}>
      <div>
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && (
        <Link to={action.to} className="text-link shrink-0">
          {action.label}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero grid-bg">
      <div className="container-site relative z-10">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <span>{eyebrow}</span>
        </nav>
        <p className="eyebrow mt-9">
          <span />
          {eyebrow}
        </p>
        <h1>
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-gradient">{highlight}</span>
            </>
          )}
        </h1>
        <p className="page-hero-description">{description}</p>
        {children}
      </div>
    </section>
  );
}
export function EmptyState({
  title = "No matches found",
  description = "Try a different search or clear your filters.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <SearchX size={34} className="mx-auto mb-4 text-cyan-400" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
  }, [open]);
  return createPortal(
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={cx("site-modal", className)}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="modal-inner">
        <div className="modal-heading">
          <h2 id={titleId}>{title}</h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        {open && children}
      </div>
    </dialog>,
    document.body,
  );
}
export function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={id} className="field-error" role="alert">
      {error}
    </p>
  ) : null;
}
export function StatusBadge({
  status,
}: {
  status: "pending" | "confirmed" | "cancelled";
}) {
  return (
    <span
      className={`status-badge ${{ pending: "status-pending", confirmed: "status-confirmed", cancelled: "status-cancelled" }[status]}`}
    >
      <span />
      {status === "pending"
        ? "Awaiting verification"
        : status === "confirmed"
          ? "Confirmed"
          : "Cancelled"}
    </span>
  );
}
