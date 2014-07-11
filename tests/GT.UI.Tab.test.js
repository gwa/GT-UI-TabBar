describe("A tab", function() {

	it("can be constructed", function() {
		var mytab = new GT.UI.Tab($('<li data-id="foo">foo</li>'));
		expect(mytab).toBeDefined();
	});

	it("has a jQuery object", function() {
		var mytab = new GT.UI.Tab($('<li data-id="foo">foo</li>'));
		expect(mytab.jq()).toBeDefined();
		expect(mytab.jq() instanceof jQuery).toBeTruthy();
	});

	it("wraps its text in a SPAN", function() {
		var mytab = new GT.UI.Tab($('<li data-id="foo">foo</li>'));
		expect(mytab.jq().html()).toEqual('<span>foo</span>');
	});

	it("throws an error if data-id is not set, or is empty", function() {
		var f = function() {
			return new GT.UI.Tab($('<li>foo</li>'));
		};
		expect(f).toThrow('data-id not set');

		var f = function() {
			return new GT.UI.Tab($('<li data-id="">foo</li>'));
		};
		expect(f).toThrow('data-id not set');
	});

	it("has an id", function() {
		var mytab = new GT.UI.Tab($('<li data-id="foo">foo</li>'));
		expect(mytab.getId()).toEqual('foo');
	});

	it("can be activated and deactivated", function() {
		var mytab = new GT.UI.Tab($('<li data-id="foo">foo</li>'));
		expect(mytab.jq().hasClass('active')).toBeFalsy();
		mytab.activate();
		expect(mytab.jq().hasClass('active')).toBeTruthy();
		mytab.deactivate();
		expect(mytab.jq().hasClass('active')).toBeFalsy();
	});

	it("dispatches ACTIVATE and DEACTIVATE events passing the tab object when it is activated and deactivated", function() {
		var mytab = new GT.UI.Tab($('<li data-id="foo">foo</li>'));
		var isactive = false;

		var onactive = function( tab ) {
			isactive = true;
		};
		var oninactive = function( tab ) {
			isactive = false;
		};
		mytab.on('ACTIVATE', onactive);
		mytab.on('DEACTIVATE', oninactive);

		expect(isactive).toBeFalsy();
		expect(mytab.isActive()).toBeFalsy();

		mytab.activate();

		expect(mytab.isActive()).toBeTruthy();
		expect(isactive).toBeTruthy();

		mytab.deactivate();

		expect(isactive).toBeFalsy();
		expect(mytab.isActive()).toBeFalsy();
	});

	it("dispatches an event when clicked", function() {
		var mytab = new GT.UI.Tab($('<li data-id="foo">foo</li>'));
		var myid;
		var f = function( tab ) {
			myid = tab.getId();
		};
		mytab.on('CLICK', f);
		mytab.jq().trigger('click');
		expect(mytab.getId()).toEqual('foo');
		expect(myid).toEqual('foo');
	});

	it("only dispatches an event when clicked and inactive", function() {
		var mytab = new GT.UI.Tab($('<li data-id="foo">foo</li>'));
		var myid = 'bar';
		var f = function( tab ) {
			myid = tab.getId();
		};
		mytab.on('CLICK', f);
		mytab.activate();
		mytab.jq().trigger('click');
		expect(mytab.getId()).toEqual('foo');
		expect(myid).toEqual('bar');
	});

});
