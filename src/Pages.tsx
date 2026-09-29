import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Minus,
  X,
  Users,
  Footprints,
  Coffee,
  Clock,
  Bookmark,
  Search,
  SlidersHorizontal,
  Info,
  Sparkles,
  CalendarDays,
  Share2,
  Route,
  ArrowUp,
  ArrowDown,
  Trash2,
  Camera,
  CheckCircle2,
  Accessibility,
  ParkingCircle,
  Heart,
  CloudRain,
  Link,
  Pencil,
  Armchair,
} from "lucide-react"
import { useDemo, type Member, defaultTrip } from "./store"
import { places, statusInfo } from "./data/places"
import { PlaceCard } from "./components/PlaceCard"
import DirectionAwareTabs from "./components/DirectionAwareTabs"
import SpotlightCard from "./components/SpotlightCard"

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string
  children: ReactNode
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    d?.showModal()
    document.body.style.overflow = "hidden"
    return () => {
      d?.close()
      document.body.style.overflow = ""
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      <div className="modal-heading">
        <h2 id="modal-title">{title}</h2>
        <button className="icon-button" aria-label="닫기" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  )
}
export function PageHeading({
  eyebrow,
  title,
  description,
  back = "home",
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  back?: string
  children?: ReactNode
}) {
  const { go } = useDemo()
  return (
    <>
      <button className="back-button" onClick={() => go(back)}>
        <ChevronLeft size={16} />
        돌아가기
      </button>
      <div className="page-heading">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
    </>
  )
}
export function Family() {
  const {
    members,
    setMembers,
    conditions,
    setConditions,
    hours,
    setHours,
    start,
    setStart,
    prompt,
    go,
    assistance,
    setAssistance,
  } = useDemo()
  const [editing, setEditing] = useState<Member | null>(null)
  const [memberName, setMemberName] = useState("")
  const [mobility, setMobility] = useState("이동 제약 없음")
  const edit = (m: Member) => {
    setEditing(m)
    setMemberName(m.name)
    setMobility(m.mobility)
  }
  return (
    <div className="content-page">
      <PageHeading
        eyebrow="01 · 함께 가는 사람"
        title="우리 가족을 알려주세요."
        description="모두가 편안한 여행, 함께 가는 사람에서 시작해요."
      />
      <div className="flow-grid">
        <section className="panel">
          <div className="panel-title">
            <Users size={20} />
            <h2>누구와 함께 가나요?</h2>
            <span>{members.length}명</span>
          </div>
          {prompt && (
            <div className="prompt-quote">
              <Sparkles size={16} />
              <span>
                “{prompt}”<small>아래 조건을 직접 확인하고 바꿔주세요.</small>
              </span>
            </div>
          )}
          <div className="member-list">
            {members.map((m) => (
              <button className="member-row" key={m.id} onClick={() => edit(m)}>
                <span className="member-avatar">{m.name.slice(0, 2)}</span>
                <span>
                  <strong>{m.name}</strong>
                  <small>{m.mobility}</small>
                </span>
                <Pencil size={16} />
              </button>
            ))}
          </div>
          <button
            className="add-member"
            onClick={() =>
              edit({ id: Date.now(), name: "", mobility: "이동 제약 없음" })
            }
          >
            <Plus size={18} />
            동행자 추가
          </button>
          <div className="field-section">
            <h3>여행에서 중요한 것</h3>
            <div className="condition-chips">
              {[
                "계단 피하기",
                "완만한 길",
                "자주 쉬기",
                "화장실 가까이",
                "유모차 이동",
                "짧게 걷기",
              ].map((t) => (
                <button
                  aria-pressed={conditions.includes(t)}
                  key={t}
                  onClick={() =>
                    setConditions((c) =>
                      c.includes(t) ? c.filter((x) => x !== t) : [...c, t],
                    )
                  }
                >
                  {conditions.includes(t) && <Check size={14} />} {t}
                </button>
              ))}
            </div>
          </div>
          {members.some((m) => m.mobility.includes("휠체어")) && (
            <label className="field-section field-label">
              이동할 때 도움을 받을 수 있나요?
              <select
                value={assistance}
                onChange={(e) => setAssistance(e.target.value)}
              >
                <option>도움 없이 이동</option>
                <option>보호자가 밀어줄 수 있음</option>
              </select>
              <small>가능한 경사나 거리를 건강 상태에서 추정하지 않아요.</small>
            </label>
          )}
        </section>
        <aside>
          <SpotlightCard
            className="summary-card"
            spotlightColor="rgba(255, 218, 56, 0.35)"
          >
            <span className="summary-icon">
              <CalendarDays size={27} />
            </span>
            <h2>어떤 하루를 보낼까요?</h2>
            <p>
              서두르지 않아도 괜찮아요.
              <br />
              여행에 쓸 시간을 정해주세요.
            </p>
            <label className="field-label">
              여행 지역
              <span className="fixed-field">
                <MapPin size={16} />
                전주 · 한옥마을
              </span>
            </label>
            <label className="field-label">
              출발 시간
              <input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </label>
            <label className="field-label">여행 시간</label>
            <div className="time-options">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  aria-pressed={hours === n}
                  onClick={() => setHours(n)}
                >
                  {n}시간
                </button>
              ))}
            </div>
            <div className="inline-note">
              <Heart size={16} />
              가장 천천히 걷는 사람에게 맞춰요.
            </div>
            <button
              className="yellow-button full"
              disabled={!members.length || !start}
              onClick={() => go("analysis")}
            >
              우리 가족 조건 확인하기
            </button>
          </SpotlightCard>
        </aside>
      </div>
      {editing && (
        <Modal
          title={editing.name ? "동행자 수정" : "동행자 추가"}
          onClose={() => setEditing(null)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const m = { ...editing, name: memberName.trim(), mobility }
              setMembers((prev) =>
                prev.some((x) => x.id === m.id)
                  ? prev.map((x) => (x.id === m.id ? m : x))
                  : [...prev, m],
              )
              setEditing(null)
            }}
          >
            <label className="field-label">
              이름 또는 부르는 말
              <input
                required
                maxLength={15}
                autoFocus
                placeholder="예: 아버지"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
            </label>
            <label className="field-label">
              이동할 때 고려할 점
              <select
                value={mobility}
                onChange={(e) => setMobility(e.target.value)}
              >
                {[
                  "이동 제약 없음",
                  "오래 걷기 어려움",
                  "유모차 이용",
                  "수동 휠체어",
                  "전동 휠체어",
                  "임산부",
                  "기타 · 조건 직접 선택",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <div className="modal-actions">
              {members.some((m) => m.id === editing.id) &&
                members.length > 1 && (
                  <button
                    type="button"
                    className="outline-button"
                    onClick={() => {
                      setMembers((m) => m.filter((x) => x.id !== editing.id))
                      setEditing(null)
                    }}
                  >
                    동행자 삭제
                  </button>
                )}
              <button className="yellow-button" disabled={!memberName.trim()}>
                저장하기
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
export function Analysis() {
  const { conditions, members, hours, start, go, assistance } = useDemo()
  return (
    <div className="content-page narrow">
      <PageHeading
        eyebrow="02 · 여행 조건 확인"
        title="이렇게 함께해볼까요?"
        description="선택한 조건을 모았어요. 수치나 건강 상태를 자동으로 판단하지 않아요."
        back="family"
      />
      <div className="analysis-summary">
        <div className="success-orb">
          <Check size={31} />
        </div>
        <h2>
          {members.length}명이 함께, {hours}시간의 여유
        </h2>
        <p>전주 한옥마을 · {start} 출발</p>
      </div>
      <section className="panel condition-table">
        {[
          ["함께 가는 사람", members.map((x) => x.name).join(", ")],
          [
            "이동 시 고려",
            Array.from(new Set(members.map((x) => x.mobility))).join(" · "),
          ],
          [
            "여행에서 중요한 것",
            conditions.length ? conditions.join(" · ") : "선택한 조건 없음",
          ],
          ...(members.some((m) => m.mobility.includes("휠체어"))
            ? [["이동 도움", assistance]]
            : []),
          ["여행 시간", hours + "시간"],
          ["정보 확인 원칙", "미확인 항목은 방문 전 확인"],
        ].map(([k, v]) => (
          <div key={k}>
            <span>{k}</span>
            <strong>{v}</strong>
            <button
              aria-label={k + " 수정"}
              className="icon-button"
              onClick={() => go("family")}
            >
              <Pencil size={15} />
            </button>
          </div>
        ))}
      </section>
      <div className="info-callout">
        <Info size={18} />
        <p>
          현재 장소 정보와 판정은 데모용 예시예요. 실제 방문 가능 여부는 확인된
          시설 정보와 가족의 조건을 함께 살펴야 해요.
        </p>
      </div>
      <button className="yellow-button full" onClick={() => go("explore")}>
        우리 가족과 갈 만한 곳 보기
      </button>
    </div>
  )
}
export function ConceptMap({
  active,
  onSelect,
  ids = places.map((x) => x.id),
}: {
  active?: string
  onSelect?: (id: string) => void
  ids?: string[]
}) {
  const [zoom, setZoom] = useState(1)
  return (
    <div className="concept-map">
      <div className="map-top-label">
        <MapPin size={15} />
        전주 · 한옥마을
      </div>
      <div className="map-drawing" style={{ transform: `scale(${zoom})` }}>
        <svg viewBox="0 0 500 440" aria-hidden="true">
          <rect width="500" height="440" fill="#eeeede" />
          <path d="M0 380Q170 300 290 390T530 370L530 490H0Z" fill="#d9e5dd" />
          {[
            [20, 10, 90, 60],
            [130, 10, 130, 60],
            [290, 10, 80, 60],
            [400, 10, 80, 60],
            [20, 105, 85, 100],
            [145, 105, 110, 105],
            [295, 105, 90, 80],
            [415, 105, 70, 105],
            [20, 250, 85, 85],
            [145, 250, 110, 70],
            [295, 250, 90, 85],
            [415, 245, 70, 90],
          ].map(([x, y, w, h], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              rx="12"
              fill={i === 5 ? "#dde4be" : "#e0dfce"}
              stroke="#d5d4c2"
            />
          ))}
          <path
            d="M120 0V367M275 0V390M395 0V390M0 87H500M0 229H500M0 352H500"
            stroke="#fafaf2"
            strokeWidth="20"
            fill="none"
          />
          <path
            d="M120 0V367M275 0V390M395 0V390M0 87H500M0 229H500M0 352H500"
            stroke="#d5d5c3"
            strokeWidth="1"
            fill="none"
          />
          <text x="305" y="88" fontSize="11" fill="#969782">
            태조로
          </text>
          <text x="397" y="208" fontSize="11" fill="#969782">
            은행로
          </text>
          <text x="53" y="407" fontSize="12" fill="#91a398">
            전주천
          </text>
        </svg>
        {ids
          .map((id) => places.find((p) => p.id === id)!)
          .map((p, i) => (
            <button
              key={p.id}
              className={"map-marker " + (active === p.id ? "selected" : "")}
              style={{ left: p.x + "%", top: p.y + "%" }}
              onClick={() => onSelect?.(p.id)}
              aria-label={p.name + " 지도에서 선택"}
            >
              <span>{i + 1}</span>
              <strong>{p.name}</strong>
            </button>
          ))}
      </div>
      <div className="map-controls">
        <button
          aria-label="지도 확대"
          disabled={zoom >= 1.6}
          onClick={() => setZoom((z) => Math.min(1.6, z + 0.2))}
        >
          <Plus size={18} />
        </button>
        <button
          aria-label="지도 축소"
          disabled={zoom <= 1}
          onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
        >
          <Minus size={18} />
        </button>
      </div>
      <span className="map-disclaimer">
        장소 위치 개념도 · 실제 길안내가 아닙니다
      </span>
    </div>
  )
}
export function Explore({ savedOnly = false }: { savedOnly?: boolean }) {
  const {
    category,
    setCategory,
    saved,
    toggleSave,
    go,
    selected,
    setSelected,
    buildTrip,
    openFilter,
    status,
    conditions,
  } = useDemo()
  const [search, setSearch] = useState("")
  const [view, setView] = useState("목록")
  const [active, setActive] = useState("gyeonggi")
  const filtered = places.filter(
    (p) =>
      (!savedOnly || saved.includes(p.id)) &&
      (category === "전체" || p.category === category) &&
      (!search || [p.name, p.note, ...p.tags].join(" ").includes(search)) &&
      (status === "전체" || p.status === status),
  )
  const selectedPlace = filtered.find((x) => x.id === active) || filtered[0]
  return (
    <div className="content-page">
      <PageHeading
        eyebrow={savedOnly ? "MY FAVORITES" : "03 · 함께 갈 곳 고르기"}
        title={
          savedOnly ? "다음에 함께 가고 싶은 곳" : "우리 가족에게 맞는 전주"
        }
        description={
          savedOnly
            ? "마음에 드는 장소를 모아 나만의 여행을 완성해보세요."
            : "좋아하는 곳을 고르면, 쉬어가는 시간까지 일정에 담아드려요."
        }
      >
        <button className="outline-button" onClick={openFilter}>
          <SlidersHorizontal size={16} />
          맞춤 필터
        </button>
      </PageHeading>
      <div className="explore-tools">
        <label className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="장소, 여행 분위기로 검색"
            aria-label="장소 검색"
          />
          {search && (
            <button aria-label="검색어 지우기" onClick={() => setSearch("")}>
              <X size={16} />
            </button>
          )}
        </label>
        <DirectionAwareTabs
          items={["목록", "지도"]}
          value={view}
          onChange={setView}
          label="보기 방식"
        />
      </div>
      <div className="category-line">
        <DirectionAwareTabs
          items={["전체", "관광", "맛집", "카페", "체험"]}
          value={category}
          onChange={setCategory}
        />
        <span className="result-count">{filtered.length}곳의 발견</span>
      </div>
      {conditions.length > 0 && (
        <div className="active-conditions">
          <Sparkles size={15} />
          <span>{conditions.join(" · ")}</span>
          <button onClick={() => go("family")}>조건 수정</button>
        </div>
      )}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <Bookmark size={35} />
          <h2>
            {savedOnly
              ? "아직 저장한 장소가 없어요."
              : "조건에 맞는 장소가 없어요."}
          </h2>
          <p>
            {savedOnly
              ? "장소 카드의 북마크를 눌러 모아보세요."
              : "검색어나 필터를 바꿔서 다시 찾아보세요."}
          </p>
          <button
            className="yellow-button"
            onClick={() => {
              setCategory("전체")
              setSearch("")
              if (savedOnly) go("explore")
              else openFilter()
            }}
          >
            {savedOnly ? "장소 둘러보기" : "필터 바꾸기"}
          </button>
        </div>
      ) : view === "목록" ? (
        <div className="place-grid explore-grid">
          {filtered.map((p) => (
            <div key={p.id}>
              <PlaceCard
                place={p}
                saved={saved.includes(p.id)}
                onSave={() => toggleSave(p.id)}
                onOpen={() => go("place/" + p.id)}
              />
              <button
                className={
                  "select-place " + (selected.includes(p.id) ? "chosen" : "")
                }
                aria-pressed={selected.includes(p.id)}
                onClick={() =>
                  setSelected((s) =>
                    s.includes(p.id)
                      ? s.filter((x) => x !== p.id)
                      : [...s, p.id],
                  )
                }
              >
                {selected.includes(p.id) ? (
                  <Check size={15} />
                ) : (
                  <Plus size={15} />
                )}{" "}
                {selected.includes(p.id) ? "여행에 담았어요" : "여행에 담기"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="map-view">
          <ConceptMap
            active={selectedPlace.id}
            onSelect={setActive}
            ids={filtered.map((x) => x.id)}
          />
          <section className="panel map-detail">
            <PlaceCard
              place={selectedPlace}
              saved={saved.includes(selectedPlace.id)}
              onSave={() => toggleSave(selectedPlace.id)}
              onOpen={() => go("place/" + selectedPlace.id)}
            />
            <p>{selectedPlace.description}</p>
            <button
              className="yellow-button full"
              onClick={() => go("place/" + selectedPlace.id)}
            >
              자세히 보기
            </button>
          </section>
        </div>
      )}
      <div className="selection-bar">
        <div>
          <strong>{selected.length}곳을 여행에 담았어요</strong>
          <p>예상 시간을 고려해 코스를 구성해요.</p>
        </div>
        <button
          className="yellow-button"
          onClick={buildTrip}
          disabled={!selected.length}
        >
          이 장소로 일정 만들기
          <Sparkles size={16} />
        </button>
      </div>
    </div>
  )
}
export function Detail({ id }: { id: string }) {
  const p = places.find((p) => p.id === id)
  const { go, saved, toggleSave, selected, setSelected, notify } = useDemo()
  const [tab, setTab] = useState("장소 소개")
  if (!p)
    return (
      <div className="empty-state">
        <h1>장소를 찾을 수 없어요.</h1>
        <button className="yellow-button" onClick={() => go("explore")}>
          다시 둘러보기
        </button>
      </div>
    )
  return (
    <div className="content-page">
      <button className="back-button" onClick={() => go("explore")}>
        <ChevronLeft size={16} />
        장소 목록
      </button>
      <div className="detail-layout">
        <div>
          <div className="detail-image">
            <img src={p.image} alt={p.name + " 여행 분위기 참고 사진"} />
            <span>참고 이미지 · 실제 장소 사진과 다를 수 있어요</span>
            <button
              className={"save-button " + (saved.includes(id) ? "saved" : "")}
              onClick={() => toggleSave(id)}
              aria-label={saved.includes(id) ? "저장 취소" : "장소 저장"}
            >
              <Bookmark
                size={20}
                fill={saved.includes(id) ? "currentColor" : "none"}
              />
            </button>
          </div>
          <DirectionAwareTabs
            items={["장소 소개", "접근성 정보", "도착 준비"]}
            value={tab}
            onChange={setTab}
          />
          <div className="detail-tab" key={tab}>
            {tab === "장소 소개" ? (
              <>
                <h2>여기는 어떤 곳인가요?</h2>
                <p>{p.description}</p>
                <div className="detail-features">
                  <span>
                    <Clock />약 {p.duration}분 머물기
                  </span>
                  <span>
                    <MapPin />
                    전주 한옥마을 일대
                  </span>
                </div>
                <h3>이렇게 함께해보세요</h3>
                <p>
                  {p.status === "help"
                    ? "오르막 대신 평지에서 즐길 수 있는 경기전을 대안으로 살펴보세요."
                    : "서두르지 말고 주변 풍경을 즐겨보세요. 다음 장소로 가기 전에 잠깐 쉬어가도 좋아요."}
                </p>
                {p.status === "help" && (
                  <button
                    className="outline-button"
                    onClick={() => go("place/gyeonggi")}
                  >
                    대안 장소 · 경기전 보기
                  </button>
                )}
              </>
            ) : tab === "접근성 정보" ? (
              <>
                <h2>확인한 것과, 확인이 필요한 것</h2>
                <p>
                  아래는 정보 표시 방식을 보여주는 예시이며 실제 조사 결과가
                  아니에요.
                </p>
                <div className="evidence-table">
                  {[
                    [
                      "주 출입 접근로",
                      p.status === "easy"
                        ? "평지 위주 예시"
                        : "진입로 확인 필요",
                    ],
                    ["장애인 화장실", "정보 확인 필요"],
                    ["주차구역", "정보 확인 필요"],
                    ["계단·단차", "현장 확인 필요"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span>
                        <strong>{label}</strong>
                        <small>출처: 데모 예시 · 확인일 없음</small>
                      </span>
                      <em>{value}</em>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2>출발 전에 한 번 더</h2>
                <div className="arrival-list">
                  {[
                    {
                      Icon: ParkingCircle,
                      title: "주차",
                      desc: "장애인 주차구역 위치와 잔여 공간을 확인해요.",
                    },
                    {
                      Icon: Accessibility,
                      title: "접근로",
                      desc: "출입구 단차와 경사로 이용 가능 여부를 확인해요.",
                    },
                    {
                      Icon: Clock,
                      title: "운영 시간",
                      desc: "방문일 운영 시간과 마지막 입장 시간을 확인해요.",
                    },
                    {
                      Icon: Armchair,
                      title: "휴식",
                      desc: "앉아서 쉬어갈 공간을 미리 찾아두세요.",
                    },
                  ].map(({ Icon, title, desc }) => (
                    <div key={title}>
                      <Icon size={23} />
                      <span>
                        <strong>{title}</strong>
                        <p>{desc}</p>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="info-callout">
                  <Info size={17} />
                  <p>
                    관광지 내부 이동 경로는 제공하지 않아요. 현장 안내와 확인된
                    시설 정보를 함께 살펴주세요.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <aside className="detail-aside">
          <span className={"status inline " + p.status}>
            {p.status === "easy" ? <Check size={13} /> : <Info size={13} />}{" "}
            {statusInfo[p.status].label}
          </span>
          <div className="eyebrow small">JEONJU · {p.category}</div>
          <h1>{p.name}</h1>
          <p>{p.note}</p>
          <div className="place-tags">
            {p.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <hr />
          <div className="detail-mini">
            <span>추천 체류 시간</span>
            <strong>약 {p.duration}분</strong>
          </div>
          <div className="detail-mini">
            <span>이용 정보</span>
            <strong>방문 전 확인 필요</strong>
          </div>
          <div className="info-callout">
            <Info size={16} />
            <p>우리 가족 조건에 맞춘 데모 예시입니다.</p>
          </div>
          <button
            className="yellow-button full"
            onClick={() => {
              setSelected((s) =>
                s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
              )
              notify(
                selected.includes(id) ? "여행에서 뺐어요." : "여행에 담았어요.",
              )
            }}
          >
            {selected.includes(id) ? <Check size={18} /> : <Plus size={18} />}{" "}
            {selected.includes(id)
              ? "여행에 담김 · 취소"
              : "이 장소를 여행에 담기"}
          </button>
          <button
            className="outline-button full"
            onClick={() => go("report/" + id)}
          >
            <Camera size={16} />
            다녀온 정보 알려주기
          </button>
        </aside>
      </div>
    </div>
  )
}
export function schedule(ids: string[], start: string) {
  let minutes = Number(start.split(":")[0]) * 60 + Number(start.split(":")[1])
  return ids.map((id, i) => {
    const place = places.find((p) => p.id === id)!
    if (i) minutes += 10
    const time = `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`
    minutes += place.duration
    return { place, time }
  })
}
export function Plan({ shared = false }: { shared?: boolean }) {
  const { trip, setTrip, saveTrip, setModal, go, route } = useDemo()
  const [checks, setChecks] = useState<string[]>([])
  let current = trip
  if (shared) {
    const params = new URLSearchParams(route.split("?")[1] || "")
    const ids = Array.from(
      new Set(
        (params.get("stops") || "")
          .split(",")
          .filter((id) => places.some((p) => p.id === id)),
      ),
    )
    const start = params.get("start") || "10:00"
    current = {
      ...defaultTrip,
      ids: ids.length ? ids : trip.ids,
      start: /^([01]\d|2[0-3]):[0-5]\d$/.test(start) ? start : "10:00",
    }
  }
  const items = schedule(current.ids, current.start)
  const minutes =
    items.reduce((n, x) => n + x.place.duration, 0) +
    Math.max(0, items.length - 1) * 10
  const reorder = (i: number, delta: number) =>
    setTrip((t) => {
      const ids = [...t.ids]
      ;[ids[i], ids[i + delta]] = [ids[i + delta], ids[i]]
      return { ...t, ids }
    })
  return (
    <div className={"content-page " + (shared ? "shared-page" : "")}>
      <PageHeading
        eyebrow={shared ? "함께 보는 여행 일정" : "OUR LITTLE JOURNEY"}
        title={shared ? "오늘, 함께 가는 길" : current.title}
        description="많이 보지 않아도 충분한, 우리 가족만의 하루."
        back="explore"
      >
        {!shared && (
          <div className="heading-actions">
            <button
              className="outline-button"
              onClick={() => setModal("share")}
            >
              <Share2 size={16} />
              일정 공유
            </button>
            <button className="yellow-button" onClick={saveTrip}>
              <Bookmark size={16} />
              여행 저장
            </button>
          </div>
        )}
      </PageHeading>
      <div className="trip-stats">
        <div>
          <MapPin />
          <span>
            여행 지역<strong>전주 한옥마을</strong>
          </span>
        </div>
        <div>
          <Clock />
          <span>
            예상 소요
            <strong>
              {Math.floor(minutes / 60)}시간 {minutes % 60}분
            </strong>
          </span>
        </div>
        <div>
          <Route />
          <span>
            함께 갈 곳<strong>{items.length}곳의 장소</strong>
          </span>
        </div>
        <div>
          <Coffee />
          <span>
            우리 여행의 속도<strong>천천히, 쉬어가며</strong>
          </span>
        </div>
      </div>
      <div className="plan-layout">
        <section className="timeline">
          <div className="timeline-heading">
            <h2>{shared ? "이 순서로 만나요" : "오늘의 여행 코스"}</h2>
            {!shared && (
              <button className="text-button" onClick={() => go("explore")}>
                <Plus size={15} />
                장소 추가
              </button>
            )}
          </div>
          {items.map(({ place: p, time }, i) => (
            <div className="timeline-item" key={p.id}>
              {i > 0 && (
                <div className="travel-gap">
                  <Footprints size={14} />
                  장소 간 이동 약 10분 · 예시
                </div>
              )}
              <div className="timeline-stop">
                <span className="timeline-time">
                  {time}
                  <small>{String(i + 1).padStart(2, "0")}</small>
                </span>
                <div className="stop-card">
                  <button
                    className="stop-main"
                    onClick={() => go("place/" + p.id)}
                  >
                    <img src={p.image} alt="" />
                    <span>
                      <small>
                        {p.category} · 약 {p.duration}분
                      </small>
                      <h3>{p.name}</h3>
                      <p>{p.note}</p>
                    </span>
                    <ChevronRight size={17} />
                  </button>
                  {!shared && (
                    <div className="stop-actions">
                      <span>
                        <Check size={12} />
                        {p.tags[0]}
                      </span>
                      <button
                        aria-label={p.name + " 위로 이동"}
                        disabled={i === 0}
                        onClick={() => reorder(i, -1)}
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button
                        aria-label={p.name + " 아래로 이동"}
                        disabled={i === items.length - 1}
                        onClick={() => reorder(i, 1)}
                      >
                        <ArrowDown size={15} />
                      </button>
                      <button
                        aria-label={p.name + " 일정에서 삭제"}
                        disabled={items.length === 1}
                        onClick={() =>
                          setTrip((t) => ({
                            ...t,
                            ids: t.ids.filter((x) => x !== p.id),
                          }))
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {!shared && (
            <button className="plan-b-card" onClick={() => setModal("planb")}>
              <span>
                <CloudRain size={21} />
              </span>
              <div>
                <strong>계획이 바뀌어도 괜찮아요.</strong>
                <p>피곤하거나 비가 오면, 더 편한 일정으로.</p>
              </div>
              <ChevronRight size={20} />
            </button>
          )}
        </section>
        <aside>
          <ConceptMap ids={current.ids} onSelect={(id) => go("place/" + id)} />
          <section className="panel checklist">
            <h3>떠나기 전, 한 번 더</h3>
            {[
              "운영 시간과 입장 마감 확인",
              "주차·출입구 접근성 확인",
              "물과 필요한 물품 챙기기",
            ].map((t) => (
              <label key={t}>
                <input
                  type="checkbox"
                  checked={checks.includes(t)}
                  onChange={() =>
                    setChecks((c) =>
                      c.includes(t) ? c.filter((x) => x !== t) : [...c, t],
                    )
                  }
                />
                <span>{t}</span>
              </label>
            ))}
          </section>
        </aside>
      </div>
      <div className="info-callout">
        <Info size={17} />
        <p>
          시연용 일정입니다. 소요 시간·시설 정보는 예시이며, 실제 길찾기나
          실시간 운영 정보를 제공하지 않아요.
        </p>
      </div>
    </div>
  )
}
export function Report({ id }: { id: string }) {
  const p = places.find((p) => p.id === id) || places[0]
  const { go } = useDemo()
  const [image, setImage] = useState("")
  const [memo, setMemo] = useState("")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  useEffect(
    () => () => {
      if (image) URL.revokeObjectURL(image)
    },
    [image],
  )
  return (
    <div className="content-page narrow">
      <PageHeading
        eyebrow="작은 정보가, 다음 여행의 시작"
        title="다녀온 이야기를 알려주세요."
        description={p.name + "에서 직접 확인한 정보만 남겨주세요."}
        back={"place/" + p.id}
      />
      {submitted ? (
        <div className="empty-state">
          <CheckCircle2 size={48} />
          <h2>소중한 기록을 담았어요.</h2>
          <p>
            데모에서는 이 화면에만 임시로 보관돼요.
            <br />
            외부에 전송되거나 게시되지 않았어요.
          </p>
          <button className="yellow-button" onClick={() => go("place/" + p.id)}>
            장소로 돌아가기
          </button>
        </div>
      ) : (
        <section className="panel">
          <label className="upload-area">
            {image ? (
              <img src={image} alt="선택한 제보 사진" />
            ) : (
              <>
                <Camera size={34} />
                <strong>입구나 이동 공간 사진을 선택해주세요</strong>
                <span>JPG, PNG, WEBP · 10MB 이하</span>
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                if (
                  file.size > 10 * 1024 * 1024 ||
                  !["image/jpeg", "image/png", "image/webp"].includes(file.type)
                ) {
                  setError(
                    "JPG, PNG, WEBP 형식의 10MB 이하 사진을 선택해주세요.",
                  )
                  return
                }
                setError("")
                setImage(URL.createObjectURL(file))
              }}
            />
          </label>
          {image && (
            <button className="text-button" onClick={() => setImage("")}>
              사진 지우기
            </button>
          )}
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="field-section">
            <h3>직접 확인하셨나요?</h3>
            {["입구 계단", "입구 문턱", "쉴 수 있는 의자"].map((t) => (
              <label key={t} className="report-question">
                <span>{t}</span>
                <select
                  value={answers[t] || "확인 못함"}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [t]: e.target.value }))
                  }
                >
                  <option>확인 못함</option>
                  <option>있어요</option>
                  <option>없어요</option>
                </select>
              </label>
            ))}
          </div>
          <label className="field-label">
            다음 가족에게 전하고 싶은 이야기
            <textarea
              rows={4}
              placeholder="예: 주 출입구 오른쪽에 경사로가 있어요."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              maxLength={500}
            />
            <small>{memo.length}/500</small>
          </label>
          <button
            className="yellow-button full"
            disabled={
              !image &&
              !memo.trim() &&
              !Object.values(answers).some((v) => v !== "확인 못함")
            }
            onClick={() => setSubmitted(true)}
          >
            기록 남기기
          </button>
        </section>
      )}
    </div>
  )
}
export function AppModals() {
  const {
    modal,
    setModal,
    status,
    setStatus,
    conditions,
    setConditions,
    go,
    trip,
    setTrip,
    notify,
  } = useDemo()
  const [copied, setCopied] = useState(false)
  const [reason, setReason] = useState("잠깐 쉬고 싶어요")
  const close = () => {
    setModal("")
    setCopied(false)
  }
  const shareUrl =
    location.origin +
    location.pathname +
    "#shared?stops=" +
    trip.ids.join(",") +
    "&start=" +
    trip.start
  if (modal === "filter")
    return (
      <Modal title="우리 가족 맞춤 필터" onClose={close}>
        <p className="modal-description">알고 싶은 정보를 선택해보세요.</p>
        <label className="field-label">
          장소의 접근성
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="전체">모든 장소</option>
            <option value="easy">편하게 둘러볼 수 있는 곳</option>
            <option value="check">방문 전 확인이 필요한 곳</option>
            <option value="help">도움이 필요한 곳</option>
          </select>
        </label>
        <h3 className="field-section">여행에서 중요한 것</h3>
        <div className="condition-chips">
          {[
            "계단 피하기",
            "완만한 길",
            "자주 쉬기",
            "화장실 가까이",
            "유모차 이동",
            "짧게 걷기",
          ].map((t) => (
            <button
              key={t}
              aria-pressed={conditions.includes(t)}
              onClick={() =>
                setConditions((s) =>
                  s.includes(t) ? s.filter((x) => x !== t) : [...s, t],
                )
              }
            >
              {conditions.includes(t) && <Check size={14} />} {t}
            </button>
          ))}
        </div>
        <div className="modal-actions">
          <button
            className="outline-button"
            onClick={() => {
              setStatus("전체")
              setConditions([])
            }}
          >
            초기화
          </button>
          <button
            className="yellow-button"
            onClick={() => {
              close()
              go("explore")
            }}
          >
            필터 적용하기
          </button>
        </div>
      </Modal>
    )
  if (modal === "share")
    return (
      <Modal title="함께 갈 사람에게 전해요" onClose={close}>
        <div className="share-preview">
          <div className="brand">
            <img src="/favicon.svg" alt="" />
            보듬길
          </div>
          <h3>{trip.title}</h3>
          <p>
            {trip.ids.length}곳의 장소 · {trip.start} 출발
          </p>
          <div className="share-stops">
            {schedule(trip.ids, trip.start).map((x) => (
              <span key={x.place.id}>
                <strong>{x.time}</strong>
                {x.place.name}
              </span>
            ))}
          </div>
        </div>
        <p className="modal-description">
          가족이 보기 편한 큰 글씨 일정이에요. 링크에는 선택한 장소와 출발
          시간만 담겨요.
        </p>
        <label className="field-label">
          일정 링크
          <input readOnly value={shareUrl} onFocus={(e) => e.target.select()} />
        </label>
        <div className="modal-actions">
          <button
            className="outline-button"
            onClick={() => {
              close()
              go(shareUrl.split("#")[1])
            }}
          >
            큰 글씨로 미리보기
          </button>
          <button
            className="yellow-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(shareUrl)
                setCopied(true)
              } catch {
                notify("링크 입력창을 눌러 직접 복사해주세요.")
              }
            }}
          >
            {copied ? <Check size={16} /> : <Link size={16} />}{" "}
            {copied ? "복사했어요" : "링크 복사"}
          </button>
        </div>
      </Modal>
    )
  if (modal === "planb")
    return (
      <Modal title="오늘의 속도를 바꿔볼까요?" onClose={close}>
        <p className="modal-description">
          남은 일정은 더 가볍게 조정해도 괜찮아요.
        </p>
        <div className="planb-options">
          {[
            "잠깐 쉬고 싶어요",
            "걷는 곳을 줄이고 싶어요",
            "비가 오기 시작했어요",
          ].map((t) => (
            <button
              key={t}
              aria-pressed={reason === t}
              onClick={() => setReason(t)}
            >
              {reason === t ? <CheckCircle2 size={21} /> : <Coffee size={21} />}
              <span>{t}</span>
            </button>
          ))}
        </div>
        <div className="info-callout">
          <Sparkles size={18} />
          <p>
            {reason === "잠깐 쉬고 싶어요"
              ? "카페를 첫 순서로 옮겨 잠깐 쉬어가는 일정으로 바꿔요."
              : reason === "걷는 곳을 줄이고 싶어요"
                ? "마지막 장소를 빼고 조금 일찍 마무리해요."
                : "야외 산책 장소를 한지 체험으로 바꿔요. 실내 접근성은 방문 전 확인해주세요."}
          </p>
        </div>
        <button
          className="yellow-button full"
          onClick={() => {
            setTrip((t) => {
              let ids = t.ids
              if (reason === "잠깐 쉬고 싶어요")
                ids = ["cafe", ...ids.filter((x) => x !== "cafe")]
              else if (reason === "걷는 곳을 줄이고 싶어요")
                ids = ids.slice(0, Math.max(1, ids.length - 1))
              else
                ids = Array.from(
                  new Set(
                    ids.map((x) =>
                      ["hanok", "omok", "gyeonggi"].includes(x) ? "craft" : x,
                    ),
                  ),
                )
              return { ...t, ids }
            })
            close()
            notify("바뀐 속도에 맞춰 일정을 조정했어요.")
          }}
        >
          이렇게 일정 바꾸기
        </button>
      </Modal>
    )
  return null
}
