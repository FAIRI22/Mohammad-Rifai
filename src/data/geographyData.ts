import {
  GuideId,
  GuideCharacter,
  RegionInfo,
  CaseStudyLocation,
  LandformItem,
  ClimateZoneItem,
  CountryPopItem,
  ResourceCategory,
  QuizQuestion,
  GeoEnvironmentKey,
  ActiveGeoContext,
} from '../types/geography';

export const GEO_ENVIRONMENTS: Record<GeoEnvironmentKey, ActiveGeoContext> = {
  'ocean-global': {
    environment: 'ocean-global',
    regionLabel: 'Samudra & Horizon Dunia',
    wildlifeSummary: 'Paus Biru Samudra, Penyu Laut & Burung Migran',
  },
  'desert-sahara': {
    environment: 'desert-sahara',
    regionLabel: 'Gurun Sahara · Zona Arid',
    wildlifeSummary: 'Kafilah Unta Gurun & Elang Terbang',
  },
  'mountain-himalaya': {
    environment: 'mountain-himalaya',
    regionLabel: 'Pegunungan Tinggi Himalaya',
    wildlifeSummary: 'Kawanan Burung Migran Alpen & Elang Gunung',
  },
  'rainforest-amazon': {
    environment: 'rainforest-amazon',
    regionLabel: 'Hutan Hujan Tropis Amazon',
    wildlifeSummary: 'Burung Macaw, Tukan & Kupu-kupu Morpho',
  },
  'coast-tokyo': {
    environment: 'coast-tokyo',
    regionLabel: 'Teluk Tokyo & Samudra Pasifik',
    wildlifeSummary: 'Paus Biru Pasifik & Burung Camar Pesisir',
  },
  'continent-europe': {
    environment: 'continent-europe',
    regionLabel: 'Benua Eropa · Atlantik Utara',
    wildlifeSummary: 'Kawanan Angsa Migran & Camar Maritim',
  },
  'continent-africa': {
    environment: 'continent-africa',
    regionLabel: 'Benua Afrika · Sabana & Sungai Nil',
    wildlifeSummary: 'Kawanan Flamingo Sabana & Elang Afrika',
  },
  'continent-north-america': {
    environment: 'continent-north-america',
    regionLabel: 'Amerika Utara · Rocky & Samudra',
    wildlifeSummary: 'Elang Botak & Paus Bungkuk Pasifik',
  },
  'continent-oceania': {
    environment: 'continent-oceania',
    regionLabel: 'Oseania & Nusantara · Terumbu Karang',
    wildlifeSummary: 'Penyu Hijau, Pari Manta & Pelikan Laut',
  },
  'continent-antarctica': {
    environment: 'continent-antarctica',
    regionLabel: 'Antartika · Samudra Selatan',
    wildlifeSummary: 'Paus Biru Kutub, Albatros & Penguin',
  },
  'plains-river': {
    environment: 'plains-river',
    regionLabel: 'Dataran Subur & Lembah Sungai',
    wildlifeSummary: 'Kawanan Bangau Sungai, Layang-layang & Ikan',
  },
};

export const GUIDE_ORDER: GuideId[] = ['geo', 'maya', 'komodo', 'riko'];

export const getNextGuideId = (current: GuideId): GuideId => {
  const idx = GUIDE_ORDER.indexOf(current);
  return GUIDE_ORDER[(idx + 1) % GUIDE_ORDER.length];
};

// Animated Explorer Guides (Human Researchers + Animated Animal Companions)
export const GUIDES: Record<GuideId, GuideCharacter> = {
  geo: {
    id: 'geo',
    name: 'Pak Geo',
    role: 'Pemandu Lapangan & Geoscientist',
    badge: 'EXPEDITION CHIEF',
    avatar: '/src/assets/images/animated_guide_geo_1794884226060.jpg',
    bio: 'Peneliti geologi dan geomorfologi bersemangat yang memandu ekspedisi gunung api, lipatan kerak bumi, dan bentang alam dunia.',
    fieldGear: 'Kompas Prisma, Tablet Peta Lapangan, Jam Altimeter',
  },
  maya: {
    id: 'maya',
    name: 'Dr. Maya',
    role: 'Ahli Kartografi & Geografi Lingkungan',
    badge: 'LEAD CARTOGRAPHER',
    avatar: '/src/assets/images/animated_guide_maya_1794884226138.jpg',
    bio: 'Pakar Sistem Informasi Geografis (SIG) dan perubahan iklim global yang mengkhususkan diri pada pemetaan digital dan kelestarian ekosistem.',
    fieldGear: 'Tablet SIG Nusantara, Kompas Kartografi, Sensor Cuaca',
  },
  komodo: {
    id: 'komodo',
    name: 'Komo',
    role: 'Maskot Satwa Endemik Nusantara',
    badge: 'ANIMATED WILDLIFE GUIDE',
    avatar: '',
    animalId: 'komodo',
    speciesTag: 'Varanus komodoensis · Indonesia',
    bio: 'Komodo penjelajah yang ramah dengan topi safari dan kompas! Siap memandumu mengenal bentang alam sabana, pesisir, serta kekayaan fauna Nusantara & dunia.',
    fieldGear: 'Topi Penjelajah, Syal Kompas Nusantara, Peta Pulau',
  },
  riko: {
    id: 'riko',
    name: 'Riko',
    role: 'Penjelajah Udara & Rimba Tropis',
    badge: 'ANIMATED SKY SCOUT',
    avatar: '',
    animalId: 'riko',
    speciesTag: 'Ramphastos toco · Amazon',
    bio: 'Burung tukan penuh warna dari hutan hujan Amazon yang lincah memantau iklim, arah angin, tutupan kanopi hutan, dan batas benua dari ketinggian!',
    fieldGear: 'Bandana Navigasi Udara, Sensor Awan & Curah Hujan',
  },
};

export const IMAGES = {
  observatory: '/src/assets/images/geo_lab_observatory_1794279625424.jpg',
  biomesShowcase: '/src/assets/images/earth_biomes_showcase_1794279624823.jpg',
  worldMapDetailed: '/src/assets/images/world_physical_map_clean_1794882209716.jpg',
  guideExpeditionMap: '/src/assets/images/interactive_world_expedition_map_1794885020541.jpg',
  earthHorizon: '/src/assets/images/earth_planet_horizon_bg_1794882210894.jpg',
  natureValley: '/src/assets/images/earth_nature_valley_bg_1794882211257.jpg',
};

