<template>
  <div>
    <div  class="panel panel-default">
      <div class="panel-body">
        <h3>博客标题das</h3>
        <p class="info">信息sf  </p>
        <!--<p class="des">文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述文章描述 </p>-->
        <!--<div v-html="c"></div>-->
        <!--<div v-html="d"></div>-->
        <div class="blog-detail">
          <img src=".././assets/img/4.jpg" alt="img">
          运行项目：
          Npm i
          Node app.js

          Sqlite
          项目本身不需要数据库的服务
          // const db         = new sqlite3.Database(':memory:')  保存在内存中
          const db         = new sqlite3.Database('dd.db') 保存在文件中

          运行项目本身不需要做以下操作，以下sqlite环境和可视化只是为了更好地管理项目中的数据

          在 Windows 上安装 SQLite
          • 请访问 SQLite 下载页面，从 Windows 区下载预编译的二进制文件。
          • 您需要下载 sqlite-tools-win32-*.zip 和 sqlite-dll-win32-*.zip 压缩文件。
          • 创建文件夹 C:\sqlite，并在此文件夹下解压上面两个压缩文件，将得到 sqlite3.def、sqlite3.dll 和 sqlite3.exe 文件。
          • 添加 (sqlite3.exe所在的文件夹) 到 PATH 环境变量，最后在命令提示符下，使用 sqlite3 命令，将显示如下结果。
          C:\>sqlite3
          SQLite version 3.7.15.2 2013-01-09 11:53:05
          Enter ".help" for instructions
          Enter SQL statements terminated with a ";"
          sqlite>

          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html
          来自 http://www.runoob.com/sqlite/sqlite-installation.html


          【免费且保持更新】
          1、SQLiteSpy  免费 单文件
          http://www.yunqa.de/delphi/doku.php/products/sqlitespy/
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          截至2012/9/14最新版本 SQLiteSpy 1.9.1 – 28 Jul 2011
          单文件，界面设计紧凑，较稳定,功能较少，创建表与添加数据均需sql语句，快捷键教方便，
          作为数据浏览和修改工具极佳，视图编码为utf-8，对gbk2312显示乱码。
          能满足一般的应用，但没有导出数据表功能，
          同时只能打开一个数据库文件
          不支持二进制字段编辑

          来自 https://blog.csdn.net/shellching/article/details/7979969

        </div>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        a: 'aaaaaaaaaaaaa',
        c: '## nihao' +
        '- xuanxiang1' +
        '- xuanxiang2' +
        '`var a = 1`',
        d: '<p style="color:red">nihaonihao</p>'
      }
    }
  }
</script>

<style lang="less" scoped>
.panel {
  .panel-body {
    .info {
      margin: 15px 0;
    }
    .blog-detail {
      line-height: 30px;
      img{
        width: 100%;
      }
    }
  }
}
</style>
