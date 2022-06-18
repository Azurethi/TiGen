let canv,c,w,h;

let colors = ['white','red','blue','green','black','orange','pink'];

window.addEventListener('load', ()=>{
    canv = document.getElementById('canv');
    c = canv.getContext('2d');
    clear();

    let sx=500;
    let sy=500;

    let data = [];
    for(let y=0; y<=sy; y++){
        data[y]=[];
        for(let x=0; x<=sx; x++){
            data[y][x] = 0;
        }
    }

    let types=[null];
    for(let i=1; i<colors.length-1; i++){
        types[i] = {
            growthProb: Math.random()
        }
    }

    for(let i=0; i<50; i++){
        let x = Math.floor(Math.random() * (sx+1));
        let y = Math.floor(Math.random() * (sy+1));
        let t = Math.floor(Math.random() * types.length);
        data[y][x]=t;
    }


    // data[10][50] = 1;
    // data[40][70] = 2;
    // data[10][70] = 3;
    // data[100][100] = 4; 

    drawArray(data);

    let stage=0;
    
    let intid=setInterval(()=>{
        let avail= grow(data);

        if(avail<0.5*sx*sy && stage==0){
            for(let x=0; x<=sx; x++){
                for(let y=0; y<=sy; y++){
                    if(data[y][x]==0){
                        if(Math.random()<0.01){
                            let t = Math.floor(Math.random() * types.length);
                            data[y][x]=t;
                        }
                    }
                }
            }
            stage=1;
        }

        if(avail<0.1*sx*sy && stage==1){
            for(let x=0; x<=sx; x++){
                for(let y=0; y<=sy; y++){
                    if(data[y][x]==0){
                        if(Math.random()<0.1){
                            let t = Math.floor(Math.random() * types.length);
                            data[y][x]=t;
                        }
                    }
                }
            }
            stage=2;
        }

        if(avail==0){
            clearInterval(intid);
            alert("no more growth possible");
        }
        drawArray(data);
    },20);


})

function grow(data){
    let sx=data[0].length;
    let sy=data.length; 

    let mods=[];
    let possgrowth=0;

    for(let x=0; x<sx; x++){
        for(let y=0; y<sy; y++){
            if(data[y][x]==0){possgrowth++}

            let tx=x+randOff();
            let ty=y+randOff();

            if(ty>=0 && tx>=0 && ty<sy && tx<sx){
                if(data[ty][tx]==0 && Math.random()<0.5){
                    mods.push({x:tx, y:ty, d:data[y][x]})
                }
            }


        }
    }

    for(let i=0; i<mods.length; i++){
        let m = mods[i];
        data[m.y][m.x]=m.d;

    }
    return possgrowth;
}

function randOff(){
    let v=Math.random();
    // 0 ---|---|--- 1
    return v<1/3?-1:(v>2/3?1:0)
}


function drawArray(data){
    // data[y][x]

    let sx=data[0].length;
    let sy=data.length;

    let rectX=w/sx;
    let rectY=h/sy;

    let scale=Math.min(rectX,rectY);

    for(let x=0; x<sx; x++){
        for(let y=0; y<sy; y++){
            c.fillStyle = colors[data[y][x]];
            c.fillRect(x*scale, y*scale, scale, scale);
        }
    }
}

function clear(){
    canv.width=(w=window.innerWidth);
    canv.height=(h=window.innerHeight-5);
}