// 4 Iconic Case Studies for Scene 02 (Matching Storyboard)
export const CASE_STUDIES: CaseStudyLocation[] = [
  {
    id: 'sahara',
    title: 'Gurun (Sahara)',
    subtitle: 'Afrika Utara · Zona Iklim Arid Ekstrem',
    regionName: 'Afrika',
    category: 'Gurun',
    icon: '🏜️',
    imageUrl: '/src/assets/images/case_sahara_desert_1794885505861.jpg',
    wildlife: {
      animalId: 'fennec',
      name: 'Feni si Rubah Gurun',
      species: 'Vulpes zerda (Fennec Fox)',
      adaptationFact:
        'Telinga lebar Feni berfungsi melepaskan panas tubuh berlebih di siang terik Sahara dan mendeteksi mangsa di bawah pasir!',
    },
    coordinates: '23°24\'N, 12°39\'E',
    mapPin: { x: 51, y: 42 },
    climate: 'Arid Panas (< 100 mm hujan/tahun, suhu siang hingga 50°C)',
    elevation: '± 450 m dpl (Plato Gurun & Erg Berpasir)',
    summary:
      'Gurun panas terluas di muka Bumi (± 9,2 juta km²) yang membentang dari Samudra Atlantik hingga Laut Merah. Terbentuk akibat sabuk tekanan tinggi subtropis dan pengaruh angin pasat kering.',
    keyFindings: [
      'Amplitudo suhu harian sangat ekstrem: panas menyengat di siang hari, namun turun mendekati 0°C pada malam hari karena ketiadaan awan.',
      'Bentang alam didominasi erosi angin (eolian) berupa hamparan bukit pasir (erg), dataran kerikil (reg), dan oase mata air fosil.',
      'Adaptasi manusia melalui sistem irigasi bawah tanah tradisional, rute kafilah trans-Sahara, serta arsitektur tanah liat berdinding tebal.',
    ],
    humanImpact: 'Ancaman desertifikasi (penggurunan) di zona transisi Sahel akibat kekeringan dan penggembalaan berlebih.',
    accentColor: '#f59e0b',
  },
  {
    id: 'himalaya',
    title: 'Pegunungan Himalaya',
    subtitle: 'Asia Selatan · Atap Dunia & Lipatan Tektonik',
    regionName: 'Asia',
    category: 'Pegunungan',
    icon: '🏔️',
    imageUrl: '/src/assets/images/case_himalaya_mountains_1794885507040.jpg',
    wildlife: {
      animalId: 'snow-leopard',
      name: 'Sora si Macan Tutul Salju',
      species: 'Panthera uncia (Snow Leopard)',
      adaptationFact:
        'Bulu tebal bercorak abu-abu salju dan ekor panjang Sora menjaga keseimbangan serta kehangatan tubuh di ketinggian 4.500 m dpl!',
    },
    coordinates: '27°59\'N, 86°55\'E',
    mapPin: { x: 73, y: 37 },
    climate: 'Alpin & Salju Abadi (Suhu turun ±0,6°C per kenaikan 100 m)',
    elevation: 'Hingga 8.848,86 m dpl (Puncak Everest)',
    summary:
      'Rangkaian pegunungan tertinggi di planet Bumi yang terbentuk akibat tumbukan konvergen antara Lempeng Indo-Australia dan Lempeng Eurasia sejak puluhan juta tahun lalu.',
    keyFindings: [
      'Menjadi menara air (water tower) Asia yang menyuplai hulu sungai-sungai besar seperti Gangga, Indus, dan Brahmaputra.',
      'Membentuk efek bayangan hujan (rain shadow): lereng selatan India sangat basah oleh angin monsun, sedangkan Dataran Tinggi Tibet di utara menjadi kering.',
      'Memiliki zonasi iklim dan vegetasi bertingkat mulai dari hutan subtropis kaki gunung hingga zona salju abadi.',
    ],
    humanImpact: 'Pencairan gletser akibat pemanasan global memicu risiko banjir luapan danau glasial (GLOF) serta perubahan debit air bagi ratusan juta penduduk.',
    accentColor: '#38bdf8',
  },
  {
    id: 'amazon',
    title: 'Hutan Hujan (Amazon)',
    subtitle: 'Amerika Selatan · Paru-Paru Dunia Khatulistiwa',
    regionName: 'Amerika Selatan',
    category: 'Hutan Hujan',
    icon: '🌳',
    imageUrl: '/src/assets/images/case_amazon_rainforest_1794885507679.jpg',
    wildlife: {
      animalId: 'riko',
      name: 'Riko si Burung Tukan',
      species: 'Ramphastos toco (Toco Toucan)',
      adaptationFact:
        'Paruh besar Riko tidak berat karena berongga, membantu menjangkau buah di ujung dahan kanopi sekaligus mengatur panas tubuh tropis!',
    },
    coordinates: '03°27\'S, 62°12\'W',
    mapPin: { x: 31, y: 60 },
    climate: 'Hutan Hujan Tropis (26°C–28°C, curah hujan 2.500–3.500 mm/thn)',
    elevation: '0 – 200 m dpl (Dataran Rendah Aluvial)',
    summary:
      'Hutan hujan tropis terbesar di dunia (± 5,5 juta km²) yang menjadi rumah bagi sekitar 10% spesies makhluk hidup di Bumi dan menyerap miliaran ton karbon atmosfer.',
    keyFindings: [
      'Sungai Amazon menyumbang sekitar 20% dari seluruh aliran air tawar sungai dunia yang masuk ke lautan.',
      'Memiliki struktur tajuk berlapis rapat (emergent, kanopi, understory, lantai hutan) karena intensitas sinar matahari sepanjang tahun.',
      'Tanah hutan hujan sebenarnya miskin hara (latosol tercuci); kesuburan dipertahankan oleh daur ulang serasah daun yang sangat cepat.',
    ],
    humanImpact: 'Deforestasi untuk ekspansi perkebunan dan penebangan mengancam keanekaragaman hayati serta memengaruhi pola curah hujan regional.',
    accentColor: '#10b981',
  },
  {
    id: 'tokyo',
    title: 'Kota Besar (Tokyo)',
    subtitle: 'Asia Timur · Megapolitan & Cincin Api Pasifik',
    regionName: 'Asia',
    category: 'Megapolitan',
    icon: '🏙️',
    imageUrl: '/src/assets/images/case_tokyo_megapolis_1794885507350.jpg',
    wildlife: {
      animalId: 'hachi',
      name: 'Hachi si Shiba Penjelajah',
      species: 'Shiba Inu · Sahabat Kota Jepang',
      adaptationFact:
        'Di megapolitan padat seperti Tokyo, ruang terbuka hijau perkotaan & jalur evakuasi ramah komunitas menjadi habitat vital manusia dan hewan peliharaan!',
    },
    coordinates: '35°40\'N, 139°41\'E',
    mapPin: { x: 86.5, y: 34 },
    climate: 'Subtropis Lembap (4 Musim dengan Musim Panas Basah & Taifun)',
    elevation: '0 – 40 m dpl (Dataran Kanto & Teluk Tokyo)',
    summary:
      'Wilayah metropolitan terpadat di dunia (± 37 juta jiwa di Greater Tokyo) yang berkembang di atas dataran aluvial pesisir sekaligus zona pertemuan aktif 3 lempeng tektonik.',
    keyFindings: [
      'Aglomerasi penduduk sangat tinggi ditopang oleh jaringan transportasi rel berkecepatan tinggi dan tata ruang vertikal yang efisien.',
      'Berada di jalur Cincin Api Pasifik sehingga mewajibkan standar konstruksi bangunan tahan gempa (seismic isolation) dan sistem peringatan dini tsunami.',
      'Menghadapi fenomena Urban Heat Island dan kenaikan muka air laut dengan membangun terowongan penampung banjir raksasa bawah tanah (G-Cans).',
    ],
    humanImpact: 'Contoh nyata bagaimana masyarakat modern beradaptasi dengan risiko bencana alam tektonik dan kepadatan urbanisasi melalui rekayasa teknologi.',
    accentColor: '#f43f5e',
  },
];

