module.exports = {

	targets: [
		{protocol: "http", host: "localhost:3001"},
		{protocol: "http", host: "localhost:3002"}
	],

	balancer: "ip_hash",

	port: 3000
}