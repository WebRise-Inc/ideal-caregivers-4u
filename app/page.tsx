import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Bed,
  Brain,
  Clock,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
  Star,
  Utensils,
} from "lucide-react";
import { LeadForm } from "./components/LeadForm";

const phoneDisplay = "613-769-1669";
const phoneHref = "tel:6137691669";
const emailHref = "mailto:info@idealcaregivers4u.com?subject=Ottawa Care Assessment";
const whatsappHref = "https://wa.me/6137691669";

const proofPoints = [
  {
    icon: BadgeCheck,
    label: "Trusted since 1998",
    detail: "Ottawa-owned senior care agency",
  },
  {
    icon: Brain,
    label: "Dementia specialists",
    detail: "Certified, trained caregivers",
  },
  {
    icon: Clock,
    label: "24/7 support",
    detail: "Day, overnight, and emergency care",
  },
  {
    icon: ShieldCheck,
    label: "Veterans Affairs accredited",
    detail: "Direct billing available",
  },
];

const services = [
  {
    icon: Brain,
    title: "Dementia and Alzheimer's support",
    text: "Calm routines, memory support, supervision, and companionship from trained caregivers.",
  },
  {
    icon: HeartHandshake,
    title: "Personal care",
    text: "Help with bathing, dressing, hygiene, mobility, and daily routines with dignity.",
  },
  {
    icon: Bed,
    title: "24-hour care",
    text: "Continuous support when your loved one should not be left alone at home.",
  },
  {
    icon: Moon,
    title: "Awake overnight care",
    text: "An alert caregiver stays awake overnight for safety, bathroom help, and reassurance.",
  },
  {
    icon: Utensils,
    title: "Meals and reminders",
    text: "Meal preparation, medication reminders, light household support, and daily check-ins.",
  },
  {
    icon: Home,
    title: "Palliative support",
    text: "Comfort-focused help at home for families who need presence, dignity, and relief.",
  },
];

const steps = [
  "Share your situation through the form or by phone.",
  "A care coordinator reviews urgency, schedule, and care needs.",
  "Ideal Caregivers matches your loved one with a suitable caregiver.",
  "Your plan is adjusted as care needs change.",
];

const testimonials = [
  {
    quote:
      "The staff were wonderful. They were so kind and helpful and were able to put in place assisted feeding starting the next day.",
    name: "Christine and Karl Tibelius",
  },
  {
    quote:
      "Knowing that Dad was not alone when family could not be with him gave us great comfort and peace of mind.",
    name: "Laurie McClelland",
  },
  {
    quote:
      "The caregiver who Nancy and Lisa suggested would be a good fit for us was indeed just the right person.",
    name: "Gwynneth Weese",
  },
];

