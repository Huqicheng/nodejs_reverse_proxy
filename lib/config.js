module.exports = {
	targets: [
		"http://localhost:3001",
		"http://localhost:3002"
	],

	balancer: "ip_hash",

	port: 3000
}