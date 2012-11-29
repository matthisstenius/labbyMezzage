MessageBoard = {

	messages: [],

	init : window.onload = function() {
		var textBox = document.querySelector(".wrapper textarea");
		var run = document.getElementById("send");

		run.addEventListener("click", newMessage, false);

		// Lyssnar till enter
		textBox.onkeydown = function(e) {
			if (!e) { e = window.event; }
			if (e.keyCode === 13 && e.shiftKey === false) {
				newMessage();
				return false;
			}
		};

		function newMessage() {
			var text = document.querySelector(".wrapper textarea");

			var messObj = new Message(text.value, new Date());

			MessageBoard.messages.push(messObj);
			MessageBoard.renderMessages();

			// Rensar textrutan på text
			text.value = "";
		}
	},

	renderMessages : function() {
		// Tar bort alla meddelanden
		var messageArea = document.querySelector(".message-box");
		messageArea.innerHTML = "";

		// Sätter antal meddelanden
		var messageCounter = document.querySelector(".message-count");
		messageCounter.innerHTML = "Antal meddelanden: " + MessageBoard.messages.length;

		for (var i = 0; i < MessageBoard.messages.length; i += 1) {
			renderMessage(i);
		}

		// Skriv ut ett meddelande
		function renderMessage(messageID) {



			var text = document.createElement("p");
			var messageContainer = document.createElement("article");
			var infoContainer = document.createElement("div");
			var deleteButton = document.createElement("a");
			var timeButton = document.createElement("a");
			var timeStamp = document.createElement("span");

			infoContainer.setAttribute("class", "info");
			deleteButton.setAttribute("href", "#");
			deleteButton.setAttribute("class", "delete");
			timeButton.setAttribute("href", "#");
			timeButton.setAttribute("class", "time");
			messageContainer.setAttribute("class", "message");
			timeStamp.setAttribute("class", "time-stamp");

			// Lägger till meddelandet
			text.innerHTML = MessageBoard.messages[messageID].getHTMLText();

			// Sätter tidstämpel formaterad till timmar, minuter och sekunder
			timeStamp.innerHTML = MessageBoard.messages[messageID].getDateText();

			messageArea.appendChild(messageContainer);
			messageContainer.appendChild(text);
			messageContainer.appendChild(infoContainer);
			infoContainer.appendChild(timeButton);
			infoContainer.appendChild(deleteButton);
			messageContainer.appendChild(timeStamp);

			// Ta bort meddelande
			deleteButton.onclick = function() {

				if (window.confirm("Vill du verkligen radera meddelandet?")) {
					MessageBoard.removeMessage(messageID);
					messageArea.innerHTML = "";
					MessageBoard.renderMessages();
				}

				return false;
			};

			// Visa tid i alert
			timeButton.onclick = function() {
				MessageBoard.alertTime(messageID);
				return false;
			};
		}
	},

	removeMessage : function(messageID) {
		MessageBoard.messages.splice(messageID, 1);
	},

	alertTime : function(messageID) {
		alert(MessageBoard.messages[messageID].getDateText(true));
	}
};