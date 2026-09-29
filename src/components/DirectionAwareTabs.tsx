// Controlled, accessible adaptation of Cult UI Direction Aware Tabs (MIT).
import { motion } from "motion/react"
import { useId } from "react"
export default function DirectionAwareTabs({
  items,
  value,
  onChange,
  label = "분류",
}: {
  items: string[]
  value: string
  onChange: (v: string) => void
  label?: string
}) {
  const id = useId()
  return (
    <div className="pill-tabs" role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={item}
          aria-pressed={item === value}
          onClick={() => onChange(item)}
        >
          {value === item && (
            <motion.span
              layoutId={id}
              className="tab-bubble"
              transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
            />
          )}
          <span>{item}</span>
        </button>
      ))}
    </div>
  )
}
