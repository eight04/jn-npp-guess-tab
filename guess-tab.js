(function(){
	require("lib/Scintilla.js");
	
	var sci = {};
	
	function setUseTabs(view, useTab) {
		var handle = view.handle;
		if (!sci[handle]) {
			sci[handle] = new Scintilla(handle);
		}
		sci[handle].Call("SCI_SETUSETABS", useTab, 0);
	}

	function guessTab(view) {
		var line = view.line, text, limit = line - 30;
		
		if (limit < 0) {
			limit = 0;
		}
		
		do {
			text = view.lines.get(line).text;
			if (text[0] == " ") {
				setUseTabs(view, false);
				break;
			} else if (text[0] == "\t") {
				setUseTabs(view, true);
				break;
			}
			line--;
		} while (line >= limit);
	}

	GlobalListener.addListener({
		UPDATEUI: guessTab
	});
	
	guessTab(Editor.currentView, Editor.currentView.line);
})();
