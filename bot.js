const Discord = require('discord.js');
const config = require('./config');
const questions = require('./questions');


const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('le bot est lancé');
});

let to = null;

// Si le quiz est demarré 
var quizzIsOn = false ;
function etatQuizz(e) { quizzIsOn = e; }
// Numero de la question
var nb = 0;

var commands = {
	quizz : "!quizz",
	next : "!next",
	ping : "!ping",
	quizznb : "!quizz nb",
	stop : "!stop",
};

bot.on('message', message => { // function(message) {

	function msg(texte) { message.channel.sendMessage(texte); }

	function sendQuestion() {
		//nbQ = nb +1 ;
		msg(`Question n°${nb +1} : ${questions[nb].q}`);
		if (!to) {
		to = setTimeout(function () { 
		to = null; 
		msg(`Temps écoulé ! la reponse etait ${questions[nb].answer} `); 
		if ( nb < questions.length ) { nb++ } }, config.timeQ);
			} 
	}
	function Answer() {
		if (to) {
			clearTimeout(to);
			to = null;
			msg(`Tu a gagné ${message.author} !`);
			if ( nb < questions.length ) { nb++ }
			}
	}

	if (message.content === commands.quizznb ) { 
		// Nombre de questions
		var i = 0
		for (var i = 0; i < questions.length; i++) { }
		msg(`il y a ${i} questions dans le quizz`); 
	}

	if (message.content === commands.ping && message.author.id === config.adminID ) {
		msg("pong");
	}

	if (message.content === commands.quizz ) {
		if (!quizzIsOn) { 
			etatQuizz(true);
			msg("Lancement du Quizz !");
			setTimeout(sendQuestion, 2000); 
		}
		else { msg("Le quizz est deja lancé !"); }
	}

	if (message.content === commands.next) {
		sendQuestion();
	}

	if (message.content.toLowerCase() === questions[nb].answer.toLowerCase() ) {
		Answer();
	}

	if (message.content === commands.stop) {
		if (quizzIsOn) {
			etatQuizz(false);
			msg("Fin du quizz !");
		}
		else {
			msg("Aucun quizz en cours.");
		}
	}

});

bot.login(config.botToken);
