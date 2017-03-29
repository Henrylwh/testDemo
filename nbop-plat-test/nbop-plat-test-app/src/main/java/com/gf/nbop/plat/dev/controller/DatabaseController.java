package com.gf.nbop.plat.dev.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gf.nbop.plat.dev.model.BookModel;
import com.gf.nbop.plat.dev.service.BookService;


@RestController
@RequestMapping(value = "/test/book")
public class DatabaseController {
	
	@Autowired
	BookService bookService;
	
	
	@RequestMapping(value = { "/addBook" }, method = RequestMethod.POST)
	@ResponseBody
	public JSONObject addBook(String bookValues) {
		JSONObject questJson=JSONObject.parseObject(bookValues);
		
		BookModel bookModel= (BookModel)JSONObject.toJavaObject(questJson,BookModel.class);
		
		
		int result=bookService.addBook(bookModel);
		JSONObject resultJson = new JSONObject();
		
		if(result==0)
		{
			resultJson.put("errorNo", "0");
		    resultJson.put("errorInfo", "");
		    resultJson.put("success",true);
		}
		else
		{
			resultJson.put("errorNo", "1");
		    resultJson.put("errorInfo", "该id已存在。");
		    resultJson.put("success",false);
		}
	
		return resultJson;
	}
	
	@RequestMapping(value = { "/updateBook" }, method = RequestMethod.POST)
	@ResponseBody
	public JSONObject updateBook(String bookValues) {
		
		JSONObject questJson=JSONObject.parseObject(bookValues);
		BookModel bookModel= (BookModel)JSONObject.toJavaObject(questJson,BookModel.class);
		
		int result=bookService.updateBook(bookModel);
		JSONObject resultJson = new JSONObject();
		
		if(result==0)
		{
			resultJson.put("errorNo", "0");
		    resultJson.put("errorInfo", "更新成功");
		    resultJson.put("success",true);
		}
		else
		{
			resultJson.put("errorNo", "1");
		    resultJson.put("errorInfo", "该id不存在。");
		    resultJson.put("success",false);
		}
	
		return resultJson;
	}
	
	@RequestMapping(value = { "/deleteBook" }, method = RequestMethod.POST)
	@ResponseBody
	public JSONObject deleteBook(String idString) {
		JSONObject questJson=JSONObject.parseObject(idString);
		int id=questJson.getIntValue("id");
		int result=bookService.deleteBook(id);
		JSONObject resultJson = new JSONObject();
		
		if(result==0)
		{
			resultJson.put("errorNo", "0");
		    resultJson.put("errorInfo", "删除成功");
		    resultJson.put("success",true);
		}
		else
		{
			resultJson.put("errorNo", "1");
		    resultJson.put("errorInfo", "该id不存在。");
		    resultJson.put("success",false);
		}
	
		return resultJson;
	}
	
	@RequestMapping(value = { "/getBookList" }, method = RequestMethod.POST)
	@ResponseBody
	public JSONObject getBookList() {
		List<BookModel> resultList=bookService.getBookList();
		
		JSONArray jsonArray = (JSONArray) JSONArray.toJSON(resultList); 
	    
	    JSONObject resultJson = new JSONObject();  
	    resultJson.put("totalProperty", resultList.size());
	    resultJson.put("root",jsonArray);
	    
	    return resultJson;
	}
	
}
