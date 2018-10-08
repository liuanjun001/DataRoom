package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

import com.DataRoom.common.RobotTools;



//@MapperScan("com.robot.monitor.model.mapper")
@SpringBootApplication
@ServletComponentScan

public class Ibase2Application {
    

	public static void main(String[] args) {
		
		SpringApplication.run(Ibase2Application.class, args);
		RobotTools.ScanServiceClass(null);
		RobotTools.ScanJobClass(null);
	}
}
