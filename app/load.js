function include(jsFile) {
  document.write('<script src="' + jsFile + '.js" type="text/javascript" ></script>'); 
}

include('app/controllers/expression_controller');
include('app/models/expression_part');
include('app/models/expression_list');
include('app/models/symbol');
include('app/views/expression_view');
include('app/views/drag_and_drop_renderer');

include('app/init');