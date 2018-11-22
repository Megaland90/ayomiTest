
const fetch = require('node-fetch-npm')
const config = require('./Test')


var i = 0;

async function runTest(test)
{
    var param = config[test];

    if (param.option.body)
        param.option.body = JSON.stringify(param.option.body);
    fetch(param.url, param.option).then(respone =>
    {
        console.log("TEST " + ++i + " " + test + " : ");
        console.log( "Status : " + respone.status)
        respone.json().then(data => {
            if (JSON.stringify(data) ===  JSON.stringify(param.result))
            {
                console.log("Past");
                console.log('\n');
            }
            else
            {
                console.log("Result :");
                console.log(data);
                console.log("Expected :");
                console.log(param.result);
                console.log('');
            }
        })
    });


}

for(var test in config)
{
    runTest(test);
}