// 7 Continents / Regions for Scene 04 (Peta Dunia)
export const REGIONS: RegionInfo[] = [
  {
    id: 'asia',
    name: 'Asia',
    englishName: 'Asia',
    area: '44.579.000 km²',
    population: '± 4,7 Milyar Jiwa (60% Dunia)',
    highestPoint: 'Puncak Everest (8.848,86 m dpl)',
    longestRiver: 'Sungai Yangtze (6.300 km)',
    dominantClimate: 'Monsun Tropis, Subtropis, Gurun Kering, hingga Kutub Dingin Siberia',
    description:
      'Benua terbesar dan terpadat di dunia. Memiliki bentang alam paling ekstrem dari palung terdalam hingga pegunungan tertinggi Himalaya.',
    geographicFacts: [
      'Menampung lebih dari 60% populasi total planet Bumi.',
      'Dikelilingi kawasan seismik aktif Ring of Fire (Cincin Api Pasifik).',
      'Memiliki Danau Baikal, danau air tawar terdalam dan tertua di Bumi.',
      'Gurun Gobi di pedalaman Asia memiliki rentang suhu ekstrem dari -40°C hingga +45°C.',
    ],
    keyCountries: ['Indonesia', 'Tiongkok', 'India', 'Jepang', 'Arab Saudi'],
    mapPin: { x: 74, y: 31 },
    svgPath:
      'M404 72 L438 52 L492 44 L558 50 L628 64 L646 78 L612 94 L608 118 L586 138 L560 158 L546 184 L528 190 L516 168 L502 182 L490 154 L462 150 L446 170 L422 156 L402 142 L396 118 L404 94 Z M598 106 L610 100 L616 114 L602 124 Z M528 202 L556 196 L568 208 L542 214 Z M572 198 L592 196 L594 210 L574 210 Z',
    pinCoordinates: '34°02\'N, 100°53\'E',
    hypsometricColor: '#d97706',
    storyboardColor: '#facc15',
    elevationZone: 'Dataran Tinggi Plato & Atap Dunia Himalaya (0 - 8.848 m)',
    themeClass: 'border-amber-500/70 bg-amber-950/40 text-amber-300',
  },
  {
    id: 'eropa',
    name: 'Eropa',
    englishName: 'Europe',
    area: '10.180.000 km²',
    population: '± 746 Juta Jiwa',
    highestPoint: 'Gunung Elbrus (5.642 m dpl)',
    longestRiver: 'Sungai Volga (3.530 km)',
    dominantClimate: 'Maritim Pantai Barat (Gulf Stream), Mediterania, Kontinental',
    description:
      'Benua semenanjung dengan garis pantai terpotong-potong tajam dan teluk-teluk dalam. Dipengaruhi oleh Arus Hangat Atlantik Utara (Gulf Stream) sehingga suhunya lebih bersahabat.',
    geographicFacts: [
      'Garis pantainya sangat panjang dibanding luasnya (± 37.000 km).',
      'Kawasan Mediterania memiliki iklim khas: musim panas kering dan musim dingin sejuk berhujan.',
      'Fjord di Norwegia merupakan bentang alam lembah glasial yang terendam air laut.',
      'Pegunungan Alpen menjadi batas iklim penting antara Eropa tengah dan kawasan Mediterania.',
    ],
    keyCountries: ['Jerman', 'Prancis', 'Inggris', 'Italia', 'Norwegia'],
    mapPin: { x: 53, y: 23 },
    svgPath:
      'M328 108 L338 92 L354 78 L368 58 L392 56 L406 72 L404 106 L388 118 L372 114 L362 124 L350 118 L334 122 L322 118 Z M318 88 L328 84 L330 98 L318 98 Z',
    pinCoordinates: '54°54\'N, 25°19\'E',
    hypsometricColor: '#0284c7',
    storyboardColor: '#a855f7',
    elevationZone: 'Dataran Rendah Eropa Utara & Rantai Alpen Glasial (0 - 5.642 m)',
    themeClass: 'border-purple-500/70 bg-purple-950/40 text-purple-300',
  },
  {
    id: 'afrika',
    name: 'Afrika',
    englishName: 'Africa',
    area: '30.370.000 km²',
    population: '± 1,4 Milyar Jiwa',
    highestPoint: 'Gunung Kilimanjaro (5.895 m dpl)',
    longestRiver: 'Sungai Nil (6.650 km)',
    dominantClimate: 'Tropis Khatulistiwa, Arid / Gurun Panas, Semiarid Sabana',
    description:
      'Benua tertua dengan bentang alam Great Rift Valley, Gurun Sahara, dan sabana Serengeti yang kaya keanekaragaman satwa.',
    geographicFacts: [
      'Gurun Sahara adalah gurun panas terluas di dunia (± 9,2 juta km²).',
      'Sungai Nil menjadi urat nadi peradaban manusia sejak ribuan tahun silam.',
      'Satu-satunya benua yang membentang dari zona iklim sedang utara hingga zona iklim sedang selatan melewati khatulistiwa.',
      'Lembah Celah Besar (Great Rift Valley) merupakan retakan kerak bumi tektonik terpanjang.',
    ],
    keyCountries: ['Mesir', 'Afrika Selatan', 'Nigeria', 'Kenya', 'Maroko'],
    mapPin: { x: 54, y: 54 },
    svgPath:
      'M324 142 L352 130 L392 134 L408 158 L428 176 L418 206 L402 246 L380 274 L362 254 L354 214 L344 188 L318 178 L314 156 Z M418 232 L426 226 L428 248 L418 252 Z',
    pinCoordinates: '01°16\'S, 23°36\'E',
    hypsometricColor: '#ea580c',
    storyboardColor: '#fb923c',
    elevationZone: 'Dataran Plato Luas, Gurun Pasir & Kaldera Vulkanik (0 - 5.895 m)',
    themeClass: 'border-orange-500/70 bg-orange-950/40 text-orange-300',
  },
  {
    id: 'amerika-utara',
    name: 'Amerika Utara',
    englishName: 'North America',
    area: '24.709.000 km²',
    population: '± 592 Juta Jiwa',
    highestPoint: 'Denali / Gunung McKinley (6.190 m dpl)',
    longestRiver: 'Sungai Mississippi-Missouri (6.275 km)',
    dominantClimate: 'Arktik Kutub, Kontinental Dingin, Sedang, hingga Tropis Karibia',
    description:
      'Membentang dari es Arktik Greenland hingga perbatasan tropis Panama. Memiliki sistem Danau-Danau Besar (Great Lakes) yang menyimpan 21% cadangan air tawar permukaan dunia.',
    geographicFacts: [
      'Sistem Great Lakes menampung cadangan air tawar cair terbesar di Amerika Utara.',
      'Grand Canyon terbentuk oleh erosi jutaan tahun dari aliran Sungai Colorado.',
      'Kawasan Tornado Alley di dataran tengah merupakan area pembentukan tornado terbanyak di dunia.',
      'Pegunungan Rocky membentang sepanjang 4.800 km dari Kanada hingga New Mexico.',
    ],
    keyCountries: ['Kanada', 'Amerika Serikat', 'Meksiko', 'Kuba', 'Guatemala'],
    mapPin: { x: 23, y: 29 },
    svgPath:
      'M58 66 L104 46 L166 42 L214 58 L236 86 L216 114 L188 136 L172 162 L182 182 L168 186 L146 168 L128 144 L112 126 L88 112 L68 88 Z M234 28 L278 24 L290 52 L256 76 L236 58 Z',
    pinCoordinates: '54°31\'N, 105°15\'W',
    hypsometricColor: '#16a34a',
    storyboardColor: '#38bdf8',
    elevationZone: 'Cekungan Great Plains & Rangkaian Rocky Mountains (0 - 6.190 m)',
    themeClass: 'border-sky-500/70 bg-sky-950/40 text-sky-300',
  },
  {
    id: 'amerika-selatan',
    name: 'Amerika Selatan',
    englishName: 'South America',
    area: '17.840.000 km²',
    population: '± 434 Juta Jiwa',
    highestPoint: 'Aconcagua (6.961 m dpl)',
    longestRiver: 'Sungai Amazon (6.400 km - Debit Terbesar di Dunia)',
    dominantClimate: 'Hutan Hujan Tropis Amazon, Sabana, Stepa, dan Arid Atacama',
    description:
      'Rumah bagi paru-paru dunia Lembah Amazon dan tulang punggung Pegunungan Andes. Gurun Atacama di Chili tercatat sebagai tempat terkering di permukaan Bumi.',
    geographicFacts: [
      'Lembah Amazon menghasilkan sekitar 20% oksigen dunia dan menyimpan 10% spesies terdaftar.',
      'Pegunungan Andes adalah rantai pegunungan benua terpanjang di dunia (± 7.000 km).',
      'Gurun Atacama memiliki beberapa titik pemantau cuaca yang belum pernah mencatat hujan terukur.',
      'Air Terjun Angel di Venezuela adalah air terjun tanpa henti tertinggi di dunia (979 m).',
    ],
    keyCountries: ['Brasil', 'Argentina', 'Kolombia', 'Peru', 'Chili'],
    mapPin: { x: 32, y: 66 },
    svgPath:
      'M184 186 L218 182 L248 202 L262 224 L248 258 L226 296 L212 322 L202 316 L198 274 L184 234 L176 204 Z',
    pinCoordinates: '08°46\'S, 55°29\'W',
    hypsometricColor: '#059669',
    storyboardColor: '#4ade80',
    elevationZone: 'Dataran Aluvial Amazon & Barisan Andes Terjal (0 - 6.961 m)',
    themeClass: 'border-teal-500/70 bg-teal-950/40 text-teal-300',
  },
  {
    id: 'australia',
    name: 'Oseania / Australia',
    englishName: 'Australia & Oceania',
    area: '8.600.000 km²',
    population: '± 44 Juta Jiwa',
    highestPoint: 'Gunung Kosciuszko (2.228 m dpl)',
    longestRiver: 'Sistem Sungai Murray-Darling (3.672 km)',
    dominantClimate: 'Arid / Semiarid Outback di Tengah, Tropis di Utara, Sedang di Tenggara',
    description:
      'Benua terkecil sekaligus pulau terbesar di dunia. Terisolasi secara evolusi selama jutaan tahun sehingga menghasilkan fauna marsupial dan monotremata endemik.',
    geographicFacts: [
      'Great Barrier Reef adalah struktur organisme hidup terbesar di dunia yang terlihat dari luar angkasa.',
      'Hampir 70% daratan Australia merupakan kawasan arid atau semi-arid yang disebut Outback.',
      'Merupakan benua paling datar dan paling tua secara geologis dengan tanah miskin hara.',
      'Memiliki satwa endemik unik seperti Kanguru, Koala, Platipus, dan Wombat.',
    ],
    keyCountries: ['Australia', 'Selandia Baru', 'Papua Nugini', 'Fiji'],
    mapPin: { x: 85, y: 71 },
    svgPath:
      'M542 232 L578 218 L608 232 L616 262 L594 282 L566 274 L536 272 L528 252 Z M626 274 L638 264 L642 276 L628 286 Z',
    pinCoordinates: '25°16\'S, 133°46\'E',
    hypsometricColor: '#dc2626',
    storyboardColor: '#f472b6',
    elevationZone: 'Perisai Tanah Merah Tua Outback & Great Dividing Range (0 - 2.228 m)',
    themeClass: 'border-pink-500/70 bg-pink-950/40 text-pink-300',
  },
  {
    id: 'antartika',
    name: 'Antartika',
    englishName: 'Antarctica',
    area: '14.200.000 km²',
    population: '0 Penduduk Tetap (± 1.000 - 5.000 Ilmuwan)',
    highestPoint: 'Vinson Massif (4.892 m dpl)',
    longestRiver: 'Sungai Onyx (Gletser Meleleh - 32 km)',
    dominantClimate: 'Kutub Es Abadi (Suhu terendah pernah tercatat -89.2°C)',
    description:
      'Benua paling dingin, paling kering (gurun es), dan paling berangin di Bumi. Mengandung sekitar 90% dari seluruh lapisan es dunia dan 70% air tawar planet.',
    geographicFacts: [
      'Meskipun tertutup es setebal rata-rata 2 kilometer, Antartika secara teknis adalah gurun terbesar di dunia karena curah presipitasi tahunan yang sangat rendah.',
      'Tidak memiliki negara pemilik; diatur oleh Traktat Antartika untuk riset ilmiah damai.',
      'Suhu terendah di permukaan Bumi tercatat di Stasiun Vostok (-89,2°C).',
      'Pengaruh gaya gravitasi massa es Antartika memengaruhi rotasi dan permukaan laut bumi.',
    ],
    keyCountries: ['Stasiun Riset Internasional (Traktat Antartika)'],
    mapPin: { x: 50, y: 92 },
    svgPath: 'M140 332 L250 322 L380 326 L520 322 L600 334 L580 352 L160 352 Z',
    pinCoordinates: '90°00\'S, 00°00\'E',
    hypsometricColor: '#38bdf8',
    storyboardColor: '#e2e8f0',
    elevationZone: 'Kubah Es Glasial Benua & Pegunungan Transantarktika (0 - 4.892 m)',
    themeClass: 'border-slate-400/70 bg-slate-900/60 text-slate-200',
  },
];

