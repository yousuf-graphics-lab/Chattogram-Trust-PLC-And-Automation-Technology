import {
  ArrowUpRight,
  Clock3,
  MessageCircle,
  Signal,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Course } from "../types";
import { formatTaka } from "../data/courses";
import { whatsappUrl } from "../data/brand";
import { TechArt } from "./TechArt";
import { ActionLink } from "./ui";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="course-card group">
      <Link
        to={`/courses/${course.slug}`}
        className="course-art-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <TechArt variant={course.art} />
        <span className="art-category">{course.category}</span>
        {course.featured && <span className="art-featured">POPULAR</span>}
        <span className="art-open">
          <ArrowUpRight size={19} />
        </span>
      </Link>
      <div className="course-card-body">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={13} />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Signal size={13} />
            {course.level}
          </span>
        </div>
        <h3>
          <Link to={`/courses/${course.slug}`}>{course.shortTitle}</Link>
        </h3>
        <p className="course-card-description">{course.description}</p>
        <div className="course-price-row">
          <div>
            <span className="text-[11px] text-muted">COURSE FEE</span>
            <p className="course-price">{formatTaka(course.fee)}</p>
          </div>
          <Link className="text-link" to={`/courses/${course.slug}`}>
            View syllabus
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="course-card-actions">
          <ActionLink
            to={`/checkout?course=${course.slug}`}
            variant="orange"
            className="flex-1 !px-3"
          >
            Enroll via bKash
            <ArrowUpRight size={15} />
          </ActionLink>
          <ActionLink
            href={whatsappUrl(
              `আসসালামু আলাইকুম, আমি ${course.title} কোর্স সম্পর্কে জানতে চাই।`,
            )}
            variant="secondary"
            className="!px-3"
          >
            <MessageCircle size={16} />
            <span>WhatsApp Inquiry</span>
          </ActionLink>
        </div>
      </div>
    </article>
  );
}
