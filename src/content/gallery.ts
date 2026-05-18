/**
 * Галерея топ-локаций — секция «Что увидим».
 * Подписи photo — это инструкция заказчику, что искать (см. README).
 */

export interface GalleryItem {
  id: string;
  name: string;
  region: string;
  /** 1-2 предложения — без туристических клише */
  text: string;
  photo: string;
  /**
   * Пути к фото локации в public/, например ["/photos/elbrus-a.jpg"].
   * Пока пусто — рендерится плейсхолдер. Несколько путей → слайдер.
   */
  photos?: string[];
  /** Поисковый запрос на английском для Unsplash/Pexels */
  search: string;
  /** Высота/цифра-факт для подписи, если уместно */
  fact?: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "elbrus",
    name: "Эльбрус",
    region: "Кабардино-Балкария",
    text:
      "Самая высокая гора Европы. На вершину 5642 м мы не лезем — но канатка довозит до 3847, и этого хватает, чтобы оказаться выше облаков.",
    photo: "нужно фото: двуглавая вершина Эльбруса, желательно с плато или с канатки",
    photos: ["/photos/elbrus-1.jpg", "/photos/elbrus-2.jpg", "/photos/elbrus-3.jpg"],
    search: "Mount Elbrus twin peaks",
    fact: "5642 м",
  },
  {
    id: "bermamyt",
    name: "Плато Бермамыт",
    region: "Карачаево-Черкесия",
    text:
      "Обрыв в полтора километра и Эльбрус прямо напротив. Ради рассвета здесь встают в 3 ночи — и ни разу об этом не жалеют.",
    photo: "нужно фото: край плато Бермамыт с видом на Эльбрус, рассвет",
    photos: ["/photos/bermamyt-1.jpg"],
    search: "Bermamyt plateau Elbrus sunrise",
    fact: "2592 м",
  },
  {
    id: "sofia-lakes",
    name: "Софийские озёра",
    region: "Архыз",
    text:
      "Три озера цвета, в который не верят, пока не увидят. Лежат под ледником на 2800 м — три часа подъёма пешком отделяют от той самой картинки.",
    photo: "нужно фото: бирюзовые Софийские озёра под ледником",
    photos: ["/photos/sofia-lakes-1.jpg", "/photos/sofia-lakes-2.jpg"],
    search: "Sofia lakes Arkhyz turquoise",
    fact: "2800 м",
  },
  {
    id: "chegem",
    name: "Чегемские водопады",
    region: "Кабардино-Балкария",
    text:
      "Вода срывается прямо со стен узкого каньона, иногда в метре от дороги. Летом — десятки тонких струй по всей высоте скалы.",
    photo: "нужно фото: Чегемские водопады, струи воды по стене ущелья",
    photos: [
      "/photos/chegem-falls-1.jpg",
      "/photos/chegem-falls-2.jpg",
      "/photos/chegem-falls-3.jpg",
    ],
    search: "Chegem waterfalls gorge",
  },
  {
    id: "dzhily-su",
    name: "Джилы-Су",
    region: "Кабардино-Балкария",
    text:
      "Долина нарзанов у северного склона Эльбруса. Горячие минеральные ванны прямо под открытым небом, вода с пузырьками — и ни одной души вокруг.",
    photo: "нужно фото: нарзанная ванна под открытым небом, Джилы-Су",
    photos: ["/photos/dzhily-su-1.jpg", "/photos/dzhily-su-2.jpg"],
    search: "Jily-Su narzan baths Elbrus",
  },
  {
    id: "kislovodsk-park",
    name: "Кисловодский парк",
    region: "Ставрополье",
    text:
      "Один из крупнейших парков Европы — 966 гектаров терренкуров, роз и сосен. Сюда приезжают не лезть в гору, а просто гулять полдня.",
    photo: "нужно фото: Долина роз или Колоннада в Кисловодском парке",
    photos: ["/photos/kislovodsk-park-1.jpg", "/photos/kislovodsk-park-2.jpg"],
    search: "Kislovodsk Park Rose Valley",
    fact: "966 га",
  },
  {
    id: "mashuk",
    name: "Гора Машук",
    region: "Пятигорск",
    text:
      "Канатка за три минуты поднимает на вершину над Пятигорском. Отсюда видно все пять гор Кавминвод и, в ясный день, Эльбрус на горизонте.",
    photo: "нужно фото: панорама Пятигорска с горы Машук",
    photos: ["/photos/mashuk-1.jpg", "/photos/mashuk-2.jpg"],
    search: "Mashuk Pyatigorsk panorama",
    fact: "993 м",
  },
  {
    id: "observatory",
    name: "Обсерватория Архыза",
    region: "Карачаево-Черкесия",
    text:
      "РАТАН-600 и БТА — два крупнейших телескопа Евразии. А ночью над Архызом — Млечный путь, какого в городе не увидеть никогда.",
    photo: "нужно фото: купол обсерватории и Млечный путь над Архызом",
    photos: ["/photos/observatory-1.jpg", "/photos/observatory-2.jpg"],
    search: "Arkhyz observatory Milky Way",
  },
  {
    id: "lik-hrista",
    name: "Лик Христа",
    region: "Нижний Архыз",
    text:
      "Двухметровая икона, написанная на скале неизвестно когда и кем. В ясный день почти не видна, в пасмурный — проступает чётко. 526 ступеней вверх.",
    photo: "нужно фото: наскальный Лик Христа в Нижнем Архызе",
    photos: ["/photos/lik-hrista-1.jpg", "/photos/lik-hrista-2.jpg"],
    search: "Lik Hrista Arkhyz rock face",
  },
  {
    id: "arkhyz",
    name: "Курорт Архыз",
    region: "Карачаево-Черкесия",
    text:
      "Зелёная долина в окружении хребтов, где у каждого свой маршрут: канатки и трассы, конные тропы, обзорные поляны над посёлком. База, с которой расходятся почти все радиалки.",
    photo: "нужно фото: панорама долины Архыза с зелёными хребтами",
    photos: ["/photos/arkhyz-2.jpg", "/photos/arkhyz-1.jpg"],
    search: "Arkhyz valley resort green mountains",
    fact: "1450 м",
  },
  {
    id: "chegem-gorge",
    name: "Чегемское ущелье",
    region: "Кабардино-Балкария",
    text:
      "Каньон со стенами в 300 метров, где умещаются и водопады, и средневековые балкарские склепы, и стартовая площадка парапланеристов.",
    photo: "нужно фото: узкое Чегемское ущелье с высокими скальными стенами",
    photos: [
      "/photos/chegem-gorge-2.jpg",
      "/photos/chegem-gorge-1.jpg",
      "/photos/chegem-gorge-3.jpg",
    ],
    search: "Chegem gorge canyon cliffs",
  },
];