// 6 Landforms for Scene 05 (Matching Storyboard: Pegunungan, Gurun, Hutan Hujan, Dataran, Sungai, Pesisir)
export const LANDFORMS: LandformItem[] = [
  {
    id: 'pegunungan',
    name: 'Pegunungan',
    icon: '🏔️',
    imageUrl: '/src/assets/images/case_himalaya_mountains_1794885507040.jpg',
    shortTag: '> 1.000 m dpl',
    wildlife: {
      animalId: 'snow-leopard',
      name: 'Sora (Macan Tutul Salju)',
      species: 'Fauna Alpin Pegunungan Tinggi',
      adaptationFact:
        'Memiliki rongga hidung lebar untuk menghirup oksigen tipis dan telapak kaki berbulu lebat agar tidak terperosok di salju.',
    },
    elevation: '> 1.000 – 8.848 m dpl',
    process: 'Tenaga Endogen (Tumbukan Lempeng & Vulkanisme)',
    description:
      'Bentang alam elevasi tinggi dengan puncak menjulang dan lereng curam. Memengaruhi suhu lokal, hujan orografis, serta menjadi hulu bagi sistem sungai besar.',
    examplesGlobal: 'Himalaya (Asia), Andes (Amerika Selatan), Alpen (Eropa)',
    examplesIndonesia: 'Pegunungan Jayawijaya (Papua), Bukit Barisan (Sumatra)',
    humanActivity: 'Pertanian terasering sayuran dataran tinggi, pembangkit listrik tenaga air/panas bumi, dan ekowisata.',
    accentColor: '#94a3b8',
  },
  {
    id: 'gurun',
    name: 'Gurun',
    icon: '🏜️',
    imageUrl: '/src/assets/images/case_sahara_desert_1794885505861.jpg',
    shortTag: 'Iklim Arid (<250 mm)',
    wildlife: {
      animalId: 'fennec',
      name: 'Feni (Rubah Gurun)',
      species: 'Fauna Nokturnal Zona Arid',
      adaptationFact:
        'Aktif berburu di malam hari yang sejuk dan memanfaatkan telinga besar untuk pendinginan tubuh tanpa kehilangan banyak cairan.',
    },
    elevation: '0 – 1.500 m dpl (Plato & Cekungan Kering)',
    process: 'Tenaga Eksogen Angin (Eolian) & Sabuk Tekanan Tinggi Subtropis',
    description:
      'Wilayah gersang dengan curah hujan < 250 mm/tahun dan laju penguapan sangat tinggi. Ditandai hamparan bukit pasir (barchan) dan amplitudo suhu harian ekstrem.',
    examplesGlobal: 'Sahara (Afrika), Gobi (Asia), Atacama (Amerika Selatan)',
    examplesIndonesia: 'Gumuk Pasir Parangkusumo (Yogyakarta — tipe gumuk pesisir)',
    humanActivity: 'Permukiman terpusat di sekitar oase, irigasi bawah tanah, energi surya skala raksasa, dan pertambangan.',
    accentColor: '#f59e0b',
  },
  {
    id: 'hutan-hujan',
    name: 'Hutan Hujan',
    icon: '🌳',
    imageUrl: '/src/assets/images/case_amazon_rainforest_1794885507679.jpg',
    shortTag: 'Kanopi Khatulistiwa',
    wildlife: {
      animalId: 'riko',
      name: 'Riko (Burung Tukan)',
      species: 'Fauna Kanopi Hutan Tropis',
      adaptationFact:
        'Berperan penting sebagai penyebar biji buah hutan hujan tropis sehingga regenerasi pohon kanopi tetap terjaga.',
    },
    elevation: '0 – 800 m dpl (Zona Khatulistiwa)',
    process: 'Curah Hujan Tinggi Merata & Radiasi Matahari Sepanjang Tahun',
    description:
      'Ekosistem berkanopi rapat dengan keanekaragaman hayati tertinggi di planet Bumi. Menyerap karbon dioksida, memproduksi oksigen, dan menjaga keseimbangan tata air.',
    examplesGlobal: 'Lembah Amazon (Brasil), Cekungan Kongo (Afrika)',
    examplesIndonesia: 'Hutan Hujan Tropis Kalimantan, Sumatra, dan Papua',
    humanActivity: 'Pengelolaan hasil hutan non-kayu, agroforestri masyarakat adat, riset farmasi hayati, dan konservasi.',
    accentColor: '#10b981',
  },
  {
    id: 'dataran',
    name: 'Dataran',
    icon: '🌾',
    imageUrl: '/src/assets/images/landform_dataran_plains_1794885916023.jpg',
    shortTag: '0 – 200 m dpl',
    wildlife: {
      animalId: 'deer',
      name: 'Dara (Rusa Dataran)',
      species: 'Herbivora Padang Rumput & Lembah Subur',
      adaptationFact:
        'Berkembang baik di dataran landai yang kaya rerumputan dan semak pangan, menjadi penyeimbang rantai makanan darat.',
    },
    elevation: '0 – 200 m dpl (Dataran Rendah & Aluvial)',
    process: 'Sedimentasi Fluvial Sungai & Erosi Jangka Panjang',
    description:
      'Wilayah relatif datar yang luas dan mudah diakses. Memiliki lapisan tanah aluvial atau vulkanik yang subur sehingga menjadi pusat permukiman terpadat manusia.',
    examplesGlobal: 'Great Plains (Amerika Utara), Dataran Indo-Gangga (India)',
    examplesIndonesia: 'Dataran Rendah Pantura Jawa, Dataran Rendah Sumatra Timur',
    humanActivity: 'Sentra pertanian pangan (padi, gandum), kota metropolis, kawasan industri, dan jaringan jalan/kereta api.',
    accentColor: '#84cc16',
  },
  {
    id: 'sungai',
    name: 'Sungai',
    icon: '🏞️',
    imageUrl: '/src/assets/images/landform_sungai_river_1794885915685.jpg',
    shortTag: 'Hulu ke Muara',
    wildlife: {
      animalId: 'otter',
      name: 'Beri (Berang-berang Sungai)',
      species: 'Fauna Indikator Kesehatan Air Tawar',
      adaptationFact:
        'Bulu berlapis dua yang kedap air dan kaki berselaput membuatnya lincah berenang di sungai bersih; kehadirannya menandakan DAS masih sehat.',
    },
    elevation: 'Mengalir dari Hulu Pegunungan ke Hilir Muara (0 m)',
    process: 'Erosi Air Mengalir, Transportasi Sedimen, & Pembentukan Meander/Delta',
    description:
      'Aliran air tawar alami yang menghubungkan ekosistem hulu dan hilir dalam satu Daerah Aliran Sungai (DAS). Bagian hulu berarus deras, sedangkan hilir membentuk kelokan (meander).',
    examplesGlobal: 'Sungai Nil (Afrika), Sungai Amazon (Amerika Selatan), Yangtze (Asia)',
    examplesIndonesia: 'Sungai Kapuas (Kalimantan), Bengawan Solo (Jawa), Musi (Sumatra)',
    humanActivity: 'Irigasi pertanian, sumber air baku perkotaan, jalur transportasi air pedalaman, dan perikanan darat.',
    accentColor: '#0ea5e9',
  },
  {
    id: 'pesisir',
    name: 'Pesisir',
    icon: '🏖️',
    imageUrl: '/src/assets/images/landform_pesisir_coastal_1794885916735.jpg',
    shortTag: '0 m (Zona Litoral)',
    wildlife: {
      animalId: 'turtle',
      name: 'Peni (Penyu Hijau Pesisir)',
      species: 'Fauna Migrasi Laut & Pantai Berpasir',
      adaptationFact:
        'Menempuh ribuan kilometer melintasi samudra dan kembali ke pantai berpasir tempatnya menetas dengan memanfaatkan medan magnet Bumi.',
    },
    elevation: '0 m dpl (Zona Peralihan Darat & Laut)',
    process: 'Gelombang Laut (Abrasi/Sedimentasi), Pasang Surut, & Ekosistem Mangrove',
    description:
      'Zona pertemuan antara daratan dan lautan yang sangat dinamis. Meliputi pantai berpasir, tebing karang, muara estuari, hutan bakau (mangrove), dan terumbu karang.',
    examplesGlobal: 'Great Barrier Reef (Australia), Fjord Norwegia (Eropa)',
    examplesIndonesia: 'Kepulauan Raja Ampat (Papua), Pantai Selatan Jawa, Pesisir Timur Sumatra',
    humanActivity: 'Pelabuhan perdagangan internasional, perikanan tangkap & tambak, pariwisata bahari, serta mitigasi abrasi.',
    accentColor: '#06b6d4',
  },
];

