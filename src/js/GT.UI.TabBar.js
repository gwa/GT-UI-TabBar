/* global gwa */

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
		_dispatcher = new gwa.EventDispatcher(),

		/**
		 * @property {Array} _tabs
		 * @private
		 */
		_tabs,

		/**
		 * @property {Number} _requiredwidth
		 * @private
		 */
		_requiredwidth,

		/**
		 * @property {Array} _activetab
		 * @private
		 */
		_activetab;

		function init() {
			if (typeof _jq === 'undefined') {
				create();
			} else {
				_jq.removeClass('hide-nojs');
			}
			initTabs();
			listen();
		}

		function create() {
			_jq = $('<ul class="gt-ui-tabbar"></ul>');
		}

		function initTabs() {
			var f;
			_tabs = [];
			f = function() {
				var tab;
				tab = new ns.Tab($(this));
				tab.on('CLICK', handleTabClick);
				_tabs.push(tab);
			};
			_jq.find('li').each(f);
			// activate a tab
			if (!_tabs.length) {
				return;
			}
			// activate first tab
			_interface.activateTab(_tabs[0].getId());
			handleWindowResize();
			listen();
		}

		function handleTabClick( tab ) {
			_interface.activateTab(tab.getId());
		}

		function listen() {
			$(window).on('resize', handleWindowResize);
		}

		function handleWindowResize() {
			if (!_jq.parent()) {
				return;
			}
			if (_jq.parent().innerWidth() < getRequiredWidth()) {
				_jq.addClass('stacked');
			} else {
				_jq.removeClass('stacked');
			}
		}

		function getRequiredWidth() {
			if (typeof _requiredwidth === 'undefined') {
				_requiredwidth = calculateRequiredWidth();
			}
			return _requiredwidth;
		}

		function calculateRequiredWidth() {
			var w = 0;
			_jq.find('span').each(function() {
				w += $(this).outerWidth();
			});
			return w;
		}

		/* ---- public interface ---- */

		_interface.activateTab = function( id ) {
			var tab = _interface.getTabById(id);
			if (!tab) {
				return;
			}
			if (typeof _activetab !== 'undefined') {
				_activetab.deactivate();
				_dispatcher.dispatch('DEACTIVATE_TAB', _activetab.getId());
			}
			tab.activate();
			_activetab = tab;
			_dispatcher.dispatch('ACTIVATE_TAB', tab.getId());
		};

		_interface.addTab = function( id, label ) {
			var jq = $('<li data-id="' + id + '">' + label + '</li>'),
				tab = new ns.Tab(jq);
			_jq.append(jq);
			_tabs.push(tab);
			_requiredwidth = null;
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
			for (i = 0; i < l; i++) {
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
