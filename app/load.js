function include(jsFile) {
  document.write('<script src="' + jsFile + '.js" type="text/javascript" ></script>'); 
}

include('app/controllers/expression_controller');
include('app/models/expression_list');
include('app/models/symbol');
include('app/views/expression_view');

include('app/init');