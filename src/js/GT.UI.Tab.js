/* global gwa */

window.GT = window.GT || {};
window.GT.UI = window.GT.UI || {};

/**
 * @class Tab
 * @namespace  gwa
 * @constructor
 * @param  {jQuery} jq
 */
(function( ns, $ ) {

	ns.Tab = function( jq ) {

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
		 * @property {String} _id
		 * @private
		 */
		_id,

		/**
		 * @property {Boolean} _isactive
		 * @private
		 */
		_isactive;

		function init() {
			_id = _jq.attr('data-id');
			if (!_id) {
				throw 'data-id not set';
			}
			wrapcontent();
			listen();
		}

		function wrapcontent() {
			var label = _jq.text();
			_jq.empty().append('<span>' + label + '</span>');
		}

		function listen() {
			_jq.on('click', handleClick);
		}

		function handleClick() {
			if (_isactive) {
				return;
			}
			_dispatcher.dispatch('CLICK', _interface);
		}

		_interface.jq = function() {
			return _jq;
		};

		_interface.getHTML = function() {
			return $('<div />').append(_jq.clone()).html();
		};

		_interface.getId = function() {
			return _id;
		};

		_interface.activate = function() {
			_jq.addClass('active');
			_isactive = true;
			_dispatcher.dispatch('ACTIVATE', _interface);
		};

		_interface.deactivate = function() {
			_jq.removeClass('active');
			_isactive = false;
			_dispatcher.dispatch('DEACTIVATE', _interface);
		};

		_interface.isActive = function() {
			return _isactive;
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
