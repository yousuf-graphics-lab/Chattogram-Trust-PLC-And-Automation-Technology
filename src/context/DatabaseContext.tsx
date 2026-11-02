import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Database, Enrollment, EnrollmentInput } from "../types";
import { COURSES } from "../data/courses";
import {
  makeId,
  normalizeBangladeshPhone,
  validateEnrollment,
} from "../lib/validation";
import type { EnrollmentErrors } from "../lib/validation";
import {
  readSlice,
  STORAGE_KEYS,
  STORAGE_MESSAGE,
  writeSlice,
} from "../lib/storage";
import { whatsappUrl } from "../data/brand";

type DatabaseContextValue = Database & {
  storageError: string;
  update: <K extends keyof Database>(
    key: K,
    next: Database[K] | ((current: Database[K]) => Database[K]),
  ) => void;
  addEnrollment: (input: EnrollmentInput) => {
    enrollment?: Enrollment;
    errors?: EnrollmentErrors;
    message?: string;
    whatsappUrl?: string;
  };
};
const DatabaseContext = createContext<DatabaseContextValue | null>(null);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [database, setDatabase] = useState<Database>(() => ({
    enrollments: readSlice("enrollments"),
    notices: readSlice("notices"),
    articles: readSlice("articles"),
    gallery: readSlice("gallery"),
    content: readSlice("content"),
  }));
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      const key = (Object.keys(STORAGE_KEYS) as (keyof Database)[]).find(
        (item) => STORAGE_KEYS[item] === event.key,
      );
      if (key)
        setDatabase((current) => ({ ...current, [key]: readSlice(key) }));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback(
    <K extends keyof Database>(
      key: K,
      next: Database[K] | ((current: Database[K]) => Database[K]),
    ) => {
      const current = readSlice(key);
      const value = typeof next === "function" ? next(current) : next;
      writeSlice(key, value);
      setDatabase((state) => ({ ...state, [key]: value }));
      setStorageError("");
    },
    [],
  );

  const addEnrollment = useCallback(
    (input: EnrollmentInput) => {
      const errors = validateEnrollment(input);
      if (Object.keys(errors).length) return { errors };
      const course = COURSES.find((item) => item.id === input.courseId)!;
      const enrollments = readSlice("enrollments");
      const transactionId = input.transactionId.trim().toUpperCase();
      if (
        enrollments.some(
          (entry) => entry.transactionId.toUpperCase() === transactionId,
        )
      )
        return {
          errors: {
            transactionId:
              "This transaction ID is already recorded in this browser. Contact us if you need help.",
          },
        };
      const enrollment: Enrollment = {
        id: makeId(),
        studentName: input.studentName.trim(),
        mobile: normalizeBangladeshPhone(input.mobile),
        courseId: course.id,
        senderNumber: normalizeBangladeshPhone(input.senderNumber),
        transactionId,
        fee: course.fee,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      try {
        update("enrollments", [...enrollments, enrollment]);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : STORAGE_MESSAGE;
        setStorageError(message);
        return { message };
      }
      const message = `আসসালামু আলাইকুম, আমি ${enrollment.studentName}, ${course.title} কোর্সে ভর্তি হতে bKash করেছি। TrxID: ${enrollment.transactionId}, Phone: ${enrollment.mobile}। অনুগ্রহ করে কনফার্ম করুন।`;
      return { enrollment, whatsappUrl: whatsappUrl(message) };
    },
    [update],
  );

  const value = useMemo(
    () => ({ ...database, storageError, update, addEnrollment }),
    [database, storageError, update, addEnrollment],
  );
  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context)
    throw new Error("useDatabase must be used inside DatabaseProvider.");
  return context;
}
