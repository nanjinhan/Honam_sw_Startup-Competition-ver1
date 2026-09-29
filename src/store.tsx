import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { places } from "./data/places"
export type Member = {
  id: number
  name: string
  mobility: string
}
export type Trip = {
  ids: string[]
  hours: number
  start: string
  title: string
}
function readLocal<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => boolean,
): T {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null")
    return validate(value) ? value : fallback
  } catch {
    return fallback
  }
}
const validIds = (x: unknown): x is string[] =>
  Array.isArray(x) &&
  x.every((y) => typeof y === "string" && places.some((p) => p.id === y))
export const initialMembers: Member[] = [
  { id: 1, name: "나", mobility: "이동 제약 없음" },
  { id: 2, name: "어머니", mobility: "오래 걷기 어려움" },
  { id: 3, name: "아이", mobility: "유모차 이용" },
]
export const defaultTrip: Trip = {
  ids: ["gyeonggi", "cafe", "food"],
  hours: 3,
  start: "10:00",
  title: "우리 가족의 느린 전주 여행",
}
type Demo = ReturnType<typeof useDemoState>
const Context = createContext<Demo | null>(null)
function useDemoState() {
  const [route, setRoute] = useState(() => location.hash.slice(1) || "home")
  const [category, setCategory] = useState("전체")
  const [prompt, setPrompt] = useState("")
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [conditions, setConditions] = useState([
    "계단 피하기",
    "자주 쉬기",
    "짧게 걷기",
  ])
  const [hours, setHours] = useState(3)
  const [start, setStart] = useState("10:00")
  const [assistance, setAssistance] = useState("도움 없이 이동")
  const [saved, setSaved] = useState<string[]>(() =>
    readLocal("gilannae.saved", [], validIds),
  )
  const [trip, setTrip] = useState<Trip>(() =>
    readLocal(
      "gilannae.trip",
      defaultTrip,
      (x) =>
        !!x &&
        typeof x === "object" &&
        "ids" in x &&
        validIds(x.ids) &&
        x.ids.length > 0 &&
        "start" in x &&
        typeof x.start === "string" &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(x.start) &&
        "hours" in x &&
        [1, 2, 3, 4].includes(Number(x.hours)) &&
        "title" in x &&
        typeof x.title === "string",
    ),
  )
  const [selected, setSelected] = useState<string[]>([
    "gyeonggi",
    "cafe",
    "food",
  ])
  const [status, setStatus] = useState("전체")
  const [message, setMessage] = useState("")
  const [modal, setModal] = useState("")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const f = () => {
      setRoute(location.hash.slice(1) || "home")
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    window.addEventListener("hashchange", f)
    return () => window.removeEventListener("hashchange", f)
  }, [])
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )
  const notify = (s: string) => {
    setMessage(s)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(""), 3500)
  }
  const go = (to: string) => {
    if (location.hash.slice(1) === to)
      window.scrollTo({ top: 0, behavior: "smooth" })
    else location.hash = to
  }
  const toggleSave = (id: string) => {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id]
    setSaved(next)
    try {
      localStorage.setItem("gilannae.saved", JSON.stringify(next))
    } catch {
      notify("저장 공간을 사용할 수 없어 이번 방문에만 보관돼요.")
    }
  }
  const startFamily = (text?: string) => {
    const value = text ?? ""
    if (text) setPrompt(text)
    if (value.includes("휠체어")) {
      setMembers([
        { id: 1, name: "나", mobility: "이동 제약 없음" },
        { id: 2, name: "동행자", mobility: "수동 휠체어" },
      ])
      setConditions(["계단 피하기", "완만한 길", "화장실 가까이"])
    } else if (value.includes("유모차")) {
      setMembers([
        { id: 1, name: "나", mobility: "이동 제약 없음" },
        { id: 2, name: "아이", mobility: "유모차 이용" },
      ])
      setConditions(["계단 피하기", "유모차 이동", "자주 쉬기"])
    } else if (value.includes("부모님")) {
      setMembers([
        { id: 1, name: "나", mobility: "이동 제약 없음" },
        { id: 2, name: "부모님", mobility: "오래 걷기 어려움" },
      ])
      setConditions(["계단 피하기", "짧게 걷기", "자주 쉬기"])
    }
    go("family")
  }
  const buildTrip = () => {
    let ids = selected.length ? selected : ["gyeonggi", "cafe", "food"]
    let used = 0
    ids = ids.filter((id) => {
      const p = places.find((p) => p.id === id)!
      const duration = p.duration + (used ? 10 : 0)
      if (used + duration > hours * 60) return false
      used += duration
      return true
    })
    if (!ids.length) ids = ["gyeonggi"]
    setTrip({ ...defaultTrip, ids, hours, start })
    go("plan")
    notify("선택한 장소로 우리 가족 일정을 만들었어요.")
  }
  const saveTrip = () => {
    try {
      localStorage.setItem("gilannae.trip", JSON.stringify(trip))
      notify("이 브라우저에 여행을 저장했어요.")
    } catch {
      notify("저장 공간을 사용할 수 없어요. 일정 링크를 복사해주세요.")
    }
  }
  return {
    route,
    go,
    category,
    setCategory,
    prompt,
    setPrompt,
    members,
    setMembers,
    assistance,
    setAssistance,
    conditions,
    setConditions,
    hours,
    setHours,
    start,
    setStart,
    saved,
    toggleSave,
    trip,
    setTrip,
    selected,
    setSelected,
    status,
    setStatus,
    message,
    notify,
    modal,
    setModal,
    openFilter: () => setModal("filter"),
    startFamily,
    buildTrip,
    saveTrip,
  }
}
export function DemoProvider({ children }: { children: ReactNode }) {
  const value = useDemoState()
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useDemo() {
  const c = useContext(Context)
  if (!c) throw new Error("Demo context is missing")
  return c
}
