import { useState } from "react";

const sections = [
  {
    title: "Shopping",
    links: ["Högtalare", "Baslådor", "Mikrofoner", "Tillbehör"],
  },
  {
    title: "Mina Sidor",
    links: ["Mina Ordrar", "Mitt Konto"],
  },
  {
    title: "Kundtjänst",
    links: ["Returpolicy", "Integritetspolicy"],
  },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <footer className="mt-12 bg-gray-100 text-gray-800">
      {/* Desktop/Tablet layout */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h3 className="font-semibold text-sm tracking-wide mb-3">
                  {s.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {s.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-gray-900">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500">
            © LjudButiken
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="block sm:hidden">
        <div className="mx-auto max-w-md px-4 py-6">
          {sections.map((s, idx) => (
            <div key={s.title} className="border-b border-gray-200">
              <button
                className="w-full flex items-center justify-between py-4 text-left"
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`section-${idx}`}
              >
                <span className="font-semibold text-sm">{s.title}</span>
                <span className="text-xl leading-none select-none">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              <div
                id={`section-${idx}`}
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  openIndex === idx ? "max-h-40" : "max-h-0"
                }`}
              >
                <ul className="pb-4 space-y-2 text-sm text-gray-600">
                  {s.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-gray-900">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="pt-6 text-center text-xs text-gray-500">
            © LjudButiken
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
