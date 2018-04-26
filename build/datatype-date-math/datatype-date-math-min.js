YUI.add("datatype-date-math",function(e,t){var a=e.Lang;e.mix(e.namespace("Date"),{isValidDate:function(e){return!(!a.isDate(e)||!isFinite(e)||"Invalid Date"==e||isNaN(e)||null==e)},areEqual:function(e,t){return this.isValidDate(e)&&this.isValidDate(t)&&e.getTime()==t.getTime()},isGreater:function(e,t){return this.isValidDate(e)&&this.isValidDate(t)&&e.getTime()>t.getTime()},isGreaterOrEqual:function(e,t){return this.isValidDate(e)&&this.isValidDate(t)&&e.getTime()>=t.getTime()},isInRange:function(e,t,a){return this.isGreaterOrEqual(e,t)&&this.isGreaterOrEqual(a,e)},addDays:function(e,t){return new Date(e.getTime()+864e5*t)},addMonths:function(e,t){var a,i=e.getFullYear(),n=e.getMonth()+t;return i=Math.floor(i+n/12),n=(n%12+12)%12,(a=new Date(e.getTime())).setFullYear(i),a.setMonth(n),a},addYears:function(e,t){var a=e.getFullYear()+t,i=new Date(e.getTime());return i.setFullYear(a),i},listOfDatesInMonth:function(e){var t,a,i,n,r;if(!this.isValidDate(e))return[];for(t=this.daysInMonth(e),a=e.getFullYear(),i=e.getMonth(),n=[],r=1;r<=t;r++)n.push(new Date(a,i,r,12,0,0));return n},daysInMonth:function(e){var t,a;return this.isValidDate(e)?1!=(t=e.getMonth())?[31,28,31,30,31,30,31,31,30,31,30,31][t]:(a=e.getFullYear())%400==0?29:a%100==0?28:a%4==0?29:28:0}}),e.namespace("DataType"),e.DataType.Date=e.Date},"@VERSION@",{requires:["yui-base"]});