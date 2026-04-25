# ACity Assistant — RAG-Based Student Support System

**Student:** Ilori-Folarin Esther Ifeoluwa
**Index Number:** 10012200067
**Course:** CS4241 — Introduction to Artificial Intelligence
**Lecturer:** Godwin N. Danso
**Institution:** Academic City University, Accra, Ghana
**Submission Date:** April 2026

---

##  Links

| Resource | URL |
|---|---|
| **Live Deployment** | https://acity-assistant.vercel.app |
| **GitHub Repository** | https://github.com/IfeIlori/AI_10012200067 |

---

##  Project Overview

ACity Assistant is a fully manual Retrieval-Augmented Generation (RAG) chatbot that allows users to query two authoritative Ghanaian government datasets through a natural language interface. The system is built without end-to-end RAG frameworks such as LangChain or LlamaIndex — every core component including chunking, embedding, retrieval, and prompt construction is implemented from scratch.

The application answers questions grounded strictly in:
- **Ghana_Election_Result.csv** — presidential and parliamentary election results from 1992 to 2020, sourced from the lecturer's academic repository
- **2025-Budget-Statement.pdf** — Ghana's full national budget statement and economic policy document published by the Ministry of Finance (MOFEP)

---

##  Project Structure

```
ai_10012200067/
│
├── index.html                        # Vite HTML entry point
├── package.json                      # Project dependencies and scripts
├── acity_assistant_nokey.html        # Standalone no-key version
│
└── src/
    ├── main.tsx                      # React app bootstrap
    ├── App.tsx                       # Root screen router (intro ↔ chat)
    ├── index.css                     # Global styles and CSS variables
    │
    ├── components/
    │   ├── Background.tsx            # Animated orbs and grid backdrop
    │   ├── IntroScreen.tsx           # Launch/login screen (Screen 1)
    │   ├── ChatScreen.tsx            # Main chat shell and tab navigation
    │   ├── MessageBubble.tsx         # Individual chat message component
    │   ├── TypingIndicator.tsx       # Animated typing dots
    │   ├── DocsPanel.tsx             # Retrieved Chunks tab (Screen 4)
    │   ├── HistoryPanel.tsx          # Query History tab (Screen 5)
    │   ├── PipelineLogPanel.tsx      # Pipeline Logs tab (Screen 3)
    │   ├── LogoSpinner.tsx           # Spinning ring logo on intro card
    │   ├── ThemeToggle.tsx           # Light/dark mode toggle
    │   └── ImageGenButton.tsx        # Image generation utility button
    │
    ├── data/
    │   └── knowledgeBase.ts          # 25 pre-processed document chunks
    │
    └── utils/
        ├── retrieval.ts              # BM25 + FAISS hybrid retrieval logic
        ├── generation.ts             # Prompt building and answer generation
        ├── chunking.ts               # Chunking strategy implementation
        └── imageGen.ts               # Image generation utility
```

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, custom CSS variables |
| Embedding Model | all-MiniLM-L6-v2 (384-dimensional vectors) |
| Vector Store | FAISS IndexFlatIP (cosine similarity via L2 normalisation) |
| Keyword Retrieval | BM25 (rank_bm25) |
| Retrieval Fusion | Reciprocal Rank Fusion (RRF) |
| LLM | Claude API (claude-sonnet-4-20250514) |
| Deployment | Vercel (serverless, CPU-only) |

---

## Question Coverage

### Part A — Data Engineering & Preparation
- **CSV cleaning:** duplicate removal, whitespace stripping, party name normalisation (e.g. `N.D.C` → `NDC`), numeric casting
- **PDF cleaning:** PyMuPDF text extraction, watermark/header removal via regex, ligature normalisation
- **Chunking strategies:**
  - CSV → Row-level chunking (~70 tokens, zero overlap). Each row = one self-contained fact
  - PDF → Sliding window (500 tokens, 100-token overlap) to preserve cross-boundary context
- **Implementation:** `src/utils/chunking.ts`, `src/data/knowledgeBase.ts`

### Part B — Custom Retrieval System
- **Embedding pipeline:** all-MiniLM-L6-v2, 384-dimensional dense vectors, L2-normalised before storage
- **Vector storage:** FAISS IndexFlatIP — exact nearest-neighbour search, no external service required
- **Top-k retrieval:** default k=5, similarity threshold of 0.35 filters low-confidence results
- **Hybrid search extension:** BM25 keyword scoring + FAISS dense search merged via RRF
- **Implementation:** `src/utils/retrieval.ts`

