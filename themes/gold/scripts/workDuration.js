hexo.extend.helper.register('workDuration', function(start, end){

    let month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date1 = start.split(' ');
    let date2 = end.split(' ');
    let formattedDate1 = new Date(date1[1], String(month_names.indexOf(date1[0])).padStart(2, 0));
    let formattedDate2 = new Date(date2[1], String(month_names.indexOf(date2[0])).padStart(2, 0));
  
    let startMonth = formattedDate1.getFullYear() * 12 + formattedDate1.getMonth();  
    let endMonth = formattedDate2.getFullYear() * 12 + formattedDate2.getMonth();
    let monthInterval = (endMonth - startMonth);
  
    let yearsOfExperience = Math.floor(monthInterval / 12);
    let monthsOfExperience = monthInterval % 12;
  
    let experienceDuration;
  
    if (!yearsOfExperience) {
      experienceDuration += monthsOfExperience;
    }
    if (!monthsOfExperience) {
      experienceDuration += yearsOfExperience;
    }
  
    // return experienceDuration;
  
    yearsOfExperience = (yearsOfExperience == 1) ? `${yearsOfExperience} yr` : `${yearsOfExperience} yrs`
    monthsOfExperience = (monthsOfExperience == 1) ? `${monthsOfExperience} mo` : `${monthsOfExperience} mos`
    return `${yearsOfExperience} ${monthsOfExperience}`
});

// console.log(getDuration('Jun 2009', 'Jun 2010'))
// console.log(getDuration('Jul 2015', 'Sep 2015'))
// console.log(getDuration('Dec 2016', 'Nov 2021'))
// console.log(getDuration('Jun 2015', 'Dec 2016'))
// console.log(getDuration('Jun 2010', 'Aug 2011'))
// console.log(getDuration('Aug 2010', 'Sep 2011'))