const faqs = [
  {
    question: "How quickly can care start?",
    answer:
      "Same-week appointments are available, and urgent situations can be discussed directly with the care team by phone.",
  },
  {
    question: "Do you provide dementia care?",
    answer:
      "Yes. Ideal Caregivers 4u specializes in Alzheimer's and dementia care, with certified and trained caregivers.",
  },
  {
    question: "Can Veterans Affairs be billed directly?",
    answer:
      "Yes. The agency is Veterans Affairs accredited and can bill directly for eligible care.",
  },
  {
    question: "Do you offer overnight and 24-hour care?",
    answer:
      "Yes. Families can request awake overnight care, 24-hour support, emergency help, or longer-term care.",
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header" aria-label="Ideal Caregivers 4u">
        <a className="brand" href="#top" aria-label="Ideal Caregivers 4u home">
          <Image
            className="brand-logo"
            src="/brand/logo-full.png"
            alt="Ideal Caregivers 4u"
            width={505}
            height={178}
            priority
          />
        </a>
        <div className="header-actions">
          <a className="ghost-button" href={emailHref}>
            Email Us
          </a>
          <a className="call-button" href={phoneHref}>
            {phoneDisplay}
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--light">
              Respect. Integrity. Compassion.
            </p>
            <h1>Friendly senior care at home in Ottawa</h1>
            <p className="hero-lede">
              Talk with a local care coordinator and find the right support for
              dementia care, overnight help, personal care, or companionship.
            </p>
            <p className="hero-trust">
              Serving Ottawa since 1998. 24/7 care available. Veterans Affairs
              direct billing.
            </p>
            <div className="hero-actions">
              <a className="primary-button hero-primary" href="#assessment">
                Book Free Assessment
              </a>
              <a className="secondary-button hero-secondary" href={whatsappHref}>
                WhatsApp Care Team
              </a>
            </div>
          </div>

          <LeadForm />
        </div>
      </section>

      <section className="proof-strip" aria-label="Trust indicators">
        <div className="container proof-grid">
          {proofPoints.map(({ icon: Icon, label, detail }) => (
            <div className="proof-item" key={label}>
              <Icon aria-hidden="true" size={23} />
              <div>
                <strong>{label}</strong>
                <span>{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--split">
        <div className="container split-grid">
          <div>
            <p className="eyebrow">Why families call</p>
            <h2>Start with clarity when care needs change.</h2>
          </div>
          <div className="narrative">
            <p>
              A parent starts forgetting meals. A spouse needs help overnight.
              A hospital discharge is coming faster than expected. The right
              home care plan gives your family a clear next step without moving
              your loved one out of the home they know.
            </p>
            <a className="text-link" href="#assessment">
              Get a care plan started <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="services">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Home care services</p>
            <h2 id="services">What we can help with.</h2>
            <p>
              Start with the support your family needs now. Your care plan can
              change as routines, health, or safety needs change.
            </p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, text }) => (
              <article className="service-card" key={title}>
                <Icon aria-hidden="true" size={25} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container steps-grid">
          <div className="media-panel">
            <Image
              src="/brand/overnight.jpg"
              alt="Caregiver supporting a smiling senior at home"
              fill
              loading="eager"
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
          <div>
            <p className="eyebrow">Simple intake</p>
            <h2>A clear path from first call to first visit.</h2>
            <ol className="step-list">
              {steps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--founder">
        <div className="container founder-grid">
          <div className="founder-image">
            <Image
              src="/brand/nancy.png"
              alt="Nancy Dahdah, founder and CEO of Ideal Caregivers 4u"
              width={590}
              height={624}
              loading="eager"
            />
          </div>
          <div>
            <p className="eyebrow">Meet Nancy</p>
            <h2>Founder-led care, matched with intention.</h2>
            <p>
              Nancy Dahdah founded Ideal Caregivers 4u as a caregiver herself.
              Her team focuses on one-on-one matching, dependable support, and
              clear guidance for families navigating dementia care,
              companionship, and in-home assistance.
            </p>
            <div className="founder-actions">
              <a className="primary-button" href={phoneHref}>
                <Phone aria-hidden="true" size={18} />
                Call Nancy's Team
              </a>
              <a className="text-link" href="#assessment">
                Request a callback <ArrowRight aria-hidden="true" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="reviews">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">What clients say</p>
            <h2 id="reviews">Families remember care that feels personal.</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <figure className="testimonial-card" key={testimonial.name}>
                <div aria-hidden="true" className="stars">
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                  <Star size={15} />
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>{testimonial.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--faq">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">Questions</p>
            <h2>Common care concerns, answered clearly.</h2>
            <p>
              Prefer to talk it through? Call the Ottawa care team directly.
            </p>
            <a className="callout-phone" href={phoneHref}>
              <Phone aria-hidden="true" size={20} />
              {phoneDisplay}
            </a>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <p className="eyebrow eyebrow--light">Ottawa, Ontario</p>
            <h2>Get trusted care in place before the next hard day.</h2>
            <p>
              Book a free assessment and talk with a care coordinator about the
              safest next step for your loved one.
            </p>
          </div>
          <a className="primary-button primary-button--light" href="#assessment">
            Book Free Care Assessment
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <a className="brand" href="#top" aria-label="Ideal Caregivers 4u home">
            <Image
              className="brand-logo brand-logo--footer"
              src="/brand/logo-full.png"
              alt="Ideal Caregivers 4u"
              width={505}
              height={178}
            />
          </a>
          <div className="footer-links">
            <a href={phoneHref}>
              <Phone aria-hidden="true" size={16} />
              {phoneDisplay}
            </a>
            <a href={emailHref}>
              <Mail aria-hidden="true" size={16} />
              Email Us
            </a>
            <span>
              <MapPin aria-hidden="true" size={16} />
              Ottawa, ON
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
