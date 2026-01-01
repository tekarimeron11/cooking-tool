import type { Category, IngredientLine, Recipe, Step } from './types'

const STORAGE_KEY = 'recipe-mvp.v1'

const safeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`

const sampleCategories = (): Category[] => [
  { id: 'cat-favorites', name: 'お気に入り' },
  { id: 'cat-meat', name: 'お肉' },
  { id: 'cat-seafood', name: '魚介' },
  { id: 'cat-eggs', name: '卵' },
  { id: 'cat-salad', name: 'サラダ' },
  { id: 'cat-soup', name: 'スープ' },
  { id: 'cat-rice', name: 'ご飯物' },
  { id: 'cat-noodles', name: '麺' },
  { id: 'cat-bento', name: 'お弁当' },
  { id: 'cat-bread', name: 'パン' },
  { id: 'cat-sweets', name: 'お菓子' },
  { id: 'cat-others', name: 'その他' },
]

const buildRecipe = (
  id: string,
  title: string,
  categoryId: string,
  ingredients: IngredientLine[],
  steps: Step[],
  isFavorite = false,
  imageUrl?: string,
  sourceUrl?: string,
): Recipe => {
  const recipe: Recipe = {
    id,
    title,
    categoryId,
    ingredients,
    steps,
    isFavorite,
  }
  if (imageUrl) recipe.imageUrl = imageUrl
  if (sourceUrl) recipe.sourceUrl = sourceUrl
  return recipe
}

const sampleRecipes = (categories: Category[]): Recipe[] => {
  const byName = (name: string) =>
    categories.find((category) => category.name === name)?.id ?? categories[0]?.id ?? safeId()

  return [
    // お肉 (3)
    buildRecipe(
      'sample-meat-1',
      '豚こまの甘辛炒め',
      byName('お肉'),
      [
        { id: 'i1', name: '豚こま切れ肉', amountText: '200g' },
        { id: 'i2', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i3', name: 'ピーマン', amountText: '1個' },
        { id: 'i4', name: 'しょうゆ', amountText: '大さじ1と1/2' },
        { id: 'i5', name: 'みりん', amountText: '大さじ1' },
        { id: 'i6', name: '砂糖', amountText: '小さじ1' },
        { id: 'i7', name: '酒', amountText: '大さじ1' },
        { id: 'i8', name: 'ごま油', amountText: '小さじ1' },
        { id: 'i9', name: '片栗粉', amountText: '小さじ1' },
        { id: 'i10', name: '白ごま', amountText: '少々' },
      ],
      [
        { id: 's1', title: '玉ねぎは薄切り、ピーマンは細切りにする。' },
        { id: 's2', title: '豚肉に片栗粉をまぶし、全体に薄くなじませる。' },
        { id: 's3', title: 'フライパンにごま油を中火で熱し、豚肉を広げて焼き色をつける。' },
        {
          id: 's4',
          title: '玉ねぎとピーマンを加えて炒め、しんなりしたら酒を回し入れる。',
        },
        {
          id: 's5',
          title: 'しょうゆ、みりん、砂糖を混ぜて加え、全体にからめながら照りが出るまで炒める。',
        },
        { id: 's6', title: '器に盛り、白ごまをふる。' },
      ],
      true,
    ),
    buildRecipe(
      'sample-meat-2',
      '鶏むねのレモンハーブソテー',
      byName('お肉'),
      [
        { id: 'i1', name: '鶏むね肉', amountText: '1枚（300g）' },
        { id: 'i2', name: '塩', amountText: '小さじ1/3' },
        { id: 'i3', name: 'こしょう', amountText: '少々' },
        { id: 'i4', name: '薄力粉', amountText: '大さじ1' },
        { id: 'i5', name: 'オリーブオイル', amountText: '大さじ1' },
        { id: 'i6', name: 'レモン汁', amountText: '大さじ1' },
        { id: 'i7', name: '乾燥ハーブミックス', amountText: '小さじ1/2' },
        { id: 'i8', name: 'バター', amountText: '10g' },
      ],
      [
        { id: 's1', title: '鶏肉は厚みを均一にし、そぎ切りにする。' },
        { id: 's2', title: '塩、こしょうをふり、薄力粉をまぶす。' },
        { id: 's3', title: 'フライパンにオリーブオイルを中火で熱し、鶏肉を並べて焼く。' },
        { id: 's4', title: '焼き色がついたら返し、弱火でふたをして火を通す。' },
        {
          id: 's5',
          title: 'バター、レモン汁、ハーブを加え、前のステップの鶏肉に絡めて香りを移す。',
        },
      ],
    ),
    buildRecipe(
      'sample-meat-3',
      '豆腐入り和風つくね',
      byName('お肉'),
      [
        { id: 'i1', name: '鶏ひき肉', amountText: '250g' },
        { id: 'i2', name: '木綿豆腐', amountText: '150g' },
        { id: 'i3', name: '長ねぎ', amountText: '1/3本' },
        { id: 'i4', name: 'しょうが（すりおろし）', amountText: '小さじ1' },
        { id: 'i5', name: '片栗粉', amountText: '大さじ1' },
        { id: 'i6', name: '塩', amountText: '小さじ1/3' },
        { id: 'i7', name: 'しょうゆ', amountText: '大さじ1' },
        { id: 'i8', name: 'みりん', amountText: '大さじ1' },
        { id: 'i9', name: '酒', amountText: '大さじ1' },
        { id: 'i10', name: 'サラダ油', amountText: '小さじ2' },
      ],
      [
        { id: 's1', title: '豆腐はキッチンペーパーで包み、軽く水気を切る。' },
        { id: 's2', title: '長ねぎはみじん切りにする。' },
        {
          id: 's3',
          title: 'ボウルに鶏ひき肉、豆腐、ねぎ、しょうが、片栗粉、塩を入れてよく混ぜる。',
        },
        { id: 's4', title: '手に油を少量つけ、前のステップのタネを小判形に成形する。' },
        { id: 's5', title: 'フライパンに油を中火で熱し、両面を焼いて火を通す。' },
        {
          id: 's6',
          title: 'しょうゆ、みりん、酒を加え、前のステップのつくねに照りが出るまで絡める。',
        },
      ],
    ),

    // 魚介 (3)
    buildRecipe(
      'sample-seafood-1',
      '鮭のバターしょうゆソテー',
      byName('魚介'),
      [
        { id: 'i1', name: '生鮭', amountText: '2切れ' },
        { id: 'i2', name: '塩', amountText: '少々' },
        { id: 'i3', name: 'こしょう', amountText: '少々' },
        { id: 'i4', name: '薄力粉', amountText: '大さじ1' },
        { id: 'i5', name: 'サラダ油', amountText: '大さじ1' },
        { id: 'i6', name: 'バター', amountText: '10g' },
        { id: 'i7', name: 'しょうゆ', amountText: '小さじ2' },
        { id: 'i8', name: 'レモン', amountText: 'くし形2切れ' },
      ],
      [
        { id: 's1', title: '鮭に塩、こしょうをふり、薄力粉を薄くまぶす。' },
        { id: 's2', title: 'フライパンに油を中火で熱し、鮭を並べて焼く。' },
        { id: 's3', title: '焼き色がついたら返し、弱火でふたをして火を通す。' },
        { id: 's4', title: 'バターを加え、溶けたらしょうゆを回し入れて前のステップの鮭に絡める。' },
        { id: 's5', title: '器に盛り、レモンを添える。' },
      ],
      true,
    ),
    buildRecipe(
      'sample-seafood-2',
      'えびとブロッコリーのガーリック蒸し',
      byName('魚介'),
      [
        { id: 'i1', name: 'むきえび', amountText: '200g' },
        { id: 'i2', name: 'ブロッコリー', amountText: '1/2株' },
        { id: 'i3', name: 'にんにく', amountText: '1かけ' },
        { id: 'i4', name: 'オリーブオイル', amountText: '大さじ1' },
        { id: 'i5', name: '白ワイン（または酒）', amountText: '大さじ2' },
        { id: 'i6', name: '塩', amountText: '小さじ1/4' },
        { id: 'i7', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'ブロッコリーは小房に分け、にんにくはみじん切りにする。' },
        { id: 's2', title: 'むきえびは洗って水気を拭き、塩、こしょうを軽くふる。' },
        { id: 's3', title: 'フライパンにオリーブオイルとにんにくを入れて弱火で香りを出す。' },
        { id: 's4', title: 'えびとブロッコリーを加え、全体に油が回るまで炒める。' },
        { id: 's5', title: '白ワインを加えてふたをし、蒸気で火を通す。' },
      ],
    ),
    buildRecipe(
      'sample-seafood-3',
      'さばのしょうが煮',
      byName('魚介'),
      [
        { id: 'i1', name: 'さば（切り身）', amountText: '2切れ' },
        { id: 'i2', name: 'しょうが', amountText: '1かけ' },
        { id: 'i3', name: '水', amountText: '150ml' },
        { id: 'i4', name: 'しょうゆ', amountText: '大さじ2' },
        { id: 'i5', name: 'みりん', amountText: '大さじ2' },
        { id: 'i6', name: '酒', amountText: '大さじ2' },
        { id: 'i7', name: '砂糖', amountText: '大さじ1' },
      ],
      [
        { id: 's1', title: 'しょうがは薄切りにする。' },
        { id: 's2', title: '鍋に水、しょうゆ、みりん、酒、砂糖、しょうがを入れて煮立てる。' },
        { id: 's3', title: 'さばを加え、落としぶたをして中火で煮る。' },
        { id: 's4', title: '途中で煮汁をかけながら、味がなじむまで煮る。' },
      ],
    ),

    // 卵 (3)
    buildRecipe(
      'sample-eggs-1',
      'ふわとろスクランブルエッグ',
      byName('卵'),
      [
        { id: 'i1', name: '卵', amountText: '3個' },
        { id: 'i2', name: '牛乳', amountText: '大さじ2' },
        { id: 'i3', name: '塩', amountText: '小さじ1/4' },
        { id: 'i4', name: 'こしょう', amountText: '少々' },
        { id: 'i5', name: 'バター', amountText: '10g' },
      ],
      [
        { id: 's1', title: 'ボウルに卵を割り入れ、牛乳、塩、こしょうを加えて混ぜる。' },
        { id: 's2', title: 'フライパンにバターを弱火で溶かす。' },
        { id: 's3', title: '前のステップに卵液を流し入れ、ゴムべらでゆっくり混ぜる。' },
        { id: 's4', title: '半熟状になったら火を止め、余熱で仕上げる。' },
      ],
    ),
    buildRecipe(
      'sample-eggs-2',
      'だし香る卵とじ',
      byName('卵'),
      [
        { id: 'i1', name: '卵', amountText: '2個' },
        { id: 'i2', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i3', name: 'だし汁', amountText: '200ml' },
        { id: 'i4', name: 'しょうゆ', amountText: '小さじ2' },
        { id: 'i5', name: 'みりん', amountText: '小さじ2' },
        { id: 'i6', name: '小ねぎ', amountText: '少々' },
      ],
      [
        { id: 's1', title: '玉ねぎは薄切りにする。' },
        { id: 's2', title: '鍋にだし汁、しょうゆ、みりんを入れて温め、玉ねぎを加える。' },
        { id: 's3', title: '玉ねぎが透き通ったら、溶いた卵を回し入れる。' },
        { id: 's4', title: 'ふたをして弱火で半熟状に仕上げ、小ねぎを散らす。' },
      ],
    ),
    buildRecipe(
      'sample-eggs-3',
      '半熟味玉',
      byName('卵'),
      [
        { id: 'i1', name: '卵', amountText: '4個' },
        { id: 'i2', name: 'しょうゆ', amountText: '大さじ2' },
        { id: 'i3', name: 'みりん', amountText: '大さじ1' },
        { id: 'i4', name: '水', amountText: '大さじ2' },
        { id: 'i5', name: '砂糖', amountText: '小さじ1' },
      ],
      [
        { id: 's1', title: '鍋に湯を沸かし、卵を入れて7分ゆでる。' },
        { id: 's2', title: '冷水に取って冷やし、殻をむく。' },
        { id: 's3', title: '保存袋にしょうゆ、みりん、水、砂糖を入れて混ぜる。' },
        { id: 's4', title: '前のステップに卵を入れ、冷蔵庫で2時間ほど漬ける。' },
      ],
    ),

    // サラダ (3)
    buildRecipe(
      'sample-salad-1',
      'きゅうりとわかめの酢の物',
      byName('サラダ'),
      [
        { id: 'i1', name: 'きゅうり', amountText: '1本' },
        { id: 'i2', name: '乾燥わかめ', amountText: '大さじ1' },
        { id: 'i3', name: '酢', amountText: '大さじ2' },
        { id: 'i4', name: '砂糖', amountText: '大さじ1' },
        { id: 'i5', name: 'しょうゆ', amountText: '小さじ1' },
        { id: 'i6', name: '塩', amountText: '小さじ1/4' },
      ],
      [
        { id: 's1', title: 'わかめは水で戻し、水気を切る。' },
        { id: 's2', title: 'きゅうりは薄切りにして塩を振り、5分ほどおく。' },
        { id: 's3', title: '前のステップのきゅうりの水気を絞る。' },
        { id: 's4', title: '酢、砂糖、しょうゆを混ぜて甘酢を作る。' },
        { id: 's5', title: 'きゅうりとわかめを甘酢で和える。' },
      ],
      true,
    ),
    buildRecipe(
      'sample-salad-2',
      'トマトとアボカドのレモンサラダ',
      byName('サラダ'),
      [
        { id: 'i1', name: 'トマト', amountText: '1個' },
        { id: 'i2', name: 'アボカド', amountText: '1個' },
        { id: 'i3', name: 'レモン汁', amountText: '大さじ1' },
        { id: 'i4', name: 'オリーブオイル', amountText: '大さじ1' },
        { id: 'i5', name: '塩', amountText: '小さじ1/4' },
        { id: 'i6', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'トマトはひと口大、アボカドは角切りにする。' },
        { id: 's2', title: 'ボウルにレモン汁、オリーブオイル、塩、こしょうを混ぜる。' },
        { id: 's3', title: '前のステップにトマトとアボカドを加えてさっくり和える。' },
      ],
    ),
    buildRecipe(
      'sample-salad-3',
      'ごぼうとにんじんの胡麻マヨサラダ',
      byName('サラダ'),
      [
        { id: 'i1', name: 'ごぼう', amountText: '1/2本' },
        { id: 'i2', name: 'にんじん', amountText: '1/3本' },
        { id: 'i3', name: 'マヨネーズ', amountText: '大さじ2' },
        { id: 'i4', name: 'すりごま', amountText: '大さじ1' },
        { id: 'i5', name: 'しょうゆ', amountText: '小さじ1/2' },
        { id: 'i6', name: '砂糖', amountText: '小さじ1/2' },
      ],
      [
        { id: 's1', title: 'ごぼうはささがきにして水にさらし、にんじんは細切りにする。' },
        { id: 's2', title: '鍋に湯を沸かし、前のステップの野菜を2〜3分ゆでて水気を切る。' },
        { id: 's3', title: 'ボウルにマヨネーズ、すりごま、しょうゆ、砂糖を混ぜる。' },
        { id: 's4', title: '前のステップの野菜を加えて和える。' },
      ],
    ),

    // スープ (3)
    buildRecipe(
      'sample-soup-1',
      '具だくさん野菜スープ',
      byName('スープ'),
      [
        { id: 'i1', name: 'キャベツ', amountText: '2枚' },
        { id: 'i2', name: 'にんじん', amountText: '1/3本' },
        { id: 'i3', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i4', name: 'じゃがいも', amountText: '1個' },
        { id: 'i5', name: 'ベーコン', amountText: '2枚' },
        { id: 'i6', name: '水', amountText: '600ml' },
        { id: 'i7', name: 'コンソメ', amountText: '小さじ2' },
        { id: 'i8', name: '塩', amountText: '少々' },
        { id: 'i9', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: '野菜とベーコンは食べやすい大きさに切る。' },
        { id: 's2', title: '鍋に水とコンソメを入れて火にかける。' },
        { id: 's3', title: '前のステップに野菜とベーコンを入れ、やわらかくなるまで煮る。' },
        { id: 's4', title: '塩、こしょうで味を整える。' },
      ],
    ),
    buildRecipe(
      'sample-soup-2',
      'きのこ豆乳スープ',
      byName('スープ'),
      [
        { id: 'i1', name: 'しめじ', amountText: '1/2パック' },
        { id: 'i2', name: 'えのき', amountText: '1/2袋' },
        { id: 'i3', name: '玉ねぎ', amountText: '1/4個' },
        { id: 'i4', name: '無調整豆乳', amountText: '300ml' },
        { id: 'i5', name: '水', amountText: '200ml' },
        { id: 'i6', name: '味噌', amountText: '大さじ1' },
        { id: 'i7', name: 'だしの素', amountText: '小さじ1/2' },
      ],
      [
        { id: 's1', title: 'きのこはほぐし、玉ねぎは薄切りにする。' },
        { id: 's2', title: '鍋に水とだしの素を入れて温め、玉ねぎを加える。' },
        { id: 's3', title: '玉ねぎがやわらかくなったらきのこを加えて煮る。' },
        { id: 's4', title: '火を弱め、豆乳を加えて温める。' },
        { id: 's5', title: '味噌を溶き入れて温め、沸騰させないように仕上げる。' },
      ],
    ),
    buildRecipe(
      'sample-soup-3',
      'ねぎと卵の中華スープ',
      byName('スープ'),
      [
        { id: 'i1', name: '長ねぎ', amountText: '1/2本' },
        { id: 'i2', name: '卵', amountText: '1個' },
        { id: 'i3', name: '水', amountText: '400ml' },
        { id: 'i4', name: '鶏ガラスープの素', amountText: '小さじ2' },
        { id: 'i5', name: 'しょうゆ', amountText: '小さじ1' },
        { id: 'i6', name: 'ごま油', amountText: '小さじ1' },
        { id: 'i7', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: '長ねぎは小口切り、卵は溶きほぐす。' },
        { id: 's2', title: '鍋に水と鶏ガラスープの素を入れて沸かす。' },
        { id: 's3', title: '前のステップにねぎを入れてひと煮立ちさせる。' },
        { id: 's4', title: '溶き卵を回し入れ、ふわっと固まったら火を止める。' },
        { id: 's5', title: 'しょうゆ、ごま油、こしょうで味を整える。' },
      ],
    ),

    // ご飯物 (3)
    buildRecipe(
      'sample-rice-1',
      '鶏そぼろ丼',
      byName('ご飯物'),
      [
        { id: 'i1', name: '鶏ひき肉', amountText: '200g' },
        { id: 'i2', name: 'しょうゆ', amountText: '大さじ1と1/2' },
        { id: 'i3', name: 'みりん', amountText: '大さじ1' },
        { id: 'i4', name: '砂糖', amountText: '大さじ1/2' },
        { id: 'i5', name: 'しょうが（すりおろし）', amountText: '小さじ1' },
        { id: 'i6', name: '卵', amountText: '2個' },
        { id: 'i7', name: '塩', amountText: '少々' },
        { id: 'i8', name: 'ご飯', amountText: '2膳分' },
      ],
      [
        { id: 's1', title: 'フライパンに鶏ひき肉、しょうゆ、みりん、砂糖、しょうがを入れて混ぜる。' },
        { id: 's2', title: '前のステップを中火にかけ、そぼろ状になるまで炒りつける。' },
        { id: 's3', title: '別のフライパンで卵に塩を加えて炒り卵を作る。' },
        { id: 's4', title: 'ご飯の上にそぼろと炒り卵をのせる。' },
      ],
    ),
    buildRecipe(
      'sample-rice-2',
      '野菜チャーハン',
      byName('ご飯物'),
      [
        { id: 'i1', name: 'ご飯', amountText: '2膳分' },
        { id: 'i2', name: '卵', amountText: '1個' },
        { id: 'i3', name: 'にんじん', amountText: '1/4本' },
        { id: 'i4', name: '長ねぎ', amountText: '1/3本' },
        { id: 'i5', name: 'ハム', amountText: '2枚' },
        { id: 'i6', name: 'しょうゆ', amountText: '小さじ2' },
        { id: 'i7', name: '塩', amountText: '少々' },
        { id: 'i8', name: 'こしょう', amountText: '少々' },
        { id: 'i9', name: 'サラダ油', amountText: '大さじ1' },
      ],
      [
        { id: 's1', title: 'にんじん、ねぎ、ハムは細かく刻む。' },
        { id: 's2', title: 'フライパンに油を熱し、卵を入れてさっと炒め、取り出す。' },
        { id: 's3', title: '前のステップのフライパンで野菜とハムを炒める。' },
        { id: 's4', title: 'ご飯を加えてほぐしながら炒め、前のステップの卵を戻す。' },
        { id: 's5', title: 'しょうゆを鍋肌から回し入れ、塩、こしょうで味を整える。' },
      ],
    ),
    buildRecipe(
      'sample-rice-3',
      'きのこバターしょうゆご飯',
      byName('ご飯物'),
      [
        { id: 'i1', name: 'ご飯', amountText: '2膳分' },
        { id: 'i2', name: 'しめじ', amountText: '1/2パック' },
        { id: 'i3', name: 'えのき', amountText: '1/2袋' },
        { id: 'i4', name: 'バター', amountText: '10g' },
        { id: 'i5', name: 'しょうゆ', amountText: '小さじ2' },
        { id: 'i6', name: '塩', amountText: '少々' },
        { id: 'i7', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'きのこは石づきを落とし、食べやすくほぐす。' },
        { id: 's2', title: 'フライパンにバターを溶かし、きのこを炒める。' },
        { id: 's3', title: 'きのこがしんなりしたらしょうゆを回し入れ、塩、こしょうで調味する。' },
        { id: 's4', title: '前のステップを温かいご飯に混ぜる。' },
      ],
    ),

    // 麺 (3)
    buildRecipe(
      'sample-noodles-1',
      'ツナとほうれん草の和風パスタ',
      byName('麺'),
      [
        { id: 'i1', name: 'スパゲッティ', amountText: '200g' },
        { id: 'i2', name: 'ツナ缶', amountText: '1缶' },
        { id: 'i3', name: 'ほうれん草', amountText: '1/2束' },
        { id: 'i4', name: 'にんにく', amountText: '1/2かけ' },
        { id: 'i5', name: 'しょうゆ', amountText: '大さじ1' },
        { id: 'i6', name: 'オリーブオイル', amountText: '大さじ1' },
        { id: 'i7', name: '塩', amountText: '少々' },
        { id: 'i8', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'スパゲッティは塩（分量外）を加えた湯でゆでる。' },
        { id: 's2', title: 'ほうれん草はざく切り、にんにくはみじん切りにする。' },
        { id: 's3', title: 'フライパンにオリーブオイルとにんにくを入れて弱火で香りを出す。' },
        { id: 's4', title: 'ツナとほうれん草を加えて炒め、しょうゆを加える。' },
        { id: 's5', title: '前のステップにゆでたスパゲッティを加えて和え、塩、こしょうで整える。' },
      ],
    ),
    buildRecipe(
      'sample-noodles-2',
      'しょうゆ焼きうどん',
      byName('麺'),
      [
        { id: 'i1', name: 'ゆでうどん', amountText: '2玉' },
        { id: 'i2', name: '豚ばら肉', amountText: '100g' },
        { id: 'i3', name: 'キャベツ', amountText: '2枚' },
        { id: 'i4', name: 'にんじん', amountText: '1/3本' },
        { id: 'i5', name: 'しょうゆ', amountText: '大さじ1と1/2' },
        { id: 'i6', name: '酒', amountText: '大さじ1' },
        { id: 'i7', name: 'サラダ油', amountText: '大さじ1/2' },
        { id: 'i8', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: '豚肉は食べやすく切り、キャベツはざく切り、にんじんは短冊切りにする。' },
        { id: 's2', title: 'フライパンに油を熱し、豚肉を炒める。' },
        { id: 's3', title: '前のステップに野菜を加えて炒め、しんなりさせる。' },
        { id: 's4', title: 'うどんを加えてほぐし、酒としょうゆを回し入れる。' },
        { id: 's5', title: 'こしょうで味を整え、全体を炒め合わせる。' },
      ],
    ),
    buildRecipe(
      'sample-noodles-3',
      'ピリ辛豆乳そうめん',
      byName('麺'),
      [
        { id: 'i1', name: 'そうめん', amountText: '2束' },
        { id: 'i2', name: '無調整豆乳', amountText: '200ml' },
        { id: 'i3', name: 'めんつゆ（3倍濃縮）', amountText: '大さじ2' },
        { id: 'i4', name: 'ラー油', amountText: '小さじ1' },
        { id: 'i5', name: '白すりごま', amountText: '大さじ1' },
        { id: 'i6', name: 'きゅうり', amountText: '1/3本' },
        { id: 'i7', name: '小ねぎ', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'そうめんは袋の表示時間どおりにゆで、冷水でしめる。' },
        { id: 's2', title: 'きゅうりはせん切り、小ねぎは小口切りにする。' },
        { id: 's3', title: 'ボウルに豆乳、めんつゆ、ラー油、すりごまを混ぜる。' },
        { id: 's4', title: '器にそうめんを盛り、前のステップのつゆをかける。' },
        { id: 's5', title: 'きゅうりと小ねぎをのせる。' },
      ],
    ),

    // お弁当 (3)
    buildRecipe(
      'sample-bento-1',
      'のり塩チキン',
      byName('お弁当'),
      [
        { id: 'i1', name: '鶏もも肉', amountText: '200g' },
        { id: 'i2', name: '青のり', amountText: '小さじ1' },
        { id: 'i3', name: '塩', amountText: '小さじ1/3' },
        { id: 'i4', name: 'こしょう', amountText: '少々' },
        { id: 'i5', name: '片栗粉', amountText: '大さじ1' },
        { id: 'i6', name: 'サラダ油', amountText: '大さじ1' },
      ],
      [
        { id: 's1', title: '鶏肉はひと口大に切り、塩、こしょうをふる。' },
        { id: 's2', title: '青のりと片栗粉を混ぜ、前のステップの鶏肉にまぶす。' },
        { id: 's3', title: 'フライパンに油を熱し、鶏肉を焼いて火を通す。' },
      ],
    ),
    buildRecipe(
      'sample-bento-2',
      'ピーマンのきんぴら',
      byName('お弁当'),
      [
        { id: 'i1', name: 'ピーマン', amountText: '3個' },
        { id: 'i2', name: 'にんじん', amountText: '1/4本' },
        { id: 'i3', name: 'しょうゆ', amountText: '小さじ2' },
        { id: 'i4', name: 'みりん', amountText: '小さじ2' },
        { id: 'i5', name: '砂糖', amountText: '小さじ1/2' },
        { id: 'i6', name: 'ごま油', amountText: '小さじ2' },
        { id: 'i7', name: '白ごま', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'ピーマンとにんじんは細切りにする。' },
        { id: 's2', title: 'フライパンにごま油を熱し、前のステップの野菜を炒める。' },
        { id: 's3', title: 'しょうゆ、みりん、砂糖を加えて水分が飛ぶまで炒める。' },
        { id: 's4', title: '白ごまをふる。' },
      ],
    ),
    buildRecipe(
      'sample-bento-3',
      'ミニ卵焼き',
      byName('お弁当'),
      [
        { id: 'i1', name: '卵', amountText: '2個' },
        { id: 'i2', name: 'だし汁', amountText: '大さじ2' },
        { id: 'i3', name: '砂糖', amountText: '小さじ1' },
        { id: 'i4', name: '塩', amountText: '少々' },
        { id: 'i5', name: 'サラダ油', amountText: '少々' },
      ],
      [
        { id: 's1', title: '卵にだし汁、砂糖、塩を加えて混ぜる。' },
        { id: 's2', title: '卵焼き器に油を薄くひき、卵液を少量流して巻く。' },
        { id: 's3', title: '同様に数回繰り返し、前のステップの卵焼きを形よく整える。' },
      ],
    ),

    // パン (3)
    buildRecipe(
      'sample-bread-1',
      'ハニーバタートースト',
      byName('パン'),
      [
        { id: 'i1', name: '食パン', amountText: '1枚' },
        { id: 'i2', name: 'バター', amountText: '10g' },
        { id: 'i3', name: 'はちみつ', amountText: '小さじ2' },
      ],
      [
        { id: 's1', title: '食パンにバターを薄く塗る。' },
        { id: 's2', title: 'トースターで焼き色がつくまで焼く。' },
        { id: 's3', title: '前のステップに、はちみつをかける。' },
      ],
    ),
    buildRecipe(
      'sample-bread-2',
      'ツナマヨコーントースト',
      byName('パン'),
      [
        { id: 'i1', name: '食パン', amountText: '1枚' },
        { id: 'i2', name: 'ツナ缶', amountText: '1/2缶' },
        { id: 'i3', name: 'コーン', amountText: '大さじ2' },
        { id: 'i4', name: 'マヨネーズ', amountText: '大さじ1' },
        { id: 'i5', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'ボウルにツナ、コーン、マヨネーズ、こしょうを混ぜる。' },
        { id: 's2', title: '食パンに前のステップを広げる。' },
        { id: 's3', title: 'トースターで焼き色がつくまで焼く。' },
      ],
    ),
    buildRecipe(
      'sample-bread-3',
      'りんごシナモントースト',
      byName('パン'),
      [
        { id: 'i1', name: '食パン', amountText: '1枚' },
        { id: 'i2', name: 'りんご', amountText: '1/4個' },
        { id: 'i3', name: '砂糖', amountText: '小さじ2' },
        { id: 'i4', name: 'シナモン', amountText: '少々' },
        { id: 'i5', name: 'バター', amountText: '5g' },
      ],
      [
        { id: 's1', title: 'りんごは薄切りにする。' },
        { id: 's2', title: 'フライパンにバターを溶かし、りんごと砂糖を入れて軽く炒める。' },
        { id: 's3', title: '食パンに前のステップのりんごをのせ、シナモンをふる。' },
        { id: 's4', title: 'トースターで焼き色がつくまで焼く。' },
      ],
    ),

    // お菓子 (3)
    buildRecipe(
      'sample-sweets-1',
      'まん丸ホットケーキ',
      byName('お菓子'),
      [
        { id: 'i1', name: 'ホットケーキミックス', amountText: '150g' },
        { id: 'i2', name: '卵', amountText: '1個' },
        { id: 'i3', name: '牛乳', amountText: '100ml' },
        { id: 'i4', name: 'サラダ油', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'ボウルに卵と牛乳を混ぜ、ホットケーキミックスを加えてさっくり混ぜる。' },
        { id: 's2', title: 'フライパンに薄く油をひき、弱火で生地を流す。' },
        { id: 's3', title: '表面に小さな泡が出たら返し、焼き色がつくまで焼く。' },
      ],
    ),
    buildRecipe(
      'sample-sweets-2',
      'さくほろバタークッキー',
      byName('お菓子'),
      [
        { id: 'i1', name: 'バター（室温）', amountText: '60g' },
        { id: 'i2', name: '砂糖', amountText: '40g' },
        { id: 'i3', name: '卵黄', amountText: '1個分' },
        { id: 'i4', name: '薄力粉', amountText: '120g' },
      ],
      [
        { id: 's1', title: 'バターを練り、砂糖を加えて白っぽくなるまで混ぜる。' },
        { id: 's2', title: '前のステップに卵黄を加えて混ぜる。' },
        { id: 's3', title: '薄力粉を加えて混ぜ、生地をひとまとめにする。' },
        { id: 's4', title: '生地をのばして型で抜き、170℃のオーブンで12〜15分焼く。' },
      ],
    ),
    buildRecipe(
      'sample-sweets-3',
      'しっとりバナナマフィン',
      byName('お菓子'),
      [
        { id: 'i1', name: 'バナナ', amountText: '1本' },
        { id: 'i2', name: '卵', amountText: '1個' },
        { id: 'i3', name: '砂糖', amountText: '40g' },
        { id: 'i4', name: 'サラダ油', amountText: '40ml' },
        { id: 'i5', name: '牛乳', amountText: '40ml' },
        { id: 'i6', name: '薄力粉', amountText: '120g' },
        { id: 'i7', name: 'ベーキングパウダー', amountText: '小さじ1' },
      ],
      [
        { id: 's1', title: 'バナナはフォークでつぶす。' },
        { id: 's2', title: 'ボウルに卵、砂糖、油、牛乳を混ぜる。' },
        { id: 's3', title: '前のステップにバナナを加えて混ぜる。' },
        { id: 's4', title: '薄力粉とベーキングパウダーをふるい入れて混ぜる。' },
        { id: 's5', title: '型に流し、180℃のオーブンで20分ほど焼く。' },
      ],
    ),

    // その他 (3)
    buildRecipe(
      'sample-others-1',
      '冷やし豆腐の薬味のせ',
      byName('その他'),
      [
        { id: 'i1', name: '絹ごし豆腐', amountText: '1丁' },
        { id: 'i2', name: '小ねぎ', amountText: '少々' },
        { id: 'i3', name: 'しょうが（すりおろし）', amountText: '小さじ1/2' },
        { id: 'i4', name: 'しょうゆ', amountText: '小さじ2' },
        { id: 'i5', name: 'かつお節', amountText: '少々' },
      ],
      [
        { id: 's1', title: '豆腐の水気を軽く切り、器に盛る。' },
        { id: 's2', title: '小ねぎを小口切りにする。' },
        { id: 's3', title: '前のステップの豆腐に薬味をのせ、しょうゆをかける。' },
        { id: 's4', title: 'かつお節を散らす。' },
      ],
    ),
    buildRecipe(
      'sample-others-2',
      'なすの焼きびたし',
      byName('その他'),
      [
        { id: 'i1', name: 'なす', amountText: '2本' },
        { id: 'i2', name: 'サラダ油', amountText: '大さじ2' },
        { id: 'i3', name: 'だし汁', amountText: '150ml' },
        { id: 'i4', name: 'しょうゆ', amountText: '大さじ1' },
        { id: 'i5', name: 'みりん', amountText: '大さじ1' },
      ],
      [
        { id: 's1', title: 'なすは縦半分に切り、皮に浅い切り込みを入れる。' },
        { id: 's2', title: 'フライパンに油を熱し、なすを両面焼く。' },
        { id: 's3', title: 'だし汁、しょうゆ、みりんを混ぜて浸しだれを作る。' },
        { id: 's4', title: '前のステップで焼いたなすをたれに浸し、粗熱が取れるまで置く。' },
      ],
    ),
    buildRecipe(
      'sample-others-3',
      '厚揚げの照り焼き',
      byName('その他'),
      [
        { id: 'i1', name: '厚揚げ', amountText: '1枚' },
        { id: 'i2', name: 'しょうゆ', amountText: '大さじ1' },
        { id: 'i3', name: 'みりん', amountText: '大さじ1' },
        { id: 'i4', name: '砂糖', amountText: '小さじ1' },
        { id: 'i5', name: 'サラダ油', amountText: '小さじ1' },
      ],
      [
        { id: 's1', title: '厚揚げは食べやすい大きさに切る。' },
        { id: 's2', title: 'フライパンに油を熱し、厚揚げを両面焼く。' },
        { id: 's3', title: 'しょうゆ、みりん、砂糖を混ぜて前のステップに加える。' },
        { id: 's4', title: 'たれが絡んだら器に盛る。' },
      ],
    ),
  ]
}


const normalizeSteps = (data: unknown): Step[] => {
  if (!Array.isArray(data)) return []
  return data
    .map((step) => ({
      id: typeof step?.id === 'string' ? step.id : safeId(),
      title: typeof step?.title === 'string' ? step.title : '',
      note: typeof step?.note === 'string' ? step.note : '',
    }))
    .filter((step) => step.title !== '' || step.note !== '')
}

const normalizeIngredients = (data: unknown): IngredientLine[] => {
  if (!Array.isArray(data)) return []
  return data
    .map((item) => ({
      id: typeof item?.id === 'string' ? item.id : safeId(),
      name: typeof item?.name === 'string' ? item.name : '',
      amountText: typeof item?.amountText === 'string' ? item.amountText : '',
    }))
    .filter((item) => item.name.trim() !== '' || item.amountText?.trim() !== '')
}

const normalizeCategories = (data: unknown): Category[] => {
  if (!Array.isArray(data)) return []
  return data
    .map((item) => ({
      id: typeof item?.id === 'string' ? item.id : safeId(),
      name: typeof item?.name === 'string' ? item.name : '',
    }))
    .filter((item) => item.name.trim() !== '')
}

const normalizeRecipes = (data: unknown, categories: Category[]): Recipe[] => {
  if (!Array.isArray(data)) return []
  const fallbackCategoryId = categories[0]?.id ?? safeId()
  return data
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const recipe = item as Partial<Recipe>
      const steps = normalizeSteps(recipe.steps)
      const ingredients = normalizeIngredients(recipe.ingredients)
      const rawCategoryId =
        typeof recipe.categoryId === 'string' ? recipe.categoryId : fallbackCategoryId
      const categoryId = categories.some((cat) => cat.id === rawCategoryId)
        ? rawCategoryId
        : fallbackCategoryId
      const base: Recipe = {
        id: typeof recipe.id === 'string' ? recipe.id : safeId(),
        title: typeof recipe.title === 'string' ? recipe.title : '無題レシピ',
        categoryId,
        ingredients,
        steps: steps.length > 0 ? steps : [{ id: safeId(), title: '' }],
        isFavorite: typeof recipe.isFavorite === 'boolean' ? recipe.isFavorite : false,
        lastRunAt: typeof recipe.lastRunAt === 'number' ? recipe.lastRunAt : undefined,
      }
      if (typeof recipe.imageUrl === 'string' && recipe.imageUrl.trim() !== '') {
        base.imageUrl = recipe.imageUrl
      }
      if (typeof recipe.sourceUrl === 'string' && recipe.sourceUrl.trim() !== '') {
        base.sourceUrl = recipe.sourceUrl
      }
      return base
    })
    .filter(Boolean) as Recipe[]
}

export type AppData = {
  categories: Category[]
  recipes: Recipe[]
}

const withFallbackData = (): AppData => {
  const categories = sampleCategories()
  return {
    categories,
    recipes: sampleRecipes(categories),
  }
}

export const getInitialData = (): AppData => withFallbackData()

export const normalizeAppData = (data: unknown): AppData => {
  if (!data || typeof data !== 'object') return withFallbackData()

  if (Array.isArray(data)) {
    const categories = [{ id: safeId(), name: '未分類' }]
    const recipes = normalizeRecipes(data, categories)
    return {
      categories,
      recipes: recipes.length > 0 ? recipes : sampleRecipes(categories),
    }
  }

  const raw = data as { categories?: unknown; recipes?: unknown }
  const categories = normalizeCategories(raw.categories)
  const ensuredCategories =
    categories.length > 0 ? categories : [{ id: safeId(), name: '未分類' }]
  const recipes = normalizeRecipes(raw.recipes, ensuredCategories)
  return {
    categories: ensuredCategories,
    recipes: recipes.length > 0 ? recipes : sampleRecipes(ensuredCategories),
  }
}

export const loadAppData = (): AppData => {
  if (typeof window === 'undefined') return withFallbackData()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return withFallbackData()
    return normalizeAppData(JSON.parse(raw))
  } catch {
    return withFallbackData()
  }
}

export const saveAppData = (data: AppData) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}


