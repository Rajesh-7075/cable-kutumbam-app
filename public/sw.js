let cacheData = "appV1";

var resourcesToCache = [
    '/',
    '/static/js/main.chunk.js',
    '/static/js/bundle.js',
    '/index.html',
    '/static/js/vendors~main.chunk.js',
    '/favicon.ico',
    '/manifest.json',
    '/static/css/splash.css',
   

    '/static/js/jquery.slim.min.js'




];


this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll(resourcesToCache)
        })
        .catch(err=>console.log(err))

    )
})

this.addEventListener("fetch", (event) =>{
        if(!navigator.onLine){
            event.respondWith(
                caches.match(event.request).then((resp)=>{
                    if(resp){
                        return resp
                    }
                    let requestUrl = event.request.clone();
                    fetch(requestUrl)
                })
            )
        }


  
})





