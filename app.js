const http = require("http");

const server = http.createServer();

//임시 데이터베이스 - 데이터를 메모리에 저장.
const users = [
    {
      id: 1,
      name: "Rebekah Johnson",
      email: "Glover12345@gmail.com",
      password: "123qwe",
    },
    {
      id: 2,
      name: "Fabian Predovic",
      email: "Connell29@gmail.com",
      password: "password",
    },
  ];
  
  //임시 데이터베이스 - 데이터를 메모리에 저장.
  const posts = [
    {
      id: 1,
      title: "간단한 HTTP API 개발 시작!",
      content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
      userId: 1,
    },
    {
      id: 2,
      title: "HTTP의 특성",
      content: "Request/Response와 Stateless!!",
      userId: 1,
    },
  ];
  

  const data =  [
	{
	    "userID"           : 1,
	    "userName"         : "Rebekah Johnson",
            "postingId"        : 1,
            "postingTitle"     : "간단한 HTTP API 개발 시작!",
	    "postingContent"   : "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현."
	},
	{  
	    "userID"           : 2,
	    "userName"         : "Fabian Predovic",
            "postingId"        : 2,
            "postingTitle"     : "HTTP의 특성",
      	    "postingContent"   : "Request/Response와 Stateless!!"
	},
	{  
            "userID"           : 3,
	    "userName"         : "ndew user 1",
            "postingId"        : 3,
            "postingImageUrl"  : "내용 1",
	    "postingContent"   : "sampleContent3"
	},
	{  
	    "userID"           : 4,
	    "userName"         : "new user 2",
            "postingId"        : 4,
            "postingImageUrl"  : "내용 2",
	    "postingContent"   : "sampleContent4"
	}
        ]


///1/////////////////////////////////////////////////////////////


const httpRequestListener = function(request, response){
    const { url, method } = request; //구조분해할당 
    //const url = request.url      const method =  request.method와 동일

    if(method === 'GET') {
        if(url === '/ping') {
            //console.log('pong1');
           
    response.writeHead(200,{'Content-Type' : 'application/json'})
    response.end(JSON.stringify({message : 'pong'}));
   
        }
        else if (url === '/post/edit'){
            response.writeHead(200,{'Content-Type' : 'application/json'})
            response.end(JSON.stringify({'data' : data}));
        }
    } else if (method === "POST") {
        if (url === "/users"){
            let body = "";
            console.log('pong');
            request.on("data", (data) => body += data);

            request.on("end", () => {

                const user = JSON.parse(body);

                users.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                });
                response.writeHead(200,{'Content-Type' : 'application/json'})
                response.end(JSON.stringify({"users" : users}));
            })
        }
        else if (url === "/posts"){
            let body = "";

            request.on("data", (data) => {
                body += data;
            });

            request.on("end", () => {

                const post = JSON.parse(body);

                posts.push({
                    id : post.id,
                    title: post.title,
                    content:post.content,
                    userId: post.userId,
                });
                response.writeHead(200,{'Content-Type' : 'application/json'})
                response.end(JSON.stringify({"posts" : posts}));
            })
        }
        // }else if(url === "/pach"){
        //     let rawData = "";
        //     console.log("ddd")
                      
        //     request.on("data", (chunk) => { rawData += chunk; });
    
        //     request.on("end", () => {
    
        //         const body = JSON.parse(rawData);
        //         console.log("!!!!")
        
                    
        //             // for(let i =0 ; i < data.length;i++){
        //             //     console.log("1")
        //             //     if(body.id == data[i][postingId]){
        //             //         data[i][postingContent] = body.postingContent
        //             //         console.log("2")
        //             //     }
        //             // }
            
        //         response.writeHead(200,{'Content-Type' : 'application/json'})
        //         response.end(JSON.stringify({"posts" : posts}));
        
    
        //     });
    
        // }
        
    }

    else if(method === "PATCH"){ 
    console.log("patch")
    if(url === "/patch"){
        let rawData = "";

                  
        request.on("data", (chunk) => { rawData += chunk });

        request.on("end", () => {
            console.log('00');
            const body = JSON.parse(rawData);
            console.log('0');
                for(let i =0 ; i < data.length;i++){
                    console.log('1');
                    if(body.id == data[i].postingId){
                        data[i].postingContent = body.postingContent
                        console.log('2');
                    }
                }
            response.writeHead(200,{'Content-Type' : 'application/json'})
            response.end(JSON.stringify({"data" : data}));
        });

    }
}




}

server.on("request", httpRequestListener)

const IP = '127.0.0.1'
const PORT = 8000

server.listen(PORT, IP, function(){
    console.log(`Listening to request on ip ${IP} & port ${PORT}`)
})