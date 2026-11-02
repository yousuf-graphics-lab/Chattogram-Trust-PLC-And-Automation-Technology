import { describe, expect, it } from "vitest";
import { COURSES, formatTaka } from "../data/courses";
import { SKILLS } from "../data/skills";
import { BRAND, whatsappUrl } from "../data/brand";
import {
  normalizeBangladeshPhone,
  safeImageSource,
  slugify,
  validateEnrollment,
  validBangladeshPhone,
  youTubeId,
} from "../lib/validation";
import { answerQuestion } from "../lib/assistant";

describe("institute content contract", () => {
  it("contains the six exact fees and durations", () => {
    expect(COURSES.map((course) => [course.fee, course.duration])).toEqual([
      [8000, "3 Months"],
      [9600, "3 Months"],
      [5000, "2 Months"],
      [5500, "2 Months"],
      [3000, "1 Month"],
      [5000, "1.5 Months"],
    ]);
    expect(new Set(COURSES.map((course) => course.slug)).size).toBe(6);
    expect(
      COURSES.every(
        (course) => course.syllabus.length >= 4 && course.outcomes.length >= 4,
      ),
    ).toBe(true);
    expect(formatTaka(8000)).toBe("8,000 Taka");
  });
  it("contains twenty unique skills with valid related courses", () => {
    expect(SKILLS).toHaveLength(20);
    expect(new Set(SKILLS.map((skill) => skill.id)).size).toBe(20);
    expect(
      SKILLS.every((skill) =>
        COURSES.some((course) => course.slug === skill.courseSlug),
      ),
    ).toBe(true);
    expect(SKILLS.every((skill) => skill.practice.length === 3)).toBe(true);
  });
  it("uses the exact phone and WhatsApp endpoints", () => {
    expect(BRAND.phoneHref).toBe("tel:+8801646241953");
    expect(whatsappUrl("hello world")).toBe(
      "https://wa.me/8801646241953?text=hello%20world",
    );
  });
});

describe("enrollment validation", () => {
  const valid = {
    studentName: "Test Student",
    mobile: "01712345678",
    courseId: "plc-foundation",
    senderNumber: "+8801612345678",
    transactionId: "AB12CD34EF",
  };
  it("accepts a valid manual payment reference", () =>
    expect(validateEnrollment(valid)).toEqual({}));
  it("rejects an invalid number, name, transaction and unknown course", () => {
    const errors = validateEnrollment({
      studentName: "A",
      mobile: "123",
      courseId: "missing",
      senderNumber: "123",
      transactionId: "bad id!",
    });
    expect(Object.keys(errors)).toHaveLength(5);
  });
  it("normalizes Bangladesh phone formats", () => {
    for (const phone of [
      "01712345678",
      "+8801712345678",
      "8801712345678",
      "+880 1712-345678",
    ]) {
      expect(normalizeBangladeshPhone(phone)).toBe("01712345678");
      expect(validBangladeshPhone(phone)).toBe(true);
    }
    expect(validBangladeshPhone("01212345678")).toBe(false);
  });
});

describe("safe media and URLs", () => {
  it("accepts only expected YouTube hosts and video IDs", () => {
    expect(youTubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ",
    );
    expect(youTubeId("https://youtu.be/dQw4w9WgXcQ?t=10")).toBe("dQw4w9WgXcQ");
    expect(
      youTubeId("https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ"),
    ).toBeNull();
    expect(youTubeId("javascript:alert(1)")).toBeNull();
    expect(youTubeId("https://www.youtube.com/@TrustTechBD-n7h")).toBeNull();
  });
  it("rejects external images and unsafe data schemes", () => {
    expect(safeImageSource("data:image/webp;base64,AAAA")).toBe(true);
    expect(safeImageSource("data:image/svg+xml,<svg></svg>")).toBe(false);
    expect(safeImageSource("https://example.com/image.jpg")).toBe(false);
  });
  it("makes predictable URL slugs", () =>
    expect(slugify("  Hello, PLC! 2026  ")).toBe("hello-plc-2026"));
});

describe("multilingual guidance", () => {
  it("answers English fees with every exact listed amount", () => {
    const answer = answerQuestion("What are the course fees?");
    expect(answer.text).toContain("8,000 Taka");
    expect(answer.text).toContain("9,600 Taka");
    expect(answer.text).toContain("5,500 Taka");
  });
  it("answers Bangla location and Banglish admission questions", () => {
    expect(answerQuestion("আপনাদের ঠিকানা কোথায়?").text).toContain("GEC");
    expect(answerQuestion("vorti kivabe korbo bkash diye").link?.url).toBe(
      "/checkout",
    );
    expect(answerQuestion("solar course fee koto").text).toContain(
      "5,000 Taka",
    );
    expect(answerQuestion("Who is the trainer?").text).toContain("Nezam uddin");
  });
  it("offers a human handoff for unknown questions", () =>
    expect(answerQuestion("Will it rain tomorrow?").link?.url).toContain(
      "wa.me/8801646241953",
    ));
});
