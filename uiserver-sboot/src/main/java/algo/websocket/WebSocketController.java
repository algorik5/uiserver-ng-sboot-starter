package algo.websocket;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import util.CountMap;
import util.DateUtil;
import util.Log;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.scheduling.annotation.Scheduled;

//@Controller
@RestController
@RequestMapping("/websocket")
public class WebSocketController {

	@Autowired
	private SimpMessagingTemplate stomp;//SimpMessageSendingOperations impl
	
	Gson gson = new Gson();
	long count = 0;
	
	@MessageMapping("/hello") //toserver/hello
    //@SendTo("/server/hello") //convertAndSend사용
	public void hello(@Payload String message) throws Exception {
		count++;
		Log.log("------------------- hello start # "+ message);
		Map map = gson.fromJson(message, Map.class);
		map.put("reply","ok-"+ count);
		Log.log("\t --- hello map # "+ map);
		//if(1==1) throw new Exception("xxx");//에러생겨도 /topic/hello로 리턴됨 
		stomp.convertAndSend("/toclient/hello", gson.toJson(map));
		CountMap.addCount("hello",1);
	}

	@Scheduled(fixedRate = 10000)
	public void hellotimer() throws Exception {
		count++;
		//Log.log("------------------- hellotimer start # ");
		Map map = new LinkedHashMap();
		map.put("count",count);
		map.put("time",DateUtil.currentDate());
		map.put("msg","timer");
		stomp.convertAndSend("/toclient/timer", gson.toJson(map));
		//Log.log("\t --- hellotimer map # "+ map);
		CountMap.addCount("timer",1);
		
		testappdata();
	}
	
	private void testappdata()
	{
		List list = new ArrayList();
		for(int i=0;i<3;i++)
		{
			Map map = sendGAP(i);
			stomp.convertAndSend("/toclient/appdata", gson.toJson(map));
			//Log.log("\t --- GAP_DATA # "+ map);
			CountMap.addCount("appdata/GAP",1);

			Map map2 = makeAGENT_PROCESS(i);
			list.add(map2);
		}
		
		Map map = new LinkedHashMap();
		map.put("_type_","xx.xx.xx.xx.xx.PROCESS_DATA");
		map.put("datas", list);
		stomp.convertAndSend("/toclient/appdata", gson.toJson(map));
		//Log.log("\t --- PROCESS_DATA # "+ map);
		CountMap.addCount("appdata/PROC",1);

	}
	private Map makeAGENT_PROCESS(int i)
	{
		Map map = new LinkedHashMap();
		map.put("process","process-"+i);
		map.put("host","host-"+i);
		map.put("time",DateUtil.currentDate());
		map.put("cpu",i*2);
		map.put("memory",i*3);
		return map;
	}
	private Map sendGAP(int i)
	{
		Map mapgap = new LinkedHashMap();
		mapgap.put("SRT",i);
		mapgap.put("END",i+1);
		mapgap.put("ERR",i+2);
		
		Map maptotal = new LinkedHashMap();
		maptotal.put("SRT",i);
		maptotal.put("END",i+10);
		maptotal.put("ERR",i+20);
		
		Map map = new LinkedHashMap();
		map.put("_type_","xx.xx.xx.xx.xx.GAP_DATA");
		map.put("GAP",mapgap);
		map.put("TOTAL",maptotal);
		
		String app = "app-"+i;
		map.put("app",app);
		map.put("ver","v-"+i);
		map.put("count",count);
		map.put("time",DateUtil.currentDate());
		
		return map;
	}
	
	
	
	
	
	
	
	
	//http://localhost:8080/websocket/hellorest?msg=aaa
	@RequestMapping(value = "/hellorest", method = RequestMethod.GET)
	@ResponseBody
	public String hellorest(String msg) {
		count++;
		Log.log("------------------- hellorest start # "+ msg);
		Map map = new LinkedHashMap();
		map.put("count",count);
		map.put("time",DateUtil.currentDate());
		map.put("msg",msg);
		String json = gson.toJson(map);
		this.stomp.convertAndSend("/toserver/hello", json);//stomp send
		CountMap.addCount("hellorest",1);
	    return json;//rest리턴
	}

	@MessageExceptionHandler
	//@MessageMapping("/errors")
	//@SendTo("/errors")
	//@SendToUser("/errors")
    public String handleException(Throwable exception) {
		Log.log("------------------- handleException start # "+ exception);
		exception.printStackTrace();
		//명시적으로 convertAndSend 해야하는 군...
		this.stomp.convertAndSend("/server/errors", exception.getMessage());
		CountMap.addCount("errors",1);
	    return exception.getMessage();
    }

}