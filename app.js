// Variables
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
// Date sous le titre
const giveaway = document.querySelector('.giveaway');
// Container des cases
const deadline = document.querySelector('.deadline');
// h4 des cases de deadline
const items = deadline.querySelectorAll('h4');

// Giveaway end date
// year, month (0 index, april = 3), day, hour ...
/* La futureDate est définie à chaque chargement de la page, sur une base
de 10 jours à partir de maintenant ! */
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
// jour de la semaine
const day = weekdays[futureDate.getDay()];
// quel jour => ici le 24
const date = futureDate.getDate();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
// Maj du texte du giveaway
giveaway.textContent = `Giveaway ends on ${ day }, ${ date } ${ month } ${ year } ${ hours }:${ minutes }am`;

// Compte à rebours
const futureTime = futureDate.getTime();
// console.log(futureTime); // 1650868200000 in ms
const getRemainingTime = () => {
	const today = new Date().getTime();
	// console.log(today); // 1647255338780
	/* Naturellement la date future est plus grande ,-) */
	const t = futureTime - today;
	// 1s = 1000ms
	// 1min = 60s
	// 1hour = 60mins
	// 1 day = 24hours
	// Values in ms
	const oneDay = 24 * 60 * 60 * 1000;
	const oneHour = 60 * 60 * 1000;
	const oneMinute = 60 * 1000;
	// Remaining
	let days = Math.floor(t / oneDay);
	/* % pour obtenir le reste de la division, nous divisons ici 
	le temps restant par un jour, le modulo corresponds au heures 
	restantes en ms, nous devons donc encore diviser par oneHour */
	let hours = Math.floor((t % oneDay) / oneHour);
	/* Même logique pour les minutes et secondes */
	let minutes = Math.floor((t % oneHour) / oneMinute);
	let seconds = Math.floor((t % oneMinute) / 1000);
	// Set values array
	const values = [days, hours, minutes, seconds];
	// Formater l'heure avec un 0 devant
	const format = (item) => {
		if (item < 10){
			return item = `0${ item }`
		};
		return item;
	};
	// Set items (h4) text
	items.forEach((item, index) => {
		item.innerHTML = format(values[index]);
	});
	// End of countdown
	if (t <= 0){
		clearInterval(countdown);
		deadline.innerHTML = `<h4 class="exipred">Sorry, this giveaway has expired</h4>`;
	}
};
// Timer
let countdown = setInterval(getRemainingTime,1000);

// Init, malgré l'interval, car il faut tester si le temps est terminé 
// avant la 1ère seconde d'intervalle ,-)
getRemainingTime();