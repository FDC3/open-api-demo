fin.desktop.main(function() {
  const headers = new Headers();

  if (typeof fdc3 === "undefined") {
    fdc3 = {};
  }

      
  fdc3.get =  function(name, intent){
    return new Promise(resolve => {
      try {
       
        let response =  [];
        
        fetchJson(
          "https://open-app-directory.openfin.co/api/v1/apps",
          "GET",
          headers
        ).then(r => {
            response = r;


        if (response) {
         if (intent){
             response = response.filter(item => {return item.intents === intent;});
         }   
         if (name){
             response = response.filter(item => {return item.name.startsWith(name);});
         }
         resolve(response);

        }
        });
       
      } catch (err) {
          console.log(err);
          resolve([]);
      }
    });
  };

  fdc3.open = async function(name, int, ctx) {
    try {
      let response = await fetchJson(
        `https://open-app-directory.openfin.co/api/v1/apps/${name}`,
        "GET",
        headers
      );
      console.log(response);

      if (response) {
          //if ctx isn't defined, context is the second arg, else intent is second arg and context is third
          let intent = typeof(ctx) === "undefined" ? null : int;
          let context = intent ? ctx : int;
          
          let url = (response.app_config.replace("https://","fins://").replace("http://","fin://"));
          if (intent){
            url = url + "?$$intent=" + intent;
          }
          if (context){
              //convert context object to url format
              if (!intent){
                url = url + "?";
              }
              url = url + "&$$context=" + encodeURI(JSON.stringify(context));
          }
          document.location.href = url;
        /*fin.desktop.Application.createFromManifest(
          (response.app_config.replace("https://","fins://").replace("http://","fin://")),
          function(app) {
            app.run(function(){

            });
          },
          function(error) {
            console.error("Failed to create app from manifest: ", error);
          }
        );*/
      }
    } catch (err) {
      console.log(err);
    }
  };

function toContextString(ctx){
  /*** 
   this: {
    object:"fdc3-context",
    data:[
      {name:"ibm",
       type:"security",
       id:{
         ticker:"ibm"
       }},
       {name:"apple",
       type:"security",
       id:{
         ticker:"aapl",
         RIC:"aapl.n"
       }}
    ]
  } 

  becomes this:
  ?intent=chart.show&context-name=ibm,apple&context-type=security,security&ibm-ticker=ibm&aapl-ticker=aapl&appl-RIC=aapl.n
  ***/

  let context = "";
  if (ctx.data && ctx.data.length){
    //filter out the item names and build into one list
    //let names = ctx.data.map()
    //filter out the item types and build into one list
    //for each name, append the identifier n/v with name as a prefix
  }
  return context;
}

  function fetchJson(url, method, headers) {
    return new Promise((resolve, reject) => {
      const myInit = {
        method: method,
        headers: headers
      };
      fetch(url, myInit)
        .then(response => {
          console.log("response", response);
          const contentType = response.headers.get("content-type");

          if (response.status !== 200) {
            reject(err);
            return;
          }
          console.log(contentType);
          if (contentType && contentType.includes("application/json")) {
            console.log("Stop");
            return response.json();
          } else {
            resolve();
          }
        })
        .then(data => {
          console.log("data", data);
          resolve(data);
        })
        .catch(err => {
          console.log("error ", err);
          reject(err);
        });
    });
  }
});
