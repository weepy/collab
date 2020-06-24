<script>
	let name = 'world';
	import io from 'socket.io-client'

	const socket = io({transports:["websocket"]})

	
//   let socket = {
// 		on(name, fn) {
// 			socket.fn = fn
// 		},
// 		emit(name, ...args) {
// 			socket.fn(...args)
// 		}
// 	}

	const id = (Math.random()*10000)|0

	socket.emit("join", id)


	let mycursor = {id, x:100, y:300}
		

	let cursors = []
	
	
	let last = Date.now()
	function sendCursor(x, y) {
		 
		if( Date.now() - last > 100) {

			socket.emit('cursor', x,y)//"cursor", 3, x+10 , y+10)	
			last = Date.now()
		}
			
	}
	
	
	socket.on("cursor", receiveCursor)
	
	function receiveCursor(_id, x, y) {
		if(id == _id)
			return
		
		cursors = cursors.filter(c => c.id != _id)
		if(x != null && y != null) {
			cursors = [...cursors, {id:_id, x, y}]
		}

	}
	
	function mousemove(e) {
		const x = e.pageX
		const y = e.pageY 
		mycursor = {id, x,y}
		
		sendCursor(x, y)
		
	}
	
	function color(id) {
		return `hsl(${id%360}, 70%, 50%)`;
	}
</script>

<h1>Hello {name}!</h1>

<div id="main" on:mousemove={mousemove}>

		<div class="cursor" style="left:{mycursor.x}px;top:{mycursor.y}px; background: {color(mycursor.id)}" />
	{#each cursors as cursor} 
		<div class="cursor remoteCursor" style="left:{cursor.x}px;top:{cursor.y}px; background: {color(cursor.id)}" />
	{/each}
</div>

<style>
	#main {
		background: white;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}
	
	.remoteCursor {
		transition: top 0.3s, left 0.3s;
	}
	.cursor {
		opacity: 0.3;
		width: 40px;
		height: 40px;
/* 		background: blue; */
		border-radius: 50%;
		position: absolute;
		border : 1px solid rgba(0,0,0,0.5);
		transform:translate(-20px,-20px);
	}
</style>