// 4 World Climate Zones for Scene 05 (Matching Storyboard)
export const CLIMATE_ZONES: ClimateZoneItem[] = [
  {
    id: 'tropis',
    name: 'Tropis',
    avgTemp: '±27°C',
    icon: '☀️',
    latitudeBand: '23,5° LU – 23,5° LS (Sekitar Khatulistiwa)',
    rainfall: 'Tinggi (1.500 – 4.000 mm/thn)',
    characteristics: 'Suhu hangat sepanjang tahun, amplitudo suhu tahunan kecil, hanya memiliki 2 musim utama (hujan dan kemarau).',
    vegetation: 'Hutan hujan tropis, hutan musim, dan sabana tropis.',
    accentClass: 'border-amber-500/70 bg-amber-950/35 text-amber-300',
  },
  {
    id: 'sedang',
    name: 'Sedang',
    avgTemp: '±15°C',
    icon: '⛅',
    latitudeBand: '35° – 60° LU & LS',
    rainfall: 'Merata Sepanjang Tahun (600 – 1.500 mm/thn)',
    characteristics: 'Mengalami pergantian 4 musim yang jelas: semi, panas, gugur, dan dingin. Dipengaruhi oleh angin barat dan arus samudra.',
    vegetation: 'Hutan gugur berdaun lebar (ek, maple) dan padang rumput stepa/prairi.',
    accentClass: 'border-sky-500/70 bg-sky-950/35 text-sky-300',
  },
  {
    id: 'dingin',
    name: 'Dingin',
    avgTemp: '±0°C',
    icon: '❄️',
    latitudeBand: '60° – 90° LU & LS (Lingkar Kutub)',
    rainfall: 'Sangat Rendah (< 250 mm/thn, berupa salju)',
    characteristics: 'Musim dingin sangat panjang dan gelap, musim panas amat singkat. Tanah sering membeku permanen (permafrost).',
    vegetation: 'Hutan taiga berdaun jarum (konifer), lumut kerak, dan tundra kutub.',
    accentClass: 'border-cyan-400/70 bg-cyan-950/35 text-cyan-200',
  },
  {
    id: 'subtropis',
    name: 'Subtropis',
    avgTemp: '±20°C',
    icon: '🌧️',
    latitudeBand: '23,5° – 35° LU & LS',
    rainfall: 'Bervariasi (Iklim Mediterania vs Gurun Subtropis)',
    characteristics: 'Daerah peralihan antara tropis dan sedang. Musim panas terik dan musim dingin sejuk atau lembap (sering dilanda taifun/angin musiman).',
    vegetation: 'Semak belukar Mediterania (zaitun, anggur), kaktus gurun, hingga hutan cemara lembap.',
    accentClass: 'border-emerald-500/70 bg-emerald-950/35 text-emerald-300',
  },
];

