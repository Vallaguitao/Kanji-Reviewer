// =============================================================================
// JLPT N5 Complete Vocabulary List
// ~800 standard N5 words with kanji, reading, meaning, and category
// =============================================================================

const N5_CATEGORIES = {
  verb:          { name: 'Verbs',          icon: '動', color: 'hsl(340, 80%, 65%)' },
  'i-adjective': { name: 'い-Adjectives',  icon: '形', color: 'hsl(200, 80%, 65%)' },
  'na-adjective':{ name: 'な-Adjectives',  icon: '容', color: 'hsl(160, 70%, 55%)' },
  noun:          { name: 'Nouns',          icon: '名', color: 'hsl(30, 85%, 60%)' },
  adverb:        { name: 'Adverbs',        icon: '副', color: 'hsl(270, 70%, 65%)' },
  counter:       { name: 'Counters',       icon: '数', color: 'hsl(50, 80%, 55%)' },
  time:          { name: 'Time',           icon: '時', color: 'hsl(190, 75%, 55%)' },
  number:        { name: 'Numbers',        icon: '番', color: 'hsl(100, 60%, 50%)' },
  pronoun:       { name: 'Pronouns',       icon: '代', color: 'hsl(310, 65%, 60%)' },
  expression:    { name: 'Expressions',    icon: '話', color: 'hsl(0, 75%, 65%)' },
  other:         { name: 'Other',          icon: '他', color: 'hsl(220, 60%, 60%)' }
};

