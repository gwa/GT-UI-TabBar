describe("A tab bar", function() {

	it("creates its own jQuery object when none is passed to the constructor", function() {
		var mybar = new GT.UI.TabBar();

		expect(mybar).toBeDefined();
		expect(mybar.jq() instanceof jQuery).toBeTruthy();
		expect(mybar.getHTML()).toEqual('<ul class="gt-ui-tabbar"></ul>');
	});

	it("can be passed an existing DOM node wrapped in a jQuery object", function() {
		var mynode = $('<ul class="gt-ui-tabbar"></ul>');
		var mybar = new GT.UI.TabBar(mynode);

		expect(mybar.getHTML()).toEqual('<ul class="gt-ui-tabbar"></ul>');
	});

	it("can contain a tab LI", function() {
		var mynode = $('<ul class="gt-ui-tabbar"><li data-id="foo">Foo</li></ul>');
		var mybar = new GT.UI.TabBar(mynode);
		var tabs = mybar.getTabs();

		expect(tabs.length).toEqual(1);
	});

});
