import { useEffect } from "react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { Compass, Map, Route, Bookmark, Check } from "lucide-react"
import { DemoProvider, useDemo } from "./store"
import Home from "./Home"
import {
  Family,
  Analysis,
  Explore,
  Detail,
  Plan,
  Report,
  AppModals,
} from "./Pages"
import { places } from "./data/places"
function Shell() {
  const { route, go, startFamily, saved, message } = useDemo()
  const page = route.split("/")[0].split("?")[0]
  useEffect(() => {
    document.title =
      page === "home"
        ? "보듬길 — 함께라서 좋은 여행"
        : ({
            family: "함께 가는 사람",
            analysis: "여행 조건 확인",
            explore: "전주 탐색",
            saved: "저장한 장소",
            plan: "우리 가족의 여행",
            place: "장소 둘러보기",
            report: "다녀온 정보",
            shared: "함께 보는 여행 일정",
          }[page] || "보듬길") + " · 보듬길"
  }, [page])
  useEffect(() => {
    const ctx = (document as Document & {
      modelContext?: {
        registerTool: (
          tool: unknown,
          options: { signal: AbortSignal },
        ) => Promise<void> | void
      }
    }).modelContext
    if (!ctx) return
    const lifecycle = new AbortController()
    try {
      Promise.resolve(
        ctx.registerTool(
          {
            name: "list_demo_places",
            description:
              "Read demo travel places with sample accessibility labels. Does not verify real-world accessibility.",
            inputSchema: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                  enum: ["전체", "관광", "맛집", "카페", "체험"],
                },
              },
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true },
            execute: (input: unknown) => {
              const x = input as { category?: string }
              if (
                !x ||
                typeof x !== "object" ||
                Object.keys(x).some((k) => k !== "category") ||
                (x.category !== undefined &&
                  !["전체", "관광", "맛집", "카페", "체험"].includes(
                    x.category,
                  ))
              )
                throw new Error("Invalid category")
              return places
                .filter(
                  (p) =>
                    !x.category ||
                    x.category === "전체" ||
                    p.category === x.category,
                )
                .map((p) => ({
                  id: p.id,
                  name: p.name,
                  category: p.category,
                  status: p.status,
                  dataType: "demo",
                }))
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {})
    } catch {}
    return () => lifecycle.abort()
  }, [])
  let content
  switch (page) {
    case "home":
      content = <Home />
      break
    case "family":
      content = <Family />
      break
    case "analysis":
      content = <Analysis />
      break
    case "explore":
      content = <Explore />
      break
    case "saved":
      content = <Explore savedOnly />
      break
    case "place":
      content = <Detail key={route} id={route.split("/")[1]} />
      break
    case "plan":
      content = <Plan />
      break
    case "shared":
      content = <Plan shared />
      break
    case "report":
      content = <Report id={route.split("/")[1]} />
      break
    default:
      content = <Home />
  }
  const active = ["family", "analysis"].includes(page)
    ? "home"
    : page === "place"
      ? "explore"
      : page === "shared"
        ? "plan"
        : page
  return (
    <MotionConfig reducedMotion="user">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector("main")?.focus()
        }}
      >
        본문으로 건너뛰기
      </a>
      <header className="app-header">
        <div className="header-inner">
          <a className="brand" href="#home">
            <img src="/favicon.svg" alt="" />
            보듬길<span>함께 가는 모든 길</span>
          </a>
          <nav aria-label="주 메뉴">
            {[
              { id: "home", text: "홈", Icon: Compass },
              { id: "explore", text: "탐색", Icon: Map },
              { id: "plan", text: "내 여행", Icon: Route },
              { id: "saved", text: "저장됨", Icon: Bookmark },
            ].map(({ id, text, Icon }) => (
              <button
                key={id}
                className={active === id ? "active" : ""}
                aria-current={active === id ? "page" : undefined}
                onClick={() => go(id)}
              >
                <Icon size={17} />
                {text}
                {id === "saved" && saved.length > 0 && (
                  <span className="nav-count">{saved.length}</span>
                )}
              </button>
            ))}
          </nav>
          <button
            className="profile"
            aria-label="가족 프로필 설정"
            onClick={() => startFamily()}
          >
            지
          </button>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="main-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
        <footer>
          <a className="brand" href="#home">
            <img src="/favicon.svg" alt="" />
            보듬길
          </a>
          <span>함께 가는 사람을 생각하는 여행.</span>
          <span className="demo-note">
            프론트엔드 데모 · 장소·접근성 정보는 예시입니다.
          </span>
        </footer>
      </main>
      <AppModals />
      {message && (
        <div className="toast" role="status">
          <Check size={18} />
          {message}
        </div>
      )}
    </MotionConfig>
  )
}
export default function App() {
  return (
    <DemoProvider>
      <Shell />
    </DemoProvider>
  )
}
