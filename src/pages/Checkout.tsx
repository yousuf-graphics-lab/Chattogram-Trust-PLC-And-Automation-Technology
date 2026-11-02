import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  CreditCard,
  Info,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { BRAND, whatsappUrl } from "../data/brand";
import { COURSES, formatTaka } from "../data/courses";
import { useDatabase } from "../context/DatabaseContext";
import type { Enrollment, EnrollmentInput } from "../types";
import type { EnrollmentErrors } from "../lib/validation";
import { useSeo } from "../hooks/useSeo";
import {
  ActionLink,
  Button,
  FieldError,
  PageHero,
  StatusBadge,
} from "../components/ui";
import { TechArt } from "../components/TechArt";
import { WhatsAppIcon } from "../components/FloatingAssistant";

interface Receipt {
  enrollment: Enrollment;
  url: string;
  opened: boolean;
}
export function Checkout() {
  const [params] = useSearchParams();
  const initialCourse =
    COURSES.find((course) => course.slug === params.get("course"))?.id || "";
  const { addEnrollment } = useDatabase();
  const [form, setForm] = useState<EnrollmentInput>({
    studentName: "",
    mobile: "",
    courseId: initialCourse,
    senderNumber: "",
    transactionId: "",
  });
  const [errors, setErrors] = useState<EnrollmentErrors>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [copyState, setCopyState] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const course = COURSES.find((item) => item.id === form.courseId);
  useSeo({
    title: "Online Enrollment & bKash Payment Details",
    description:
      "Record your course enrollment and manual bKash payment details, then send a prepared WhatsApp confirmation to Chattogram Trust. Payment requires manual verification.",
    noIndex: true,
  });
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (receipt) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [receipt]);
  const field = (key: keyof EnrollmentInput, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSaveError("");
  };
  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(BRAND.phoneDisplay);
      setCopyState("Number copied");
    } catch {
      setCopyState("Select the number to copy");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState(""), 3000);
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError("");
    setConsentError("");
    const result = addEnrollment(form);
    setErrors(result.errors || {});
    if (!consent)
      setConsentError(
        "Please confirm that you have sent the payment and understand manual verification is required.",
      );
    if (result.message) setSaveError(result.message);
    if (
      result.errors ||
      !consent ||
      !result.enrollment ||
      !result.whatsappUrl
    ) {
      const first = result.errors
        ? Object.keys(result.errors)[0]
        : !consent
          ? "payment-consent"
          : "";
      if (first) document.getElementById(`checkout-${first}`)?.focus();
      return;
    }
    const popup = window.open(
      result.whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );
    setReceipt({
      enrollment: result.enrollment,
      url: result.whatsappUrl,
      opened: !!popup,
    });
  }
  const inputProps = (key: keyof EnrollmentInput) => ({
    id: `checkout-${key}`,
    name: key,
    value: form[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      field(key, event.target.value),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `checkout-${key}-error` : undefined,
  });
  return (
    <>
      <PageHero
        eyebrow="Online enrollment"
        title={
          receipt ? "Your next step is ready." : "A new skill starts here."
        }
        highlight={
          receipt
            ? "Let’s confirm your enrollment."
            : "Simple steps. Personal confirmation."
        }
        description="Record your manual bKash payment, then send the details to our team on WhatsApp. We verify your transaction before confirming admission."
      />
      <section className="section">
        <div className="container-site">
          {receipt ? (
            <div className="panel success-panel">
              <div className="success-icon">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Enrollment details recorded.
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Thank you, {receipt.enrollment.studentName}. Your entry is saved
                in this browser.{" "}
                {receipt.opened
                  ? "WhatsApp has been opened in a new tab. Send the prepared message to complete your request."
                  : "If WhatsApp did not open, use the button below to send your prepared message."}
              </p>
              <div className="my-6 rounded-lg border border-line bg-canvas p-5">
                <div className="summary-row">
                  <span>Course</span>
                  <strong>
                    {
                      COURSES.find(
                        (item) => item.id === receipt.enrollment.courseId,
                      )?.title
                    }
                  </strong>
                </div>
                <div className="summary-row">
                  <span>Amount recorded</span>
                  <strong>{formatTaka(receipt.enrollment.fee)}</strong>
                </div>
                <div className="summary-row">
                  <span>Transaction ID</span>
                  <strong className="font-mono">
                    {receipt.enrollment.transactionId}
                  </strong>
                </div>
                <div className="summary-row">
                  <span>Status</span>
                  <StatusBadge status={receipt.enrollment.status} />
                </div>
              </div>
              <p className="form-notice mb-6">
                <Info size={15} className="mr-1 inline text-cyan-500" />
                This is not a payment receipt or confirmed admission. The
                institute must verify your transaction. Keep your original bKash
                receipt safe.
              </p>
              <div className="flex flex-wrap gap-3">
                <ActionLink href={receipt.url} variant="whatsapp">
                  <WhatsAppIcon size={18} />
                  Send WhatsApp confirmation
                  <ArrowUpRight size={15} />
                </ActionLink>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setReceipt(null);
                    setForm({
                      studentName: "",
                      mobile: "",
                      courseId: "",
                      senderNumber: "",
                      transactionId: "",
                    });
                    setConsent(false);
                    setErrors({});
                    setSaveError("");
                  }}
                >
                  Record another enrollment
                </Button>
              </div>
              <Link to="/courses" className="text-link mt-7">
                <ArrowLeft size={14} />
                Back to courses
              </Link>
            </div>
          ) : (
            <div className="checkout-layout">
              <form
                className="panel checkout-form"
                noValidate
                onSubmit={submit}
              >
                <div className="checkout-steps">
                  <span className="checkout-step active">
                    <span>1</span>Choose & pay
                  </span>
                  <i className="checkout-step-line" />
                  <span className="checkout-step active">
                    <span>2</span>Add details
                  </span>
                  <i className="checkout-step-line" />
                  <span className="checkout-step">
                    <span>3</span>Verify
                  </span>
                </div>
                <div className="bkash-instruction">
                  <div className="flex items-center justify-between gap-4">
                    <span className="bkash-wordmark">bKash</span>
                    <span className="rounded-full border border-bkash/25 px-2.5 py-1 text-[9px] bkash-text font-medium">
                      MANUAL PAYMENT
                    </span>
                  </div>
                  <h2 className="mt-4 text-sm font-semibold">
                    Pay directly, then record your transaction.
                  </h2>
                  <p className="mt-2 text-xs leading-6 text-muted">
                    Use the payment option and account type confirmed by our
                    team. Verify the recipient and amount inside your bKash app
                    before sending. If unsure, contact us first.
                  </p>
                  <div className="payment-number">
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-muted">
                        bKash payment / merchant number
                      </span>
                      <strong className="mt-1 block select-all">
                        {BRAND.phoneDisplay}
                      </strong>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="!min-h-9 !px-3 !py-2 !text-[10px]"
                      onClick={copyNumber}
                    >
                      <Copy size={13} />
                      Copy
                    </Button>
                  </div>
                  <p
                    className="mt-2 min-h-4 text-[10px] text-cyan-500"
                    role="status"
                  >
                    {copyState}
                  </p>
                  <a
                    className="mt-2 inline-flex items-center gap-1 text-[11px] bkash-text font-medium"
                    href={whatsappUrl(
                      "আসসালামু আলাইকুম, bKash payment করার আগে অনুগ্রহ করে account type ও payment method কনফার্ম করবেন?",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Confirm payment method first
                    <ArrowUpRight size={12} />
                  </a>
                </div>
                <h2 className="form-section-title">
                  <UserRound size={16} />
                  Student information
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="field-label"
                      htmlFor="checkout-studentName"
                    >
                      Student name *
                    </label>
                    <input
                      className="field"
                      {...inputProps("studentName")}
                      autoComplete="name"
                      maxLength={80}
                      placeholder="Your full name"
                      required
                    />
                    <FieldError
                      id="checkout-studentName-error"
                      error={errors.studentName}
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="checkout-mobile">
                      Mobile number *
                    </label>
                    <input
                      className="field"
                      {...inputProps("mobile")}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={20}
                      placeholder="01XXXXXXXXX"
                      required
                    />
                    <FieldError
                      id="checkout-mobile-error"
                      error={errors.mobile}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label className="field-label" htmlFor="checkout-courseId">
                    Selected course *
                  </label>
                  <select
                    className="field"
                    id="checkout-courseId"
                    name="courseId"
                    value={form.courseId}
                    onChange={(event) => field("courseId", event.target.value)}
                    aria-invalid={!!errors.courseId}
                    aria-describedby={
                      errors.courseId ? "checkout-courseId-error" : undefined
                    }
                    required
                  >
                    <option value="">Choose your course</option>
                    {COURSES.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.title} — {formatTaka(item.fee)}
                      </option>
                    ))}
                  </select>
                  <FieldError
                    id="checkout-courseId-error"
                    error={errors.courseId}
                  />
                </div>
                <h2 className="form-section-title">
                  <CreditCard size={16} />
                  bKash transaction details
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      className="field-label"
                      htmlFor="checkout-senderNumber"
                    >
                      bKash sender number *
                    </label>
                    <input
                      className="field"
                      {...inputProps("senderNumber")}
                      type="tel"
                      inputMode="tel"
                      autoComplete="off"
                      maxLength={20}
                      placeholder="Number you paid from"
                      required
                    />
                    <FieldError
                      id="checkout-senderNumber-error"
                      error={errors.senderNumber}
                    />
                  </div>
                  <div>
                    <label
                      className="field-label"
                      htmlFor="checkout-transactionId"
                    >
                      Transaction ID (TrxID) *
                    </label>
                    <input
                      className="field uppercase"
                      {...inputProps("transactionId")}
                      autoComplete="off"
                      autoCapitalize="characters"
                      spellCheck={false}
                      maxLength={30}
                      placeholder="e.g. AB12CD34EF"
                      required
                    />
                    <FieldError
                      id="checkout-transactionId-error"
                      error={errors.transactionId}
                    />
                  </div>
                </div>
                <p className="field-hint mt-3">
                  Enter the TrxID from your payment receipt, not your PIN or
                  OTP. We will never ask for your PIN, password or one-time
                  code.
                </p>
                <div className="mt-6 border-t border-line pt-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      id="payment-consent"
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
                      checked={consent}
                      onChange={(event) => {
                        setConsent(event.target.checked);
                        setConsentError("");
                      }}
                      aria-invalid={!!consentError}
                      aria-describedby={
                        consentError ? "payment-consent-error" : undefined
                      }
                    />
                    <span className="text-xs leading-6 text-muted">
                      I have sent this payment and understand that the institute
                      must verify it manually. My details will be saved in this
                      browser and shared with the team only when I send the
                      WhatsApp message.
                    </span>
                  </label>
                  <FieldError id="payment-consent-error" error={consentError} />
                </div>
                {saveError && (
                  <div className="form-error mt-5" role="alert">
                    {saveError}
                    <a className="mt-2 block underline" href={BRAND.phoneHref}>
                      Call {BRAND.phoneDisplay} for help.
                    </a>
                  </div>
                )}
                <Button type="submit" variant="bkash" className="mt-6 w-full">
                  Confirm bKash Payment
                  <ArrowRight size={17} />
                </Button>
                <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-[10px] leading-5 text-muted">
                  <LockKeyhole size={12} className="mt-1" />
                  Saves your entry and opens WhatsApp. No automatic charge or
                  admission confirmation.
                </p>
              </form>
              <aside>
                <div className="panel checkout-summary">
                  <p className="eyebrow">
                    <span />
                    YOUR ENROLLMENT SUMMARY
                  </p>
                  <h2 className="text-lg font-semibold leading-7">
                    {course?.shortTitle || "Choose your next skill"}
                  </h2>
                  {course ? (
                    <TechArt variant={course.art} />
                  ) : (
                    <div className="my-5 rounded-lg border border-dashed border-line p-6 text-center">
                      <CreditCard size={28} className="mx-auto text-cyan-500" />
                      <p className="mt-3 text-xs leading-6 text-muted">
                        Select a course to see its total fee.
                      </p>
                    </div>
                  )}
                  <div className="summary-row">
                    <span>Course fee</span>
                    <strong>
                      {course ? formatTaka(course.fee) : "Not selected"}
                    </strong>
                  </div>
                  <div className="summary-row">
                    <span>Duration</span>
                    <strong>{course?.duration || "—"}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Processing fee</span>
                    <strong>None added by this site</strong>
                  </div>
                  <div className="summary-row summary-total">
                    <span>Total course fee</span>
                    <strong>{course ? formatTaka(course.fee) : "—"}</strong>
                  </div>
                  <p className="mt-3 text-[10px] leading-5 text-muted">
                    Any bKash app charge is shown in your app and is not added
                    to this course fee. Confirm the exact amount before payment.
                  </p>
                  <div className="mt-6 border-t border-line pt-5">
                    <h3 className="mb-4 text-xs font-semibold">
                      What happens next?
                    </h3>
                    <ol className="space-y-4">
                      {[
                        "Your details are saved in this browser.",
                        "Send the prepared WhatsApp message.",
                        "Our team verifies the payment and replies.",
                      ].map((step, index) => (
                        <li
                          key={step}
                          className="flex gap-3 text-[11px] leading-6 text-muted"
                        >
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-cyan-500/30 text-[9px] text-cyan-500">
                            {index + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="form-notice mt-5">
                  <ShieldCheck size={18} className="mb-2 text-cyan-500" />
                  <strong className="text-ink">
                    Your payment, protected by care.
                  </strong>
                  <p className="mt-1">
                    Never share your PIN or OTP. Keep the original bKash
                    receipt. On a shared device, ask the administrator to export
                    and remove your local enrollment record after verification.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
