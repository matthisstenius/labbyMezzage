window.onload = function() {
	var newMessageBoard = document.querySelector(".newMessageBoard");
	var counterMessageBoard = 0;

	newMessageBoard.onclick = function() {
		var wrapper = document.querySelector(".wrapper");
		var newBoard = document.createElement("div");
		newBoard.setAttribute("id", "board" +counterMessageBoard);
		wrapper.appendChild(newBoard);

		var board = new MessageBoard("board" +counterMessageBoard);
		board.init();

		counterMessageBoard += 1;
		console.log(counterMessageBoard);
		return false;
	};
};

function MessageBoard(boardID) {
	var that = this;

	this.messages = [];

	this.init  = function() {
		var wrapper = document.querySelector(".wrapper");

		var board = document.getElementById(boardID);
		var closeBoard = document.createElement("a");
		var header = document.createElement("header");
		var h1 = document.createElement("h1");
		var messageBox = document.createElement("div");
		var spanMessageCount = document.createElement("span");
		var textarea = document.createElement("textarea");
		var run = document.createElement("input");
		var changeButton = document.createElement("input");


		// Sätt attribut
		closeBoard.setAttribute("href", "#");
		closeBoard.setAttribute("class", "closeBoard");
		closeBoard.textContent = "Stäng";

		header.setAttribute("class", "header");
		messageBox.setAttribute("class", "message-box");
		spanMessageCount.setAttribute("class", "message-count");
		textarea.setAttribute("autofocus", "autofocus");
		run.setAttribute("class", "button send");
		run.setAttribute("type", "submit");
		run.setAttribute("value", "Skicka");
		changeButton.setAttribute("type", "submit");
		changeButton.setAttribute("value", "Change");
		changeButton.setAttribute("class", "button change");

		// Append
		header.appendChild(closeBoard);
		board.appendChild(header);
		header.appendChild(h1);
		h1.textContent = "LabbyMezzage";
		board.appendChild(messageBox);
		board.appendChild(spanMessageCount);
		board.appendChild(textarea);
		board.appendChild(run);
		board.appendChild(changeButton);

		run.addEventListener("click", that.newMessage, false);

		// Stäng messageBoard
		closeBoard.onclick = function() {
			wrapper.removeChild(board);
			return false;
		};

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
				var makeChange = document.createElement("a");

				infoContainer.setAttribute("class", "info");
				deleteButton.setAttribute("href", "#");
				deleteButton.setAttribute("class", "delete");
				timeButton.setAttribute("href", "#");
				timeButton.setAttribute("class", "time");
				messageContainer.setAttribute("class", "message");
				timeStamp.setAttribute("class", "time-stamp");
				makeChange.setAttribute("href", "#");
				makeChange.setAttribute("class", "changeMessage");
				makeChange.innerHTML = "(Edit message)";

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
				messageContainer.appendChild(makeChange);

				// Ta bort meddelande
				deleteButton.onclick = function() {
					var textbox = document.querySelector("#" +boardID+ " textarea");
					if (window.confirm("Vill du verkligen radera meddelandet?")) {
						that.removeMessage(messageID);
						messageArea.innerHTML = "";
						that.renderMessages();
						textbox.focus();
					}

					return false;
				};

				// Visa tid i alert
				timeButton.onclick = function() {
					that.alertTime(messageID);
					return false;
				};

				// Redigera meddelande
				makeChange.onclick = function() {
					that.editMessage(messageID);
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

	this.editMessage = function(messageID) {
		var changeButton = document.querySelector("#" +boardID+ " .change");
		var textbox = document.querySelector("#" +boardID+ " textarea");
		textbox.value = this.messages[messageID].getHTMLText();
		textbox.select();

		changeButton.onclick = function() {
			that.messages[messageID].setText(textbox.value);
			textbox.value = "";
			that.renderMessages();
			return false;
		};
	};
}
