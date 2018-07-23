const SQLite3Driver = require('./SQLite3Driver')

/**
 * Default createTable callback
 * @param {*} err
 */
function defaultCreateTableCallback(result) {
  if (!result) {
    throw "Unable to create table"
  }
}

/**
 * We by default use SQLite3 migration
 * @param {*} db
 */
module.exports = (db) => {
  const driver = new SQLite3Driver(db)

  /**
   * Create table for posts
   */
  driver.createTable('posts', [
    {
      name: 'id',
      type: 'INTEGER',
      primaryKey: true,
      autoIncrement: true
    },
    {
      name: 'title',
      type: 'TEXT'
    },
    {
      name: 'desc',
      type: 'TEXT'
    },
    {
      name: 'tags',
      type: 'TEXT'
    },
    {
      name: 'img_path',
      type: 'TEXT'
    },
    {
      name: 'html_path',
      type: 'TEXT'
    },
    {
      name: 'createTime',
      type: 'TEXT'
    },
    {
      name: 'updateTime',
      type: 'TEXT'
    }
  ], defaultCreateTableCallback)

  driver.createTable('tags', [
    {
      name: 'id',
      type: 'INTEGER',
      primaryKey: true,
      autoIncrement: true
    },
    {
      name: 'name',
      type: 'TEXT'
    }
  ], defaultCreateTableCallback)

  /**
   * Create table for admin users
   */
  driver.createTable('users', [
    {
      name: 'id',
      type: 'INTEGER',
      primaryKey: true,
      autoIncrement: true
    },
    {
      name: 'username',
      type: 'TEXT'
    },
    {
      name: 'password',
      type: 'TEXT'
    },
    {
      name: 'userGroup',
      type: 'TEXT'
    }
  ], defaultCreateTableCallback)

  /**
   * Create table for auth tokens
   */
  driver.createTable('tokens', [
    {
      name: 'id',
      type: 'INTEGER',
      primaryKey: true,
      autoIncrement: true
    },
    {
      name: 'username',
      type: 'TEXT'
    },
    {
      name: 'tokenBody',
      type: 'TEXT'
    }
  ], defaultCreateTableCallback)
}