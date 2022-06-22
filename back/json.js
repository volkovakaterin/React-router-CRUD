const http = require("http");
const { url } = require("koa-router");
const host = 'localhost';
const port = 8000;

let posts = JSON.stringify([
    { id: '89289', content: 'Гуси отличаются клювом, имеющим при основании большую высоту, чем ширину, и оканчивающимся ноготком с острым краем. По краям клюва идут мелкие зубчики.', created: '6 мин назад', name: 'Вера Сучкова', photo: '/waiting-for-a-new-day.jpg' },
    { id: 'mi9j', content: 'Перья и пух сильно развиты. Самцы практически не отличаются от самок — отличия состоят лишь в костном наросте («горбинке») в начале клюва у переносицы самца, а также в несколько более крупном размере тела.', created: '10 мин назад', name: 'Иван Иваныч', photo: '/paren_v_shleme.jpg' }
]);

const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, application/json, accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    let methodReq = req.method;
    switch (req.url) {
        case "/posts":
            if (methodReq == "POST") {
                let data = '';
                req.on('data', function (chunk) {
                    data += chunk.toString();
                });
                req.on('end', function () {
                    let obj = JSON.parse(posts);  
                    let newPosts = obj.map((pst) => {
                        if (pst.id === JSON.parse(data).id) {
                            pst.content = JSON.parse(data).content;
                            return pst
                        }
                        else return pst
                    })
                    posts = JSON.stringify(newPosts);

                    res.writeHead(200);
                    res.end(posts);
                });
                break;
            }
            if (methodReq == "GET") {
                res.writeHead(200);
                res.end(posts);
                break;
            }
            if (methodReq == "OPTIONS") {
                res.setHeader('200', 'OK');
                res.setHeader('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'API-Key, Content-Type, If-Modified-Since, Cache-Control');
                res.setHeader('Access-Control-Max-Age', '86400');
                res.writeHead(200);
                res.end();
                break
            }
            if (methodReq == "DELETE") {
                let data = '';
                req.on('data', function (chunk) {
                    data += chunk.toString();
                });
                req.on('end', function () {
                    let obj = JSON.parse(posts);
                    obj = obj.filter(item => item.id != JSON.parse(data));
                    posts = JSON.stringify(obj);
                    res.writeHead(200);
                    res.end(posts);
                });
                break;
            }
            case "/posts/new":
            if (methodReq == "POST") {
                let data = '';
                req.on('data', function (chunk) {
                    data += chunk.toString();
                });
                req.on('end', function () {
                    let obj = JSON.parse(posts);
                    let newPost = {id: JSON.parse(data).id, content: JSON.parse(data).content, created: 'сейчас', name: 'Гость', photo: '/2266819_original.png'} 
                    obj.push(newPost);
                    posts = JSON.stringify(obj);
                    res.writeHead(200);
                    res.end(posts);
                });
                break;
            }
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
