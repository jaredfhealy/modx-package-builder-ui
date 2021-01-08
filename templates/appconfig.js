var app = new Vue({
	el: '#app',
	data: function () {
		return {
			mode: 'list',
			view: 'table',
			model: 'grvPackage',
			form: '',
			items: [],
			package: {},
			object: {},
			field: {},
			rel: {},
			fieldOptions: {},
			item: {},
			pagesize: 20,
			page: 1,
			sortfield: 'sortorder',
			alerts: [],
			objectMeta: {
				grvPackage: {
					label_list: 'Packages',
					label_singular: 'Package',
					fields: "",
					getlist: 'package/getlist',
					create: 'package/create',
					update: 'package/update',
					parentField: '',
					dataKey: 'package',
					listColumns: ['id', 'display', 'package_key', 'base_class', 'platform', 'default_engine', 'phpdoc_package', 'phpdoc_subpackage', 'sortorder']
				},
				grvObject: {
					label_list: 'Objects',
					label_singular: 'Object',
					fields: "",
					getlist: 'object/getlist',
					create: 'object/create',
					update: 'object/update',
					parentField: 'package',
					dataKey: 'object',
					listColumns: ['id', 'class', 'table_name', 'extends', 'sortorder']
				},
				grvField: {
					label_list: 'Fields',
					label_singular: 'Field',
					fields: "",
					getlist: 'field/getlist',
					create: 'field/create',
					update: 'field/update',
					parentField: 'object',
					dataKey: 'field',
					listColumns: ['id', 'column_name', 'dbtype', 'precision', 'phptype', 'allownull', 'default', 'index', 'sortorder'],
					quickSelect: [
						{
							label: 'Small String 20 (varchar/string, 20, true, none)',
							dbtype: 'varchar',
							precision: 20,
							phptype: 'string',
							allownull: true
						},
						{
							label: 'Medim String 50 (varchar/string, 50, true, none)',
							dbtype: 'varchar',
							precision: 50,
							phptype: 'string',
							allownull: true
						},
						{
							label: 'Long String (varchar, 191, true, none)',
							dbtype: 'varchar',
							precision: 191,
							phptype: 'string',
							allownull: true
						},
						{
							label: 'Positive Int [Foreign Key IDs, Sorting] (int/int, 10, false, none)',
							dbtype: 'int',
							precision: 10,
							phptype: 'integer',
							allownull: false,
							attributes: 'unsigned'
						},
						{
							label: 'Timestamp (int/timestamp, 20, false, 0)',
							dbtype: 'int',
							precision: 20,
							phptype: 'timestamp',
							allownull: false,
							default: 0
						},
						{
							label: 'Text [64KB] (text/string, true, none)',
							dbtype: 'text',
							phptype: 'string',
							allownull: true
						},
						{
							label: 'Medium Text [16MB] (mediumtext/string, true, none)',
							dbtype: 'mediumtext',
							phptype: 'string',
							allownull: true
						},
						{
							label: 'True/False [0/1] (tinyint/boolean, 1, false, 0)',
							dbtype: 'int',
							precision: 1,
							phptype: 'boolean',
							allownull: false,
							attributes: 'unsigned',
							default: 0
						},
						{
							label: 'Datetime (datetime, true, NULL)',
							dbtype: 'datetime',
							phptype: 'datetime',
							allownull: true,
							default: 'NULL'
						},
						{
							label: 'Array Data (text/array, true, none)',
							dbtype: 'text',
							phptype: 'array',
							allownull: true
						}
					]
				},
				grvRel: {
					label_list: 'Relations',
					label_singular: 'Relation',
					fields: "",
					getlist: 'rel/getlist',
					create: 'rel/create',
					update: 'rel/update',
					parentField: 'object',
					dataKey: 'rel',
					listColumns: ['id', 'relation_type', 'alias', 'class', 'local', 'foreign', 'cardinality', 'owner', 'sortorder'],
				}
			},
			dataLoaded: false,
			siteId: "",
			debug: [],
			importSchema: false,
			schema: {
				import: false,
				path: '',
				xml: '',
				messages: ''
			}
		}
	},
	computed: {
		sortedItems: function () {
			return _.sortBy(this.items, this.sortfield);
		},
		packageTabLabel: function () {
			if (this.package.display) {
				return this.objectMeta['grvPackage'].label_singular + ": " + this.package.display;
			}
			return 'New Package';
		},
		objectTabLabel: function () {
			if (this.object.class) {
				return this.objectMeta['grvObject'].label_singular + ": " + this.object.class;
			}
			return 'New Object';
		},
		fieldTabLabel: function () {
			if (this.field.column_name) {
				return this.objectMeta['grvField'].label_singular + ": " + this.field.column_name;
			}
			return 'New Field';
		},
		relTabLabel: function () {
			if (this.rel.alias) {
				return this.objectMeta['grvRel'].label_singular + ": " + this.rel.alias;
			}
			return 'New Relation';
		},
		packageSelected: function () {
			var c1 = this.package.id !== null;
			var c2 = this.package.id !== 0;
			var c3 = this.package.id !== '';
			var c4 = typeof this.package.id !== 'undefined';
			var c5 = this.mode == 'create' && this.model == 'grvPackage';
			return (c1 && c2 !== 0 && c3 && c4) || c5;
		},
		objectSelected: function () {
			var c1 = this.object.id !== null;
			var c2 = this.object.id !== 0;
			var c3 = this.object.id !== '';
			var c4 = typeof this.object.id !== 'undefined';
			var c5 = this.mode == 'create' && this.model == 'grvObject';
			return (c1 && c2 !== 0 && c3 && c4) || c5;
		},
		fieldSelected: function () {
			var c1 = this.field.id !== null;
			var c2 = this.field.id !== 0;
			var c3 = this.field.id !== '';
			var c4 = typeof this.field.id !== 'undefined';
			var c5 = this.mode == 'create' && this.model == 'grvField';
			return (c1 && c2 !== 0 && c3 && c4) || c5;
		},
		relSelected: function () {
			var c1 = this.rel.id !== null;
			var c2 = this.rel.id !== 0;
			var c3 = this.rel.id !== '';
			var c4 = typeof this.rel.id !== 'undefined';
			var c5 = this.mode == 'create' && this.model == 'grvRel';
			return (c1 && c2 !== 0 && c3 && c4) || c5;
		}
	},
	methods: {
		navigate: function (mode, model, item) {
			/**
			 * Function to 'navigate' between modes
			 *
			 * Allowed Modes: list, create, update
			 * Models: Any valid xPDO class, grvPackage
			 * 
			 * @param {string} mode The current mode value
			 * @param {string} model The xPDO class name
			 * @param {object} item (Optional) row to edit
			 */
			var modeChanged = false;
			var modelChanged = false;
			if (this.mode != mode) {
				modeChanged = true;
				this.mode = mode;
			}
			if (this.model != model) {
				modelChanged = true;
				this.model = model;
			}

			// Check for preview edge case
			if (mode === 'preview') {
				this.form = 'packageUtils';
				this.view = 'form';
			}

			// Set the object keys based on model
			if (mode === 'create') {
				// Clear options
				this.fieldOptions = '';

				// Set the form
				this.form = 'update' + this.objectMeta[model].label_singular;

				// Get the default values
				var dataKey = this.objectMeta[this.model].dataKey;
				var fieldsString = this.objectMeta[this.model].fields;
				this[dataKey] = JSON.parse(fieldsString);

				// Set the parent as well
				var parentKey = this.objectMeta[this.model].parentField;
				this[dataKey][parentKey] = this[parentKey].id;

				// Change the view
				console.log("Setting view to form for " + this.model);
				this.view = 'form';
			}

			// If mode is update
			if (mode === 'update' && item) {
				// Set the item
				this[this.objectMeta[model].dataKey] = item;
				this.form = mode + this.objectMeta[model].label_singular;

				// Change the view
				this.view = 'form'
			}
			else if (mode === 'update') {
				// Just change the view
				this.form = mode + this.objectMeta[model].label_singular;
				this.view = 'form';
			}

			// If this is list mode, load the list data
			if (mode === 'list') {
				// Set the list form
				this.form = this.objectMeta[model].dataKey + "List";

				// Clear data objects per case
				if (model === 'grvPackage') {
					this.package = {};
					this.object = {};
					this.field = {};
					this.schema = {};
					//this.form = 'packageList';
				}
				else if (model === 'grvObject') {
					this.object = {};
					this.field = {};
					//this.form = 'objectList';
				}
				else if (model === 'grvField') {
					this.field = {};
					//this.form = 'fieldList';
				}
				else if (model === 'grvRel') {
					this.rel = {};
					//this.form = 'fieldList';
				}
				this.loadListData();
				this.view = 'table';
			}
		},
		saveModel: function (backToList) {
			// Default to false
			backToList = backToList || false;

			// Save the data
			var _this = this;
			var data = this[this.objectMeta[this.model].dataKey];
			data.action = this.objectMeta[this.model][this.mode];
			data.id = this.mode == 'create' ? undefined : data.id;

			// Make the api calls
			$.ajax({
				type: 'POST',
				headers: { modAuth: this.siteId },
				url: '/assets/components/grv/connector.php',
				data: data,
				dataType: 'json'
			})
				.always(function (response) {
					if (response.success) {
						// Show the alert
						_this.addAlert('success', _this.objectMeta[_this.model].label_singular + " saved successfully");
						if (backToList) {
							_this.navigate('list', _this.model);
						}
					}

				});
		},
		addAlert: function (type, message) {
			var alert = {
				type: type,
				message: message,
				id: Date.now()
			};
			this.alerts.push(alert);

			// If this is not an error, auto dismiss
			var _this = this;
			setTimeout(function () {
				for (var index in _this.alerts) {
					if (_this.alerts[index].id === alert.id) {
						_this.removeAlert(index);
					}
				}
				_this.removeAlert(alert.id);
			}, 1000);
		},
		removeAlert: function (index) {
			this.$delete(this.alerts, index);
		},
		loadListData: function () {
			/**
			 * Load the list of data based on current page and size
			 * 
			 */
			// Clear the data, save a reference
			this.dataLoaded = false;
			this.items.splice(0);
			var _this = this;

			// Define query parameters
			var params = {
				start: (this.page - 1) * this.pagesize,
				limit: this.pagesize
			};
			var queryObj = {};

			// Handle limiting child lists to their parent
			if (this.model === 'grvObject') {
				queryObj.package = this.package.id;
			}
			else if (this.model === 'grvField' || this.model === 'grvRel') {
				queryObj.object = this.object.id;
			}

			// If we have a query defined
			if (Object.keys(queryObj).length > 0) {
				params['query'] = JSON.stringify(queryObj);
			}

			// Add action
			params['action'] = this.objectMeta[this.model].getlist;

			$.ajax({
				type: 'POST',
				headers: { modAuth: this.siteId },
				url: '/assets/components/grv/connector.php',
				data: params,
				dataType: 'json'
			}).always(function (response) {
				// If we have results
				if (response.results) {
					// Make sure items is empty, and add new items
					_this.items = response.results;
					_this.dataLoaded = true;
				}
			});
		},
		buildSchema: function (buildAction) {
			// Build the options
			var params = {};
			params[buildAction] = 'true';
			params.action = 'package/build'
			params.package_id = this.package.id;

			// Make the api call
			var _this = this;
			$.ajax({
				type: 'POST',
				url: '/assets/components/grv/connector.php',
				headers: { modAuth: this.siteId },
				data: params,
				dataType: 'json'
			})
				.always(function (response) {
					if (response.success) {
						_this.schema.xml = response.object.schema;
						_this.addAlert('success', 'Preview generated');
						_this.schema.messages = response.object.messages;
					}
				});
		},
		showImportSchema: function () {
			this.schema.import = true;
			this.$nextTick(function () {
				$('#import_schema_modal').modal('toggle');
			});
		},
		hideImportSchema: function () {
			$('#import_schema_modal').modal('toggle');
			this.$nextTick(function () {
				this.schema.import = false;
			});
		},
		runImportSchema: function () {
			// Store a reference
			var _this = this;

			// Set params
			var params = {
				schema_file_path: this.schema.path,
				schema_xml: this.schema.xml
			};

			// Make the api call
			$.ajax({
				type: 'POST',
				url: '/assets/components/grv/connector.php?action=package/importschema',
				headers: { modAuth: this.siteId },
				data: JSON.stringify(params),
				dataType: 'json'
			})
				.always(function (response) {
					if (response.success) {
						_this.schema.xml = response.object.schema;
						_this.addAlert('success', 'Preview generated');
						_this.schema.messages = response.object.messages;
					}
				});
		},
		setQuickSelectValues: function (options) {
			// Loop through current quick select
			for (var key in options) {
				if (typeof this.field[key] !== 'undefined') {
					//this.field[key] = options[key];
					this.$set(this.field, key, options[key]);
				}
			}
		},
		setDefaultRelationValues: function() {
			// Check the type
			if (this.rel.relation_type === 'composite') {
				this.rel.local = 'id';
				this.rel.foreign = '';
				this.rel.owner = 'local';
				this.rel.cardinality = 'many';
			}
			else if (this.rel.relation_type === 'aggregate') {
				this.rel.local = '';
				this.rel.foreign = 'id';
				this.rel.owner = 'foreign';
				this.rel.cardinality = 'one';
			}
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			// Setup the siteId
			if (parent !== self) {
				console.log(parent.window.MODx.siteId);
				this.siteId = parent.window.MODx.siteId + '';
			}
			else {
				// Value was passed with config as a local window variable
				this.siteId = siteId + '';
			}

			// Get the default fields data
			var _this = this;
			$.ajax({
				type: 'POST',
				url: '/assets/components/grv/connector.php?action=package/getdefaults',
				headers: { modAuth: this.siteId },
				dataType: 'json'
			})
				.always(function (response) {
					if (response.success) {
						var data = response.object;
						for (var key in data) {
							_this.objectMeta[key].fields = data[key];
						}
					}
				});

			// Trigger the navigate function to setup the default
			this.navigate('list', 'grvPackage');
		})
	}
});