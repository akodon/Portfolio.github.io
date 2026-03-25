/*ローディング
=====================================*/ 

const loadingArea=document.querySelector('#loading');

window.addEventListener('load',()=>{
    loadingArea.animate(
        {
            
            translate:['0','0 -100vh'],
            visibility:'hidden',
        },
    {
        duration:1600,
        delay:1200,
        easing:'ease-out',
        fill:'forwards',
    });
});

/*ヒーローエリア
=============================================*/
const heroArea=document.querySelector('#hero');
const backLayer=document.querySelector('.back');
const middleLayer=document.querySelector('.middle');
const frontLayer=document.querySelector('.front');

//ウィンドウの中心を取得
const xCenter=window.innerWidth/2;
const yCenter=window.innerHeight/2;

//パララックスで移動させる距離
const parallaxVal_B = 100;
const parallaxVal_M = 50;
const parallaxVal_F = 15;

//背景を動かす
heroArea.addEventListener('mousemove',(e)=>{
    console.log("入力中");
    const moveX=e.clientX;
    const moveY=e.clientY;

    var BposX=(xCenter-moveX)/parallaxVal_B;
    var BposY=(yCenter-moveY)/parallaxVal_B;
    backLayer.style.transform=`translate(${-BposX}px,${-BposY}px)`;

    var MposX=(xCenter-moveX)/parallaxVal_M;
    var MposY=(yCenter-moveY)/parallaxVal_M;
    middleLayer.style.transform=`translate(${-MposX}px,${-MposY}px)`;

    var FposX=(xCenter-moveX)/parallaxVal_F;
    var FposY=(yCenter-moveY)/parallaxVal_F;
    frontLayer.style.transform=`translate(${-FposX}px,${-FposY}px)`;
});


/*ポップアップ
==============================================*/ 
const popup=document.querySelector('.popup');
const popupContent=document.querySelector('.popup-content');
const popupClose=document.querySelector('.close');
const popupTitle=document.querySelector('.popup-title');
const popupText=document.querySelector('.popup-text');
const popupLink=document.querySelector('.popup-links');
const popupImg=document.querySelector('.img-area');
const item=document.querySelectorAll('.games-item');
let currentWork=0;
let currentSide=0;
const Opation={
        duration:120,
        easing:'ease',
        fill:'forwards',

    };

//表示ゲーム概要
const works=[{
    title:"パパ活オンライン",
    text:"「はじめはオンライン上で女の子たちとお話しませんか？」\n パパになってパパ活女子と色んな場所にデートしに行くゲームです。両想いになるのが本当にハッピーエンド？",
    link:["http://novelgame.jp/games/show/7149 ",],
    label:["ノベルゲームコレクション",],
    image:[
        "images/PP/title.jpg",
        'images/PP/photo1.jpg',
        'images/PP/photo2.jpg',
        'images/PP/photo3.jpg',
        
    ]
},
{
    title:"つなげてすてーしょん",
    text:"線路をつなげて電車を駅まで届けよう。",
    link:["https://unityroom.com/games/connectstation",],
    label:["unityroom",],
    image:[
        'images/tunagete/title.jpg',
        'images/tunagete/photo1.jpg',
        'images/tunagete/photo2.jpg',
    ]
},
{
    title:"くらげのがっこう",
    text:"クラゲばかりの中学校に教育実習としてやってきたあなたは１人の人間の女の子と出会って会話をしていくノベルゲーム。\n 話を聞いてくれるだけでいいんですよ。",
    link:[" ",],
    label:[" ",],
    image:[
        'images/kurageschool/title.jpg',
        'images/kurageschool/photo1.jpg',
        'images/kurageschool/photo2.jpg',
    ]
}
]

//開く
item.forEach((element,index) => {
    element.addEventListener('click',(event)=>{
        
        currentWork=index;
        currentSide=0;

        popupTitle.textContent=works[index].title;
        popupText.textContent=works[index].text;
        popupImg.src=works[index].image[0];

        //URLを何個追加しても大丈夫！
        popupLink.innerHTML="";
        works[index].link.forEach((element,i)=>{
            const a=document.createElement('a');
            a.href=works[index].link[i];
            a.textContent=works[index].label[i];
            a.target="_blank";

            popupLink.appendChild(a);

        });

        //表示アニメーション
        popup.animate({opacity:[0,1]},Opation);
        popupContent.animate({transform:["scale(0.8)","scale(1)"]},Opation);

        popup.style.display="flex";
    });
});
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.animate({
        opacity:[1,0],
    },Opation);

    popupContent.animate({
        transform:["scale(1)","scale(0.8)"],
    },Opation).finished.then(()=>{
        popup.style.display="none";
    });
    }
    
});


//閉じる
popupClose.addEventListener('click',()=>{
    popup.animate({
        opacity:[1,0],
    },Opation);

    popupContent.animate({
        transform:["scale(1)","scale(0.8)"],
    },Opation).finished.then(()=>{
        popup.style.display="none";
    });
});

//スライドショー
const nextBtn=document.querySelector('.next');
const prevBtn=document.querySelector('.prev');

nextBtn.addEventListener('click',()=>{
    currentSide++;

    if(currentSide>=works[currentWork].image.length){
        currentSide=0;
        console.log("next");
    }
    popupImg.src=works[currentWork].image[currentSide];
});

prevBtn.addEventListener('click',()=>{
    currentSide--;
    if(currentSide < 0){
        currentSide=works[currentWork].image.length-1;
        console.log("prev");
    }
    popupImg.src=works[currentWork].image[currentSide];
});


