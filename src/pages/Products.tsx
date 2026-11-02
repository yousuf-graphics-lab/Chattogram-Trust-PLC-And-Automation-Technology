import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Info,
  MessageCircle,
  PackageCheck,
  Search,
} from "lucide-react";
import { PRODUCTS } from "../data/products";
import type { Product } from "../data/products";
import { whatsappUrl } from "../data/brand";
import { useSeo } from "../hooks/useSeo";
import { searchMatches } from "../lib/utils";
import {
  ActionLink,
  Button,
  EmptyState,
  Modal,
  PageHero,
  Reveal,
} from "../components/ui";
import { TechArt } from "../components/TechArt";

const categories = [
  "All kits",
  "PLC & control",
  "Drives & HMI",
  "Design & energy",
];
export function Products() {
  const [category, setCategory] = useState("All kits");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  useSeo({
    title: "Automation Training Kits & Equipment",
    description:
      "Explore PLC learning stations, VFD motor kits, HMI integration packages, motor-control panels and solar training equipment. Request current availability and a quotation.",
  });
  const filtered = PRODUCTS.filter(
    (product) =>
      (category === "All kits" || product.category === category) &&
      searchMatches(
        query,
        product.title,
        product.description,
        ...product.specs,
      ),
  );
  return (
    <>
      <PageHero
        eyebrow="Automation kits & equipment"
        title="Bring practical learning"
        highlight="to your workbench."
        description="Purposeful training platforms and automation packages for learners, technical teams and training labs. Configure the right setup with our guidance."
      >
        <div className="mt-7 flex flex-wrap gap-2">
          <span className="tag">
            <PackageCheck size={13} />
            Requirement-based configurations
          </span>
          <span className="tag">
            <MessageCircle size={13} />
            Direct quotation & support
          </span>
        </div>
      </PageHero>
      <section className="section">
        <div className="container-site">
          <div className="filter-toolbar">
            <div className="filter-chips" aria-label="Filter equipment">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`chip ${category === item ? "active" : ""}`}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="search-field">
              <Search size={16} />
              <label htmlFor="product-search" className="sr-only">
                Search kits and equipment
              </label>
              <input
                id="product-search"
                type="search"
                className="field"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search equipment…"
              />
            </div>
          </div>
          <p className="form-notice mb-7">
            <Info size={15} className="mr-2 inline text-cyan-500" />
            These are configurable product offerings, not live inventory.
            Confirm specifications, availability, delivery and the final
            quotation before paying. Course fees do not include equipment
            purchases.
          </p>
          {filtered.length ? (
            <div className="course-grid">
              {filtered.map((product) => (
                <Reveal key={product.id}>
                  <article className="panel product-card interactive-panel h-full">
                    <button
                      className="text-left"
                      onClick={() => setSelected(product)}
                      aria-label={`View ${product.title} details`}
                    >
                      <TechArt variant={product.art} />
                    </button>
                    <div className="product-body">
                      <span className="text-[9px] uppercase tracking-widest text-cyan-500">
                        {product.category}
                      </span>
                      <h2>
                        <button
                          className="text-left hover:text-cyan-400"
                          onClick={() => setSelected(product)}
                        >
                          {product.title}
                        </button>
                      </h2>
                      <p>{product.description}</p>
                      <div className="product-specs">
                        {product.specs.map((spec) => (
                          <span className="tag" key={spec}>
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="product-bottom">
                        <span>Request a quote</span>
                        <button
                          className="text-link"
                          onClick={() => setSelected(product)}
                        >
                          View details
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                      <ActionLink
                        href={whatsappUrl(
                          `আসসালামু আলাইকুম, আমি ${product.title} সম্পর্কে দাম, কনফিগারেশন ও প্রাপ্যতা জানতে চাই।`,
                        )}
                        variant="secondary"
                        className="mt-4 w-full"
                      >
                        <MessageCircle size={15} />
                        Ask about availability
                      </ActionLink>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setCategory("All kits");
                    setQuery("");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          )}
        </div>
      </section>
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title || "Equipment details"}
        className="media-modal"
      >
        {selected && (
          <>
            <TechArt variant={selected.art} />
            <p className="media-description">{selected.description}</p>
            <h3 className="mb-3 mt-6 text-sm font-semibold">
              Configured package can include
            </h3>
            <ul className="check-list">
              {selected.includes.map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="form-notice mt-5">
              <strong className="text-ink">Ideal for:</strong>{" "}
              {selected.idealFor} Final hardware, software licenses and safety
              requirements are confirmed in the quotation.
            </p>
            <ActionLink
              href={whatsappUrl(
                `আসসালামু আলাইকুম, আমি ${selected.title} এর বিস্তারিত কনফিগারেশন ও মূল্য জানতে চাই।`,
              )}
              variant="orange"
              className="mt-6"
            >
              Request this configuration
              <ArrowUpRight size={16} />
            </ActionLink>
          </>
        )}
      </Modal>
    </>
  );
}
