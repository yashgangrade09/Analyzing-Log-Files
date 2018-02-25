To run the program on the localhost server, use server_localhost.js
To run the node.js server locally, use "node server_localhost" command in the terminal.

server.js file is modified so as to make it compatible with AWS. Link: http://logfilestatistics1-env.tf3zpfkjgg.us-east-2.elasticbeanstalk.com/

index.html contains the first page where the user is asked to upload and submit a file. 
Logstats.html is the second page which shows the statistics in a tabular format, a pie chart depicting the same statistics, and a link to the source code (redirects to github repository).

There is a file called 'LogStats.java', it is not being used anywhere in the hosting and process. It's a standalone file to show statistics by running the single program in java. 