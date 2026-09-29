// Adapted from Cult UI Hero Color Panels (MIT). See THIRD-PARTY.md.
import { memo, useEffect, useState } from "react"
import { ColorPanels } from "@paper-design/shaders-react"
const Panels = memo(ColorPanels)
export default function HeroColorPanels() {
  const [supported, setSupported] = useState(false)
  useEffect(() => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("webgl2")
    setSupported(
      !!context && !matchMedia("(prefers-reduced-motion: reduce)").matches,
    )
    context?.getExtension("WEBGL_lose_context")?.loseContext()
  }, [])
  return (
    <div className="color-panels" aria-hidden="true">
      {supported && (
        <Panels
          width={800}
          height={400}
          colors={["#ffe99a", "#ffce24", "#fff4cb", "#ebae2b"]}
          colorBack="#fff3bf"
          density={3}
          angle1={0.68}
          angle2={0.28}
          length={1.13}
          edges={false}
          blur={0.5}
          fadeIn={0.85}
          fadeOut={0.3}
          gradient={0.56}
          speed={0.25}
          scale={0.96}
          rotation={180}
        />
      )}
    </div>
  )
}
