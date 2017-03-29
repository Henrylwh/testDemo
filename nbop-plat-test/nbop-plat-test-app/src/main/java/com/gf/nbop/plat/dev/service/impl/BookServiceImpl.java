package com.gf.nbop.plat.dev.service.impl;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gf.nbop.plat.dev.model.BookModel;
import com.gf.nbop.plat.dev.service.BookService;

@Service("bookService")
public class BookServiceImpl implements BookService{
	
	Hashtable<Integer, BookModel> tablebdtHash= null;

	@Override
	public int addBook(BookModel bookModel) {
		int result=0;
		if(tablebdtHash.containsKey(bookModel.getId()))
		{
			result=1; //该id已存在，报错
		}
		else
		{
			tablebdtHash.put(bookModel.getId(), bookModel);
		}
		return result;
	}

	@Override
	public int updateBook(BookModel bookModel) {
		int result=0;
		if(tablebdtHash.containsKey(bookModel.getId()))
		{
			tablebdtHash.put(bookModel.getId(), bookModel);
		}
		else
		{
			result=1; //该id不存在，报错
		}
		return result;
	}

	@Override
	public int deleteBook(int id) {
		int result=0;
		if(tablebdtHash.containsKey(id))
		{
			tablebdtHash.remove(id);
		}
		else
		{
			result=1; //该id不存在，报错
		}
		return result;
	}

	@Override
	public List<BookModel> getBookList() {
		List<BookModel> list=new ArrayList<BookModel>();
		if(tablebdtHash==null)
		{
			initBookData();
		}
		for(int tid:tablebdtHash.keySet())
		{
			list.add(tablebdtHash.get(tid));
		}
		return list;
	}

	private void initBookData()
	{
		tablebdtHash=new Hashtable<Integer, BookModel>();
		BookModel bookModel=new BookModel();
		bookModel.setId(1);
		bookModel.setAuthor("汪云飞");
		bookModel.setName("JavaEE开发的颠覆者: Spring Boot实战");
		bookModel.setYear(2016);
		bookModel.setDigest("在当今Java EE 开发中，Spring 框架是当之无愧的王者。而Spring Boot 是Spring 主推的基于“习惯优于配置”的原则，让你能够快速搭建应用的框架，从而使得Java EE 开发变得异常简单。");
		tablebdtHash.put(bookModel.getId(), bookModel);
		bookModel=new BookModel();
		bookModel.setId(2);
		bookModel.setAuthor("Craig Walls 沃尔斯");
		bookModel.setName("Spring实战（第4版）");
		bookModel.setYear(2016);
		bookModel.setDigest("《Spring实战（第4版）》是经典的、畅销的Spring学习和实践指南。 第4版针对Spring 4进行了全面更新。");
		tablebdtHash.put(bookModel.getId(), bookModel);
		bookModel=new BookModel();
		bookModel.setId(3);
		bookModel.setAuthor("许晓斌");
		bookModel.setName("Maven实战");
		bookModel.setYear(2011);
		bookModel.setDigest("本书是国内第一本公开出版的Maven专著。它内容新颖，基于*发布的Maven 3.0，不仅详尽讲解了Maven 3.0的所有新功能和新特性。");
		tablebdtHash.put(bookModel.getId(), bookModel);
		bookModel=new BookModel();
		bookModel.setId(4);
		bookModel.setAuthor("詹姆斯·特恩布尔（James Turnbull）");
		bookModel.setName("第一本Docker书 修订版");
		bookModel.setYear(2016);
		bookModel.setDigest("Docker是一个开源的应用容器引擎，开发者可以利用Docker打包自己的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的Linux机器上，也可以实现虚拟化。");
		tablebdtHash.put(bookModel.getId(), bookModel);
		bookModel=new BookModel();
		bookModel.setId(5);
		bookModel.setAuthor("赵卓");
		bookModel.setName("Selenium自动化测试指南");
		bookModel.setYear(2013);
		bookModel.setDigest("Selenium是ThoughtWorks公司开发的Web自动化测试工具。Selenium可以直接在浏览器中运行，支持Windows、Linux和Macintosh平台上的Internet Explorer、Mozilla和Firefox等浏览器，得到了广大Web开发和测试人员的应用。 ");
		tablebdtHash.put(bookModel.getId(), bookModel);
	}
}
