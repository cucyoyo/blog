const Model = require('./Model')

class Post extends Model {

    /**
     * Construct post model
     * @param {*} driver
     * @param {*} id
     * @param {*} title
     * @param {*} content
     * @param {*} createTime
     */
    constructor(driver, id=null, title=null, desc=null, tags=null, img_path=null, html_path=null, createTime=null, updateTime=null){
        super(driver)
        this.id = id
        this.title = title
        this.desc = desc
        this.tags = tags
        this.img_path = img_path
        this.html_path = html_path
        this.createTime = createTime
        this.updateTime = updateTime
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
                callback(new Post(driver, result.id, result.title, result.desc, result.tags, result.img_path, result.html_path, result.createTime, result.updateTime))
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
        this._driver.delete(Post._getTableName(), "id=?", [this.id], (result) => {
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
    update(title, tags, img_path, html_path, updateTime, callback){
        this._driver.update(Post._getTableName(), "title=?, desc=?, tags=?, img_path=?, html_path=?, updateTime=?", "id=?", [title, desc,tags, img_path, html_path, updateTime, this.id], (result) => {
            if(result){
                callback(true)
                this.title = title
                this.desc = desc
                this.tags = tags
                this.img_path = img_path
                this.html_path = html_path
                this.updateTime = updateTime
                // this.content = content
            } else {
                callback(false)
            }
        })
    }

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
                    let currObj = new Post(driver, post.id, post.title, post.desc, post.tags, post.img_path, post.html_path, post.createTime, post.updateTime)
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
        return "posts"
    }
}

module.exports = Post