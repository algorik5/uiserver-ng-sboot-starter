export class StringUtil
{
  static substringBefore(str:string,separator:string) { return str.split(separator)[0]; }
  static substringBeforeLast(str:string,separator:string) { return str.substring(0, str.lastIndexOf(separator)); }
  static substringAfter(str:string,separator:string) { return str.split(separator)[1]; }
  static substringAfterLast(str:string,separator:string) { let split = str.split(separator); return split[split.length-1]; }
  static substringBetween(str:string,start:string,end:string) { return str.split(start)[1] + str.split(end)[0]; }
  static substringBetweenReverse(str:string,start:string,end:string) { return str.split(start)[0] + str.split(end)[1]; }

  static startsWith(str) { return str.startsWith("XXX"); }
  static contains(str:string) { return str.includes("XXX"); }
  static replace(str:string) { return str.replace("XXX",""); }
  static replaceAll(str:string,oldstr,newstr) 
  {
    //retirm str.replace(/xx/g,"")//주의-쿼테이션없음
    return str.split(oldstr).join(newstr); //return str.split('/').join('X'); 
    //return str.replace(new RegExp(oldstr), newstr);
    //return str.replace(/oldstr/g, newstr)
    //특수문자 : replace(/\//g, '-');
  }
}

//////////////////////////// main test (tsc ArrayUtil > node ArrayUtil)
// console.log('---------------- start');
// console.log('---------------- '+ StringUtil.startsWith("aaaa"));
// console.log('---------------- end');

