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
		expect(tabs[0].getId()).toEqual('foo');
	});

	it("automatically activates the first tab", function() {
		var mynode = $('<ul class="gt-ui-tabbar"><li data-id="foo">Foo</li><li data-id="bar">Bar</li></ul>');
		var mybar = new GT.UI.TabBar(mynode);
		var tabs = mybar.getTabs();

		expect(tabs.length).toEqual(2);
		expect(tabs[0].isActive()).toBeTruthy();
		expect(tabs[1].isActive()).toBeFalsy();
	});

	it("activates a tab when it is clicked", function() {
		var mynode = $('<ul class="gt-ui-tabbar"><li data-id="foo">Foo</li><li data-id="bar">Bar</li></ul>');
		var mybar = new GT.UI.TabBar(mynode);
		var tabs = mybar.getTabs();

		expect(tabs[0].isActive()).toBeTruthy();
		expect(tabs[1].isActive()).toBeFalsy();

		tabs[1].jq().trigger('click');

		expect(tabs[0].isActive()).toBeFalsy();
		expect(tabs[1].isActive()).toBeTruthy();
	});

	it("dispatches an ACTIVATE_TAB event with the tab ID when a tab is activated", function() {
		var mynode = $('<ul class="gt-ui-tabbar"><li data-id="foo">Foo</li><li data-id="bar">Bar</li></ul>');
		var mybar = new GT.UI.TabBar(mynode);
		var tabs = mybar.getTabs();

		expect(tabs[0].isActive()).toBeTruthy();
		expect(tabs[1].isActive()).toBeFalsy();

		var myid;
		var f = function( idtab ) {
			myid = idtab;
		};
		mybar.on('ACTIVATE_TAB', f);

		mybar.activateTab('bar');
		expect(myid).toEqual('bar');
	});

	it("can have tabs added to it", function() {
		var mybar = new GT.UI.TabBar();
		mybar.addTab('newtab', 'New Tab');
		expect(mybar.getTabs().length).toEqual(1);
		mybar.addTab('newtab2', 'New Tab 2');
		expect(mybar.getTabs().length).toEqual(2);
	});

});
