window.onload = function(){
    
    const btnAdd = document.querySelector('.add');
    const btnMinus = document.querySelector('.minus');
    const count1 = document.querySelector('.count1');
    const total = document.querySelector('.total');


    function taotalNum(){
        const colorbg = '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
        total.textContent = count1.textContent;
        total.style.background = colorbg;
    }

    btnAdd.onclick = (e) => {
        if(count1.textContent < 10){
            count1.textContent++;
            taotalNum();
            return;
        }
        alert('取值范围在1到10之间');
    }

    btnMinus.onclick = (e) => {
        if(count1.textContent > 0){
            count1.textContent--;
            taotalNum();
            return;
        }
        alert('取值范围在1到10之间');
    }
}