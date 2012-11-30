window.onload = function() {
	var board1 = new MessageBoard("board1");
	var board2 = new MessageBoard("board2");

	board1.init();
	board2.init();
};

function MessageBoard(boardID) {
	var that = this;

	this.messages = [];

	this.init  = function() {
		var board = document.getElementById(boardID);

		var header = document.createElement("header");
		var h1 = document.createElement("h1");
		var messageBox = document.createElement("div");
		var spanMessageCount = document.createElement("span");
		var textarea = document.createElement("textarea");
		var run = document.createElement("input");

		// Sätt attribut
		header.setAttribute("class", "header");
		messageBox.setAttribute("class", "message-box");
		spanMessageCount.setAttribute("class", "message-count");
		run.setAttribute("class", "send");
		run.setAttribute("type", "submit");
		run.setAttribute("value", "Skicka");

		// Append
		board.appendChild(header);
		header.appendChild(h1);
		h1.innerHTML = "LabbyMezzage";
		board.appendChild(messageBox);
		board.appendChild(spanMessageCount);
		board.appendChild(textarea);
		board.appendChild(run);

		run.addEventListener("click", that.newMessage, false);

		// Lyssnar till enter
		textarea.onkeydown = function(e) {
			if (!e) { e = window.event; }
			if (e.keyCode === 13 && e.shiftKey === false) {
				that.newMessage();
				return false;
			}
		};
	};

	this.newMessage = function() {
		var text = document.querySelector("#" +boardID+ " textarea");

		var messObj = new Message(text.value, new Date());
		that.messages.push(messObj);
		that.renderMessages();

		// Rensar textrutan på text
		text.value = "";
	};

	this.renderMessages = function() {
		var messageArea = document.querySelector("#" +boardID+ " .message-box");
		// Tar bort alla meddelanden
		messageArea.innerHTML = "";

		// Sätter antal meddelanden
		var messageCounter = document.querySelector("#" +boardID+ " .message-count");

		messageCounter.innerHTML = "Antal meddelanden: " + this.messages.length;

		for (var i = 0; i < this.messages.length; i += 1) {
			renderMessage(i);
		}

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
				text.innerHTML = that.messages[messageID].getHTMLText();

				// Sätter tidstämpel formaterad till timmar, minuter och sekunder
				timeStamp.innerHTML = that.messages[messageID].getDateText();

				messageArea.appendChild(messageContainer);
				messageContainer.appendChild(text);
				messageContainer.appendChild(infoContainer);
				infoContainer.appendChild(timeButton);
				infoContainer.appendChild(deleteButton);
				messageContainer.appendChild(timeStamp);

				// Ta bort meddelande
				deleteButton.onclick = function() {
					if (window.confirm("Vill du verkligen radera meddelandet?")) {
						console.log(messageID);
						that.removeMessage(messageID);
						messageArea.innerHTML = "";
						that.renderMessages();
					}

					return false;
				};

				// Visa tid i alert
				timeButton.onclick = function() {
					that.alertTime(messageID);
					return false;
				};
		}

	};

	this.removeMessage = function(messageID) {
		this.messages.splice(messageID, 1);
	};

	this.alertTime = function(messageID) {
		alert(this.messages[messageID].getDateText(true));
	};
}