// Top 10 Most Populous Countries for Scene 06 (Matching Storyboard)
export const TOP_COUNTRIES_POP: CountryPopItem[] = [
  { rank: 1, name: 'India', continent: 'Asia', populationMillions: 1441, densityPerKm2: 485, highlight: 'Negara dengan jumlah penduduk terbanyak di dunia saat ini.' },
  { rank: 2, name: 'Tiongkok', continent: 'Asia', populationMillions: 1410, densityPerKm2: 150, highlight: 'Terkonsentrasi tinggi di wilayah pesisir timur yang subur.' },
  { rank: 3, name: 'Amerika Serikat', continent: 'Amerika Utara', populationMillions: 342, densityPerKm2: 37, highlight: 'Populasi urban tinggi di koridor pantai timur & barat.' },
  { rank: 4, name: 'Indonesia', continent: 'Asia', populationMillions: 281, densityPerKm2: 151, highlight: 'Kepulauan terpadat, ±56% penduduk bermukim di Pulau Jawa.' },
  { rank: 5, name: 'Pakistan', continent: 'Asia', populationMillions: 245, densityPerKm2: 318, highlight: 'Terpusat di lembah subur sistem Sungai Indus.' },
  { rank: 6, name: 'Nigeria', continent: 'Afrika', populationMillions: 229, densityPerKm2: 251, highlight: 'Negara berpenduduk terbesar dan pertumbuhan tercepat di Afrika.' },
  { rank: 7, name: 'Brasil', continent: 'Amerika Selatan', populationMillions: 217, densityPerKm2: 26, highlight: 'Mayoritas penduduk tinggal di sepanjang pesisir Atlantik.' },
  { rank: 8, name: 'Bangladesh', continent: 'Asia', populationMillions: 174, densityPerKm2: 1333, highlight: 'Salah satu negara besar dengan kepadatan penduduk tertinggi di delta sungai.' },
  { rank: 9, name: 'Rusia', continent: 'Eropa / Asia', populationMillions: 144, densityPerKm2: 9, highlight: 'Wilayah terluas di bumi dengan kepadatan sangat rendah di Siberia.' },
  { rank: 10, name: 'Meksiko', continent: 'Amerika Utara', populationMillions: 129, densityPerKm2: 67, highlight: 'Terkonsentrasi di dataran tinggi tengah (Lembah Meksiko).' },
];

