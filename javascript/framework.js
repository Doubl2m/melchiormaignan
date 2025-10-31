star={
	rand(min, max){
		return Math.floor(Math.random()*(max - min + 1)+min);
	},
	grid(row, col, ySize, xSize){
		let arr=[];
		for(let i=0; i<ySize; i++){
			arr.push([
				row
			]);
		}
		for(let y=0; y<ySize; y++){
			for(let x=0; x<xSize; x++){
				arr[y][x]=col;
			}
		}
		return arr;
	},
	clearArr(row, ySize){
		let arr=[];
		for(let i=0; i<ySize; i++){
			arr.push([
				row
			]);
		}
		return arr;
	},
	pushArr(arr, col, ySize, xSize){
		for(let y=0; y<ySize; y++){
			for(let x=0; x<xSize; x++){
				arr[y][x]=col;
			}
		}
		return arr;
	},
	randIn(arr){
		return arr[Math.floor(Math.random()*arr.length)];
	},
	log(elem){
		return console.log(elem);
	}
};

subStar={
	clear(elem){
		this.elem=document.getElementById(elem).innerHTML='';
	},
	write(elem, add){
		this.elem=document.getElementById(elem).innerHTML=add;
	},
	click(elem, add){
		this.elem=document.getElementById(elem).onclick=add;
	},
	switch(elem, change){
		this.elem=document.getElementById(elem).innerHTML=document.getElementById(change).innerHTML;
	},
	isVisible(elem, bool){
		let turn;
		bool?turn='visible':turn='hidden';
		this.elem=document.getElementById(elem).style.visibility=turn;
	},
}
window._=star;
window.$=subStar;