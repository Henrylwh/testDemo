
1、本程序为示例程序；
2、本程序基于spring boot开发，jdk版本为 jdk1.8；
3、运行方式为：
  1）需要按照jdk1.8，maven
  2）在nbop-plat-test-app目录下运行：mvn spring-boot:run
  3）用mvn package打包，生成nbop-plat-test-app.jar文件；
    然后使用 java -jar nbop-plat-test-app.jar运行。
    
    访问地址为：http://127.0.0.1:8080/

接口说明：
本程序共包含4个接口：
http://127.0.0.1:8080/test/book/getBookList  POST方式调用   获取book列表，该接口第一次调用时会初始化数据
http://127.0.0.1:8080/test/book/addBook      POST方式调用   新增book数据
http://127.0.0.1:8080/test/book/updateBook   POST方式调用   更新book数据
http://127.0.0.1:8080/test/book/deleteBook   POST方式调用   删除book数据

一个book数据，包含如下信息
{id: "编号：int型", name: "书名：String型", author: "作者:String型", year: "发行年份：int型", digest: "摘要：String型"}
其中id是主键

接口1：http://127.0.0.1:8080/test/book/getBookList
请求方式：POST
请求参数：无
返回结果：json字符串，例子如下：
{
  "root": [
    {
      "year": 2013,
      "author": "赵卓",
      "digest": "Selenium是ThoughtWorks公司开发的Web自动化测试工具。Selenium可以直接在浏览器中运行，支持Windows、Linux和Macintosh平台上的Internet Explorer、Mozilla和Firefox等浏览器，得到了广大Web开发和测试人员的应用。 ",
      "name": "Selenium自动化测试指南",
      "id": 5
    },
    {
      "year": 2016,
      "author": "詹姆斯·特恩布尔（James Turnbull）",
      "digest": "Docker是一个开源的应用容器引擎，开发者可以利用Docker打包自己的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的Linux机器上，也可以实现虚拟化。",
      "name": "第一本Docker书 修订版",
      "id": 4
    },
    {
      "year": 2011,
      "author": "许晓斌",
      "digest": "本书是国内第一本公开出版的Maven专著。它内容新颖，基于*发布的Maven 3.0，不仅详尽讲解了Maven 3.0的所有新功能和新特性。",
      "name": "Maven实战",
      "id": 3
    },
    {
      "year": 2016,
      "author": "Craig Walls 沃尔斯",
      "digest": "《Spring实战（第4版）》是经典的、畅销的Spring学习和实践指南。 第4版针对Spring 4进行了全面更新。",
      "name": "Spring实战（第4版）",
      "id": 2
    }
  ],
  "totalProperty": 4
}

接口2：http://127.0.0.1:8080/test/book/addBook
请求方式：POST
请求参数：bookValues，示例如下：
{id: "6", name: "Jenkins权威指南", author: "John Ferguson Smart", year: "2016", digest: "John Ferguson Smart，Wakaleo Consulting的主管。"}
返回结果：json字符串，例子如下：

调用成功：
{
  "errorNo": "0",
  "success": true,
  "errorInfo": ""
}
调用失败：
{
  "errorNo": "1",
  "success": false,
  "errorInfo": "该id已存在。"
}

接口3：http://127.0.0.1:8080/test/book/updateBook
请求方式：POST
请求参数：bookValues，示例如下：
{id: "4", name: "第一本Docker书 修订版", author: "James Turnbull", year: "2016", digest: "这是一本好书"}
返回结果：json字符串，例子如下：

调用成功：
{
  "errorNo": "0",
  "success": true,
  "errorInfo": "更新成功"
}
调用失败：
{
  "errorNo": "1",
  "success": false,
  "errorInfo": "该id不存在。"
}


接口4：http://127.0.0.1:8080/test/book/deleteBook
请求方式：POST
请求参数：idString，示例如下：
 {id: "3"}
返回结果：json字符串，例子如下：

调用成功：
{
  "errorNo": "0",
  "success": true,
  "errorInfo": "删除成功"
}
调用失败：
{
  "errorNo": "1",
  "success": false,
  "errorInfo": "该id不存在。"
}