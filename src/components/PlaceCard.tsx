import { Check, Bookmark } from "lucide-react"
import SpotlightCard from "./SpotlightCard"
import { statusInfo, type Place } from "../data/places"
export function PlaceCard({
  place,
  saved,
  onSave,
  onOpen,
}: {
  place: Place
  saved: boolean
  onSave: () => void
  onOpen: () => void
}) {
  return (
    <SpotlightCard
      className="place-card"
      spotlightColor="rgba(255, 218, 56, 0.17)"
    >
      <div className="place-image">
        <button
          className="image-open"
          onClick={onOpen}
          aria-label={`${place.name} 자세히 보기`}
        >
          <img
            src={place.image}
            alt={place.name + " 여행 분위기 참고 사진"}
            loading="lazy"
          />
        </button>
        <span className={"status " + place.status}>
          {place.status === "easy" ? <Check size={13} /> : <span>!</span>}
          {statusInfo[place.status].label}
        </span>
        <button
          className={"save-button " + (saved ? "saved" : "")}
          aria-label={place.name + (saved ? " 저장 취소" : " 저장")}
          aria-pressed={saved}
          onClick={onSave}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <button className="place-info" onClick={onOpen}>
        <div className="place-name">
          <h3>{place.name}</h3>
          <span>{place.category}</span>
        </div>
        <p>{place.note}</p>
        <div className="place-tags">
          {place.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </button>
    </SpotlightCard>
  )
}
