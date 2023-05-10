const grid=document.querySelector('.Area');
let speed=15;
let dir=1;
localStorage.setItem('score',0);
document.querySelector('#score').innerHTML=`SCORE : 0`

for(let i=0;i<20;i++){
    for(let j=0;j<20;j++){
        const cell=document.createElement('div');
        cell.dataset.x=j;
        cell.dataset.y=i;
        cell.classList.add('cell');
        grid.appendChild(cell);

    }
}    
//varibles
let head={'x':2,'y':0};
let body={'x':1,'y':0};
let tail={'x':0,'y':0};
let segment=[head,body,tail];

let lastframetime=0;

// fps
function fps(ctime){
    if((head.x<0 || head.x>19)||(head.y<0 || head.y>19)){

       if(!alert(`GameOver YOUR SCORE IS ${localStorage.getItem('score')}`)){
        window.location.reload();
    }
    return;
}

    window.requestAnimationFrame(fps);
    
    if ((ctime-lastframetime)/1000 > 1/speed){
        lastframetime=ctime;
        main_logic();
    }
}



segment.forEach(s=>{
    let item=grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
    item.classList.add('snake');
}
)


var arr=[];

function main_logic(){
    if(arr.length==0){
        generateFood();
        //foodSeqDisplay();
        var foods=document.querySelectorAll('.food');
        for(let i=foods.length;i--;arr.unshift(foods[i]));
    }
    
    let it=grid.querySelector(`[data-x="${tail.x}"][data-y="${tail.y}"]`);
    it.classList.remove('snake');
    let a=head.x;
    let b=head.y;

    tail.x=body.x;tail.y=body.y
    body.x=a;body.y=b;
    switch(dir){
        case 1:
            head.x++;
            break;
        case -1:
            head.x--;
            break;
        case 2:
            head.y--;
            break;
        case -2:
            head.y++;
            break;
    }
    
    segment.forEach(s=>{
        let item=grid.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
        item.classList.add('snake');
    }
    )
    checkScore();   
}
fps()
updatingPosition();

function updatingPosition(){
    document.addEventListener("keydown", function(event) {
        if (event.key == "ArrowLeft" && dir!=1){
           dir=-1;
        } else if (event.key == "ArrowUp" && dir!=-2){
           dir=2;
        } else if (event.key == "ArrowRight" && dir!=-1){
           dir=1;
        } else if (event.key == "ArrowDown" && dir!=2){
           dir=-2;
        }
})
}


// For Food
function generateFood(){
const colour=['red','black','blue','green']
for(let i = 0; i < 4; i++){
    let x1 = Math.floor(Math.random() * 20);
    let y1 = Math.floor(2+Math.random() * 17);
    let food = grid.querySelector(`[data-x="${x1}"][data-y="${y1}"]`);
    food.style.backgroundColor = colour[i];
    food.classList.add('food');    
    
}
}


//Food Sequence Display

function foodSeqDisplay(){

let foods=document.querySelectorAll('.food')
for(let i=0;i<4;i++){
    let food=document.createElement('div');
    food.dataset.color=foods[i].style.backgroundColor;
    food.classList.add('foodblock');
    food.style.backgroundColor=foods[i].style.backgroundColor;
    document.querySelector('.foodBlocks').appendChild(food);
}
}

//creating a list from node list foods

;

//Score Update
function checkScore(){

arr.forEach(s=>{
    if(s.dataset.x==head.x && s.dataset.y==head.y){
        s.classList.remove('food');
        s.removeAttribute('style');
        let index=arr.indexOf(s);
        if(index>-1){
            arr.splice(index,1);
        }
        let sc=localStorage.getItem('score');
        sc++;
        document.querySelector('#score').innerHTML=`SCORE : ${sc}`;
        localStorage.setItem('score',sc);      
    }
})
}








