exports.HashTable = function HashTable(hash_func) {
    this.table = [];
    this.hash_func = hash_func;
}

// insert into HashTable
HashTable.prototype.put = function(key,value){
    this.table[this.hash_func(key)] = value;
    return this.hash_func(key);
}

// delete an element
HashTable.prototype.remove = function(key){
    this.table[this.hash_func(key)] = undefined;
}

// get an element
HashTable.prototype.get = function(key){
    return this.table[this.hash_func(key)];
}