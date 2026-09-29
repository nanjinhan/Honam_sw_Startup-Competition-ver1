export type Place = {
  id: string
  name: string
  category: string
  image: string
  note: string
  status: "easy" | "check" | "help"
  duration: number
  description: string
  tags: string[]
  x: number
  y: number
}
export const places: Place[] = [
  {
    id: "gyeonggi",
    name: "경기전",
    category: "관광",
    image: "/images/courtyard.jpg",
    note: "고즈넉한 한옥 사이, 느린 산책",
    status: "easy",
    duration: 45,
    description:
      "오래된 나무와 한옥이 어우러진 전주의 산책 공간이에요. 잠시 앉아 쉬어가며 가족과 여유로운 시간을 보내보세요.",
    tags: ["평지 위주", "휴식 공간"],
    x: 30,
    y: 38,
  },
  {
    id: "hanok",
    name: "전주 한옥마을",
    category: "관광",
    image: "/images/hanok.jpg",
    note: "골목마다 만나는 전주의 풍경",
    status: "check",
    duration: 50,
    description:
      "낮은 기와지붕과 작은 골목을 천천히 둘러보세요. 골목마다 바닥과 경사가 달라 방문 전 이동 조건을 확인해주세요.",
    tags: ["골목 산책", "일부 단차 확인"],
    x: 58,
    y: 32,
  },
  {
    id: "cafe",
    name: "한옥에서 쉬어가기",
    category: "카페",
    image: "/images/cafe.jpg",
    note: "마당을 바라보며 잠깐의 쉼",
    status: "check",
    duration: 30,
    description:
      "여행 중간, 따뜻한 차 한 잔과 함께 쉬어가는 시간이에요. 이 카페는 데모용 가상 장소이며 입구와 화장실 정보는 확인이 필요해요.",
    tags: ["실내 휴식", "입구 확인 필요"],
    x: 62,
    y: 59,
  },
  {
    id: "food",
    name: "전주 한 상",
    category: "맛집",
    image: "/images/food.jpg",
    note: "모두의 입맛에 맞는 든든한 한 끼",
    status: "easy",
    duration: 45,
    description:
      "전주의 맛을 함께 나누는 식사 시간이에요. 이 식당은 데모용 가상 장소입니다. 실제 방문 시 입식 좌석과 접근성을 문의해주세요.",
    tags: ["입식 좌석 예시", "가족 식사"],
    x: 38,
    y: 70,
  },
  {
    id: "craft",
    name: "전주 한지 체험",
    category: "체험",
    image: "/images/courtyard.jpg",
    note: "앉아서 천천히 만드는 여행의 기억",
    status: "easy",
    duration: 50,
    description:
      "가족이 함께 손으로 만드는 작은 기념품. 체험 프로그램과 이용 가능한 좌석은 방문 전 확인해주세요.",
    tags: ["앉아서 체험", "예약 확인"],
    x: 78,
    y: 40,
  },
  {
    id: "omok",
    name: "오목대",
    category: "관광",
    image: "/images/hanok.jpg",
    note: "한옥 지붕 너머 펼쳐지는 풍경",
    status: "help",
    duration: 40,
    description:
      "높은 곳에서 한옥마을을 바라보는 장소예요. 오르막과 계단 구간은 별도 확인이 필요해요. 평지 산책을 원하면 경기전을 대신 선택해보세요.",
    tags: ["오르막 주의", "대안: 경기전"],
    x: 83,
    y: 65,
  },
]
export const statusInfo = {
  easy: { label: "편하게 둘러봐요", icon: "check" },
  check: { label: "방문 전 확인해요", icon: "info" },
  help: { label: "도움이 필요해요", icon: "info" },
}
