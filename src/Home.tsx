import {
  MapPin,
  Compass,
  Map,
  Bookmark,
  ChevronDown,
  Sparkles,
  SlidersHorizontal,
  Users,
  Footprints,
  Coffee,
  Landmark,
  Utensils,
  Palette,
  Check,
  Plus,
  Heart,
  Sun,
  Route,
  ChevronRight,
} from "lucide-react"
import BlurText from "./components/BlurText"
import AnimatedContent from "./components/AnimatedContent"
import SpotlightCard from "./components/SpotlightCard"
import HeroColorPanels from "./components/HeroColorPanels"
import DirectionAwareTabs from "./components/DirectionAwareTabs"
import { places, statusInfo, type Place } from "./data/places"

import { useDemo } from "./store"
import { PlaceCard } from "./components/PlaceCard"
export default function Home() {
  const {
    category,
    setCategory,
    saved,
    toggleSave,
    prompt,
    setPrompt,
    startFamily,
    go,
    openFilter,
    members,
    conditions,
  } = useDemo()
  return (
    <>
      <div className="context-bar">
        <button onClick={() => go("explore")}>
          <MapPin size={16} />
          전북 전주 · 한옥마을
          <ChevronDown size={14} />
        </button>
        <span>
          <Sun size={16} />
          가볍게 떠나기 좋은 날
        </span>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-star">✳</span> 함께라서, 더 좋은 여행
          </div>
          <h1>
            <span className="headline-static">우리 가족의 속도로,</span>
            <BlurText
              text="전주를 만나요."
              delay={100}
              className="hero-title"
            />
          </h1>
          <p className="hero-description">
            함께 가는 사람을 알려주세요.
            <br />
            걷는 거리부터 쉬어갈 곳까지, 모두에게 편한 여행을 찾아요.
          </p>
          <form
            className="trip-prompt"
            onSubmit={(e) => {
              e.preventDefault()
              startFamily(prompt)
            }}
          >
            <Sparkles size={21} />
            <input
              aria-label="원하는 여행"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="누구와 어떤 여행을 하고 싶나요?"
            />
            <button type="submit">여행 찾기</button>
          </form>
          <div className="suggestions">
            {["부모님과 함께", "유모차와 함께", "많이 걷지 않기"].map((t) => (
              <button key={t} onClick={() => startFamily(t)}>
                <Plus size={13} />
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="hero-photo">
          <img
            className="hero-main-image"
            src="/images/hanok.jpg"
            alt="한옥 지붕이 이어지는 고즈넉한 골목 풍경"
          />
          <div className="photo-top">
            <span>
              <MapPin size={13} />
              JEONJU, KOREA
            </span>
            <span className="photo-index">JEONJU DIARY</span>
          </div>
          <div className="photo-caption">
            <span>
              익숙하지 않은 곳도,
              <br />
              <strong>함께라면 괜찮으니까.</strong>
            </span>
            <div className="round-seal">
              <Footprints size={21} />
              <span>천천히, 함께</span>
            </div>
          </div>
          <div className="photo-sticker">
            <Heart size={15} fill="currentColor" />
            우리 모두를 위한 여행
          </div>
        </div>
      </section>
      <AnimatedContent distance={20} duration={0.6}>
        <section className="family-strip">
          <div className="avatars">
            {members.slice(0, 3).map((m) => (
              <span key={m.id}>{m.name.slice(0, 2)}</span>
            ))}
          </div>
          <div>
            <h3>함께 가는 우리 가족 · {members.length}명</h3>
            <p>서로 다른 속도도, 하나의 여행으로.</p>
          </div>
          <div className="family-tags">
            {conditions.slice(0, 3).map((t) => (
              <span key={t}>
                <Check size={15} />
                {t}
              </span>
            ))}
          </div>
          <button className="text-button" onClick={() => startFamily()}>
            여행 조건 설정
            <ChevronRight size={16} />
          </button>
        </section>
      </AnimatedContent>
      <section className="discovery">
        <div className="section-heading">
          <div>
            <div className="eyebrow small">
              A LITTLE SLOWER, A LITTLE CLOSER
            </div>
            <h2>
              전주에서 천천히 둘러보기
              <span className="yellow-dot" />
            </h2>
            <p>어디를 갈지보다, 어떻게 함께할지를 생각했어요.</p>
          </div>
          <button className="outline-button" onClick={() => openFilter()}>
            <SlidersHorizontal size={16} />
            맞춤 필터
          </button>
        </div>
        <div className="category-line">
          <DirectionAwareTabs
            items={["전체", "관광", "맛집", "카페", "체험"]}
            value={category}
            onChange={setCategory}
          />
          <span className="result-note">우리 가족에게 맞는 여행의 발견</span>
        </div>
        <div className="place-grid">
          {places
            .filter((p) =>
              category === "전체"
                ? ["gyeonggi", "hanok", "cafe", "food"].includes(p.id)
                : p.category === category,
            )
            .map((p) => (
              <PlaceCard
                key={p.id}
                place={p}
                saved={saved.includes(p.id)}
                onSave={() => toggleSave(p.id)}
                onOpen={() => go("place/" + p.id)}
              />
            ))}
        </div>
      </section>
      <section className="plan-banner">
        <HeroColorPanels />
        <div className="banner-icon">
          <Route size={29} />
        </div>
        <div>
          <span>계획은 가볍게, 여행은 여유롭게</span>
          <h2>우리 가족만의 하루를 만들어볼까요?</h2>
        </div>
        <button className="dark-button" onClick={() => startFamily()}>
          맞춤 여행 만들기
          <Sparkles size={16} />
        </button>
      </section>
    </>
  )
}
