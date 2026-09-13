import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdAutoAwesome,
  MdArrowForward,
  MdCheckCircle,
  MdOutlineLightbulb,
  MdOutlineForum,
  MdOutlineSecurity,
  MdExpandMore,
  MdMenu,
  MdClose,
  MdOutlineSpeed,
} from "react-icons/md";
import { IoCheckbox, IoSparkles } from "react-icons/io5";
import { TbDatabaseFilled, TbArrowUpRight } from "react-icons/tb";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: <IoCheckbox className="text-purple-600 text-2xl" />,
      title: "Smart Action Items",
      description:
        "Automatically extract tasks, assignees, deadlines, and priorities from transcripts without lifting a finger.",
      badge: "Automation",
      link: "/tasks",
    },
    {
      icon: <MdOutlineLightbulb className="text-amber-500 text-2xl" />,
      title: "Decision Ledger",
      description:
        "Capture pivotal architectural, strategic, and product decisions with reasoning so context is never lost.",
      badge: "Governance",
      link: "/decisions",
    },
    {
      icon: <TbDatabaseFilled className="text-blue-500 text-2xl" />,
      title: "Project Memory",
      description:
        "AI connects related discussions over weeks and months, building an intelligent organizational knowledge graph.",
      badge: "Knowledge Base",
      link: "/project-memory",
    },
    {
      icon: <MdOutlineForum className="text-emerald-500 text-2xl" />,
      title: "Meeting Intelligence",
      description:
        "Get comprehensive conversation summaries, sentiment analysis, and topic tagging in seconds.",
      badge: "Analytics",
      link: "/conversations",
    },
    {
      icon: <MdOutlineSecurity className="text-indigo-500 text-2xl" />,
      title: "Privacy & Data Security",
      description:
        "Enterprise-grade data handling ensuring your private team discussions and proprietary IP stay protected.",
      badge: "Security",
      link: "/dashboard",
    },
    {
      icon: <MdOutlineSpeed className="text-rose-500 text-2xl" />,
      title: "Instant Search & Recall",
      description:
        "Query past meetings like a database. Find exactly who agreed to what and when in under a second.",
      badge: "Efficiency",
      link: "/dashboard",
    },
  ];

  const faqs = [
    {
      q: "How does ConvoLedger turn raw discussions into structured ledger data?",
      a: "ConvoLedger leverages fine-tuned AI models that parse raw audio recordings, meeting transcripts, and text notes. It automatically identifies action items, assignees, consensus points, and architectural decisions, categorizing them into an indexed knowledge base.",
    },
    {
      q: "What types of input formats are supported?",
      a: "You can upload raw text transcripts, meeting chat logs, markdown notes, audio transcripts from Zoom, Google Meet, Microsoft Teams, or paste conversation transcripts directly into the ledger.",
    },
    {
      q: "How does Project Memory connect different meetings?",
      a: "Project Memory analyzes semantic tags and key topics across all your team's historical conversations. When a topic is revisited weeks later, ConvoLedger links the historical context and previous decisions directly to the new session.",
    },
    {
      q: "Can I manage action items and track their progress?",
      a: "Yes! ConvoLedger includes a built-in interactive Task and Action Item tracker with status updates (Pending, In Progress, Completed), assignees, and direct links to the original conversation source.",
    },
    {
      q: "Is my team's conversation data kept confidential and secure?",
      a: "Absolutely. We treat your conversational records with top-tier security standards, strictly isolating workspace records and ensuring your intellectual property remains private.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900 font-sans antialiased selection:bg-purple-200 selection:text-purple-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#faf9f6]/90 backdrop-blur-md border-b border-gray-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="ConvoLedger Logo"
              className="h-10 w-10 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-extrabold text-2xl tracking-tight bg-linear-to-r from-purple-700 via-indigo-700 to-purple-900 bg-clip-text text-transparent">
              ConvoLedger
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-600">
            <a
              href="#features"
              className="hover:text-purple-700 transition-colors"
            >
              Features
            </a>
            <a
              href="#why-convoledger"
              className="hover:text-purple-700 transition-colors"
            >
              Why ConvoLedger
            </a>
            <a
              href="#use-cases"
              className="hover:text-purple-700 transition-colors"
            >
              Use Cases
            </a>
            <a href="#faq" className="hover:text-purple-700 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-700 hover:text-purple-700 px-4 py-2 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-purple-700 hover:bg-purple-800 shadow-md shadow-purple-700/20 active:scale-95 transition-all"
            >
              <span>Get Started</span>
              <MdArrowForward size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-200/60 transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 bg-white/95 backdrop-blur-md px-6 py-5 space-y-4 shadow-lg animate-fade-in">
            <nav className="flex flex-col gap-3 text-base font-medium text-gray-700">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-purple-700"
              >
                Features
              </a>
              <a
                href="#why-convoledger"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-purple-700"
              >
                Why ConvoLedger
              </a>
              <a
                href="#use-cases"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-purple-700"
              >
                Use Cases
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-purple-700"
              >
                FAQ
              </a>
            </nav>
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-800 hover:bg-gray-50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-purple-700 text-white font-semibold shadow-md hover:bg-purple-800"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-purple-300/30 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 border border-purple-200/80 text-purple-800 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
                <IoSparkles className="text-purple-600 text-sm" />
                <span>AI-Powered Conversation Intelligence</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.12]">
                Supercharge{" "}
                <span className="text-gray-600 font-normal">
                  Team Knowledge
                </span>{" "}
                with the power of <span className="text-purple-700">AI</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Transform unorganized meeting transcripts, standup discussions,
                and chat logs into structured action items, verified decisions,
                and long-term searchable project memory.
              </p>

              {/* CTA Button Group */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-semibold text-base shadow-lg shadow-purple-700/25 active:scale-98 transition-all cursor-pointer"
                >
                  <MdAutoAwesome className="text-lg" />
                  <span>Explore Dashboard</span>
                </Link>
              </div>

              {/* Small metric proof */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <MdCheckCircle className="text-emerald-500 text-base" /> No
                  credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <MdCheckCircle className="text-emerald-500 text-base" />{" "}
                  Instant AI extraction
                </span>
              </div>
            </div>

            {/* Right Hero Interactive Preview Mock */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
                {/* Visual Glass Container */}
                <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-2xl shadow-purple-900/10 space-y-5 relative overflow-hidden">
                  {/* Top Bar inside mockup */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-semibold text-gray-400 pl-2">
                        Sprint 34 Architecture Review.mp3
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                      Processed by AI
                    </span>
                  </div>

                  {/* Summary Snippet */}
                  <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
                        <MdAutoAwesome className="text-purple-600" /> Executive
                        Summary
                      </span>
                      <span className="text-[11px] font-semibold text-purple-600 bg-white px-2 py-0.5 rounded-md shadow-2xs">
                        98% Confidence
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                      The team finalized the migration to GraphQL and decided to
                      deploy PostgreSQL read-replicas before the upcoming v2.4
                      launch.
                    </p>
                  </div>

                  {/* Extracted Tasks & Decisions Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Action Items Mini Card */}
                    <div className="bg-gray-50/90 rounded-2xl p-3.5 border border-gray-200/70 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          <IoCheckbox className="text-purple-600" /> Action
                          Items
                        </span>
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">
                          3 Extracted
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="p-2 bg-white rounded-xl border border-gray-200/80 flex items-center justify-between">
                          <span className="text-gray-800 font-medium truncate">
                            Configure PG Read Replicas
                          </span>
                          <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded ml-2">
                            High
                          </span>
                        </div>
                        <div className="p-2 bg-white rounded-xl border border-gray-200/80 flex items-center justify-between">
                          <span className="text-gray-800 font-medium truncate">
                            Draft GraphQL Schema
                          </span>
                          <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded ml-2">
                            Medium
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decisions Mini Card */}
                    <div className="bg-gray-50/90 rounded-2xl p-3.5 border border-gray-200/70 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          <MdOutlineLightbulb className="text-amber-500" />{" "}
                          Decisions
                        </span>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          2 Logged
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="p-2 bg-white rounded-xl border border-gray-200/80">
                          <p className="text-gray-800 font-medium line-clamp-1">
                            Adopt GraphQL for Client Gateway
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            Agreed by: Akhil, Sarah
                          </p>
                        </div>
                        <div className="p-2 bg-white rounded-xl border border-gray-200/80">
                          <p className="text-gray-800 font-medium line-clamp-1">
                            Postpone ElasticSearch cluster
                          </p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            Agreed by: Engineering
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Topics Badge Row */}
                  <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-none text-xs">
                    <span className="text-gray-400 font-medium text-[11px] shrink-0">
                      Project Memory Tags:
                    </span>
                    <span className="bg-purple-100/70 text-purple-700 px-2.5 py-1 rounded-lg font-medium text-[11px] shrink-0">
                      #Database
                    </span>
                    <span className="bg-blue-100/70 text-blue-700 px-2.5 py-1 rounded-lg font-medium text-[11px] shrink-0">
                      #GraphQL
                    </span>
                    <span className="bg-emerald-100/70 text-emerald-700 px-2.5 py-1 rounded-lg font-medium text-[11px] shrink-0">
                      #Sprint34
                    </span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xl items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      100% Traceability
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Every task linked to speech context
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section
        id="features"
        className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-purple-700 font-bold text-xs sm:text-sm uppercase tracking-widest bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Intelligent Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            AI features made for modern team conversations
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Say goodbye to forgotten action items and lost decisions.
            ConvoLedger captures every critical insight automatically.
          </p>
        </div>

        {/* Features 3-Column / 2-Row Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-100 transition-transform duration-200">
                    {f.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6">
                <Link
                  to={f.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:text-purple-900 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore feature</span>
                  <TbArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why ConvoLedger Section */}
      <section
        id="why-convoledger"
        className="py-16 md:py-24 bg-white border-y border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Title */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-purple-700 font-bold text-xs sm:text-sm uppercase tracking-widest bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
                The ConvoLedger Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Why ConvoLedger for your team's workflow
              </h2>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Traditional meeting notes are scattered across Google Docs,
                Slack channels, and email threads. ConvoLedger builds a
                centralized knowledge ledger you can query anytime.
              </p>
              <div className="pt-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-700 text-white font-semibold hover:bg-purple-800 transition shadow-md"
                >
                  <span>Try It Out Now</span>
                  <MdArrowForward size={16} />
                </Link>
              </div>
            </div>

            {/* Right Value Points */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  title: "Never lose a critical decision again",
                  desc: "Architecture compromises, product pivot decisions, and sprint agreements are indexed with timestamps and context.",
                },
                {
                  title: "Zero manual note-taking burden",
                  desc: "Let your team focus 100% on the conversation. ConvoLedger's AI handles transcription, extraction, and synthesis.",
                },
                {
                  title:
                    "Search across months of project memory in milliseconds",
                  desc: "Ask questions like 'What did we decide about the payment gateway back in June?' and get instant cited answers.",
                },
                {
                  title: "Automated task assignment and follow-through",
                  desc: "Action items are instantly categorized and assigned to owners with clear deliverables and due dates.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-[#faf9f6] border border-gray-200/80 hover:border-purple-300 transition-all flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial & Social Proof Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/60 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="flex justify-center text-purple-700">
              <FaQuoteLeft size={44} className="opacity-80" />
            </div>

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              “ConvoLedger is the single source of truth for our engineering &
              product team. No more forgotten action items, lost context, or
              endless alignment meetings.”
            </blockquote>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                AS
              </div>
              <div className="text-center sm:text-left">
                <div className="font-bold text-gray-900 text-base">
                  Akhil Sai
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Engineering Lead & Product Architect
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-gray-200 mx-2" />

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={16} />
                ))}
                <span className="ml-1.5 text-xs font-bold text-gray-700">
                  5.0 RATED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        id="use-cases"
        className="py-16 md:py-24 bg-[#f3f0e8] border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-purple-800 font-bold text-xs sm:text-sm uppercase tracking-widest bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
              Practical Applications
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Built for every conversation format
            </h2>
            <p className="text-gray-600 text-base">
              Whether you are syncing daily with engineers or running user
              research, ConvoLedger adapts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xl">
                  🚀
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Sprint Planning & Standups
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Capture sprint commitments, unblockers, and assign tickets
                  without stopping the discussion.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-purple-700">
                <span>Auto-sync Tasks</span>
                <MdArrowForward size={16} />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xl">
                  🏛️
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Architecture Decision Records
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Automatically log why technologies, libraries, and design
                  patterns were chosen or rejected.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-purple-700">
                <span>View Decision Log</span>
                <MdArrowForward size={16} />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col justify-between hover:shadow-lg transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl">
                  💡
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Product Discovery & Client Calls
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Extract customer feature requests, pain points, and quote
                  snippets directly into project memory.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-purple-700">
                <span>Explore Memory Graph</span>
                <MdArrowForward size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section
        id="faq"
        className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-14 space-y-3">
          <span className="text-purple-700 font-bold text-xs sm:text-sm uppercase tracking-widest bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all duration-200 shadow-2xs"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 text-left font-bold text-gray-900 text-base sm:text-lg flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition"
              >
                <span>{faq.q}</span>
                <MdExpandMore
                  size={24}
                  className={`text-purple-700 shrink-0 transition-transform duration-200 ${
                    activeFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Footer Call to Action Banner (Jasper Purple Gradient style) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-linear-to-r from-purple-700 via-purple-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Background circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Get started with ConvoLedger today
            </h2>
            <p className="text-purple-100 text-base sm:text-lg font-normal">
              Experience automated action items, decision tracking, and project
              memory in action.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-purple-900 font-bold text-base hover:bg-purple-50 shadow-lg active:scale-95 transition-all text-center"
            >
              Launch Dashboard Free
            </Link>
          </div>
        </div>
      </section>

      {/* Dark Footer (Jasper style) */}
      <footer className="bg-black text-gray-400 pt-16 pb-12 border-t border-gray-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-gray-800">
            {/* Column 1: Brand & Logo */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="ConvoLedger"
                  className="h-10 w-10 rounded-xl"
                />
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  ConvoLedger
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
                The conversation intelligence ledger for modern agile,
                engineering, and product teams. Automated transcript extraction
                and long-term project memory.
              </p>
              <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} ConvoLedger Inc. All rights
                reserved.
              </div>
            </div>

            {/* Column 2: Product */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200">
                Features
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/tasks" className="hover:text-white transition">
                    Action Items
                  </Link>
                </li>
                <li>
                  <Link to="/decisions" className="hover:text-white transition">
                    Decision Ledger
                  </Link>
                </li>
                <li>
                  <Link
                    to="/project-memory"
                    className="hover:text-white transition"
                  >
                    Project Memory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/conversations"
                    className="hover:text-white transition"
                  >
                    Conversations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200">
                Solutions
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <span className="text-gray-400">Engineering Teams</span>
                </li>
                <li>
                  <span className="text-gray-400">Product Management</span>
                </li>
                <li>
                  <span className="text-gray-400">Remote & Hybrid</span>
                </li>
                <li>
                  <span className="text-gray-400">Agile Sprints</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200">
                Application
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/dashboard" className="hover:text-white transition">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/conversations"
                    className="hover:text-white transition"
                  >
                    New Upload
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-300">
                Security
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
