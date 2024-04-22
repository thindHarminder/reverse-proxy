# Reverse Proxy
by [thind.dev](https://thind.dev) </br>
based on the finsweet reverse proxy

## Setup Proxy
Follow these steps to setup the proxy.

### 1. Clone this repo
``` gh repo clone thindHarminder/reverse-proxy ```

### 2. Install depensdencies 
``` npm i ```

### 3. Install thind CLI
This is a CLi from @thindHarminder that will help you setup and configure the proxy
``` npm i -g thind ```

### 4. Start proxy setup
This command will ask you questions to configure your proxy and setup root storage in Cloudflare R2
``` thind proxy --setup ```

### 5. Build Sitemap Index (optional)
This is the main sitemap that you can submit in the search console. YOu can see this as Sitemapo for sitmaps.
``` thind proxy --sitemap ```

### 6. Deploy proxy
This will publish the Cloudflare worker and configure all routes and custom domains
``` thind proxy --deploy ```

> Make sure the domain you are using to setup this worker is available in Cloudflare, if not the proxy will not be published


## Uploading Root Files
These are files that you can access from the root of your domain. 

## 1. Create a files
Create any file in the root folder of this repo and save it with a uniqe name

## Upload file to root storage
This command will upload the file sected to linked Cloudflare R2 storage
``` thind proxy --upload ```
