package com.gf.nbop.plat.dev.service;

import java.util.List;

import com.gf.nbop.plat.dev.model.BookModel;

public interface BookService {
	int addBook(BookModel bookModel);
	int updateBook(BookModel bookModel);
	int deleteBook(int id);
	List<BookModel> getBookList();
	
}
