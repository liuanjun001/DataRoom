package com;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import com.Ibase2Application;
import com.DataRoom.common.RobotTools;
public class SpringBootSampleApplication extends SpringBootServletInitializer {
//    private static final Logger logger = LoggerFactory.getLogger(SpringBootSampleApplication.class);

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    		RobotTools.ScanServiceClass(null);
    		RobotTools.ScanJobClass(null);
    	return builder.sources(Ibase2Application.class);
    }
}