const N5_VOCABULARY = [

  // ===========================================================================
  //  VERBS (動詞)
  // ===========================================================================

  // --- あ行 ---
  { id: 1,   kanji: '会う',       reading: 'あう',         meaning: 'to meet',                    category: 'verb' },
  { id: 2,   kanji: '開く',       reading: 'あく',         meaning: 'to open (intransitive)',      category: 'verb' },
  { id: 3,   kanji: '開ける',     reading: 'あける',       meaning: 'to open (transitive)',        category: 'verb' },
  { id: 4,   kanji: '上げる',     reading: 'あげる',       meaning: 'to give; to raise',           category: 'verb' },
  { id: 5,   kanji: '上がる',     reading: 'あがる',       meaning: 'to go up; to rise',           category: 'verb' },
  { id: 6,   kanji: '遊ぶ',       reading: 'あそぶ',       meaning: 'to play; to have fun',        category: 'verb' },
  { id: 7,   kanji: '浴びる',     reading: 'あびる',       meaning: 'to bathe; to shower',         category: 'verb' },
  { id: 8,   kanji: '洗う',       reading: 'あらう',       meaning: 'to wash',                     category: 'verb' },
  { id: 9,   kanji: 'ある',       reading: 'ある',         meaning: 'to exist (inanimate); to have', category: 'verb' },
  { id: 10,  kanji: '歩く',       reading: 'あるく',       meaning: 'to walk',                     category: 'verb' },

  // --- い行 ---
  { id: 11,  kanji: '言う',       reading: 'いう',         meaning: 'to say; to tell',             category: 'verb' },
  { id: 12,  kanji: '行く',       reading: 'いく',         meaning: 'to go',                       category: 'verb' },
  { id: 13,  kanji: 'いる',       reading: 'いる',         meaning: 'to exist (animate); to be',   category: 'verb' },
  { id: 14,  kanji: '要る',       reading: 'いる',         meaning: 'to need',                     category: 'verb' },
  { id: 15,  kanji: '入れる',     reading: 'いれる',       meaning: 'to put in; to insert',        category: 'verb' },
  { id: 16,  kanji: '入る',       reading: 'はいる',       meaning: 'to enter; to go in',          category: 'verb' },

  // --- う行 ---
  { id: 17,  kanji: '歌う',       reading: 'うたう',       meaning: 'to sing',                     category: 'verb' },
  { id: 18,  kanji: '生まれる',   reading: 'うまれる',     meaning: 'to be born',                  category: 'verb' },
  { id: 19,  kanji: '売る',       reading: 'うる',         meaning: 'to sell',                     category: 'verb' },

  // --- お行 ---
  { id: 20,  kanji: '起きる',     reading: 'おきる',       meaning: 'to get up; to wake up',       category: 'verb' },
  { id: 21,  kanji: '置く',       reading: 'おく',         meaning: 'to put; to place',            category: 'verb' },
  { id: 22,  kanji: '送る',       reading: 'おくる',       meaning: 'to send',                     category: 'verb' },
  { id: 23,  kanji: '押す',       reading: 'おす',         meaning: 'to push; to press',           category: 'verb' },
  { id: 24,  kanji: '覚える',     reading: 'おぼえる',     meaning: 'to remember; to memorize',    category: 'verb' },
  { id: 25,  kanji: '思う',       reading: 'おもう',       meaning: 'to think; to feel',           category: 'verb' },
  { id: 26,  kanji: '泳ぐ',       reading: 'およぐ',       meaning: 'to swim',                     category: 'verb' },
  { id: 27,  kanji: '降りる',     reading: 'おりる',       meaning: 'to get off; to descend',      category: 'verb' },
  { id: 28,  kanji: '終わる',     reading: 'おわる',       meaning: 'to end; to finish',           category: 'verb' },

  // --- か行 ---
  { id: 29,  kanji: '買う',       reading: 'かう',         meaning: 'to buy',                      category: 'verb' },
  { id: 30,  kanji: '返す',       reading: 'かえす',       meaning: 'to return (something)',        category: 'verb' },
  { id: 31,  kanji: '帰る',       reading: 'かえる',       meaning: 'to go home; to return',       category: 'verb' },
  { id: 32,  kanji: 'かかる',     reading: 'かかる',       meaning: 'to take (time/money)',         category: 'verb' },
  { id: 33,  kanji: '書く',       reading: 'かく',         meaning: 'to write',                    category: 'verb' },
  { id: 34,  kanji: 'かける',     reading: 'かける',       meaning: 'to make (a phone call); to wear (glasses)', category: 'verb' },
  { id: 35,  kanji: '貸す',       reading: 'かす',         meaning: 'to lend',                     category: 'verb' },
  { id: 36,  kanji: 'かぶる',     reading: 'かぶる',       meaning: 'to wear (on head)',            category: 'verb' },
  { id: 37,  kanji: '借りる',     reading: 'かりる',       meaning: 'to borrow',                   category: 'verb' },

  // --- き行 ---
  { id: 38,  kanji: '消える',     reading: 'きえる',       meaning: 'to disappear; to go out',     category: 'verb' },
  { id: 39,  kanji: '聞く',       reading: 'きく',         meaning: 'to listen; to ask',           category: 'verb' },
  { id: 40,  kanji: '切る',       reading: 'きる',         meaning: 'to cut',                      category: 'verb' },
  { id: 41,  kanji: '着る',       reading: 'きる',         meaning: 'to wear (upper body)',         category: 'verb' },

  // --- く行 ---
  { id: 42,  kanji: '曇る',       reading: 'くもる',       meaning: 'to become cloudy',             category: 'verb' },
  { id: 43,  kanji: '来る',       reading: 'くる',         meaning: 'to come',                     category: 'verb' },
  { id: 44,  kanji: '消す',       reading: 'けす',         meaning: 'to turn off; to erase',       category: 'verb' },

  // --- こ行 ---
  { id: 45,  kanji: '答える',     reading: 'こたえる',     meaning: 'to answer',                   category: 'verb' },
  { id: 46,  kanji: '困る',       reading: 'こまる',       meaning: 'to be troubled; to be worried', category: 'verb' },
  { id: 47,  kanji: 'コピーする', reading: 'こぴーする',   meaning: 'to copy',                     category: 'verb' },

  // --- さ行 ---
  { id: 48,  kanji: '差す',       reading: 'さす',         meaning: 'to hold (an umbrella)',        category: 'verb' },
  { id: 49,  kanji: '散歩する',   reading: 'さんぽする',   meaning: 'to take a walk',               category: 'verb' },

  // --- し行 ---
  { id: 50,  kanji: '閉まる',     reading: 'しまる',       meaning: 'to close (intransitive)',      category: 'verb' },
  { id: 51,  kanji: '閉める',     reading: 'しめる',       meaning: 'to close (transitive)',        category: 'verb' },
  { id: 52,  kanji: '締める',     reading: 'しめる',       meaning: 'to tie; to fasten',            category: 'verb' },
  { id: 53,  kanji: '知る',       reading: 'しる',         meaning: 'to know',                     category: 'verb' },
  { id: 54,  kanji: 'する',       reading: 'する',         meaning: 'to do',                       category: 'verb' },
  { id: 55,  kanji: '住む',       reading: 'すむ',         meaning: 'to live; to reside',          category: 'verb' },
  { id: 56,  kanji: '座る',       reading: 'すわる',       meaning: 'to sit',                      category: 'verb' },

  // --- た行 ---
  { id: 57,  kanji: '出す',       reading: 'だす',         meaning: 'to take out; to submit',      category: 'verb' },
  { id: 58,  kanji: '立つ',       reading: 'たつ',         meaning: 'to stand',                    category: 'verb' },
  { id: 59,  kanji: '頼む',       reading: 'たのむ',       meaning: 'to request; to ask',          category: 'verb' },
  { id: 60,  kanji: '食べる',     reading: 'たべる',       meaning: 'to eat',                      category: 'verb' },

  // --- ち行 ---
  { id: 61,  kanji: '違う',       reading: 'ちがう',       meaning: 'to be different; to be wrong', category: 'verb' },

  // --- つ行 ---
  { id: 62,  kanji: '使う',       reading: 'つかう',       meaning: 'to use',                      category: 'verb' },
  { id: 63,  kanji: '疲れる',     reading: 'つかれる',     meaning: 'to get tired',                category: 'verb' },
  { id: 64,  kanji: '着く',       reading: 'つく',         meaning: 'to arrive',                   category: 'verb' },
  { id: 65,  kanji: '作る',       reading: 'つくる',       meaning: 'to make; to create',          category: 'verb' },
  { id: 66,  kanji: 'つける',     reading: 'つける',       meaning: 'to turn on; to attach',       category: 'verb' },
  { id: 67,  kanji: '勤める',     reading: 'つとめる',     meaning: 'to work for; to be employed', category: 'verb' },
  { id: 68,  kanji: '連れて行く', reading: 'つれていく',   meaning: 'to take (someone)',            category: 'verb' },

  // --- て・で行 ---
  { id: 69,  kanji: '出かける',   reading: 'でかける',     meaning: 'to go out',                   category: 'verb' },
  { id: 70,  kanji: 'できる',     reading: 'できる',       meaning: 'to be able to; to be completed', category: 'verb' },
  { id: 71,  kanji: '出る',       reading: 'でる',         meaning: 'to go out; to leave',         category: 'verb' },

  // --- と行 ---
  { id: 72,  kanji: '飛ぶ',       reading: 'とぶ',         meaning: 'to fly; to jump',             category: 'verb' },
  { id: 73,  kanji: '止まる',     reading: 'とまる',       meaning: 'to stop (intransitive)',       category: 'verb' },
  { id: 74,  kanji: '止める',     reading: 'とめる',       meaning: 'to stop (transitive)',         category: 'verb' },
  { id: 75,  kanji: '撮る',       reading: 'とる',         meaning: 'to take (a photo)',            category: 'verb' },
  { id: 76,  kanji: '取る',       reading: 'とる',         meaning: 'to take; to pick up',         category: 'verb' },

  // --- な行 ---
  { id: 77,  kanji: '泣く',       reading: 'なく',         meaning: 'to cry',                      category: 'verb' },
  { id: 78,  kanji: '無くす',     reading: 'なくす',       meaning: 'to lose (something)',          category: 'verb' },
  { id: 79,  kanji: '並ぶ',       reading: 'ならぶ',       meaning: 'to line up',                  category: 'verb' },
  { id: 80,  kanji: '並べる',     reading: 'ならべる',     meaning: 'to arrange; to line up (transitive)', category: 'verb' },
  { id: 81,  kanji: 'なる',       reading: 'なる',         meaning: 'to become',                   category: 'verb' },

  // --- ぬ行 ---
  { id: 82,  kanji: '脱ぐ',       reading: 'ぬぐ',         meaning: 'to take off (clothes)',        category: 'verb' },

  // --- の行 ---
  { id: 83,  kanji: '登る',       reading: 'のぼる',       meaning: 'to climb',                    category: 'verb' },
  { id: 84,  kanji: '飲む',       reading: 'のむ',         meaning: 'to drink',                    category: 'verb' },
  { id: 85,  kanji: '乗る',       reading: 'のる',         meaning: 'to ride; to get on',          category: 'verb' },

  // --- は行 ---
  { id: 86,  kanji: '履く',       reading: 'はく',         meaning: 'to wear (lower body)',         category: 'verb' },
  { id: 87,  kanji: '始まる',     reading: 'はじまる',     meaning: 'to begin (intransitive)',      category: 'verb' },
  { id: 88,  kanji: '始める',     reading: 'はじめる',     meaning: 'to begin (transitive)',        category: 'verb' },
  { id: 89,  kanji: '走る',       reading: 'はしる',       meaning: 'to run',                      category: 'verb' },
  { id: 90,  kanji: '働く',       reading: 'はたらく',     meaning: 'to work',                     category: 'verb' },
  { id: 91,  kanji: '話す',       reading: 'はなす',       meaning: 'to speak; to talk',           category: 'verb' },
  { id: 92,  kanji: '貼る',       reading: 'はる',         meaning: 'to stick; to paste',          category: 'verb' },
  { id: 93,  kanji: '晴れる',     reading: 'はれる',       meaning: 'to clear up (weather)',        category: 'verb' },

  // --- ひ行 ---
  { id: 94,  kanji: '引く',       reading: 'ひく',         meaning: 'to pull; to draw',            category: 'verb' },
  { id: 95,  kanji: '弾く',       reading: 'ひく',         meaning: 'to play (instrument)',         category: 'verb' },

  // --- ふ行 ---
  { id: 96,  kanji: '吹く',       reading: 'ふく',         meaning: 'to blow (wind)',               category: 'verb' },
  { id: 97,  kanji: '降る',       reading: 'ふる',         meaning: 'to fall (rain/snow)',          category: 'verb' },

  // --- ま行 ---
  { id: 98,  kanji: '曲がる',     reading: 'まがる',       meaning: 'to turn; to curve',           category: 'verb' },
  { id: 99,  kanji: '待つ',       reading: 'まつ',         meaning: 'to wait',                     category: 'verb' },
  { id: 100, kanji: '磨く',       reading: 'みがく',       meaning: 'to brush (teeth); to polish', category: 'verb' },
  { id: 101, kanji: '見せる',     reading: 'みせる',       meaning: 'to show',                     category: 'verb' },
  { id: 102, kanji: '見る',       reading: 'みる',         meaning: 'to see; to look; to watch',   category: 'verb' },
  { id: 103, kanji: '持つ',       reading: 'もつ',         meaning: 'to hold; to have',            category: 'verb' },
  { id: 104, kanji: '持って行く', reading: 'もっていく',   meaning: 'to take (something)',          category: 'verb' },
  { id: 105, kanji: '持って来る', reading: 'もってくる',   meaning: 'to bring (something)',         category: 'verb' },
  { id: 106, kanji: 'もらう',     reading: 'もらう',       meaning: 'to receive',                  category: 'verb' },

  // --- や行 ---
  { id: 107, kanji: '休む',       reading: 'やすむ',       meaning: 'to rest; to take a day off',  category: 'verb' },
  { id: 108, kanji: 'やる',       reading: 'やる',         meaning: 'to do; to give (casual)',      category: 'verb' },

  // --- よ行 ---
  { id: 109, kanji: '呼ぶ',       reading: 'よぶ',         meaning: 'to call; to invite',          category: 'verb' },
  { id: 110, kanji: '読む',       reading: 'よむ',         meaning: 'to read',                     category: 'verb' },

  // --- わ行 ---
  { id: 111, kanji: '分かる',     reading: 'わかる',       meaning: 'to understand',               category: 'verb' },
  { id: 112, kanji: '忘れる',     reading: 'わすれる',     meaning: 'to forget',                   category: 'verb' },
  { id: 113, kanji: '渡す',       reading: 'わたす',       meaning: 'to hand over',                category: 'verb' },
  { id: 114, kanji: '渡る',       reading: 'わたる',       meaning: 'to cross (a bridge/road)',    category: 'verb' },

  // --- する compound verbs ---
  { id: 115, kanji: '勉強する',   reading: 'べんきょうする', meaning: 'to study',                   category: 'verb' },
  { id: 116, kanji: '練習する',   reading: 'れんしゅうする', meaning: 'to practice',                category: 'verb' },
  { id: 117, kanji: '料理する',   reading: 'りょうりする',   meaning: 'to cook',                   category: 'verb' },
  { id: 118, kanji: '旅行する',   reading: 'りょこうする',   meaning: 'to travel',                 category: 'verb' },
  { id: 119, kanji: '洗濯する',   reading: 'せんたくする',   meaning: 'to do laundry',             category: 'verb' },
  { id: 120, kanji: '掃除する',   reading: 'そうじする',     meaning: 'to clean',                  category: 'verb' },
  { id: 121, kanji: '買い物する', reading: 'かいものする',   meaning: 'to shop',                   category: 'verb' },
  { id: 122, kanji: '結婚する',   reading: 'けっこんする',   meaning: 'to marry',                  category: 'verb' },
  { id: 123, kanji: '電話する',   reading: 'でんわする',     meaning: 'to make a phone call',      category: 'verb' },
  { id: 124, kanji: '質問する',   reading: 'しつもんする',   meaning: 'to ask a question',         category: 'verb' },
  { id: 125, kanji: '紹介する',   reading: 'しょうかいする', meaning: 'to introduce',              category: 'verb' },
  { id: 126, kanji: '心配する',   reading: 'しんぱいする',   meaning: 'to worry',                  category: 'verb' },

  // --- additional verbs ---
  { id: 127, kanji: 'もう一度',   reading: 'もういちど',     meaning: 'once more',                 category: 'expression' },
  { id: 128, kanji: '教える',     reading: 'おしえる',       meaning: 'to teach; to tell',         category: 'verb' },
  { id: 129, kanji: '死ぬ',       reading: 'しぬ',           meaning: 'to die',                    category: 'verb' },
  { id: 130, kanji: '遅れる',     reading: 'おくれる',       meaning: 'to be late',                category: 'verb' },

  // ===========================================================================
  //  い-ADJECTIVES (い形容詞)
  // ===========================================================================

  { id: 131, kanji: '青い',       reading: 'あおい',       meaning: 'blue; green',                 category: 'i-adjective' },
  { id: 132, kanji: '赤い',       reading: 'あかい',       meaning: 'red',                         category: 'i-adjective' },
  { id: 133, kanji: '明るい',     reading: 'あかるい',     meaning: 'bright; cheerful',            category: 'i-adjective' },
  { id: 134, kanji: '暖かい',     reading: 'あたたかい',   meaning: 'warm',                        category: 'i-adjective' },
  { id: 135, kanji: '新しい',     reading: 'あたらしい',   meaning: 'new',                         category: 'i-adjective' },
  { id: 136, kanji: '暑い',       reading: 'あつい',       meaning: 'hot (weather)',               category: 'i-adjective' },
  { id: 137, kanji: '厚い',       reading: 'あつい',       meaning: 'thick',                       category: 'i-adjective' },
  { id: 138, kanji: '熱い',       reading: 'あつい',       meaning: 'hot (to touch)',              category: 'i-adjective' },
  { id: 139, kanji: '危ない',     reading: 'あぶない',     meaning: 'dangerous',                   category: 'i-adjective' },
  { id: 140, kanji: '甘い',       reading: 'あまい',       meaning: 'sweet',                       category: 'i-adjective' },
  { id: 141, kanji: 'いい',       reading: 'いい',         meaning: 'good',                        category: 'i-adjective' },
  { id: 142, kanji: '忙しい',     reading: 'いそがしい',   meaning: 'busy',                        category: 'i-adjective' },
  { id: 143, kanji: '痛い',       reading: 'いたい',       meaning: 'painful',                     category: 'i-adjective' },
  { id: 144, kanji: '薄い',       reading: 'うすい',       meaning: 'thin; pale',                  category: 'i-adjective' },
  { id: 145, kanji: 'おいしい',   reading: 'おいしい',     meaning: 'delicious; tasty',            category: 'i-adjective' },
  { id: 146, kanji: '大きい',     reading: 'おおきい',     meaning: 'big; large',                  category: 'i-adjective' },
  { id: 147, kanji: '多い',       reading: 'おおい',       meaning: 'many; much',                  category: 'i-adjective' },
  { id: 148, kanji: '遅い',       reading: 'おそい',       meaning: 'slow; late',                  category: 'i-adjective' },
  { id: 149, kanji: '重い',       reading: 'おもい',       meaning: 'heavy',                       category: 'i-adjective' },
  { id: 150, kanji: '面白い',     reading: 'おもしろい',   meaning: 'interesting; funny',          category: 'i-adjective' },

  { id: 151, kanji: '辛い',       reading: 'からい',       meaning: 'spicy; hot',                  category: 'i-adjective' },
  { id: 152, kanji: '軽い',       reading: 'かるい',       meaning: 'light (weight)',              category: 'i-adjective' },
  { id: 153, kanji: 'かわいい',   reading: 'かわいい',     meaning: 'cute',                        category: 'i-adjective' },
  { id: 154, kanji: '黄色い',     reading: 'きいろい',     meaning: 'yellow',                      category: 'i-adjective' },
  { id: 155, kanji: '汚い',       reading: 'きたない',     meaning: 'dirty',                       category: 'i-adjective' },
  { id: 156, kanji: '暗い',       reading: 'くらい',       meaning: 'dark',                        category: 'i-adjective' },
  { id: 157, kanji: '黒い',       reading: 'くろい',       meaning: 'black',                       category: 'i-adjective' },

  { id: 158, kanji: '寒い',       reading: 'さむい',       meaning: 'cold (weather)',              category: 'i-adjective' },
  { id: 159, kanji: '白い',       reading: 'しろい',       meaning: 'white',                       category: 'i-adjective' },
  { id: 160, kanji: '涼しい',     reading: 'すずしい',     meaning: 'cool (weather)',              category: 'i-adjective' },
  { id: 161, kanji: '少ない',     reading: 'すくない',     meaning: 'few; little',                 category: 'i-adjective' },
  { id: 162, kanji: '狭い',       reading: 'せまい',       meaning: 'narrow; small (space)',        category: 'i-adjective' },

  { id: 163, kanji: '高い',       reading: 'たかい',       meaning: 'tall; high; expensive',        category: 'i-adjective' },
  { id: 164, kanji: '楽しい',     reading: 'たのしい',     meaning: 'fun; enjoyable',              category: 'i-adjective' },
  { id: 165, kanji: '小さい',     reading: 'ちいさい',     meaning: 'small; little',               category: 'i-adjective' },
  { id: 166, kanji: '近い',       reading: 'ちかい',       meaning: 'near; close',                 category: 'i-adjective' },
  { id: 167, kanji: '冷たい',     reading: 'つめたい',     meaning: 'cold (to touch)',             category: 'i-adjective' },
  { id: 168, kanji: '強い',       reading: 'つよい',       meaning: 'strong',                      category: 'i-adjective' },

  { id: 169, kanji: '遠い',       reading: 'とおい',       meaning: 'far; distant',                category: 'i-adjective' },
  { id: 170, kanji: '長い',       reading: 'ながい',       meaning: 'long',                        category: 'i-adjective' },

  { id: 171, kanji: '早い',       reading: 'はやい',       meaning: 'early; fast',                 category: 'i-adjective' },
  { id: 172, kanji: '速い',       reading: 'はやい',       meaning: 'fast; quick',                 category: 'i-adjective' },
  { id: 173, kanji: '低い',       reading: 'ひくい',       meaning: 'low; short (height)',         category: 'i-adjective' },
  { id: 174, kanji: '広い',       reading: 'ひろい',       meaning: 'wide; spacious',              category: 'i-adjective' },
  { id: 175, kanji: '太い',       reading: 'ふとい',       meaning: 'thick; fat',                  category: 'i-adjective' },
  { id: 176, kanji: '古い',       reading: 'ふるい',       meaning: 'old (things)',                category: 'i-adjective' },
  { id: 177, kanji: '欲しい',     reading: 'ほしい',       meaning: 'wanted; desired',             category: 'i-adjective' },
  { id: 178, kanji: '細い',       reading: 'ほそい',       meaning: 'thin; slender',               category: 'i-adjective' },

  { id: 179, kanji: 'まずい',     reading: 'まずい',       meaning: 'bad-tasting; unpleasant',     category: 'i-adjective' },
  { id: 180, kanji: '丸い',       reading: 'まるい',       meaning: 'round; circular',             category: 'i-adjective' },
  { id: 181, kanji: '短い',       reading: 'みじかい',     meaning: 'short (length)',              category: 'i-adjective' },
  { id: 182, kanji: '難しい',     reading: 'むずかしい',   meaning: 'difficult',                   category: 'i-adjective' },

  { id: 183, kanji: '安い',       reading: 'やすい',       meaning: 'cheap; inexpensive',          category: 'i-adjective' },
  { id: 184, kanji: '優しい',     reading: 'やさしい',     meaning: 'kind; gentle',                category: 'i-adjective' },
  { id: 185, kanji: '易しい',     reading: 'やさしい',     meaning: 'easy; simple',                category: 'i-adjective' },
  { id: 186, kanji: '若い',       reading: 'わかい',       meaning: 'young',                       category: 'i-adjective' },
  { id: 187, kanji: '悪い',       reading: 'わるい',       meaning: 'bad',                         category: 'i-adjective' },
  { id: 188, kanji: 'うるさい',   reading: 'うるさい',     meaning: 'noisy; annoying',             category: 'i-adjective' },
  { id: 189, kanji: 'すごい',     reading: 'すごい',       meaning: 'amazing; terrible',           category: 'i-adjective' },

  // ===========================================================================
  //  な-ADJECTIVES (な形容詞)
  // ===========================================================================

  { id: 190, kanji: '元気',       reading: 'げんき',       meaning: 'healthy; energetic',          category: 'na-adjective' },
  { id: 191, kanji: '静か',       reading: 'しずか',       meaning: 'quiet; calm',                 category: 'na-adjective' },
  { id: 192, kanji: '好き',       reading: 'すき',         meaning: 'like; fond of',               category: 'na-adjective' },
  { id: 193, kanji: '嫌い',       reading: 'きらい',       meaning: 'dislike; hate',               category: 'na-adjective' },
  { id: 194, kanji: '上手',       reading: 'じょうず',     meaning: 'skillful; good at',           category: 'na-adjective' },
  { id: 195, kanji: '下手',       reading: 'へた',         meaning: 'unskillful; bad at',          category: 'na-adjective' },
  { id: 196, kanji: '有名',       reading: 'ゆうめい',     meaning: 'famous',                      category: 'na-adjective' },
  { id: 197, kanji: '大切',       reading: 'たいせつ',     meaning: 'important; precious',         category: 'na-adjective' },
  { id: 198, kanji: '大丈夫',     reading: 'だいじょうぶ', meaning: 'all right; safe',             category: 'na-adjective' },
  { id: 199, kanji: '大変',       reading: 'たいへん',     meaning: 'tough; very much',            category: 'na-adjective' },
  { id: 200, kanji: '便利',       reading: 'べんり',       meaning: 'convenient',                  category: 'na-adjective' },
  { id: 201, kanji: '不便',       reading: 'ふべん',       meaning: 'inconvenient',                category: 'na-adjective' },
  { id: 202, kanji: '暇',         reading: 'ひま',         meaning: 'free time; not busy',         category: 'na-adjective' },
  { id: 203, kanji: '賑やか',     reading: 'にぎやか',     meaning: 'lively; bustling',            category: 'na-adjective' },
  { id: 204, kanji: '立派',       reading: 'りっぱ',       meaning: 'splendid; fine',              category: 'na-adjective' },
  { id: 205, kanji: '親切',       reading: 'しんせつ',     meaning: 'kind; friendly',              category: 'na-adjective' },
  { id: 206, kanji: '丈夫',       reading: 'じょうぶ',     meaning: 'durable; strong',             category: 'na-adjective' },
  { id: 207, kanji: '綺麗',       reading: 'きれい',       meaning: 'beautiful; clean',            category: 'na-adjective' },
  { id: 208, kanji: '色々',       reading: 'いろいろ',     meaning: 'various',                     category: 'na-adjective' },
  { id: 209, kanji: '簡単',       reading: 'かんたん',     meaning: 'easy; simple',                category: 'na-adjective' },
  { id: 210, kanji: '同じ',       reading: 'おなじ',       meaning: 'same',                        category: 'na-adjective' },
  { id: 211, kanji: '特別',       reading: 'とくべつ',     meaning: 'special',                     category: 'na-adjective' },
  { id: 212, kanji: '必要',       reading: 'ひつよう',     meaning: 'necessary',                   category: 'na-adjective' },

  // ===========================================================================
  //  NOUNS (名詞) — People & Family
  // ===========================================================================

  { id: 213, kanji: '私',         reading: 'わたし',       meaning: 'I; me',                       category: 'pronoun' },
  { id: 214, kanji: '僕',         reading: 'ぼく',         meaning: 'I; me (male)',                category: 'pronoun' },
  { id: 215, kanji: 'あなた',     reading: 'あなた',       meaning: 'you',                         category: 'pronoun' },
  { id: 216, kanji: '彼',         reading: 'かれ',         meaning: 'he; boyfriend',               category: 'pronoun' },
  { id: 217, kanji: '彼女',       reading: 'かのじょ',     meaning: 'she; girlfriend',             category: 'pronoun' },
  { id: 218, kanji: '皆さん',     reading: 'みなさん',     meaning: 'everyone',                    category: 'pronoun' },
  { id: 219, kanji: '皆',         reading: 'みんな',       meaning: 'everyone (casual)',            category: 'pronoun' },
  { id: 220, kanji: '自分',       reading: 'じぶん',       meaning: 'oneself',                     category: 'pronoun' },

  // --- Family (own) ---
  { id: 221, kanji: '家族',       reading: 'かぞく',       meaning: 'family',                      category: 'noun' },
  { id: 222, kanji: '父',         reading: 'ちち',         meaning: 'father (own)',                category: 'noun' },
  { id: 223, kanji: '母',         reading: 'はは',         meaning: 'mother (own)',                category: 'noun' },
  { id: 224, kanji: '兄',         reading: 'あに',         meaning: 'older brother (own)',         category: 'noun' },
  { id: 225, kanji: '姉',         reading: 'あね',         meaning: 'older sister (own)',          category: 'noun' },
  { id: 226, kanji: '弟',         reading: 'おとうと',     meaning: 'younger brother',             category: 'noun' },
  { id: 227, kanji: '妹',         reading: 'いもうと',     meaning: 'younger sister',              category: 'noun' },

  // --- Family (someone else's) ---
  { id: 228, kanji: 'お父さん',   reading: 'おとうさん',   meaning: 'father (someone else\'s)',    category: 'noun' },
  { id: 229, kanji: 'お母さん',   reading: 'おかあさん',   meaning: 'mother (someone else\'s)',    category: 'noun' },
  { id: 230, kanji: 'お兄さん',   reading: 'おにいさん',   meaning: 'older brother (someone else\'s)', category: 'noun' },
  { id: 231, kanji: 'お姉さん',   reading: 'おねえさん',   meaning: 'older sister (someone else\'s)',  category: 'noun' },
  { id: 232, kanji: 'おじいさん', reading: 'おじいさん',   meaning: 'grandfather; old man',        category: 'noun' },
  { id: 233, kanji: 'おばあさん', reading: 'おばあさん',   meaning: 'grandmother; old woman',      category: 'noun' },
  { id: 234, kanji: 'おじさん',   reading: 'おじさん',     meaning: 'uncle; middle-aged man',      category: 'noun' },
  { id: 235, kanji: 'おばさん',   reading: 'おばさん',     meaning: 'aunt; middle-aged woman',     category: 'noun' },

  // --- Family & People ---
  { id: 236, kanji: '主人',       reading: 'しゅじん',     meaning: 'husband (own)',               category: 'noun' },
  { id: 237, kanji: 'ご主人',     reading: 'ごしゅじん',   meaning: 'husband (someone else\'s)',   category: 'noun' },
  { id: 238, kanji: '奥さん',     reading: 'おくさん',     meaning: 'wife (someone else\'s)',      category: 'noun' },
  { id: 239, kanji: '子供',       reading: 'こども',       meaning: 'child; children',             category: 'noun' },
  { id: 240, kanji: '赤ちゃん',   reading: 'あかちゃん',   meaning: 'baby',                        category: 'noun' },
  { id: 241, kanji: '男の子',     reading: 'おとこのこ',   meaning: 'boy',                         category: 'noun' },
  { id: 242, kanji: '女の子',     reading: 'おんなのこ',   meaning: 'girl',                        category: 'noun' },
  { id: 243, kanji: '男の人',     reading: 'おとこのひと', meaning: 'man',                         category: 'noun' },
  { id: 244, kanji: '女の人',     reading: 'おんなのひと', meaning: 'woman',                       category: 'noun' },
  { id: 245, kanji: '人',         reading: 'ひと',         meaning: 'person; people',              category: 'noun' },
  { id: 246, kanji: '友達',       reading: 'ともだち',     meaning: 'friend',                      category: 'noun' },
  { id: 247, kanji: '大人',       reading: 'おとな',       meaning: 'adult',                       category: 'noun' },

  // --- People & Occupations ---
  { id: 248, kanji: '先生',       reading: 'せんせい',     meaning: 'teacher; doctor (title)',      category: 'noun' },
  { id: 249, kanji: '学生',       reading: 'がくせい',     meaning: 'student',                     category: 'noun' },
  { id: 250, kanji: '留学生',     reading: 'りゅうがくせい', meaning: 'exchange student',           category: 'noun' },
  { id: 251, kanji: '生徒',       reading: 'せいと',       meaning: 'pupil; student',              category: 'noun' },
  { id: 252, kanji: '医者',       reading: 'いしゃ',       meaning: 'doctor',                      category: 'noun' },
  { id: 253, kanji: '警官',       reading: 'けいかん',     meaning: 'police officer',              category: 'noun' },
  { id: 254, kanji: '会社員',     reading: 'かいしゃいん', meaning: 'company employee',            category: 'noun' },

  // ===========================================================================
  //  NOUNS — Places
  // ===========================================================================

  { id: 255, kanji: '家',         reading: 'いえ',         meaning: 'house; home',                 category: 'noun' },
  { id: 256, kanji: 'うち',       reading: 'うち',         meaning: 'home; my place',              category: 'noun' },
  { id: 257, kanji: '部屋',       reading: 'へや',         meaning: 'room',                        category: 'noun' },
  { id: 258, kanji: '台所',       reading: 'だいどころ',   meaning: 'kitchen',                     category: 'noun' },
  { id: 259, kanji: 'お手洗い',   reading: 'おてあらい',   meaning: 'restroom',                    category: 'noun' },
  { id: 260, kanji: 'お風呂',     reading: 'おふろ',       meaning: 'bath',                        category: 'noun' },
  { id: 261, kanji: '玄関',       reading: 'げんかん',     meaning: 'entrance; front door',        category: 'noun' },
  { id: 262, kanji: '庭',         reading: 'にわ',         meaning: 'garden; yard',                category: 'noun' },
  { id: 263, kanji: '学校',       reading: 'がっこう',     meaning: 'school',                      category: 'noun' },
  { id: 264, kanji: '大学',       reading: 'だいがく',     meaning: 'university',                  category: 'noun' },
  { id: 265, kanji: '教室',       reading: 'きょうしつ',   meaning: 'classroom',                   category: 'noun' },
  { id: 266, kanji: '図書館',     reading: 'としょかん',   meaning: 'library',                     category: 'noun' },
  { id: 267, kanji: '食堂',       reading: 'しょくどう',   meaning: 'cafeteria; dining hall',      category: 'noun' },
  { id: 268, kanji: '会社',       reading: 'かいしゃ',     meaning: 'company',                     category: 'noun' },
  { id: 269, kanji: '銀行',       reading: 'ぎんこう',     meaning: 'bank',                        category: 'noun' },
  { id: 270, kanji: '郵便局',     reading: 'ゆうびんきょく', meaning: 'post office',               category: 'noun' },
  { id: 271, kanji: '病院',       reading: 'びょういん',   meaning: 'hospital',                    category: 'noun' },
  { id: 272, kanji: 'ホテル',     reading: 'ほてる',       meaning: 'hotel',                       category: 'noun' },
  { id: 273, kanji: 'デパート',   reading: 'でぱーと',     meaning: 'department store',            category: 'noun' },
  { id: 274, kanji: '店',         reading: 'みせ',         meaning: 'shop; store',                 category: 'noun' },
  { id: 275, kanji: 'スーパー',   reading: 'すーぱー',     meaning: 'supermarket',                 category: 'noun' },
  { id: 276, kanji: '喫茶店',     reading: 'きっさてん',   meaning: 'coffee shop',                 category: 'noun' },
  { id: 277, kanji: 'レストラン', reading: 'れすとらん',   meaning: 'restaurant',                  category: 'noun' },
  { id: 278, kanji: '映画館',     reading: 'えいがかん',   meaning: 'movie theater',               category: 'noun' },
  { id: 279, kanji: '公園',       reading: 'こうえん',     meaning: 'park',                        category: 'noun' },
  { id: 280, kanji: '動物園',     reading: 'どうぶつえん', meaning: 'zoo',                         category: 'noun' },
  { id: 281, kanji: '駅',         reading: 'えき',         meaning: 'train station',               category: 'noun' },
  { id: 282, kanji: '空港',       reading: 'くうこう',     meaning: 'airport',                     category: 'noun' },
  { id: 283, kanji: '交差点',     reading: 'こうさてん',   meaning: 'intersection',                category: 'noun' },
  { id: 284, kanji: '交番',       reading: 'こうばん',     meaning: 'police box',                  category: 'noun' },
  { id: 285, kanji: '橋',         reading: 'はし',         meaning: 'bridge',                      category: 'noun' },
  { id: 286, kanji: '道',         reading: 'みち',         meaning: 'road; way',                   category: 'noun' },
  { id: 287, kanji: '町',         reading: 'まち',         meaning: 'town; city',                  category: 'noun' },
  { id: 288, kanji: '国',         reading: 'くに',         meaning: 'country',                     category: 'noun' },
  { id: 289, kanji: '外国',       reading: 'がいこく',     meaning: 'foreign country',             category: 'noun' },
  { id: 290, kanji: '外',         reading: 'そと',         meaning: 'outside',                     category: 'noun' },
  { id: 291, kanji: '所',         reading: 'ところ',       meaning: 'place',                       category: 'noun' },
  { id: 292, kanji: 'プール',     reading: 'ぷーる',       meaning: 'swimming pool',               category: 'noun' },

  // ===========================================================================
  //  NOUNS — Food & Drink
  // ===========================================================================

  { id: 293, kanji: 'ご飯',       reading: 'ごはん',       meaning: 'rice; meal',                  category: 'noun' },
  { id: 294, kanji: '朝ご飯',     reading: 'あさごはん',   meaning: 'breakfast',                   category: 'noun' },
  { id: 295, kanji: '昼ご飯',     reading: 'ひるごはん',   meaning: 'lunch',                       category: 'noun' },
  { id: 296, kanji: '晩ご飯',     reading: 'ばんごはん',   meaning: 'dinner',                      category: 'noun' },
  { id: 297, kanji: '食べ物',     reading: 'たべもの',     meaning: 'food',                        category: 'noun' },
  { id: 298, kanji: '飲み物',     reading: 'のみもの',     meaning: 'drink; beverage',             category: 'noun' },
  { id: 299, kanji: '料理',       reading: 'りょうり',     meaning: 'cooking; cuisine',            category: 'noun' },
  { id: 300, kanji: '肉',         reading: 'にく',         meaning: 'meat',                        category: 'noun' },
  { id: 301, kanji: '魚',         reading: 'さかな',       meaning: 'fish',                        category: 'noun' },
  { id: 302, kanji: '野菜',       reading: 'やさい',       meaning: 'vegetables',                  category: 'noun' },
  { id: 303, kanji: '果物',       reading: 'くだもの',     meaning: 'fruit',                       category: 'noun' },
  { id: 304, kanji: '卵',         reading: 'たまご',       meaning: 'egg',                         category: 'noun' },
  { id: 305, kanji: 'パン',       reading: 'ぱん',         meaning: 'bread',                       category: 'noun' },
  { id: 306, kanji: 'バター',     reading: 'ばたー',       meaning: 'butter',                      category: 'noun' },
  { id: 307, kanji: 'ケーキ',     reading: 'けーき',       meaning: 'cake',                        category: 'noun' },
  { id: 308, kanji: 'お菓子',     reading: 'おかし',       meaning: 'sweets; snacks',              category: 'noun' },
  { id: 309, kanji: '砂糖',       reading: 'さとう',       meaning: 'sugar',                       category: 'noun' },
  { id: 310, kanji: '塩',         reading: 'しお',         meaning: 'salt',                        category: 'noun' },
  { id: 311, kanji: '醤油',       reading: 'しょうゆ',     meaning: 'soy sauce',                   category: 'noun' },
  { id: 312, kanji: '水',         reading: 'みず',         meaning: 'water',                       category: 'noun' },
  { id: 313, kanji: 'お茶',       reading: 'おちゃ',       meaning: 'tea; green tea',              category: 'noun' },
  { id: 314, kanji: '紅茶',       reading: 'こうちゃ',     meaning: 'black tea',                   category: 'noun' },
  { id: 315, kanji: 'コーヒー',   reading: 'こーひー',     meaning: 'coffee',                      category: 'noun' },
  { id: 316, kanji: 'ジュース',   reading: 'じゅーす',     meaning: 'juice',                       category: 'noun' },
  { id: 317, kanji: '牛乳',       reading: 'ぎゅうにゅう', meaning: 'milk',                        category: 'noun' },
  { id: 318, kanji: 'お酒',       reading: 'おさけ',       meaning: 'alcohol; sake',               category: 'noun' },
  { id: 319, kanji: '弁当',       reading: 'べんとう',     meaning: 'boxed lunch',                 category: 'noun' },

  // ===========================================================================
  //  NOUNS — Body
  // ===========================================================================

  { id: 320, kanji: '体',         reading: 'からだ',       meaning: 'body',                        category: 'noun' },
  { id: 321, kanji: '頭',         reading: 'あたま',       meaning: 'head',                        category: 'noun' },
  { id: 322, kanji: '顔',         reading: 'かお',         meaning: 'face',                        category: 'noun' },
  { id: 323, kanji: '目',         reading: 'め',           meaning: 'eye',                         category: 'noun' },
  { id: 324, kanji: '耳',         reading: 'みみ',         meaning: 'ear',                         category: 'noun' },
  { id: 325, kanji: '口',         reading: 'くち',         meaning: 'mouth',                       category: 'noun' },
  { id: 326, kanji: '鼻',         reading: 'はな',         meaning: 'nose',                        category: 'noun' },
  { id: 327, kanji: '歯',         reading: 'は',           meaning: 'tooth; teeth',                category: 'noun' },
  { id: 328, kanji: '手',         reading: 'て',           meaning: 'hand',                        category: 'noun' },
  { id: 329, kanji: '足',         reading: 'あし',         meaning: 'foot; leg',                   category: 'noun' },
  { id: 330, kanji: '指',         reading: 'ゆび',         meaning: 'finger; toe',                 category: 'noun' },
  { id: 331, kanji: '背',         reading: 'せ',           meaning: 'back; height',                category: 'noun' },
  { id: 332, kanji: 'お腹',       reading: 'おなか',       meaning: 'stomach; belly',              category: 'noun' },
  { id: 333, kanji: '首',         reading: 'くび',         meaning: 'neck',                        category: 'noun' },
  { id: 334, kanji: '声',         reading: 'こえ',         meaning: 'voice',                       category: 'noun' },

  // ===========================================================================
  //  NOUNS — Nature & Weather
  // ===========================================================================

  { id: 335, kanji: '天気',       reading: 'てんき',       meaning: 'weather',                     category: 'noun' },
  { id: 336, kanji: '雨',         reading: 'あめ',         meaning: 'rain',                        category: 'noun' },
  { id: 337, kanji: '雪',         reading: 'ゆき',         meaning: 'snow',                        category: 'noun' },
  { id: 338, kanji: '風',         reading: 'かぜ',         meaning: 'wind',                        category: 'noun' },
  { id: 339, kanji: '空',         reading: 'そら',         meaning: 'sky',                         category: 'noun' },
  { id: 340, kanji: '雲',         reading: 'くも',         meaning: 'cloud',                       category: 'noun' },
  { id: 341, kanji: '海',         reading: 'うみ',         meaning: 'sea; ocean',                  category: 'noun' },
  { id: 342, kanji: '山',         reading: 'やま',         meaning: 'mountain',                    category: 'noun' },
  { id: 343, kanji: '川',         reading: 'かわ',         meaning: 'river',                       category: 'noun' },
  { id: 344, kanji: '池',         reading: 'いけ',         meaning: 'pond',                        category: 'noun' },
  { id: 345, kanji: '木',         reading: 'き',           meaning: 'tree; wood',                  category: 'noun' },
  { id: 346, kanji: '花',         reading: 'はな',         meaning: 'flower',                      category: 'noun' },
  { id: 347, kanji: '動物',       reading: 'どうぶつ',     meaning: 'animal',                      category: 'noun' },
  { id: 348, kanji: '犬',         reading: 'いぬ',         meaning: 'dog',                         category: 'noun' },
  { id: 349, kanji: '猫',         reading: 'ねこ',         meaning: 'cat',                         category: 'noun' },
  { id: 350, kanji: '鳥',         reading: 'とり',         meaning: 'bird; chicken',               category: 'noun' },

  // ===========================================================================
  //  NOUNS — Things & Objects
  // ===========================================================================

  { id: 351, kanji: '物',         reading: 'もの',         meaning: 'thing; object',               category: 'noun' },
  { id: 352, kanji: '本',         reading: 'ほん',         meaning: 'book',                        category: 'noun' },
  { id: 353, kanji: '雑誌',       reading: 'ざっし',       meaning: 'magazine',                    category: 'noun' },
  { id: 354, kanji: '新聞',       reading: 'しんぶん',     meaning: 'newspaper',                   category: 'noun' },
  { id: 355, kanji: '辞書',       reading: 'じしょ',       meaning: 'dictionary',                  category: 'noun' },
  { id: 356, kanji: '地図',       reading: 'ちず',         meaning: 'map',                         category: 'noun' },
  { id: 357, kanji: '写真',       reading: 'しゃしん',     meaning: 'photograph',                  category: 'noun' },
  { id: 358, kanji: '手紙',       reading: 'てがみ',       meaning: 'letter',                      category: 'noun' },
  { id: 359, kanji: '切手',       reading: 'きって',       meaning: 'stamp',                       category: 'noun' },
  { id: 360, kanji: '葉書',       reading: 'はがき',       meaning: 'postcard',                    category: 'noun' },
  { id: 361, kanji: '封筒',       reading: 'ふうとう',     meaning: 'envelope',                    category: 'noun' },
  { id: 362, kanji: '鍵',         reading: 'かぎ',         meaning: 'key; lock',                   category: 'noun' },
  { id: 363, kanji: '傘',         reading: 'かさ',         meaning: 'umbrella',                    category: 'noun' },
  { id: 364, kanji: '鞄',         reading: 'かばん',       meaning: 'bag',                         category: 'noun' },
  { id: 365, kanji: '財布',       reading: 'さいふ',       meaning: 'wallet',                      category: 'noun' },
  { id: 366, kanji: '箱',         reading: 'はこ',         meaning: 'box',                         category: 'noun' },
  { id: 367, kanji: 'ペン',       reading: 'ぺん',         meaning: 'pen',                         category: 'noun' },
  { id: 368, kanji: '鉛筆',       reading: 'えんぴつ',     meaning: 'pencil',                      category: 'noun' },
  { id: 369, kanji: 'ノート',     reading: 'のーと',       meaning: 'notebook',                    category: 'noun' },
  { id: 370, kanji: '紙',         reading: 'かみ',         meaning: 'paper',                       category: 'noun' },
  { id: 371, kanji: '消しゴム',   reading: 'けしごむ',     meaning: 'eraser',                      category: 'noun' },
  { id: 372, kanji: 'はさみ',     reading: 'はさみ',       meaning: 'scissors',                    category: 'noun' },
  { id: 373, kanji: 'テーブル',   reading: 'てーぶる',     meaning: 'table',                       category: 'noun' },
  { id: 374, kanji: '机',         reading: 'つくえ',       meaning: 'desk',                        category: 'noun' },
  { id: 375, kanji: '椅子',       reading: 'いす',         meaning: 'chair',                       category: 'noun' },
  { id: 376, kanji: 'ベッド',     reading: 'べっど',       meaning: 'bed',                         category: 'noun' },
  { id: 377, kanji: '窓',         reading: 'まど',         meaning: 'window',                      category: 'noun' },
  { id: 378, kanji: 'ドア',       reading: 'どあ',         meaning: 'door',                        category: 'noun' },
  { id: 379, kanji: '門',         reading: 'もん',         meaning: 'gate',                        category: 'noun' },
  { id: 380, kanji: '棚',         reading: 'たな',         meaning: 'shelf',                       category: 'noun' },
  { id: 381, kanji: '引き出し',   reading: 'ひきだし',     meaning: 'drawer',                      category: 'noun' },
  { id: 382, kanji: '時計',       reading: 'とけい',       meaning: 'clock; watch',                category: 'noun' },
  { id: 383, kanji: '電気',       reading: 'でんき',       meaning: 'electricity; light',          category: 'noun' },
  { id: 384, kanji: '電話',       reading: 'でんわ',       meaning: 'telephone',                   category: 'noun' },
  { id: 385, kanji: '電車',       reading: 'でんしゃ',     meaning: 'train',                       category: 'noun' },
  { id: 386, kanji: '車',         reading: 'くるま',       meaning: 'car',                         category: 'noun' },
  { id: 387, kanji: '自転車',     reading: 'じてんしゃ',   meaning: 'bicycle',                     category: 'noun' },
  { id: 388, kanji: 'バス',       reading: 'ばす',         meaning: 'bus',                         category: 'noun' },
  { id: 389, kanji: 'タクシー',   reading: 'たくしー',     meaning: 'taxi',                        category: 'noun' },
  { id: 390, kanji: '飛行機',     reading: 'ひこうき',     meaning: 'airplane',                    category: 'noun' },
  { id: 391, kanji: '船',         reading: 'ふね',         meaning: 'ship; boat',                  category: 'noun' },
  { id: 392, kanji: '自動車',     reading: 'じどうしゃ',   meaning: 'automobile',                  category: 'noun' },
  { id: 393, kanji: 'エレベーター', reading: 'えれべーたー', meaning: 'elevator',                   category: 'noun' },
  { id: 394, kanji: '階段',       reading: 'かいだん',     meaning: 'stairs',                      category: 'noun' },

  // --- Clothes ---
  { id: 395, kanji: '服',         reading: 'ふく',         meaning: 'clothes',                     category: 'noun' },
  { id: 396, kanji: '洋服',       reading: 'ようふく',     meaning: 'western clothes',             category: 'noun' },
  { id: 397, kanji: 'シャツ',     reading: 'しゃつ',       meaning: 'shirt',                       category: 'noun' },
  { id: 398, kanji: 'ズボン',     reading: 'ずぼん',       meaning: 'trousers; pants',             category: 'noun' },
  { id: 399, kanji: 'スカート',   reading: 'すかーと',     meaning: 'skirt',                       category: 'noun' },
  { id: 400, kanji: 'セーター',   reading: 'せーたー',     meaning: 'sweater',                     category: 'noun' },
  { id: 401, kanji: 'コート',     reading: 'こーと',       meaning: 'coat',                        category: 'noun' },
  { id: 402, kanji: '靴',         reading: 'くつ',         meaning: 'shoes',                       category: 'noun' },
  { id: 403, kanji: '靴下',       reading: 'くつした',     meaning: 'socks',                       category: 'noun' },
  { id: 404, kanji: '帽子',       reading: 'ぼうし',       meaning: 'hat; cap',                    category: 'noun' },
  { id: 405, kanji: '眼鏡',       reading: 'めがね',       meaning: 'glasses',                     category: 'noun' },
  { id: 406, kanji: 'ネクタイ',   reading: 'ねくたい',     meaning: 'necktie',                     category: 'noun' },
  { id: 407, kanji: 'ハンカチ',   reading: 'はんかち',     meaning: 'handkerchief',                category: 'noun' },

  // --- Electronics & Appliances ---
  { id: 408, kanji: 'テレビ',     reading: 'てれび',       meaning: 'television',                  category: 'noun' },
  { id: 409, kanji: 'ラジオ',     reading: 'らじお',       meaning: 'radio',                       category: 'noun' },
  { id: 410, kanji: 'カメラ',     reading: 'かめら',       meaning: 'camera',                      category: 'noun' },
  { id: 411, kanji: 'パソコン',   reading: 'ぱそこん',     meaning: 'personal computer',           category: 'noun' },
  { id: 412, kanji: 'エアコン',   reading: 'えあこん',     meaning: 'air conditioner',             category: 'noun' },
  { id: 413, kanji: '冷蔵庫',     reading: 'れいぞうこ',   meaning: 'refrigerator',                category: 'noun' },
  { id: 414, kanji: 'ストーブ',   reading: 'すとーぶ',     meaning: 'heater; stove',               category: 'noun' },

  // --- Tableware ---
  { id: 415, kanji: 'コップ',     reading: 'こっぷ',       meaning: 'cup; glass',                  category: 'noun' },
  { id: 416, kanji: '茶碗',       reading: 'ちゃわん',     meaning: 'rice bowl',                   category: 'noun' },
  { id: 417, kanji: '皿',         reading: 'さら',         meaning: 'plate; dish',                 category: 'noun' },
  { id: 418, kanji: 'スプーン',   reading: 'すぷーん',     meaning: 'spoon',                       category: 'noun' },
  { id: 419, kanji: 'フォーク',   reading: 'ふぉーく',     meaning: 'fork',                        category: 'noun' },
  { id: 420, kanji: 'ナイフ',     reading: 'ないふ',       meaning: 'knife',                       category: 'noun' },
  { id: 421, kanji: '箸',         reading: 'はし',         meaning: 'chopsticks',                  category: 'noun' },
  { id: 422, kanji: 'カップ',     reading: 'かっぷ',       meaning: 'cup',                         category: 'noun' },

  // ===========================================================================
  //  NOUNS — Abstract & Activities
  // ===========================================================================

  { id: 423, kanji: '仕事',       reading: 'しごと',       meaning: 'work; job',                   category: 'noun' },
  { id: 424, kanji: '宿題',       reading: 'しゅくだい',   meaning: 'homework',                    category: 'noun' },
  { id: 425, kanji: 'テスト',     reading: 'てすと',       meaning: 'test; exam',                  category: 'noun' },
  { id: 426, kanji: '試験',       reading: 'しけん',       meaning: 'examination',                 category: 'noun' },
  { id: 427, kanji: '問題',       reading: 'もんだい',     meaning: 'problem; question',           category: 'noun' },
  { id: 428, kanji: '質問',       reading: 'しつもん',     meaning: 'question',                    category: 'noun' },
  { id: 429, kanji: '答え',       reading: 'こたえ',       meaning: 'answer',                      category: 'noun' },
  { id: 430, kanji: '授業',       reading: 'じゅぎょう',   meaning: 'class; lesson',               category: 'noun' },
  { id: 431, kanji: 'クラス',     reading: 'くらす',       meaning: 'class',                       category: 'noun' },
  { id: 432, kanji: '練習',       reading: 'れんしゅう',   meaning: 'practice',                    category: 'noun' },
  { id: 433, kanji: '勉強',       reading: 'べんきょう',   meaning: 'study',                       category: 'noun' },
  { id: 434, kanji: '意味',       reading: 'いみ',         meaning: 'meaning',                     category: 'noun' },
  { id: 435, kanji: '言葉',       reading: 'ことば',       meaning: 'word; language',              category: 'noun' },
  { id: 436, kanji: '文',         reading: 'ぶん',         meaning: 'sentence',                    category: 'noun' },
  { id: 437, kanji: '名前',       reading: 'なまえ',       meaning: 'name',                        category: 'noun' },
  { id: 438, kanji: '漢字',       reading: 'かんじ',       meaning: 'kanji; Chinese character',    category: 'noun' },
  { id: 439, kanji: '映画',       reading: 'えいが',       meaning: 'movie',                       category: 'noun' },
  { id: 440, kanji: '音楽',       reading: 'おんがく',     meaning: 'music',                       category: 'noun' },
  { id: 441, kanji: '歌',         reading: 'うた',         meaning: 'song',                        category: 'noun' },
  { id: 442, kanji: '旅行',       reading: 'りょこう',     meaning: 'trip; travel',                category: 'noun' },
  { id: 443, kanji: '散歩',       reading: 'さんぽ',       meaning: 'walk; stroll',                category: 'noun' },
  { id: 444, kanji: '買い物',     reading: 'かいもの',     meaning: 'shopping',                    category: 'noun' },
  { id: 445, kanji: '荷物',       reading: 'にもつ',       meaning: 'luggage; baggage',            category: 'noun' },
  { id: 446, kanji: 'お土産',     reading: 'おみやげ',     meaning: 'souvenir',                    category: 'noun' },
  { id: 447, kanji: 'スポーツ',   reading: 'すぽーつ',     meaning: 'sports',                      category: 'noun' },
  { id: 448, kanji: 'サッカー',   reading: 'さっかー',     meaning: 'soccer',                      category: 'noun' },
  { id: 449, kanji: 'テニス',     reading: 'てにす',       meaning: 'tennis',                      category: 'noun' },
  { id: 450, kanji: '趣味',       reading: 'しゅみ',       meaning: 'hobby',                       category: 'noun' },
  { id: 451, kanji: 'ゲーム',     reading: 'げーむ',       meaning: 'game',                        category: 'noun' },
  { id: 452, kanji: '誕生日',     reading: 'たんじょうび', meaning: 'birthday',                    category: 'noun' },
  { id: 453, kanji: 'パーティー', reading: 'ぱーてぃー',   meaning: 'party',                       category: 'noun' },
  { id: 454, kanji: 'お祭り',     reading: 'おまつり',     meaning: 'festival',                    category: 'noun' },
  { id: 455, kanji: '結婚式',     reading: 'けっこんしき', meaning: 'wedding ceremony',            category: 'noun' },
  { id: 456, kanji: 'お正月',     reading: 'おしょうがつ', meaning: 'New Year',                    category: 'noun' },
  { id: 457, kanji: '休み',       reading: 'やすみ',       meaning: 'rest; holiday; vacation',     category: 'noun' },
  { id: 458, kanji: '夏休み',     reading: 'なつやすみ',   meaning: 'summer vacation',             category: 'noun' },
  { id: 459, kanji: '冬休み',     reading: 'ふゆやすみ',   meaning: 'winter vacation',             category: 'noun' },
  { id: 460, kanji: '春休み',     reading: 'はるやすみ',   meaning: 'spring vacation',             category: 'noun' },

  // --- Language & Communication ---
  { id: 461, kanji: '日本語',     reading: 'にほんご',     meaning: 'Japanese language',            category: 'noun' },
  { id: 462, kanji: '英語',       reading: 'えいご',       meaning: 'English language',            category: 'noun' },
  { id: 463, kanji: '外国語',     reading: 'がいこくご',   meaning: 'foreign language',            category: 'noun' },
  { id: 464, kanji: '話',         reading: 'はなし',       meaning: 'story; talk',                 category: 'noun' },

  // --- Colors ---
  { id: 465, kanji: '色',         reading: 'いろ',         meaning: 'color',                       category: 'noun' },
  { id: 466, kanji: '赤',         reading: 'あか',         meaning: 'red',                         category: 'noun' },
  { id: 467, kanji: '青',         reading: 'あお',         meaning: 'blue; green',                 category: 'noun' },
  { id: 468, kanji: '白',         reading: 'しろ',         meaning: 'white',                       category: 'noun' },
  { id: 469, kanji: '黒',         reading: 'くろ',         meaning: 'black',                       category: 'noun' },
  { id: 470, kanji: '緑',         reading: 'みどり',       meaning: 'green',                       category: 'noun' },
  { id: 471, kanji: '黄色',       reading: 'きいろ',       meaning: 'yellow',                      category: 'noun' },
  { id: 472, kanji: '茶色',       reading: 'ちゃいろ',     meaning: 'brown',                       category: 'noun' },
  { id: 473, kanji: 'グレー',     reading: 'ぐれー',       meaning: 'gray',                        category: 'noun' },

  // --- Money ---
  { id: 474, kanji: 'お金',       reading: 'おかね',       meaning: 'money',                       category: 'noun' },
  { id: 475, kanji: '円',         reading: 'えん',         meaning: 'yen',                         category: 'noun' },
  { id: 476, kanji: '切符',       reading: 'きっぷ',       meaning: 'ticket',                      category: 'noun' },

  // --- Miscellaneous Nouns ---
  { id: 477, kanji: 'お花見',     reading: 'おはなみ',     meaning: 'flower viewing',              category: 'noun' },
  { id: 478, kanji: '病気',       reading: 'びょうき',     meaning: 'illness; sickness',           category: 'noun' },
  { id: 479, kanji: '薬',         reading: 'くすり',       meaning: 'medicine',                    category: 'noun' },
  { id: 480, kanji: '風邪',       reading: 'かぜ',         meaning: 'cold (illness)',              category: 'noun' },
  { id: 481, kanji: '熱',         reading: 'ねつ',         meaning: 'fever; heat',                 category: 'noun' },
  { id: 482, kanji: '入り口',     reading: 'いりぐち',     meaning: 'entrance',                    category: 'noun' },
  { id: 483, kanji: '出口',       reading: 'でぐち',       meaning: 'exit',                        category: 'noun' },
  { id: 484, kanji: '石鹸',       reading: 'せっけん',     meaning: 'soap',                        category: 'noun' },
  { id: 485, kanji: 'タオル',     reading: 'たおる',       meaning: 'towel',                       category: 'noun' },
  { id: 486, kanji: 'トイレ',     reading: 'といれ',       meaning: 'toilet',                      category: 'noun' },
  { id: 487, kanji: 'シャワー',   reading: 'しゃわー',     meaning: 'shower',                      category: 'noun' },
  { id: 488, kanji: '電池',       reading: 'でんち',       meaning: 'battery',                     category: 'noun' },
  { id: 489, kanji: 'ポスト',     reading: 'ぽすと',       meaning: 'mailbox; post',               category: 'noun' },

  // --- Seasons ---
  { id: 490, kanji: '春',         reading: 'はる',         meaning: 'spring',                      category: 'noun' },
  { id: 491, kanji: '夏',         reading: 'なつ',         meaning: 'summer',                      category: 'noun' },
  { id: 492, kanji: '秋',         reading: 'あき',         meaning: 'autumn; fall',                category: 'noun' },
  { id: 493, kanji: '冬',         reading: 'ふゆ',         meaning: 'winter',                      category: 'noun' },

  // --- Directions ---
  { id: 494, kanji: '右',         reading: 'みぎ',         meaning: 'right',                       category: 'noun' },
  { id: 495, kanji: '左',         reading: 'ひだり',       meaning: 'left',                        category: 'noun' },
  { id: 496, kanji: '上',         reading: 'うえ',         meaning: 'above; up; on',               category: 'noun' },
  { id: 497, kanji: '下',         reading: 'した',         meaning: 'below; down; under',          category: 'noun' },
  { id: 498, kanji: '前',         reading: 'まえ',         meaning: 'front; before',               category: 'noun' },
  { id: 499, kanji: '後ろ',       reading: 'うしろ',       meaning: 'behind; back',                category: 'noun' },
  { id: 500, kanji: '中',         reading: 'なか',         meaning: 'inside; middle',              category: 'noun' },
  { id: 501, kanji: '隣',         reading: 'となり',       meaning: 'next to; neighboring',        category: 'noun' },
  { id: 502, kanji: '近く',       reading: 'ちかく',       meaning: 'nearby',                      category: 'noun' },
  { id: 503, kanji: '間',         reading: 'あいだ',       meaning: 'between; among',              category: 'noun' },
  { id: 504, kanji: '向こう',     reading: 'むこう',       meaning: 'over there; opposite side',   category: 'noun' },
  { id: 505, kanji: '横',         reading: 'よこ',         meaning: 'side; horizontal',            category: 'noun' },
  { id: 506, kanji: '北',         reading: 'きた',         meaning: 'north',                       category: 'noun' },
  { id: 507, kanji: '南',         reading: 'みなみ',       meaning: 'south',                       category: 'noun' },
  { id: 508, kanji: '東',         reading: 'ひがし',       meaning: 'east',                        category: 'noun' },
  { id: 509, kanji: '西',         reading: 'にし',         meaning: 'west',                        category: 'noun' },
  { id: 510, kanji: '側',         reading: 'がわ',         meaning: 'side',                        category: 'noun' },
  { id: 511, kanji: '奥',         reading: 'おく',         meaning: 'interior; inner part',        category: 'noun' },
  { id: 512, kanji: '角',         reading: 'かど',         meaning: 'corner',                      category: 'noun' },
  { id: 513, kanji: '真っ直ぐ',   reading: 'まっすぐ',     meaning: 'straight',                    category: 'noun' },

  // --- More things ---
  { id: 514, kanji: 'お弁当',     reading: 'おべんとう',   meaning: 'boxed lunch (polite)',         category: 'noun' },
  { id: 515, kanji: 'お釣り',     reading: 'おつり',       meaning: 'change (money)',               category: 'noun' },
  { id: 516, kanji: 'お皿',       reading: 'おさら',       meaning: 'plate (polite)',               category: 'noun' },
  { id: 517, kanji: 'ボタン',     reading: 'ぼたん',       meaning: 'button',                      category: 'noun' },
  { id: 518, kanji: 'ボールペン', reading: 'ぼーるぺん',   meaning: 'ballpoint pen',               category: 'noun' },
  { id: 519, kanji: 'ポケット',   reading: 'ぽけっと',     meaning: 'pocket',                      category: 'noun' },
  { id: 520, kanji: 'マッチ',     reading: 'まっち',       meaning: 'match (fire)',                 category: 'noun' },
  { id: 521, kanji: '灰皿',       reading: 'はいざら',     meaning: 'ashtray',                     category: 'noun' },
  { id: 522, kanji: 'テープ',     reading: 'てーぷ',       meaning: 'tape',                        category: 'noun' },
  { id: 523, kanji: 'テープレコーダー', reading: 'てーぷれこーだー', meaning: 'tape recorder',      category: 'noun' },
  { id: 524, kanji: 'カレンダー', reading: 'かれんだー',   meaning: 'calendar',                    category: 'noun' },

  // --- Buildings & Parts ---
  { id: 525, kanji: '建物',       reading: 'たてもの',     meaning: 'building',                    category: 'noun' },
  { id: 526, kanji: 'アパート',   reading: 'あぱーと',     meaning: 'apartment',                   category: 'noun' },
  { id: 527, kanji: 'マンション', reading: 'まんしょん',   meaning: 'condominium; apartment',      category: 'noun' },
  { id: 528, kanji: '階',         reading: 'かい',         meaning: 'floor; story',                category: 'noun' },

  // --- Other categories ---
  { id: 529, kanji: '世界',       reading: 'せかい',       meaning: 'world',                       category: 'noun' },
  { id: 530, kanji: '社会',       reading: 'しゃかい',     meaning: 'society',                     category: 'noun' },
  { id: 531, kanji: '経済',       reading: 'けいざい',     meaning: 'economy',                     category: 'noun' },
  { id: 532, kanji: '政治',       reading: 'せいじ',       meaning: 'politics',                    category: 'noun' },
  { id: 533, kanji: '文化',       reading: 'ぶんか',       meaning: 'culture',                     category: 'noun' },
  { id: 534, kanji: '歴史',       reading: 'れきし',       meaning: 'history',                     category: 'noun' },
  { id: 535, kanji: '地理',       reading: 'ちり',         meaning: 'geography',                   category: 'noun' },
  { id: 536, kanji: '科学',       reading: 'かがく',       meaning: 'science',                     category: 'noun' },
  { id: 537, kanji: '数学',       reading: 'すうがく',     meaning: 'mathematics',                 category: 'noun' },
  { id: 538, kanji: '生活',       reading: 'せいかつ',     meaning: 'life; living',                category: 'noun' },

  // ===========================================================================
  //  TIME (時間)
  // ===========================================================================

  // --- Time of day ---
  { id: 539, kanji: '朝',         reading: 'あさ',         meaning: 'morning',                     category: 'time' },
  { id: 540, kanji: '昼',         reading: 'ひる',         meaning: 'noon; daytime',               category: 'time' },
  { id: 541, kanji: '夕方',       reading: 'ゆうがた',     meaning: 'evening',                     category: 'time' },
  { id: 542, kanji: '夜',         reading: 'よる',         meaning: 'night',                       category: 'time' },
  { id: 543, kanji: '晩',         reading: 'ばん',         meaning: 'evening; night',              category: 'time' },
  { id: 544, kanji: '午前',       reading: 'ごぜん',       meaning: 'morning; AM',                 category: 'time' },
  { id: 545, kanji: '午後',       reading: 'ごご',         meaning: 'afternoon; PM',               category: 'time' },

  // --- Days ---
  { id: 546, kanji: '今日',       reading: 'きょう',       meaning: 'today',                       category: 'time' },
  { id: 547, kanji: '明日',       reading: 'あした',       meaning: 'tomorrow',                    category: 'time' },
  { id: 548, kanji: '昨日',       reading: 'きのう',       meaning: 'yesterday',                   category: 'time' },
  { id: 549, kanji: '明後日',     reading: 'あさって',     meaning: 'day after tomorrow',          category: 'time' },
  { id: 550, kanji: '一昨日',     reading: 'おととい',     meaning: 'day before yesterday',        category: 'time' },
  { id: 551, kanji: '毎日',       reading: 'まいにち',     meaning: 'every day',                   category: 'time' },
  { id: 552, kanji: '毎朝',       reading: 'まいあさ',     meaning: 'every morning',               category: 'time' },
  { id: 553, kanji: '毎晩',       reading: 'まいばん',     meaning: 'every night',                 category: 'time' },
  { id: 554, kanji: '毎週',       reading: 'まいしゅう',   meaning: 'every week',                  category: 'time' },
  { id: 555, kanji: '毎月',       reading: 'まいつき',     meaning: 'every month',                 category: 'time' },
  { id: 556, kanji: '毎年',       reading: 'まいとし',     meaning: 'every year',                  category: 'time' },

  // --- Week ---
  { id: 557, kanji: '今週',       reading: 'こんしゅう',   meaning: 'this week',                   category: 'time' },
  { id: 558, kanji: '先週',       reading: 'せんしゅう',   meaning: 'last week',                   category: 'time' },
  { id: 559, kanji: '来週',       reading: 'らいしゅう',   meaning: 'next week',                   category: 'time' },
  { id: 560, kanji: '再来週',     reading: 'さらいしゅう', meaning: 'week after next',             category: 'time' },
  { id: 561, kanji: '週末',       reading: 'しゅうまつ',   meaning: 'weekend',                     category: 'time' },

  // --- Month ---
  { id: 562, kanji: '今月',       reading: 'こんげつ',     meaning: 'this month',                  category: 'time' },
  { id: 563, kanji: '先月',       reading: 'せんげつ',     meaning: 'last month',                  category: 'time' },
  { id: 564, kanji: '来月',       reading: 'らいげつ',     meaning: 'next month',                  category: 'time' },

  // --- Year ---
  { id: 565, kanji: '今年',       reading: 'ことし',       meaning: 'this year',                   category: 'time' },
  { id: 566, kanji: '去年',       reading: 'きょねん',     meaning: 'last year',                   category: 'time' },
  { id: 567, kanji: '来年',       reading: 'らいねん',     meaning: 'next year',                   category: 'time' },

  // --- Days of the week ---
  { id: 568, kanji: '月曜日',     reading: 'げつようび',   meaning: 'Monday',                      category: 'time' },
  { id: 569, kanji: '火曜日',     reading: 'かようび',     meaning: 'Tuesday',                     category: 'time' },
  { id: 570, kanji: '水曜日',     reading: 'すいようび',   meaning: 'Wednesday',                   category: 'time' },
  { id: 571, kanji: '木曜日',     reading: 'もくようび',   meaning: 'Thursday',                    category: 'time' },
  { id: 572, kanji: '金曜日',     reading: 'きんようび',   meaning: 'Friday',                      category: 'time' },
  { id: 573, kanji: '土曜日',     reading: 'どようび',     meaning: 'Saturday',                    category: 'time' },
  { id: 574, kanji: '日曜日',     reading: 'にちようび',   meaning: 'Sunday',                      category: 'time' },

  // --- Time units ---
  { id: 575, kanji: '時間',       reading: 'じかん',       meaning: 'time; hour',                  category: 'time' },
  { id: 576, kanji: '分',         reading: 'ふん',         meaning: 'minute',                      category: 'time' },
  { id: 577, kanji: '半',         reading: 'はん',         meaning: 'half',                        category: 'time' },
  { id: 578, kanji: '秒',         reading: 'びょう',       meaning: 'second',                      category: 'time' },
  { id: 579, kanji: '年',         reading: 'ねん',         meaning: 'year',                        category: 'time' },
  { id: 580, kanji: '月',         reading: 'つき',         meaning: 'month; moon',                 category: 'time' },
  { id: 581, kanji: '週',         reading: 'しゅう',       meaning: 'week',                        category: 'time' },
  { id: 582, kanji: '日',         reading: 'ひ',           meaning: 'day; sun',                    category: 'time' },
  { id: 583, kanji: '今',         reading: 'いま',         meaning: 'now',                         category: 'time' },
  { id: 584, kanji: '後',         reading: 'あと',         meaning: 'after; later',                category: 'time' },

  // --- Months of the year ---
  { id: 585, kanji: '一月',       reading: 'いちがつ',     meaning: 'January',                     category: 'time' },
  { id: 586, kanji: '二月',       reading: 'にがつ',       meaning: 'February',                    category: 'time' },
  { id: 587, kanji: '三月',       reading: 'さんがつ',     meaning: 'March',                       category: 'time' },
  { id: 588, kanji: '四月',       reading: 'しがつ',       meaning: 'April',                       category: 'time' },
  { id: 589, kanji: '五月',       reading: 'ごがつ',       meaning: 'May',                         category: 'time' },
  { id: 590, kanji: '六月',       reading: 'ろくがつ',     meaning: 'June',                        category: 'time' },
  { id: 591, kanji: '七月',       reading: 'しちがつ',     meaning: 'July',                        category: 'time' },
  { id: 592, kanji: '八月',       reading: 'はちがつ',     meaning: 'August',                      category: 'time' },
  { id: 593, kanji: '九月',       reading: 'くがつ',       meaning: 'September',                   category: 'time' },
  { id: 594, kanji: '十月',       reading: 'じゅうがつ',   meaning: 'October',                     category: 'time' },
  { id: 595, kanji: '十一月',     reading: 'じゅういちがつ', meaning: 'November',                  category: 'time' },
  { id: 596, kanji: '十二月',     reading: 'じゅうにがつ', meaning: 'December',                    category: 'time' },

  // ===========================================================================
  //  NUMBERS (数字)
  // ===========================================================================

  { id: 597, kanji: '零',         reading: 'れい',         meaning: 'zero',                        category: 'number' },
  { id: 598, kanji: '一',         reading: 'いち',         meaning: 'one',                         category: 'number' },
  { id: 599, kanji: '二',         reading: 'に',           meaning: 'two',                         category: 'number' },
  { id: 600, kanji: '三',         reading: 'さん',         meaning: 'three',                       category: 'number' },
  { id: 601, kanji: '四',         reading: 'し',           meaning: 'four',                        category: 'number' },
  { id: 602, kanji: '五',         reading: 'ご',           meaning: 'five',                        category: 'number' },
  { id: 603, kanji: '六',         reading: 'ろく',         meaning: 'six',                         category: 'number' },
  { id: 604, kanji: '七',         reading: 'しち',         meaning: 'seven',                       category: 'number' },
  { id: 605, kanji: '八',         reading: 'はち',         meaning: 'eight',                       category: 'number' },
  { id: 606, kanji: '九',         reading: 'きゅう',       meaning: 'nine',                        category: 'number' },
  { id: 607, kanji: '十',         reading: 'じゅう',       meaning: 'ten',                         category: 'number' },
  { id: 608, kanji: '百',         reading: 'ひゃく',       meaning: 'hundred',                     category: 'number' },
  { id: 609, kanji: '千',         reading: 'せん',         meaning: 'thousand',                    category: 'number' },
  { id: 610, kanji: '万',         reading: 'まん',         meaning: 'ten thousand',                category: 'number' },

  // ===========================================================================
  //  COUNTERS (助数詞)
  // ===========================================================================

  { id: 611, kanji: '一つ',       reading: 'ひとつ',       meaning: 'one (thing)',                  category: 'counter' },
  { id: 612, kanji: '二つ',       reading: 'ふたつ',       meaning: 'two (things)',                 category: 'counter' },
  { id: 613, kanji: '三つ',       reading: 'みっつ',       meaning: 'three (things)',               category: 'counter' },
  { id: 614, kanji: '四つ',       reading: 'よっつ',       meaning: 'four (things)',                category: 'counter' },
  { id: 615, kanji: '五つ',       reading: 'いつつ',       meaning: 'five (things)',                category: 'counter' },
  { id: 616, kanji: '六つ',       reading: 'むっつ',       meaning: 'six (things)',                 category: 'counter' },
  { id: 617, kanji: '七つ',       reading: 'ななつ',       meaning: 'seven (things)',               category: 'counter' },
  { id: 618, kanji: '八つ',       reading: 'やっつ',       meaning: 'eight (things)',               category: 'counter' },
  { id: 619, kanji: '九つ',       reading: 'ここのつ',     meaning: 'nine (things)',                category: 'counter' },
  { id: 620, kanji: '十',         reading: 'とお',         meaning: 'ten (things)',                 category: 'counter' },
  { id: 621, kanji: 'いくつ',     reading: 'いくつ',       meaning: 'how many',                    category: 'counter' },

  // --- People counter ---
  { id: 622, kanji: '一人',       reading: 'ひとり',       meaning: 'one person; alone',            category: 'counter' },
  { id: 623, kanji: '二人',       reading: 'ふたり',       meaning: 'two people',                   category: 'counter' },
  { id: 624, kanji: '三人',       reading: 'さんにん',     meaning: 'three people',                 category: 'counter' },
  { id: 625, kanji: '四人',       reading: 'よにん',       meaning: 'four people',                  category: 'counter' },
  { id: 626, kanji: '五人',       reading: 'ごにん',       meaning: 'five people',                  category: 'counter' },

  // --- Specific counters ---
  { id: 627, kanji: '～冊',       reading: 'さつ',         meaning: 'counter for books',            category: 'counter' },
  { id: 628, kanji: '～本',       reading: 'ほん',         meaning: 'counter for long objects',     category: 'counter' },
  { id: 629, kanji: '～枚',       reading: 'まい',         meaning: 'counter for flat objects',     category: 'counter' },
  { id: 630, kanji: '～台',       reading: 'だい',         meaning: 'counter for machines/vehicles', category: 'counter' },
  { id: 631, kanji: '～匹',       reading: 'ひき',         meaning: 'counter for small animals',    category: 'counter' },
  { id: 632, kanji: '～杯',       reading: 'はい',         meaning: 'counter for cups/glasses',     category: 'counter' },
  { id: 633, kanji: '～回',       reading: 'かい',         meaning: 'counter for times/occasions',  category: 'counter' },
  { id: 634, kanji: '～番',       reading: 'ばん',         meaning: 'counter for number/order',     category: 'counter' },
  { id: 635, kanji: '～度',       reading: 'ど',           meaning: 'counter for degrees/times',    category: 'counter' },
  { id: 636, kanji: '～個',       reading: 'こ',           meaning: 'counter for small items',      category: 'counter' },
  { id: 637, kanji: '～着',       reading: 'ちゃく',       meaning: 'counter for suits/dresses',    category: 'counter' },
  { id: 638, kanji: '～足',       reading: 'そく',         meaning: 'counter for pairs (shoes/socks)', category: 'counter' },
  { id: 639, kanji: '～階',       reading: 'かい',         meaning: 'counter for floors',           category: 'counter' },
  { id: 640, kanji: '～人',       reading: 'にん',         meaning: 'counter for people',           category: 'counter' },

  // ===========================================================================
  //  PRONOUNS & DEMONSTRATIVES (代名詞・指示詞)
  // ===========================================================================

  { id: 641, kanji: 'これ',       reading: 'これ',         meaning: 'this (thing)',                category: 'pronoun' },
  { id: 642, kanji: 'それ',       reading: 'それ',         meaning: 'that (thing)',                category: 'pronoun' },
  { id: 643, kanji: 'あれ',       reading: 'あれ',         meaning: 'that over there (thing)',     category: 'pronoun' },
  { id: 644, kanji: 'どれ',       reading: 'どれ',         meaning: 'which (thing)',               category: 'pronoun' },
  { id: 645, kanji: 'この',       reading: 'この',         meaning: 'this (+ noun)',               category: 'pronoun' },
  { id: 646, kanji: 'その',       reading: 'その',         meaning: 'that (+ noun)',               category: 'pronoun' },
  { id: 647, kanji: 'あの',       reading: 'あの',         meaning: 'that over there (+ noun)',    category: 'pronoun' },
  { id: 648, kanji: 'どの',       reading: 'どの',         meaning: 'which (+ noun)',              category: 'pronoun' },
  { id: 649, kanji: 'ここ',       reading: 'ここ',         meaning: 'here',                        category: 'pronoun' },
  { id: 650, kanji: 'そこ',       reading: 'そこ',         meaning: 'there',                       category: 'pronoun' },
  { id: 651, kanji: 'あそこ',     reading: 'あそこ',       meaning: 'over there',                  category: 'pronoun' },
  { id: 652, kanji: 'どこ',       reading: 'どこ',         meaning: 'where',                       category: 'pronoun' },
  { id: 653, kanji: 'こちら',     reading: 'こちら',       meaning: 'this way (polite)',            category: 'pronoun' },
  { id: 654, kanji: 'そちら',     reading: 'そちら',       meaning: 'that way (polite)',            category: 'pronoun' },
  { id: 655, kanji: 'あちら',     reading: 'あちら',       meaning: 'that way over there (polite)', category: 'pronoun' },
  { id: 656, kanji: 'どちら',     reading: 'どちら',       meaning: 'which way (polite)',           category: 'pronoun' },
  { id: 657, kanji: 'こっち',     reading: 'こっち',       meaning: 'this way (casual)',            category: 'pronoun' },
  { id: 658, kanji: 'そっち',     reading: 'そっち',       meaning: 'that way (casual)',            category: 'pronoun' },
  { id: 659, kanji: 'あっち',     reading: 'あっち',       meaning: 'that way over there (casual)', category: 'pronoun' },
  { id: 660, kanji: 'どっち',     reading: 'どっち',       meaning: 'which way (casual)',           category: 'pronoun' },

  // --- Question words ---
  { id: 661, kanji: '何',         reading: 'なに',         meaning: 'what',                        category: 'pronoun' },
  { id: 662, kanji: '誰',         reading: 'だれ',         meaning: 'who',                         category: 'pronoun' },
  { id: 663, kanji: 'どなた',     reading: 'どなた',       meaning: 'who (polite)',                 category: 'pronoun' },
  { id: 664, kanji: 'いつ',       reading: 'いつ',         meaning: 'when',                        category: 'pronoun' },
  { id: 665, kanji: 'なぜ',       reading: 'なぜ',         meaning: 'why',                         category: 'pronoun' },
  { id: 666, kanji: 'どう',       reading: 'どう',         meaning: 'how',                         category: 'pronoun' },
  { id: 667, kanji: 'どうして',   reading: 'どうして',     meaning: 'why; how',                    category: 'pronoun' },
  { id: 668, kanji: 'どうやって', reading: 'どうやって',   meaning: 'how; in what way',            category: 'pronoun' },
  { id: 669, kanji: 'いくら',     reading: 'いくら',       meaning: 'how much (price)',             category: 'pronoun' },

  // ===========================================================================
  //  ADVERBS (副詞)
  // ===========================================================================

  { id: 670, kanji: 'とても',     reading: 'とても',       meaning: 'very; much',                  category: 'adverb' },
  { id: 671, kanji: 'たくさん',   reading: 'たくさん',     meaning: 'many; a lot',                 category: 'adverb' },
  { id: 672, kanji: '少し',       reading: 'すこし',       meaning: 'a little; a few',             category: 'adverb' },
  { id: 673, kanji: 'ちょっと',   reading: 'ちょっと',     meaning: 'a little; slightly',          category: 'adverb' },
  { id: 674, kanji: 'あまり',     reading: 'あまり',       meaning: 'not very (with negative)',    category: 'adverb' },
  { id: 675, kanji: '全然',       reading: 'ぜんぜん',     meaning: 'not at all (with negative)',  category: 'adverb' },
  { id: 676, kanji: 'いつも',     reading: 'いつも',       meaning: 'always',                      category: 'adverb' },
  { id: 677, kanji: 'よく',       reading: 'よく',         meaning: 'often; well',                 category: 'adverb' },
  { id: 678, kanji: '時々',       reading: 'ときどき',     meaning: 'sometimes',                   category: 'adverb' },
  { id: 679, kanji: 'たまに',     reading: 'たまに',       meaning: 'occasionally; rarely',        category: 'adverb' },
  { id: 680, kanji: 'もう',       reading: 'もう',         meaning: 'already; yet',                category: 'adverb' },
  { id: 681, kanji: 'まだ',       reading: 'まだ',         meaning: 'still; not yet',              category: 'adverb' },
  { id: 682, kanji: 'もっと',     reading: 'もっと',       meaning: 'more',                        category: 'adverb' },
  { id: 683, kanji: '一番',       reading: 'いちばん',     meaning: 'most; best; number one',      category: 'adverb' },
  { id: 684, kanji: 'すぐ',       reading: 'すぐ',         meaning: 'immediately; right away',     category: 'adverb' },
  { id: 685, kanji: 'だんだん',   reading: 'だんだん',     meaning: 'gradually',                   category: 'adverb' },
  { id: 686, kanji: 'ゆっくり',   reading: 'ゆっくり',     meaning: 'slowly; leisurely',           category: 'adverb' },
  { id: 687, kanji: '初めて',     reading: 'はじめて',     meaning: 'for the first time',          category: 'adverb' },
  { id: 688, kanji: '多分',       reading: 'たぶん',       meaning: 'probably; maybe',             category: 'adverb' },
  { id: 689, kanji: 'きっと',     reading: 'きっと',       meaning: 'surely; certainly',           category: 'adverb' },
  { id: 690, kanji: '本当に',     reading: 'ほんとうに',   meaning: 'really; truly',               category: 'adverb' },
  { id: 691, kanji: 'まっすぐ',   reading: 'まっすぐ',     meaning: 'straight ahead',              category: 'adverb' },
  { id: 692, kanji: '大体',       reading: 'だいたい',     meaning: 'mostly; approximately',       category: 'adverb' },
  { id: 693, kanji: '大勢',       reading: 'おおぜい',     meaning: 'many people; a crowd',        category: 'adverb' },
  { id: 694, kanji: '一緒に',     reading: 'いっしょに',   meaning: 'together',                    category: 'adverb' },
  { id: 695, kanji: 'また',       reading: 'また',         meaning: 'again; also',                 category: 'adverb' },
  { id: 696, kanji: 'やっと',     reading: 'やっと',       meaning: 'finally; at last',            category: 'adverb' },
  { id: 697, kanji: 'ちゃんと',   reading: 'ちゃんと',     meaning: 'properly; exactly',           category: 'adverb' },
  { id: 698, kanji: 'ちょうど',   reading: 'ちょうど',     meaning: 'exactly; just',               category: 'adverb' },
  { id: 699, kanji: 'はっきり',   reading: 'はっきり',     meaning: 'clearly; distinctly',         category: 'adverb' },
  { id: 700, kanji: 'もうすぐ',   reading: 'もうすぐ',     meaning: 'soon; almost',                category: 'adverb' },

  // ===========================================================================
  //  EXPRESSIONS (表現)
  // ===========================================================================

  // --- Greetings ---
  { id: 701, kanji: 'おはようございます', reading: 'おはようございます', meaning: 'good morning (polite)',   category: 'expression' },
  { id: 702, kanji: 'こんにちは', reading: 'こんにちは',   meaning: 'hello; good afternoon',       category: 'expression' },
  { id: 703, kanji: 'こんばんは', reading: 'こんばんは',   meaning: 'good evening',                category: 'expression' },
  { id: 704, kanji: 'おやすみなさい', reading: 'おやすみなさい', meaning: 'good night',             category: 'expression' },
  { id: 705, kanji: 'さようなら', reading: 'さようなら',   meaning: 'goodbye',                     category: 'expression' },
  { id: 706, kanji: 'じゃ、また', reading: 'じゃ、また',   meaning: 'see you later',               category: 'expression' },

  // --- Common phrases ---
  { id: 707, kanji: 'ありがとうございます', reading: 'ありがとうございます', meaning: 'thank you (polite)',  category: 'expression' },
  { id: 708, kanji: 'ありがとう', reading: 'ありがとう',   meaning: 'thank you (casual)',          category: 'expression' },
  { id: 709, kanji: 'どういたしまして', reading: 'どういたしまして', meaning: 'you\'re welcome',    category: 'expression' },
  { id: 710, kanji: 'すみません', reading: 'すみません',   meaning: 'excuse me; I\'m sorry',       category: 'expression' },
  { id: 711, kanji: 'ごめんなさい', reading: 'ごめんなさい', meaning: 'I\'m sorry',                 category: 'expression' },
  { id: 712, kanji: 'お願いします', reading: 'おねがいします', meaning: 'please',                   category: 'expression' },
  { id: 713, kanji: 'はい',       reading: 'はい',         meaning: 'yes',                         category: 'expression' },
  { id: 714, kanji: 'いいえ',     reading: 'いいえ',       meaning: 'no',                          category: 'expression' },
  { id: 715, kanji: 'いただきます', reading: 'いただきます', meaning: 'let\'s eat (before eating)', category: 'expression' },
  { id: 716, kanji: 'ごちそうさまでした', reading: 'ごちそうさまでした', meaning: 'thank you for the meal', category: 'expression' },
  { id: 717, kanji: 'お元気ですか', reading: 'おげんきですか', meaning: 'how are you?',             category: 'expression' },
  { id: 718, kanji: '初めまして', reading: 'はじめまして', meaning: 'nice to meet you',             category: 'expression' },
  { id: 719, kanji: 'どうぞよろしくお願いします', reading: 'どうぞよろしくおねがいします', meaning: 'pleased to meet you', category: 'expression' },
  { id: 720, kanji: 'いらっしゃいませ', reading: 'いらっしゃいませ', meaning: 'welcome (to a shop)', category: 'expression' },
  { id: 721, kanji: 'おめでとうございます', reading: 'おめでとうございます', meaning: 'congratulations', category: 'expression' },
  { id: 722, kanji: 'いってきます', reading: 'いってきます', meaning: 'I\'m leaving (home)',        category: 'expression' },
  { id: 723, kanji: 'いってらっしゃい', reading: 'いってらっしゃい', meaning: 'have a nice trip/day', category: 'expression' },
  { id: 724, kanji: 'ただいま',   reading: 'ただいま',     meaning: 'I\'m home',                   category: 'expression' },
  { id: 725, kanji: 'おかえりなさい', reading: 'おかえりなさい', meaning: 'welcome home',            category: 'expression' },
  { id: 726, kanji: 'お邪魔します', reading: 'おじゃまします', meaning: 'excuse me (entering someone\'s home)', category: 'expression' },
  { id: 727, kanji: 'どうぞ',     reading: 'どうぞ',       meaning: 'please; go ahead',            category: 'expression' },
  { id: 728, kanji: 'どうも',     reading: 'どうも',       meaning: 'thanks; very much',           category: 'expression' },
  { id: 729, kanji: 'ちょっと待ってください', reading: 'ちょっとまってください', meaning: 'please wait a moment', category: 'expression' },
  { id: 730, kanji: 'もう一度お願いします', reading: 'もういちどおねがいします', meaning: 'once more, please', category: 'expression' },
  { id: 731, kanji: 'わかりました', reading: 'わかりました', meaning: 'I understand; understood',   category: 'expression' },
  { id: 732, kanji: 'そうですか', reading: 'そうですか',   meaning: 'is that so?',                 category: 'expression' },
  { id: 733, kanji: 'そうですね', reading: 'そうですね',   meaning: 'that\'s right; let me see',   category: 'expression' },

  // ===========================================================================
  //  OTHER (その他) — Particles, Conjunctions, Misc.
  // ===========================================================================

  // --- Conjunctions ---
  { id: 734, kanji: 'そして',     reading: 'そして',       meaning: 'and then',                    category: 'other' },
  { id: 735, kanji: 'しかし',     reading: 'しかし',       meaning: 'however; but',                category: 'other' },
  { id: 736, kanji: 'でも',       reading: 'でも',         meaning: 'but; however',                category: 'other' },
  { id: 737, kanji: 'けれども',   reading: 'けれども',     meaning: 'however; although',           category: 'other' },
  { id: 738, kanji: 'それから',   reading: 'それから',     meaning: 'and then; after that',        category: 'other' },
  { id: 739, kanji: 'それで',     reading: 'それで',       meaning: 'and so; therefore',           category: 'other' },
  { id: 740, kanji: 'だから',     reading: 'だから',       meaning: 'therefore; so',               category: 'other' },
  { id: 741, kanji: 'では',       reading: 'では',         meaning: 'well then',                   category: 'other' },
  { id: 742, kanji: 'じゃ',       reading: 'じゃ',         meaning: 'well then (casual)',          category: 'other' },
  { id: 743, kanji: 'または',     reading: 'または',       meaning: 'or; otherwise',               category: 'other' },

  // --- Common nouns & misc ---
  { id: 744, kanji: '方',         reading: 'ほう',         meaning: 'direction; way; side',         category: 'other' },
  { id: 745, kanji: '事',         reading: 'こと',         meaning: 'thing (abstract); matter',    category: 'other' },
  { id: 746, kanji: 'ため',       reading: 'ため',         meaning: 'for; in order to',            category: 'other' },
  { id: 747, kanji: 'くらい',     reading: 'くらい',       meaning: 'about; approximately',        category: 'other' },
  { id: 748, kanji: 'ぐらい',     reading: 'ぐらい',       meaning: 'about; approximately',        category: 'other' },
  { id: 749, kanji: 'ごろ',       reading: 'ごろ',         meaning: 'around (time)',               category: 'other' },
  { id: 750, kanji: 'ぜひ',       reading: 'ぜひ',         meaning: 'by all means; definitely',    category: 'other' },
  { id: 751, kanji: 'もし',       reading: 'もし',         meaning: 'if',                          category: 'other' },
  { id: 752, kanji: 'まず',       reading: 'まず',         meaning: 'first of all',                category: 'other' },
  { id: 753, kanji: 'もちろん',   reading: 'もちろん',     meaning: 'of course',                   category: 'other' },
  { id: 754, kanji: '特に',       reading: 'とくに',       meaning: 'especially',                  category: 'other' },
  { id: 755, kanji: '全部',       reading: 'ぜんぶ',       meaning: 'all; everything',             category: 'other' },
  { id: 756, kanji: '半分',       reading: 'はんぶん',     meaning: 'half',                        category: 'other' },
  { id: 757, kanji: '最初',       reading: 'さいしょ',     meaning: 'first; beginning',            category: 'other' },
  { id: 758, kanji: '最後',       reading: 'さいご',       meaning: 'last; end',                   category: 'other' },
  { id: 759, kanji: '次',         reading: 'つぎ',         meaning: 'next',                        category: 'other' },
  { id: 760, kanji: '本当',       reading: 'ほんとう',     meaning: 'truth; reality',              category: 'other' },
  { id: 761, kanji: '普通',       reading: 'ふつう',       meaning: 'normal; usual',               category: 'other' },
  { id: 762, kanji: '大丈夫',     reading: 'だいじょうぶ', meaning: 'all right; OK',               category: 'other' },
  { id: 763, kanji: 'だけ',       reading: 'だけ',         meaning: 'only; just',                  category: 'other' },
  { id: 764, kanji: 'しか',       reading: 'しか',         meaning: 'only (with negative)',        category: 'other' },
  { id: 765, kanji: 'ほか',       reading: 'ほか',         meaning: 'other; another',              category: 'other' },

  // --- Additional nouns used as other ---
  { id: 766, kanji: 'お礼',       reading: 'おれい',       meaning: 'gratitude; thanks',           category: 'noun' },
  { id: 767, kanji: '返事',       reading: 'へんじ',       meaning: 'reply; answer',               category: 'noun' },
  { id: 768, kanji: '約束',       reading: 'やくそく',     meaning: 'promise; appointment',        category: 'noun' },
  { id: 769, kanji: '用事',       reading: 'ようじ',       meaning: 'errand; business',            category: 'noun' },
  { id: 770, kanji: '予定',       reading: 'よてい',       meaning: 'plan; schedule',              category: 'noun' },
  { id: 771, kanji: '準備',       reading: 'じゅんび',     meaning: 'preparation',                 category: 'noun' },
  { id: 772, kanji: '紹介',       reading: 'しょうかい',   meaning: 'introduction',                category: 'noun' },
  { id: 773, kanji: '説明',       reading: 'せつめい',     meaning: 'explanation',                 category: 'noun' },
  { id: 774, kanji: '相談',       reading: 'そうだん',     meaning: 'consultation; discussion',    category: 'noun' },
  { id: 775, kanji: '連絡',       reading: 'れんらく',     meaning: 'contact; communication',      category: 'noun' },
  { id: 776, kanji: '経験',       reading: 'けいけん',     meaning: 'experience',                  category: 'noun' },
  { id: 777, kanji: '気持ち',     reading: 'きもち',       meaning: 'feeling; mood',               category: 'noun' },
  { id: 778, kanji: '心',         reading: 'こころ',       meaning: 'heart; mind',                 category: 'noun' },
  { id: 779, kanji: '力',         reading: 'ちから',       meaning: 'power; strength',             category: 'noun' },
  { id: 780, kanji: '形',         reading: 'かたち',       meaning: 'shape; form',                 category: 'noun' },

  // --- More everyday nouns ---
  { id: 781, kanji: '写真',       reading: 'しゃしん',     meaning: 'photograph',                  category: 'noun' },
  { id: 782, kanji: '住所',       reading: 'じゅうしょ',   meaning: 'address',                     category: 'noun' },
  { id: 783, kanji: '番号',       reading: 'ばんごう',     meaning: 'number',                      category: 'noun' },
  { id: 784, kanji: '電話番号',   reading: 'でんわばんごう', meaning: 'telephone number',           category: 'noun' },
  { id: 785, kanji: '字',         reading: 'じ',           meaning: 'character; letter',           category: 'noun' },
  { id: 786, kanji: 'ページ',     reading: 'ぺーじ',       meaning: 'page',                        category: 'noun' },
  { id: 787, kanji: '教科書',     reading: 'きょうかしょ', meaning: 'textbook',                    category: 'noun' },

  // --- Additional important N5 words ---
  { id: 788, kanji: 'そば',       reading: 'そば',         meaning: 'near; beside',                category: 'other' },
  { id: 789, kanji: 'まだまだ',   reading: 'まだまだ',     meaning: 'still a long way to go',      category: 'other' },
  { id: 790, kanji: 'たいてい',   reading: 'たいてい',     meaning: 'usually; mostly',             category: 'adverb' },
  { id: 791, kanji: '結構',       reading: 'けっこう',     meaning: 'fairly; rather; fine',         category: 'adverb' },
  { id: 792, kanji: 'なかなか',   reading: 'なかなか',     meaning: 'quite; considerably',         category: 'adverb' },

  // --- Verb supplements ---
  { id: 793, kanji: 'なくなる',   reading: 'なくなる',     meaning: 'to run out; to disappear',    category: 'verb' },
  { id: 794, kanji: 'つく',       reading: 'つく',         meaning: 'to be attached; to be lit',   category: 'verb' },
  { id: 795, kanji: '触る',       reading: 'さわる',       meaning: 'to touch',                    category: 'verb' },
  { id: 796, kanji: '変わる',     reading: 'かわる',       meaning: 'to change (intransitive)',    category: 'verb' },

  // --- More noun supplements ---
  { id: 797, kanji: '背広',       reading: 'せびろ',       meaning: 'business suit',               category: 'noun' },
  { id: 798, kanji: 'ワイシャツ', reading: 'わいしゃつ',   meaning: 'dress shirt',                 category: 'noun' },
  { id: 799, kanji: 'セロテープ', reading: 'せろてーぷ',   meaning: 'scotch tape',                 category: 'noun' },
  { id: 800, kanji: 'レコード',   reading: 'れこーど',     meaning: 'record (music)',              category: 'noun' },
  { id: 801, kanji: 'ギター',     reading: 'ぎたー',       meaning: 'guitar',                      category: 'noun' },
  { id: 802, kanji: 'ピアノ',     reading: 'ぴあの',       meaning: 'piano',                       category: 'noun' },
  { id: 803, kanji: '絵',         reading: 'え',           meaning: 'picture; painting',           category: 'noun' },
  { id: 804, kanji: 'お見舞い',   reading: 'おみまい',     meaning: 'visiting the sick',           category: 'noun' },
  { id: 805, kanji: '生け花',     reading: 'いけばな',     meaning: 'flower arrangement',          category: 'noun' },

  // --- Misc useful ---
  { id: 806, kanji: 'どんな',     reading: 'どんな',       meaning: 'what kind of',                category: 'pronoun' },
  { id: 807, kanji: 'こんな',     reading: 'こんな',       meaning: 'this kind of',                category: 'pronoun' },
  { id: 808, kanji: 'そんな',     reading: 'そんな',       meaning: 'that kind of',                category: 'pronoun' },
  { id: 809, kanji: 'あんな',     reading: 'あんな',       meaning: 'that kind of (far)',          category: 'pronoun' },

  { id: 810, kanji: '一度',       reading: 'いちど',       meaning: 'once; one time',              category: 'other' },
  { id: 811, kanji: 'ところで',   reading: 'ところで',     meaning: 'by the way',                  category: 'other' },
  { id: 812, kanji: '例えば',     reading: 'たとえば',     meaning: 'for example',                 category: 'other' },
  { id: 813, kanji: 'つまり',     reading: 'つまり',       meaning: 'in other words',              category: 'other' },
  { id: 814, kanji: 'やはり',     reading: 'やはり',       meaning: 'as expected; after all',      category: 'other' },
  { id: 815, kanji: 'やっぱり',   reading: 'やっぱり',     meaning: 'as expected (casual)',        category: 'other' },
  { id: 816, kanji: 'ぜんぜん',   reading: 'ぜんぜん',     meaning: 'not at all',                  category: 'other' },

  // --- Country/Language nouns ---
  { id: 817, kanji: '日本',       reading: 'にほん',       meaning: 'Japan',                       category: 'noun' },
  { id: 818, kanji: 'アメリカ',   reading: 'あめりか',     meaning: 'America; USA',                category: 'noun' },
  { id: 819, kanji: 'イギリス',   reading: 'いぎりす',     meaning: 'England; UK',                 category: 'noun' },
  { id: 820, kanji: '中国',       reading: 'ちゅうごく',   meaning: 'China',                       category: 'noun' },
  { id: 821, kanji: '韓国',       reading: 'かんこく',     meaning: 'South Korea',                 category: 'noun' },
  { id: 822, kanji: 'フランス',   reading: 'ふらんす',     meaning: 'France',                      category: 'noun' },
  { id: 823, kanji: 'ドイツ',     reading: 'どいつ',       meaning: 'Germany',                     category: 'noun' },

  // --- More misc N5 ---
  { id: 824, kanji: '授業',       reading: 'じゅぎょう',   meaning: 'class; lesson',               category: 'noun' },
  { id: 825, kanji: '卒業',       reading: 'そつぎょう',   meaning: 'graduation',                  category: 'noun' },
  { id: 826, kanji: '入学',       reading: 'にゅうがく',   meaning: 'enrollment; entry to school', category: 'noun' },
  { id: 827, kanji: '出席',       reading: 'しゅっせき',   meaning: 'attendance',                  category: 'noun' },
  { id: 828, kanji: '欠席',       reading: 'けっせき',     meaning: 'absence',                     category: 'noun' },
  { id: 829, kanji: '成績',       reading: 'せいせき',     meaning: 'grades; results',             category: 'noun' },

  // --- Final batch ---
  { id: 830, kanji: 'ラーメン',   reading: 'らーめん',     meaning: 'ramen',                       category: 'noun' },
  { id: 831, kanji: 'うどん',     reading: 'うどん',       meaning: 'udon noodles',                category: 'noun' },
  { id: 832, kanji: 'そば',       reading: 'そば',         meaning: 'soba noodles',                category: 'noun' },
  { id: 833, kanji: 'すし',       reading: 'すし',         meaning: 'sushi',                       category: 'noun' },
  { id: 834, kanji: 'お好み焼き', reading: 'おこのみやき', meaning: 'Japanese savory pancake',     category: 'noun' },

  // --- Remaining important N5 misc ---
  { id: 835, kanji: 'みんな',     reading: 'みんな',       meaning: 'everyone; all',               category: 'other' },
  { id: 836, kanji: '別に',       reading: 'べつに',       meaning: 'not particularly',            category: 'adverb' },
  { id: 837, kanji: 'ずっと',     reading: 'ずっと',       meaning: 'all the time; much (more)',   category: 'adverb' },
  { id: 838, kanji: 'さっき',     reading: 'さっき',       meaning: 'a while ago; just now',       category: 'adverb' },
  { id: 839, kanji: '段々',       reading: 'だんだん',     meaning: 'gradually',                   category: 'adverb' },
  { id: 840, kanji: '必ず',       reading: 'かならず',     meaning: 'always; without fail',        category: 'adverb' },
  
  // --- Additional verbs (to round out) ---
  { id: 841, kanji: '落とす',     reading: 'おとす',       meaning: 'to drop (something)',         category: 'verb' },
  { id: 842, kanji: '届ける',     reading: 'とどける',     meaning: 'to deliver',                  category: 'verb' },
  { id: 843, kanji: '届く',       reading: 'とどく',       meaning: 'to reach; to arrive',         category: 'verb' },
  { id: 844, kanji: '拾う',       reading: 'ひろう',       meaning: 'to pick up',                  category: 'verb' },
  { id: 845, kanji: '捨てる',     reading: 'すてる',       meaning: 'to throw away',               category: 'verb' },
  { id: 846, kanji: '選ぶ',       reading: 'えらぶ',       meaning: 'to choose; to select',        category: 'verb' },
  { id: 847, kanji: '考える',     reading: 'かんがえる',   meaning: 'to think; to consider',       category: 'verb' },
  { id: 848, kanji: '信じる',     reading: 'しんじる',     meaning: 'to believe',                  category: 'verb' },
  { id: 849, kanji: '決める',     reading: 'きめる',       meaning: 'to decide',                   category: 'verb' },
  { id: 850, kanji: '探す',       reading: 'さがす',       meaning: 'to look for; to search',      category: 'verb' },
  { id: 851, kanji: '見つける',   reading: 'みつける',     meaning: 'to find; to discover',        category: 'verb' },
  { id: 852, kanji: '気をつける', reading: 'きをつける',   meaning: 'to be careful',               category: 'verb' },
  { id: 853, kanji: '起こす',     reading: 'おこす',       meaning: 'to wake (someone) up',        category: 'verb' },
  { id: 854, kanji: '間に合う',   reading: 'まにあう',     meaning: 'to be in time',               category: 'verb' },

  // --- Additional nouns ---
  { id: 855, kanji: 'お祝い',     reading: 'おいわい',     meaning: 'celebration; gift',           category: 'noun' },
  { id: 856, kanji: 'おもちゃ',   reading: 'おもちゃ',     meaning: 'toy',                         category: 'noun' },
  { id: 857, kanji: 'ごみ',       reading: 'ごみ',         meaning: 'garbage; trash',              category: 'noun' },
  { id: 858, kanji: '最近',       reading: 'さいきん',     meaning: 'recently; lately',            category: 'time' },
  { id: 859, kanji: '将来',       reading: 'しょうらい',   meaning: 'future',                      category: 'time' },
  { id: 860, kanji: '昔',         reading: 'むかし',       meaning: 'long ago; old times',         category: 'time' },

  // --- Final expressions & misc ---
  { id: 861, kanji: 'お疲れ様でした', reading: 'おつかれさまでした', meaning: 'good work; thanks for your effort', category: 'expression' },
  { id: 862, kanji: 'お先に失礼します', reading: 'おさきにしつれいします', meaning: 'excuse me for leaving first', category: 'expression' },
  { id: 863, kanji: 'お大事に',   reading: 'おだいじに',   meaning: 'take care (of your health)',  category: 'expression' },
  { id: 864, kanji: '失礼します', reading: 'しつれいします', meaning: 'excuse me',                 category: 'expression' },

  // --- Positional/relational nouns ---
  { id: 865, kanji: '以上',       reading: 'いじょう',     meaning: 'more than; above',            category: 'other' },
  { id: 866, kanji: '以下',       reading: 'いか',         meaning: 'less than; below',            category: 'other' },
  { id: 867, kanji: '以外',       reading: 'いがい',       meaning: 'except; other than',          category: 'other' },
  { id: 868, kanji: '場合',       reading: 'ばあい',       meaning: 'case; situation',             category: 'other' },
  { id: 869, kanji: '場所',       reading: 'ばしょ',       meaning: 'place; location',             category: 'noun' },
  { id: 870, kanji: '地下鉄',     reading: 'ちかてつ',     meaning: 'subway',                      category: 'noun' },
  { id: 871, kanji: '乗り物',     reading: 'のりもの',     meaning: 'vehicle',                     category: 'noun' },
  { id: 872, kanji: '信号',       reading: 'しんごう',     meaning: 'traffic light',               category: 'noun' },
  { id: 873, kanji: '地下',       reading: 'ちか',         meaning: 'underground; basement',       category: 'noun' },
  { id: 874, kanji: '屋上',       reading: 'おくじょう',   meaning: 'rooftop',                     category: 'noun' },
  { id: 875, kanji: '受付',       reading: 'うけつけ',     meaning: 'reception desk',              category: 'noun' },

  // --- Additional everyday words ---
  { id: 876, kanji: 'ニュース',   reading: 'にゅーす',     meaning: 'news',                        category: 'noun' },
  { id: 877, kanji: '番組',       reading: 'ばんぐみ',     meaning: 'TV program',                  category: 'noun' },
  { id: 878, kanji: 'プレゼント', reading: 'ぷれぜんと',   meaning: 'present; gift',               category: 'noun' },
  { id: 879, kanji: 'レポート',   reading: 'れぽーと',     meaning: 'report',                      category: 'noun' },
  { id: 880, kanji: 'アルバイト', reading: 'あるばいと',   meaning: 'part-time job',               category: 'noun' },

  // --- More particles/conjunctions ---
  { id: 881, kanji: 'そう',       reading: 'そう',         meaning: 'so; that way',                category: 'other' },
  { id: 882, kanji: 'こう',       reading: 'こう',         meaning: 'this way; like this',         category: 'other' },
  { id: 883, kanji: 'ああ',       reading: 'ああ',         meaning: 'like that; that way',         category: 'other' },
  { id: 884, kanji: 'どう',       reading: 'どう',         meaning: 'how; in what way',            category: 'other' },

  // --- Final N5 words ---
  { id: 885, kanji: '～方',       reading: 'かた',         meaning: 'person (polite)',              category: 'other' },
  { id: 886, kanji: '～中',       reading: 'ちゅう',       meaning: 'during; in the middle of',    category: 'other' },
  { id: 887, kanji: '～側',       reading: 'がわ',         meaning: 'side; ~side',                 category: 'other' },
  { id: 888, kanji: 'ぐっすり',   reading: 'ぐっすり',     meaning: 'soundly (sleeping)',          category: 'adverb' },
  { id: 889, kanji: 'そろそろ',   reading: 'そろそろ',     meaning: 'soon; gradually; it\'s about time', category: 'adverb' },
  { id: 890, kanji: 'はっきり',   reading: 'はっきり',     meaning: 'clearly',                     category: 'adverb' },
  { id: 891, kanji: 'びっくり',   reading: 'びっくり',     meaning: 'to be surprised',             category: 'adverb' },
  { id: 892, kanji: 'のんびり',   reading: 'のんびり',     meaning: 'leisurely; carefree',         category: 'adverb' },
  { id: 893, kanji: 'わざわざ',   reading: 'わざわざ',     meaning: 'expressly; on purpose',       category: 'adverb' },

  // --- More essential nouns ---
  { id: 894, kanji: '天気予報',   reading: 'てんきよほう', meaning: 'weather forecast',            category: 'noun' },
  { id: 895, kanji: '地震',       reading: 'じしん',       meaning: 'earthquake',                  category: 'noun' },
  { id: 896, kanji: '火事',       reading: 'かじ',         meaning: 'fire (disaster)',             category: 'noun' },
  { id: 897, kanji: '事故',       reading: 'じこ',         meaning: 'accident',                    category: 'noun' },
  { id: 898, kanji: '安全',       reading: 'あんぜん',     meaning: 'safety; security',            category: 'na-adjective' },

  { id: 899, kanji: 'どうぞお入りください', reading: 'どうぞおはいりください', meaning: 'please come in', category: 'expression' },
  { id: 900, kanji: 'お帰りなさい', reading: 'おかえりなさい', meaning: 'welcome back',             category: 'expression' },
];
