window.onload = ()=>{
    let can = document.querySelector('canvas');
    let g =  can.getContext('2d');

    let vcan;
    let vg;

    let flg;
    let flag;
    let endFlag;

    let loop;
    let loop1;
    let loop2;

    let animeLoop;

    let count;

    const HAIKU = [
        [
            '朝顔に','閑さや','五月雨を','日盛りに','流れ行く',
            '彼一語','去年今年','郭公や','春の水','瀧の上に',
            'しんしんと','血を垂れて','音楽漂う','戦争が',
            'ある闇は','鍵穴に','あらたふと','年々や','二日酔ひ',
            'ダンゴムシ','百円で','学校で','掃除機で','一昨日に',
        ],[
            'つるべとられて','岩にしみ入る','あつめて早し','蝶のふれ合ふ','大根の葉の',
            '我一語秋','貫く棒の','何処までゆかば','岸へ岸へと','水現れて',
            '寒さがたのし','鳥の骨ゆく','岸侵しゆく','廊下の奥に',
            '蟲の形をして','雪のささやく','青葉若葉の','桜を肥やす','ものかは花の',
            '串焼きにして','売りつけられた','怒られすぎて','吸い上げられた','全部こぼした',
        ],[
            '貰い水','蝉の声','最上川','音すなり','早さかな',
            '深みかも','如きもの','人に逢はむ','夕かな','落ちにけり',
            '歩みゆく','なかぞらに','蛇の飢','立つてゐた',
            '哭けり','子の目覚め','日の光','花の塵','あるあひだ',
            'プレゼント','うまい棒','不登校','あのピ｜ス','アイスティ｜',
        ]
    ]

    const KIGO = {
        spring:['春','桜','花'],
        summer:['海','若葉','日盛り','瀧','蛇','郭公','蝉','五月雨'],
        autumn:['秋','朝顔','蟲'],
        winter:['冬','雪','寒さ','大根'],
        newyear:['去年今年'],
        special:['うまい棒']
    }

    const DESCRIPTION = [
        'この俳句には',
        '',
        '思いが',
        '込められている'
    ]

    const RANDOM_STRING = [
        '働きたく無い',
        '一刀両断する',
        'うまい棒が食べたい',
        'コンビニに行きたい',
        '空を飛びたい',
    ]

    let renderString;
    let renderHaiku;

    let img1 = new Image();
    img1.src = 'makimono-1 (1).jpg';

    let img2 = new Image();
    img2.src = 'makimono.png';
    
    let image = 'iStock-173727059-1.jpg';

    const TITLE = '俳句ジェネレ｜タ｜';
    const FONT = '64px monospace';
    const FONT_D = '16px monospace';

    const init = ()=>{
        renderHaiku = new Array(3);
        for(let i = 0;i < HAIKU.length;i ++){
            renderHaiku[i] = new Array();
            for(let j = 0;j < HAIKU[i].length;j ++){
                renderHaiku[i][j] = HAIKU[i][j];
            }
        }

        document.body.style.backgroundImage = `url("${image}")`;
        document.body.style.backgroundSize = 'auto';
        document.body.style.backgroundRepeat = 'repeat';
        vcan = document.createElement('canvas');
        vg = vcan.getContext('2d');
        can.width = 1500;
        can.height = 700;

        vcan.width = 1500;
        vcan.height = 700;

        count = 0;

        renderString = new Array(renderHaiku.length);

        animeLoop = '';
        loop = '';
        loop1 = '';
        loop2 = '';

        flg = false;
        flag = true;
        seasonFlag = false;
        endFlag = false;

        drawTitle();
        draw();
    }

    const drawTitle = ()=>{
        vg.fillStyle = 'black';
        vg.font = FONT;
        for(let i = 0;i < TITLE.length;i ++){
            vg.fillText(TITLE.charAt(i),1320,70 * i + 60,100);
        }
    }

    const drawHaiku = (string,len)=>{
        vg.fillStyle = 'black';
        switch(len){
            case 0:
                for(let i = 0;i < string.length;i ++){
                    vg.fillText(string.charAt(i),1150,60 * i + 70 + 100,50);
                }
            break;
            case 1:
                for(let i = 0;i < string.length;i ++){
                    vg.fillText(string.charAt(i),1000,60 * i + 70 + 150,50);
                }
            break;
            case 2:
                for(let i = 0;i < string.length;i ++){
                    vg.fillText(string.charAt(i),850,60 * i + 70 + 200,50);
                }
            break;
        }
        
    }

    const draw = ()=>{
        g.clearRect(0,0,can.width,can.height);
        g.drawImage(vcan,0,0);
    }

    const shuffle = (len)=>{
        return Math.floor( Math.random() * renderHaiku[len].length );
    }

    const slot = (len)=>{
        renderString[len] = renderHaiku[len][shuffle(len)];
        return renderString[len];
    }

    const random = (len)=>{
        drawHaiku(slot(len),len);
    }

    const random_1 = ()=>{
        vg.clearRect(1150,100,50,500);
        random(0);
    }
    
    const random_2 = ()=>{
        vg.clearRect(1000,150,50,500);
        random(1);
    }

    const random_3 = ()=>{
        vg.clearRect(850,200,50,500);
        random(2);
        drawTitle();
        draw();
    }

    const judgeSeason = (len)=>{
        let seasonflg = false;

        for(let l = 0;l < len;l ++){
            for(let i = 0;i < KIGO.spring.length;i ++){
                if(renderString[l].indexOf(KIGO.spring[i]) > -1){
                    seasonflg = true;
                }
            }
            for(let i = 0;i < KIGO.summer.length;i ++){
                if(renderString[l].indexOf(KIGO.summer[i]) > -1){
                    seasonflg = true;
                }
            }
            for(let i = 0;i < KIGO.autumn.length;i ++){
                if(renderString[l].indexOf(KIGO.autumn[i]) > -1){
                    seasonflg = true;
                }
            }
            for(let i = 0;i < KIGO.winter.length;i ++){
                if(renderString[l].indexOf(KIGO.winter[i]) > -1){
                    seasonflg = true;
                }
            }
            for(let i = 0;i < KIGO.newyear.length;i ++){
                if(renderString[l].indexOf(KIGO.newyear[i]) > -1){
                    seasonflg = true;
                }
            }
            for(let i = 0;i < KIGO.special.length;i ++){
                if(renderString[l].indexOf(KIGO.special[i]) > -1){
                    seasonflg = true;
                }
            }
        }

        if(seasonflg){

            console.log('a')
        
            for(let i = 0;i < KIGO.spring.length;i ++){
                for(let j = 0;j < renderHaiku[len].length;j ++){
                    if(renderHaiku[len][j].indexOf(KIGO.spring[i]) > -1){
                        renderHaiku[len].splice(j,1);
                    }
                }
            }
            for(let i = 0;i < KIGO.summer.length;i ++){
                for(let j = 0;j < renderHaiku[len].length;j ++){
                    if(renderHaiku[len][j].indexOf(KIGO.summer[i]) > -1){
                        renderHaiku[len].splice(j,1);
                    }
                }
            }
            for(let i = 0;i < KIGO.autumn.length;i ++){
                for(let j = 0;j < renderHaiku[len].length;j ++){
                    if(renderHaiku[len][j].indexOf(KIGO.autumn[i]) > -1){
                        renderHaiku[len].splice(j,1);
                    }
                }
            }
            for(let i = 0;i < KIGO.winter.length;i ++){
                for(let j = 0;j < renderHaiku[len].length;j ++){
                    if(renderHaiku[len][j].indexOf(KIGO.winter[i]) > -1){
                        renderHaiku[len].splice(j,1);
                    }
                }
            }
            for(let i = 0;i < KIGO.newyear.length;i ++){
                for(let j = 0;j < renderHaiku[len].length;j ++){
                    if(renderHaiku[len][j].indexOf(KIGO.newyear[i]) > -1){
                        renderHaiku[len].splice(j,1);
                    }
                }
            }
            for(let i = 0;i < KIGO.special.length;i ++){
                for(let j = 0;j < renderHaiku[len].length;j ++){
                    if(renderHaiku[len][j].indexOf(KIGO.special[i]) > -1){
                        renderHaiku[len].splice(j,1);
                    }
                }
            }
        }
    }

    const judge = ()=>{
        for(let i = 0;i < renderString.length; i ++){
            for(let j = 0;j < KIGO.spring.length; j ++){
                if(renderString[i].indexOf(KIGO.spring[j]) > -1){
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundImage = 'url("04.jpg")';
                }
            }

            for(let j = 0;j < KIGO.summer.length; j ++){
                if(renderString[i].indexOf(KIGO.summer[j]) > -1){
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundImage = 'url("gahag-0075813305.png")';
                }
            }

            for(let j = 0;j < KIGO.autumn.length; j ++){
                if(renderString[i].indexOf(KIGO.autumn[j]) > -1){
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundImage = 'url("gahag-0118779659.png")';
                }
            }

            for(let j = 0;j < KIGO.winter.length; j ++){
                if(renderString[i].indexOf(KIGO.winter[j]) > -1){
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundImage = 'url("gahag-0002973923.png")';
                }
            }

            for(let j = 0;j < KIGO.newyear.length; j ++){
                if(renderString[i].indexOf(KIGO.newyear[j]) > -1){
                    document.body.style.backgroundSize = 'cover';
                    document.body.style.backgroundImage = 'url("gahag-0027390675-2.png")';
                }
            }

            for(let j = 0;j < KIGO.special.length; j ++){
                if(renderString[i].indexOf(KIGO.special[j]) > -1){
                    document.body.style.backgroundSize = '100% 100%';
                    document.body.style.backgroundRepeat = 'no-repeat';
                    document.body.style.backgroundImage = 'url("0FFpsQXS_400x400.png")';
                }
            }
        }
    }

    const anime = ()=>{
        if(flag){
            let counter = 600;
            animeLoop = setInterval(()=>{
                vg.clearRect(200,200,450,300);
                if(counter <= 200){
                    vg.clearRect(200,200,450,300);
                    clearInterval(animeLoop);
                    render();
                    endFlag = true;
                }else{
                    vg.drawImage(img1,counter -=4,200,150 / 4,250);
                }
                draw();
            },10)       
        }
    }

    const randomString = ()=>{
        return Math.floor( Math.random() * RANDOM_STRING.length );
    }

    const render = ()=>{
        vg.font = FONT_D;
        vg.drawImage(img2,150,180,500,290);
        DESCRIPTION[1] = RANDOM_STRING[randomString()];
        for(let i = 0;i < DESCRIPTION.length;i ++){
            for(let j = 0;j < DESCRIPTION[i].length; j ++){
                vg.fillText(DESCRIPTION[i].charAt(j),555 - (i * 90),280 + (j * 15));
            }
        }
    }

    const start = ()=>{
        loop = setInterval(random_1,100);
        loop1 = setInterval(random_2,100);
        loop2 = setInterval(random_3,100);
    }

    init();
    draw();

    window.addEventListener('keydown',(e)=>{
        if(!flg && e.key == 'Enter'){
            flg = true;
            start();
        }
        if(flg && e.key == ' '){
            if(count == 0){
                clearInterval(loop);
                judgeSeason(1);
                count ++;
            }else if(count == 1){
                clearInterval(loop1);
                judgeSeason(2);
                count ++;
            }else if(count == 2){
                clearInterval(loop2);
                judge();
                anime();
                count ++;
            }
        }
        if(endFlag && e.key == 'Escape'){
            init();
        }
    })
}