fin.desktop.main(function() {
  if (typeof fin.plugin === "undefined") {
    fin.plugin = {};
  }
  fin.plugin.open = async function(name, context) {
    try {
      const headers = new Headers();
      const response = await fetchJson(
        `https://open-app-directory-dev.openfin.co/api/v1/apps/${name}`,
        "GET",
        headers
      );
      console.log(response);

      if (response.active) {
          let url = (response.app_config.replace("https://","fins://").replace("http://","fin://"));
          if (context){
              url = url + "?$$context=" + context;
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
