window.onload=function(){

	var requestAnimFrame = (function(){
		return window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback){
				window.setTimeout(callback, 1000 / 20);
			};
	})();

	

class App {
	constructor(grid,cPanel){
		this.grid=grid;
		this.cPanel=cPanel;


	}

	createCanvas(width=100,height=100,container="conatiner",id="canvas") {
		let div=document.getElementById(container);
		let cnvs = document.createElement('canvas');
		cnvs.id = id;
		var scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		  );
		
		if(!div){
			div=document.createElement(`div`);
			div.id=container;
			document.body.appendChild(div);
		}
		cnvs.width=document.documentElement.clientWidth*width/100;
		cnvs.height=scrollHeight*height/100;
		if(document.getElementById(id)){
			console.error("id already used");
		}
		
		
		
		div.appendChild(cnvs);
		var canvas 	= document.getElementById( id ); 
		var context = canvas.getContext( '2d' );
	}

	// recreateHtml(){
	// 	let conatiner=document.getElementById('container');
	// 	if(!conatiner){
	// 		conatiner = document.createElement('div');
	// 		let topMenu = document.createElement('canvas');
	// 		let pads = document.createElement('canvas');
	// 		let bottomMenu = document.createElement('canvas');
	// 		let menu = document.createElement('div');
	// 		let padsMenu = document.createElement('div');
	// 		padsMenu.id = 'padsMenu';
	// 		menu.id = 'menu';
	// 		conatiner.id = 'container';
	// 		topMenu.id = 'topMenu';
	// 		pads.id = 'pads';
	// 		bottomMenu.id = 'bottomMenu';
	// 		document.body.appendChild(conatiner);

	// 		if(window.innerWidth<500||window.innerWidth>700&&window.innerWidth<800){	
								
	// 			conatiner.appendChild(topMenu);
	// 			conatiner.appendChild(pads);
	// 			conatiner.appendChild(bottomMenu);
	// 		} else {
	// 			conatiner.appendChild(padsMenu);
	// 			conatiner.appendChild(menu);
	// 			padsMenu.appendChild(pads);
	// 			menu.appendChild(topMenu);
	// 			menu.appendChild(bottomMenu);
	// 		}
	// 	}
		

	// }

	

	scaleCanvas(id,width,height,color){
		id=document.getElementById(id);
		id.width=window.innerWidth*width/100;
		id.height=window.innerHeight*height/100;
		id.style.backgroundColor=color;
	}

	
	
}

class Grid {
	constructor(rows,columns){
		this.rows=rows;
		this.columns=columns;
	}
}

class ControlPlanel {
	constructor(){
		
	}
}

	let grid=new Grid(4,5);
	let cPanel=new ControlPlanel();
	let app=new App(grid,cPanel);
	
	app.createCanvas(100,100,"container","main");
	// function enterLooper() { 
	// 	app.recreateHtml();
	// 	requestAnimFrame(enterLooper);
	//   }
	// enterLooper();
}	