window.GT = window.GT || {};
window.GT.UI = window.GT.UI || {};

/**
 * @class TabBar
 * @namespace  gwa
 * @constructor
 * @param  {jQuery} jq
 */
(function( ns, $ ) {

	ns.TabBar = function( jq ) {

		// declare private variables
		var
		/**
		 * @property {Object} _interface
		 * @private
		 */
		_interface = {},

		/**
		 * @property {Object} _jq
		 * @private
		 */
		_jq = jq,

		/**
		 * @property {gwa.EventDispatcher} _dispatcher
		 * @private
		 */
		_dispatcher = new gwa.EventDispatcher,

		/**
		 * @property {Array} _tabs
		 * @private
		 */
		_tabs,

		/**
		 * @property {Array} _activetab
		 * @private
		 */
		_activetab;

		function init() {
			if (typeof _jq === 'undefined') {
				create();
			}
			initTabs();
		}

		function create() {
			_jq = $('<ul class="gt-ui-tabbar"></ul>');
		}

		function initTabs() {
			_tabs = [];
			var f = function() {
				_tabs.push(new ns.Tab($(this), _interface));
			};
			_jq.find('li').each(f);
			// activate a tab
			if (!_tabs.length) {
				return;
			}
			// activate first tab
			//_interface.activateTab(_tabs[0].getId());
		}

		/* ---- public interface ---- */

		_interface.activateTab = function( id ) {
			var tab = _interface.getTabById(id);
			if (!tab) {
				return;
			}
			if (typeof _activetab !== 'undefined') {
				_activetab.deactivate();
			}
		};

		_interface.jq = function() {
			return _jq;
		};

		_interface.getHTML = function() {
			return $('<div />').append(_jq.clone()).html();
		};

		_interface.getTabs = function() {
			return _tabs;
		};

		_interface.getTabById = function( id ) {
			var i, l = _tabs.length;
			for (i = l; i >= 0; i--) {
				if (_tabs[i].getId() === id) {
					return _tabs[i];
				}
			}
			return null;
		};

		_interface.on = function( event, func, obj, once ) {
			return _dispatcher.on(event, func, obj, once);
		};

		_interface.once = function( event, func, obj ) {
			return _dispatcher.once(event, func, obj);
		};

		_interface.off = function( event, func ) {
			_dispatcher.off(event, func);
		};

		init();

		return _interface;

	};

}(window.GT.UI = window.GT.UI || {}, typeof(jQuery) === 'function' ? jQuery : null));
