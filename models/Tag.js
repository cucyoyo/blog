const Model = require('./Model')

class Tag extends Model {

    /**
     * Construct post model
     * @param {*} driver
     * @param {*} id
     * @param {*} title
     * @param {*} content
     * @param {*} createTime
     */
    constructor(driver, id=null, name=null){
        super(driver)
        this.id = id
        this.name = name
    }

    /**
     * Get one post by id
     * @param {*} driver
     * @param {*} id
     * @param {*} callback
     */
    static get(driver, id, callback){
        driver.get(this._getTableName(), "id=?", [id], (result) => {
            if(result){
                callback(new Tag(driver, result.id, result.name))
            } else {
                callback(false)
            }
        })
    }

    /**
     * Delete a post
     * @param {*} callback
     */
    delete(callback){
        this._driver.delete(Tag._getTableName(), "id=?", [this.id], (result) => {
            if(result){
                callback(true)
            } else {
                callback(false)
            }
        })
    }

    /**
     * Update a blog post
     * @param {*} title
     * @param {*} content
     * @param {*} callback
     */

    // update(name, callback){
    //     this._driver.update(Tag._getTableName(), "name=?", "id=?", [name, this.id], (result) => {
    //         if(result){
    //             callback(true)
    //             this.name = name
    //         } else {
    //             callback(false)
    //         }
    //     })
    // }

    /**
     * Get all posts
     * @param {*} driver
     * @param {*} callback
     */
    static all(driver, callback){
        driver.select(this._getTableName(), "1=?", [1], (result) => {
            if(result){
                let objectArr = []
                for(let i in result){
                    let post = result[i]
                    let currObj = new Tag(driver, post.id, post.name)
                    objectArr.push(currObj)
                }
                callback(objectArr)
            } else {
                callback([])
            }
        })
    }

    /**
     * Static method to get table name
     */
    static _getTableName(){
        return "tags"
    }
}

module.exports = Tag