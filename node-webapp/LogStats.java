package com.java2novice.algos;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

public class LogStats{
	
	/**
	 * <p>Application entry point</p>
	 * 
	 * @param args (not used)
	 */
	public static void main (String [] args) {
		new LogStats().report();
	}
	
	/**
	 * <it> Function returning a table with Page View statistic per user </it>
	 */
	public void report()
	{
 		Map<String,Integer> userRecord = new HashMap<String,Integer>();
		try
		{
			@SuppressWarnings("resource")
			Scanner in = new Scanner(new File("log.log"));
			for(int i = 0; i<5; i++) {
				in.nextLine();
			}
			
			//Completing the map
			while (in.hasNext())
			{
				String li = in.nextLine();
				String [] log = li.split(" ");
				String username = log[6];
				if(userRecord.containsKey(username)) {
					userRecord.replace(username, userRecord.get(username), userRecord.get(username) + 1);
				}
				else {
					userRecord.put(username, 1);
				}
			}
			
			// Sorting the map in decreasing order
			Set<Entry<String, Integer>> set = userRecord.entrySet();
	        List<Entry<String, Integer>> list = new ArrayList<Entry<String, Integer>>(set);
	        Collections.sort( list, new Comparator<Map.Entry<String, Integer>>()
	        {
	            public int compare( Map.Entry<String, Integer> o1, Map.Entry<String, Integer> o2 )
	            {
	                return (o2.getValue()).compareTo( o1.getValue() );
	            }
	        } );
	        
	        //printing out the table
	        System.out.println("User \t   Page Views");
	        System.out.println("--------------------");
	        for(Map.Entry<String, Integer> entry:list){
	            System.out.println(entry.getKey()+"\t | \t"+entry.getValue());
	        }
		}
		catch (IOException e)
		{
			System.out.println("Didn't work");
			e.printStackTrace();
		}
	}
}
