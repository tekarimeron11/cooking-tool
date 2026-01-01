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

  const recipes = [
    // お肉 (6)
    buildRecipe(
      'sample-meat-1',
      '鶏のから揚げ',
      byName('お肉'),
      [
        { id: 'i1', name: '鶏もも肉', amountText: '1枚（300g）' },
        { id: 'i2', name: '小麦粉', amountText: '大さじ4' },
        { id: 'i3', name: '揚げ油', amountText: '適量' },
        {
          id: 'i4',
          name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ',
          amountText: '大さじ1',
        },
        { id: 'i5', name: 'キッコーマン デリシャスソース ウスター', amountText: '大さじ1/2' },
        {
          id: 'i6',
          name: 'マンズワイン 料理酒（またはマンジョウ 米麹こだわり仕込み 本みりん）',
          amountText: '大さじ1/2',
        },
        { id: 'i7', name: 'にんにく（すりおろし）', amountText: '1片' },
        { id: 'i8', name: 'しょうが（すりおろし）', amountText: '1片' },
      ],
      [
        { id: 's1', title: '鶏肉はひと口大に切り、調味料をよくもみ込む。' },
        {
          id: 's2',
          title: '前のステップで下味をつけた鶏肉に小麦粉をまぶし、中温に熱した揚げ油でカリッとするまで揚げる。',
        },
      ],
      true,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00058172/',
    ),
    buildRecipe(
      'sample-meat-2',
      'ポークジンジャー',
      byName('お肉'),
      [
        { id: 'i1', name: '豚ロース肉（薄切り）', amountText: '300g' },
        { id: 'i2', name: '小麦粉', amountText: '大さじ1' },
        { id: 'i3', name: 'サラダ油', amountText: '大さじ1' },
        {
          id: 'i4',
          name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ',
          amountText: '大さじ1 1/2',
        },
        {
          id: 'i5',
          name: 'マンズワイン 料理酒（またはマンジョウ 米麹こだわり仕込み 本みりん）',
          amountText: '大さじ1',
        },
        { id: 'i6', name: 'しょうが（すりおろし）', amountText: '1/2かけ分' },
        { id: 'i7', name: '砂糖', amountText: '小さじ1' },
      ],
      [
        { id: 's1', title: '豚肉を１枚ずつ広げて小麦粉をまぶす。' },
        { id: 's2', title: 'フライパンに油を中火で熱し、豚肉を焼く。' },
        { id: 's3', title: '前のステップで焼いた豚肉に調味料を加え、煮からめる。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00053699/',
    ),
    buildRecipe(
      'sample-meat-3',
      '鶏の照り焼き',
      byName('お肉'),
      [
        { id: 'i1', name: '鶏もも肉', amountText: '1枚（250g）' },
        { id: 'i2', name: 'サラダ油', amountText: '大さじ1/2' },
        { id: 'i3', name: 'キッコーマン基本のおかずつゆ', amountText: '大さじ2' },
        { id: 'i4', name: '水菜', amountText: '適宜' },
      ],
      [
        { id: 's1', title: '鶏肉は半分に切り、皮目にフォークで数か所刺す。' },
        {
          id: 's2',
          title:
            'フライパンに油を中火で熱し、皮を下にして鶏肉を入れて焼く。焼き色がついたら、裏返しふたをして、弱火で５～６分焼いて火を通す。',
        },
        {
          id: 's3',
          title: '前のステップで焼いた鶏肉の余分な脂をふき取り、基本のおかずつゆを加え、照りが出るまで全体にからめる。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00053870/',
    ),
    buildRecipe(
      'sample-meat-4',
      'ハンバーグ',
      byName('お肉'),
      [
        { id: 'i1', name: '合いびき肉', amountText: '500g' },
        { id: 'i2', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i3', name: '卵', amountText: '1個' },
        { id: 'i4', name: '牛乳', amountText: '1/2カップ' },
        { id: 'i5', name: 'パン粉', amountText: '1カップ' },
        { id: 'i6', name: '塩', amountText: '少々' },
        { id: 'i7', name: 'こしょう', amountText: '少々' },
        { id: 'i8', name: 'サラダ油', amountText: '適量' },
        { id: 'i9', name: 'トマトケチャップ', amountText: '大さじ2' },
        { id: 'i10', name: '中濃ソース', amountText: '大さじ1' },
      ],
      [
        { id: 's1', title: '玉ねぎはみじん切りにし、フライパンで炒めて冷ましておく。' },
        { id: 's2', title: 'パン粉は牛乳に浸しておく。' },
        { id: 's3', title: 'ボールにひき肉を入れて、塩・こしょうをふり、粘り気が出るまでよくこねる。' },
        { id: 's4', title: '前のステップでこねたひき肉に卵、玉ねぎ、パン粉を加え、さらによくこねる。' },
        { id: 's5', title: '前のステップで作ったタネを４等分し、空気を抜いて小判形に成形する。' },
        {
          id: 's6',
          title: 'フライパンに油を熱し、前のステップで成形したタネを入れ、焼き色がつくまで焼く。',
        },
        { id: 's7', title: '裏返して、ふたをし、弱火で中まで火を通す。' },
        {
          id: 's8',
          title: '前のステップで焼いたハンバーグにケチャップと中濃ソースを加え、全体に絡める。',
        },
      ],
      false,
      undefined,
      'https://www.nisshin.com/entertainment/recipe/recipe_n-354.html',
    ),
    buildRecipe(
      'sample-meat-5',
      '牛丼',
      byName('お肉'),
      [
        { id: 'i1', name: '牛薄切り肉', amountText: '200g' },
        { id: 'i2', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i3', name: 'サラダ油', amountText: '大さじ1/2' },
        { id: 'i4', name: '温かいご飯', amountText: 'どんぶり2杯分' },
        {
          id: 'i5',
          name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ',
          amountText: '大さじ2',
        },
        {
          id: 'i6',
          name: 'マンズワイン 料理酒（またはマンジョウ 米麹こだわり仕込み 本みりん）',
          amountText: '大さじ2',
        },
        { id: 'i7', name: '砂糖', amountText: '大さじ1' },
        { id: 'i8', name: '水', amountText: '1カップ' },
      ],
      [
        { id: 's1', title: '玉ねぎはくし切りにする。' },
        { id: 's2', title: '鍋に油を中火で熱し、玉ねぎを炒める。' },
        { id: 's3', title: '前のステップで炒めた玉ねぎがしんなりしたら牛肉を加えて炒める。' },
        { id: 's4', title: '前のステップで炒めた具材に調味料を加え、煮立ったら弱めの中火で約１０分煮る。' },
        { id: 's5', title: '器にご飯を盛り、煮汁ごとかける。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00007036/',
    ),
    buildRecipe(
      'sample-meat-6',
      '中華風肉じゃが',
      byName('お肉'),
      [
        { id: 'i1', name: '牛肉（こま切れ）', amountText: '200g' },
        { id: 'i2', name: 'じゃがいも', amountText: '4個' },
        { id: 'i3', name: 'たまねぎ', amountText: '1個' },
        { id: 'i4', name: 'にんじん', amountText: '1/2本' },
        { id: 'i5', name: 'しらたき', amountText: '1袋' },
        { id: 'i6', name: 'サラダ油', amountText: '大さじ1' },
        { id: 'i7', name: '水', amountText: '3カップ' },
        { id: 'i8', name: '砂糖', amountText: '大さじ3' },
        { id: 'i9', name: 'しょうゆ', amountText: '大さじ3' },
        { id: 'i10', name: '酒', amountText: '大さじ3' },
        { id: 'i11', name: 'みりん', amountText: '大さじ3' },
        { id: 'i12', name: 'だしの素', amountText: '小さじ1' },
      ],
      [
        {
          id: 's1',
          title:
            '牛肉は3～4cmに切り、じゃがいもは1/4に切り、たまねぎはくし形切り、にんじんは乱切り、しらたきは食べやすく切ります。',
        },
        {
          id: 's2',
          title:
            '鍋に油を熱し、牛肉を軽く炒め、前のステップで切ったじゃがいも、たまねぎ、にんじん、しらたきを加えて軽く炒め、調味料を入れます。',
        },
        {
          id: 's3',
          title: '前のステップで調味料を入れた鍋が煮立ったらアクをすくい取り、落としぶたをして弱めの中火で20分煮ます。',
        },
        {
          id: 's4',
          title: '前のステップで落としぶたをした鍋のふたを外し、煮汁が少なくなるまで中火で煮詰めます。',
        },
      ],
      false,
      undefined,
      'https://www.sbfoods.co.jp/recipe/detail/05350.html',
    ),

    // 魚介 (6)
    buildRecipe(
      'sample-sea-1',
      'サーモンのムニエル きのこバターしょうゆソース',
      byName('魚介'),
      [
        { id: 'i1', name: '生鮭', amountText: '2切れ' },
        { id: 'i2', name: 'エリンギ', amountText: '100g' },
        { id: 'i3', name: 'まいたけ', amountText: '100g' },
        {
          id: 'i4',
          name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ',
          amountText: '小さじ1',
        },
        { id: 'i5', name: 'マンズワイン 料理酒', amountText: '小さじ1' },
        { id: 'i6', name: '小麦粉', amountText: '大さじ1' },
        { id: 'i7', name: 'オリーブオイル', amountText: '大さじ1/2' },
        { id: 'i8', name: 'ベビーリーフ', amountText: '20g' },
        {
          id: 'i9',
          name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ',
          amountText: '大さじ1 1/2',
        },
        {
          id: 'i10',
          name: 'マンジョウ 米麹こだわり仕込み 本みりん',
          amountText: '大さじ1/2',
        },
        { id: 'i11', name: 'バター', amountText: '大さじ1/2' },
      ],
      [
        { id: 's1', title: '鮭はしょうゆと料理酒をふって10分おき、水気を拭き、小麦粉をまぶす。' },
        {
          id: 's2',
          title: 'きのこは食べやすくさき、フライパンに油を熱して鮭を両面焼き、きのこを炒める。',
        },
        {
          id: 's3',
          title:
            '前のステップで焼いた鮭ときのこにしょうゆ・みりん・バターを加え、全体にからめて器に盛り、ベビーリーフを添える。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00005001/',
    ),
    buildRecipe(
      'sample-sea-2',
      'ガーリックシュリンプ',
      byName('魚介'),
      [
        { id: 'i1', name: 'バナメイえび', amountText: '250g' },
        { id: 'i2', name: '塩', amountText: '適量' },
        { id: 'i3', name: '片栗粉', amountText: '適量' },
        { id: 'i4', name: 'レモン', amountText: '適量' },
        { id: 'i5', name: 'サニーレタス', amountText: '適量' },
        { id: 'i6', name: 'オリーブ油', amountText: '大さじ2' },
        { id: 'i7', name: '白ワイン', amountText: '大さじ2' },
        { id: 'i8', name: 'にんにく（みじん切り）', amountText: '1片' },
        { id: 'i9', name: '塩', amountText: '小さじ1' },
        { id: 'i10', name: '粗挽き黒こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'オリーブ油・白ワイン・にんにく・塩・こしょうを混ぜ、えびを約30分漬ける。' },
        { id: 's2', title: '前のステップで漬けたえびに軽く塩をふって洗い、水気を切り、片栗粉をまぶす。' },
        {
          id: 's3',
          title: '熱した油で前のステップのえびをさっと揚げ、漬け汁ごと加えて炒め合わせる。',
        },
        { id: 's4', title: '器に盛り、サニーレタスとレモンを添える。' },
      ],
      false,
      undefined,
      'https://www.nissui.co.jp/recipe/01199.html',
    ),
    buildRecipe(
      'sample-sea-3',
      'さばの味噌煮',
      byName('魚介'),
      [
        { id: 'i1', name: 'さば', amountText: '1尾分' },
        { id: 'i2', name: '塩', amountText: '少々' },
        { id: 'i3', name: '長ねぎ', amountText: '1/2本' },
        { id: 'i4', name: 'しょうが', amountText: '10g' },
        { id: 'i5', name: '味噌', amountText: '大さじ1' },
        { id: 'i6', name: 'めんつゆ（3倍濃縮）', amountText: '大さじ1' },
        { id: 'i7', name: '水', amountText: '100cc' },
        { id: 'i8', name: 'はちみつ', amountText: '小さじ2' },
        { id: 'i9', name: '酒', amountText: '小さじ2' },
      ],
      [
        { id: 's1', title: 'さばに塩をふって1時間おき、水洗いして水気を拭き、4等分に切る。ねぎは5cm長さに切る。' },
        { id: 's2', title: '鍋に調味料とねぎを入れて煮立て、さばを加え落としぶたをして7〜8分煮る。' },
        {
          id: 's3',
          title: '前のステップで煮ているさばを途中で一度裏返し、落としぶたを外して煮汁が少なくなるまで煮る。',
        },
        { id: 's4', title: '器に盛り、煮汁をかける。' },
      ],
      false,
      undefined,
      'https://www.nissui.co.jp/recipe/00597.html',
    ),
    buildRecipe(
      'sample-sea-4',
      'ぶりの照り焼き',
      byName('魚介'),
      [
        { id: 'i1', name: 'ぶり', amountText: '2切れ（約200g）' },
        { id: 'i2', name: 'マンズワイン 料理酒', amountText: '大さじ2' },
        { id: 'i3', name: '小麦粉', amountText: '大さじ1' },
        { id: 'i4', name: 'サラダ油', amountText: '大さじ1' },
        { id: 'i5', name: '大根おろし', amountText: '適宜' },
        { id: 'i6', name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ', amountText: '大さじ1' },
        { id: 'i7', name: 'マンジョウ 米麹こだわり仕込み 本みりん', amountText: '大さじ2' },
        { id: 'i8', name: 'マンズワイン 料理酒', amountText: '大さじ1' },
      ],
      [
        { id: 's1', title: 'ぶりは料理酒をふって5〜10分おき、汁気をふき取る。' },
        { id: 's2', title: '調味料を合わせ、ぶりに小麦粉をまぶす。' },
        {
          id: 's3',
          title:
            'フライパンに油を熱し、前のステップで粉をまぶしたぶりを両面焼き、調味料を加えて煮からめる。',
        },
        { id: 's4', title: '器に盛り、好みで大根おろしを添える。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00005385/',
    ),
    buildRecipe(
      'sample-sea-5',
      'あさりの酒蒸し',
      byName('魚介'),
      [
        { id: 'i1', name: 'あさり（殻付き）', amountText: '350g' },
        { id: 'i2', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i3', name: 'パセリ', amountText: '1本' },
        { id: 'i4', name: 'レモン汁', amountText: '適宜' },
        { id: 'i5', name: 'バター', amountText: '大さじ1' },
        { id: 'i6', name: '白ワイン', amountText: '50cc' },
        { id: 'i7', name: '水', amountText: '100cc' },
        { id: 'i8', name: '塩', amountText: '適宜' },
        { id: 'i9', name: 'こしょう', amountText: '適宜' },
      ],
      [
        { id: 's1', title: '玉ねぎは薄切り、パセリはみじん切りにする。' },
        { id: 's2', title: '内なべにバターを入れて玉ねぎを炒め、あさり・白ワイン・水を加えてふたをし、加圧2分調理する。' },
        { id: 's3', title: '器に盛り、パセリを散らしてレモン汁をかけ、塩・こしょうで味を調える。' },
      ],
      false,
      undefined,
      'https://www.t-fal.co.jp/recipe/detail/mode/580',
    ),
    buildRecipe(
      'sample-sea-6',
      'しらす丼（減塩レシピ）',
      byName('魚介'),
      [
        { id: 'i1', name: 'ご飯（丼）', amountText: '2杯分' },
        { id: 'i2', name: 'きざみのり', amountText: '適宜' },
        { id: 'i3', name: '細ねぎ（小口切り）', amountText: '5g' },
        { id: 'i4', name: 'しらす', amountText: '60g' },
        { id: 'i5', name: '卵黄', amountText: '2個' },
        { id: 'i6', name: 'しょうゆ', amountText: '適量' },
      ],
      [
        { id: 's1', title: '丼にご飯を盛り、のり、ねぎ、しらす、卵黄をのせる。' },
        { id: 's2', title: '食べるときにしょうゆをかける。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00054844/',
    ),

    // 卵 (6)
    buildRecipe(
      'sample-egg-1',
      'オムライス（包まないシンプル仕上げ）',
      byName('卵'),
      [
        { id: 'i1', name: '鶏むね肉', amountText: '100g' },
        { id: 'i2', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i3', name: 'マッシュルーム', amountText: '4個' },
        { id: 'i4', name: 'ピーマン', amountText: '1個' },
        { id: 'i5', name: 'バター', amountText: '大さじ1' },
        { id: 'i6', name: 'ご飯', amountText: '400g' },
        { id: 'i7', name: 'デルモンテ トマトケチャップ', amountText: '大さじ5' },
        { id: 'i8', name: '卵', amountText: '2個' },
        { id: 'i9', name: '塩', amountText: '少々' },
        { id: 'i10', name: '白こしょう', amountText: '少々' },
        { id: 'i11', name: 'サラダ油', amountText: '適量' },
      ],
      [
        {
          id: 's1',
          title:
            '鶏肉は1.5cm角に切り、玉ねぎは粗みじん切り、マッシュルームは薄切り、ピーマンはみじん切りにする。',
        },
        {
          id: 's2',
          title:
            'バターで玉ねぎを炒め、鶏肉、ピーマン、マッシュルームの順に加えて炒め、塩、こしょうする。',
        },
        {
          id: 's3',
          title:
            '前のステップで炒めた具材にご飯を加えてさらに炒め、トマトケチャップ大さじ3で調味する。',
        },
        {
          id: 's4',
          title: '卵を溶きほぐし、塩、こしょうし、薄焼き卵を1人1枚ずつ焼く。',
        },
        {
          id: 's5',
          title:
            '皿に前のステップで作ったケチャップライスを盛りつけ、前のステップで焼いた薄焼き卵をのせ、トマトケチャップ各大さじ1をかける。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00051267/',
    ),
    buildRecipe(
      'sample-egg-2',
      'だし巻き卵（だししょうゆで味よく）',
      byName('卵'),
      [
        { id: 'i1', name: '卵', amountText: '3個' },
        { id: 'i2', name: 'サラダ油', amountText: '大さじ1/2' },
        { id: 'i3', name: 'キッコーマンいつでも新鮮 あまうまいだししょうゆ', amountText: '大さじ1' },
        { id: 'i4', name: '水', amountText: '大さじ2' },
      ],
      [
        {
          id: 's1',
          title: 'ボウルに卵を割って溶きほぐし、だししょうゆと水を加えてよく混ぜる。',
        },
        {
          id: 's2',
          title:
            '卵焼き鍋を熱して油を薄く敷き、前のステップで作った卵液の1/4量を流し入れ、半熟状になったら向こう側から手前に巻く。鍋の空いた所へ油を敷き、巻いた卵を向こう側へ寄せる。',
        },
        {
          id: 's3',
          title:
            '手前側にも油を敷き、前のステップで作った残りの卵液を少しずつ流し入れ、手前へ巻きながら焼いていく。',
        },
        {
          id: 's4',
          title: '前のステップで焼き上げた卵を巻きすなどに巻いて形を整え、食べやすい幅に切って器に盛りつける。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00006846/',
    ),
    buildRecipe(
      'sample-egg-3',
      'スペイン風オムレツ',
      byName('卵'),
      [
        { id: 'i1', name: 'じゃがいも', amountText: '150g' },
        { id: 'i2', name: 'ハム（薄切り）', amountText: '3枚' },
        { id: 'i3', name: 'プチトマト', amountText: '4個' },
        { id: 'i4', name: '卵', amountText: '3個' },
        { id: 'i5', name: 'ピザ用チーズ', amountText: '大さじ2' },
        { id: 'i6', name: 'キッコーマン特選丸大豆しょうゆ', amountText: '小さじ1/3' },
        { id: 'i7', name: 'オリーブオイル', amountText: '大さじ1' },
        { id: 'i8', name: 'デルモンテ トマトケチャップ', amountText: '適量' },
      ],
      [
        {
          id: 's1',
          title:
            'じゃがいもは皮をむき、8等分して水にさらし、水気を軽くきる。耐熱皿に並べて電子レンジ（600W）で約3分半加熱し、手早くつぶす。',
        },
        { id: 's2', title: 'ハムは7mm角ぐらいに切り、プチトマトは4つ割にする。' },
        {
          id: 's3',
          title:
            'ボウルに卵を溶きほぐし、前のステップで準備したじゃがいもと具材、チーズ、しょうゆを混ぜ合わせる。',
        },
        {
          id: 's4',
          title:
            '直径18～20cmのフライパンにオリーブオイルを熱し、前のステップの卵液を一気に流し入れる。菜箸で何か所かすき間をつくり、そこに卵液を流し込むようにする。周りがかたまってきたら弱火にして少し焼く。',
        },
        {
          id: 's5',
          title:
            '皿をかぶせてひっくり返し、フライパンにもどし入れて2分ほど焼き、器に盛りつけてトマトケチャップをかける。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00001945/',
    ),
    buildRecipe(
      'sample-egg-4',
      'ジャーマンオムレツ',
      byName('卵'),
      [
        { id: 'i1', name: 'じゃがいも（中）', amountText: '2個' },
        { id: 'i2', name: 'ソーセージ', amountText: '2本' },
        { id: 'i3', name: '卵', amountText: '3個' },
        { id: 'i4', name: 'オリーブオイル', amountText: '大さじ1' },
        { id: 'i5', name: '玉ねぎ（みじん切り）', amountText: '1/4個分' },
        {
          id: 'i6',
          name: 'キッコーマンいつでも新鮮しぼりたて生しょうゆ',
          amountText: '小さじ1',
        },
        { id: 'i7', name: '塩', amountText: '少々' },
        { id: 'i8', name: '黒こしょう（粗びき）', amountText: '適量' },
        { id: 'i9', name: 'デルモンテ トマトケチャップ', amountText: '適量' },
        { id: 'i10', name: 'パセリ', amountText: '適宜' },
      ],
      [
        {
          id: 's1',
          title:
            'じゃがいもは皮をむいて1cm角に切り、耐熱ボウルに入れてふんわりラップをして電子レンジ（600W）で2～3分加熱する。',
        },
        { id: 's2', title: 'ソーセージは小口切りにし、卵は溶きほぐす。' },
        {
          id: 's3',
          title:
            'フライパンにオリーブオイル大さじ1/2を中火で熱してソーセージを炒め、玉ねぎも加えてしんなりするまで炒め、しょうゆを加え、塩と黒こしょうをふって取り出す。',
        },
        {
          id: 's4',
          title:
            'フライパンをふいて残りのオリーブオイルを中火で熱し、卵を流し入れ、大きくフライパンをまわして卵液を広げ、前のステップで加熱したじゃがいもと前のステップで炒めた具材を加えてふたをし、2分蒸し焼きにする。',
        },
        { id: 's5', title: '器に盛りつけ、トマトケチャップをかけ、あればパセリをちらす。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00002105/',
    ),
    buildRecipe(
      'sample-egg-5',
      '明石焼き風だしオムレツ',
      byName('卵'),
      [
        { id: 'i1', name: '卵', amountText: '3個' },
        { id: 'i2', name: 'たこ（ゆでたもの）', amountText: '50g' },
        { id: 'i3', name: 'サラダ油', amountText: '小さじ2' },
        { id: 'i4', name: '三つ葉（2cm幅に切る）', amountText: '適量' },
        { id: 'i5', name: '水', amountText: '大さじ1' },
        {
          id: 'i6',
          name: 'キッコーマンいつでも新鮮旨み広がるだししょうゆ',
          amountText: '小さじ1',
        },
        { id: 'i7', name: '水', amountText: '1/4カップ' },
        { id: 'i8', name: 'キッコーマン旨みひろがる 香り白だし', amountText: '小さじ1' },
      ],
      [
        { id: 's1', title: 'たこは小さめのひと口大に切る。' },
        {
          id: 's2',
          title:
            'ボウルに卵を割りほぐし、水とだししょうゆを加えて混ぜ、前のステップで切ったたこを加えて混ぜ合わせる。',
        },
        {
          id: 's3',
          title:
            '直径20cmのフライパンに油を中火で熱し、前のステップの卵液を流し入れる。縁が固まってきたら菜箸で大きく数回混ぜ、半熟状になったら半分に折りたたむ。',
        },
        {
          id: 's4',
          title: '耐熱容器に水と白だしを入れ、ラップをかけずに電子レンジ（600W）で1分加熱する。',
        },
        {
          id: 's5',
          title:
            '器に前のステップで焼いたオムレツを盛り、前のステップで温めたつゆをかけ、三つ葉をちらす。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00056761/',
    ),
    buildRecipe(
      'sample-egg-6',
      '卵かけごはん（サクサクしょうゆ使用）',
      byName('卵'),
      [
        { id: 'i1', name: 'ご飯', amountText: '1杯' },
        { id: 'i2', name: 'キッコーマン サクサクしょうゆ', amountText: '大さじ1' },
        { id: 'i3', name: '卵', amountText: '1個' },
      ],
      [
        { id: 's1', title: '器にご飯をよそい、サクサクしょうゆをのせ、生卵を割り入れる。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00003982/',
    ),

    // サラダ (6)
    buildRecipe(
      'sample-salad-1',
      'チョップド・シーザーサラダ',
      byName('サラダ'),
      [
        { id: 'i1', name: 'お好みのカット野菜', amountText: '1袋' },
        { id: 'i2', name: '蒸し大豆', amountText: '大さじ6' },
        { id: 'i3', name: 'ベーコン', amountText: '30g' },
        { id: 'i4', name: 'シーザーサラダドレッシング', amountText: '適量' },
      ],
      [
        { id: 's1', title: 'ベーコンはフライパンで焼いてざっくりと刻む。' },
        {
          id: 's2',
          title:
            '前のステップで刻んだベーコンにお好みのカット野菜を入れてさらにざっくりと刻み、蒸し大豆を加える。',
        },
        { id: 's3', title: '器に盛ってシーザーサラダドレッシングをかけ、よく混ぜていただく。' },
      ],
      false,
      undefined,
      'https://www.fujicco.co.jp/recipe/detail_766.html',
    ),
    buildRecipe(
      'sample-salad-2',
      'ツナコーンの青じそマカロニサラダ',
      byName('サラダ'),
      [
        { id: 'i1', name: 'マカロニ（乾麺）', amountText: '80g' },
        { id: 'i2', name: 'ツナ缶（汁気を切ったもの）', amountText: '1缶' },
        { id: 'i3', name: 'ホールコーン（汁気を切ったもの）', amountText: '60g' },
        { id: 'i4', name: 'きゅうり', amountText: '1/2本' },
        { id: 'i5', name: 'リケンのノンオイル 青じそ', amountText: '大さじ2' },
      ],
      [
        { id: 's1', title: 'きゅうりは薄切りにし、塩水（分量外）に5～10分さらして水気をしぼる。' },
        {
          id: 's2',
          title:
            '鍋に湯を沸かし、塩（分量外）を入れてマカロニを表示通りに茹で、さっと水で締めて水気をきる。',
        },
        {
          id: 's3',
          title:
            '前のステップで水気を切った材料にツナとコーン、ドレッシングを入れて和え、器に盛る。',
        },
      ],
      false,
      undefined,
      'https://www.rikenvitamin.jp/recipe/detail/K05706.html',
    ),
    buildRecipe(
      'sample-salad-3',
      'ポテトサラダ',
      byName('サラダ'),
      [
        { id: 'i1', name: 'じゃがいも（大/男爵）', amountText: '3コ（約500g）' },
        { id: 'i2', name: '米酢', amountText: '小さじ1' },
        { id: 'i3', name: 'きゅうり（小口切り）', amountText: '1本分' },
        { id: 'i4', name: 'たまねぎ（薄切り）', amountText: '1/4コ分' },
        { id: 'i5', name: 'ロースハム（薄切り）', amountText: '3枚' },
        { id: 'i6', name: '自家製マヨネーズ', amountText: '大さじ6～7' },
        { id: 'i7', name: 'パプリカパウダー', amountText: '適宜' },
        { id: 'i8', name: 'オリーブ油', amountText: '大さじ1' },
        { id: 'i9', name: '塩', amountText: '適量' },
        { id: 'i10', name: 'こしょう', amountText: '適量' },
      ],
      [
        {
          id: 's1',
          title:
            'じゃがいもは皮付きのまま蒸し、柔らかくなったら皮をむいて芽を除き、熱いうちに粗めにつぶす。オリーブ油、米酢、塩小さじ1/3、こしょう少々を順に加えて混ぜ、下味をつける。',
        },
        {
          id: 's2',
          title:
            'きゅうりは塩少々をふってしばらくおき、軽くもんで水けを絞る。たまねぎは水にさらして水けをきり、塩少々をふってしんなりするまで揉んで水けを絞る。ハムは1cm四方に切る。',
        },
        {
          id: 's3',
          title:
            '前のステップで下味をつけたじゃがいもの粗熱が取れたら、前のステップで準備した野菜とハムを加えて軽く混ぜ、マヨネーズを加えて混ぜる。味をみて塩・こしょうで調え、器に盛ってパプリカパウダーをふる。',
        },
      ],
      false,
      undefined,
      'https://www.kyounoryouri.jp/recipe/41539_%E3%83%9D%E3%83%86%E3%83%88%E3%82%B5%E3%83%A9%E3%83%80.html',
    ),
    buildRecipe(
      'sample-salad-4',
      'あっさりピリ辛春雨サラダ',
      byName('サラダ'),
      [
        { id: 'i1', name: '春雨（乾）', amountText: '50g' },
        { id: 'i2', name: 'きゅうり', amountText: '1/2本' },
        { id: 'i3', name: 'ハム（薄切り）', amountText: '1枚' },
        { id: 'i4', name: 'キッコーマンしぼりたて生ぽんず', amountText: '大さじ1' },
        { id: 'i5', name: 'ラー油', amountText: '少々' },
      ],
      [
        { id: 's1', title: '春雨は熱湯に漬けてもどし、水洗いして4～5cm長さに切る。' },
        { id: 's2', title: 'きゅうりは斜めせん切り、ハムもせん切りにする。' },
        {
          id: 's3',
          title: '前のステップで準備した春雨と具材をボウルで合わせ、ぽんずとラー油で和える。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00000771/',
    ),
    buildRecipe(
      'sample-salad-5',
      '豆腐サラダ（熱々ベーコン）',
      byName('サラダ'),
      [
        { id: 'i1', name: '絹ごし豆腐', amountText: '1丁' },
        { id: 'i2', name: 'プチトマト', amountText: '6個' },
        { id: 'i3', name: 'セロリ', amountText: '1/4本' },
        { id: 'i4', name: 'ねぎ', amountText: '1/4本' },
        { id: 'i5', name: '青じそ', amountText: '5枚' },
        { id: 'i6', name: 'ベーコン（スライス）', amountText: '2枚' },
        { id: 'i7', name: 'キッコーマンしぼりたて生ぽんず', amountText: '大さじ2' },
        { id: 'i8', name: 'オリーブオイル', amountText: '小さじ1' },
      ],
      [
        { id: 's1', title: '豆腐は半分に切って皿に盛りつける。' },
        {
          id: 's2',
          title: 'プチトマトは4～8つに切り、セロリはさいの目切りにし、前のステップで盛った豆腐の上にのせる。',
        },
        {
          id: 's3',
          title:
            'ねぎは白髪ねぎにし、青じそはせん切りにして、それぞれ水にさらし、合わせて水気を取る。前のステップでのせた野菜の上にふんわりのせ、ぽんずをかける。',
        },
        {
          id: 's4',
          title: 'ベーコンは5mm角に切り、オリーブオイルでカリカリになるまで炒め、熱々を前のステップの上からかける。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00001179/',
    ),
    buildRecipe(
      'sample-salad-6',
      'カッテージチーズのカプレーゼ風',
      byName('サラダ'),
      [
        { id: 'i1', name: '雪印北海道100 カッテージチーズ', amountText: '20g' },
        { id: 'i2', name: 'トマト', amountText: '1個' },
        { id: 'i3', name: 'バジルの葉', amountText: '5枚' },
        { id: 'i4', name: 'オリーブ油', amountText: '大さじ1' },
        { id: 'i5', name: '塩・粗びき黒こしょう', amountText: '適量' },
      ],
      [
        { id: 's1', title: 'トマトは5～7mm厚さの輪切りにする。' },
        {
          id: 's2',
          title:
            '前のステップで切ったトマトとバジルの葉を交互に重ねて盛り、カッテージチーズをのせ、オリーブ油をかける。',
        },
        { id: 's3', title: '前のステップで盛りつけたサラダに塩、粗びきこしょうをふる。' },
      ],
      false,
      undefined,
      'https://www.meg-snow.com/recipe/detail/3011.html',
    ),

    // スープ (6)
    buildRecipe(
      'sample-soup-1',
      'かんたんミネストローネ',
      byName('スープ'),
      [
        { id: 'i1', name: 'たまねぎ', amountText: '1/4個（50g）' },
        { id: 'i2', name: 'ピーマン', amountText: '1個（25g）' },
        { id: 'i3', name: 'にんじん', amountText: '1/4本（40g）' },
        { id: 'i4', name: 'エリンギ', amountText: '1本（40g）' },
        { id: 'i5', name: 'じゃがいも', amountText: '1個（150g）' },
        { id: 'i6', name: 'ウインナーソーセージ', amountText: '2本' },
        { id: 'i7', name: 'ピザソース', amountText: '大さじ4' },
        { id: 'i8', name: '固形スープの素', amountText: '1個' },
        { id: 'i9', name: '水', amountText: '600ml' },
        { id: 'i10', name: '塩', amountText: '少々' },
        { id: 'i11', name: 'こしょう', amountText: '少々' },
        { id: 'i12', name: 'さけるチーズ プレーン', amountText: '1本' },
      ],
      [
        {
          id: 's1',
          title:
            'たまねぎ、ピーマン、にんじん、エリンギ、じゃがいも、ウインナーソーセージは粗みじん切りにする。',
        },
        {
          id: 's2',
          title:
            '前のステップで切った具材とピザソース、固形スープの素、水を鍋に入れ、沸騰したら弱火で野菜がやわらかくなるまで煮る。',
        },
        { id: 's3', title: 'さけるチーズは薄く輪切りにする。' },
        {
          id: 's4',
          title: '前のステップで煮たスープを塩・こしょうで味を調え、器に盛ってチーズをのせる。',
        },
      ],
      false,
      undefined,
      'https://www.meg-snow.com/recipe/detail/3067.html',
    ),
    buildRecipe(
      'sample-soup-2',
      'コーンポタージュ',
      byName('スープ'),
      [
        { id: 'i1', name: 'クリームコーン', amountText: '190g' },
        { id: 'i2', name: '牛乳', amountText: '1カップ' },
        { id: 'i3', name: 'バター', amountText: '10g' },
        { id: 'i4', name: '小麦粉', amountText: '大さじ1' },
        { id: 'i5', name: '塩', amountText: '小さじ1/4' },
        { id: 'i6', name: 'こしょう', amountText: '少々' },
        { id: 'i7', name: '生クリーム', amountText: '大さじ2' },
        { id: 'i8', name: 'パセリ（みじん切り）', amountText: '少々' },
        { id: 'i9', name: '水', amountText: '3/4カップ' },
      ],
      [
        {
          id: 's1',
          title:
            '鍋にバターを溶かし、小麦粉を加えて弱火で炒め、火からおろして水を少しずつ加えて混ぜる。',
        },
        {
          id: 's2',
          title:
            '前のステップの鍋を中火にかけてクリームコーンを加えて混ぜ、煮立ったら弱火で4～5分煮る。',
        },
        {
          id: 's3',
          title:
            '前のステップのスープに牛乳、塩、こしょうを加えてひと煮立ちさせ、生クリームを加えて混ぜ、器に盛ってパセリをふる。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00001833/',
    ),
    buildRecipe(
      'sample-soup-3',
      '基本の味噌汁（豆腐とわかめ）',
      byName('スープ'),
      [
        { id: 'i1', name: '絹ごし豆腐', amountText: '150g' },
        { id: 'i2', name: 'わかめ（生）', amountText: '20～30g' },
        { id: 'i3', name: '長ねぎ', amountText: '1/4本' },
        { id: 'i4', name: 'だし汁', amountText: '400ml' },
        { id: 'i5', name: 'みそ', amountText: '大さじ2' },
      ],
      [
        { id: 's1', title: 'だし汁を用意する。' },
        {
          id: 's2',
          title: 'わかめを洗って戻し、3cm幅に切る。豆腐は1.5cm角、長ねぎは小口切りにする。',
        },
        {
          id: 's3',
          title:
            '前のステップで用意しただし汁を鍋に入れて火にかけ、豆腐とわかめを加えて煮立たせる。',
        },
        { id: 's4', title: '前のステップで火が通ったら一度火を止める。' },
        {
          id: 's5',
          title: '前のステップで沸騰が収まったらみそを溶き入れ、煮立たせないように温める。',
        },
        { id: 's6', title: '前のステップの煮えばなで長ねぎを加え、さっと混ぜて火を止める。' },
      ],
      false,
      undefined,
      'https://www.hikarimiso.co.jp/recipe/miso-soup/4899/',
    ),
    buildRecipe(
      'sample-soup-4',
      'わかめスープ',
      byName('スープ'),
      [
        { id: 'i1', name: 'わかめ（乾）', amountText: '2g' },
        { id: 'i2', name: 'ごま', amountText: '少々' },
        { id: 'i3', name: '長ねぎ', amountText: '少々' },
        { id: 'i4', name: 'モランボン 海鮮スープ（スンブチゲ用）', amountText: '25g' },
        { id: 'i5', name: '水', amountText: '150ml' },
      ],
      [
        { id: 's1', title: 'わかめは戻して食べやすい大きさに切る。' },
        { id: 's2', title: '鍋にスープの素と水を入れて軽く煮立たせる。' },
        { id: 's3', title: '前のステップの鍋にわかめと小口切りの長ねぎを加えてひと煮立ちさせる。' },
        { id: 's4', title: '器に盛り、前のステップのスープにごまをふる。' },
      ],
      false,
      undefined,
      'https://www.moranbong.co.jp/recipe/detail/24/',
    ),
    buildRecipe(
      'sample-soup-5',
      'オニオンスープ（チーズトーストのせ）',
      byName('スープ'),
      [
        { id: 'i1', name: '玉ねぎ', amountText: '1個' },
        { id: 'i2', name: 'フランスパン（薄切り）', amountText: '4枚' },
        { id: 'i3', name: 'バター', amountText: '大さじ2' },
        { id: 'i4', name: 'キッコーマンしぼりたて生しょうゆ', amountText: '小さじ1' },
        { id: 'i5', name: 'こしょう', amountText: '少々' },
        { id: 'i6', name: 'ピザ用チーズ', amountText: '40g' },
        { id: 'i7', name: '洋風スープの素（固形）', amountText: '1個' },
        { id: 'i8', name: '湯', amountText: '2カップ' },
      ],
      [
        { id: 's1', title: 'フランスパンはトースターで軽く焼く。' },
        {
          id: 's2',
          title:
            '玉ねぎは薄切りにし、電子レンジ（600W）で4分加熱する。',
        },
        {
          id: 's3',
          title:
            'フライパンにバター大さじ1を溶かし、前のステップで加熱した玉ねぎを強火で炒め、色がついたら弱火にしてさらに炒める。',
        },
        {
          id: 's4',
          title:
            '洋風スープの素を湯で溶き、前のステップで炒めた玉ねぎに少しずつ加えて煮る。しょうゆとこしょうで調味する。',
        },
        {
          id: 's5',
          title:
            '耐熱容器に前のステップのスープを注ぎ、前のステップで焼いたパンを浮かべ、チーズを散らしてオーブントースターで焼き色がつくまで焼く。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00006832/',
    ),
    buildRecipe(
      'sample-soup-6',
      'とろとろねぎと鶏団子のうま塩スープ',
      byName('スープ'),
      [
        { id: 'i1', name: '鶏ひき肉', amountText: '100g' },
        { id: 'i2', name: '長ねぎ', amountText: '1/2本' },
        { id: 'i3', name: 'にんじん', amountText: '25g' },
        { id: 'i4', name: '酒（鶏団子用）', amountText: '大さじ1/2' },
        { id: 'i5', name: '片栗粉', amountText: '大さじ1/2' },
        { id: 'i6', name: '塩（鶏団子用）', amountText: '少々' },
        { id: 'i7', name: 'こしょう（鶏団子用）', amountText: '少々' },
        { id: 'i8', name: 'しょうが（チューブ）', amountText: '1～2cm' },
        { id: 'i9', name: '水', amountText: '200ml' },
        { id: 'i10', name: '酒（スープ用）', amountText: '小さじ1' },
        { id: 'i11', name: '鶏がらスープの素', amountText: '小さじ1' },
        { id: 'i12', name: 'しょうゆ', amountText: '小さじ1/3' },
        { id: 'i13', name: 'みりん', amountText: '小さじ1/3' },
        { id: 'i14', name: '塩（スープ用）', amountText: '少々' },
        { id: 'i15', name: 'にんにく（チューブ）', amountText: '1～2cm' },
        { id: 'i16', name: '粗挽き黒こしょう', amountText: '適量' },
        { id: 'i17', name: 'ごま油', amountText: '適量' },
      ],
      [
        {
          id: 's1',
          title:
            '鶏ひき肉に酒、片栗粉、塩、こしょう、しょうがを加えてよくこね、鶏団子を作る。',
        },
        { id: 's2', title: '長ねぎは斜め切り、にんじんは輪切りにする。' },
        {
          id: 's3',
          title:
            '鍋に水と酒、鶏がらスープの素、しょうゆ、みりん、塩、にんにくを入れ、前のステップで切った野菜を加えて2～3分煮る。',
        },
        {
          id: 's4',
          title: '前のステップの鍋に鶏団子を加えてさらに2～3分煮る。',
        },
        {
          id: 's5',
          title:
            '前のステップで煮たスープをスープジャーに注ぎ、粗挽き黒こしょうとごま油をふる。',
        },
      ],
      false,
      undefined,
      'https://www.thermos.jp/recipe/detail/2006.html',
    ),

    // ご飯物 (6)
    buildRecipe(
      'sample-rice-1',
      '親子丼',
      byName('ご飯物'),
      [
        { id: 'i1', name: '鶏むね肉（桜姫®）', amountText: '1枚' },
        { id: 'i2', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i3', name: '卵', amountText: '3個' },
        { id: 'i4', name: '三つ葉', amountText: '1/4束' },
        { id: 'i5', name: 'ご飯', amountText: '2〜3人分' },
        { id: 'i6', name: '片栗粉', amountText: '少々' },
        { id: 'i7', name: '塩', amountText: '少々' },
        { id: 'i8', name: '砂糖', amountText: '少々' },
        { id: 'i9', name: '水', amountText: '150ml' },
        { id: 'i10', name: 'みりん', amountText: '大さじ2' },
        { id: 'i11', name: '醤油', amountText: '大さじ2' },
        { id: 'i12', name: 'かつおぶし', amountText: '3g' },
      ],
      [
        {
          id: 's1',
          title:
            '玉ねぎは薄切り、三つ葉はざく切り、鶏肉は一口大のそぎ切りにし、塩と砂糖で下味をつけて10分おく。',
        },
        {
          id: 's2',
          title: '鍋に水、みりん、しょうゆ、かつおぶしを入れて煮立て、玉ねぎを加える。',
        },
        { id: 's3', title: '前のステップで下味をつけた鶏肉に片栗粉をまぶす。' },
        { id: 's4', title: '前のステップで煮立てた鍋に鶏肉を加え、2分煮る。' },
        {
          id: 's5',
          title:
            '卵を溶きほぐし、前のステップで煮た具に回し入れ、半熟状になったらご飯にのせ、三つ葉を散らす。',
        },
      ],
      false,
      undefined,
      'https://www.nipponham.co.jp/recipes/16663/',
    ),
    buildRecipe(
      'sample-rice-2',
      'レンジで作る簡単かつ丼',
      byName('ご飯物'),
      [
        { id: 'i1', name: 'ご飯', amountText: '丼ぶり1杯分' },
        { id: 'i2', name: 'とんかつ（お惣菜）', amountText: '1枚' },
        { id: 'i3', name: '玉ねぎ', amountText: '1/4個' },
        { id: 'i4', name: '卵', amountText: '2個' },
        { id: 'i5', name: 'めんつゆ', amountText: '50ml' },
        { id: 'i6', name: '水', amountText: '50ml' },
        { id: 'i7', name: 'みつば', amountText: '適量' },
      ],
      [
        { id: 's1', title: '玉ねぎは5mm幅に切り、とんかつは2cm幅に切る。' },
        {
          id: 's2',
          title:
            '耐熱容器にめんつゆと水、前のステップで切った玉ねぎを入れ、ラップをかけて電子レンジ（600W）で2分加熱する。',
        },
        {
          id: 's3',
          title:
            '前のステップの容器にとんかつと溶き卵を入れ、再びラップをかけて電子レンジ（600W）で3分加熱する。',
        },
        {
          id: 's4',
          title: '丼にご飯を盛り、前のステップで加熱した具をのせ、みつばを飾る。',
        },
      ],
      false,
      undefined,
      'https://www.yamaki.co.jp/recipe/%E3%83%AC%E3%83%B3%E3%82%B8%E3%81%A7%E4%BD%9C%E3%82%8B%E7%B0%A1%E5%8D%98%E3%81%8B%E3%81%A4%E4%B8%BC/',
    ),
    buildRecipe(
      'sample-rice-3',
      '濃厚チャーハン',
      byName('ご飯物'),
      [
        { id: 'i1', name: 'ご飯', amountText: '500g' },
        { id: 'i2', name: '卵', amountText: '1個' },
        { id: 'i3', name: 'ねぎ', amountText: '1/2本' },
        { id: 'i4', name: 'サラダ油', amountText: '大さじ1と1/2' },
        { id: 'i5', name: '焼肉屋さん 濃厚だれ', amountText: '大さじ3' },
      ],
      [
        { id: 's1', title: '卵を溶きほぐし、ねぎは小口切りにする。' },
        {
          id: 's2',
          title:
            'フライパンに油大さじ1/2を熱し、前のステップで溶いた卵を流し入れて炒り卵を作り、取り出す。',
        },
        {
          id: 's3',
          title:
            '前のステップのフライパンに油大さじ1を足してねぎを炒め、ご飯を加えてほぐしながら炒める。',
        },
        {
          id: 's4',
          title:
            '前のステップで炒めたご飯に、前のステップで作った炒り卵と濃厚だれを加え、手早く炒め合わせる。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00005113/',
    ),
    buildRecipe(
      'sample-rice-4',
      'タコライス',
      byName('ご飯物'),
      [
        { id: 'i1', name: '完熟トマトのハヤシライスソース＜香ばしスパイシー＞', amountText: '1/2箱' },
        { id: 'i2', name: '牛豚ひき肉', amountText: '300g' },
        { id: 'i3', name: '玉ねぎ（みじん切り）', amountText: '中1・1/2個' },
        { id: 'i4', name: 'サラダ油', amountText: '大さじ1' },
        { id: 'i5', name: '水', amountText: '100ml' },
        { id: 'i6', name: 'レタス', amountText: '2〜3枚' },
        { id: 'i7', name: 'トマト', amountText: '1個' },
        { id: 'i8', name: 'ご飯', amountText: '分量外' },
      ],
      [
        {
          id: 's1',
          title: 'フライパンに油を熱し、玉ねぎを約4分炒め、ひき肉を加えて約3分炒める。',
        },
        {
          id: 's2',
          title:
            '前のステップのフライパンに水を加えて沸騰したらいったん火を止め、ルウを割り入れて溶かす。',
        },
        { id: 's3', title: '前のステップのフライパンを弱火にかけ、時々かき混ぜながら約2分煮込む。' },
        {
          id: 's4',
          title:
            '皿にご飯を盛り、前のステップで作ったタコミートをのせ、細切りのレタスと角切りのトマトをトッピングする。',
        },
      ],
      false,
      undefined,
      'https://housefoods.jp/recipe/rcp_00002397.html',
    ),
    buildRecipe(
      'sample-rice-5',
      'こどもキーマカレー',
      byName('ご飯物'),
      [
        { id: 'i1', name: '玉ねぎ', amountText: '20g' },
        { id: 'i2', name: 'にんじん', amountText: '20g' },
        { id: 'i3', name: 'ひき肉', amountText: '30g' },
        { id: 'i4', name: 'コーン', amountText: '20g' },
        { id: 'i5', name: 'サラダ油', amountText: '小さじ1' },
        { id: 'i6', name: '水', amountText: '100ml' },
        { id: 'i7', name: 'S&B カレーの王子さま 顆粒', amountText: '1袋' },
        { id: 'i8', name: '白飯', amountText: '160g' },
        { id: 'i9', name: 'S&B パセリ', amountText: '適宜' },
      ],
      [
        { id: 's1', title: '玉ねぎとにんじんはみじん切りにする。' },
        {
          id: 's2',
          title:
            '鍋に油を熱し、前のステップで切った玉ねぎとにんじんを炒め、ひき肉を加えてさらに炒める。',
        },
        {
          id: 's3',
          title:
            '前のステップの鍋にコーンと水、カレーの王子さま顆粒を加え、弱火でとろみがつくまで煮込む。',
        },
        {
          id: 's4',
          title:
            '皿に白飯を盛り、前のステップで作ったキーマカレーをかけ、パセリを散らす。',
        },
      ],
      false,
      undefined,
      'https://www.sbfoods.co.jp/recipe/detail/07932.html',
    ),
    buildRecipe(
      'sample-rice-6',
      '焼きおにぎり',
      byName('ご飯物'),
      [
        { id: 'i1', name: 'ご飯', amountText: '茶碗2杯分' },
        { id: 'i2', name: 'サラダ油', amountText: '大さじ2' },
        { id: 'i3', name: 'しょうゆ', amountText: '大さじ1と1/2' },
      ],
      [
        { id: 's1', title: 'ご飯を4等分し、俵形のおにぎりを作る。' },
        {
          id: 's2',
          title:
            'フライパンに油を中火で熱し、前のステップで作ったおにぎりを入れて、両面を5分ずつ焼く。',
        },
        { id: 's3', title: '前のステップで焼いたおにぎりにしょうゆを回しかけ、全体に焼きつける。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00003248/',
    ),

    // 麺 (6)
    buildRecipe(
      'sample-noodles-1',
      'ナポリタン',
      byName('麺'),
      [
        { id: 'i1', name: 'スパゲッティ', amountText: '200g' },
        { id: 'i2', name: 'ウインナーソーセージ', amountText: '4本' },
        { id: 'i3', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i4', name: 'ピーマン', amountText: '2個' },
        { id: 'i5', name: 'マッシュルーム', amountText: '4個' },
        { id: 'i6', name: 'サラダ油', amountText: '大さじ2' },
        { id: 'i7', name: 'ケチャップ', amountText: '大さじ6' },
        {
          id: 'i8',
          name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ',
          amountText: '大さじ1/2',
        },
        { id: 'i9', name: '塩', amountText: '少々' },
        { id: 'i10', name: 'こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'スパゲッティは塩（分量外）を加えた湯で袋の表示時間どおりにゆでる。' },
        {
          id: 's2',
          title: 'ウインナーは斜め切り、玉ねぎとピーマンは薄切り、マッシュルームは薄切りにする。',
        },
        {
          id: 's3',
          title:
            'フライパンにサラダ油を熱し、ウインナー→玉ねぎ→ピーマン→マッシュルームの順に炒め、塩とこしょうで調味する。',
        },
        {
          id: 's4',
          title:
            'ケチャップを加えて炒め、香りが立ったらしょうゆを回し入れて炒め、前のステップでゆでたスパゲッティを加えて炒め合わせる。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00003295/',
    ),
    buildRecipe(
      'sample-noodles-2',
      'カルボナーラ',
      byName('麺'),
      [
        { id: 'i1', name: 'スパゲッティ', amountText: '200g' },
        { id: 'i2', name: 'ベーコン', amountText: '4枚' },
        { id: 'i3', name: 'にんにく', amountText: '1/2かけ' },
        { id: 'i4', name: 'オリーブオイル', amountText: '大さじ2' },
        { id: 'i5', name: '卵', amountText: '2個' },
        { id: 'i6', name: '生クリーム', amountText: '200ml' },
        { id: 'i7', name: '粉チーズ', amountText: '1/2カップ' },
        { id: 'i8', name: '塩', amountText: '小さじ1/2' },
        { id: 'i9', name: 'こしょう', amountText: '少々' },
        { id: 'i10', name: '粗びき黒こしょう', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'スパゲッティは塩（分量外）を加えた湯でゆでる。' },
        { id: 's2', title: 'ベーコンは1cm幅、にんにくは薄切りにする。' },
        {
          id: 's3',
          title: 'フライパンにオリーブオイルとにんにくを入れて弱火で炒め、香りが出たらベーコンを炒める。',
        },
        { id: 's4', title: 'ボウルに卵、生クリーム、粉チーズ、塩、こしょうを混ぜる。' },
        {
          id: 's5',
          title: '前のステップでゆでたスパゲッティを卵液に加えて和え、前のステップで炒めたベーコンも加える。',
        },
        { id: 's6', title: '器に盛り、粗びき黒こしょうをふる。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00004346/',
    ),
    buildRecipe(
      'sample-noodles-3',
      '明太子クリームだしパスタ',
      byName('麺'),
      [
        { id: 'i1', name: 'スパゲッティ', amountText: '200g' },
        { id: 'i2', name: '明太子', amountText: '1腹' },
        { id: 'i3', name: 'しめじ', amountText: '100g' },
        { id: 'i4', name: '小ねぎ', amountText: '2本' },
        { id: 'i5', name: 'オリーブオイル', amountText: '大さじ1' },
        { id: 'i6', name: '生クリーム', amountText: '200ml' },
        { id: 'i7', name: 'キッコーマン 濃いだし本つゆ', amountText: '大さじ2' },
      ],
      [
        { id: 's1', title: 'スパゲッティは塩（分量外）を加えた湯でゆでる。' },
        { id: 's2', title: '明太子は薄皮を取り、しめじは小房に分け、小ねぎは小口切りにする。' },
        {
          id: 's3',
          title:
            'フライパンにオリーブオイルを熱し、しめじを炒め、生クリームと濃いだし本つゆを加えて温める。',
        },
        {
          id: 's4',
          title:
            '前のステップでゆでたスパゲッティを加えてからめ、明太子を加えてさっと混ぜ、小ねぎを散らす。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00057689/',
    ),
    buildRecipe(
      'sample-noodles-4',
      '冷し中華',
      byName('麺'),
      [
        { id: 'i1', name: '中華麺（生）', amountText: '2玉' },
        { id: 'i2', name: '焼豚', amountText: '4枚' },
        { id: 'i3', name: '卵', amountText: '2個' },
        { id: 'i4', name: 'きゅうり', amountText: '1/2本' },
        { id: 'i5', name: 'トマト', amountText: '1個' },
        { id: 'i6', name: 'しらがねぎ', amountText: '1/2本' },
        { id: 'i7', name: 'めんつゆ（ストレート）', amountText: '1カップ' },
        { id: 'i8', name: '酢', amountText: '1/4カップ' },
        { id: 'i9', name: 'ごま油', amountText: '大さじ2' },
        { id: 'i10', name: '砂糖', amountText: '大さじ1' },
      ],
      [
        { id: 's1', title: '卵は溶きほぐし、フライパンで薄焼き卵を作って細切りにする。' },
        {
          id: 's2',
          title: 'きゅうりとトマトはせん切り、焼豚は細切りにし、ねぎは白髪ねぎにする。',
        },
        {
          id: 's3',
          title: '中華麺をゆでて冷水にとり、もみ洗いして水気を切る。',
        },
        { id: 's4', title: 'めんつゆ、酢、ごま油、砂糖を混ぜてたれを作る。' },
        { id: 's5', title: '器に麺を盛り、前のステップで用意した具をのせ、たれをかける。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00000968/',
    ),
    buildRecipe(
      'sample-noodles-5',
      '焼きうどん（基本のおかずつゆ）',
      byName('麺'),
      [
        { id: 'i1', name: 'ゆでうどん', amountText: '2玉' },
        { id: 'i2', name: '豚ばら肉（薄切り）', amountText: '100g' },
        { id: 'i3', name: '玉ねぎ', amountText: '1/2個' },
        { id: 'i4', name: 'にんじん', amountText: '1/3本' },
        { id: 'i5', name: 'キャベツ', amountText: '2枚' },
        { id: 'i6', name: 'サラダ油', amountText: '大さじ1/2' },
        { id: 'i7', name: 'キッコーマン 基本のおかずつゆ', amountText: '大さじ4' },
        { id: 'i8', name: '塩', amountText: '少々' },
        { id: 'i9', name: 'こしょう', amountText: '少々' },
        { id: 'i10', name: 'かつお節', amountText: '少々' },
      ],
      [
        {
          id: 's1',
          title: '豚肉はひと口大に切り、玉ねぎは薄切り、にんじんは短冊切り、キャベツはざく切りにする。',
        },
        {
          id: 's2',
          title: 'フライパンに油を熱し、豚肉を炒め、玉ねぎ・にんじん・キャベツを加えて炒め、塩・こしょうする。',
        },
        {
          id: 's3',
          title: 'うどんを加えてほぐし、基本のおかずつゆを回し入れて炒め合わせる。',
        },
        { id: 's4', title: '器に盛り、かつお節をかける。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00054809/',
    ),
    buildRecipe(
      'sample-noodles-6',
      'あまうまだし焼きうどん',
      byName('麺'),
      [
        { id: 'i1', name: 'ゆでうどん', amountText: '2玉' },
        { id: 'i2', name: '豚ばら肉（薄切り）', amountText: '80g' },
        { id: 'i3', name: 'キャベツ', amountText: '2枚' },
        { id: 'i4', name: 'にんじん', amountText: '1/3本' },
        { id: 'i5', name: 'しいたけ', amountText: '2枚' },
        { id: 'i6', name: 'ピーマン', amountText: '1個' },
        { id: 'i7', name: 'サラダ油', amountText: '大さじ1' },
        { id: 'i8', name: 'キッコーマン 濃いだし本つゆ', amountText: '大さじ4' },
        { id: 'i9', name: 'こしょう', amountText: '少々' },
        { id: 'i10', name: '削り節', amountText: '少々' },
      ],
      [
        {
          id: 's1',
          title: '豚肉はひと口大に切り、キャベツはざく切り、にんじんは短冊切り、しいたけは薄切り、ピーマンは細切りにする。',
        },
        {
          id: 's2',
          title: 'フライパンに油を熱し、豚肉を炒め、野菜を加えて炒め、こしょうをふる。',
        },
        {
          id: 's3',
          title: 'うどんを加えてほぐし、濃いだし本つゆを回し入れて炒め合わせる。',
        },
        { id: 's4', title: '器に盛り、削り節をかける。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00006842/',
    ),

    // お弁当 (6)
    buildRecipe(
      'sample-bento-1',
      '鶏の照り焼き',
      byName('お弁当'),
      [
        { id: 'i1', name: '鶏もも肉', amountText: '1枚（250g）' },
        { id: 'i2', name: 'サラダ油', amountText: '小さじ1' },
        { id: 'i3', name: 'しょうゆ', amountText: '大さじ1' },
        { id: 'i4', name: 'みりん', amountText: '大さじ1' },
        { id: 'i5', name: '酒', amountText: '大さじ1' },
        { id: 'i6', name: '砂糖', amountText: '小さじ1/2' },
      ],
      [
        { id: 's1', title: '鶏肉は筋切りをして厚みを均一にする。' },
        { id: 's2', title: 'しょうゆ、みりん、酒、砂糖を混ぜてたれを作る。' },
        {
          id: 's3',
          title: 'フライパンに油を熱し、鶏肉を皮目から焼き、焼き色がついたら裏返してふたをし、弱火で5〜6分焼く。',
        },
        {
          id: 's4',
          title: '前のステップのたれを加え、中火でからめながら照りをつける。',
        },
      ],
      false,
      undefined,
      'https://www.t-fal.co.jp/recipe/detail/?recipeId=505',
    ),
    buildRecipe(
      'sample-bento-2',
      'ほうれん草のごま和え',
      byName('お弁当'),
      [
        { id: 'i1', name: 'ほうれん草', amountText: '1束' },
        { id: 'i2', name: '白すりごま', amountText: '大さじ2' },
        { id: 'i3', name: '砂糖', amountText: '大さじ1/2' },
        {
          id: 'i4',
          name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ',
          amountText: '大さじ1',
        },
      ],
      [
        {
          id: 's1',
          title: 'ほうれん草はゆでて水にとり、水気をしぼって4cm長さに切る。',
        },
        { id: 's2', title: 'すりごま、砂糖、しょうゆを混ぜて和え衣を作る。' },
        { id: 's3', title: '前のステップで切ったほうれん草を加えて和える。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00000289/',
    ),
    buildRecipe(
      'sample-bento-3',
      'けんぴ風さつまいも甘煮',
      byName('お弁当'),
      [
        { id: 'i1', name: 'さつまいも', amountText: '200g' },
        { id: 'i2', name: 'サラダ油', amountText: '適量' },
        { id: 'i3', name: '水', amountText: '50ml' },
        { id: 'i4', name: '砂糖', amountText: '大さじ2' },
        { id: 'i5', name: 'しょうゆ', amountText: '小さじ1/2' },
        { id: 'i6', name: 'シナモン（パウダー）', amountText: '少々' },
      ],
      [
        {
          id: 's1',
          title: 'さつまいもは5mm角の拍子木切りにし、10分ほど水にさらして水気を切る。',
        },
        { id: 's2', title: 'サラダ油でさつまいもを揚げる。' },
        {
          id: 's3',
          title: 'フライパンに水、砂糖、しょうゆ、シナモンを入れて煮立て、前のステップで揚げたさつまいもを加えてからめる。',
        },
      ],
      false,
      undefined,
      'https://www.sbfoods.co.jp/recipe/detail/07932.html',
    ),
    buildRecipe(
      'sample-bento-4',
      'ひじきの煮物',
      byName('お弁当'),
      [
        { id: 'i1', name: '乾燥ひじき', amountText: '30g' },
        { id: 'i2', name: 'にんじん', amountText: '1/2本' },
        { id: 'i3', name: '油揚げ', amountText: '1枚' },
        { id: 'i4', name: 'サラダ油', amountText: '大さじ1/2' },
        { id: 'i5', name: 'しょうゆ', amountText: '大さじ2' },
        { id: 'i6', name: '砂糖', amountText: '大さじ2' },
        { id: 'i7', name: '酒', amountText: '大さじ2' },
        { id: 'i8', name: 'みりん', amountText: '大さじ2' },
        { id: 'i9', name: '水', amountText: '200ml' },
      ],
      [
        { id: 's1', title: 'ひじきは水で戻し、にんじんは細切り、油揚げは細切りにする。' },
        {
          id: 's2',
          title: 'フライパンに油を熱し、ひじき、にんじん、油揚げを炒める。',
        },
        {
          id: 's3',
          title: '水、しょうゆ、砂糖、酒、みりんを加え、煮汁が少なくなるまで中火で煮る。',
        },
      ],
      false,
      undefined,
      'https://www.t-fal.co.jp/recipe/detail/?recipeId=1732',
    ),
    buildRecipe(
      'sample-bento-5',
      '焼さけ入り厚焼きたまご焼き',
      byName('お弁当'),
      [
        { id: 'i1', name: '焼さけほぐし身', amountText: '30g' },
        { id: 'i2', name: '卵', amountText: '2個' },
        { id: 'i3', name: '砂糖', amountText: '大さじ1' },
        { id: 'i4', name: '塩', amountText: '少々' },
        { id: 'i5', name: 'サラダ油', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'ボウルに卵、焼さけほぐし身、砂糖、塩を入れてよく混ぜる。' },
        {
          id: 's2',
          title: '卵焼き器に油を薄くひき、前のステップの卵液を1/4量入れて巻く。同様に3〜4回繰り返す。',
        },
        { id: 's3', title: '食べやすい大きさに切る。' },
      ],
      false,
      undefined,
      'https://www.nissui.co.jp/recipe/01759.html',
    ),
    buildRecipe(
      'sample-bento-6',
      '香る炊き込みだしごはん ひじき',
      byName('お弁当'),
      [
        { id: 'i1', name: '米', amountText: '2合' },
        { id: 'i2', name: 'しめじ', amountText: '1パック' },
        { id: 'i3', name: 'にんじん', amountText: '1/4本' },
        { id: 'i4', name: 'ひじき（乾燥）', amountText: '5g' },
        { id: 'i5', name: '油揚げ', amountText: '1枚' },
        { id: 'i6', name: '水', amountText: '2合分' },
        {
          id: 'i7',
          name: 'キッコーマン いつでも新鮮 料理人直伝 極みだし',
          amountText: '35ml',
        },
        {
          id: 'i8',
          name: 'キッコーマン いつでも新鮮 料理人直伝 極み白だし',
          amountText: '15ml',
        },
        { id: 'i9', name: '酒', amountText: '大さじ1' },
        { id: 'i10', name: '塩', amountText: '小さじ1/2' },
      ],
      [
        {
          id: 's1',
          title: '米は洗って浸水し、ひじきは水で戻す。しめじはほぐし、油揚げとにんじんは細切りにする。',
        },
        {
          id: 's2',
          title:
            '炊飯器に米と調味料を入れ、2合の目盛りまで水を加えて混ぜ、前のステップの具をのせて普通炊飯する。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00006476/',
    ),

    // パン (6)
    buildRecipe(
      'sample-bread-1',
      'ガーリックトースト',
      byName('パン'),
      [
        { id: 'i1', name: 'フランスパン（薄切り）', amountText: '4枚' },
        { id: 'i2', name: 'バター', amountText: '30g' },
        { id: 'i3', name: 'にんにく', amountText: '1かけ' },
        { id: 'i4', name: 'パセリ', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'バターを室温に戻し、にんにくはすりおろし、パセリはみじん切りにして混ぜる。' },
        { id: 's2', title: 'フランスパンに前のステップのバターを塗り、オーブントースターで焼き色がつくまで焼く。' },
      ],
      false,
      undefined,
      'https://www.sbfoods.co.jp/recipe/detail/03140.html',
    ),
    buildRecipe(
      'sample-bread-2',
      'ピザトースト',
      byName('パン'),
      [
        { id: 'i1', name: '食パン', amountText: '2枚' },
        { id: 'i2', name: 'ピザソース', amountText: '大さじ2' },
        { id: 'i3', name: 'ウインナー', amountText: '2本' },
        { id: 'i4', name: 'ピーマン', amountText: '1/2個' },
        { id: 'i5', name: '玉ねぎ', amountText: '1/4個' },
        { id: 'i6', name: 'ピザ用チーズ', amountText: '40g' },
      ],
      [
        { id: 's1', title: 'ウインナーは斜め薄切り、ピーマンは輪切り、玉ねぎは薄切りにする。' },
        { id: 's2', title: '食パンにピザソースを塗り、前のステップの具材をのせてチーズを散らす。' },
        { id: 's3', title: 'オーブントースターで焼き色がつくまで焼く。' },
      ],
      false,
      undefined,
      'https://panasonic.jp/bistro/recipe/recipe_popular/0804.html',
    ),
    buildRecipe(
      'sample-bread-3',
      '編みこみチーズトースト',
      byName('パン'),
      [
        { id: 'i1', name: '食パン（6枚切り）', amountText: '1枚' },
        { id: 'i2', name: 'バター', amountText: '5g' },
        { id: 'i3', name: 'マヨネーズ', amountText: '10g' },
        { id: 'i4', name: '牛乳', amountText: '10g' },
        { id: 'i5', name: 'ピザ用チーズ', amountText: '10g' },
      ],
      [
        { id: 's1', title: 'バターとマヨネーズを混ぜ、牛乳を加えてさらに混ぜる。' },
        { id: 's2', title: '食パンの4辺から1cm内側を、5mm幅で切り込みを入れる。' },
        {
          id: 's3',
          title: '前のステップの切り込みにソースを塗り、チーズをはさみ、1000Wのオーブントースターで約10分焼く。',
        },
      ],
      false,
      undefined,
      'https://www.meg-snow.com/recipe/detail/10597/',
    ),
    buildRecipe(
      'sample-bread-4',
      'ホットBLTサンド',
      byName('パン'),
      [
        { id: 'i1', name: '食パン（8枚切り）', amountText: '2枚' },
        { id: 'i2', name: 'マヨネーズ', amountText: '大さじ2' },
        { id: 'i3', name: 'からし', amountText: '小さじ1/2' },
        { id: 'i4', name: 'ベーコン', amountText: '2枚' },
        { id: 'i5', name: 'レタス', amountText: '2枚' },
        { id: 'i6', name: 'トマト', amountText: '1/2個' },
      ],
      [
        { id: 's1', title: 'ベーコンをこんがり焼き、トマトは薄切りにする。' },
        { id: 's2', title: 'マヨネーズとからしを混ぜ、パンに塗る。' },
        { id: 's3', title: '前のステップで塗ったパンにレタス、トマト、ベーコンをのせ、もう1枚で挟んで焼く。' },
      ],
      false,
      undefined,
      'https://www.lettuceclub.net/recipe/dish/20377/',
    ),
    buildRecipe(
      'sample-bread-5',
      '贅沢フルーツサンド',
      byName('パン'),
      [
        { id: 'i1', name: '白いパン', amountText: '2枚' },
        { id: 'i2', name: '生クリーム', amountText: '100ml' },
        { id: 'i3', name: '砂糖', amountText: '7g' },
        { id: 'i4', name: 'いちご', amountText: '6個' },
        { id: 'i5', name: 'みかん缶', amountText: '50g' },
        { id: 'i6', name: 'キウイ', amountText: '1/2個' },
      ],
      [
        { id: 's1', title: '生クリームに砂糖を加えて泡立てる。' },
        {
          id: 's2',
          title:
            '白いパンに前のステップのクリームを塗り、フルーツを並べてさらにクリームを塗り、もう1枚で挟む。',
        },
        { id: 's3', title: 'ラップで包んで冷やし、食べやすい大きさに切る。' },
      ],
      false,
      undefined,
      'https://www.sbfoods.co.jp/recipe/detail/08256.html',
    ),
    buildRecipe(
      'sample-bread-6',
      'フレンチトースト',
      byName('パン'),
      [
        { id: 'i1', name: '食パン（6枚切り）', amountText: '2枚' },
        { id: 'i2', name: '卵', amountText: '1個' },
        { id: 'i3', name: '牛乳', amountText: '1/2カップ' },
        { id: 'i4', name: '砂糖', amountText: '20g' },
        { id: 'i5', name: 'バター', amountText: '大さじ1' },
        { id: 'i6', name: '粉砂糖', amountText: '適量' },
        { id: 'i7', name: 'メープルシロップ', amountText: '適量' },
      ],
      [
        {
          id: 's1',
          title: 'ボウルに卵を割り入れて混ぜ、牛乳と砂糖を加えてよく混ぜ、卵液を作る。',
        },
        {
          id: 's2',
          title:
            '食パンは好みの形に半分に切り、バットに並べて前のステップの卵液を流し入れ、10分ほど浸す（途中で上下を返す）。',
        },
        {
          id: 's3',
          title: 'フライパンにバターを中火で熱し、前のステップで浸したパンを並べて焼く。',
        },
        {
          id: 's4',
          title: '焼き色がついたら上下を返し、ふたをして弱火で2分30秒〜3分蒸し焼きにする。',
        },
        { id: 's5', title: '器に盛り、粉砂糖をふり、メープルシロップをかける。' },
      ],
      false,
      undefined,
      'https://www.kyounoryouri.jp/recipe/31829_%E3%83%95%E3%83%AC%E3%83%B3%E3%83%81%E3%83%88%E3%83%BC%E3%82%B9%E3%83%88.html',
    ),

    // お菓子 (6)
    buildRecipe(
      'sample-sweets-1',
      'チョコブラウニー',
      byName('お菓子'),
      [
        { id: 'i1', name: '明治 ブラックチョコレート', amountText: '50g' },
        { id: 'i2', name: '明治 ミルクチョコレート', amountText: '50g' },
        { id: 'i3', name: 'バター', amountText: '45g' },
        { id: 'i4', name: '卵', amountText: '2個' },
        { id: 'i5', name: '砂糖', amountText: '45g' },
        { id: 'i6', name: '薄力粉', amountText: '20g' },
        { id: 'i7', name: 'ココア', amountText: '10g' },
      ],
      [
        { id: 's1', title: 'バターとチョコレートを湯せんで溶かす。' },
        { id: 's2', title: '卵と砂糖をよく混ぜ、前のステップのチョコレートを加えて混ぜる。' },
        { id: 's3', title: '薄力粉とココアをふるい入れて混ぜ、生地を型に流す。' },
        { id: 's4', title: '170℃に予熱したオーブンで30〜35分焼く。' },
      ],
      false,
      undefined,
      'https://www.meiji.co.jp/hello-chocolate/recipe/icechoco/cat06/01.html',
    ),
    buildRecipe(
      'sample-sweets-2',
      'プリン',
      byName('お菓子'),
      [
        { id: 'i1', name: '卵', amountText: '2個' },
        { id: 'i2', name: '砂糖', amountText: '70g' },
        { id: 'i3', name: '牛乳', amountText: '400ml' },
        { id: 'i4', name: 'バニラエッセンス', amountText: '5〜6滴' },
        { id: 'i5', name: '砂糖（カラメル用）', amountText: '大さじ2' },
        { id: 'i6', name: '水（カラメル用）', amountText: '大さじ2' },
      ],
      [
        {
          id: 's1',
          title: '鍋にカラメル用の砂糖と水を入れて加熱し、色づいたら型に流し入れる。',
        },
        { id: 's2', title: '牛乳を温め、卵と砂糖、バニラエッセンスを混ぜる。' },
        { id: 's3', title: '前のステップの卵液に温めた牛乳を加えて混ぜ、こして型に流す。' },
        { id: 's4', title: '鍋に並べて湯を張り、ふたをして弱火で10〜12分蒸し、冷やす。' },
      ],
      false,
      undefined,
      'https://www.t-fal.co.jp/recipe/detail/?recipeId=2978_01',
    ),
    buildRecipe(
      'sample-sweets-3',
      'パンケーキ',
      byName('お菓子'),
      [
        { id: 'i1', name: 'ホットケーキミックス', amountText: '200g' },
        { id: 'i2', name: '牛乳', amountText: '150ml' },
        { id: 'i3', name: '卵', amountText: '1個' },
        { id: 'i4', name: 'サラダ油', amountText: '適量' },
      ],
      [
        { id: 's1', title: '卵と牛乳を混ぜ、ホットケーキミックスを加えてさっくり混ぜる。' },
        { id: 's2', title: 'フライパンに薄く油をひき、生地を流して焼き、裏返して焼く。' },
      ],
      false,
      undefined,
      'https://www.meg-snow.com/recipe/detail/11085/',
    ),
    buildRecipe(
      'sample-sweets-4',
      'クッキー',
      byName('お菓子'),
      [
        { id: 'i1', name: '日清 国内麦小麦粉（薄力粉）', amountText: '200g（2カップ）' },
        { id: 'i2', name: 'バター（食塩不使用）', amountText: '80g' },
        { id: 'i3', name: 'グラニュー糖', amountText: '70g' },
        { id: 'i4', name: '卵（Mサイズ）', amountText: '1個（50g）' },
        { id: 'i5', name: 'バニラエッセンス', amountText: '2〜3滴' },
      ],
      [
        {
          id: 's1',
          title: 'バターを練り、グラニュー糖を2回に分けて加えて白っぽくなるまで混ぜる。',
        },
        { id: 's2', title: '溶いた卵を数回に分けて加え、その都度混ぜてバニラエッセンスを加える。' },
        { id: 's3', title: '薄力粉を加え、粉っぽさがなくなるまで混ぜる。' },
        { id: 's4', title: '生地をまとめて4〜5mm厚にのばし、冷蔵庫で30分〜1時間休ませる。' },
        { id: 's5', title: '型で抜いて天板に並べ、170℃で15〜17分焼く。' },
      ],
      false,
      undefined,
      'https://www.nisshin-seifun-welna.com/index/recipe/detail/n-416.html',
    ),
    buildRecipe(
      'sample-sweets-5',
      'ブルーベリーマフィン',
      byName('お菓子'),
      [
        { id: 'i1', name: '無塩バター（室温に戻しておく）', amountText: '60g' },
        { id: 'i2', name: 'グラニュー糖', amountText: '85g' },
        { id: 'i3', name: '卵（割りほぐしておく）', amountText: '1個' },
        { id: 'i4', name: '牛乳', amountText: '60ml' },
        { id: 'i5', name: 'ブルーベリー（冷凍でも可）', amountText: '100g' },
        { id: 'i6', name: '日清 フラワー（薄力粉）', amountText: '150g' },
        { id: 'i7', name: '日清 ベーキングパウダー', amountText: '大さじ1/2（6g）' },
        { id: 'i8', name: '塩', amountText: 'ひとつまみ' },
      ],
      [
        {
          id: 's1',
          title:
            'ボールにバターを入れてハンドミキサーで混ぜ、グラニュー糖を3回に分けて加えて白っぽくふわっとするまで混ぜる。',
        },
        {
          id: 's2',
          title: '前のステップに卵を3回に分けて加え、ハンドミキサーでよく混ぜてなじませる。',
        },
        {
          id: 's3',
          title:
            '前のステップに粉類を1/3量加えて底から返すように混ぜ、粉っぽさが残る程度になったら牛乳の半量を加えて混ぜる。',
        },
        {
          id: 's4',
          title:
            '前のステップに粉類を1/3量加えて混ぜ、残りの牛乳、残りの粉類を順に加え、練らないように空気を含ませながら混ぜる。',
        },
        {
          id: 's5',
          title: '前のステップにブルーベリーを加えて大きく5〜6回混ぜ、型に落とすように入れる。',
        },
        {
          id: 's6',
          title:
            '180℃に温めたオーブンに前のステップの生地を入れて20〜25分焼き、型のままケーキクーラーにのせて粗熱をとる。',
        },
      ],
      false,
      undefined,
      'https://www.nisshin-seifun-welna.com/index/recipe/detail/s-020.html',
    ),
    buildRecipe(
      'sample-sweets-6',
      'チーズケーキ',
      byName('お菓子'),
      [
        { id: 'i1', name: 'クリームチーズ', amountText: '200g' },
        { id: 'i2', name: '砂糖', amountText: '60g' },
        { id: 'i3', name: '卵', amountText: '2個' },
        { id: 'i4', name: '薄力粉', amountText: '大さじ2' },
        { id: 'i5', name: '生クリーム', amountText: '200ml' },
        { id: 'i6', name: 'レモン汁', amountText: '大さじ1' },
      ],
      [
        { id: 's1', title: 'クリームチーズを練り、砂糖を加えて混ぜる。' },
        { id: 's2', title: '卵を1個ずつ加えて混ぜ、薄力粉を加えて混ぜる。' },
        { id: 's3', title: '生クリームとレモン汁を加えて混ぜ、型に流す。' },
        { id: 's4', title: '160℃のオーブンで約50分焼き、冷ます。' },
      ],
      false,
      undefined,
      'https://www.meg-snow.com/recipe/detail/10178/',
    ),

    // その他 (6)
    buildRecipe(
      'sample-others-1',
      'ほうれん草のごま和え',
      byName('その他'),
      [
        { id: 'i1', name: 'ほうれん草', amountText: '1束' },
        { id: 'i2', name: '白すりごま', amountText: '大さじ2' },
        { id: 'i3', name: '砂糖', amountText: '大さじ1/2' },
        {
          id: 'i4',
          name: 'キッコーマン いつでも新鮮しぼりたて生しょうゆ',
          amountText: '大さじ1',
        },
      ],
      [
        {
          id: 's1',
          title: 'ほうれん草はゆでて水にとり、水気をしぼって4cm長さに切る。',
        },
        { id: 's2', title: 'すりごま、砂糖、しょうゆを混ぜて和え衣を作る。' },
        { id: 's3', title: '前のステップで切ったほうれん草を加えて和える。' },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00000289/',
    ),
    buildRecipe(
      'sample-others-2',
      'ひじきの煮物',
      byName('その他'),
      [
        { id: 'i1', name: '乾燥ひじき', amountText: '30g' },
        { id: 'i2', name: 'にんじん', amountText: '1/2本' },
        { id: 'i3', name: '油揚げ', amountText: '1枚' },
        { id: 'i4', name: 'サラダ油', amountText: '大さじ1/2' },
        { id: 'i5', name: 'しょうゆ', amountText: '大さじ2' },
        { id: 'i6', name: '砂糖', amountText: '大さじ2' },
        { id: 'i7', name: '酒', amountText: '大さじ2' },
        { id: 'i8', name: 'みりん', amountText: '大さじ2' },
        { id: 'i9', name: '水', amountText: '200ml' },
      ],
      [
        { id: 's1', title: 'ひじきは水で戻し、にんじんは細切り、油揚げは細切りにする。' },
        {
          id: 's2',
          title: 'フライパンに油を熱し、ひじき、にんじん、油揚げを炒める。',
        },
        {
          id: 's3',
          title: '水、しょうゆ、砂糖、酒、みりんを加え、煮汁が少なくなるまで中火で煮る。',
        },
      ],
      false,
      undefined,
      'https://www.t-fal.co.jp/recipe/detail/?recipeId=1732',
    ),
    buildRecipe(
      'sample-others-3',
      'けんぴ風さつまいも甘煮',
      byName('その他'),
      [
        { id: 'i1', name: 'さつまいも', amountText: '200g' },
        { id: 'i2', name: 'サラダ油', amountText: '適量' },
        { id: 'i3', name: '水', amountText: '50ml' },
        { id: 'i4', name: '砂糖', amountText: '大さじ2' },
        { id: 'i5', name: 'しょうゆ', amountText: '小さじ1/2' },
        { id: 'i6', name: 'シナモン（パウダー）', amountText: '少々' },
      ],
      [
        {
          id: 's1',
          title: 'さつまいもは5mm角の拍子木切りにし、10分ほど水にさらして水気を切る。',
        },
        { id: 's2', title: 'サラダ油でさつまいもを揚げる。' },
        {
          id: 's3',
          title: 'フライパンに水、砂糖、しょうゆ、シナモンを入れて煮立て、前のステップで揚げたさつまいもを加えてからめる。',
        },
      ],
      false,
      undefined,
      'https://www.sbfoods.co.jp/recipe/detail/07932.html',
    ),
    buildRecipe(
      'sample-others-4',
      '焼さけ入り厚焼きたまご焼き',
      byName('その他'),
      [
        { id: 'i1', name: '焼さけほぐし身', amountText: '30g' },
        { id: 'i2', name: '卵', amountText: '2個' },
        { id: 'i3', name: '砂糖', amountText: '大さじ1' },
        { id: 'i4', name: '塩', amountText: '少々' },
        { id: 'i5', name: 'サラダ油', amountText: '少々' },
      ],
      [
        { id: 's1', title: 'ボウルに卵、焼さけほぐし身、砂糖、塩を入れてよく混ぜる。' },
        {
          id: 's2',
          title: '卵焼き器に油を薄くひき、前のステップの卵液を1/4量入れて巻く。同様に3〜4回繰り返す。',
        },
        { id: 's3', title: '食べやすい大きさに切る。' },
      ],
      false,
      undefined,
      'https://www.nissui.co.jp/recipe/01759.html',
    ),
    buildRecipe(
      'sample-others-5',
      '鶏の照り焼き',
      byName('その他'),
      [
        { id: 'i1', name: '鶏もも肉', amountText: '1枚（250g）' },
        { id: 'i2', name: 'サラダ油', amountText: '小さじ1' },
        { id: 'i3', name: 'しょうゆ', amountText: '大さじ1' },
        { id: 'i4', name: 'みりん', amountText: '大さじ1' },
        { id: 'i5', name: '酒', amountText: '大さじ1' },
        { id: 'i6', name: '砂糖', amountText: '小さじ1/2' },
      ],
      [
        { id: 's1', title: '鶏肉は筋切りをして厚みを均一にする。' },
        { id: 's2', title: 'しょうゆ、みりん、酒、砂糖を混ぜてたれを作る。' },
        {
          id: 's3',
          title: 'フライパンに油を熱し、鶏肉を皮目から焼き、焼き色がついたら裏返してふたをし、弱火で5〜6分焼く。',
        },
        {
          id: 's4',
          title: '前のステップのたれを加え、中火でからめながら照りをつける。',
        },
      ],
      false,
      undefined,
      'https://www.t-fal.co.jp/recipe/detail/?recipeId=505',
    ),
    buildRecipe(
      'sample-others-6',
      '香る炊き込みだしごはん ひじき',
      byName('その他'),
      [
        { id: 'i1', name: '米', amountText: '2合' },
        { id: 'i2', name: 'しめじ', amountText: '1パック' },
        { id: 'i3', name: 'にんじん', amountText: '1/4本' },
        { id: 'i4', name: 'ひじき（乾燥）', amountText: '5g' },
        { id: 'i5', name: '油揚げ', amountText: '1枚' },
        { id: 'i6', name: '水', amountText: '2合分' },
        {
          id: 'i7',
          name: 'キッコーマン いつでも新鮮 料理人直伝 極みだし',
          amountText: '35ml',
        },
        {
          id: 'i8',
          name: 'キッコーマン いつでも新鮮 料理人直伝 極み白だし',
          amountText: '15ml',
        },
        { id: 'i9', name: '酒', amountText: '大さじ1' },
        { id: 'i10', name: '塩', amountText: '小さじ1/2' },
      ],
      [
        {
          id: 's1',
          title: '米は洗って浸水し、ひじきは水で戻す。しめじはほぐし、油揚げとにんじんは細切りにする。',
        },
        {
          id: 's2',
          title:
            '炊飯器に米と調味料を入れ、2合の目盛りまで水を加えて混ぜ、前のステップの具をのせて普通炊飯する。',
        },
      ],
      false,
      undefined,
      'https://www.kikkoman.co.jp/homecook/search/recipe/00006476/',
    ),
  ]

  return recipes
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

