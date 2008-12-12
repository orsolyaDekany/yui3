YUI.add('datasource-local', function(Y) {

/**
 * The DataSource utility provides a common configurable interface for widgets to
 * access a variety of data, from JavaScript arrays to online database servers.
 *
 * @module datasource-local
 * @requires datasource-base
 * @title DataSource Local Submodule
 */
    var LANG = Y.Lang,
    
    /**
     * Local subclass for the YUI DataSource utility.
     * @class DataSource.Local
     * @extends DataSource.Base
     * @constructor
     */    
    LocalDataSource = function() {
        LocalDataSource.superclass.constructor.apply(this, arguments);
    };
    

    /////////////////////////////////////////////////////////////////////////////
    //
    // LocalDataSource static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(LocalDataSource, {    
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static     
     * @final
     * @value 'datasource'
     */
    NAME: 'datasource',

    /**
     * Type is unknown.
     *
     * @property TYPE_UNKNOWN
     * @type Number
     * @static     
     * @final
     * @default -1
     */
    TYPE_UNKNOWN: -1,
    
    /**
     * Type is a JavaScript Array.
     *
     * @property TYPE_JSARRAY
     * @type Number
     * @static     
     * @final
     * @default 0
     */
    TYPE_JSARRAY: 0,
    
    /**
     * Type is a JavaScript Function.
     *
     * @property TYPE_JSFUNCTION
     * @type Number
     * @static     
     * @final
     * @default 1
     */
    TYPE_JSFUNCTION: 1,
    
    /**
     * Type is hosted on a server via an XHR connection.
     *
     * @property TYPE_XHR
     * @type Number
     * @static     
     * @final
     * @default 2
     */
    TYPE_XHR: 2,
    
    /**
     * Type is JSON.
     *
     * @property TYPE_JSON
     * @type Number
     * @static     
     * @final
     * @default 3
     */
    TYPE_JSON: 3,
    
    /**
     * Type is XML.
     *
     * @property TYPE_XML
     * @type Number
     * @static     
     * @final
     * @default 4
     */
    TYPE_XML: 4,
    
    /**
     * Type is plain text.
     *
     * @property TYPE_TEXT
     * @type Number
     * @static     
     * @final
     * @default 5
     */
    TYPE_TEXT: 5,
    
    /**
     * Type is an HTML TABLE element. Data is parsed out of TR elements from all
     * TBODY elements.
     *
     * @property TYPE_HTMLTABLE
     * @type Number
     * @static     
     * @final
     * @default 6
     */
    TYPE_HTMLTABLE: 6,
    
    /**
     * Type is hosted on a server via a dynamic script node.
     *
     * @property TYPE_SCRIPTNODE
     * @type Number
     * @static     
     * @final
     * @default 7
     */
    TYPE_SCRIPTNODE: 7,
    
    /**
     * Type is local.
     *
     * @property TYPE_LOCAL
     * @type Number
     * @static     
     * @final
     * @default 8
     */
    TYPE_LOCAL: 8,
    
    /**
     * Type is local.
     *
     * @property TYPE_LOCAL
     * @type Number
     * @static     
     * @final
     * @default 8
     */
    TYPE_LOCAL: 8,

    /**
     * Registry of parsing functions.
     *
     * @property Parser
     * @type Object
     * @static     
     */
    Parser: {
    
        /**
         * Converts data to type String.
         *
         * @method DS.Parser.parseString
         * @param oData {String | Number | Boolean | Date | Array | Object}
         * Data to parse.
         * The special values null and undefined will return null.
         * @return {String} A string, or null.
         * @static
         */
        string: function(oData) {
            // Special case null and undefined
            if(!LANG.isValue(oData)) {
                return null;
            }
            
            //Convert to string
            var string = oData + "";
        
            // Validate
            if(LANG.isString(string)) {
                return string;
            }
            else {
                return null;
            }
        },
        
        /**
         * Converts data to type Number.
         *
         * @method DS.Parser.parseNumber
         * @param oData {String | Number | Boolean | Null} Data to convert.
         * Beware, null returns as 0.
         * @return {Number} A number, or null if NaN.
         * @static
         */
        number: function(oData) {
            //Convert to number
            var number = oData * 1;
            
            // Validate
            if(LANG.isNumber(number)) {
                return number;
            }
            else {
                return null;
            }
        },
        
        /**
         * Converts data to type Date.
         *
         * @method DS.Parser.parseDate
         * @param oData {Date | String | Number} Data to convert.
         * @return {Date} A Date instance.
         * @static
         */
        date: function(oData) {
            var date = null;
            
            //Convert to date
            if(!(oData instanceof Date)) {
                date = new Date(oData);
            }
            else {
                return oData;
            }
            
            // Validate
            if(date instanceof Date) {
                return date;
            }
            else {
                return null;
            }
        }
    },

    /////////////////////////////////////////////////////////////////////////////
    //
    // LocalDataSource Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        /**
        * @attribute liveData
        * @description Pointer to live database.
        * @type MIXED
        */
        liveData: {
        },
        
        /**
        * @attribute dataType
        * @description Where the live data is held:
            <ul>
                <li>TYPE_UNKNOWN</li>
                <li>TYPE_LOCAL</li>
                <li>TYPE_XHR</li>
                <li>TYPE_SCRIPTNODE</li>
                <li>TYPE_JSFUNCTION</li>
            </ul>
        * @type Number
        * @default LocalDataSource.TYPE_UNKNOWN        
        */
        dataType: {
            value: LocalDataSource.TYPE_UNKNOWN
        },

        /**
        * @attribute responseType
        * @description Format of response:
            <ul>
                <li>TYPE_UNKNOWN</li>
                <li>TYPE_JSARRAY</li>
                <li>TYPE_JSON</li>
                <li>TYPE_XML</li>
                <li>TYPE_TEXT</li>
                <li>TYPE_HTMLTABLE</li>
            </ul>
        * @type Number
        * @default LocalDataSource.TYPE_UNKNOWN
        */
        responseType: {
            value: LocalDataSource.TYPE_UNKNOWN
        },

        /**
        * @attribute responseSchema
        * @description Response schema object literal takes a combination of
        * the following properties:
            <dl>
                <dt>resultsList {String}</dt>
                    <dd>Pointer to array of tabular data</dd>
                <dt>resultNode {String}</dt>
                    <dd>Pointer to node name of row data (XML data only)</dl>
                <dt>recordDelim {String}</dt>
                    <dd>Record delimiter (text data only)</dd>
                <dt>fieldDelim {String}</dt>
                    <dd>Field delimiter (text data only)</dd>
                <dt>fields {String[] | Object []}</dt>
                    <dd>Array of field names (aka keys), or array of object literals such as:
                    {key:"fieldname", parser:LocalDataSource.parseDate}</dd>
                <dt>metaFields {Object}</dt>
                    <dd>Hash of field names (aka keys) to include in the 
                    oParsedResponse.meta collection</dd>
                <dt>metaNode {String}</dt>
                    <dd>Name of the node under which to search for meta
                    information in XML response data (XML data only)</dd>
            </dl>
        * @type Object
        * @default {}        
        */
        responseSchema: {
            value: {}
        },

        /**
        * @attribute ERROR_DATAINVALID
        * @description Error message for invalid data responses.
        * @type String
        * @default "Invalid data"
        */
        ERROR_DATAINVALID: {
            value: "Invalid data"
        },


        /**
        * @attribute ERROR_DATANULL
        * @description Error message for null data responses.
        * @type String
        * @default "Null data"        
        */
        ERROR_DATANULL: {
            value: "Null data"
        }
    }
});
    