// 4 Natural Resources & Environmental Conditions for Scene 06 (Matching Storyboard)
export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: 'hutan',
    name: 'Hutan',
    icon: '🌳',
    status: 'Sedang',
    goodPct: 45,
    moderatePct: 35,
    criticalPct: 20,
    summary: 'Sumber daya hayati pengatur tata air, penyimpan karbon global, dan habitat biodiversitas.',
    challenges: 'Laju deforestasi akibat konversi lahan pertanian, pembalakan liar, dan kebakaran hutan saat El Niño.',
    conservationSolution: 'Reboisasi kawasan hulu, sistem tebang pilih tanam Indonesia (TPTI), dan perhutanan sosial berkelanjutan.',
    indonesiaExample: 'Taman Nasional Gunung Leuser (Sumatra) & Taman Nasional Tanjung Puting (Kalimantan).',
  },
  {
    id: 'air',
    name: 'Air',
    icon: '💧',
    status: 'Kritis',
    goodPct: 32,
    moderatePct: 38,
    criticalPct: 30,
    summary: 'Kebutuhan vital biologis, irigasi pangan, pembangkit energi listrik (PLTA), dan industri.',
    challenges: 'Pencemaran limbah domestik/industri di sungai, alih fungsi daerah resapan menjadi beton, dan krisis air bersih kemarau.',
    conservationSolution: 'Perlindungan sempadan sungai, pembuatan biopori & sumur resapan kota, serta pengelolaan DAS terpadu.',
    indonesiaExample: 'Revitalisasi DAS Citarum (Jawa Barat) & Danau Toba (Sumatra Utara).',
  },
  {
    id: 'mineral',
    name: 'Mineral',
    icon: '🪨',
    status: 'Sedang',
    goodPct: 40,
    moderatePct: 40,
    criticalPct: 20,
    summary: 'Sumber daya alam tak terbarukan seperti nikel, tembaga, bauksit, timah, batu bara, dan minyak bumi.',
    challenges: 'Kerusakan morfologi lahan bekas tambang terbuka, air asam tambang, dan ketergantungan energi fosil.',
    conservationSolution: 'Reklamasi wajib lahan pascatambang, hilirisasi industri bersih, serta transisi menuju energi terbarukan.',
    indonesiaExample: 'Pertambangan nikel Morowali (Sulawesi) & timah Bangka Belitung.',
  },
  {
    id: 'pangan',
    name: 'Pangan',
    icon: '🌾',
    status: 'Baik',
    goodPct: 58,
    moderatePct: 28,
    criticalPct: 14,
    summary: 'Ketersediaan bahan makanan pokok (padi, gandum, jagung, perikanan) untuk menopang populasi global.',
    challenges: 'Alih fungsi lahan sawah produktif menjadi kawasan permukiman dan ketidakpastian musim panen akibat perubahan iklim.',
    conservationSolution: 'Intensifikasi pertanian presisi, perlindungan Lahan Pertanian Pangan Berkelanjutan (LP2B), dan diversifikasi pangan.',
    indonesiaExample: 'Lumbung padi Karawang (Jawa Barat), Sulawesi Selatan, dan pengembangan sagu Maluku-Papua.',
  },
];

