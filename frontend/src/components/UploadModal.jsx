import { useState, useRef } from "react";
import {
  MdOutlineFileUpload,
  MdClose,
  MdContentPaste,
  MdAutoAwesome,
  MdCheckCircle,
} from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createConversation } from "../services/api";

const SAMPLES = [
  {
    title: "Engineering Architecture & Auth Discussion",
    content: `Alex: Hey team, we need to decide on our authentication strategy for the new API.
Sarah: I propose using JWT with HTTP-only cookies to mitigate XSS risks.
Michael: Agreed. What about session expiration?
Alex: Let's set access tokens to 15 minutes and refresh tokens to 7 days with rotation.
Sarah: Sounds good. I will write the authentication middleware and endpoints by Thursday.
Michael: I will update the frontend auth context and axios interceptors by Friday.
Alex: Final decision: We use JWT in HTTP-only cookies with refresh token rotation. Let's make sure documentation is ready by Monday next week.`,
  },
  {
    title: "Product Sprint & Feature Prioritization",
    content: `John: Welcome everyone. Let's review the roadmap for Q4.
Priya: The top customer request is the AI conversation summary export feature.
David: We should also prioritize the PDF & TXT batch upload capability.
John: Let's commit to shipping AI Summaries in Sprint 1 and Batch Upload in Sprint 2.
Priya: I'll prepare the user stories and Figma specs by tomorrow EOD.
David: I will start benchmarking Gemini 2.5 Flash for the processing latency.
John: Decision reached: AI summary export is P0 for Sprint 1. David will share benchmark results by Wednesday.`,
  },
];

const UploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("paste"); // 'paste' | 'upload'
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file) return;
    setError("");

    if (
      !file.name.endsWith(".txt") &&
      file.type !== "text/plain" &&
      !file.name.endsWith(".log") &&
      !file.name.endsWith(".md")
    ) {
      setError("Please upload a text file (.txt, .md, .log)");
      return;
    }

    setFileName(file.name);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setContent(event.target.result || "");
    };
    reader.onerror = () => {
      setError("Failed to read file content.");
    };
    reader.readAsText(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Please enter or upload conversation content.");
      return;
    }

    setError("");
    setIsLoading(true);
    setLoadingStep(1);

    const stepTimer1 = setTimeout(() => setLoadingStep(2), 700);
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 1600);

    try {
      const result = await createConversation({
        title: title.trim(),
        content: content.trim(),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setLoadingStep(4);

      setTimeout(() => {
        setIsLoading(false);
        onSuccess(result.conversation);
        onClose();
        // Reset state
        setTitle("");
        setContent("");
        setFileName("");
        setLoadingStep(0);
      }, 500);
    } catch (err) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsLoading(false);
      setError(err.message || "Failed to analyze conversation.");
    }
  };

  const loadSample = (sample) => {
    setTitle(sample.title);
    setContent(sample.content);
    setFileName("");
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 via-white to-blue-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600 text-white rounded-xl shadow-md">
              <MdAutoAwesome size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                New Conversation
              </h2>
              <p className="text-xs text-gray-500">
                Upload .txt transcript or paste text for Gemini AI analysis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError("")}
                className="text-red-500 font-bold ml-2"
              >
                ✕
              </button>
            </div>
          )}

          {/* Mode Tabs */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setActiveTab("paste")}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === "paste"
                  ? "bg-white text-purple-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MdContentPaste size={18} />
              <span>Paste Text</span>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === "upload"
                  ? "bg-white text-purple-700 shadow-xs"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MdOutlineFileUpload size={18} />
              <span>Upload .TXT File</span>
            </button>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Conversation Title (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Q3 Roadmap Planning with Engineering"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition"
            />
          </div>

          {activeTab === "upload" && (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.log,text/plain"
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading}
              />
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-purple-600 bg-purple-50/60 scale-[0.99]"
                    : fileName
                      ? "border-green-400 bg-green-50/30"
                      : "border-gray-200 hover:border-purple-400 bg-gray-50/50 hover:bg-purple-50/20"
                }`}
              >
                <div className="mx-auto w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2">
                  <MdOutlineFileUpload size={26} />
                </div>
                {fileName ? (
                  <div>
                    <p className="text-sm font-semibold text-green-700">
                      {fileName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      File loaded ({content.length} characters). Click to choose
                      another file.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Click to browse or drag and drop a .txt transcript file
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: .txt, .md, .log
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Conversation Transcript / Content{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400">Try sample:</span>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => loadSample(SAMPLES[0])}
                  className="text-xs text-purple-600 hover:text-purple-800 font-medium px-2 py-0.5 rounded bg-purple-50 hover:bg-purple-100 transition cursor-pointer"
                >
                  Tech
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => loadSample(SAMPLES[1])}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
                >
                  Product
                </button>
              </div>
            </div>
            <textarea
              rows={7}
              placeholder="Paste meeting dialogue, chat logs, customer calls, or discussion notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 text-sm font-mono rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition resize-y"
            />
          </div>

          {/* Loading Animation Steps */}
          {isLoading && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 space-y-2.5 animate-pulse">
              <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm">
                <AiOutlineLoading3Quarters className="animate-spin" size={18} />
                <span>AI Processing Pipeline in progress...</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div
                  className={`p-2 rounded-lg transition ${loadingStep >= 1 ? "bg-purple-200 text-purple-900 font-medium" : "bg-white/60 text-gray-400"}`}
                >
                  1. Save Record
                </div>
                <div
                  className={`p-2 rounded-lg transition ${loadingStep >= 2 ? "bg-purple-200 text-purple-900 font-medium" : "bg-white/60 text-gray-400"}`}
                >
                  2. Gemini Analysis
                </div>
                <div
                  className={`p-2 rounded-lg transition ${loadingStep >= 3 ? "bg-purple-200 text-purple-900 font-medium" : "bg-white/60 text-gray-400"}`}
                >
                  3. Extract Insights
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Powered by Google Gemini 2.5 Flash
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-xl hover:bg-gray-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !content.trim()}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white shadow-md transition cursor-pointer ${
                isLoading || !content.trim()
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 active:scale-98 shadow-purple-200"
              }`}
            >
              {isLoading ? (
                <>
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={16}
                  />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <MdAutoAwesome size={16} />
                  <span>Analyze & Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
