package com.gf.nbop.plat.dev.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@RequestMapping({"/","/index"})
	public String index(HttpServletResponse response){
		return "index";
	}
	
}
