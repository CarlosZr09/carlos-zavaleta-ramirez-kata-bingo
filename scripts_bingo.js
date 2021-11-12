const min = 1;
const max = 75;
let ingame = 0;
let arr_numbers = [];
let confirm, letra;

function get_numbers_random() {
	let numbercard = [
		[], // B (1-15)
		[], // I (16-30)
		[], // N (31-45)
		[], // G (46-60)
		[]  // O (51-75)
	];

	for (let i = 0; i < numbercard.length; i++) {
		let min_number = (i * 15) + 1;
		let max_number = min_number + 15;
		while (numbercard[i].length < 5) {
			let num = Math.floor(Math.random() * (max_number - min_number)) + min_number;
			// Evitar que se repitan números
			if (!numbercard[i].includes(num)) {
				numbercard[i].push(num);
			}
		}
		numbercard[i].sort((a, b) => a - b);
	}
	numbercard[2][2] = 'FREE';
	return numbercard;
}

function generatingBingoCards() {
	ingame = 1;
	arr_numbers = [];
	let html = '';
	numbers = get_numbers_random();

	for (let i = 0; i < 5; i++) {
		html += `
      <tr>
        <td>${numbers[0][i]}</td>
        <td>${numbers[1][i]}</td>
        <td>${numbers[2][i]}</td>
        <td>${numbers[3][i]}</td>
        <td>${numbers[4][i]}</td>
      </tr>`;
	}
	document.querySelector('#carton').innerHTML = html;
}

function checkingBingoCards() {
	if (arr_numbers.length >= 24) {
		winner = true;
		not_called = [];
		boxes = document.querySelectorAll('#carton td');
		boxes.forEach(function (value) {
			valuetd = parseInt(value.textContent.trim());
			if (arr_numbers.includes(valuetd) === false) {
				not_called.push(valuetd);
			}
		})

		if (not_called.length > 0) {
			console.log(`The numbers ${not_called.toString()}} were not called`);
		} else {
			console.log(`YOU ARE THE WINNER`);
		}
	} else {
		console.log(`We have called ${arr_numbers.length} numbers, to shout bingo we must call at least 24 numbers`);
	}
}

function callingBingoNumbers() {
	if (ingame == 1) {
		do {
			newNumber = Math.round(Math.random() * (min - max) + max);
			if (newNumber >= 1 && newNumber <= 15) letter = "B";
			if (newNumber >= 16 && newNumber <= 30) letter = "I";
			if (newNumber >= 31 && newNumber <= 45) letter = "N";
			if (newNumber >= 46 && newNumber <= 60) letter = "G";
			if (newNumber >= 61 && newNumber <= 75) letter = "O";

			if (arr_numbers.length < 75) {
				if (arr_numbers.includes(newNumber) == false) {
					arr_numbers.push(newNumber);
					confirm = prompt("wants to call another ball? Y/N");
					console.log(`${letter} - ${newNumber}`);
				}
			} else {
				console.log("all the numbers were called");
				break;
			}


		} while (confirm == "y" || confirm == "Y")
	} else {
		console.log("You must generate your bingo card first");
	}

}