package com.gf.nbop.plat.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


/**
 * @author xuxianming@gf.com.cn
 *
 */
@SpringBootApplication
@ComponentScan
public class DevApp {

	public static void main(String[] args) {
		SpringApplication.run(DevApp.class, args);
	}
}
