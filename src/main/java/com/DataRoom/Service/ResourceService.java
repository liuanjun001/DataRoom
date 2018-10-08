package com.DataRoom.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.DataRoom.common.ApiInfo;
import com.DataRoom.common.DBPooL;
import com.DataRoom.common.Permissions;
import com.DataRoom.common.SessionTools;

public class ResourceService {
	public SessionTools sessionTools;// session工具
    @Permissions(needLogin=true)
	@ApiInfo(comment="查询地址信息，并以树的形式返回")
	public  List  QueryAddressTree() {
		String sql="select * from energy_address order by lvl,seq";
		//从energy_address表取数据，并存在list
		List<HashMap<String, String>>  list=DBPooL.QueryTableToListMap(sql);
		List<HashMap> retList = null;
		try {
			List<HashMap> children = null;
			if (list != null && list.size() > 0) {
				retList = new ArrayList<HashMap>();
				HashMap vo = null;
				HashMap parent = null;
				HashMap parent2 = null;
				Map<String, HashMap> tempMap = new HashMap<String, HashMap>();
				//遍历list，根据父节点ID，填充children
				for (HashMap<String, String> item : list) {
					vo = new HashMap();
					vo.put("id", item.get("addressid"));
					vo.put("text", item.get("addressname") != null ? item.get("addressname") : "动环");
  					parent = tempMap.get(item.get("parentid"));
					if (parent != null) {
						children = (List<java.util.HashMap>) parent.get("children");
						if (children == null) {
							children = new ArrayList<HashMap>();
							parent.put("children", children);
						}
						children.add(vo);
						parent.put("children", children);
 					} else {
						retList.add(vo);
					}
					tempMap.put(item.get("addressid"), vo);
				}
				tempMap = null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		list = null;
		return retList;
	}
}
