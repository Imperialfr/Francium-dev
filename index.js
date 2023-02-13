import http from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import BareServer from '@tomphttp/bare-server-node';
import Static from 'node-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bare = new BareServer('/bare/', {
	logErrors: false,
	localAddress: undefined,
	maintainer: {
		email: 'tomphttp@sys32.dev',
		website: 'https://github.com/tomphttp/',
	},
});

const serve = new Static.Server(join(__dirname, 'public'), {headers: {"Service-Worker-Allowed": '/'}});

const server = http.createServer();

server.on('request', (request, response) => {
  
	// replit.com support
	request.url = request.url.replace('https://', 'https:/').replace('https:/', 'https://');

	if (bare.shouldRoute(request)) return bare.routeRequest(request, response);

	if (request.url.startsWith('/service/')) {
		// register serviceworker if it does not exist
		if (0) response.end(`<script>
if ('serviceWorker' in navigator) {
var worker = navigator.serviceWorker.register('/sw.js?${Math.round(Math.random()*(899999)+100000)}', {
scope: '/service',
}).then(() => {
location.reload();
var background = document.createElement('style'); background.setAttribute(' body {background-color: black;}')

});
}
</script>`);
	} else {
		serve.serve(request, response);
	}
});

server.on('upgrade', (req, socket, head) => {
	// websockets
	if (bare.shouldRoute(req)) return bare.routeUpgrade(req, socket, head);
	socket.end();
});

server.listen(process.env.PORT || 80);
