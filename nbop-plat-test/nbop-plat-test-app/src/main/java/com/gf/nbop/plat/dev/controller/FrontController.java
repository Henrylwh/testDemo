package com.gf.nbop.plat.dev.controller;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.gf.nbop.plat.dev.service.BookService;

@RestController
@RequestMapping(value = "/dev/front")
public class FrontController {
	
	@Autowired
	BookService commonService;

	
	@RequestMapping(value = { "/script/tree.json" }, method = RequestMethod.GET)
	@ResponseBody
	public String getTreeJson() {

		String fullFileName = "classpath:static/script/frame/tree.json";
        
        //File file = new File(fullFileName);
		File file = new File(FrontController.class.getClassLoader().getResource("static/script/frame/tree.json").getFile());
		
		PathMatchingResourcePatternResolver patternResolver = new PathMatchingResourcePatternResolver();  
		Resource resource = patternResolver.getResource("/static/script/frame/tree.json");
		
		InputStream is=this.getClass().getResourceAsStream("/static/script/frame/tree.json"); 

		//File file=ResourceUtils.getFile("classpath:static/script/tree.json");
		
        Scanner scanner = null;
        StringBuilder buffer = new StringBuilder();
        try {
        	
           // scanner = new Scanner(file, "utf-8");
           //scanner = new Scanner(resource.getFile(), "utf-8");
        	scanner = new Scanner(is, "utf-8");
            while (scanner.hasNextLine()) {
                buffer.append(scanner.nextLine());
            }
            return buffer.toString();
 
        } finally {
            if (scanner != null) {
                scanner.close();
            }
        }
        //System.out.println(buffer.toString());
	}

}