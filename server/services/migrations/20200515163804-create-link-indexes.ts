// @ts-ignore
let dbm;
// @ts-ignore
let type;
// @ts-ignore
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  // This will ensure one user does not have duplicate urls
  db.addIndex("links", "userId_url", ["userId", "url"], true);
  return null;
};

exports.down = function(db) {
  db.dropCollection("links", (error) => {
    console.log(error);
  });
  return null;
};

exports._meta = {
  "version": 1
};
