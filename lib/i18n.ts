import type { ActivityId, BranchId, CommonFeature, Lang, ServiceId } from "./branches";

export type { Lang };

export const SECTION_IDS = ["about", "branches", "groups", "food", "clubs", "gallery", "documents", "contacts"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

type Text = { title: string; text: string };

export type Dict = {
  meta: { title: string; description: string };
  skip: string;
  nav: Record<SectionId, string> & { home: string; menu: string; close: string; enroll: string; langLabel: string };
  common: {
    whatsapp: string;
    instagram: string;
    call: string;
    address: string;
    phone: string;
    schedule: string;
    groups: string;
    ages: string;
    agesUnit: string;
    languages: string;
    languagesValue: string;
    duty: string;
    openIn: string;
    more: string;
    less: string;
    all: string;
    soon: string;
    photoSoon: string;
    selected: string;
    choose: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    text: string;
    enroll: string;
    branches: string;
    photoAlt: string;
    badgeAges: string;
    badgeLangs: string;
  };
  features: Record<"branches" | "ages" | CommonFeature, Text>;
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    points: Record<"bilingual" | "atmosphere" | "development" | "activities" | "cameras", Text>;
    photoAlt: string;
  };
  branches: {
    eyebrow: string;
    title: string;
    lead: string;
    servicesTitle: string;
    activitiesTitle: string;
    extraService: string;
    contactsTitle: string;
    detailsFor: string;
    showDetails: string;
    hideDetails: string;
    photoAlt: string;
  };
  branchShort: Record<BranchId, string>;
  groups: {
    eyebrow: string;
    title: string;
    lead: string;
    group: (n: number) => string;
    groupNote: string;
    note: string;
  };
  food: {
    eyebrow: string;
    title: string;
    lead: string;
    count: string;
    countLabel: string;
    cards: Record<"regular" | "kids" | "together" | "ask", Text>;
  };
  clubs: {
    eyebrow: string;
    title: string;
    lead: string;
    clubsLabel: string;
    serviceLabel: string;
    activities: Record<ActivityId, Text>;
    services: Record<ServiceId, Text>;
    ask: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    lead: string;
    empty: string;
    emptyHint: string;
    open: string;
    close: string;
    prev: string;
    next: string;
    photo: string;
  };
  documents: {
    eyebrow: string;
    title: string;
    lead: string;
    folder: string;
    open: string;
    pending: string;
    note: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    lead: string;
    map: string;
    mapTitle: (name: string) => string;
    mapPending: string;
    route: string;
  };
  enroll: {
    title: string;
    text: string;
    message: (branch: string) => string;
    write: string;
  };
  footer: { tagline: string; rights: string; up: string };
};

