window.UMA_DEFAULT_QUESTIONS = [
  {id:1,  prompt:'평소에 보고만 있어도 기분이 좋아지는 캐릭터라면 어느 쪽이 더 끌려?', left:'조용하고 차분한 분위기', right:'주변까지 밝게 만드는 분위기', weight:1.2, effects:{cheerful:1,extroversion:0.15}},
  {id:2,  prompt:'힘든 일이 생겼을 때 더 좋아하는 반응은?', left:'분위기를 가라앉히고 진지하게 받아들인다', right:'힘들어도 웃으며 분위기를 살린다', weight:1.0, effects:{cheerful:1,adversity:0.2}},
  {id:3,  prompt:'캐릭터의 기본 정서는 어느 쪽이 더 매력적이야?', left:'쓸쓸함이나 그늘이 느껴지는 쪽', right:'낙천적이고 긍정적인 쪽', weight:1.1, effects:{cheerful:1}},

  {id:4,  prompt:'새로운 사람들과 처음 만나는 장면에서?', left:'먼저 다가오기보다 천천히 가까워진다', right:'먼저 말을 걸고 금방 친해진다', weight:1.2, effects:{extroversion:1}},
  {id:5,  prompt:'여럿이 모여 있을 때 좋아하는 캐릭터는?', left:'한발 물러나 자기 페이스를 지킨다', right:'사람들 사이에서 자연스럽게 중심이 된다', weight:1.0, effects:{extroversion:1,independence:-0.15}},
  {id:6,  prompt:'트레이너와 친해지는 과정은 어느 쪽이 좋아?', left:'시간을 두고 조금씩 마음을 연다', right:'처음부터 거리낌 없이 친근하게 다가온다', weight:1.1, effects:{extroversion:0.9,consideration:0.15}},

  {id:7,  prompt:'큰 레이스를 앞두고 더 끌리는 모습은?', left:'잘할 수 있을지 걱정하고 스스로를 의심한다', right:'자기가 이길 거라고 자연스럽게 믿는다', weight:1.2, effects:{selfConfidence:1}},
  {id:8,  prompt:'실수한 뒤의 반응은?', left:'한동안 자기 잘못을 곱씹는다', right:'다음에는 잘하면 된다며 금방 다시 일어난다', weight:1.0, effects:{selfConfidence:0.8,adversity:-0.15}},
  {id:9,  prompt:'자기 능력을 바라보는 태도는?', left:'자기평가가 박하고 인정받고 싶어 한다', right:'자신의 장점을 확실히 알고 당당하다', weight:1.1, effects:{selfConfidence:1}},

  {id:10, prompt:'캐릭터에게 이상한 취미나 집착이 있다면?', left:'그런 면은 적고 상식적인 편이 좋다', right:'남들이 이해 못 할 정도로 독특해도 좋다', weight:1.3, effects:{eccentricity:1}},
  {id:11, prompt:'뜬금없는 행동을 하는 캐릭터에 대해?', left:'행동에는 어느 정도 납득할 이유가 있었으면 한다', right:'이유를 몰라도 예측불허인 게 매력이다', weight:1.1, effects:{eccentricity:0.9,impulsivity:0.2}},
  {id:12, prompt:'평소 사고방식은 어느 쪽이 더 좋아?', left:'남들과 비슷한 상식선에서 생각한다', right:'자기만의 독특한 논리와 세계관이 있다', weight:1.2, effects:{eccentricity:1,rationality:0.15}},

  {id:13, prompt:'평소 대화에서?', left:'진지하고 담백한 대화를 많이 한다', right:'농담이나 장난으로 상대를 자주 흔든다', weight:1.2, effects:{playfulness:1}},
  {id:14, prompt:'중요하지 않은 일상 장면에서 더 보고 싶은 쪽은?', left:'얌전히 자기 할 일을 하는 모습', right:'사소한 장난이나 사건을 만드는 모습', weight:1.1, effects:{playfulness:1,impulsivity:0.15}},
  {id:15, prompt:'트레이너를 대하는 방식은?', left:'기본적으로 진지하고 예의 바르다', right:'놀리거나 장난치면서 친해진다', weight:1.0, effects:{playfulness:0.9,extroversion:0.15}},

  {id:16, prompt:'성장 서사에서 더 좋아하는 쪽은?', left:'재능과 센스로 빠르게 해내는 모습', right:'반복 훈련과 끈기로 조금씩 올라가는 모습', weight:1.3, effects:{effort:1,talent:-0.35}},
  {id:17, prompt:'결과가 잘 안 나올 때?', left:'방법을 바꾸거나 다른 길을 찾는다', right:'될 때까지 같은 목표를 붙잡고 계속 노력한다', weight:1.1, effects:{effort:1,adversity:0.2}},
  {id:18, prompt:'캐릭터의 매력을 설명할 때 더 중요한 건?', left:'번뜩이는 재능이나 감각', right:'꾸준함과 성실함', weight:1.2, effects:{effort:0.9,talent:-0.7}},

  {id:19, prompt:'천재 캐릭터라면 어느 정도가 좋아?', left:'재능보다는 평범한 출발점이 좋다', right:'처음부터 남들과 다른 재능이 눈에 띄는 게 좋다', weight:1.2, effects:{talent:1}},
  {id:20, prompt:'처음 보는 걸 빠르게 익히는 캐릭터에 대해?', left:'시행착오를 거쳐 배우는 편이 더 좋다', right:'감각만으로 금방 이해하는 천재성이 좋다', weight:1.1, effects:{talent:1}},
  {id:21, prompt:'압도적인 재능과 피나는 노력 중 하나만 고른다면?', left:'피나는 노력', right:'압도적인 재능', weight:1.3, effects:{talent:1,effort:-0.6}},

  {id:22, prompt:'캐릭터의 서사는 어느 쪽이 더 끌려?', left:'큰 굴곡 없이 자기 길을 가는 이야기', right:'실패나 좌절을 여러 번 넘어서는 이야기', weight:1.3, effects:{adversity:1}},
  {id:23, prompt:'콤플렉스나 상처가 있는 캐릭터는?', left:'없거나 가벼운 편이 좋다', right:'그 문제를 극복하는 과정이 핵심이면 좋다', weight:1.2, effects:{adversity:1}},
  {id:24, prompt:'패배 장면이 캐릭터에게 어떤 의미였으면 해?', left:'잠깐의 사건 정도', right:'이후의 성격과 목표를 바꿀 만큼 큰 사건', weight:1.1, effects:{adversity:1,competitiveness:0.15}},

  {id:25, prompt:'문제가 생겼을 때 더 끌리는 해결 방식은?', left:'느낌과 직감으로 먼저 답을 찾는다', right:'정보를 모으고 분석해서 답을 찾는다', weight:1.2, effects:{rationality:1}},
  {id:26, prompt:'레이스 전략을 세우는 캐릭터라면?', left:'그날의 감각과 흐름을 믿는다', right:'상대와 상황을 계산해 계획을 세운다', weight:1.2, effects:{rationality:1}},
  {id:27, prompt:'예상 밖의 일이 터졌을 때?', left:'몸이 먼저 반응하고 생각은 나중이다', right:'잠깐이라도 상황을 정리하고 움직인다', weight:1.1, effects:{rationality:0.8,impulsivity:-0.6}},

  {id:28, prompt:'갑자기 재미있어 보이는 일이 생기면?', left:'일정을 보고 가능한지부터 생각한다', right:'일단 해보고 뒷일은 나중에 생각한다', weight:1.2, effects:{impulsivity:1,rationality:-0.2}},
  {id:29, prompt:'감정이 크게 흔들렸을 때 좋아하는 캐릭터 반응은?', left:'화를 내더라도 행동은 최대한 억제한다', right:'그 순간의 감정대로 바로 행동해버린다', weight:1.1, effects:{impulsivity:1}},
  {id:30, prompt:'트레이너가 말리는데도 하고 싶은 일이 있다면?', left:'이유를 듣고 다시 판단한다', right:'이미 마음먹었으면 그대로 돌진한다', weight:1.2, effects:{impulsivity:1,independence:0.25}},

  {id:31, prompt:'친구가 힘들어할 때 더 좋아하는 캐릭터는?', left:'자기 목표에 집중하고 필요한 만큼만 돕는다', right:'자기 일을 미뤄서라도 곁을 챙긴다', weight:1.2, effects:{consideration:1}},
  {id:32, prompt:'누군가와 의견이 충돌했을 때?', left:'자기 생각을 분명하게 밀고 간다', right:'상대 입장도 생각해 타협점을 찾는다', weight:1.0, effects:{consideration:0.9,independence:-0.15}},
  {id:33, prompt:'캐릭터의 친절함은 어느 정도가 좋아?', left:'필요할 때만 조용히 돕는 정도', right:'평소부터 주변 사람을 세심하게 챙기는 정도', weight:1.1, effects:{consideration:1,responsibility:0.15}},

  {id:34, prompt:'목표를 정할 때?', left:'소중한 사람이나 관계의 영향을 많이 받는다', right:'남들과 상관없이 자기 기준으로 목표를 정한다', weight:1.2, effects:{independence:1}},
  {id:35, prompt:'혼자 있는 장면에서 더 매력적인 쪽은?', left:'누군가와 연결돼 있을 때 진가가 드러나는 캐릭터', right:'혼자 있어도 자기 세계가 완성되는 캐릭터', weight:1.1, effects:{independence:1}},
  {id:36, prompt:'주변에서 반대하는 선택을 해야 한다면?', left:'관계를 생각해서 어느 정도 맞춘다', right:'필요하다면 혼자라도 자기 선택을 밀고 간다', weight:1.2, effects:{independence:1,consideration:-0.2}},

  {id:37, prompt:'훈련이나 준비 과정에서?', left:'어느 정도 되면 넘어가는 편이 좋다', right:'작은 부족함도 끝까지 고치는 편이 좋다', weight:1.2, effects:{perfectionism:1,effort:0.2}},
  {id:38, prompt:'실수 하나를 발견했다면?', left:'전체 결과가 괜찮으면 크게 신경 쓰지 않는다', right:'사소해도 마음에 걸려 반드시 바로잡는다', weight:1.1, effects:{perfectionism:1}},
  {id:39, prompt:'자기에게 요구하는 기준은?', left:'상황에 맞게 유연하게 낮출 줄 안다', right:'스스로 정한 높은 기준을 쉽게 타협하지 않는다', weight:1.2, effects:{perfectionism:1,selfConfidence:0.15}},

  {id:40, prompt:'라이벌에게 졌을 때 더 끌리는 반응은?', left:'좋은 경험이었다며 다음을 준비한다', right:'반드시 다시 붙어서 이기겠다고 불탄다', weight:1.3, effects:{competitiveness:1}},
  {id:41, prompt:'레이스에서 2등을 했다면?', left:'잘 달렸다면 어느 정도 만족할 수 있다', right:'2등이면 아무리 잘 달렸어도 만족하지 못한다', weight:1.2, effects:{competitiveness:1,perfectionism:0.15}},
  {id:42, prompt:'좋아하는 라이벌 관계는?', left:'서로 존중하며 각자 자기 길을 가는 관계', right:'상대를 반드시 넘어야 할 대상으로 강하게 의식하는 관계', weight:1.1, effects:{competitiveness:1}},

  {id:43, prompt:'맡은 일이 생겼을 때 좋아하는 모습은?', left:'상황이 바뀌면 내려놓거나 다른 사람에게 맡길 수 있다', right:'자기가 맡았으면 끝까지 책임지고 마무리한다', weight:1.2, effects:{responsibility:1}},
  {id:44, prompt:'팀이나 가족에게 기대를 받고 있다면?', left:'자기 삶을 우선하고 기대와 거리를 둘 수 있다', right:'기대받는 역할을 의식하고 어떻게든 해내려 한다', weight:1.1, effects:{responsibility:1,independence:-0.15}},
  {id:45, prompt:'자기 행동 때문에 문제가 생겼다면?', left:'상황이 복잡하면 적당히 넘길 수도 있다', right:'불리하더라도 자기 몫은 확실히 책임진다', weight:1.2, effects:{responsibility:1,consideration:0.2}}
];