// Main Features shown in Scene 03 (Panduan)
export const GUIDE_FEATURES = [
  {
    id: 'peta',
    title: 'Peta Dunia',
    icon: '🌐',
    desc: 'Eksplorasi 7 benua dan 5 samudra melalui peta fisik beresolusi tinggi dan mode skema benua berwarna.',
    targetScene: 3,
  },
  {
    id: 'kompas',
    title: 'Kompas & Legenda',
    icon: '🧭',
    desc: 'Dilengkapi penunjuk arah mata angin (N-E-S-W) dan skala warna hipsometri ketinggian daratan serta laut.',
    targetScene: 3,
  },
  {
    id: 'zoom',
    title: 'Zoom & Navigasi',
    icon: '🔍',
    desc: 'Perbesar tampilan peta hingga 2.2x dan geser untuk mengamati garis pantai, pegunungan, dan pulau kecil.',
    targetScene: 3,
  },
  {
    id: 'info',
    title: 'Kartu Informasi',
    icon: 'ℹ️',
    desc: 'Setiap lokasi dan bentang alam memiliki kartu data geografis lengkap: elevasi, iklim, dan fakta unik.',
    targetScene: 4,
  },
  {
    id: 'progress',
    title: 'Checklist & Evaluasi',
    icon: '📊',
    desc: 'Pantau misi ekspedisimu di Checklist Ekspedisi hingga tuntas dan raih Lencana Penjelajah Geografi.',
    targetScene: 6,
  },
];

// 5 Comprehensive Evaluation Quiz Questions for Scene 08
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apa faktor utama yang menyebabkan vegetasi Gurun Sahara berbeda drastis dari Hutan Hujan Amazon?',
    options: [
      'Perbedaan jumlah curah hujan tahunan dan tingkat penguapan (evapotranspirasi)',
      'Perbedaan garis bujur dan pembagian zona waktu wilayah',
      'Jumlah penduduk negara yang mendiami wilayah tersebut',
      'Warna batuan dasar geologi saja',
    ],
    correctIndex: 0,
    geographicConcept: 'Unsur Iklim & Persebaran Bioma Dunia',
    explanation:
      'Curah hujan dan ketersediaan air adalah faktor pembatas utama bagi kehidupan tumbuhan. Hutan hujan Amazon menerima >2.500 mm/tahun, sementara Gurun Sahara <100 mm/tahun dengan penguapan sangat tinggi.',
  },
  {
    id: 2,
    question: 'Pegunungan Himalaya berperan membentuk iklim di Asia terutama melalui fenomena ...',
    options: [
      'Peningkatan suhu udara seiring bertambahnya ketinggian lereng',
      'Efek hujan orografis di lereng selatan dan daerah bayangan hujan (kering) di Dataran Tinggi Tibet',
      'Penghilangan seluruh kelembapan laut di Samudra Atlantik',
      'Pembentukan angin pasat tenggara di belahan bumi selatan',
    ],
    correctIndex: 1,
    geographicConcept: 'Pengaruh Topografi & Relief terhadap Iklim Lokal',
    explanation:
      'Massa udara lembap monsun yang membentur dinding tinggi Himalaya dipaksa naik, mendingin, dan menjatuhkan hujan lebat di sisi selatan (India), sedangkan sisi balik di utara (Tibet) menjadi kering.',
  },
  {
    id: 3,
    question: 'Mengapa Pulau Jawa di Indonesia dan kawasan pesisir timur Tiongkok memiliki kepadatan penduduk sangat tinggi?',
    options: [
      'Karena berada di wilayah beriklim kutub yang bebas penyakit tropis',
      'Karena memiliki tanah vulkanik/aluvial subur, topografi dataran landai, serta akses sungai dan pelabuhan',
      'Karena seluruh wilayahnya merupakan gurun pasir yang mudah dibangun jalan',
      'Karena tidak pernah mengalami aktivitas gempa bumi atau letusan gunung api',
    ],
    correctIndex: 1,
    geographicConcept: 'Faktor Geografis Persebaran Penduduk Dunia',
    explanation:
      'Penduduk cenderung mengelompok di dataran rendah subur (aluvial/vulkanik), dekat sumber air sungai, dan daerah pesisir dengan akses transportasi dan kegiatan ekonomi yang mudah.',
  },
  {
    id: 4,
    question: 'Mengapa alih fungsi lahan hutan di wilayah hulu sungai menjadi pemukiman beton memperbesar risiko banjir di hilir?',
    options: [
      'Karena mempercepat siklus penguapan air laut ke atmosfer',
      'Karena permukaan kedap air menurunkan kapasitas infiltrasi tanah dan memperbesar limpasan permukaan (runoff)',
      'Karena memperlambat kecepatan aliran sungai di kawasan pegunungan',
      'Karena mengubah suhu air tanah menjadi lebih hangat',
    ],
    correctIndex: 1,
    geographicConcept: 'Pendekatan Kelingkungan & Pengelolaan Daerah Aliran Sungai (DAS)',
    explanation:
      'Hilangnya vegetasi berakar dan penutupan tanah oleh beton menurunkan penyerapan air (infiltrasi). Air hujan mengalir langsung di permukaan sebagai runoff berdebit tinggi ke wilayah hilir.',
  },
  {
    id: 5,
    question: 'Kota Tokyo mampu bertahan menjadi megapolitan terpadat di dunia meski berada di pertemuan tiga lempeng tektonik aktif berkat ...',
    options: [
      'Penutupan seluruh kawasan pantai menggunakan tanggul pasir alami',
      'Adaptasi teknologi bangunan tahan gempa, tata ruang tangguh bencana, dan sistem pengendali banjir terpadu',
      'Pemindahan seluruh penduduk ke puncak gunung berapi yang tidak aktif',
      'Larangan membangun gedung bertingkat di seluruh pulau Jepang',
    ],
    correctIndex: 1,
    geographicConcept: 'Mitigasi Bencana Alam & Adaptasi Manusia terhadap Lingkungan',
    explanation:
      'Dalam kajian geografi manusia-lingkungan, kondisi fisik rawan gempa di Cincin Api Pasifik diatasi dengan mitigasi struktural (konstruksi tahan gempa, terowongan G-Cans) dan kesiapsiagaan masyarakat.',
  },
];
