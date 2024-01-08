# Terminal Dev Project
## Stack Used: 
Frontend: Next JS\
Styling: Tailwind CSS\
Backend: Flask, Python\
Chart Representation: ReCharts\
API handling: Axios\
Pre processing on backend: Pandas\

## How to Run the Application: 
### Description
The homepage is implemented and fully responsive it gives an OS like look with a sidebar.
It is fully responsive. Routing hasn't been implemented. Therefore the terminal can be accessed by "/terminal"
in the URL. The terminal provides a basic look and is not responsive. Available Commands can be seen and executed. 

### Running the Draw Command: 
The template of the Draw Command is draw "filename" "Col1,Col2,Col3".
Col1 represents the x-axis. Col2 onwards represents the data that needs to be represented on the y-axis.
The condition I have assumed for y-axis is that all the columns must have the same data type. Otherwise the 
backend returns an error message. Message handling is not done on the frontend. 
Working Condition Tested: 
draw solana_historical_data.csv date,price,open 
If there are spaces in the file name replace them with underscore('_') as in the functionality the string is 
firstly split on spaces. Then the underscores are removed from the file name. Also comma(,) is used to 
split the columns required from the file. 

### Other commands
Use help command to see other available commands
