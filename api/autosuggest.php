
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>jQuery Bootstrap Suggest Plugin Demos</title>
<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
<link href="css/bootstrap-suggest.css" rel="stylesheet" type="text/css">
</head>

<body>
<div id="jquery-script-menu">
<div class="jquery-script-center">
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></div>
<div class="jquery-script-clear"></div>
</div>
</div>
<div class="container">

<div class="row">
<div class="col-lg-6">
<div class="form-group">
   <label for="example-1">start typing with @</label>
   <textarea class="form-control" rows="8" id="example-1"></textarea>
</div>
</div>
<!--div class="col-lg-6">
<div class="form-group">
   <label for="example-2">start typing with #</label>
   <textarea class="form-control" rows="8" id="example-2"></textarea>
</div>
</div-->
</div>
</div>
<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="http://strtheme.stridecdev.com/bootstrap-suggest.js"></script>
<script>
var users = [
  {username: 'lodev09', fullname: 'Jovanni Lo'},
  {username: 'foo', fullname: 'Foo User'},
  {username: 'bar', fullname: 'Bar User'},
  {username: 'twbs', fullname: 'Twitter Bootstrap'},
  {username: 'john', fullname: 'John Doe'},
  {username: 'jane', fullname: 'Jane Doe'},
];
$('#example-1').suggest('@', {
  data: users,
  map: function(user) {
    return {
      value: user.username,
      text: '<strong>'+user.username+'</strong> <small>'+user.fullname+'</small>'
    }
  }
})
$('#example-2').suggest('#', {
  data: users,
  filter: {
			casesensitive: true,
			limit: 10
		},
  map: function(user) {
    return {
      value: user.username,
      text: '<strong>'+user.username+'</strong> <small>'+user.fullname+'</small>'
    }
  }
})
</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</body>
</html>