const kk: Dict = {
  meta: {
    title: "Erketai — бақытты балалық шақ мекені | Балабақша, Алматы",
    description:
      "Erketai — Алматыдағы екі филиалы бар билингвалды балабақша (Алатау және Әуезов аудандары). 2–6 жас, қазақ және орыс тілдері, ағылшын тілі тіл тасымалдаушымен, бес мезгіл тамақтану, онлайн-камералар.",
  },
  skip: "Негізгі мазмұнға өту",
  nav: {
    home: "Басты бет",
    about: "Біз туралы",
    branches: "Филиалдар",
    groups: "Топтар",
    food: "Тамақтану",
    clubs: "Үйірмелер",
    gallery: "Галерея",
    documents: "Құжаттар",
    contacts: "Байланыс",
    menu: "Мәзірді ашу",
    close: "Мәзірді жабу",
    enroll: "Жазылу",
    langLabel: "Тілді таңдау",
  },
  common: {
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    call: "Қоңырау шалу",
    address: "Мекенжай",
    phone: "Телефон",
    schedule: "Жұмыс уақыты",
    groups: "Топтар",
    ages: "Балалар жасы",
    agesUnit: "жас",
    languages: "Оқыту тілдері",
    languagesValue: "Қазақ және орыс",
    duty: "Кезекші топтар",
    openIn: "Ашу",
    more: "Тағы көрсету",
    less: "Жасыру",
    all: "Барлығы",
    soon: "Жақында",
    photoSoon: "Фото жақында қосылады",
    selected: "Таңдалды",
    choose: "Филиалды таңдау",
  },
  hero: {
    eyebrow: "Алматыдағы билингвалды балабақша",
    titleLead: "Erketai —",
    titleAccent: "бақытты балалық шақ мекені",
    text: "Алатау және Әуезов аудандарындағы екі филиал. 2–6 жастағы балаларға қазақ және орыс тілдерінде тәрбие мен білім, ағылшын тілі — тіл тасымалдаушымен.",
    enroll: "Бізге жазылыңыз",
    branches: "Филиалдарды көру",
    photoAlt: "Erketai балабақшасы",
    badgeAges: "2–6 жас",
    badgeLangs: "ҚАЗ · РУС · ENG",
  },
  features: {
    branches: { title: "2 филиал", text: "Алатау және Әуезов аудандары" },
    ages: { title: "2–6 жас", text: "Балабақшаға қабылдау жасы" },
    langs: { title: "Қазақ және орыс", text: "Екі тілде оқыту" },
    english: { title: "Ағылшын тілі", text: "Тіл тасымалдаушымен" },
    meals: { title: "Бес мезгіл", text: "Күніне бес рет тамақтану" },
    cameras: { title: "Онлайн-камералар", text: "Ата-аналарға арналған" },
  },
  about: {
    eyebrow: "Біз туралы",
    title: "Бала өзін үйдегідей сезінетін орын",
    lead: "Erketai — Алматыдағы екі филиалы бар жеке балабақша. Біз балалардың қуанышпен келіп, жаңа нәрсені қызығушылықпен үйренуіне жағдай жасаймыз.",
    points: {
      bilingual: {
        title: "Билингвалды оқыту",
        text: "Сабақтар қазақ және орыс тілдерінде өтеді, ал ағылшын тілін тіл тасымалдаушы жүргізеді.",
      },
      atmosphere: {
        title: "Жайлы атмосфера",
        text: "Мейірімді орта, тұрақты күн тәртібі және әр балаға деген ықылас.",
      },
      development: {
        title: "Жан-жақты даму",
        text: "Ойын, шығармашылық және күнделікті сабақтар арқылы баланың сөйлеу, ойлау мен әлеуметтік дағдылары дамиды.",
      },
      activities: {
        title: "Қосымша сабақтар",
        text: "Таэквондо, би, логопед, ал Әуезов филиалында — мектепке дайындық, вокал және фортепиано.",
      },
      cameras: {
        title: "Онлайн-камералар",
        text: "Ата-аналар күн ішінде баласының қалай уақыт өткізіп жатқанын көре алады.",
      },
    },
    photoAlt: "Erketai балабақшасындағы күн",
  },
  branches: {
    eyebrow: "Филиалдар",
    title: "Алматыдағы екі Erketai",
    lead: "Өзіңізге ыңғайлы филиалды таңдаңыз — әрқайсысының өз кестесі, қызметтері мен байланысы бар.",
    servicesTitle: "Не бар",
    activitiesTitle: "Қосымша сабақтар",
    extraService: "Қосымша қызмет",
    contactsTitle: "Байланыс",
    detailsFor: "Толығырақ",
    showDetails: "Қызметтер мен кесте",
    hideDetails: "Жасыру",
    photoAlt: "Erketai балабақшасының ғимараты",
  },
  branchShort: { alatau: "Алатау", auezov: "Әуезов" },
  groups: {
    eyebrow: "Топтар",
    title: "Әр филиалда — үш топ",
    lead: "Балалар 2 жастан 6 жасқа дейін қабылданады. Оқыту қазақ және орыс тілдерінде жүргізіледі.",
    group: (n) => `${n}-топ`,
    groupNote: "Ойын · Даму · Достық",
    note: "Топтардың құрамы және бос орындар туралы филиалдан біліңіз.",
  },
  food: {
    eyebrow: "Тамақтану",
    title: "Күніне бес мезгіл тамақ",
    lead: "Балалар күні бойы бес рет тамақтанады — бұл белсенді күнге қажетті күш береді.",
    count: "5",
    countLabel: "мезгіл тамақтану күн сайын",
    cards: {
      regular: { title: "Күн тәртібімен", text: "Тамақтану күн тәртібіне сай белгілі бір уақытта өтеді." },
      kids: { title: "Балаларға арналған", text: "Мәзір мектепке дейінгі жастағы балаларды ескере отырып құрылады." },
      together: { title: "Бірге дастарқан басында", text: "Балалар бірге тамақтанып, мәдениетті әдеттерге үйренеді." },
      ask: { title: "Мәзір туралы", text: "Апталық мәзір туралы толық ақпаратты филиалдан сұраңыз." },
    },
  },
  clubs: {
    eyebrow: "Үйірмелер",
    title: "Үйірмелер мен қосымша қызметтер",
    lead: "Әр филиалдағы сабақтар тізімі әртүрлі — филиалды таңдап, қолжетімді үйірмелерді қараңыз.",
    clubsLabel: "Үйірмелер мен мамандар",
    serviceLabel: "Қосымша қызмет",
    activities: {
      taekwondo: { title: "Таэквондо", text: "Күш, епті қимыл және тәртіпке баулу." },
      dance: { title: "Би", text: "Ырғақ сезімі, икемділік және көтеріңкі көңіл." },
      speech: { title: "Логопед", text: "Баланың дұрыс әрі анық сөйлеуін дамыту." },
      schoolPrep: { title: "Мектепке дайындық", text: "Мектепке сеніммен баруға көмектесетін сабақтар." },
      vocal: { title: "Вокал", text: "Ән айту, есту қабілеті мен дауысты дамыту." },
      piano: { title: "Фортепиано", text: "Музыкамен алғашқы танысу және аспапта ойнау." },
    },
    services: {
      transport: { title: "Балаларды тасымалдау", text: "Балаларды балабақшаға жеткізу қызметі. Шарттарын филиалдан біліңіз." },
    },
    ask: "Сабақтар кестесін сұрау",
  },
  gallery: {
    eyebrow: "Галерея",
    title: "Біздің күндеріміз",
    lead: "Erketai филиалдарындағы сәттер.",
    empty: "Фотосуреттер жақында қосылады",
    emptyHint: "Әзірге жаңалықтарымызды Instagram-нан көре аласыз.",
    open: "Фотоны үлкейту",
    close: "Жабу",
    prev: "Алдыңғы фото",
    next: "Келесі фото",
    photo: "Фото",
  },
  documents: {
    eyebrow: "Құжаттар",
    title: "Құжаттар",
    lead: "Филиалдардың ресми құжаттары Google Drive папкаларында орналастырылады.",
    folder: "Құжаттар папкасы",
    open: "Google Drive-та ашу",
    pending: "Сілтеме жақында қосылады",
    note: "Қажетті құжат бойынша сұрақтарыңызды филиалға WhatsApp арқылы жазыңыз.",
  },
  contacts: {
    eyebrow: "Байланыс",
    title: "Бізге келіңіз",
    lead: "Екі филиалдың мекенжайы, телефоны және жұмыс уақыты.",
    map: "2GIS картасы",
    mapTitle: (name) => `${name} — 2GIS картасы`,
    mapPending: "Мекенжайды 2GIS-те ашыңыз",
    route: "Маршрут",
  },
  enroll: {
    title: "Бізге жазылыңыз",
    text: "Филиалды таңдаңыз — WhatsApp-та дайын хабарлама ашылады.",
    message: (branch) => `Сәлеметсіз бе! Erketai балабақшасына (${branch}) баламды жаздырғым келеді.`,
    write: "WhatsApp-қа жазу",
  },
  footer: {
    tagline: "Бақытты балалық шақ мекені",
    rights: "Барлық құқықтар қорғалған.",
    up: "Жоғарыға",
  },
};

