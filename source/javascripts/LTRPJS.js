year = '';

columns_we_want = [1, 8, 11, 12, 21, 22, 23, 24];
count = 0;
data = [];
headers = [];
$('#rushing_and_receiving').find('tr').not('tr.over_header').find('th').each(function(){
	if ($.inArray(count, columns_we_want) > -1) {
		headers.push($(this).text().replace(/\D/g,''));
	}
	count++;
});

count = 0;
$('#div_rushing_and_receiving').find('tbody').find('[id*='+year+'] td').each(function(){
	if ($.inArray(count, columns_we_want) > -1) {
		data.push($(this).text());
	}
	count++;
})