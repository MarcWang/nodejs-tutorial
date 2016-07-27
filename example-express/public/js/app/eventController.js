let _instanceEventController = null;

function EventController() {
	if (_instanceEventController == null) {
		_instanceEventController = new EventHandler();
		console.log("EventController was null");
	}
	return _instanceEventController;
};


function EventHandler() {
	function _genMsgBox(data) {
		let item = document.createElement('li');
		item.className = 'message-preview';

		let itemA = document.createElement('a');
		itemA.href = data.directPage;

		let itemDiv = document.createElement('div');
		itemDiv.className = 'media';

		let itemSpan = document.createElement('span');
		itemSpan.className = 'pull-left';

		let img = document.createElement('img');
		img.className = 'media-object';
		img.src = 'http://placehold.it/50x50';

		itemSpan.appendChild(img);

		let itemSubDiv = document.createElement('div');
		itemSubDiv.className = 'media-body';

		let hTitle = document.createElement("H5");
		hTitle.className = 'media-heading';
		let s = document.createElement("STRONG");
		s.appendChild(document.createTextNode(data.message));
		hTitle.appendChild(s);

		let pTime = document.createElement("P");
		pTime.className = 'small text-muted';
		let iClock = document.createElement('i');
		iClock.className = 'fa fa-clock-o';
		pTime.appendChild(iClock);
		pTime.appendChild(document.createTextNode('2016/05/13'));

		let pDescription = document.createElement("P");
		pDescription.appendChild(document.createTextNode('...'));


		itemSubDiv.appendChild(hTitle);
		itemSubDiv.appendChild(pTime);
		itemSubDiv.appendChild(pDescription);
		itemDiv.appendChild(itemSpan);
		itemDiv.appendChild(itemSubDiv);
		itemA.appendChild(itemDiv);
		item.appendChild(itemA);

		return item;
	}

	function _genEndNotify(msg, directLink) {
		let item = document.createElement('li');
		item.className = 'message-footer';

		let itemA = document.createElement('a');
		itemA.href = directLink;

		itemA.appendChild(document.createTextNode(msg));
		item.appendChild(itemA);
		return item;
	}

	function _genAlertBox(data) {

		let level = data.level;
		let alertName = data.alertName;
		let labelName = data.labelName;

		let item = document.createElement('li');

		let itemA = document.createElement('a');
		itemA.href = data.directPage;

		itemA.appendChild(document.createTextNode(alertName));

		let itemSpan = document.createElement('span');

		const primary = 'label label-primary';
		const success = 'label label-success';
		const info = 'label label-info';
		const warning = 'label label-warning';
		const danger = 'label label-danger';

		if (level == 0) {
			itemSpan.className = primary;
		} else if (level == 1) {
			itemSpan.className = success;
		} else if (level == 2) {
			itemSpan.className = info;
		} else if (level == 3) {
			itemSpan.className = warning;
		} else if (level == 4) {
			itemSpan.className = danger;
		}

		itemSpan.appendChild(document.createTextNode(labelName));

		itemA.appendChild(itemSpan);
		item.appendChild(itemA);

		return item;
	}


	this.genNotifyMessages = function(eleName, arrData) {
		for (let idx in arrData) {
			document.getElementById(eleName).appendChild(_genMsgBox(arrData[idx]));
		}
		document.getElementById(eleName).appendChild(_genEndNotify('Read All', '#'));
	};

	this.genAlertMessages = function(eleName, arrData) {
		for (let idx in arrData) {
			document.getElementById(eleName).appendChild(_genAlertBox(arrData[idx]));
		}
	}
}
