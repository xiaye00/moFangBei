// poem
var words=[
    '踏过樱花第几桥',
    '不然秋月春风夜',
    '争那闲思往事何',
    '沧海客归珠有泪',
    '觉后不知明月上',
    '满身花影倩人扶',
    '更被夕阳江岸上',
    '断肠烟柳一丝丝',
    '纵使晴明无雨色',
    '尽借篱落看秋风',
    '羽衣常带烟霞色',
    '不惹人间桃李花',
    '相到薰风四五月',
    '也能遮却美人腰',
    '二十四桥明月夜',
    '玉人何处教吹箫',
    '日长睡起无情思',
    '闲看儿童捉柳花',
    '多谢月相怜',
    '今宵不忍圆',
    '蒹葭苍苍',
    '白露为霜',
    '在水一方',
    '桃之夭夭',
    '灼灼其华',
    '月出皎兮',
    '舒窈纠兮',
    '帝子降兮北渚',
    '目眇眇兮愁予',
    '袅袅兮秋风',
    '洞庭波兮木叶下',
    '不破楼兰终不还',
    '伤心桥下春波绿',
    '曾是惊鸿照影来',
    '当年明月在',
    '曾照彩云归',
    '归去来兮',
    '真堪偕隐',
    '画船听雨眠',
    '愿为江水',
    '与君重逢',
    '一日不见兮',
    '思之若狂',
    '你是我灰色人生中的一道彩虹',
    '柳絮空缱绻',
    '南风知不知',
    '我见青山多妩媚',
    '料青山见我也应如是',
    '取次花丛懒回顾',
    '半缘修道半缘君',
    '三笑徒然当一痴',
    '人生若只如初见',
    '我余光中都是你',
    '人生自是有情痴',
    '此恨不关风与月',
    '因为你，我多少适应了这个世界',
    '春蚕到死丝方尽',
    '蜡炬成灰泪始干',
    '今夜何夕',
    '见此良人',
    '愿我如星君如月',
    '夜夜流光相皎洁',
    '情不所起',
    '一往而深',
    '玲珑骰子安红豆',
    '入骨相思知不知',
    '多情只有春庭月',
    '尤为离人照落花',
    '若有知音见采',
    '不辞唱遍阳春',
    '休言半纸无多重',
    '万斛离愁尽耐担',
    '夜月一帘幽梦',
    '杳霭流玉',
    '月落星沉',
    '霞姿月韵',
    '落花人独立',
    '微雨燕双飞',
    '弄花香满衣',
    '夜深忽梦少年事',
    '唯梦闲人不梦君',
    '垆边人似月',
    '皓腕凝霜雪',
    '人间颜色如尘土',
    '若非群玉山头见',
    '会向瑶台月下逢',
    '沉鱼落雁鸟惊喧',
    '羞花闭月花愁颤',
    '解释春风无限恨',
    '沉香亭北倚阑干'
];
function randomNum(min,max){
    var num = (Math.random()*(max-min+1)+min).toFixed(2);
    return num;
}
function init(){
    let container = document.querySelector('.container');
    let f = document.createDocumentFragment();
    words.forEach(w=>{
    let word_box = document.createElement('div');
    let word = document.createElement('div');
        word.innerText = w;
        word.classList.add('word');
        word.style.color = '#BAABDA';
        word.style.fontFamily = '楷体';
        word.style.fontSize = '20px'
        word_box.classList.add('word-box');
        word_box.style.setProperty("--margin-top",randomNum(-40,20)+'vh');
        word_box.style.setProperty("--margin-left",randomNum(6,35)+'vw');
        word_box.style.setProperty("--animation-duration",randomNum(8,20)+'s');
        word_box.style.setProperty("--animation-delay",randomNum(-20,0)+'s');
        
        word_box.appendChild(word);
        f.appendChild(word_box);


    })
    container.appendChild(f);
}
window.addEventListener('load',init);
let textone = document.querySelector('.textone').querySelector('h1');
      let text = document.querySelector('.text').querySelector('h1');
      setTimeout(function(){
        textone.innerHTML = '银烛秋光冷画屏'+ '轻罗小扇扑流萤';
          textone.style.color = '#E8F9FD';
          textone.style.fontFamily = '楷体'
          text.innerHTML = '';
      },28000)


 
