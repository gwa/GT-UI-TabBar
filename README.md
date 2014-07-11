Tab Bar
=======

## Specs

A tab bar consists of one or more tabs.

At least one tab must be active.

### Responsive

Tabs is the tab bar are normally horizontally aligned.

If there is not enough space, they should then be vertically stacked.

### HTML markup

Tabs consist of an unordered list.

~~~~~~~~.html
<ul class="gt-ui-tabbar">
	<li data-id="tab1">Lorem ipsum</li>
	<li data-id="tab2">Lorem ipsum</li>
	<li data-id="tab3">Lorem ipsum</li>
	<li data-id="tab4">Lorem ipsum</li>
</ul>
~~~~~~~~

### Options

`data-id`

Each tab should have an ID unique to its bar.

### Initialization

The constructor can either be passed an existing DOM node wrapped as a jQuery object, or nothing.

If the

~~~~~~~~.js
// initializes existing tab bars in page.
$('.gt_ui_tabbar').each(function() {
	var tb = new GT.UI.TabBar();
});

// creates a new tab bar dynamically.
var dynamic_tb = new GT.UI.TabBar();
~~~~~~~~

### Events

`ACTIVATE`

Fired when a tab is activated.

`DEACTIVATE`

Fired when a tab is deactivated.

`ENABLE`

Fired when a tab is enabled.

`DISABLE`

Fired when a tab is disabled.

### Methods

`activateTab( [string] id )`

`addTab( [object] options )`

`removeTab( [id] )`

`on( [string] eventname, [function] handler )`

`off( [string] eventname, [function] handler )`