const ru: Dict = {
  meta: {
    title: "Erketai — место счастливого детства | Детский сад, Алматы",
    description:
      "Erketai — билингвальный детский сад в Алматы с двумя филиалами (Алатауский и Ауэзовский районы). 2–6 лет, казахский и русский языки, английский с носителем, пятиразовое питание, онлайн-камеры.",
  },
  skip: "Перейти к содержанию",
  nav: {
    home: "Главная",
    about: "О нас",
    branches: "Филиалы",
    groups: "Группы",
    food: "Питание",
    clubs: "Кружки",
    gallery: "Галерея",
    documents: "Документы",
    contacts: "Контакты",
    menu: "Открыть меню",
    close: "Закрыть меню",
    enroll: "Записаться",
    langLabel: "Выбор языка",
  },
  common: {
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    call: "Позвонить",
    address: "Адрес",
    phone: "Телефон",
    schedule: "Режим работы",
    groups: "Группы",
    ages: "Возраст детей",
    agesUnit: "лет",
    languages: "Языки обучения",
    languagesValue: "Казахский и русский",
    duty: "Дежурные группы",
    openIn: "Открыть",
    more: "Показать больше",
    less: "Свернуть",
    all: "Все",
    soon: "Скоро",
    photoSoon: "Фото скоро появится",
    selected: "Выбрано",
    choose: "Выбор филиала",
  },
  hero: {
    eyebrow: "Билингвальный детский сад в Алматы",
    titleLead: "Erketai —",
    titleAccent: "место счастливого детства",
    text: "Два филиала — в Алатауском и Ауэзовском районах. Воспитание и обучение детей 2–6 лет на казахском и русском языках, английский — с носителем языка.",
    enroll: "Записаться к нам",
    branches: "Смотреть филиалы",
    photoAlt: "Детский сад Erketai",
    badgeAges: "2–6 лет",
    badgeLangs: "ҚАЗ · РУС · ENG",
  },
  features: {
    branches: { title: "2 филиала", text: "Алатауский и Ауэзовский районы" },
    ages: { title: "2–6 лет", text: "Возраст детей" },
    langs: { title: "Казахский и русский", text: "Обучение на двух языках" },
    english: { title: "Английский", text: "С носителем языка" },
    meals: { title: "5 раз в день", text: "Пятиразовое питание" },
    cameras: { title: "Онлайн-камеры", text: "Для родителей" },
  },
  about: {
    eyebrow: "О нас",
    title: "Место, где ребёнок чувствует себя как дома",
    lead: "Erketai — частный детский сад в Алматы с двумя филиалами. Мы создаём условия, в которых дети приходят с радостью и с интересом узнают новое.",
    points: {
      bilingual: {
        title: "Билингвальное обучение",
        text: "Занятия проходят на казахском и русском языках, а английский ведёт носитель языка.",
      },
      atmosphere: {
        title: "Комфортная атмосфера",
        text: "Доброжелательная среда, понятный режим дня и внимание к каждому ребёнку.",
      },
      development: {
        title: "Развитие ребёнка",
        text: "Через игру, творчество и ежедневные занятия развиваются речь, мышление и социальные навыки.",
      },
      activities: {
        title: "Дополнительные занятия",
        text: "Таэквондо, танцы, логопед, а в Ауэзовском филиале — подготовка к школе, вокал и фортепиано.",
      },
      cameras: {
        title: "Онлайн-камеры",
        text: "Родители могут в течение дня видеть, как проводит время их ребёнок.",
      },
    },
    photoAlt: "День в детском саду Erketai",
  },
  branches: {
    eyebrow: "Филиалы",
    title: "Два Erketai в Алматы",
    lead: "Выберите удобный филиал — у каждого свой режим работы, услуги и контакты.",
    servicesTitle: "Что есть",
    activitiesTitle: "Дополнительные занятия",
    extraService: "Дополнительная услуга",
    contactsTitle: "Контакты",
    detailsFor: "Подробнее",
    showDetails: "Услуги и расписание",
    hideDetails: "Свернуть",
    photoAlt: "Здание детского сада Erketai",
  },
  branchShort: { alatau: "Алатау", auezov: "Ауэзов" },
  groups: {
    eyebrow: "Группы",
    title: "Три группы в каждом филиале",
    lead: "Принимаем детей от 2 до 6 лет. Обучение ведётся на казахском и русском языках.",
    group: (n) => `Группа ${n}`,
    groupNote: "Игра · Развитие · Дружба",
    note: "О составе групп и свободных местах уточняйте в филиале.",
  },
  food: {
    eyebrow: "Питание",
    title: "Пятиразовое питание",
    lead: "В течение дня дети питаются пять раз — это даёт силы для активного дня.",
    count: "5",
    countLabel: "приёмов пищи каждый день",
    cards: {
      regular: { title: "По режиму дня", text: "Приёмы пищи проходят в определённое время согласно режиму." },
      kids: { title: "Для детей", text: "Меню составляется с учётом дошкольного возраста детей." },
      together: { title: "Вместе за столом", text: "Дети едят вместе и привыкают к культуре питания." },
      ask: { title: "О меню", text: "Подробности о меню на неделю уточняйте в филиале." },
    },
  },
  clubs: {
    eyebrow: "Кружки",
    title: "Кружки и дополнительные услуги",
    lead: "Набор занятий в филиалах отличается — выберите филиал, чтобы увидеть доступные кружки.",
    clubsLabel: "Кружки и специалисты",
    serviceLabel: "Дополнительная услуга",
    activities: {
      taekwondo: { title: "Таэквондо", text: "Сила, ловкость и привычка к дисциплине." },
      dance: { title: "Танцы", text: "Чувство ритма, пластика и хорошее настроение." },
      speech: { title: "Логопед", text: "Развитие правильной и чёткой речи ребёнка." },
      schoolPrep: { title: "Подготовка к школе", text: "Занятия, которые помогают уверенно пойти в школу." },
      vocal: { title: "Вокал", text: "Пение, развитие слуха и голоса." },
      piano: { title: "Фортепиано", text: "Первое знакомство с музыкой и игрой на инструменте." },
    },
    services: {
      transport: { title: "Развозка детей", text: "Услуга доставки детей в детский сад. Условия уточняйте в филиале." },
    },
    ask: "Узнать расписание занятий",
  },
  gallery: {
    eyebrow: "Галерея",
    title: "Наши будни",
    lead: "Моменты из жизни филиалов Erketai.",
    empty: "Фотографии скоро появятся",
    emptyHint: "А пока новости можно посмотреть в нашем Instagram.",
    open: "Увеличить фото",
    close: "Закрыть",
    prev: "Предыдущее фото",
    next: "Следующее фото",
    photo: "Фото",
  },
  documents: {
    eyebrow: "Документы",
    title: "Документы",
    lead: "Официальные документы филиалов размещаются в папках Google Drive.",
    folder: "Папка с документами",
    open: "Открыть в Google Drive",
    pending: "Ссылка скоро появится",
    note: "Вопросы по нужному документу задайте филиалу в WhatsApp.",
  },
  contacts: {
    eyebrow: "Контакты",
    title: "Приходите к нам",
    lead: "Адреса, телефоны и режим работы обоих филиалов.",
    map: "Карта 2GIS",
    mapTitle: (name) => `${name} — карта 2GIS`,
    mapPending: "Откройте адрес в 2GIS",
    route: "Маршрут",
  },
  enroll: {
    title: "Записаться к нам",
    text: "Выберите филиал — в WhatsApp откроется готовое сообщение.",
    message: (branch) => `Здравствуйте! Хочу записать ребёнка в детский сад Erketai (${branch}).`,
    write: "Написать в WhatsApp",
  },
  footer: {
    tagline: "Место счастливого детства",
    rights: "Все права защищены.",
    up: "Наверх",
  },
};

export const dictionaries: Record<Lang, Dict> = { kk, ru };
