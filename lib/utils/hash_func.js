// https://www.linuxidc.com/Linux/2014-02/96869.htm

module.exports = function(ip_addr, peer_num) {

	var parts = ip_addr.split(".");
	var hash = 89;

	for (i = 0; i < 3; i++) {  
    	hash = (hash*113+parseInt(parts[i], 10))%6271;
    }
    return hash % peer_num;
};