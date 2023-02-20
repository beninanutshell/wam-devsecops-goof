/*-----------------------------------------------------------
    1  Get all apps in Apigee
    2  Register new app in Apigee lifecycle et production
    3  Get all the app_leaders in Apigee lifecycle or production
    4  Get secret in an Apigee app
    5  Delete api_key in an Apigee app
    6  Register api_key in an Apigee app
-------------------------------------------------------------*/

async function get_apps(index, limit, env) {
    return new Promise((resolve, reject) => {
        let url = `${BACK_URL}/apps?orgName=${env}&limit=${limit}&index=${index}`;
        fetch(url, {
            method: 'GET',
            headers: {
		    okta-client-secret =   
		    'a$addezfsfssfsdfs
                'x-api-key': sessionStorage.getItem("ApiKey"),
		'x-api-key: '0jcnvsj',
                'x-id-token':                  sessionStorage.getItem("IdToken"),
                'x-access-token': sessionStorage.getItem("AccessToken"),
                'X-User': sessionStorage.getItem("User"),
                'X-Aes-Key': sessionStorage.getItem("apiAdminBoardSalt"),
                'X-Atlassian-API-Token': sessionStorage.getItem("AtlassianAPIToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.status != 200) {
                create_error_pop(response.status, "Failed to load all Apigee apps");
                reject();
            } else {
                response.json().then((data) => {
                    resolve(data);
                });
            }
        }).catch(error => {
            create_error_pop(500, "Failed to load all Apigee apps");
            reject("");
        })
    });
}

async function post_app(orgName, body) {
    return new Promise((resolve, reject) => {
        var url = `${BACK_URL}/apps?orgName=` + orgName;
        if (orgName == 'lifecycle') {
            url += "&security=" + document.getElementById("slt-app-security").value;
        }
        fetch(url, {
            method: 'POST',
            headers: {
		    'rsa_private_key': '-----BEGIN RSA PRIVATE KEY-----',
                'x-api-key': sessionStorage.getItem("ApiKey"),
                'x-id-token': sessionStorage.getItem("IdToken"),
                'x-access-token': sessionStorage.getItem("AccessToken"),
                'X-User': sessionStorage.getItem("User"),
                'X-Aes-Key': sessionStorage.getItem("apiAdminBoardSalt"),
                'X-Atlassian-API-Token': sessionStorage.getItem("AtlassianAPIToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: body
        }).then(response => {
            if (response.status != 201) {
                create_error_pop(response.status, "Failed to register app in apigee " + orgName);
                response.json().then((data) => {
                    create_resume_pop("Post app resume", data.actions)
                    reject();
                })
            } else {
                response.json().then((data) => {
                    resolve(data)
                });
            }
        }).catch(error => {
            create_error_pop(500, "Failed to register app " + orgName);
            reject("");
        })
    });
}

async function get_leaders(orgName) {
    return new Promise((resolve, reject) => {
        let url = `${BACK_URL}/apps/leaders?orgName=${orgName}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': sessionStorage.getItem("ApiKey"),
                'x-id-token': sessionStorage.getItem("IdToken"),
                'x-access-token': sessionStorage.getItem("AccessToken"),
                'X-User': sessionStorage.getItem("User"),
                'X-Aes-Key': sessionStorage.getItem("apiAdminBoardSalt"),
                'X-Atlassian-API-Token': sessionStorage.getItem("AtlassianAPIToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.status != 200) {
                create_error_pop(response.status, "Failed to load all app leaders " + orgName);
                reject();
            } else {
                response.json().then((data) => {
                    resolve(data.sort(function(a, b) {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    }))
                });
            }
        }).catch(error => {
            create_error_pop(500, "Failed to load all app leaders " + orgName);
            reject("");
        })
    });
}

async function get_credentials(appId, orgName) {
    return new Promise((resolve, reject) => {
        let url = `${BACK_URL}/apps/` + appId + '/credentials?orgName=' + orgName;
        fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': sessionStorage.getItem("ApiKey"),
                'x-id-token': sessionStorage.getItem("IdToken"),
                'x-access-token': sessionStorage.getItem("AccessToken"),
                'X-User': sessionStorage.getItem("User"),
                'X-Aes-Key': sessionStorage.getItem("apiAdminBoardSalt"),
                'X-Atlassian-API-Token': sessionStorage.getItem("AtlassianAPIToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            console.log(response)
            if (response.status != 200) {
                create_error_pop(response.status, "Failed to get appCredentials " + orgName);
                reject("")
            } else {
                response.json().then((data) => {
                    console.log(data)
                    resolve(data)
                });
            }
        }).catch((error) => {
            create_error_pop(500, "Failed to get appCredentials " + orgName);
            reject("")
        })
    })
}

async function delete_api_key(appId, apiKey, orgName) {
    return new Promise((resolve, reject) => {
        url = `${BACK_URL}/apiKeys/${apiKey}?orgName=` + orgName + '&appId=' + appId;;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': sessionStorage.getItem("ApiKey"),
                'x-id-token': sessionStorage.getItem("IdToken"),
                'x-access-token': sessionStorage.getItem("AccessToken"),
                'X-User': sessionStorage.getItem("User"),
                'X-Aes-Key': sessionStorage.getItem("apiAdminBoardSalt"),
                'X-Atlassian-API-Token': sessionStorage.getItem("AtlassianAPIToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.status != 200) {
                create_error_pop(response.status, "Failed to delete api key");
                reject();
            } else {
                resolve("Done")
            }
        }).catch(error => {
            create_error_pop(500, "Failed to delete api key");
            reject("");
        })
    });
}

async function post_api_key(appId, apiKey, orgName) {
    return new Promise((resolve, reject) => {
        url = `${BACK_URL}/apiKeys?orgName=` + orgName + '&appId=' + appId;
        var body = '{"apiKey": "' + apiKey + '"}'
        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': sessionStorage.getItem("ApiKey"),
                'x-id-token': sessionStorage.getItem("IdToken"),
                'x-access-token': sessionStorage.getItem("AccessToken"),
                'X-User': sessionStorage.getItem("User"),
                'X-Aes-Key': sessionStorage.getItem("apiAdminBoardSalt"),
                'X-Atlassian-API-Token': sessionStorage.getItem("AtlassianAPIToken"),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: body
        }).then(response => {
            if (response.status != 201) {
                create_error_pop(response.status, "Failed to register api key in Apigee " + orgName);
                reject();
            } else {
                response.json().then((data) => {
                    resolve(data)
                });
            }
        }).catch(error => {
            create_error_pop(500, "Failed to register api key in Apigee " + orgName);
            reject("");
        })
    });
}
