HOTDOG_PRICE = 3.25;
FRY_PRICE = 2.0;
DRINK_PRICE = 1.5;
TAX = .0625;
TAX_DISP = "6.25%";
MENU_SIZE = 3;


class Food {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}
}

class Order {
	constructor() {
		var i = 0;
		this.items = new Array();
		this.quants = new Array();
		this.subtotal = 0;
		this.disc = false;
	}

	add_item(food, quant) {
		if (this.items.includes(food)) {
			this.quants[this.items.indexOf(food)] += quant;
		}
		else {
			this.items.push(food);
			this.quants.push(quant);
			
		}
	}

	discount() {
		if (this.subtotal >= 20) {
			this.disc = true
			return "10% Discount Applied";
		}
		else {
			this.disc = false;
			return "No discount";
		}
	}

	sub_total() {
		var subtotal = 0, i = 0
		for (i = 0; i < this.items.length; i++) {
			subtotal += this.items[i].price * this.quants[i];
		}
		this.subtotal = subtotal;
		return subtotal;
	}

	calc_tot(subtotal, tax, disc) {
		var total;

		if (disc === true) {
			subtotal = subtotal * .9;
		}
			
		total = subtotal * (1 + tax);
		total = total.toFixed(2);
		
		return total;


	}

	reciept() {
		this.print_items();
		document.getElementById('F_subtot').innerHTML = "Subtotal: $" + this.sub_total();
		document.getElementById('F-discount').innerHTML = this.discount();
		document.getElementById('F_tax').innerHTML =  "Sales Tax: " + TAX_DISP;
		document.getElementById('F_tot').innerHTML = "Total: $" + this.calc_tot(this.subtotal, TAX, this.disc);


	}

	print_items() {
		var i = 0;
		document.getElementById('F_Items').innerHTML = "";
		for (i = 0; i < this.items.length; i++) {
			document.getElementById('F_Items').innerHTML += " <div class='info'>" 
										+ this.items[i].name + ": " 
										+ this.quants[i] + "</div>" 
		}
	}

}

hotdog = new Food("Hotdog(s)", HOTDOG_PRICE);
fry = new Food("Fry(s)", FRY_PRICE);
drink = new Food("Drink(s)", DRINK_PRICE);

menu = new Array(hotdog, fry, drink);

function init_menu() {
	for (i = 0; i < MENU_SIZE; i++){	

		document.getElementById('form').innerHTML += 
		"<div class='order'>" +
			"<div class='label'>" +
				menu[i].name + ": " + "($" + menu[i].price.toFixed(2) + ")" +	
			"</div>" + "<input type='text' class='quant' id='item" + (i + 1) + "'>" +
		"</div> </br>" 
	}
	document.getElementById('form').innerHTML += "<input type='Submit' id='Submit' value='Order' onClick='takeOrder()'>"
}


function takeOrder() {
	num_1 = document.getElementById('item1').value;
	num_2 = document.getElementById('item2').value;
	num_3 = document.getElementById('item3').value;


	console.log(num_1);
	console.log(num_2);
	console.log(num_3);

	order = new Order();
	order.add_item(menu[0], num_1);
	order.add_item(menu[1], num_2);
	order.add_item(menu[2], num_3);

	order.reciept();



}

init_menu();

/*function print_items(order) {
	for (i = 0; i < )

	document.getElementById('F_Items').innerHTML = this.items;
		document.getElementById('F_Quants').innerHTML = this.quants;
}*/