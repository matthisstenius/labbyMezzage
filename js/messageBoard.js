MessageBoard = {

	messages: [],

	init : window.onload = function() {
		var mess = new Message("Meddelande", new Date());

		return mess;
	}
};

MessageBoard.messages.push(MessageBoard.init());
console.log( MessageBoard.messages[0].getText() + " " + MessageBoard.messages[0].getDate() );