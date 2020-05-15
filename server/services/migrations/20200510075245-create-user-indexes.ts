// @ts-ignore
let dbm;

// @ts-ignore
let type;

// @ts-ignore
let seed;

/**
 * Note the migrations can be only run in production mode from dist directory
 * This file will be compiled and placed in configured directory
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {

  db.addIndex("users", "username", ["username"], true);
  db.addIndex("users", "email", ["email"], true);
  db.addIndex("users", "username_email", ["username", "email"], true);

  return null;
};

exports.down = function(db) {
  db.dropCollection("users", (error) => {
    console.log(error);
  });
  return null;
};

exports._meta = {
  "version": 1
};