Y.extend(LocalDataSource, Y.DataSource.Base, {
        /**
        * @property _queue
        * @description Object literal to manage asynchronous request/response
        * cycles enabled if queue needs to be managed (asyncMode/xhrConnMode):
            <dl>
                <dt>interval {Number}</dt>
                    <dd>Interval ID of in-progress queue.</dd>
                <dt>conn</dt>
                    <dd>In-progress connection identifier (if applicable).</dd>
                <dt>requests {Object[]}</dt>
                    <dd>Array of queued request objects: {request:oRequest, callback:_xhrCallback}.</dd>
            </dl>
        * @type Object
        * @default {interval:null, conn:null, requests:[]}    
        * @private     
        */
        _queue: null,

        /**
        * @property _intervals
        * @description Array of polling interval IDs that have been enabled,
        * stored here to be able to clear all intervals.
        * @private        
        */
        _intervals: null,

        /**
        * @method _createEvents
        * @description This method creates all the events for this Event
        * Target and publishes them so we get Event Bubbling.
        * @private        
        */
        _initEvents: function() {
            var events = [
                "dataErrorEvent",
                "requestEvent",
                "responseEvent",
                "responseParseEvent"
            ];
            
            Y.each(events, function(v, k) {
                this.publish(v, {
                    type: v,
                    emitFacade: true,
                    bubbles: true,
                    preventable: false,
                    queuable: true
                });
            }, this);
    
            /*if (this.get('bubbles')) {
                this.addTarget(this.get('bubbles'));
            }*/           
        },

        /**
        * @method initializer
        * @description Internal init() handler.
        * @private        
        */
        initializer: function() {
            this._queue = {interval:null, conn:null, requests:[]};
            this._intervals = [];
        },

        /**
        * @method destructor
        * @description Internal destroy() handler.
        * @private        
        */
        destructor: function() {
        }
});
    
    Y.namespace('DataSource');    
    Y.DataSource.Local = LocalDataSource;
    



}, '@VERSION@' ,{requires:['datasource-base']});



YUI.add('datasource', function(Y){}, '@VERSION@' ,{use:['datasource-base','datasource-local']});

