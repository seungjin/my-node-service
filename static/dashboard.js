var _dr = dojo.require;
dojo.require = function(module) { if (module == "dijit.Editor") return; _dr(module); }

dojo.require("dojox.grid.EnhancedGrid");
dojo.require("dojox.grid.enhanced.plugins.DnD");
dojo.require("dojox.grid.enhanced.plugins.Menu");
dojo.require("dojox.grid.enhanced.plugins.NestedSorting");
dojo.require("dojox.grid.enhanced.plugins.IndirectSelection");
dojo.require("dojox.data.CsvStore");

//job_id, name, registered_at, param, run_at, registered_by, status
dojo.addOnLoad(function() {
  var store = new dojox.data.CsvStore({ url: '/static/queue.csv' });

	// set the layout structure:
  var layout = [
		{	
			field: 'job_id',
  		name: 'Job id',
  		width: '100px'
		},
		{
  		field: 'name',
  		name: 'Name',
  		width: '50px'
		},
		{
 			field: 'registered_at',
  		name: 'Registered at',
  		width: '200px'
		},
		{
  		field: 'param',
  		name: 'param',
  		width: '100px'
		},
		{
  		field: 'runat',
  		name: 'Run at',
  		width: '200px'
		},
		{
  		field: 'registered_by',
  		name: 'Registered by',
  		width: '100px'
		},
		{
  		field: 'status',
  		name: 'Status',
  		width: 'auto'
		}

	];

	// create a new grid:
	var grid = new dojox.grid.EnhancedGrid({
		query: { job_id: '*'},
    store: store,
    rowSelector: '20px',
                structure: layout,
                plugins: {
                    nestedSorting: true,
                    dnd: true,
                    indirectSelection: {
                        //name: "Selection",
                        width: "25px",
                        styles: "text-align: center;"
                    }
                }
            },
            document.createElement('div'));

            // append the new grid to the div "gridContainer4":
       dojo.byId("gridDiv").appendChild(grid.domNode);

            // Call startup, in order to render the grid:
            grid.startup();
	});
	
	
console.log("hihi");
var client = new Faye.Client("/faye");
var subscription = client.subscribe("/msg", function(msg){ console.log(msg); });
