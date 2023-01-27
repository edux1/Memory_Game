$(function() {
	init(12);
});

	let card_selected;
	let id_selected;
	let wait = false;
	let moves;
	let seconds;
	let minutes;
	let chrono_start;
	let chrono;

	function random(limit) {
		return Math.floor(Math.random() * limit);
	}

	function comprove_win() {
		count = $(".fixed").length
		size = $("img").length;
		if(count == size) {
			clearInterval(chrono);
			console.log("creating p :)");
			para = document.createElement("p");
			para.id = "para";
			body.appendChild(para);
			$("p#para").text("You win!");
			$("#para").css("font-size", "50px");
		}
	}

	//Aquest métode es més aleatori que l'altre métode d'una línea proposat, s'ha fet algunes proves i he arribat a aquesta conclusió.
	function initial_card(n) {
		cards = new Array(n).fill(-1);
		i = 0;
		while(i<n) {
			num = random(n);
			if(cards[num] == "-1") {
				cards[num] = i % (n/2) + 1;
				i++;
			}
		}
		return cards;
	}

	function chronometer () {
		seconds++;
		if(seconds < 10) seconds = "0" + seconds;
		else if(seconds > 59) {
			seconds = "00";
			minutes++;
		}
		$("#time").text(`${minutes}:${seconds}`);
	}

	function init_time() {
		seconds = "00";
		minutes = 0;
		$("#time").text(`${minutes}:${seconds}`);
	}

	function init(n) {
		list = initial_card(n);
		chrono_start = false;
		card_selected = false;
		clearInterval(chrono);
		init_time();
		print_moves(moves = 0);
		if($("#t1").length) 
			$("#t1").remove()
			
		if($("#para").length)
			$("#para").remove();

		// Create table
		let table = document.createElement('table');
		table.id = "t1";
		$("#body").append(table);

		// Creating rows
		for(i=0; i<n/4; i++) {;
			let row = document.createElement('tr');
			for(j=i*4; j<(i+1)*4;j++) {
				let data = document.createElement('td');
				data.id = "td"+j;

				let img = document.createElement('img');
				img.id = "img"+(j+1);
				img.className = "hidden";
				img.alt = "";
				img.setAttribute("onclick", "showcard(this)")
				data.appendChild(img);
				row.appendChild(data);
			}
			row.id = "tr"+(i);
			table.appendChild(row);

		}

		for(i=1; i<=n; i++) {
			image = "img"+i;
			$("#"+image).attr("src", "svg/"+list[i-1]+".svg");
		}
		
	}

	function showcard(id) {
		// Si wait es true, toca esperar hasta que acabe el timeout :)
		if(!wait && id.className !== "fixed" && id !== id_selected) {
			if(!chrono_start) {
				chrono_start = true;
				chrono = setInterval(chronometer,1000);
			}
			id.classList.replace("hidden", "image");
			if(!card_selected) {
				id_selected = id;
			}
			else {
				moves++;
				print_moves(moves);
				if(same_cards(id_selected, id)) {
					id.classList.replace("image", "fixed");
					id_selected.classList.replace("image", "fixed");
					comprove_win();
				}
				else {
					// Bloqueamos cualquier otra jugada hasta que acaben de mostrarse las cartas(hasta que acabe el timeout).
					wait = true;
					setTimeout( () => {
						hide_card(id);
						hide_card(id_selected);
						id_selected="";
						// Al poner wait a false, se puede volver a seleccionar una carta.
						wait = false;
					}, 500);
				}
			}
			card_selected = !card_selected;
		}
	}

	function hide_card(id) {
		id.classList.replace("image", "hidden");
	}

	function same_cards(id1, id2) {
		return id1["src"] === id2["src"];
	}

	function print_moves(moves) {
		$("#moves").text(moves)
	}