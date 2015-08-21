var listItem = document.getElementsByTagName("label");
var result = [];
for (var i = 1; i < listItem.length; i++) {
	result.push('{"' + listItem[i].innerHTML + '":"' + listItem[i].getAttribute("for").slice(1,listItem[i].getAttribute("for").length) + '"}');
}

result = result.toString();
result.replace('"{','{');
result.replace('"}"','}');
result.replace(':"',':');

var parsed = JSON.parse('[' + result + ']');