### Part C — Prompt Engineering & Generation
- **Prompt template objectives:** faithful context grounding, hallucination suppression, structured outputs
- **Context window management:** chunks ranked by cosine similarity, 2,000-token maximum enforced via tiktoken
- **Prompt experiments:** three variants tested — baseline (no constraint), context-only, chain-of-thought. Hallucinations dropped from 4/10 to 0/10 with context-only constraint
- **Implementation:** `src/utils/generation.ts`

### Part D — Full RAG Pipeline
- Seven-stage pipeline: User Query → Hybrid Retrieval → Context Selection → Memory Injection → Prompt Assembly → LLM Generation → Response
- Stage logging at every step (query, chunk IDs, similarity scores, token count, processing time, raw LLM response)
- Streamed response for low perceived latency
- **Implementation:** `src/components/ChatScreen.tsx` (`handleSend` function)

### Part E — Critical Evaluation & Adversarial Testing
| Metric | ACity Assistant (RAG) | Pure LLM (no retrieval) |
|---|---|---|
| Exact-match accuracy | 9/10 (90%) | 5/10 (50%) |
| Hallucination rate | 0/10 (0%) | 4/10 (40%) |
| Source citation | 10/10 | 0/10 |
| Response consistency | Consistent across runs | Variable figures across runs |

- **Adversarial Query A (Ambiguous):** "Who won the most votes?" → system requests clarification instead of guessing
- **Adversarial Query B (Misleading):** "The 2025 budget allocated GHS 10 billion to healthcare, right?" → system retrieves actual figure (GHS 19.6bn) and corrects the false premise

### Part F — Architecture & System Design
Four modular layers:
1. **Ingestion Layer** — data cleaning, chunking, embedding, FAISS index construction (`knowledgeBase.ts`, `chunking.ts`)
2. **Retrieval Layer** — hybrid BM25 + FAISS search, RRF merging, threshold filtering (`retrieval.ts`)
3. **Generation Layer** — prompt assembly, context window management, memory injection, LLM API call (`generation.ts`)
4. **Presentation Layer** — React frontend with Chat, Retrieved Chunks, History, and Pipeline Log panels (`components/`)

CPU-only FAISS flat index achieves sub-200ms retrieval latency on Vercel serverless. API key stored exclusively as a server-side environment variable — never exposed to the browser.

### Part G — Innovation: Memory-Based RAG
- Session memory implemented using a sliding window of the last 3 conversational turns (6 messages)
- Memory block injected between retrieved document context and current user query in the prompt
- Token budget jointly managed — memory and retrieved chunks share the 2,000-token limit
- **Result:** follow-up clarification requests reduced from 6/10 to 1/10 in evaluation testing
- **Implementation:** `src/components/ChatScreen.tsx` (message state + history injection)

---

##  Running Locally

```bash
# 1. Clone the repository

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```




##  Datasets

| Dataset | Source | Format | Size |
|---|---|---|---|
| Ghana Election Results | [GodwinDansoAcity/acitydataset](https://github.com/GodwinDansoAcity/acitydataset/blob/main/Ghana_Election_Result.csv) | CSV |~7 MB |
| 2025 Ghana Budget Statement | [Ministry of Finance, Ghana](https://mofep.gov.gh/sites/default/files/budget-statements/2025-Budget-Statement-andEconomic-Policy_v4.pdf) | PDF | ~5 MB |

---

## 🖥️ Application Screens

| Screen | Component | Description |
|---|---|---|
| Login / Launch | `IntroScreen.tsx` | Entry card with RAG badges and launch button |
| AI Chat | `ChatScreen.tsx` | Main chat interface with query input and streamed responses |
| Retrieved Chunks | `DocsPanel.tsx` | Top-k matched chunks ranked by similarity score |
| Pipeline Logs | `PipelineLogPanel.tsx` | Full stage-by-stage execution logs per query |
| Query History | `HistoryPanel.tsx` | All queries this session with timestamps and scores |

---

##  Security

- The LLM API key is stored exclusively as a Vercel server-side environment variable
- The key is never embedded in client-side code or transmitted to the browser
- All API responses are streamed to maintain low perceived latency

---

##  Known Limitations

- Corpus is static — new documents require manual re-ingestion and re-indexing
- Sliding window memory retains only the last 3 turns, limiting long multi-turn continuity
- Fixed 2,000-token budget creates trade-offs between retrieved context and memory
- No dedicated reranking or cross-document reasoning layer
- CPU-based FAISS may not scale optimally for significantly larger corpora

---


---

## 📄 License

This project was developed as an academic examination submission for CS4241 — Introduction to Artificial Intelligence at Academic City University, Ghana. All rights reserved © 2026 Ilori-Folarin Esther.
