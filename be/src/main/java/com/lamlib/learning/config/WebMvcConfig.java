package com.lamlib.learning.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/css/**").addResourceLocations("classpath:/static/css/").setCachePeriod(3600);
        registry.addResourceHandler("/static/js/**").addResourceLocations("classpath:/static/js/").setCachePeriod(3600);
        registry.addResourceHandler("/static/img/**").addResourceLocations("classpath:/static/img/").setCachePeriod(3600);
        registry.addResourceHandler("/static/doc/**").addResourceLocations("classpath:/static/doc/").setCachePeriod(3600);
        registry.addResourceHandler("/static/font/**").addResourceLocations("classpath:/static/font/").setCachePeriod(3600);
        registry.addResourceHandler("/static/plugin/**").addResourceLocations("classpath:/static/plugin/").setCachePeriod(3600);
    }
}
