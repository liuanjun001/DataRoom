package com.DataRoom.common;

import java.util.Arrays;
import java.util.Map;

import org.apache.http.client.config.AuthSchemes;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

public class HttpUtil {
	public static HttpUtil getInstance() {
		return new HttpUtil();
	}
	/**
	 * 不带参数的get请求，如果状态码为200，则返回body，如果不为200，则返回null
	 * 
	 * @param url
	 * @return
	 * @throws Exception
	 */
	public String doGet(String url)   {
		try {
			CloseableHttpClient httpClient = HttpClientBuilder.create().build();

			// 声明 http get 请求
			HttpGet httpGet = new HttpGet(url);
			RequestConfig defaultRequestConfig = RequestConfig.custom().setCookieSpec(CookieSpecs.BEST_MATCH)
					.setExpectContinueEnabled(true).setStaleConnectionCheckEnabled(true)
					.setTargetPreferredAuthSchemes(Arrays.asList(AuthSchemes.NTLM, AuthSchemes.DIGEST))
					.setProxyPreferredAuthSchemes(Arrays.asList(AuthSchemes.BASIC)).build();
			RequestConfig config = RequestConfig.copy(defaultRequestConfig).setSocketTimeout(5000).setConnectTimeout(5000)
					.setConnectionRequestTimeout(5000).build();

			// 装载配置信息
			httpGet.setConfig(config);

			// 发起请求
			CloseableHttpResponse response = httpClient.execute(httpGet);

			// 判断状态码是否为200
			if (response.getStatusLine().getStatusCode() == 200) {
				// 返回响应体的内容
				return EntityUtils.toString(response.getEntity(), "UTF-8");
			}	
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return null;
	}

	/**
	 * 带参数的get请求，如果状态码为200，则返回body，如果不为200，则返回null
	 * 
	 * @param url
	 * @return
	 * @throws Exception
	 */
	public String doGet(String url, Map<String, Object> map) throws Exception {
		URIBuilder uriBuilder = new URIBuilder(url);

		if (map != null) {
			// 遍历map,拼接请求参数
			for (Map.Entry<String, Object> entry : map.entrySet()) {
				uriBuilder.setParameter(entry.getKey(), entry.getValue().toString());
			}
		}

		// 调用不带参数的get请求
		return this.doGet(uriBuilder.build().toString());

	}

}
