package com.sleepkqq.application.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api")
public class SearchController {

    @PostMapping("/search")
    public Map<String, String> processText(@RequestBody String text) {
        if (text.equals(""))
            return new HashMap<>();
        return someTextProcessingMethod(text);
    }

    private static Map<String, String> someTextProcessingMethod(String text) {
        Map<String, String> resultList = new HashMap<>();
        try {
            Document document = Jsoup.connect(String.format("https://www.google.com/search?q=%s", text.replaceAll(" ", "+"))).get();
            Elements elements = document.select(".yuRUbf");
            for (Element element : elements) {
                Element linkElement = element.select("a[jsname=UWckNb]").first();
                Element title = element.select("h3[class=LC20lb MBeuO DKV0Md]").first();
                if (title != null && linkElement != null)
                    resultList.put(title.text(), linkElement.attr("href"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultList;
    }
}
