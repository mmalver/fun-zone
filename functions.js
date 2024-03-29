/* This function gets all the showdates for a given year. It returns an empty array  if there are no shows between the date passed to the function and the end of the year.
If no date is passed to the function, today is used by default. 
*/
function getShowDatesInYear(startDate = new Date()) {
dateCopy = new Date(startDate); // create copy since dates are passed by reference and don't want to corrupt data passed to this function.
showDates = [];
if (dateCopy.getDay() != 0)
 dateCopy.setDate(dateCopy.getDate() + (7 - dateCopy.getDay()));
thisYear = dateCopy.getFullYear();
while (dateCopy.getFullYear() == thisYear) {
if (dateCopy.getDate() == 27) 
  showDates.push(new Date(dateCopy));
dateCopy.setDate(dateCopy.getDate()+7)
}
return showDates;
}

/* This function accepts a date and tells you when the next show is after that date.If there are no more shows in the year of the date provided, this method will check the next year.
*/
function getNextShowDate(startDate = new Date()) {
     showDates = getShowDatesInYear(startDate);
     currentYear = startDate.getFullYear(); // this is used to keep track of the year if there are no shows left in the current year.
    while (showDates.length == 0){ // there were no shows left in current year. 
        currentYear +=1; // figure out how many shows are in the next year.
        showDates = getShowDatesInYear(new Date(currentYear,0,1));
        if (showDates.length > 0) // if we found a year containing shows
            return showDates[0]; // return the first date.
    } // end of loop.
    // if we hit this code point, we never entered the loop.
    return showDates[0];
}
// get the number of shows.
function getNumberOfShowsInYear(startDate = new Date()) {
return getShowDatesInYear(startDate).length;
}
/* convert a date to a string. If the last argument passed to this function is FALSE, month and day ir returned. If True, then month day, year.
*/

function convertDate(d, y = false) {
months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
if (y == false)
return months[d.getMonth()] +" " +  d.getDate();
else return months[d.getMonth()] +" " +  d.getDate()+ ", " + d.getFullYear();

}
function getDisplayHTML() {
       totalShows = getNumberOfShowsInYear(new Date(new Date().getFullYear(),0,1)); // total number of shows for the current year.
       futureShows = getNumberOfShowsInYear(); // how many shows left in the current year.
       remainingShows = getShowDatesInYear(); // how many shows remaining for this year.
       if (futureShows == 0)
       {
        initString = "All of the regularly scheduled <q>Weird Al</q> shows have happened for this year.<br>";
        returnString = initString.concat("The next show will be broadcast on <b>",convertDate(getNextShowDate(),true),"</b>.</br</p>");
        return returnString
    }
    if (totalShows == 1 && futureShows == 1) {
        initString = "There is one regularly scheduled <q>Weird Al</q> show which will be broadcast this year.<br>";
        returnString = initString.concat("The show will air on <b>",convertDate(getNextShowDate()),"</b>.</br></p>");
        return returnString;
    }
    if (totalShows > 1)
    {
        if (futureShows == 1) {
                initString = "There is one regularly scheduled <q>Weird Al</q> show left to be broadcast this year.<br>";
returnString = initString.concat("The show will air on <b>",convertDate(getNextShowDate()),"</b>.</br></p>");
        return returnString;
    }
    else {
        // generate a displayable list of dates for the remaining shows.
        broadcastDates = "";
        for (d=0;d<futureShows;++d) {
            if (d < futureShows-1)
                {
                    if (d == 0)
                        broadcastDates = broadcastDates.concat("<b>",convertDate(remainingShows[d]),"</b>",','," ");
                    else
                        broadcastDates = broadcastDates.concat(convertDate(remainingShows[d]),','," ");
            }
            else if (d == futureShows-1)
            broadcastDates =  broadcastDates.concat("and ",convertDate(remainingShows[d]),".<br />");
            
        
        // end of loop
        }
        
        initString = "There are " + futureShows + " regularly scheduled Weird Al shows left to be broadcast this year.<br>";
        returnHTML = initString.concat("They will be broadcast on ",broadcastDates);
        return returnHTML;
    // end of else
        }
    
    
    // end of if structure for more than 1 total show.
    
    }
 // end of method
}

    

function initParagraph() {
    
    displayHTML = getDisplayHTML();
    
    paragraph = document.getElementById("showInfo");
     paragraph.innerHTML = paragraph.innerHTML + displayHTML;
}
/* This method takes a year, such as 2019,, 2021, etc. and returns the total number of shows.
I used this for testing.
This method is different from the others as it takes an integer rather than a date object. */
function showsInGivenYear(year)
{
    return getNumberOfShowsInYear(new Date(year,0,1));
    
    
}